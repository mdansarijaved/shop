import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Package, ShoppingCart, TrendingUp, AlertCircle } from "lucide-react";

interface products {
  category: {
    name: string;
  };
  id: string;
  name: string;
  price: number;
  stock: number;
  images: {
    id: string;
    productId: string;
    url: string;
  }[];
  orderItems: {
    quantity: number;
  }[];
}

export default function ProductCard({ product }: { product: products }) {
  const isLowStock = product.stock < 10;

  return (
    <Card className="w-full flex justify-start items-start rounded-md">
      <CardHeader>
        <div className="flex flex-col gap-2">
          <Badge variant="outline" className="max-w-40 w-full">
            {product.category.name}
          </Badge>
        </div>

        <div className="aspect-square relative mb-4">
          <Image
            src={product.images[0].url}
            alt={product.name}
            width={400}
            height={400}
            className="object-cover rounded-md w-40 h-40"
          />
        </div>
      </CardHeader>
      <div className="w-full">
        <CardContent>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="secondary">ID: {product.id}</Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Product ID</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="text-2xl">{product.name}</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Package className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                Stock: {product.stock}
              </span>
              {isLowStock && (
                <AlertCircle className="ml-2 h-4 w-4 text-destructive" />
              )}
            </div>
            <div className="flex items-center">
              <ShoppingCart className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                Orders: {product.orderItems.length}
              </span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="mr-2 h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-center">
              <span className="text-lg font-bold">
                ${product.price.toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Edit</Button>
          <Button>View Details</Button>
        </CardFooter>
      </div>
    </Card>
  );
}
