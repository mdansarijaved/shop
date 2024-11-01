"use client";
import React, { useCallback, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ProductCard from "./porductCard";
import { useProducts } from "@/hooks/useProducts";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/actions/product";
import { SortAsc } from "lucide-react";

function AllProducts() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get("category") || "all"
  );
  const [selectedPrice, setSelectedPrice] = useState<string>(
    searchParams.get("price") || "all"
  );

  const createSearchQuery = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "all") {
          params.delete(key);
        } else if (value.trim() !== "") {
          params.set(key, value);
        }
      });

      return params.toString();
    },
    [searchParams]
  );

  const {
    data: categories,
    isPending: categoriesPending,
    error: categoriesError,
  } = useQuery({
    queryKey: ["category"],
    queryFn: () => getAllCategories(),
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const updates: Record<string, string | null> = {};

    if (searchInputRef.current?.value) {
      updates.search = searchInputRef.current.value;
    }

    if (selectedCategory !== "all") {
      updates.category = selectedCategory;
    }

    if (selectedPrice !== "all") {
      updates.price = selectedPrice;
    }

    const queryString = createSearchQuery(updates);
    router.push(`${pathname}${queryString ? `?${queryString}` : ""}`);
  };

  const handleClearFilters = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
    setSelectedCategory("all");
    setSelectedPrice("all");
    router.push(pathname);
  };

  const { data, isPending, isError } = useProducts(searchParams);

  if (isPending) {
    return (
      <div className="flex justify-center items-center ">
        <div className="flex flex-col items-center gap-2">
          <p>Loading products...</p>
          <div className="h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center ">
        <p className="text-red-500">Error loading products</p>
      </div>
    );
  }

  return (
    <div className=" py-8">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <Input
              ref={searchInputRef}
              placeholder="Search products..."
              defaultValue={searchParams.get("search") ?? ""}
            />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                {categories?.map((category, index) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select value={selectedPrice} onValueChange={setSelectedPrice}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Price Range</SelectLabel>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="0-5000">0 - 5000</SelectItem>
                <SelectItem value="5001-10000">5001 - 10000</SelectItem>
                <SelectItem value="10001-20000">10001 - 20000</SelectItem>
                <SelectItem value="20001-plus">20001+</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button type="submit">Apply Filters</Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleClearFilters}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </form>

      {/* Active Filters Display */}
      <div className="mt-4 flex flex-wrap gap-2">
        {searchParams.get("search") && (
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            Search: {searchParams.get("search")}
          </div>
        )}
        {searchParams.get("category") && (
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
            Category: {searchParams.get("category")}
          </div>
        )}
        {searchParams.get("price") && (
          <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
            Price: {searchParams.get("price")}
          </div>
        )}
      </div>
      <div className="flex justify-between items-center ">
        <p className="border rounded-md p-2 w-fit my-2">Total: {data.total}</p>
        <Button
          onClick={() => {
            data.products.sort(
              (a, b) => a.orderItems.length - b.orderItems.length
            );
          }}
          className="flex justify-center items-center"
          variant={"outline"}
        >
          <SortAsc /> order by orders{" "}
        </Button>
      </div>
      <div className="grid xl:grid-cols-2 gap-6 mt-3  xl:mt-4">
        {data.products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default AllProducts;
