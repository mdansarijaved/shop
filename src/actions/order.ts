"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const createOrder = async () => {
  const session = await auth();
  if (!session) {
    throw new Error("User not authenticated");
  }

  const cartItems = await db.cart.findMany({
    where: { userId: session.user.id },
    include: { product: true },
  });

  if (cartItems.length === 0) {
    throw new Error("Cart is empty");
  }

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.product.basePrice * item.quantity,
    0
  );

  const order = await db.order.create({
    data: {
      userId: session.user.id,
      totalAmount,
      status: "PENDING",
      orderItems: {
        create: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.basePrice,
        })),
      },
    },
  });

  // Clear the user's cart
  await db.cart.deleteMany({
    where: { userId: session.user.id },
  });

  return order;
};

export async function getUserOrders() {
  try {
    const user = await auth();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const orders = await db.order.findMany({
      where: {
        userId: user.user.id,
      },
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                name: true,
                images: {
                  select: {
                    url: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return orders;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw new Error("Failed to fetch orders");
  }
}
