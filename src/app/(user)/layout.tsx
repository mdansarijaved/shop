import { Navbar } from "@/components/navbar";
import Socials from "@/components/socials";
import React from "react";

function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* <Banner /> */}
      <Navbar />
      {children}
      <Socials />
    </div>
  );
}

export default UserLayout;
