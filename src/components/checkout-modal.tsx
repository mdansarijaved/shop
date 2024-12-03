"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "@/actions/user";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: any[];
  total: number;
}

export function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  total,
}: CheckoutModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUserDetails,
  });

  const handleCheckout = async () => {
    try {
      setIsProcessing(true);

      // Send order confirmation emails
      await axios.post("/api/send", {
        user,
        cartItems,
        total,
      });

      toast({
        title: "Order Placed Successfully!",
        description: "You will receive an email confirmation shortly.",
      });

      onClose();
    } catch (error) {
      console.error("Checkout failed:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process your order. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Your Order</DialogTitle>
          <DialogDescription>
            Please verify your details before proceeding with the order.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h3 className="font-medium">Contact Information</h3>
            <p className="text-sm">Email: {user?.email}</p>
            <p className="text-sm">
              Phone: {user?.userdetails?.phone || "Not provided"}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Shipping Address</h3>
            <p className="text-sm">
              {typeof user?.userdetails?.address === "string"
                ? user.userdetails.address
                : `${user?.userdetails?.address?.line}, ${user?.userdetails?.address?.road}, ${user?.userdetails?.address?.city}, ${user?.userdetails?.address?.state} - ${user?.userdetails?.address?.pincode}` ||
                  "Not provided"}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Order Summary</h3>
            <p className="text-sm">Total Items: {cartItems.length}</p>
            <p className="text-sm font-medium">Total Amount: ₹{total}</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleCheckout}
            disabled={isProcessing}
            className="bg-blue-600 hover:bg-blue-500"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing
              </>
            ) : (
              "Confirm Order"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
