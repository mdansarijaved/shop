// app/actions/product.ts
"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  images: string[];
}

export async function createProduct(data: ProductFormData): Promise<{
  success?: string;
  error?: string;
  product?: Product;
}> {
  try {
    const session = await auth();

    if (!session || !session.user || session.user.role !== "ADMIN") {
      return { error: "Unauthorized. Only admins can create products." };
    }

    if (!data.name || !data.description || !data.price || !data.categoryId) {
      return { error: "Missing required fields" };
    }

    const slug = generateSlug(data.name);

    const existingProduct = await db.product.findFirst({
      where: { slug },
    });

    if (existingProduct) {
      return { error: "A product with similar name already exists" };
    }

    const product = await db.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price.toString()),
        stock: parseInt(data.stock.toString()),
        slug,
        categoryId: data.categoryId,
        images: {
          create: data.images.map((url) => ({
            url,
          })),
        },
      },
      include: {
        images: true,
        category: true,
      },
    });

    revalidatePath("/admin/products");
    revalidatePath(`/products/${product.slug}`);

    return { success: "Product created successfully", product };
  } catch (error) {
    console.error("PRODUCT_CREATE_ERROR", error);
    return { error: "Something went wrong while creating the product" };
  }
}

// Helper function to update product
export async function updateProduct(
  productId: string,
  data: Partial<ProductFormData>
) {
  try {
    const session = await auth();

    if (!session || !session.user || session.user.role !== "ADMIN") {
      return { error: "Unauthorized. Only admins can update products." };
    }

    const product = await db.product.update({
      where: { id: productId },
      data: {
        name: data.name,
        description: data.description,
        price: data.price ? parseFloat(data.price.toString()) : undefined,
        stock: data.stock ? parseInt(data.stock.toString()) : undefined,
        categoryId: data.categoryId,
        // Handle image updates if needed
        ...(data.images && {
          images: {
            deleteMany: {},
            create: data.images.map((url) => ({
              url,
            })),
          },
        }),
      },
      include: {
        images: true,
        category: true,
      },
    });

    revalidatePath("/admin/products");
    revalidatePath(`/products/${product.slug}`);

    return { success: "Product updated successfully", product };
  } catch (error) {
    console.error("PRODUCT_UPDATE_ERROR", error);
    return { error: "Something went wrong while updating the product" };
  }
}

// Helper function to delete product
export async function deleteProduct(productId: string) {
  try {
    const session = await auth();

    if (!session || !session.user || session.user.role !== "ADMIN") {
      return { error: "Unauthorized. Only admins can delete products." };
    }

    // Delete the product (this will cascade delete related images due to schema relations)
    await db.product.delete({
      where: { id: productId },
    });

    revalidatePath("/admin/products");
    return { success: "Product deleted successfully" };
  } catch (error) {
    console.error("PRODUCT_DELETE_ERROR", error);
    return { error: "Something went wrong while deleting the product" };
  }
}

// Helper function to generate slug from product name
function generateSlug(name: string): string {
  const timestamp = new Date().getTime().toString().slice(-4);
  return `${name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")}-${timestamp}`;
}

// Helper function to fetch product by ID
export async function getProductById(productId: string) {
  try {
    const product = await db.product.findUnique({
      where: { id: productId },
      include: {
        images: true,
        category: true,
        Review: {
          include: {
            user: true,
          },
        },
      },
    });

    return product;
  } catch (error) {
    console.error("PRODUCT_GET_ERROR", error);
    return null;
  }
}

export async function getProducts(searchParams?: {
  [key: string]: string | string[] | undefined;
}) {
  try {
    // Initialize the where clause
    const where: any = {
      AND: [],
    };

    // Handle search
    const search = searchParams?.search?.toString().toLowerCase();
    if (search) {
      where.AND.push({
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      });
    }

    // Handle category
    const category = searchParams?.category?.toString();
    if (category && category !== "all") {
      where.AND.push({
        category: {
          name: {
            equals: category,
            mode: "insensitive",
          },
        },
      });
    }

    // Handle price
    const price = searchParams?.price?.toString();
    if (price && price !== "all") {
      let minPrice = 0;
      let maxPrice: number | undefined;

      switch (price) {
        case "0-50":
          maxPrice = 50;
          break;
        case "51-100":
          minPrice = 51;
          maxPrice = 100;
          break;
        case "101-200":
          minPrice = 101;
          maxPrice = 200;
          break;
        case "201-plus":
          minPrice = 201;
          break;
        default:
          break;
      }

      where.AND.push({
        price: {
          gte: minPrice,
          ...(maxPrice && { lte: maxPrice }),
        },
      });
    }

    // Execute query
    const products = await db.product.findMany({
      where: where.AND.length > 0 ? where : undefined,
      select: {
        id: true,
        name: true,
        price: true,
        stock: true,
        images: true,
        description: true,
        category: {
          select: {
            name: true,
          },
        },
        orderItems: {
          select: {
            quantity: true,
          },
        },
      },
      orderBy: {
        stock: "asc",
      },
    });

    const total = await db.product.count({
      where: where.AND.length > 0 ? where : undefined,
    });

    return {
      products,
      total,
      filters: {
        search,
        category,
        price,
      },
    };
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw new Error("Failed to fetch products");
  }
}

export const getAllCategories = async () => {
  try {
    return await db.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  } catch (error) {
    throw new Error("Something Went wrong");
  }
};
