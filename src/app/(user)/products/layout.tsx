import Banner from "@/components/banner";
import { FloatingNavDemo } from "@/components/navbar";
import React from "react";

function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
    </div>
  );
}

export default UserLayout;
