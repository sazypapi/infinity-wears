"use server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { createProductSchema, editProductDetailsSchema } from "./schemas";
import { string, ZodError } from "zod";
import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { backendClient } from "@/lib/edgestore-server";
import { log } from "console";
import { Prisma } from "@/generated/prisma";
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
  formData: FormData
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

    await db.product.create({
      data: {
        ...validatedFields,
        collectionId: collectionId,
      },
    });

    await backendClient.publicFiles.confirmUpload({
      url: validatedFields.coverImage,
    });

    await Promise.all(
      validatedFields.images.map((imageUrl) =>
        backendClient.publicFiles.confirmUpload({ url: imageUrl })
      )
    );

    // redirect("/admin");
    // return{message:""}
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
  const allProducts = await db.product.findMany({});
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
  formData: FormData
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
export const editCoverImage = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  let slug: string | undefined;

  try {
    const rawData = Object.fromEntries(formData);
    console.log(rawData);

    const productId = rawData.id?.toString();
    const currentProduct = await db.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (!currentProduct) {
      return { message: "Error: Could not find product, try again" };
    }
    slug = currentProduct?.slug;
    if (!rawData.coverImage) {
      return { message: "The cover Image wasn't updated" };
    }
    if (rawData.coverImage.toString() === currentProduct?.coverImage) {
      return { message: "cover image updated" };
    }
    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        coverImage: rawData.coverImage.toString(),
      },
    });
    await backendClient.publicFiles.confirmUpload({
      url: rawData.coverImage.toString(),
    });
    await backendClient.publicFiles.deleteFile({
      url: currentProduct?.coverImage,
    });
    revalidatePath(`/admin/edit-product/${slug}`);
    return { message: "cover image updated" };
  } catch (error) {
    return renderError(error);
  }
};
export const editProductImages = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  try {
    const rawData = Object.fromEntries(formData);

    const productId = rawData.id?.toString();
    const currentProduct = await db.product.findUnique({
      where: { id: productId },
    });

    if (!currentProduct) {
      return { message: "Product not found" };
    }

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
        (item) => !editedUrls.includes(item)
      );
      await Promise.all(
        oldItems.map((imageUrl) =>
          backendClient.publicFiles.deleteFile({ url: imageUrl })
        )
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
        backendClient.publicFiles.confirmUpload({ url: imageUrl })
      )
    );
    revalidatePath(`/admin/edit-product/${slug}`);
    return { message: "Product Images Updated" };
  } catch (error) {
    return renderError(error);
  }
};

export const deleteProduct = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  try {
    const productId = formData.get("id")?.toString();
    if (!productId) return { message: "Missing product ID" };

    const currentProduct = await db.product.findUnique({
      where: { id: productId },
    });
    if (!currentProduct) return { message: "Product not found" };

    await db.product.delete({ where: { id: productId } });

    try {
      await Promise.all([
        ...(currentProduct.images || []).map((url) =>
          backendClient.publicFiles.deleteFile({ url })
        ),
        currentProduct.coverImage
          ? backendClient.publicFiles.deleteFile({
              url: currentProduct.coverImage,
            })
          : Promise.resolve(),
      ]);
    } catch (err) {
      console.error(
        "Failed to delete some images after product deletion:",
        err
      );
    }
  } catch (error) {
    return renderError(error);
  }
  redirect("/admin");
};

export const editCollectionName = async (
  prevState: any,
  formData: FormData
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
  formData: FormData
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
  formData: FormData
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
  formData: FormData
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
  formData: FormData
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
