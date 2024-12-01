"use client";

import { cn } from "@/lib/utils";

interface ProductPriceProps {
  price: number;
  discountPrice: number | null;
}

export function ProductPrice({ price, discountPrice }: ProductPriceProps) {
  return (
    <div className="flex gap-2 items-baseline">
      <span
        className={cn(
          "text-base",
          discountPrice ? "line-through text-muted-foreground" : "font-bold"
        )}
      >
        ₹{price}
      </span>
      {discountPrice && (
        <div className="relative w-fit">
          <p className="bg-yellow-400 text-black px-3 py-0.5 rounded">
            <span className="font-semibold">₹{discountPrice}</span>
          </p>
        </div>
      )}
    </div>
  );
}
