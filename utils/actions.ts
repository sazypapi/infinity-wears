"use server";
import { auth, currentUser } from "@clerk/nextjs/server";
import {
  createProductSchema,
  createReviewSchema,
  editProductDetailsSchema,
  editVariantsSchema,
} from "./schemas";
import { string, ZodError } from "zod";
import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { backendClient } from "@/lib/edgestore-server";
import { log } from "console";
import { Cart, Prisma, ProductStatus } from "@/generated/prisma";
import { revalidatePath } from "next/cache";
import { parse } from "path";
import { id } from "zod/v4/locales";
// import db from "@/utils/db";
const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must be logged in to access this route");
  }

  return user;
};
const renderError = (error: unknown): { message: string } => {
  console.log(error);
  if (error instanceof ZodError) {
    const firstMessage = error.issues[0]?.message;
    return { message: firstMessage };

    // const messages = error.issues.map((iss) => iss.message);
    // return { message: messages.join(", ") };
  }
  return {
    message: error instanceof Error ? error.message : "an error occured",
  };
};

// export const createProduct = async (
//   prevState: any,
//   formData: FormData
// ): Promise<{ message: string }> => {
//   try {
//     const rawData = Object.fromEntries(formData);
//     const validatedFields = createProductSchema.parse(rawData);

//     // Confirm cover image upload
//     await backendClient.publicFiles.confirmUpload({
//       url: validatedFields.coverImage,
//     });

//     // Confirm gallery uploads
//     await Promise.all(
//       validatedFields.images.map((imageUrl) =>
//         backendClient.publicFiles.confirmUpload({ url: imageUrl })
//       )
//     );

//     let collectionId: string | null = null;

//     // -------------------------------
//     // COLLECTION HANDLING
//     // -------------------------------
//     if (validatedFields.collectionId === null) {
//       collectionId = null;
//     } else {
//       const normalized = validatedFields.collectionId.toLowerCase().trim();

//       // find existing
//       let collection = await db.collection.findFirst({
//         where: {
//           name: {
//             equals: normalized,
//           },
//         },
//       });

//       // create if not exists
//       if (!collection) {
//         const slug = normalized
//           .replace(/[^a-z0-9\s-]/g, "")
//           .replace(/\s+/g, "-");

//         collection = await db.collection.create({
//           data: {
//             name: normalized,
//             slug,
//           },
//         });
//       }

//       collectionId = collection.id;
//     }

//     // -------------------------------
//     // CREATE PRODUCT
//     // -------------------------------
//     console.log("collectionId being used for product:", collectionId);

//     await db.product.create({
//       data: {
//         ...validatedFields,
//         collectionId: collectionId,
//       },
//     });

//     redirect("/admin");
//   } catch (error) {
//     if (error instanceof Prisma.PrismaClientKnownRequestError) {
//       if (error.code === "P2002") {
//         return { message: "Slug already exists" };
//       }
//     }
//     return renderError(error);
//   }
// };

