"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getCart } from "@/actions/cart";
import { getUserDetails } from "@/actions/user";
import { createOrder } from "@/actions/order";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

export default function CheckoutPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const { data: cartData, isLoading: isCartLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  const [userDetails, setUser] =
    useState<Awaited<ReturnType<typeof getUserDetails>>>();

  useState(() => {
    getUserDetails().then(setUser);
  });

  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast({
        title: "Order Placed",
        description: "Your order has been successfully placed.",
      });
      router.push("/orders");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to place order",
      });
    },
  });

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    try {
      await createOrderMutation.mutateAsync();
    } finally {
      setIsProcessing(false);
    }
  };

  if (isCartLoading) {
    return <div>Loading...</div>;
  }

  const cartItems = cartData?.cartItems || [];
  const total = cartItems.reduce(
    (sum, item) => sum + item.product.basePrice * item.quantity,
    0
  );

  const address = [
    userDetails?.userdetails?.address.line,
    userDetails?.userdetails?.address.road,
    userDetails?.userdetails?.address.city,
    userDetails?.userdetails?.address.state,
    userDetails?.userdetails?.address.pincode,
  ]
    .filter(Boolean)
    .join(", "); // Join with a comma and space, filtering out any undefined values

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Input value={userDetails?.name || ""} readOnly />
              <Input value={userDetails?.email || ""} readOnly />
              <Input value={address || ""} readOnly />
              <Input value={userDetails?.userdetails?.phone || ""} readOnly />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between py-2">
                <span>
                  {item.product.name} x {item.quantity}
                </span>
                <span>₹{item.product.basePrice * item.quantity}</span>
              </div>
            ))}
            <div className="flex justify-between py-2 font-bold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-500"
              onClick={handlePlaceOrder}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Place Order"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
