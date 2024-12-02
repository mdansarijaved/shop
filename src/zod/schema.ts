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
  cost: z.number().min(0), // Changed from int to number for float support
});

const ProductOption = z.object({
  type: z.string().min(1, "Type is required"),
  value: z.string().min(1, "Value is required"),
  price: z.number().min(0).default(0), // Added price field for option-specific pricing
});

const featuresSchema = z.object({
  featureType: z.nativeEnum(FeatureType),
  feature: z.string(),
});

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().min(0),
  stock: z.number().int().nonnegative("Stock must be non-negative"),
  category: z.nativeEnum(Category),
  costPerFoot: z.array(costPerFootSchema), // Removed min requirement since it's optional
  features: z.array(featuresSchema).min(1, "At least one feature is required"),
  images: z.string().array(),
  isFeatured: z.boolean().default(false),
  isPromoted: z.boolean().default(false),
  promotionStart: z.date().nullable(),
  promotionEnd: z.date().nullable(),
  variablePricing: z.boolean().default(true), // Added variablePricing field
  discountPrice: z.number().min(0).nullable(),
  options: z.array(ProductOption), // Removed min requirement since it's optional
  visible: z.boolean().default(true), // Added visible field
});

export const userFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.object({
    line: z.string().min(1, "Address line is required"),
    road: z.string().min(1, "Road is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    pincode: z.string().min(6, "Invalid pincode").max(6, "Invalid pincode"),
  }),
});