export const createProduct = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  try {
    const rawData = Object.fromEntries(formData);

    console.log(rawData);

    const validatedFields = createProductSchema.parse(rawData);

    console.log(validatedFields);
    console.log("Collection value:", validatedFields.collectionId);

    let collectionId: string | null = null;

    // COLLECTION HANDLING
    if (validatedFields.collectionId === null) {
      collectionId = null;
    } else {
      const normalized = validatedFields.collectionId.toLowerCase().trim();
      const slug = normalized.replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");

      console.log("Normalized name:", normalized, "slug:", slug);

      const collection = await db.collection.upsert({
        where: {
          name: normalized,
        },
        update: {},
        create: {
          name: normalized,
          slug,
        },
      });

      console.log("Collection result:", collection);

      collectionId = collection.id;
    }

    console.log(collectionId);
    if (validatedFields.variants.length < 1)
      return { message: "You must have at least 1 variant " };

    const colorNameSet = new Set<string>();
    const colorHexSet = new Set<string>();

    for (const variant of validatedFields.variants) {
      const nameLower = variant.colorName.toLowerCase().trim();
      const hexLower = variant.colorHex.toLowerCase().trim();

      if (colorNameSet.has(nameLower)) {
        return {
          message: `You can't have the same Color Name in more than 1 variant`,
        };
      }
      if (colorHexSet.has(hexLower)) {
        return {
          message: `You can't have the product color in more than 1 variant`,
        };
      }

      colorNameSet.add(nameLower);
      colorHexSet.add(hexLower);
    }

    await db.product.create({
      data: {
        name: validatedFields.name,
        slug: validatedFields.slug,
        description: validatedFields.description,
        quantity: validatedFields.quantity,
        images: validatedFields.images,
        seoTags: validatedFields.seoTags,
        seoTitle: validatedFields.seoTitle,
        seoDescription: validatedFields.seoDescription,
        status: validatedFields.status,
        gender: validatedFields.gender,
        collectionId: collectionId,
        material: validatedFields.material,
        category: validatedFields.category,
        variants: {
          create: validatedFields.variants.map((v) => ({
            colorName: v.colorName,
            colorHex: v.colorHex,
            coverImage: v.coverImage,
            price: v.price,
            discount: v.discount,
            inStock: v.inStock,
            sizes: v.sizes,
          })),
        },
      },
    });

    await Promise.all(
      validatedFields.variants.map((variant) =>
        backendClient.publicFiles.confirmUpload({ url: variant.coverImage }),
      ),
    );
    await Promise.all(
      validatedFields.images.map((imageUrl) =>
        backendClient.publicFiles.confirmUpload({ url: imageUrl }),
      ),
    );

    // return { message: "Form Submitted" };
  } catch (error) {
    console.log("=== ERROR ===");
    console.error(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { message: "Product Name already exists" };
      }
    }
    return renderError(error);
  }
  redirect("/admin");
};
export const getAllProducts = async () => {
  const allProducts = await db.product.findMany({
    include: {
      variants: { take: 1 },
    },
  });
  return allProducts;
};
export const getAllCollections = async () => {
  const allCollections = await db.collection.findMany({
    include: {
      products: true,
    },
  });

  return allCollections;
};

export const getSingleProduct = async (slug: string) => {
  let getCollection = null;
  if (!slug) return { product: null, getCollection: null };
  const product = await db.product.findUnique({
    where: {
      slug: slug,
    },
    include: {
      variants: true,
    },
  });
  if (product?.collectionId) {
    getCollection = await db.collection.findUnique({
      where: {
        id: product?.collectionId,
      },
    });
  }
  return { product, getCollection };
};
export const editProductDetails = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  let validatedSlug: string;
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = editProductDetailsSchema.parse(rawData);
    const productId = rawData.productId?.toString();
    const currentProduct = await db.product.findUnique({
      where: { id: productId },
    });
    let collectionId: string | null = null;

    // COLLECTION HANDLING
    if (validatedFields.collectionId === null) {
      collectionId = null;
    } else {
      const normalized = validatedFields.collectionId.toLowerCase().trim();
      const slug = normalized.replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");

      console.log("Normalized name:", normalized, "slug:", slug);

      const collection = await db.collection.upsert({
        where: {
          name: normalized,
        },
        update: {},
        create: {
          name: normalized,
          slug,
        },
      });
      console.log("Collection result:", collection);

      collectionId = collection.id;
    }
    validatedSlug = validatedFields.slug;
    await db.product.update({
      where: { id: productId },
      data: { ...validatedFields, collectionId: collectionId },
    });

    // return { message: "Product Updated Successfully" };
    // return { message: "Product Updated Successfully" };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { message: "Product Name already exists" };
      }
    }
    return renderError(error);
  }
  redirect(`/admin/view-product/${validatedSlug}`);
};

