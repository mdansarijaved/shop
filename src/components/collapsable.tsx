"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function Collapse({onCategoryChange , selectedCategories}) {
  const [openFilterIndex, setOpenFilterIndex] = React.useState<number | null>(
    null
  );

  const handleCheckboxChange = (category) => {
    const updatedCategory = selectedCategories.includes(category)
      ? selectedCategories.filter((item) => item !== category)
      : [...selectedCategories, category];
    
    onCategoryChange(updatedCategory); // Update the parent component
  };

  const filters = [
    {
      name: "Items",
      options: [
        { label: "Bed", category: "Bed" },
        { label: "Fan", category: "Fan" },
        { label: "Wardrobe", category: "Wardrobe" },
        { label: "Dining Table", category: "Dining Table" },
        { label: "Door", category: "Door" },
        { label: "Sofa", category: "Sofa" },
        { label: "Temple", category: "Temple" },
        { label: "TV Stand", category: "TV Stand" },
      ],
    },
    {
      name: "Color",
      options: [
        { label: "Brown", category: "Brown" },
        { label: "Red", category: "Red" },
        { label: "White", category: "White" },
        { label: "Purple", category: "Purple" },
      ],
    },
    {
      name: "Material",
      options: [
        { label: "Cotton", category: "Cotton" },
        { label: "Nylon", category: "Nylon" },
        { label: "Wool", category: "Wool" },
      ],
    },
  ];

  return (
    <div className="space-y-2">
      {filters.map((filter, index) => (
        <Collapsible
          key={index}
          open={openFilterIndex === index}
          onOpenChange={() =>
            setOpenFilterIndex(openFilterIndex === index ? null : index)
          }
          className="space-y-2"
        >
          <div className="flex items-center justify-between space-x-4 border-t pt-2">
            <h4 className="text-[0.75rem] 2xl:text-xl font-semibold">{filter.name}</h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 p-0">
                <ChevronDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div className="text-[0.65rem] 2xl:text-xl space-y-2 px-4">
              {filter.options.map((option) => (
                <div key={option.label} className="flex items-center space-x-2 space-y-1">
                  <input
                    type="checkbox"
                    id={`${filter.name}-${option.label}`}
                    onChange={() => handleCheckboxChange(option.category)}
                    checked={selectedCategories.includes(option.category)}
                  />    
                  <label htmlFor={`${filter.name}-${option.label}`}>{option.label}</label>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}
