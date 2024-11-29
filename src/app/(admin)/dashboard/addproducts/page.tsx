import CreateNewProduct from "@/components/admin/products/CreateNewProduct";
import React from "react";

function page() {
  return (
    <div className="w-full px-3 md:px-7 lg:px-8 xl:px-10">
      <p className="text-3xl font-semibold pt-5">Add Products</p>
      <CreateNewProduct />
    </div>
  );
}

export default page;
