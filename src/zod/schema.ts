import { Category, FeatureType, MaterialType } from "@/enums";
import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name is required"),
});
export const costPerFootSchema = z.object({
  typeof: z.nativeEnum(MaterialType),
  cost: z.number().min(0),
});

const ProductOption = z.object({
  type: z.string().min(1, "value required"),
  value: z.string().min(1, "value is required"),
});

const featuresSchema = z.object({
  featureType: z.nativeEnum(FeatureType),
  feature: z.string(),
});

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be positive"),
  stock: z.number().int().nonnegative("Stock must be non-negative"),
  category: z.nativeEnum(Category),
  costPerFoot: z
    .array(costPerFootSchema)
    .min(1, "At least one cost per foot is required"),

  features: z.array(featuresSchema).min(1, "Atleast one feature is required"),
  images: z.string().array(),
  isFeatured: z.boolean().default(false),
  isPromoted: z.boolean().default(false),
  promotionStart: z.date().nullable(),
  promotionEnd: z.date().nullable(),
  discountPrice: z.number().min(0).nullable(),
  options: z.array(ProductOption),
});
