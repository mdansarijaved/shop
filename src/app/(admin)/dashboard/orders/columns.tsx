"use client";

import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
interface OrderUser {
  email: string | null;
}

interface Order {
  status: string;
  user: OrderUser;
}
interface Product {
  name: string;
}
interface ProductSelection {
  id: string;
  order: Order;
  price: number;
  quantity: number;
  product: Product;
}
const getStatusStyle = (status: string) => {
  const baseStyles = "px-2.5 py-1 rounded-full text-xs font-medium capitalize";

  switch (status.toLowerCase()) {
    case "pending":
      return cn(baseStyles, "bg-yellow-100 text-yellow-800");
    case "processing":
      return cn(baseStyles, "bg-blue-100 text-blue-800");
    case "completed":
      return cn(baseStyles, "bg-green-100 text-green-800");
    case "cancelled":
      return cn(baseStyles, "bg-red-100 text-red-800");
    case "shipped":
      return cn(baseStyles, "bg-purple-100 text-purple-800");
    case "delivered":
      return cn(baseStyles, "bg-emerald-100 text-emerald-800");
    default:
      return cn(baseStyles, "bg-gray-100 text-gray-800");
  }
};

export const columns: ColumnDef<ProductSelection>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "product.name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "order.status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.order.status;
      return (
        <div className="flex w-full items-center justify-start">
          <span className={getStatusStyle(status)}>{status.toLowerCase()}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "order.user.email",
    header: "Email",
  },
];
