"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CostPerFoot = {
  id: string;
  productId: string;
  typeof: "MDF" | "HDMR" | "TEAKWOOD" | "FLUSH";
  cost: number;
};

export function CalculatePrice({
  productMaterialType,
}: {
  productMaterialType: CostPerFoot[];
}) {
  const [materialType, setMaterialType] = useState<CostPerFoot["typeof"] | "">(
    ""
  );
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [price, setPrice] = useState<number | null>(null);

  const calculatePrice = () => {
    const w = parseFloat(width);
    const l = parseFloat(length);

    if (isNaN(w) || isNaN(l) || !materialType) {
      alert("Please enter valid dimensions and select a material type.");
      return;
    }

    const area = l * w; // Calculate surface area
    console.log(area);
    const materialCost =
      productMaterialType.find((m) => m.typeof === materialType)?.cost || 0;
    console.log(materialCost);
    const totalPrice = area * materialCost;

    setPrice(totalPrice);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-blue-100">
          Calculate Cost for your dimensions
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Calculate Price</DialogTitle>
          <DialogDescription>
            Enter dimensions and select material type to calculate the price.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="material" className="text-right">
              Material
            </Label>
            <Select
              onValueChange={(value) =>
                setMaterialType(value as CostPerFoot["typeof"])
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select material type" />
              </SelectTrigger>
              <SelectContent>
                {productMaterialType.map((material) => (
                  <SelectItem key={material.id} value={material.typeof}>
                    {material.typeof} - ₹{material.cost}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="width" className="text-right">
              Width (ft)
            </Label>
            <Input
              id="width"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="col-span-3"
              type="number"
              min="0"
              step="0.01"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="length" className="text-right">
              Length (ft)
            </Label>
            <Input
              id="length"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="col-span-3"
              type="number"
              min="0"
              step="0.01"
            />
          </div>
          {price !== null && (
            <div className="text-center font-bold">
              Calculated Price: ₹{price.toFixed(2)}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={calculatePrice}>
            Calculate Price
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
