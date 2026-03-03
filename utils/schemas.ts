import * as z from "zod";
const collectionId = (fieldName: string) =>
  z.preprocess(
    (val) => {
      if (val === "" || val === undefined) return null;
      return val;
    },
    z
      .string()
      .min(2, { message: `${fieldName} must be at least 2 characters` })
      .max(50, { message: `${fieldName} must be less than 50 characters` })
      .nullable(),
  );
const Variant = z.object({
  id: z.string().uuid(),
  colorName: z.string().min(1, "Color name is required"),
  colorHex: z.string().regex(/^#([0-9A-Fa-f]{6})$/, "Invalid hex color"),
  coverImage: z.string().min(1, "A cover image hasn't been uploaded"),
  price: z.coerce.number().min(1000),
  discount: z.preprocess(
    (val) =>
      val === "" || val === undefined || val === null ? undefined : Number(val),
    z.number().min(0).optional(),
  ),
  inStock: z.coerce.boolean(),
  sizes: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        try {
          return JSON.parse(val);
        } catch {
          return [];
        }
      }
      return val;
    },
    z.array(z.string()).min(1, "You must have at least 1 size"),
  ),
});

export const variantsSchema = z.preprocess(
  (val) => {
    if (typeof val === "string") {
      try {
        val = JSON.parse(val);
      } catch {
        return [];
      }
    }

    // if a single object was sent, wrap it
    if (val && typeof val === "object" && !Array.isArray(val)) {
      return [val];
    }

    return val;
  },
  z.array(Variant).min(1, "There must be at least 1 variant"),
);
export const createProductSchema = z.object({
  name: z
    .string()
    .min(2, { message: "name must be at least 2 characters" })
    .max(50, { message: "name must be less than 50 characters" }),
  slug: z
    .string()
    .min(2, { message: "slug must be at least 2 characters" })
    .max(50, { message: "slug must be less than 50 characters" })
    .transform(
      (value) =>
        value
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "") // remove special chars
          .replace(/\s+/g, "-"), // spaces → hyphens
    ),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(" ").length;
      return wordCount >= 10 && wordCount <= 1000;
    },
    {
      message: "description must be between 10 and 1000 words.",
    },
  ),
  quantity: z.coerce
    .number()
    .min(0, { message: "quantity must be greater than 0" }),

  images: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        try {
          return JSON.parse(val);
        } catch {
          return [];
        }
      }
      return val;
    },
    z.array(z.string()).min(1, { message: "At least one image is required" }),
  ),

  seoTags: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        try {
          return JSON.parse(val);
        } catch {
          return [];
        }
      }
      return val;
    },
    z.array(z.string()).min(1, { message: "At least one seo tag is required" }),
  ),
  seoTitle: z
    .string()
    .min(2, { message: "name must be at least 2 characters" })
    .max(50, { message: "name must be less than 50 characters" }),
  seoDescription: z.string().refine(
    (description) => {
      const wordCount = description.split(" ").length;
      return wordCount >= 10 && wordCount <= 1000;
    },
    {
      message: "seo description must be between 10 and 1000 words.",
    },
  ),
  status: z.enum(["ACTIVE", "INACTIVE", "DRAFT"]).default("ACTIVE"),
  gender: z.enum(["MALE", "FEMALE", "UNISEX"]).default("UNISEX"),
  category: z.enum(["TSHIRTS", "JEANS", "DRESSES", "JACKETS", "ACTIVEWEAR"]),
  collectionId: collectionId("collectionId"),
  material: z
    .string()
    .min(2, { message: "material must be at least 2 characters" })
    .max(50, { message: "material must be less than 50 characters" }),
  variants: variantsSchema,
});

// EDIT PRODUCT SCHEMA
export const editProductDetailsSchema = z.object({
  name: z
    .string()
    .min(2, { message: "name must be at least 2 characters" })
    .max(50, { message: "name must be less than 50 characters" }),
  slug: z
    .string()
    .min(2, { message: "slug must be at least 2 characters" })
    .max(50, { message: "slug must be less than 50 characters" })
    .transform(
      (value) =>
        value
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "") // remove special chars
          .replace(/\s+/g, "-"), // spaces → hyphens
    ),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(" ").length;
      return wordCount >= 10 && wordCount <= 1000;
    },
    {
      message: "description must be between 10 and 1000 words.",
    },
  ),
  quantity: z.coerce
    .number()
    .min(0, { message: "quantity must be greater than 0" }),

  seoTags: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        try {
          return JSON.parse(val);
        } catch {
          return [];
        }
      }
      return val;
    },
    z.array(z.string()).min(1, { message: "At least one seo tag is required" }),
  ),
  seoTitle: z
    .string()
    .min(2, { message: "name must be at least 2 characters" })
    .max(50, { message: "name must be less than 50 characters" }),
  seoDescription: z.string().refine(
    (description) => {
      const wordCount = description.split(" ").length;
      return wordCount >= 10 && wordCount <= 1000;
    },
    {
      message: "seo description must be between 10 and 1000 words.",
    },
  ),
  status: z.enum(["ACTIVE", "INACTIVE", "DRAFT"]).default("ACTIVE"),
  gender: z.enum(["MALE", "FEMALE", "UNISEX"]).default("UNISEX"),
  category: z.enum(["TSHIRTS", "JEANS", "DRESSES", "JACKETS", "ACTIVEWEAR"]),
  collectionId: collectionId("collectionId"),
  material: z
    .string()
    .min(2, { message: "material must be at least 2 characters" })
    .max(50, { message: "material must be less than 50 characters" }),
});
// Schema for Editing Variants
export const editVariantsSchema = z.object({
  variants: variantsSchema,
});
// Schema for Cover Image only
export const editCoverImageSchema = z.object({
  coverImage: z
    .string()
    .min(1, "Cover image is required")
    .nullable()
    .optional(),
});

// Schema for Product Images (multiple images)
export const editProductImagesSchema = z.object({
  images: z
    .preprocess(
      (val) => {
        if (typeof val === "string") {
          try {
            return JSON.parse(val); // parse hidden input JSON
          } catch {
            return [];
          }
        }
        return val;
      },
      z.array(z.string()).min(1, { message: "At least one image is required" }),
    )
    .nullable() // allow null if no images submitted
    .optional(), // allow undefined
});
export const createReviewSchema = z.object({
  rating: z.coerce
    .number()
    .min(1, { message: "rating must be at least 1 star" }),
  description: z.string().refine(
    (description) => {
      const wordCount = description.trim().split(/\s+/).length;
      return wordCount >= 2 && wordCount <= 150;
    },
    {
      message: "Description should be between 2 and 150 words.",
    },
  ),
});
