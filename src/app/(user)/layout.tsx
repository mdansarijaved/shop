import Banner from "@/components/banner";
import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";

import React from "react";

function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <Banner />
      {children}
      <Footer />
    </div>
  );
}

export default UserLayout;
