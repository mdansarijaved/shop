"use client"

import React, { useEffect, useState } from "react";
import { Collapse } from "@/components/collapsable";
import { Combobox } from "@/components/sort";
import ProductList from "@/components/productList";
import { useRouter } from "next/navigation";

function Products() {
  const router = useRouter();
  const { query } = router;
  const [selectedCategories, setSelectedCategories] = useState([]);
  
    useEffect(() => {
      if (query?.category) {
        // Set selected category from the query parameters
        setSelectedCategories([query.category]);
      }
    }, [query]);

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
  };

  return (
    <div className="md:w-[80%] px-4 mx-auto mt-6 md:flex gap-4">
      <div className="2xl:w-96 md:min-w-60 px-8 text-[0.75rem] 2xl:text-2xl mx-auto items-center">
        <div className="flex justify-between pb-2">
          <h1 className=" font-semibold">FILTERS</h1>
          <button className="text-[#6f4b25] font-semibold ">Clear all</button>
        </div>
        <Collapse selectedCategories={selectedCategories} onCategoryChange={handleCategoryChange}/>
      </div>
      <div className="w-full">
        <div className="flex justify-end mt-10 md:mt-0">
        <Combobox/>
        </div>
        <ProductList selectedCategories={selectedCategories}/>
      </div>
    </div>
  );
}

export default Products;
