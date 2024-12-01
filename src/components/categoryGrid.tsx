"use client";
import { ArrowDown, ArrowUp } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

// Mapping of categories to icons or descriptive texts
const CategoryIcons = {
  KITCHEN: "/home1.jpg",
  WARDROBE: "/home2.jpg",
  SHOERACK: "/home3.jpg",
  PARTITION: "/home4.jpg",
  DRESSER: "/sofasofa.jpg",
  WALLDESIGN: "/flooring1.jpg",
  INTERIOR: "/home2.jpg",
  DOORS: "/home3.jpg",
  EXTERIOR: "/home1.jpg",
  HOMEDECOR: "/sofasofa.jpg",
};

export enum Category {
  KITCHEN = "KITCHEN",
  WARDROBE = "WARDROBE",
  SHOERACK = "SHOERACK",
  PARTITION = "PARTITION",
  DRESSER = "DRESSER",
  WALLDESIGN = "WALLDESIGN",
  INTERIOR = "INTERIOR",
  DOORS = "DOORS",
  EXTERIOR = "EXTERIOR",
  HOMEDECOR = "HOMEDECOR",
}

export default function CategoryGrid() {
  const [showAll, setShowAll] = useState(false);

  // Convert enum to array of categories
  const categories = Object.values(Category);

  // Render a category item
  const renderCategoryItem = (category: Category) => (
    <div
      key={category}
      className="h-full flex-1 w-full rounded-xl overflow-hidden relative border bg-blue-100 flex justify-center items-center flex-col"
    >
      <Image
        src={CategoryIcons[category]}
        width={500}
        height={500}
        className="object-cover w-full h-full"
        alt={category}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/50 transition-all duration-300 group flex justify-center items-center text-white">
        <div className="text-2xl hidden group-hover:block transition-all duration-300 ">
          {category}
        </div>
      </div>
    </div>
  );

  // First row of categories (first 5)
  const firstRowCategories = categories.slice(0, 5);

  // Second row of categories (next 5)
  const secondRowCategories = categories.slice(5);

  return (
    <div className="my-10 grid gap-4 px-4 sm:px-6 lg:px-8">
      {/* First row */}
      <div className="flex flex-col sm:flex-row h-auto sm:h-[500px] gap-3">
        <div className="sm:flex-1 rounded-xl border h-[250px] sm:h-full bg-blue-100 flex justify-center items-center flex-col">
          {renderCategoryItem(firstRowCategories[0])}
        </div>
        <div className="sm:flex-1 flex flex-col justify-center items-center gap-3">
          {firstRowCategories.slice(1, 3).map(renderCategoryItem)}
        </div>
        <div className="sm:flex-1 rounded-xl h-[250px] sm:h-full flex flex-col sm:flex-row justify-center items-center gap-3">
          {firstRowCategories.slice(3).map(renderCategoryItem)}
        </div>
      </div>

      {/* Second row (conditionally rendered) */}
      <div
        className={`flex flex-col sm:flex-row h-auto sm:h-[500px] gap-3 ${
          showAll ? "" : "hidden"
        }`}
      >
        <div className="sm:flex-1 rounded-xl h-[250px] sm:h-full flex flex-col sm:flex-row justify-center items-center gap-3">
          {secondRowCategories.slice(0, 2).map(renderCategoryItem)}
        </div>
        <div className="sm:flex-1 rounded-xl border h-[250px] sm:h-full bg-blue-100 flex justify-center items-center flex-col">
          {renderCategoryItem(secondRowCategories[2])}
        </div>
        <div className="sm:flex-1 flex flex-col justify-center items-center gap-3">
          {secondRowCategories.slice(3).map(renderCategoryItem)}
        </div>
      </div>

      {/* Show more/less button */}
      <div className="w-full flex justify-center">
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-md hover:bg-blue-100 transition"
        >
          {showAll ? (
            <>
              Show Less <ArrowUp className="size-5 animate-bounce" />
            </>
          ) : (
            <>
              Show More <ArrowDown className="size-5 animate-bounce" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
