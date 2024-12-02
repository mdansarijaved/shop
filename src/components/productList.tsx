"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Category } from "@prisma/client";
import { ProductImage } from "./product-image";
import { ProductPrice } from "./product-Price";
import { ProductActions } from "./product-action";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  slug: string;
  isFeatured: boolean;
  isPromoted: boolean;
  discountPrice: number | null;
  images: {
    url: string;
  }[];
  category: Category;
};

export default function ProductList({ product }: { product: Product }) {
  return (
    <Card className="h-full rounded-lg transition-all duration-300 hover:shadow-lg">
      <Link href={`/products/${product.slug}`}>
        <CardContent className="p-0">
          <ProductImage url={product.images[0].url} alt={product.name} />
          <div className="flex flex-col w-full gap-1 p-4">
            <ProductPrice
              price={product.basePrice}
              discountPrice={product.discountPrice}
            />
            <h3 className="font-semibold text-lg line-clamp-1">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground">{product.category}</p>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="flex flex-col items-start gap-3 p-4">
        {/* <ProductActions /> */}
      </CardFooter>
    </Card>
  );
}
