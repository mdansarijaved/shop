import * as React from "react";
import { db } from "@/lib/db";
import ProductList from "./productList";

export async function Favourites() {
  const products = await db.product.findMany({
    where: {
      isFeatured: true,
    },
    include: {
      images: true,
      costPerFoot: true,
      options: true,
    },
    take: 6,
  });

  return (
    <div className="w-full max-w-[1920px] mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-semibold text-gray-900">
            Collection in focus
          </h2>
          <p className="text-sm text-gray-600 mt-1">All our favourites</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((item) => (
          <ProductList key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}
