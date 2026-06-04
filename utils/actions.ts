"use server";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import {
  adminUpdateOrderAndDeliveryStatusSchema,
  collectionLinkSchema,
  createCarouselsSchema,
  createCustomOrderSchema,
  createCustomPieceSchema,
  createOrEditAddressBook,
  createOrUpdateAdminNoteSchema,
  createProductSchema,
  createReviewSchema,
  customPieceSchema,
  editProductDetailsSchema,
  editVariantsSchema,
  updateCustomOrderRequestSchema,
} from "./schemas";
import z, { ZodError } from "zod";
import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { backendClient } from "@/lib/edgestore-server";
import {
  Cart,
  Category,
  Gender,
  OrderItem,
  Prisma,
  ProductStatus,
} from "@/generated/prisma";
import { revalidatePath } from "next/cache";

export const checkIsAdmin = async () => {
  const { sessionClaims } = await auth();
  if (sessionClaims?.metadata?.role !== "admin") {
    throw new Error("Unauthorized");
  }
};
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
  }
  return {
    message: error instanceof Error ? error.message : "an error occured",
  };
};

export const createProduct = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = createProductSchema.parse(rawData);

    let collectionId: string | null = null;
    if (validatedFields.collectionId === null) {
      collectionId = null;
    } else {
      const normalized = validatedFields.collectionId.toLowerCase().trim();
      const slug = normalized.replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
      const collection = await db.collection.upsert({
        where: { name: normalized },
        update: {},
        create: { name: normalized, slug },
      });
      collectionId = collection.id;
    }

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

    // Confirm images before DB write
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
  } catch (error) {
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
    include: { variants: true, collection: true },
    orderBy: { createdAt: "desc" },
  });
  return allProducts;
};

export const getAllCollections = async () => {
  const allCollections = await db.collection.findMany({
    include: { products: true },
    orderBy: { createdAt: "desc" },
  });
  return allCollections;
};

export const getSingleProduct = async (slug: string) => {
  let getCollection = null;
  if (!slug) return { product: null, getCollection: null };
  const product = await db.product.findUnique({
    where: { slug },
    include: { variants: true },
  });
  if (product?.collectionId) {
    getCollection = await db.collection.findUnique({
      where: { id: product?.collectionId },
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

    let collectionId: string | null = null;
    if (validatedFields.collectionId === null) {
      collectionId = null;
    } else {
      const normalized = validatedFields.collectionId.toLowerCase().trim();
      const slug = normalized.replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
      const collection = await db.collection.upsert({
        where: { name: normalized },
        update: {},
        create: { name: normalized, slug },
      });
      collectionId = collection.id;
    }

    validatedSlug = validatedFields.slug;
    await db.product.update({
      where: { id: productId },
      data: { ...validatedFields, collectionId },
    });
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
    if (!currentProduct) return { message: "Product not found" };

    validatedSlug = currentProduct.slug;

    let editedUrls: string[] = [];
    if (typeof rawData.editedUrls === "string") {
      try {
        editedUrls = JSON.parse(rawData.editedUrls);
      } catch {
        editedUrls = [];
      }
    }

    let newImages: string[] = [];
    if (typeof rawData.images === "string") {
      try {
        newImages = JSON.parse(rawData.images);
      } catch {
        newImages = [];
      }
    }

    const finalImages = [...editedUrls, ...newImages];
    if (!finalImages.length)
      return { message: "There must be at least 1 image in product Images" };

    const areImagesTheSame =
      editedUrls.length === currentProduct.images.length &&
      editedUrls.every((val) => currentProduct.images.includes(val));

    if (!areImagesTheSame) {
      const oldItems = currentProduct.images.filter(
        (item) => !editedUrls.includes(item),
      );
      await Promise.all(
        oldItems.map((imageUrl) =>
          backendClient.publicFiles.deleteFile({ url: imageUrl }),
        ),
      );
    }

    // Confirm new images before DB update
    await Promise.all(
      newImages.map((imageUrl) =>
        backendClient.publicFiles.confirmUpload({ url: imageUrl }),
      ),
    );

    await db.product.update({
      where: { id: productId },
      data: { images: finalImages },
    });

    revalidatePath(`/admin/edit-product/${currentProduct.slug}`);
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
    if (!productId) return { message: "Product doesn't exist at all" };

    const doesProductExist = await db.product.findUnique({
      where: { id: productId },
    });
    if (!doesProductExist) return { message: "Product doesn't exist" };

    existingSlug = doesProductExist.slug;

    const validatedFields = editVariantsSchema.parse(rawData);
    const newVariantIds = validatedFields.variants.map((v) => v.id);

    const variantsToDelete = await db.colorVariant.findMany({
      where: { productId, id: { notIn: newVariantIds } },
    });

    await db.colorVariant.deleteMany({
      where: { productId, id: { notIn: newVariantIds } },
    });

    await Promise.all(
      variantsToDelete.map((variant) =>
        backendClient.publicFiles.deleteFile({ url: variant.coverImage }),
      ),
    );

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

    await Promise.all(
      validatedFields.variants.map((variant) =>
        backendClient.publicFiles.confirmUpload({ url: variant.coverImage }),
      ),
    );

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
            effectivePrice:
              variant.price *
              (1 - (variant.discount ? variant.discount : 0) / 100),
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
            effectivePrice:
              variant.price *
              (1 - (variant.discount ? variant.discount : 0) / 100),
          },
        }),
      ),
    );
    await db.product.update({
      where: { id: productId },
      data: {
        hasStock:
          (await db.colorVariant.count({
            where: { productId, inStock: true },
          })) > 0,
        minEffectivePrice:
          (
            await db.colorVariant.aggregate({
              where: { productId },
              _min: { effectivePrice: true },
            })
          )._min.effectivePrice ?? 0,
      },
    });
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

    const findAllVariants = await db.colorVariant.findMany({
      where: { productId },
    });

    await db.product.delete({ where: { id: productId } });

    await Promise.all(
      currentProduct.images.map((image) =>
        backendClient.publicFiles.deleteFile({ url: image }),
      ),
    );
    await Promise.all(
      findAllVariants.map(async (variant) => {
        const isVariantOrdered = await db.orderItem.findFirst({
          where: { imageUrl: variant.coverImage },
        });
        if (!isVariantOrdered) {
          await backendClient.publicFiles.deleteFile({
            url: variant.coverImage,
          });
        }
      }),
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
    if (!collectionNewName) return { message: "Collection name is required" };

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
      where: { id: collectionId },
      data: { name: collectionNewName },
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
    await db.collection.delete({ where: { id: collectionId } });
    revalidatePath("/admin");
    return { message: "Collection Deleted" };
  } catch (error) {
    return renderError(error);
  }
};

