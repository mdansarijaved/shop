"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, ShoppingCart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts, getProducts } from "@/actions/product";

const categories = ["Sofa", "Table", "Chair", "Storage", "Bed"];

export default function FurnitureShop() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const {
    data: products,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["product"],
    queryFn: () => getAllProducts(),
  });
  const filteredProducts = products?.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1] &&
      (selectedCategories.length === 0 ||
        selectedCategories.includes(product.category.name))
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 space-y-6 ">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Price Range</h3>
                <Slider
                  min={0}
                  max={1000}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Categories</h3>
                {categories.map((category) => (
                  <div
                    key={category}
                    className="flex items-center space-x-2 mb-2"
                  >
                    <Checkbox
                      id={category}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) => {
                        setSelectedCategories(
                          checked
                            ? [...selectedCategories, category]
                            : selectedCategories.filter((c) => c !== category)
                        );
                      }}
                    />
                    <label
                      htmlFor={category}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>

        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts?.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <img
                  src={product.images[0].url}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">{product.category.name}</p>
                  <p className="font-bold mt-2">${product.price}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Add to Cart</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
