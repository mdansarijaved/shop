import { auth } from "@/auth";
import { AppSidebar } from "@/components/appSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import React from "react";

async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await auth();
  if (user?.user.role != "ADMIN") {
    redirect("/");
  }
  return (
    <SidebarProvider>
      <div className="flex justify-center items-center">
        <AppSidebar />
        <main className="flex justify-start items-start h-full w-full">
          <SidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}

export default AdminLayout;
