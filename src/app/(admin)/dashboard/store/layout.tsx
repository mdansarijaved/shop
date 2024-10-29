import { auth } from "@/auth";
import { AppSidebar } from "@/components/appSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import React from "react";

async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1  gap-1 p-4">
      <div className="">{children}</div>
    </div>
  );
}

export default AdminLayout;