export const editProductImages = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  let validatedSlug: string;

  try {
    const rawData = Object.fromEntries(formData);

    const productId = rawData.id?.toString();
    const currentProduct = await db.product.findUnique({
      where: { id: productId },
    });

    if (!currentProduct) {
      return { message: "Product not found" };
    }
    validatedSlug = currentProduct.slug;

    const slug = currentProduct.slug;

    // --- Parse editedUrls (remaining images after deletion) ---
    let editedUrls: string[] = [];
    if (typeof rawData.editedUrls === "string") {
      try {
        editedUrls = JSON.parse(rawData.editedUrls);
      } catch {
        editedUrls = [];
      }
    }

    // --- Parse images (new uploads) ---
    let newImages: string[] = [];
    if (typeof rawData.images === "string") {
      try {
        newImages = JSON.parse(rawData.images);
      } catch {
        newImages = [];
      }
    }

    // --- Must have at least 1 image ---//
    const finalImages = [...editedUrls, ...newImages];
    let oldItems: string[] = [];
    if (!finalImages.length) {
      return { message: "There must be at least 1 image in product Images" };
    }
    const areImagesTheSame =
      editedUrls.length === currentProduct.images.length &&
      editedUrls.every((val) => currentProduct.images.includes(val));
    if (!areImagesTheSame) {
      oldItems = currentProduct.images.filter(
        (item) => !editedUrls.includes(item),
      );
      await Promise.all(
        oldItems.map((imageUrl) =>
          backendClient.publicFiles.deleteFile({ url: imageUrl }),
        ),
      );
    }
    // UPDATE DB WITH NEW ARRAY OF PRODUCT IMAGES//
    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        images: finalImages,
      },
    });
    // CONFIM IMAGES IN EDGESTORE//
    await Promise.all(
      newImages.map((imageUrl) =>
        backendClient.publicFiles.confirmUpload({ url: imageUrl }),
      ),
    );
    revalidatePath(`/admin/edit-product/${slug}`);
    // return { message: "Product Images Updated" };
  } catch (error) {
    return renderError(error);
  }
  redirect(`/admin/view-product/${validatedSlug}`);
};

export const editVariants = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  let existingSlug;
  try {
    const rawData = Object.fromEntries(formData);
    const productId = rawData.id?.toString();
    if (!productId) {
      return { message: "Product doesn't exist at all" };
    }

    const doesProductExist = await db.product.findUnique({
      where: { id: productId },
    });
    if (!doesProductExist) {
      return { message: "Product doesn't exist" };
    }
    existingSlug = doesProductExist.slug;
    const existingVariants = await db.colorVariant.findMany({
      where: { productId },
    });

    const validatedFields = editVariantsSchema.parse(rawData);
    const newVariantIds = validatedFields.variants.map((v) => v.id);
    console.log(newVariantIds);

    // Delete variants that are no longer present
    const variantsToDelete = await db.colorVariant.findMany({
      where: {
        productId,
        id: { notIn: newVariantIds },
      },
    });

    await db.colorVariant.deleteMany({
      where: {
        productId,
        id: { notIn: newVariantIds },
      },
    });
    const colorNameSet = new Set<string>();
    const colorHexSet = new Set<string>();

    for (const variant of validatedFields.variants) {
      const nameLower = variant.colorName.toLowerCase().trim();
      const hexLower = variant.colorHex.toLowerCase().trim();

      if (colorNameSet.has(nameLower)) {
        return {
          message: `You can't have the same Color Name in more than 1 variant`,
        };
      }
      if (colorHexSet.has(hexLower)) {
        return {
          message: `You can't have the product color in more than 1 variant`,
        };
      }

      colorNameSet.add(nameLower);
      colorHexSet.add(hexLower);
    }
    // Upsert the rest (create or update)
    await Promise.all(
      validatedFields.variants.map((variant) =>
        db.colorVariant.upsert({
          where: { id: variant.id },
          update: {
            colorName: variant.colorName,
            colorHex: variant.colorHex,
            coverImage: variant.coverImage,
            price: variant.price,
            discount: variant.discount,
            inStock: variant.inStock,
            sizes: variant.sizes,
          },
          create: {
            id: variant.id,
            productId,
            colorName: variant.colorName,
            colorHex: variant.colorHex,
            coverImage: variant.coverImage,
            price: variant.price,
            discount: variant.discount,
            inStock: variant.inStock,
            sizes: variant.sizes,
          },
        }),
      ),
    );
    await Promise.all(
      validatedFields.variants.map((variant) =>
        backendClient.publicFiles.confirmUpload({ url: variant.coverImage }),
      ),
    );
    await Promise.all(
      variantsToDelete.map((variant) =>
        backendClient.publicFiles.deleteFile({ url: variant.coverImage }),
      ),
    );
    // return { message: "it got here" };

    // Redirect to product page after successful edit
  } catch (error) {
    return renderError(error);
  }
  redirect(`/admin/view-product/${existingSlug}`);
};

