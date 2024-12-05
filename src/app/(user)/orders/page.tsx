"use client";
import { getUserOrders } from "@/actions/order";
import { OrderCard } from "@/components/orders/order-card";
import { OrdersEmpty } from "@/components/orders/orders-empty";
import { OrdersHeader } from "@/components/orders/orders-header";
import { OrdersSkeleton } from "@/components/orders/orders-skeleton";
import { useQuery } from "@tanstack/react-query";

// Mock data - Replace with actual API call

export default function OrdersPage() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getUserOrders(),
  });

  if (!orders) {
    return <OrdersEmpty />;
  }

  if (isLoading) {
    return <OrdersSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <OrdersHeader ordersCount={orders.length} />
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
