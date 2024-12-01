"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Category } from "@prisma/client";
import { ProductImage } from "./product-image";
import { ProductPrice } from "./product-Price";
import { ProductActions } from "./product-action";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
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
    <Card className="h-full transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-0">
        <ProductImage url={product.images[0].url} alt={product.name} />
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-3 p-4">
        <div className="flex flex-col w-full gap-1">
          <ProductPrice
            price={product.price}
            discountPrice={product.discountPrice}
          />
          <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.category}</p>
        </div>

        <ProductActions />
      </CardFooter>
    </Card>
  );
}
