"use client";

import { notFound } from "next/navigation";
import { Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductGallery from "@/components/productGallery";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/actions/product";
import { useState } from "react";

function ProductPage({ params }: { params: { productId: string } }) {
  const [viewMore, setViewMore] = useState(false);
  const { data: product } = useQuery({
    queryKey: ["products"],
    queryFn: async () => await getProductById(params.productId),
  });
  if (!product) {
    return <div>Nothing here to show</div>;
  }
  if (!product) {
    notFound();
  }

  return (
    <div className=" mx-auto px-4 lg:px-10 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <ProductGallery
            images={product.images}
            isFeatured={product.isFeatured}
            isPromoted={product.isPromoted}
          />
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl lg:text-2xl font-bold">{product.name}</h1>
              <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
            <div>
              <p
                className={`text-muted-foreground mt-2 ${
                  viewMore ? "" : "line-clamp-2"
                } `}
              >
                {product.description}
              </p>
              <button
                onClick={() => setViewMore(!viewMore)}
                className="text-xs text-blue-600"
              >
                {viewMore ? (
                  <span>&#8593; view less</span>
                ) : (
                  <span> &#8595; view more</span>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex flex-col gap-2  justify-center ">
              {product.discountPrice && (
                <span className="py-2 text-xl text-green-600">
                  Now at ₹{product.discountPrice}
                </span>
              )}
              <span
                className={` font-bold ${
                  product.discountPrice ? "line-through" : ""
                } `}
              >
                ₹{product.price}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Stock: {product.stock} units available
            </p>
          </div>

          {/* Product Options */}
          <div className="space-y-4">
            {product.category == "KITCHEN" ? (
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
            ) : null}
          </div>
          {product.options ? (
            <div className="space-y-2">
              <p className=" font-semibold">Features</p>
              <div className="w-full grid grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-2">
                {product.options.map((option) => (
                  <div
                    className=" flex flex-col gap-1 items-center flex-1 h-20 bg-blue-100 rounded-lg justify-center"
                    key={option.id}
                  >
                    <span className="lowercase font-semibold ">
                      {option.type}
                    </span>{" "}
                    <span className=" text-sm text-muted-foreground">
                      {option.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          <div className="flex gap-4">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-500">
              Add to Cart
            </Button>
            <Button variant="outline" size="icon" className="">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          {product.features ? (
            <div className="space-y-2">
              <p className=" font-semibold">About this item: </p>
              <ul className="space-y-1">
                {product.features.map((feature) => (
                  <li
                    className="text-sm flex gap-2  h-full w-full"
                    key={feature.id}
                  >
                    &#8594;
                    <span className="text-muted-foreground ">
                      {feature.feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