export const deleteProduct = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  try {
    const productId = formData.get("id")?.toString();
    if (!productId) return { message: "Missing product ID" };

    const currentProduct = await db.product.findUnique({
      where: { id: productId },
    });
    if (!currentProduct) return { message: "Product not found" };

    await db.product.delete({ where: { id: productId } });
    await Promise.all(
      currentProduct.images.map((image) =>
        backendClient.publicFiles.deleteFile({ url: image }),
      ),
    );
    const findAllVariants = await db.colorVariant.findMany({
      where: { productId: productId },
    });
    await db.colorVariant.deleteMany({
      where: {
        productId: productId,
      },
    });
    await Promise.all(
      findAllVariants.map((variant) =>
        backendClient.publicFiles.deleteFile({ url: variant.coverImage }),
      ),
    );
  } catch (error) {
    return renderError(error);
  }
  redirect("/admin");
};

export const editCollectionName = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  try {
    const collectionId = formData.get("id")?.toString();
    if (!collectionId) return { message: "No such Collection" };
    const collectionNewName = formData
      .get("name")
      ?.toString()
      .trim()
      .toLowerCase();
    if (!collectionNewName) {
      return { message: "Collection name is required" };
    }
    const isThereSuchCollection = await db.collection.findFirst({
      where: {
        name: collectionNewName?.toLowerCase(),
        NOT: { id: collectionId },
      },
    });
    if (isThereSuchCollection) {
      return { message: `Collection Name ${collectionNewName} already exists` };
    }
    await db.collection.update({
      where: {
        id: collectionId,
      },
      data: {
        name: collectionNewName,
      },
    });
    revalidatePath("/admin");
    return { message: "Collection name updated" };
  } catch (error) {
    return renderError(error);
  }
};

