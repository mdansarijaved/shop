"use client";

import { format } from "date-fns";
import { Package } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { $Enums } from "@prisma/client";

const statusColors = {
  PENDING: "bg-yellow-500",
  SHIPPED: "bg-blue-500",
  DELIVERED: "bg-green-500",
  CANCELLED: "bg-red-500",
};

// Define the Product type
interface Product {
  name: string;
  images: {
    url: string;
  }[];
}

// Define the OrderItem type
interface OrderItem {
  id: string;
  productId: string;
  orderId: string;
  quantity: number;
  price: number;
  product: Product;
}

// Define the Order type
interface Order {
  id: string;
  userId: string;
  totalAmount: number;
  status: $Enums.OrderStatus; // Assuming $Enums.OrderStatus is defined elsewhere
  createdAt: Date;
  updatedAt: Date;
  orderItems: OrderItem[];
}

export function OrderCard({ order }: { order: Order }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={order.orderItems[0].product.images[0].url}
            alt={order.orderItems[0].product.name}
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col items-start justify-between">
          <h3 className="text-lg font-semibold">Order #{order.id}</h3>
          <Badge className={statusColors[order.status]}>
            {order.status.toLowerCase()}
          </Badge>
        </div>
        <div className="mt-4 space-y-2">
          <p className="text-sm text-muted-foreground">
            {order.orderItems[0].product.name}
          </p>
          <p className="flex items-center gap-2 text-sm">
            <Package className="h-4 w-4" />
            {order.orderItems.length}{" "}
            {order.orderItems.length === 1 ? "item" : "items"}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-4">
        <p className="text-sm text-muted-foreground">
          <span>order placed at </span>
          {format(new Date(order.createdAt), "MMM d, yyyy")}
        </p>
        <p className="font-semibold">₹{order.totalAmount.toLocaleString()}</p>
      </CardFooter>
    </Card>
  );
}
