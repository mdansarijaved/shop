"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import AllProudct from "@/components/admin/products/AllProudct";
import CreateNewProduct from "@/components/admin/products/CreateNewProduct";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateCategories from "@/components/admin/products/CreateCategories";

const TABS = {
  products: "All Products",
  lowStock: "Low stock",
  createProduct: "Create New Product",
  createCategories: "Create Categories",
} as const;

type TabValue = (typeof TABS)[keyof typeof TABS];

export default function AddProductForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "products";

  // Convert URL-friendly tab parameter to display value
  const getTabDisplay = useCallback((tab: string): TabValue => {
    switch (tab) {
      case "products":
        return TABS.products;
      case "lowStock":
        return TABS.lowStock;
      case "createProduct":
        return TABS.createProduct;
      case "createCategories":
        return TABS.createCategories;
      default:
        return TABS.products;
    }
  }, []);

  // Convert display value to URL-friendly parameter
  const getTabParam = useCallback((tab: TabValue): string => {
    switch (tab) {
      case TABS.products:
        return "products";
      case TABS.lowStock:
        return "lowStock";
      case TABS.createProduct:
        return "createProduct";
      case TABS.createCategories:
        return "createCategories";
      default:
        return "products";
    }
  }, []);

  const handleTabChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", getTabParam(value as TabValue));
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams, getTabParam]
  );

  return (
    <div className="w-full p-2 md:p-5 xl:p-10">
      <Tabs
        defaultValue={getTabDisplay(currentTab)}
        value={getTabDisplay(currentTab)}
        onValueChange={handleTabChange}
      >
        <TabsList>
          <TabsTrigger value={TABS.products}>Products</TabsTrigger>
          <TabsTrigger value={TABS.lowStock}>Low in stock</TabsTrigger>
          <TabsTrigger value={TABS.createProduct}>Create New</TabsTrigger>
          <TabsTrigger value={TABS.createCategories}>
            Create categories
          </TabsTrigger>
        </TabsList>

        <TabsContent className="w-full" value={TABS.products}>
          <AllProudct />
        </TabsContent>

        <TabsContent className="w-full" value={TABS.lowStock}>
          {/* Add your low stock component here */}
        </TabsContent>

        <TabsContent className="w-full" value={TABS.createProduct}>
          <CreateNewProduct />
        </TabsContent>

        <TabsContent className="w-full" value={TABS.createCategories}>
          <CreateCategories />
        </TabsContent>
      </Tabs>
    </div>
  );
}
