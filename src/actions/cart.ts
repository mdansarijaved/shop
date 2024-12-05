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
  const { customNotes, productId, costPerFootId, quantity } = cartItem;

  if (!session) {
    throw new Error("User not authenticated");
  }

  const product = await db.product.findUnique({
    where: { id: productId },
    include: { costPerFoot: true },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  const costPerFoot = product.costPerFoot.find(
    (cpf) => cpf.id === costPerFootId
  );

  if (!costPerFoot) {
    throw new Error("Cost per foot option not found");
  }

  const cartItems = await db.cart.create({
    data: {
      quantity,
      customNotes,
      userId: session.user.id,
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
  return { cartItems, isGuest: false };
};

export const getCart = async () => {
  const session = await auth();
  if (!session) {
    throw new Error("User not authenticated");
  }

  const cartItems = await db.cart.findMany({
    where: { userId: session.user.id },
    include: {
      product: {
        include: {
          images: true,
          costPerFoot: true,
        },
      },
    },
  });

  return { cartItems };
};

export const removeFromCartAction = async (cartItemId: string) => {
  const session = await auth();
  if (!session) {
    throw new Error("User not authenticated");
  }

  await db.cart.delete({
    where: { id: cartItemId, userId: session.user.id },
  });

  return { success: true };
};

export const syncGuestCart = async (guestCartItems: any[]) => {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }

  const syncedItems = await Promise.all(
    guestCartItems.map(async (item) => {
      return await db.cart.create({
        data: {
          quantity: item.quantity,
          customNotes: item.customNotes,
          userId: session.user.id,
          costPerFootId: item.costPerFootId,
          productId: item.productId,
        },
      });
    })
  );

  return syncedItems;
};