export const deleteCollection = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  try {
    const collectionId = formData.get("id")?.toString();
    if (!collectionId) return { message: "No such Collection" };
    await db.collection.delete({
      where: {
        id: collectionId,
      },
    });
    revalidatePath("/admin");
    return { message: "Collection Deleted" };
  } catch (error) {
    return renderError(error);
  }
};
export const getSingleCollection = async (id: string) => {
  const collection = await db.collection.findUnique({
    where: { id },
    include: { products: true },
  });
  return collection;
};
export const removeFromCollection = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  try {
    const rawData = Object.fromEntries(formData);
    const collectionId = formData.get("id")?.toString();
    if (!collectionId) return { message: "No such Collection" };
    let removedIds: string[] = [];
    if (typeof rawData.removedIds === "string") {
      try {
        removedIds = JSON.parse(rawData.removedIds);
      } catch {
        removedIds = [];
      }
    }
    if (removedIds.length === 0) {
      return { message: "No products to remove" };
    }

    await db.product.updateMany({
      where: {
        id: { in: removedIds },
      },
      data: {
        collectionId: null,
      },
    });
    revalidatePath(`/admin/view-collection-products/${id}`);
    return { message: "Products removed from collection" };
  } catch (error) {
    return renderError(error);
  }
};
export const addToCollection = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  try {
    const rawData = Object.fromEntries(formData);
    const collectionId = formData.get("id")?.toString();
    if (!collectionId) return { message: "No such Collection" };
    let addedIds: string[] = [];
    if (typeof rawData.collections === "string") {
      try {
        addedIds = JSON.parse(rawData.collections);
      } catch {
        addedIds = [];
      }
    }
    if (addedIds.length === 0) {
      return { message: "No products to remove" };
    }

    await db.product.updateMany({
      where: {
        id: { in: addedIds },
      },
      data: {
        collectionId: collectionId,
      },
    });
    revalidatePath(`/admin/view-collection-products/${id}`);
    return { message: "Products added to collection" };
  } catch (error) {
    return renderError(error);
  }
};
export const getSelectedProducts = async (id: string) => {
  const collection = await db.product.findMany({
    where: {
      OR: [{ collectionId: { not: id } }, { collectionId: null }],
    },
  });
  return collection;
};
export const createCollection = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  try {
    const nameInput = formData.get("name")?.toString();
    if (!nameInput) return { message: "No Collection Name Entered" };

    const name = nameInput.toLowerCase().trim();
    const slug = name.replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");

    const existing = await db.collection.findFirst({
      where: { name },
    });

    if (existing) {
      return { message: `${nameInput} already exists` };
    }

    await db.collection.create({
      data: {
        name,
        slug,
      },
    });
    revalidatePath("/admin");
    return { message: "Collection created successfully" };
  } catch (error) {
    return renderError(error);
  }
};
export const getNewReleases = async () => {
  const latestProducts = await db.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 4,
    where: {
      status: "ACTIVE",
    },
    include: {
      variants: true,
    },
  });
  return latestProducts;
};
export const getAlmostSoldOut = async () => {
  const almostSoldOut = await db.product.findMany({
    orderBy: { quantity: "asc" },
    take: 8,
    where: {
      status: "ACTIVE",
    },
    include: {
      variants: true,
    },
  });
  return almostSoldOut;
};
export const getSingleProductDetails = async (slug: string) => {
  const productDetails = await db.product.findUnique({
    where: { slug },
    include: {
      variants: true,
    },
  });
  return productDetails;
};
export const getYouMayAlsoLike = async (slug: string) => {
  const product = await db.product.findUnique({
    where: { slug: slug },
  });

  if (!product) return [];

  // 2️⃣ First: same category
  let recommendations = await db.product.findMany({
    where: {
      category: product.category,
      status: ProductStatus.ACTIVE,
      id: { not: product.id },
    },
    include: {
      variants: true,
    },
    take: 4,
  });

  // 3️⃣ If less than 4, fallback to same gender
  if (recommendations.length < 4) {
    const remaining = 4 - recommendations.length;

    const genderFallback = await db.product.findMany({
      where: {
        gender: product.gender,
        status: ProductStatus.ACTIVE,
        id: {
          notIn: [product.id, ...recommendations.map((p) => p.id)],
        },
      },
      include: {
        variants: true,
      },
      take: remaining,
    });

    recommendations = [...recommendations, ...genderFallback];
  }

  // 4️⃣ Final fallback — any ACTIVE products
  if (recommendations.length < 4) {
    const remaining = 4 - recommendations.length;

    const finalFallback = await db.product.findMany({
      where: {
        status: ProductStatus.ACTIVE,
        id: {
          notIn: [product.id, ...recommendations.map((p) => p.id)],
        },
      },
      include: {
        variants: true,
      },
      take: remaining,
    });

    recommendations = [...recommendations, ...finalFallback];
  }

  return recommendations;
};
export const createReview = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  let currentProduct;
  function shortenText(text: string, maxLength = 10): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength);
  }

  try {
    const rawData = Object.fromEntries(formData);
    const productId = typeof rawData.id === "string" ? rawData.id : "";
    if (!productId) {
      return { message: "Invalid request. Missing ID." };
    }
    const validatedFields = createReviewSchema.parse(rawData);
    console.log(validatedFields.rating);
    const user = await getAuthUser();
    if (!user) {
      return { message: "You must be logged in to review a product" };
    }
    const clerkId = user.id;
    const authorName = user.firstName;
    const authorImageUrl = user.imageUrl;
    currentProduct = await db.product.findUnique({ where: { id: productId } });
    const alreadyReviewed = await db.review.findFirst({
      where: {
        AND: [{ productId: productId }, { clerkId: clerkId }],
      },
    });
    if (alreadyReviewed) {
      return { message: "You have already reviewed this product" };
    }
    await db.review.create({
      data: {
        authorImageUrl,
        authorName: authorName || shortenText(clerkId),
        clerkId,
        description: validatedFields.description,
        rating: validatedFields.rating,
        productId,
      },
    });
    revalidatePath(`/product/${currentProduct!.slug}`);

    return { message: "Review Created" };
  } catch (error) {
    return renderError(error);
  }
  redirect(`/product/${currentProduct!.slug}`);
};
export const fetchOrCreateCart = async ({
  userId,
  errorOnFailure,
}: {
  userId: string;
  errorOnFailure?: boolean;
}) => {
  let cart = await db.cart.findFirst({
    where: {
      clerkId: userId,
    },
    include: {
      cartItems: true,
    },
  });
  if (!cart && errorOnFailure) {
    throw new Error("Cart not found");
  }
  if (!cart) {
    cart = await db.cart.create({
      data: {
        clerkId: userId,
      },
      include: {
        cartItems: true,
      },
    });
  }
  return cart;
};
const fetchProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};
const updateOrCreateCartItem = async ({
  cartId,
  productId,
  amount,
  variantId,
  size,
  color,
  price,
  discount,
}: {
  cartId: string;
  productId: string;
  variantId: string;
  amount: number;
  size: string;
  color: string;
  price: number;
  discount: number;
}) => {
  let cartItem = await db.cartItem.findFirst({
    where: {
      cartId,
      productId,
      variantId,
      size,
      color,
    },
  });
  if (cartItem) {
    cartItem = await db.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        amount: cartItem.amount + amount,
      },
    });
  } else {
    cartItem = await db.cartItem.create({
      data: {
        cartId,
        productId,
        amount,
        variantId,
        size,
        color,
        price,
        discount,
      },
    });
  }
};

