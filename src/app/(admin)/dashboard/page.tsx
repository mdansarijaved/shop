import RecentActivity from "@/components/admin/RecentActivity";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { IconMenuOrder, IconMoneybag } from "@tabler/icons-react";
import {
  BaggageClaim,
  DollarSign,
  List,
  ListOrdered,
  Plus,
  User,
} from "lucide-react";
import Link from "next/link";

import React from "react";

async function AdminDashboard() {
  const users = await db.user.count();
  const productsCount = await db.product.count();
  const ordercount = await db.orderItem.count();
  const totalRevenue = await db.order.aggregate({
    where: {
      status: {
        not: "CANCELLED",
      },
    },
    _sum: {
      totalAmount: true,
    },
  });
  return (
    <div className="w-full h-full ">
      <div className="flex-1 w-full flex flex-col overflow-hidden">
        <main className="flex-1 w-full overflow-y-auto  p-4">
          <div className="w-full mx-auto">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                Dashboard Overview
              </h1>

              <div className="flex justify-center items-center gap-5">
                <Link
                  href={"/dashboard/products"}
                  className={buttonVariants({ variant: "outline" })}
                >
                  Add products <Plus />{" "}
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
                  <CardTitle className=" font-medium">Total users</CardTitle>
                  <User />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{users}</div>
                </CardContent>
              </Card>
              <Card className="">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
                  <CardTitle className=" font-medium">Revenue</CardTitle>
                  <DollarSign />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    Rs.{totalRevenue._sum.totalAmount}
                  </div>
                </CardContent>
              </Card>
              <Card className="">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
                  <CardTitle className=" font-medium">
                    {} Product count
                  </CardTitle>
                  <List />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{productsCount}</div>
                </CardContent>
              </Card>
              <Card className="">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
                  <CardTitle className=" font-medium">{}Total Orders</CardTitle>
                  <BaggageClaim />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{ordercount}</div>
                </CardContent>
              </Card>
            </div>
            <div className="mt-8">
              <RecentActivity />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
