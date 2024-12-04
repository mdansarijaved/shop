export const dynamic = "force-dynamic";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json([]);
    }

    const products = await db.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
        visible: true,
      },
      include: {
        images: true,
        costPerFoot: true,
      },
      take: 5,
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("[SEARCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
