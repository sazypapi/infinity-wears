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
      .nullable()
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
          .replace(/\s+/g, "-") // spaces → hyphens
    ),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(" ").length;
      return wordCount >= 10 && wordCount <= 1000;
    },
    {
      message: "description must be between 10 and 1000 words.",
    }
  ),
  quantity: z.coerce
    .number()
    .min(0, { message: "quantity must be greater than 0" }),

  price: z.coerce
    .number()
    .min(1000, { message: "price must be greater than 1000" }),
  discount: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().min(0, { message: "discount must be >= 0 " }).optional()
  ),
  coverImage: z.string().min(1, "cover image is required"),
  images: z.preprocess((val) => {
    if (typeof val === "string") {
      try {
        return JSON.parse(val);
      } catch {
        return [];
      }
    }
    return val;
  }, z.array(z.string()).min(1, { message: "At least one image is required" })),
  inStock: z.coerce.boolean(),
  sizes: z.preprocess((val) => {
    if (typeof val === "string") {
      try {
        return JSON.parse(val);
      } catch {
        return [];
      }
    }
    return val;
  }, z.array(z.string()).min(1, { message: "At least one color is required" })),
  colors: z.preprocess((val) => {
    if (typeof val === "string") {
      try {
        return JSON.parse(val);
      } catch {
        return [];
      }
    }
    return val;
  }, z.array(z.string()).min(1, { message: "At least one color is required" })),
  seoTags: z.preprocess((val) => {
    if (typeof val === "string") {
      try {
        return JSON.parse(val);
      } catch {
        return [];
      }
    }
    return val;
  }, z.array(z.string()).min(1, { message: "At least one seo tag is required" })),
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
    }
  ),
  status: z.enum(["ACTIVE", "INACTIVE", "DRAFT"]).default("ACTIVE"),
  collectionId: collectionId("collectionId"),
  material: z
    .string()
    .min(2, { message: "material must be at least 2 characters" })
    .max(50, { message: "material must be less than 50 characters" }),
});
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
          .replace(/\s+/g, "-") // spaces → hyphens
    ),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(" ").length;
      return wordCount >= 10 && wordCount <= 1000;
    },
    {
      message: "description must be between 10 and 1000 words.",
    }
  ),
  quantity: z.coerce
    .number()
    .min(0, { message: "quantity must be greater than 0" }),

  price: z.coerce
    .number()
    .min(1000, { message: "price must be greater than 1000" }),
  discount: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().min(0, { message: "discount must be >= 0 " }).optional()
  ),
  inStock: z.coerce.boolean(),
  sizes: z.preprocess((val) => {
    if (typeof val === "string") {
      try {
        return JSON.parse(val);
      } catch {
        return [];
      }
    }
    return val;
  }, z.array(z.string()).min(1, { message: "At least one color is required" })),
  colors: z.preprocess((val) => {
    if (typeof val === "string") {
      try {
        return JSON.parse(val);
      } catch {
        return [];
      }
    }
    return val;
  }, z.array(z.string()).min(1, { message: "At least one color is required" })),
  seoTags: z.preprocess((val) => {
    if (typeof val === "string") {
      try {
        return JSON.parse(val);
      } catch {
        return [];
      }
    }
    return val;
  }, z.array(z.string()).min(1, { message: "At least one seo tag is required" })),
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
    }
  ),
  status: z.enum(["ACTIVE", "INACTIVE", "DRAFT"]).default("ACTIVE"),
  collectionId: collectionId("collectionId"),
  material: z
    .string()
    .min(2, { message: "material must be at least 2 characters" })
    .max(50, { message: "material must be less than 50 characters" }),
});

// 1️⃣ Schema for Cover Image only
export const editCoverImageSchema = z.object({
  coverImage: z
    .string()
    .min(1, "Cover image is required")
    .nullable()
    .optional(),
});

// 2️⃣ Schema for Product Images (multiple images)
export const editProductImagesSchema = z.object({
  images: z
    .preprocess((val) => {
      if (typeof val === "string") {
        try {
          return JSON.parse(val); // parse hidden input JSON
        } catch {
          return [];
        }
      }
      return val;
    }, z.array(z.string()).min(1, { message: "At least one image is required" }))
    .nullable() // allow null if no images submitted
    .optional(), // allow undefined
});