export const getSingleCollection = async (id: string) => {
  const collection = await db.collection.findUnique({
    where: { id },
    include: { products: { include: { variants: true } } },
  });
  return collection;
};

export const removeFromCollection = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  let collectionId;
  try {
    const rawData = Object.fromEntries(formData);
    collectionId = formData.get("id")?.toString();
    if (!collectionId)
      return { message: "There was an error updating the collection" };

    let removedIds: string[] = [];
    if (typeof rawData.removedIds === "string") {
      try {
        removedIds = JSON.parse(rawData.removedIds);
      } catch {
        removedIds = [];
      }
    }

    if (removedIds.length === 0) {
      await db.product.updateMany({
        where: { collectionId },
        data: { collectionId: null },
      });
    } else {
      await db.product.updateMany({
        where: { id: { in: removedIds } },
        data: { collectionId: null },
      });
    }
  } catch (error) {
    return renderError(error);
  }
  redirect(`/admin/view-collection-products/${collectionId}`);
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
    if (addedIds.length === 0) return { message: "No products to remove" };

    await db.product.updateMany({
      where: { id: { in: addedIds } },
      data: { collectionId },
    });
    revalidatePath(`/admin/view-collection-products/${collectionId}`);
    return { message: "Product(s) added to collection" };
  } catch (error) {
    return renderError(error);
  }
};

