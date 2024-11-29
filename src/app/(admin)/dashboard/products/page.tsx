import AllProudct from "@/components/admin/products/AllProudct";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateCategories from "@/components/admin/products/CreateCategories";

const TABS = {
  products: "All Products",
  lowStock: "Low stock",
} as const;

type TabValue = (typeof TABS)[keyof typeof TABS];

export default function AddProductForm() {
  return (
    <div className="w-full p-2 md:p-5 xl:p-10">
      <Tabs defaultValue={TABS.products}>
        <TabsList>
          <TabsTrigger value={TABS.products}>Products</TabsTrigger>
          <TabsTrigger value={TABS.lowStock}>Low in stock</TabsTrigger>
        </TabsList>
        <TabsContent className="w-full" value={TABS.products}>
          <AllProudct />
        </TabsContent>
        <TabsContent className="w-full" value={TABS.lowStock}>
          {/* Add your low stock component here */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
