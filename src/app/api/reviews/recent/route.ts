import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const reviews = await db.review.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        rating: true,
        comment: true,
        createdAt: true,
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