export const getSelectedProducts = async (id: string) => {
  const collection = await db.product.findMany({
    where: { OR: [{ collectionId: { not: id } }, { collectionId: null }] },
    include: { variants: true },
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

    const existing = await db.collection.findFirst({ where: { name } });
    if (existing) return { message: `${nameInput} already exists` };

    await db.collection.create({ data: { name, slug } });
    revalidatePath("/admin");
    return { message: "Collection created successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const getNewReleases = async () => {
  const latestProducts = await db.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 6,
    where: { status: "ACTIVE", variants: { some: { inStock: true } } },
    include: { variants: true },
  });
  return latestProducts;
};

export const getAlmostSoldOut = async () => {
  const almostSoldOut = await db.product.findMany({
    orderBy: { quantity: "asc" },
    take: 10,
    where: {
      status: "ACTIVE",
      quantity: { gt: 0 },
      variants: { some: { inStock: true } },
    },
    include: { variants: true },
  });
  return almostSoldOut;
};

export const getLatestCollectionLink = async () => {
  const latestCollectionLink = await db.collectionLink.findFirst({
    orderBy: { createdAt: "desc" },
  });
  return latestCollectionLink;
};

export const getSingleProductDetails = async (slug: string) => {
  const productDetails = await db.product.findUnique({
    where: { slug },
    include: { variants: true },
  });
  return productDetails;
};

export const getYouMayAlsoLike = async (slug: string) => {
  const product = await db.product.findUnique({ where: { slug } });
  if (!product) return [];

  let recommendations = await db.product.findMany({
    where: {
      category: product.category,
      status: ProductStatus.ACTIVE,
      id: { not: product.id },
      variants: { some: { inStock: true } },
    },
    include: { variants: true },
    take: 4,
  });

  if (recommendations.length < 4) {
    const remaining = 4 - recommendations.length;
    const genderFallback = await db.product.findMany({
      where: {
        gender: product.gender,
        status: ProductStatus.ACTIVE,
        id: { notIn: [product.id, ...recommendations.map((p) => p.id)] },
      },
      include: { variants: true },
      take: remaining,
    });
    recommendations = [...recommendations, ...genderFallback];
  }

  if (recommendations.length < 4) {
    const remaining = 4 - recommendations.length;
    const finalFallback = await db.product.findMany({
      where: {
        status: ProductStatus.ACTIVE,
        id: { notIn: [product.id, ...recommendations.map((p) => p.id)] },
      },
      include: { variants: true },
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
  let pathName;
  function shortenText(text: string, maxLength = 10): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength);
  }
  try {
    const rawData = Object.fromEntries(formData);
    const productId = typeof rawData.id === "string" ? rawData.id : "";
    pathName = typeof rawData.pathName === "string" ? rawData.pathName : "";

    if (!productId) return { message: "Invalid request. Missing ID." };

    const validatedFields = createReviewSchema.parse(rawData);
    const user = await getAuthUser();
    if (!user) return { message: "You must be logged in to review a product" };

    const clerkId = user.id;
    const authorName = user.firstName;
    const authorImageUrl = user.imageUrl;

    const hasPurchased = await db.orderItem.findFirst({
      where: { productId, order: { clerkId } },
    });
    if (!hasPurchased)
      return { message: "You can only review products you have purchased." };

    currentProduct = await db.product.findUnique({ where: { id: productId } });

    const alreadyReviewed = await db.review.findFirst({
      where: { productId, clerkId },
    });
    if (alreadyReviewed)
      return { message: "You have already reviewed this product" };

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
  } catch (error) {
    return renderError(error);
  }
  if (pathName === "/dashboard/pending-reviews") redirect("/dashboard/reviews");
  redirect(`${pathName}`);
};

export const fetchOrCreateCart = async ({
  userId,
  errorOnFailure,
}: {
  userId: string;
  errorOnFailure?: boolean;
}) => {
  let cart = await db.cart.findFirst({
    where: { clerkId: userId },
    include: { cartItems: true },
  });
  if (!cart && errorOnFailure) throw new Error("Cart not found");
  if (!cart) {
    cart = await db.cart.create({
      data: { clerkId: userId },
      include: { cartItems: true },
    });
  }
  return cart;
};

const fetchProduct = async (productId: string) => {
  const product = await db.product.findUnique({ where: { id: productId } });
  if (!product) throw new Error("Product not found");
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
    where: { cartId, productId, variantId, size, color },
  });
  if (cartItem) {
    cartItem = await db.cartItem.update({
      where: { id: cartItem.id },
      data: { amount: cartItem.amount + amount },
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
    where: { cartId: cart.id },
    include: { variant: true, product: { include: { variants: true } } },
    orderBy: { createdAt: "asc" },
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
  const orderTotal = cartTotal + tax + shipping;

  const currentCart = await db.cart.update({
    where: { id: cart.id },
    data: { numItemsInCart, cartTotal, tax, orderTotal },
    include: includeProductClause,
  });
  return { cartItems, currentCart };
};

const includeProductClause = { cartItems: { include: { product: true } } };

export const addToCartAction = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  if (!user) return { message: "You must be logged in to add to cart" };
  try {
    const productId = formData.get("productId") as string;
    const variantId = formData.get("variantId") as string;
    const size = formData.get("size") as string;
    const color = formData.get("color") as string;
    const price = Number(formData.get("price"));
    const discount = Number(formData.get("discount"));
    const amount = Number(formData.get("amount"));

    await fetchProduct(productId);
    const isVariantInStock = await db.colorVariant.findUnique({
      where: { id: variantId },
    });
    if (!isVariantInStock?.inStock)
      return { message: "Product is Out of stock" };

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
      where: { id: cartItemId, cartId: cart.id },
      data: { amount },
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
    const isProduct = await db.cartItem.findFirst({ where: { id: productId } });
    if (!isProduct) return { message: "Product doesn't exist" };
    await db.cartItem.delete({ where: { id: productId } });
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

    const isItem = await db.cartItem.findFirst({ where: { id: itemId } });
    if (!isItem)
      return { message: "There was error updating the Item, try again" };

    await db.cartItem.update({
      where: { id: itemId },
      data: { variantId, size, color: colorName, price, discount, amount },
    });
  } catch (error) {
    return renderError(error);
  }
  redirect("/cart");
};

export const getAllProductsForShop = async (
  filters: any,
  page = 0,
  take = 24,
) => {
  const { size, color, gender, category, material, sort, search } = filters;

  const where = {
    category: category || undefined,
    gender: gender || undefined,
    material: material || undefined,
    ...(search && {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { seoTitle: { contains: search, mode: "insensitive" } },
        { seoDescription: { contains: search, mode: "insensitive" } },
        { seoTags: { has: search } },
        {
          variants: {
            some: { colorName: { contains: search, mode: "insensitive" } },
          },
        },
      ],
    }),
    ...(size || color
      ? {
          variants: {
            some: {
              ...(size && { sizes: { has: size } }),
              ...(color && { colorName: color }),
            },
          },
        }
      : {}),
  };

  const [products, filteredCount] = await Promise.all([
    db.product.findMany({
      where,
      include: { variants: true },
      orderBy:
        sort === "bestselling"
          ? [{ hasStock: "desc" }, { sold: "desc" }]
          : sort === "newest"
            ? [{ hasStock: "desc" }, { createdAt: "desc" }]
            : sort === "price_asc"
              ? [{ hasStock: "desc" }, { minEffectivePrice: "asc" }]
              : sort === "price_desc"
                ? [{ hasStock: "desc" }, { minEffectivePrice: "desc" }]
                : [{ hasStock: "desc" }],
      skip: page * take,
      take,
    }),
    db.product.count({ where }),
  ]);

  return {
    products,
    filteredCount,
    hasMore: (page + 1) * take < filteredCount,
  };
};

export const getProductRatings = async (id: string) => {
  const isProductExist = await db.product.findUnique({ where: { id } });
  if (!isProductExist) return { error: "Product doesn't exist" };

  const reviews = await db.review.findMany({ where: { productId: id } });
  const oneStar = reviews.filter((r) => r.rating === 1).length;
  const twoStar = reviews.filter((r) => r.rating === 2).length;
  const threeStar = reviews.filter((r) => r.rating === 3).length;
  const fourStar = reviews.filter((r) => r.rating === 4).length;
  const fiveStar = reviews.filter((r) => r.rating === 5).length;
  const totalRating = reviews.length;
  const averageRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / totalRating;

  return {
    oneStar,
    twoStar,
    threeStar,
    fourStar,
    fiveStar,
    totalRating,
    averageRating,
  };
};

export const getProductReviews = async (id: string) => {
  const isProductExist = await db.product.findUnique({ where: { id } });
  if (!isProductExist) return { error: "Product doesn't exist" };

  const reviews = await db.review.findMany({
    where: { productId: id },
    orderBy: { rating: "desc" },
    take: 3,
  });

  const reviewsWithUsers = await Promise.all(
    reviews.map(async (review) => {
      const client = await clerkClient();
      const user = await client.users.getUser(review.clerkId);
      return {
        ...review,
        authorImageUrl: user.imageUrl,
        authorName: `${user.firstName} ${user.lastName}`,
      };
    }),
  );

  return reviewsWithUsers;
};

export const getAllProductReviews = async (slug: string) => {
  const product = await db.product.findFirst({ where: { slug } });
  if (!product) redirect("/");

  const allReviews = await db.review.findMany({
    where: { productId: product.id },
  });
  return { allReviews, product };
};

export const getAllOrders = async () => {
  const user = await currentUser();
  if (!user) redirect("/");

  const allOrders = await db.order.findMany({
    where: { clerkId: user.id },
    orderBy: { createdAt: "desc" },
    include: { orderItems: true },
  });
  const allOrderedItems: OrderItem[] = allOrders.flatMap(
    (order) => order.orderItems,
  );
  return { allOrderedItems, allOrders };
};

export const createOrGetUser = async () => {
  const user = await currentUser();
  if (!user) redirect("/");

  const userProfile = await db.userProfile.upsert({
    where: { clerkId: user.id },
    update: {},
    create: { clerkId: user.id },
  });
  return userProfile;
};

export const createAddress = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  try {
    const user = await currentUser();
    if (!user) redirect("/");

    const rawData = Object.fromEntries(formData);
    const validatedFields = createOrEditAddressBook.parse(rawData);
    await db.userProfile.update({
      where: { clerkId: user.id },
      data: { address: validatedFields.address, phone: validatedFields.phone },
    });
  } catch (error) {
    return renderError(error);
  }
  redirect("/dashboard/account");
};

