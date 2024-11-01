// app/actions/product.ts
"use server";

import { auth } from "@/auth";
import { ProductFormData } from "@/components/admin/products/CreateNewProduct";
import { db } from "@/lib/db";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";

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
        isPromoted: data.isPromoted,
        isFeatured: data.isFeatured,
        promotionEnd: data.promotionEnd,
        promotionStart: data.promotionStart,
        discountPercent: data.discountPercent,
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
        case "0-5000":
          maxPrice = 5000;
          break;
        case "5001-10000":
          minPrice = 5001;
          maxPrice = 10000;
          break;
        case "10001-20000":
          minPrice = 10001;
          maxPrice = 20000;
          break;
        case "20001-plus":
          minPrice = 20001;
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

export const getAllProducts = async () => {
  return await db.product.findMany({
    select: {
      _count: {
        select: {
          orderItems: true,
        },
      },
      category: true,
      id: true,
      name: true,
      price: true,
      description: true,
      images: true,
      discountPercent: true,
      isFeatured: true,
      isPromoted: true,
      slug: true,
      stock: true,
    },
  });
};
