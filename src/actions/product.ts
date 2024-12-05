// app/actions/product.ts
"use server";

import { auth } from "@/auth";
import { ProductFormData } from "@/components/admin/products/CreateNewProduct";
import { db } from "@/lib/db";
import { generateSlug } from "@/lib/slug";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";
export async function createProduct(data: ProductFormData): Promise<{
  status: "success" | "error" | "unauthorized";
  message: string;
  product?: Product;
}> {
  try {
    const session = await auth();

    if (!session || !session.user || session.user.role !== "ADMIN") {
      return {
        status: "unauthorized",
        message: "Unauthorized. Only admins can create products.",
      };
    }

    if (!data.name || !data.description || !data.price || !data.category) {
      return { status: "error", message: "Missing required fields" };
    }

    const slug = generateSlug(data.name);

    const existingProduct = await db.product.findFirst({
      where: { slug },
    });

    if (existingProduct) {
      return {
        status: "error",
        message: "A product with a similar name already exists",
      };
    }

    const product = await db.product.create({
      data: {
        name: data.name,
        description: data.description,
        basePrice: data.price,
        stock: data.stock,
        slug,
        category: data.category,
        features: {
          create: data.features.map((feature) => ({
            feature: feature.feature,
            featureType: feature.featureType,
          })),
        },
        options: {
          create: data.options?.map((option) => ({
            type: option.type,
            value: option.value,
            price: option.price,
          })),
        },
        costPerFoot: {
          create: data.costPerFoot.map((cost) => ({
            typeof: cost.typeof,
            cost: cost.cost,
          })),
        },
        images: {
          create: data.images.map((url) => ({
            url,
          })),
        },
        isPromoted: data.isPromoted,
        isFeatured: data.isFeatured,
        promotionEnd: data.promotionEnd,
        promotionStart: data.promotionStart,
        discountPrice: data.discountPrice
          ? parseFloat(data.discountPrice.toString())
          : null,
      },
      include: {
        images: true,
        costPerFoot: true,
      },
    });

    return {
      status: "success",
      message: "Product created successfully",
      product,
    };
  } catch (error) {
    console.error("PRODUCT_CREATE_ERROR", error);
    return {
      status: "error",
      message: "Something went wrong while creating the product",
    };
  }
}

export const getProductById = async (id: string) => {
  try {
    console.log(id);
    const product = await db.product.findFirst({
      where: {
        slug: id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        images: true,
        basePrice: true,
        discountPrice: true,
        options: true,
        features: true,
        category: true,
        costPerFoot: true,
        isFeatured: true,
        isPromoted: true,
        promotionEnd: true,
        promotionStart: true,
        stock: true,
        visible: true,
      },
    });
    return product;
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async () => {
  try {
    const product = await db.product.findMany({
      include: {
        images: true,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  } catch (error) {
    console.log(error);
  }
};

export async function toggleProductVisibility(productId: string) {
  try {
    // Fetch the current product to get its visibility status
    const product = await db.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    // Toggle the visibility
    const updatedProduct = await db.product.update({
      where: { id: productId },
      data: { visible: !product.visible },
    });
    return updatedProduct;
  } catch (error) {
    console.error("Error toggling product visibility:", error);
    throw new Error("Failed to toggle product visibility");
  }
}