export const getOrder = async (id: string) => {
  const user = await currentUser();
  if (!user) redirect("/");

  const order = await db.order.findFirst({
    where: { id, clerkId: user.id },
    include: { orderItems: true },
  });
  if (!order) redirect("/dashboard/orders");
  return order;
};

export const isProductExists = async (id: string) => {
  const isProductExisting = await db.product.findUnique({ where: { id } });
  return isProductExisting;
};

export const toggleFavoriteAction = async (prevState: {
  productId: string;
  favoriteId: string | null;
  pathName: string;
}) => {
  const user = await getAuthUser();
  const { productId, favoriteId, pathName } = prevState;
  try {
    if (favoriteId) {
      await db.wishlist.delete({ where: { id: favoriteId } });
    } else {
      const wishlistCount = await db.wishlist.count({
        where: { clerkId: user.id },
      });
      if (wishlistCount >= 50)
        return { message: "Wishlist is full (20 items max)" };
      await db.wishlist.create({ data: { productId, clerkId: user.id } });
    }
    revalidatePath(pathName);
    return {
      message: favoriteId ? "removed from wishlist" : "added to wishlist",
    };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchFavoriteId = async ({ productId }: { productId: string }) => {
  const user = await getAuthUser();
  const favorite = await db.wishlist.findFirst({
    where: { productId, clerkId: user.id },
    select: { id: true },
  });
  return favorite?.id || null;
};
export const fetchFavoriteIds = async (productIds: string[]) => {
  const { userId } = await auth();
  if (!userId) return [];
  const favorites = await db.wishlist.findMany({
    where: { clerkId: userId, productId: { in: productIds } },
  });
  return productIds.map((productId) => {
    const match = favorites.find((f) => f.productId === productId);
    return match ? match.id : null;
  });
};
export const getWishlist = async () => {
  const user = await getAuthUser();
  const wishlist = await db.wishlist.findMany({
    where: { clerkId: user.id },
    include: { product: { include: { variants: true } } },
  });
  return wishlist;
};

export const removeFromWishlist = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  try {
    const productId = formData.get("productId")?.toString();
    const isProduct = await db.product.findFirst({ where: { id: productId } });
    if (!isProduct) return { message: "Product doesn't exist" };

    const user = await currentUser();
    await db.wishlist.deleteMany({ where: { clerkId: user?.id, productId } });
    revalidatePath("/dashboard/wishlist");
    return { message: "Wishlist updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const getPendingReviews = async () => {
  const user = await currentUser();
  const orderedItems = await db.orderItem.findMany({
    where: { order: { clerkId: user?.id }, productId: { not: null } },
    include: { order: true },
    distinct: ["productId"],
  });
  const reviews = await db.review.findMany({ where: { clerkId: user?.id } });
  const pendingReviews = orderedItems.filter(
    (item) => !reviews.some((review) => review.productId === item.productId),
  );
  return pendingReviews;
};

export const getAllUsersReviews = async () => {
  const user = await currentUser();
  if (!user) redirect("/");

  const allReviews = await db.review.findMany({
    orderBy: { updatedAt: "desc" },
    where: { clerkId: user.id },
    include: { product: { include: { variants: true } } },
  });
  return allReviews;
};

export const editReview = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  try {
    const rawData = Object.fromEntries(formData);
    const productId = typeof rawData.id === "string" ? rawData.id : "";
    const reviewId =
      typeof rawData.reviewId === "string" ? rawData.reviewId : "";

    const isReview = await db.review.findFirst({ where: { id: reviewId } });
    if (!isReview) return { message: "There was an error, try again" };
    if (!productId) return { message: "Invalid request. Missing ID." };

    const validatedFields = createReviewSchema.parse(rawData);
    await db.review.update({
      where: { id: reviewId },
      data: {
        description: validatedFields.description,
        rating: validatedFields.rating,
      },
    });
  } catch (error) {
    return renderError(error);
  }
  redirect("/dashboard/reviews");
};

export const deleteReview = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  try {
    const rawData = Object.fromEntries(formData);
    const reviewId =
      typeof rawData.reviewId === "string" ? rawData.reviewId : "";

    const isReview = await db.review.findFirst({ where: { id: reviewId } });
    if (!isReview) return { message: "There was an error, try again" };

    await db.review.delete({ where: { id: reviewId } });
  } catch (error) {
    return renderError(error);
  }
  redirect("/dashboard/reviews");
};

export const getAdminAllOrders = async () => {
  const allOrders = await db.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { orderItems: true },
  });
  return allOrders;
};

