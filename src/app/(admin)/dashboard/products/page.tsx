import AllProudct from "@/components/admin/products/AllProudct";
import CreateNewProduct from "@/components/admin/products/CreateNewProduct";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function AddProductForm() {
  return (
    <div className="w-full p-2 md:p-5 xl:p-10">
      {" "}
      <Tabs defaultValue="All Products">
        <TabsList>
          <TabsTrigger value="All Products">Products</TabsTrigger>
          <TabsTrigger value="Low stock">Low in stock</TabsTrigger>
          <TabsTrigger value="Create New Product">Create New</TabsTrigger>
        </TabsList>
        <TabsContent className="w-full" value="All Products">
          <AllProudct />
        </TabsContent>
        <TabsContent className="w-full" value="All Products"></TabsContent>
        <TabsContent className="w-full" value="Create New Product">
          <CreateNewProduct />
        </TabsContent>
      </Tabs>
    </div>
  );
}
