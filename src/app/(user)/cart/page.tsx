"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

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
import { getCart, removeFromCartAction } from "@/actions/cart";
import { toast } from "@/hooks/use-toast";
import { CartSkeleton } from "@/components/cartSkeleton";
import { CheckoutModal } from "@/components/checkout-modal";
import { getSession } from "@/actions/user";

export default function CartPage() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [localCartItems, setLocalCartItems] = useState([]);
  const queryClient = useQueryClient();
  const { data: session } = useQuery({
    queryKey: ["user"],
    queryFn: getSession,
  });

  const {
    data: cartData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });

  useEffect(() => {
    if (!session) {
      const storedCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
      setLocalCartItems(storedCart);
    }
  }, [session]);

  const removeItem = useMutation({
    mutationFn: async (itemId: string) => {
      if (session) {
        return removeFromCartAction(itemId);
      } else {
        const updatedCart = localCartItems.filter((item) => item.id !== itemId);
        localStorage.setItem("guestCart", JSON.stringify(updatedCart));
        setLocalCartItems(updatedCart);
        return { success: true };
      }
    },
    onSuccess: () => {
      if (session) {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      }
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

  if (isLoading && session) {
    return <CartSkeleton />;
  }

  const cartItems = session ? cartData?.cartItems : localCartItems;

  if (!cartItems?.length) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p>Your cart is empty</p>
      </div>
    );
  }

  const calculateTotal = () => {
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
                      variant="destructive"
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
          <Button
            className="bg-blue-600 hover:bg-blue-500"
            size="lg"
            onClick={() => setIsCheckoutOpen(true)}
          >
            Checkout
          </Button>
        </CardFooter>
      </Card>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        total={calculateTotal()}
      />
    </div>
  );
}
