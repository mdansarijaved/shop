"use client";
// import { db } from "@/lib/db";

import { notFound } from "next/navigation";

import { Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ProductGallery from "@/components/productGallery";
import React, { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const product = {
  id: "1",
  name: "Modern Kitchen Cabinet Set",
  description:
    "Premium modular kitchen cabinet set with contemporary design and ample storage space. Features high-quality materials and expert craftsmanship.",
  stock: 5,
  slug: "modern-kitchen-cabinet",
  category: "KITCHEN",
  isFeatured: true,
  isPromoted: true,
  discountPercent: 10,
  colors: [
    { id: "1", color: "Teak", productId: "1" },
    { id: "2", color: "Walnut", productId: "1" },
    { id: "3", color: "White", productId: "1" },
  ],
  features: [
    { id: "1", featureType: "QUALITY", feature: "Premium Grade Materials" },
    { id: "2", featureType: "MATERIAL", feature: "High-Quality MDF" },
    { id: "3", featureType: "DIMENSION", feature: "Customizable dimensions" },
    { id: "4", featureType: "FEATURES", feature: "Soft-close hinges" },
  ],
  costPerFoot: [
    { id: "1", typeof: "MDF", cost: 1200, productId: "1" },
    { id: "2", typeof: "HDMR", cost: 1500, productId: "1" },
    { id: "3", typeof: "TEAKWOOD", cost: 2200, productId: "1" },
  ],
  images: [
    { id: "1", url: "/placeholder.svg", productId: "1" },
    { id: "2", url: "/placeholder.svg", productId: "1" },
    { id: "3", url: "/placeholder.svg", productId: "1" },
  ],
  options: [
    {
      id: "1",
      value: "Standard",
      productOptionType: {
        id: "1",
        name: "Size",
        description: "Cabinet size configuration",
      },
      productId: "1",
    },
    {
      id: "2",
      value: "Large",
      productOptionType: {
        id: "1",
        name: "Size",
        description: "Cabinet size configuration",
      },
      productId: "1",
    },
    {
      id: "3",
      value: "Matte",
      productOptionType: {
        id: "2",
        name: "Finish",
        description: "Surface finish type",
      },
      productId: "1",
    },
    {
      id: "4",
      value: "Glossy",
      productOptionType: {
        id: "2",
        name: "Finish",
        description: "Surface finish type",
      },
      productId: "1",
    },
  ],
  priceOptions: [
    { id: "1", price: 24999.99, optionId: "1", productId: "1" },
    { id: "2", price: 29999.99, optionId: "2", productId: "1" },
    { id: "3", price: 26999.99, optionId: "3", productId: "1" },
    { id: "4", price: 27999.99, optionId: "4", productId: "1" },
  ],
};

async function ProductPage({ params }: { params: { productId: string } }) {
  // const product = await db.product.findFirst({
  //   where: {
  //     slug: params.productId,
  //   },
  //   select: {
  //     id: true,
  //     name: true,
  //     category: true,
  //     costPerFoot: true,
  //     isFeatured: true,
  //     promotionEnd: true,
  //     description: true,
  //     discountPercent: true,
  //     isPromoted: true,
  //     price: true,
  //     Review: true,
  //     stock: true,
  //     images: {
  //       select: {
  //         url: true,
  //       },
  //     },
  //   },
  // });

  if (!product) {
    notFound();
  }

  const reviews = [
    { id: 1, author: "John Doe", rating: 5, comment: "Great product!" },
    {
      id: 2,
      author: "Jane Smith",
      rating: 4,
      comment: "Good value for money.",
    },
  ];

  const relatedProducts = [
    {
      id: 1,
      name: "Related Product 1",
      price: 59.99,
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Related Product 2",
      price: 69.99,
      image: "/placeholder.svg",
    },
  ];
  type SelectedOptions = {
    [key: string]: string; // optionTypeId: optionId
  };
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});

  // Group options by their type
  const optionsByType = useMemo(() => {
    const grouped = new Map();
    product.options.forEach((option) => {
      const typeId = option.productOptionType.id;
      if (!grouped.has(typeId)) {
        grouped.set(typeId, {
          name: option.productOptionType.name,
          description: option.productOptionType.description,
          options: [],
        });
      }
      grouped.get(typeId).options.push(option);
    });
    return grouped;
  }, []);

  // Calculate price based on selected options
  const calculatePrice = useMemo(() => {
    let basePrice = product.priceOptions[0]?.price || 0;
    Object.values(selectedOptions).forEach((optionId) => {
      const priceOption = product.priceOptions.find(
        (po) => po.optionId === optionId
      );
      if (priceOption) {
        basePrice = priceOption.price;
      }
    });

    if (product.discountPercent) {
      basePrice = basePrice - basePrice * (product.discountPercent / 100);
    }

    return basePrice;
  }, [selectedOptions]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <ProductGallery images={product.images} />
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-muted-foreground mt-2">{product.description}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">
                ₹{calculatePrice.toLocaleString()}
              </span>
              {product.discountPercent && (
                <Badge variant="destructive">
                  {product.discountPercent}% OFF
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Stock: {product.stock} units available
            </p>
          </div>

          {/* Product Options */}
          <div className="space-y-4">
            {Array.from(optionsByType.entries()).map(([typeId, typeData]) => (
              <div key={typeId}>
                <label className="text-sm font-medium">{typeData.name}</label>
                <Select
                  onValueChange={(value) =>
                    setSelectedOptions((prev) => ({ ...prev, [typeId]: value }))
                  }
                  value={selectedOptions[typeId]}
                >
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder={`Select ${typeData.name}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {typeData.options.map((option: any) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {typeData.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {typeData.description}
                  </p>
                )}
              </div>
            ))}

            <div>
              <label className="text-sm font-medium">Material Type</label>
              <RadioGroup
                defaultValue={product.costPerFoot[0].typeof}
                className="flex gap-2 mt-2"
              >
                {product.costPerFoot.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={type.typeof}
                      id={`type-${type.id}`}
                    />
                    <label htmlFor={`type-${type.id}`}>
                      {type.typeof} - ₹{type.cost}/ft
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>

          <div className="flex gap-4">
            <Button className="flex-1">Add to Cart</Button>
            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          <Tabs defaultValue="features" className="mt-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="features">Features & Benefits</TabsTrigger>
              <TabsTrigger value="specifications">
                Technical Details
              </TabsTrigger>
            </TabsList>
            <TabsContent value="features">
              <Card className="p-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  {product.features.map((feature) => (
                    <div key={feature.id} className="flex flex-col gap-2">
                      <h3 className="font-semibold text-primary">
                        {feature.featureType}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.feature}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="specifications">
              <Card className="p-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">
                        Product Information
                      </h3>
                      <dl className="grid grid-cols-2 gap-2 text-sm">
                        <dt className="text-muted-foreground">Category</dt>
                        <dd>{product.category}</dd>
                        <dt className="text-muted-foreground">Stock Status</dt>
                        <dd>
                          {product.stock > 0 ? "In Stock" : "Out of Stock"}
                        </dd>
                        <dt className="text-muted-foreground">Featured</dt>
                        <dd>{product.isFeatured ? "Yes" : "No"}</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Available Options</h3>
                      <dl className="grid grid-cols-2 gap-2 text-sm">
                        {Array.from(optionsByType.entries()).map(
                          ([typeId, typeData]) => (
                            <React.Fragment key={typeId}>
                              <dt className="text-muted-foreground">
                                {typeData.name}
                              </dt>
                              <dd>
                                {typeData.options
                                  .map((o: any) => o.value)
                                  .join(", ")}
                              </dd>
                            </React.Fragment>
                          )
                        )}
                        <dt className="text-muted-foreground">
                          Material Types
                        </dt>
                        <dd>
                          {product.costPerFoot.map((t) => t.typeof).join(", ")}
                        </dd>
                        <dt className="text-muted-foreground">Base Cost/ft</dt>
                        <dd>
                          From ₹
                          {Math.min(...product.costPerFoot.map((t) => t.cost))}
                          /ft
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