export const updateCart = async (cart: Cart) => {
  const cartItems = await db.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
    include: {
      variant: true,
      product: {
        include: {
          variants: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  let numItemsInCart = 0;
  let cartTotal = 0;
  for (const item of cartItems) {
    numItemsInCart += item.amount;
    cartTotal +=
      (item.variant.price -
        (item.variant.discount
          ? item.variant.price * (item.variant.discount / 100)
          : 0)) *
      item.amount;
  }
  const tax = cart.taxRate * cartTotal;

  const shipping = cartTotal ? cart.shipping : 0;
  console.log([tax, shipping]);

  const orderTotal = cartTotal + tax + shipping;
  const currentCart = await db.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      numItemsInCart,
      cartTotal,
      tax,
      orderTotal,
    },
    include: includeProductClause,
  });
  return { cartItems, currentCart };
};
const includeProductClause = {
  cartItems: {
    include: {
      product: true,
    },
  },
};
export const addToCartAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser();
  if (!user) {
    return { message: "You must be logged in to add to cart" };
  }
  try {
    const productId = formData.get("productId") as string;
    const variantId = formData.get("variantId") as string;
    const size = formData.get("size") as string;
    const color = formData.get("color") as string;
    const price = Number(formData.get("price"));
    const discount = Number(formData.get("discount"));

    const amount = Number(formData.get("amount"));
    await fetchProduct(productId);
    const cart = await fetchOrCreateCart({ userId: user.id });
    await updateOrCreateCartItem({
      cartId: cart.id,
      productId,
      amount,
      variantId,
      size,
      color,
      price,
      discount,
    });
    await updateCart(cart);
  } catch (error) {
    return renderError(error);
  }
  redirect("/cart");
};
export const updateCartItemAction = async ({
  amount,
  cartItemId,
}: {
  amount: number;
  cartItemId: string;
}) => {
  const user = await getAuthUser();
  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });
    await db.cartItem.update({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
      data: {
        amount,
      },
    });
    await updateCart(cart);
    revalidatePath("/cart");
    return { message: "cart updated" };
  } catch (error) {
    return renderError(error);
  }
};
export const deleteCartItem = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  try {
    const productId = formData.get("id") as string;
    console.log("Deleting ID:", id);
    const isProduct = await db.cartItem.findFirst({
      where: {
        id: productId,
      },
    });
    if (!isProduct) {
      return { message: "Product doesn't exist" };
    }
    await db.cartItem.delete({
      where: {
        id: productId,
      },
    });
    revalidatePath("/cart");
    return { message: "Item deleted from cart" };
  } catch (error) {
    return renderError(error);
  }
};
export const updateCartItems = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  try {
    const variantId = formData.get("variantId") as string;
    const size = formData.get("size") as string;
    const colorName = formData.get("colorName") as string;
    const price = Number(formData.get("price"));
    const discount = Number(formData.get("discount"));
    const amount = Number(formData.get("amount"));
    const itemId = formData.get("itemId") as string;
    const isItem = await db.cartItem.findFirst({
      where: {
        id: itemId,
      },
    });
    if (!isItem) {
      return { message: "There was error updating the Item, try again" };
    }
    console.log(amount);

    await db.cartItem.update({
      where: {
        id: itemId,
      },
      data: {
        variantId: variantId,
        size: size,
        color: colorName,
        price: price,
        discount: discount,
        amount: amount,
      },
    });
    // return { message: "Cart updated successfully" };
  } catch (error) {
    return renderError(error);
  }
  redirect("/cart");
};
