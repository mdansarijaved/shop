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

  if (!session) {
    return;
  }
  // User is logged in, add to database
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

export async function getCart() {
  const session = await auth();
  if (session?.user?.id) {
    // User is logged in, fetch from database
    const cartItems = await db.cart.findMany({
      where: { userId: session.user.id },
      include: {
        product: {
          include: {
            images: true,
            costPerFoot: true,
          },
        },
        option: {
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
    return { cartItems, isGuest: false };
  } else {
    // User is not logged in, return null to indicate client-side handling
    return { cartItems: null, isGuest: true };
  }
}

export async function removeFromCartAction(itemId: string) {
  const session = await auth();
  if (session?.user?.id) {
    // User is logged in, remove from database
    await db.cart.delete({
      where: { id: itemId, userId: session.user.id },
    });
  }
  // For guest users, removal will be handled client-side
  return { success: true };
}
