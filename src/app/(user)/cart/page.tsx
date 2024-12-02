"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { getCart, removeFromCartAction } from "@/actions/cart";
import { toast } from "@/hooks/use-toast";
import { CartSkeleton } from "@/components/cartSkeleton";

export default function CartPage() {
  const queryClient = useQueryClient();
  const {
    data: cartItems,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });

  const removeItem = useMutation({
    mutationFn: removeFromCartAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast({
        title: "Success",
        description: "Item removed from cart",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to remove item",
      });
    },
  });
  if (isLoading) {
    return <CartSkeleton />;
  }

  if (!cartItems?.length) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p>Your cart is empty</p>
      </div>
    );
  }

  const updateQuantity = (id: string) => {};

  const calculateTotal = () => {
    if (!cartItems) return 0;

    return cartItems.reduce((total, item) => {
      const itemPrice = item.product.basePrice * item.quantity;
      return total + itemPrice;
    }, 0);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="flex items-center gap-4">
                    <Image
                      src={item.product.images[0].url}
                      alt={item.product.name}
                      width={80}
                      height={80}
                      className="rounded-md"
                    />
                    <span>{item.product.name}</span>
                  </TableCell>
                  <TableCell>₹{item.product.basePrice}</TableCell>
                  <TableCell>
                    ₹{item.product.basePrice * item.quantity}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant={"destructive"}
                      size="icon"
                      onClick={() => removeItem.mutate(item.id)}
                      disabled={removeItem.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between p-6">
          <div className="text-lg font-semibold">
            Total: ₹{calculateTotal()}
          </div>
          <Button className="bg-blue-600 hover:bg-blue-500" size="lg">
            Checkout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
