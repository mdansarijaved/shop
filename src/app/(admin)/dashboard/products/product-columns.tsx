"use client";

import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleProductVisibility } from "@/actions/product";

interface Product {
  id: string;
  name: string;
  basePrice: number;
  stock: number;
  discountPrice?: number | null;
  visible: boolean;
  images: {
    url: string;
  }[];
}

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "images",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.original.images[0]?.url;
      return imageUrl ? (
        <Image
          src={imageUrl}
          alt={row.original.name}
          width={100}
          height={100}
          className="w-20 h-16 object-cover rounded-lg"
        />
      ) : (
        <span>No Image</span>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "basePrice",
    header: "Price",
    cell: ({ row }) => {
      const price = row.original.basePrice;
      return <div>₹{price}</div>;
    },
    sortingFn: "basic",
  },
  {
    accessorKey: "stock",
    header: "Stock",
    sortingFn: "basic",
  },
  {
    accessorKey: "discountPrice",
    header: "Discount Price",
    cell: ({ row }) => {
      const discountPrice = row.original.discountPrice;
      return discountPrice ? `₹${discountPrice}` : "N/A";
    },
  },
  {
    accessorKey: "visible",
    header: "Visibility",
    cell: ({ row }) => {
      const isVisible = row.original.visible;
      return (
        <span
          className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            isVisible
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          )}
        >
          {isVisible ? "Visible" : "Hidden"}
        </span>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const productId = row.original.id;
      const queryClient = useQueryClient();
      const mutation = useMutation({
        mutationFn: toggleProductVisibility,
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["admin products"],
          });
        },
      });
      const handleCopyId = () => {
        navigator.clipboard.writeText(productId);
        alert(`Product ID ${productId} copied to clipboard!`);
      };

      const handleToggleVisibility = () => {
        mutation.mutate(productId);
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Actions</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleCopyId}>Copy ID</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleToggleVisibility()}>
              Make Visible
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleToggleVisibility()}>
              Hide
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
