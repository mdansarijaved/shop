import { FloatingNavDemo } from "@/components/navbar";
import React from "react";

function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {" "}
      <FloatingNavDemo />
      {children}
    </div>
  );
}

export default UserLayout;
