import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Prisma, Product } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
interface ProductsResponse {
  products: Product[];
  totalPages: number;
  currentPage: number;
}

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  images: string[]; // Array of image URLs
}

export async function createProduct(data: ProductFormData) {
  try {
    // Get the current session
    const session = await auth();

    // Check if user is authenticated and is an admin
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return { error: "Unauthorized. Only admins can create products." };
    }

    // Basic validation
    if (!data.name || !data.description || !data.price || !data.categoryId) {
      return { error: "Missing required fields" };
    }

    // Generate a slug from the product name
    const slug = generateSlug(data.name);

    // Check if product with similar slug exists
    const existingProduct = await db.product.findFirst({
      where: { slug },
    });

    if (existingProduct) {
      return { error: "A product with similar name already exists" };
    }

    // Create the product with associated images
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

    // Revalidate the products page and product detail page
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

// Helper function to fetch all products with pagination
export async function getProducts() {
  try {
    // Build the where clause for search
    // const where: Prisma.ProductWhereInput = searchQuery
    //   ? {
    //       OR: [
    //         { name: { contains: searchQuery, mode: "insensitive" } },
    //         { description: { contains: searchQuery, mode: "insensitive" } },
    //       ],
    //     }
    //   : {};

    const products = await db.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return products;
  } catch (error) {
    // Enhanced error logging
    console.error("Failed to fetch products:", {
      error: error instanceof Error ? error.message : "Unknown error",
    });

    return null;
  }
}
