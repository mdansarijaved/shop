import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";

import React from "react";

function AdminDashboard() {
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
              <DashboardCard
                title="Total Users"
                value="1,234"
                description="8% increase from last month"
              />
              <DashboardCard
                title="Revenue"
                value="$12,345"
                description="12% increase from last month"
              />
              <DashboardCard
                title="Active Projects"
                value="42"
                description="3 new projects this week"
              />
              <DashboardCard
                title="Tasks Completed"
                value="789"
                description="15% increase in productivity"
              />
            </div>
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ActivityItem
                    title="New user registered"
                    description="John Doe created an account"
                    time="2 hours ago"
                  />
                  <ActivityItem
                    title="Project completed"
                    description="Marketing campaign finished successfully"
                    time="5 hours ago"
                  />
                  <ActivityItem
                    title="New order received"
                    description="Customer purchased Premium plan"
                    time="1 day ago"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;

function DashboardCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className=" font-medium">{title}</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function ActivityItem({
  title,

  description,
  time,
}: {
  title: string;

  description: string;
  time: string;
}) {
  return (
    <div className="flex items-center space-x-4 rounded-md border p-4">
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="text-sm text-muted-foreground">{time}</div>
    </div>
  );
}
