"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export function ProductActions() {
  return (
    <Button
      variant="default"
      className="flex items-center w-full bg-blue-500 hover:bg-blue-600 gap-2"
    >
      <ShoppingCart className="w-4 h-4" />
      Add to Cart
    </Button>
  );
}
