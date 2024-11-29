"use client";
import {
  Home,
  Plus,
  ReceiptText,
  ShoppingCart,
  Store,
  UserPen,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Products",
    url: "/dashboard/products",
    icon: ShoppingCart,
  },
  {
    title: "Add Products",
    url: "/dashboard/addproducts",
    icon: Plus,
  },
  {
    title: "Orders",
    url: "/dashboard/orders",
    icon: ReceiptText,
  },
  {
    title: "Store",
    url: "/dashboard/store",
    icon: Store,
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: UserPen,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={`${
                        pathname === item.url ? "bg-gray-200" : ""
                      }`}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
