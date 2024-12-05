"use client";

import { useQuery } from "@tanstack/react-query";
import { ProductDataTable } from "./product-data-table";
import { getProducts } from "@/actions/product";
import { productColumns } from "./product-columns";

export default function ProductTable() {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin products"],
    queryFn: () => getProducts(),
  });

  if (isError) {
    return <div>Error loading products.</div>;
  }

  return (
    <div className="w-full p-5">
      <ProductDataTable
        columns={productColumns}
        data={products!}
        isLoading={isLoading}
      />
    </div>
  );
}
