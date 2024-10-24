import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { db } from "@/lib/db";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";

async function DashboardOrder() {
  const prodcuts = await db.orderItem.findMany({
    select: {
      id: true,
      order: {
        select: {
          status: true,
          totalAmount: true,
          user: {
            select: {
              email: true,
            },
          },
        },
      },
      price: true,
      quantity: true,
      product: {
        select: {
          name: true,
        },
      },
    },
  });

  const allProducts = prodcuts;
  const DeliveredProducts = prodcuts.filter(
    (product) => product.order.status === "DELIVERED"
  );
  const InProcessProduct = prodcuts.filter(
    (product) =>
      product.order.status === "PENDING" || product.order.status === "SHIPPED"
  );
  const cancledProducts = prodcuts.filter(
    (product) => product.order.status === "CANCELLED"
  );

  return (
    <div className="w-full  p-10">
      <Tabs defaultValue="All" className="w-full">
        <TabsList>
          <TabsTrigger value="All">All Orderes</TabsTrigger>
          <TabsTrigger value="In-Process">In Process</TabsTrigger>
          <TabsTrigger value="Delivered">Delivered</TabsTrigger>
          <TabsTrigger value="Cancled">Cancled</TabsTrigger>
        </TabsList>
        <TabsContent value="All" className="w-full">
          <div className="w-full  pt-2">
            <DataTable data={prodcuts} columns={columns} />
          </div>
        </TabsContent>
        <TabsContent value="In-Process">
          <div className="w-full  pt-2">
            <DataTable data={InProcessProduct} columns={columns} />
          </div>
        </TabsContent>
        <TabsContent value="Delivered">
          {" "}
          <div className="w-full  pt-2">
            <DataTable data={DeliveredProducts} columns={columns} />
          </div>
        </TabsContent>
        <TabsContent value="Cancled">
          {" "}
          <div className="w-full  pt-2">
            <DataTable data={cancledProducts} columns={columns} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default DashboardOrder;
