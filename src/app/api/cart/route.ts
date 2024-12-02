import { auth } from "@/auth";
import { db } from "@/lib/db";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await auth();
    if (!user?.user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { productId, productOptionId, quantity, customNotes } = body;

    const cartItem = await db.cart.create({
      data: {
        userId: user.user.id,
        productId,
        productOptionId,
        quantity,
        customNotes,
      },
    });

    return NextResponse.json(cartItem);
  } catch (error) {
    console.error("[CART_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
