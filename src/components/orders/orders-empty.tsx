import { PackageX } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function OrdersEmpty() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4 text-center">
      <div className="rounded-full bg-muted p-4">
        <PackageX className="h-8 w-8 text-muted-foreground" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">No orders found</h2>
        <p className="text-muted-foreground">
          You haven't placed any orders yet. Start shopping to see your orders
          here.
        </p>
      </div>
      <Button asChild>
        <Link href="/">Browse Products</Link>
      </Button>
    </div>
  );
}
