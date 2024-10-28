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
      <div className="flex justify-center items-center w-full">
        <AppSidebar />
        <main className="flex  h-full relative w-full ">
          <SidebarTrigger className="sticky top-0 left-2" />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}

export default AdminLayout;
