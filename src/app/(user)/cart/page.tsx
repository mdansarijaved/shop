"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
import { getSession, getUserDetails } from "@/actions/user";

type CartItem = {
  id: string;
  product: {
    id: string;
    name: string;
    basePrice: number;
    images: { url: string }[];
  };
  quantity: number;
};

export default function CartPage() {
  const [localCartItems, setLocalCartItems] = useState<CartItem[]>([]);
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: session } = useQuery({
    queryKey: ["user"],
    queryFn: getSession,
  });

  const [userDetails, setUser] =
    useState<Awaited<ReturnType<typeof getUserDetails>>>();

  useState(() => {
    getUserDetails().then(setUser);
  });

  console.log(userDetails);

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
        description:
          error instanceof Error ? error.message : "Failed to remove item",
      });
    },
  });

  const proceedToCheckout = () => {
    if (
      !userDetails ||
      !userDetails.userdetails?.address ||
      !userDetails.userdetails.phone
    ) {
      router.push("/account");
      toast({
        title: "Incomplete Information",
        description: "Please complete your account details before checkout.",
        variant: "destructive",
      });
      return;
    }

    router.push("/checkout");
  };

  if (isLoading && session) {
    return <CartSkeleton />;
  }

  const cartItems: CartItem[] = session
    ? (cartData?.cartItems as CartItem[])
    : localCartItems;

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
      return total + item.product.basePrice * item.quantity;
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
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="flex items-center gap-4">
                    <Image
                      src={item.product.images[0]?.url || "/placeholder.svg"}
                      alt={item.product.name}
                      width={80}
                      height={80}
                      className="rounded-md"
                    />
                    <span>{item.product.name}</span>
                  </TableCell>
                  <TableCell>₹{item.product.basePrice}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
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
            onClick={proceedToCheckout}
          >
            Proceed to Checkout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
