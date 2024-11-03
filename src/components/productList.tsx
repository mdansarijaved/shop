"use client";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";

type Product = {
  category: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  };
  id: string;
  name: string;
  description: string;
  price: number;
  slug: string;
  isFeatured: boolean;
  isPromoted: boolean;
  discountPercent: number | null;
  images: {
    url: string;
  }[];
};
export default function ProductList({ product }: { product: Product }) {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <Carousel className="w-full">
          <CarouselContent>
            {product.images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-square">
                  <Image
                    src={image.url}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </CardContent>
      <CardFooter className="flex flex-col items-start h-full  gap-2 p-4">
        <div className="flex justify-between items-start w-full">
          <div>
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-sm text-muted-foreground">
              {product.category.name}
            </p>
          </div>
          <div>
            <Badge variant={product.isPromoted ? "default" : "secondary"}>
              ₹{product.price.toFixed(2)}
            </Badge>
            {product.discountPercent && (
              <Badge variant="destructive">
                {product.discountPercent}% OFF
              </Badge>
            )}
          </div>
        </div>

        <div className="flex justify-between items-end   w-full mt-2">
          <Button variant="default" className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </Button>
          <Button
            onClick={() => setIsLiked(!isLiked)}
            className="p-2 rounded-full bg-secondary"
          >
            <Heart
              className={`w-5 h-5 ${
                isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground"
              }`}
            />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
