import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const orders = await db.order.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        totalAmount: true,
        createdAt: true,
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