export const getAdminSingleOrder = async (id: string) => {
  const order = await db.order.findUnique({
    where: { id },
    include: { orderItems: true },
  });
  return order;
};

export const adminUpdateOrderAndDeliveryStatus = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  try {
    const rawData = Object.fromEntries(formData);
    const id = formData.get("id")?.toString();

    const isOrderExists = await db.order.findUnique({ where: { id } });
    if (!isOrderExists) return { message: "Order doesn't exist" };

    const validatedFields =
      adminUpdateOrderAndDeliveryStatusSchema.parse(rawData);
    await db.order.update({ where: { id }, data: { ...validatedFields } });
    revalidatePath(`/admin/order-details/${id}`);
    revalidatePath(`/dashboard/orders/${id}`);
    return { message: "Order updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const isAddressAndPhone = async () => {
  const user = await currentUser();
  const userHasAddressAndPhone = await db.userProfile.findFirst({
    where: {
      clerkId: user?.id,
      AND: [
        { address: { not: null } },
        { address: { not: "" } },
        { phone: { not: null } },
        { phone: { not: "" } },
      ],
    },
  });
  return userHasAddressAndPhone;
};

export const getHomeCarouselImages = async () => {
  const carousels = await db.homeCarousel.findMany({});
  return carousels;
};

export const createCarouselImages = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  try {
    const raw = formData.get("carousels");
    let carousels;
    try {
      carousels = JSON.parse(raw as string);
    } catch {
      return { message: "Invalid carousel data" };
    }

    const validatedFields = z.array(createCarouselsSchema).parse(carousels);
    const allCarousels = await db.homeCarousel.findMany({});

    if (allCarousels.length >= 4)
      return { message: "You can't create more carousels" };
    if (validatedFields.length + allCarousels.length > 4) {
      return {
        message: `Max 4 carousels allowed. Remove ${validatedFields.length + allCarousels.length - 4} carousel(s).`,
      };
    }

    const editedValidatedFields = validatedFields.map((field) => ({
      link: field.link,
      text: field.text,
      image: field.image,
      mobileImage: field.mobileImage,
    }));

    // Confirm images before DB write
    await Promise.all(
      validatedFields.map((carousel) =>
        backendClient.publicFiles.confirmUpload({ url: carousel.image }),
      ),
    );
    await Promise.all(
      validatedFields.map((carousel) =>
        backendClient.publicFiles.confirmUpload({ url: carousel.mobileImage }),
      ),
    );

    await db.homeCarousel.createMany({ data: editedValidatedFields });
  } catch (error) {
    return renderError(error);
  }
  redirect("/admin");
};

