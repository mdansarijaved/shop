"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const addToCartAction = async (cartItem: {
  productId: string;
  costPerFootId: string;
  quantity: number;
  customNotes?: string;
}) => {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }

  // Check if the user exists
  const user = await db.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const { customNotes, productId, costPerFootId, quantity } = cartItem;

  // Check if the product exists
  const product = await db.product.findUnique({
    where: { id: productId },
    include: { costPerFoot: true },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  // Check if the costPerFoot exists
  const costPerFoot = product.costPerFoot.find(
    (cpf) => cpf.id === costPerFootId
  );

  if (!costPerFoot) {
    throw new Error("Cost per foot option not found");
  }

  // Create the cart item
  const cartItems = await db.cart.create({
    data: {
      quantity,
      customNotes,
      userId: user.id,
      costPerFootId,
      productId,
    },
    include: {
      product: {
        include: {
          costPerFoot: true,
        },
      },
    },
  });

  return cartItems;
};

export async function getCart() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }

  const cartItems = await db.cart.findMany({
    where: { userId: session.user.id },
    include: {
      // Changed from select to include
      product: {
        include: {
          images: true,
          costPerFoot: true,
        },
      },
      option: {
        // Include the ProductOption relation
        select: {
          id: true,
          type: true,
          value: true,
          price: true,
        },
      },
      user: true,
    },
  });

  return cartItems;
}

export const removeFromCartAction = async (cartId: string) => {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }

  const deletedItem = await db.cart.delete({
    where: {
      id: cartId,
      userId: session.user.id, // Ensure user owns this cart item
    },
  });

  return deletedItem;
};
