import { ShoppingBag } from "lucide-react";

export function OrdersHeader({ ordersCount }: { ordersCount: number }) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
        <p className="text-muted-foreground">
          View and track all your orders in one place
        </p>
      </div>
      <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2">
        <ShoppingBag className="h-5 w-5 text-primary" />
        <span className="font-medium">
          {ordersCount} {ordersCount === 1 ? "Order" : "Orders"}
        </span>
      </div>
    </div>
  );
}
