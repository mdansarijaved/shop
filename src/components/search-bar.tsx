"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Image from "next/image";

export function SearchBar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const searchProducts = async (searchQuery: string) => {
    if (!searchQuery) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearch = useCallback(
    debounce((value: string) => searchProducts(value), 300),
    []
  );

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
    debouncedSearch(value);
  };

  const handleSelect = (productId: string) => {
    setOpen(false);
    router.push(`/products/${productId}`);
  };

  return (
    <div className="relative w-full xl:w-96">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search products..."
          className="pl-8 bg-gray-100 w-full"
        />
      </div>
      {query.length > 0 && open && (
        <div className="absolute top-full w-full mt-2 rounded-md border bg-white shadow-md z-[999999]">
          <Command>
            <CommandList>
              <CommandEmpty>
                {isLoading ? "Searching..." : "No results found."}
              </CommandEmpty>
              <CommandGroup heading="Products">
                {results.map((product) => (
                  <CommandItem
                    key={product.id}
                    onSelect={() => handleSelect(product.id)}
                    className="flex items-center gap-2 p-2"
                  >
                    <div className="relative h-10 w-10">
                      <Image
                        src={product.images[0]?.url || "/placeholder.png"}
                        alt={product.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        ₹{product.basePrice}
                      </p>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
}