export const updateCarouselItems = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  try {
    const raw = formData.get("carousels");
    let carousels;
    try {
      carousels = JSON.parse(raw as string);
    } catch {
      return { message: "Invalid carousel data" };
    }

    const validatedFields = z.array(createCarouselsSchema).parse(carousels);
    const allCarousels = await db.homeCarousel.findMany({});

    const carouselsToDelete = allCarousels.filter(
      (carousel) => !validatedFields.some((field) => field.id === carousel.id),
    );
    if (carouselsToDelete.length > 0) {
      await Promise.all(
        carouselsToDelete.map((carousel) =>
          db.homeCarousel.delete({ where: { id: carousel.id } }),
        ),
      );
      await Promise.all(
        carouselsToDelete.map((carousel) =>
          backendClient.publicFiles.deleteFile({ url: carousel.image }),
        ),
      );
      await Promise.all(
        carouselsToDelete.map((carousel) =>
          backendClient.publicFiles.deleteFile({ url: carousel.mobileImage }),
        ),
      );
    }

    const existingIds = new Set(allCarousels.map((c) => c.id));
    const existingCarousels = validatedFields.filter((field) =>
      existingIds.has(field.id),
    );

    const existingLinkChecks = await Promise.all(
      existingCarousels.map((carousel) =>
        checkInternalLinkExists(carousel.link),
      ),
    );
    const invalidExisting = existingCarousels.find(
      (_, i) => !existingLinkChecks[i],
    );
    if (invalidExisting)
      return { message: `The link "${invalidExisting.link}" doesn't exist` };

    if (existingCarousels.length > 0) {
      await Promise.all(
        existingCarousels.map(async (carousel) => {
          const isImageSame = await db.homeCarousel.findUnique({
            where: { id: carousel.id },
          });

          if (isImageSame && isImageSame.image !== carousel.image) {
            await backendClient.publicFiles.confirmUpload({
              url: carousel.image,
            });
            await backendClient.publicFiles.deleteFile({
              url: isImageSame.image,
            });
          }
          if (isImageSame && isImageSame.mobileImage !== carousel.mobileImage) {
            await backendClient.publicFiles.confirmUpload({
              url: carousel.mobileImage,
            });
            await backendClient.publicFiles.deleteFile({
              url: isImageSame.mobileImage,
            });
          }

          await db.homeCarousel.update({
            where: { id: carousel.id },
            data: {
              image: carousel.image,
              text: carousel.text,
              link: carousel.link,
              mobileImage: carousel.mobileImage,
            },
          });
        }),
      );
    }

    const newCarousels = validatedFields.filter(
      (field) => !existingIds.has(field.id),
    );
    const newLinkChecks = await Promise.all(
      newCarousels.map((carousel) => checkInternalLinkExists(carousel.link)),
    );
    const invalidNew = newCarousels.find((_, i) => !newLinkChecks[i]);
    if (invalidNew)
      return { message: `The link "${invalidNew.link}" doesn't exist` };

    if (newCarousels.length > 0) {
      await Promise.all(
        newCarousels.map((carousel) =>
          backendClient.publicFiles.confirmUpload({ url: carousel.image }),
        ),
      );
      await Promise.all(
        newCarousels.map((carousel) =>
          backendClient.publicFiles.confirmUpload({
            url: carousel.mobileImage,
          }),
        ),
      );
      await Promise.all(
        newCarousels.map((carousel) =>
          db.homeCarousel.create({
            data: {
              link: carousel.link,
              image: carousel.image,
              text: carousel.text,
              mobileImage: carousel.mobileImage,
            },
          }),
        ),
      );
    }
  } catch (error) {
    return renderError(error);
  }
  redirect("/admin/edit-carousel-items");
};

export const getAllCollectionLinks = async () => {
  const collectionLinks = await db.collectionLink.findMany({
    where: { collection: { products: { some: {} } } },
    include: { collection: true },
  });
  return collectionLinks;
};

export const getAllCollectionsForLinksWithCollectionLinks = async () => {
  const collections = await db.collection.findMany({
    where: { products: { some: {} } },
    include: { collectionLinks: true },
  });
  return collections;
};

