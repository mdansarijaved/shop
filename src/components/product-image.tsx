"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductImageProps {
  url: string;
  alt: string;
  className?: string;
}

export function ProductImage({ url, alt, className }: ProductImageProps) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-t">
      <Image
        src={url}
        alt={alt}
        fill
        className={cn(
          "object-cover transition-all duration-300 hover:scale-105",
          className
        )}
      />
    </div>
  );
}