export const checkInternalLinkExists = async (path: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}${path}`, { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
};

export const createOrUpdateCollectionLinks = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  try {
    const raw = formData.get("collectionLinks");
    let collectionLinks;
    try {
      collectionLinks = JSON.parse(raw as string);
    } catch {
      return { message: "Invalid collection link data" };
    }

    const validatedFields =
      collectionLinks.length === 0
        ? []
        : z.array(collectionLinkSchema).parse(collectionLinks);

    const allCollectionLinks = await db.collectionLink.findMany({});

    const linksToDelete = allCollectionLinks.filter(
      (collection) =>
        !validatedFields.some((field) => collection.id === field.id),
    );
    if (linksToDelete.length > 0) {
      await Promise.all(
        linksToDelete.map((link) =>
          db.collectionLink.delete({ where: { id: link.id } }),
        ),
      );
      await Promise.all(
        linksToDelete.map((link) =>
          backendClient.publicFiles.deleteFile({ url: link.image }),
        ),
      );
    }

    const linksThatExist = validatedFields.filter((field) =>
      allCollectionLinks.map((link) => link.id).some((id) => field.id === id),
    );
    if (linksThatExist.length > 0) {
      const duplicateCollection = linksThatExist.find((link) =>
        allCollectionLinks.some(
          (existing) =>
            existing.collectionName === link.collectionName &&
            existing.id !== link.id,
        ),
      );
      if (duplicateCollection) {
        return {
          message: `A link already exists for ${duplicateCollection.collectionName}`,
        };
      }

      await Promise.all(
        linksThatExist.map(async (link) => {
          const isImageSame = await db.collectionLink.findUnique({
            where: { id: link.id },
          });

          if (isImageSame && isImageSame.image !== link.image) {
            await backendClient.publicFiles.confirmUpload({ url: link.image });
            await backendClient.publicFiles.deleteFile({
              url: isImageSame.image,
            });
          }

          await db.collectionLink.update({
            where: { id: link.id },
            data: {
              collectionName: link.collectionName,
              heading: link.heading,
              image: link.image,
              subHeading: link.subHeading,
            },
          });
        }),
      );
    }

    const newLinks = validatedFields.filter(
      (field) =>
        !allCollectionLinks
          .map((link) => link.id)
          .some((id) => field.id === id),
    );
    if (newLinks.length > 0) {
      await Promise.all(
        newLinks.map((link) =>
          backendClient.publicFiles.confirmUpload({ url: link.image }),
        ),
      );
      await Promise.all(
        newLinks.map((link) =>
          db.collectionLink.create({
            data: {
              heading: link.heading,
              image: link.image,
              subHeading: link.subHeading,
              collectionName: link.collectionName,
            },
          }),
        ),
      );
    }
  } catch (error) {
    return renderError(error);
  }
  redirect("/admin/edit-collection-links");
};

export const getSingleCollectionLinkProducts = async (
  filters: {
    size?: string;
    color?: string;
    gender?: Gender;
    category?: Category;
    material?: string;
    sort?: string;
  },
  collectionName: string,
) => {
  const { size, color, gender, category, material, sort } = filters;

  const productsFromCollectionLink = await db.collectionLink.findFirst({
    where: { collectionName },
    include: {
      collection: {
        include: {
          _count: { select: { products: true } },
          products: {
            where: {
              ...(category && { category }),
              ...(gender && { gender }),
              ...(material && { material }),
              variants: {
                some: {
                  ...(size && { sizes: { has: size } }),
                  ...(color && { colorName: color }),
                },
              },
            },
            include: { variants: true },
            orderBy:
              sort === "bestselling"
                ? { sold: "desc" }
                : sort === "newest"
                  ? { createdAt: "desc" }
                  : undefined,
          },
        },
      },
    },
  });
  if (!productsFromCollectionLink) return null;

  const products = productsFromCollectionLink?.collection?.products ?? [];
  const sortedProducts =
    sort === "price_asc" || sort === "price_desc"
      ? [...products].sort((a, b) => {
          const aMin = Math.min(...a.variants.map((v) => v.price));
          const bMin = Math.min(...b.variants.map((v) => v.price));
          return sort === "price_asc" ? aMin - bMin : bMin - aMin;
        })
      : products;

  return {
    ...productsFromCollectionLink,
    collection: {
      ...productsFromCollectionLink?.collection,
      products: sortedProducts,
    },
  };
};

export const getCustomPieceBg = async () => {
  const customPieceBg = await db.customPiece.findFirst({});
  return customPieceBg;
};

export const upsertCustomPieceBg = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  try {
    const image = formData.get("image") as string;
    const mobileImage = formData.get("mobileImage") as string;
    const result = customPieceSchema.parse({ image, mobileImage });

    const existing = await db.customPiece.findFirst();
    if (existing) {
      if (existing.image !== result.image) {
        await backendClient.publicFiles.confirmUpload({ url: result.image });
        await backendClient.publicFiles.deleteFile({ url: existing.image });
      }
      if (existing.mobileImage !== result.mobileImage) {
        await backendClient.publicFiles.confirmUpload({
          url: result.mobileImage,
        });
        await backendClient.publicFiles.deleteFile({
          url: existing.mobileImage,
        });
      }
      await db.customPiece.update({
        where: { id: existing.id },
        data: { ...result },
      });
    } else {
      await backendClient.publicFiles.confirmUpload({ url: result.image });
      await backendClient.publicFiles.confirmUpload({
        url: result.mobileImage,
      });
      await db.customPiece.create({ data: { ...result } });
    }
    revalidatePath("/");
  } catch (error) {
    return renderError(error);
  }
  redirect("/admin/edit-custompiece-background");
};

export const createCreateCustomPiece = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = createCustomPieceSchema.parse(rawData);
    const user = await getAuthUser();
    if (!user)
      return { message: "You must be logged in to create a custom order" };

    await Promise.all(
      validatedFields.sampleImages.map((image) =>
        backendClient.publicFiles.confirmUpload({ url: image }),
      ),
    );

    await db.customPieceRequest.create({
      data: { ...validatedFields, userId: user.id },
    });
  } catch (error) {
    return renderError(error);
  }
  redirect("/dashboard/custom-orders");
};

export const getUsersCustomOrders = async () => {
  const user = await getAuthUser();
  const usersCustomOrders = await db.customPieceRequest.findMany({
    where: { userId: user.id },
    include: { customOrder: true },
  });
  return usersCustomOrders;
};

export const getSingleCustomOrder = async (id: string) => {
  const order = await db.customPieceRequest.findUnique({
    where: { id },
    include: { customOrder: true },
  });
  return order;
};

export const getAllCustomOrders = async () => {
  const allCustomOrders = await db.customPieceRequest.findMany({
    include: { customOrder: true },
  });
  return allCustomOrders;
};

export const getAdminSingleCustomOrder = async (id: string) => {
  const order = await db.customPieceRequest.findUnique({
    where: { id },
    include: { customOrder: true, user: true },
  });
  return order;
};

export const createCustomOrder = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  let orderId;
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = createCustomOrderSchema.parse(rawData);
    const isOrderExists = await db.customPieceRequest.findUnique({
      where: { id: validatedFields.requestId },
      include: { customOrder: true },
    });
    if (!isOrderExists)
      return { message: "The Custom Order Request was not found" };
    if (isOrderExists.customOrder)
      return { message: "An order already exists for this Request" };

    await db.customOrder.create({
      data: { ...validatedFields, userId: isOrderExists.userId },
    });
    orderId = isOrderExists.id;
  } catch (error) {
    return renderError(error);
  }
  redirect(`/admin/custom-orders/${orderId}`);
};

export const editCustomOrder = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  let requestId: string;
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = createCustomOrderSchema.parse(rawData);
    requestId = validatedFields.requestId;

    const isOrderExists = await db.customPieceRequest.findUnique({
      where: { id: requestId },
      include: { customOrder: true },
    });
    if (!isOrderExists)
      return { message: "The Custom Order Request was not found" };
    if (!isOrderExists.customOrder)
      return { message: "No custom order has been created for this request" };

    await db.customOrder.update({
      where: { id: isOrderExists.customOrder.id },
      data: {
        agreedPrice: validatedFields.agreedPrice,
        status: validatedFields.status,
      },
    });
  } catch (error) {
    return renderError(error);
  }
  redirect(`/admin/custom-orders/${requestId!}`);
};

export const updateCustomOrderRequestStatus = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  let orderId;
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = updateCustomOrderRequestSchema.parse(rawData);
    const isOrderExists = await db.customPieceRequest.findUnique({
      where: { id: validatedFields.id },
      include: { customOrder: true },
    });
    if (!isOrderExists) return { message: "This Custom order wasn't found" };

    orderId = validatedFields.id;
    if (
      (validatedFields.status === "ACCEPTED" ||
        validatedFields.status === "DONE") &&
      !isOrderExists.customOrder
    ) {
      return {
        message: `To change status to ${validatedFields.status}, create the order `,
      };
    }

    await db.customPieceRequest.update({
      where: { id: validatedFields.id },
      data: { status: validatedFields.status },
    });
  } catch (error) {
    return renderError(error);
  }
  redirect(`/admin/custom-orders/${orderId}`);
};
export const createOrUpdateAdminNote = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  let orderId;
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = createOrUpdateAdminNoteSchema.parse(rawData);
    const isOrderExists = await db.customPieceRequest.findUnique({
      where: { id: validatedFields.id },
    });
    if (!isOrderExists) return { message: "This Custom order wasn't found" };

    orderId = validatedFields.id;
    await db.customPieceRequest.update({
      where: { id: validatedFields.id },
      data: { adminNote: validatedFields.adminNote },
    });
  } catch (error) {
    return renderError(error);
  }
  redirect(`/admin/custom-orders/${orderId}`);
};
export const getProductsForSearch = async (
  search: string,
  page = 0,
  take = 24,
) => {
  const [products, allProductsCount] = await Promise.all([
    db.product.findMany({
      where: {
        ...(search && {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
            { seoTitle: { contains: search, mode: "insensitive" } },
            { seoDescription: { contains: search, mode: "insensitive" } },
            { seoTags: { has: search } },
            {
              variants: {
                some: { colorName: { contains: search, mode: "insensitive" } },
              },
            },
          ],
        }),
      },
      include: { variants: true },
      skip: page * take,
      take,
    }),
    db.product.count(),
  ]);

  const sortedProducts = products.sort((a, b) => {
    const aInStock = a.variants.some((v) => v.inStock) ? 1 : 0;
    const bInStock = b.variants.some((v) => v.inStock) ? 1 : 0;
    return bInStock - aInStock;
  });

  return {
    sortedProducts,
    allProductsCount,
    hasMore: (page + 1) * take < allProductsCount,
  };
};
export const getCollectionsForHomeCarousel = async () => {
  const collections = await db.collection.findMany({
    where: { products: { some: {} }, collectionLinks: { some: {} } },
    include: { collectionLinks: true },
  });
  return collections;
};
