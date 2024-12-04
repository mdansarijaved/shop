"use client";

import { notFound } from "next/navigation";
import { Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductGallery from "@/components/productGallery";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getProductById } from "@/actions/product";
import { useEffect, useState } from "react";
import { CalculatePrice } from "@/components/calculatePrice";
import Loading from "@/components/productLoadingSkeleton";
import { toast } from "@/hooks/use-toast";
import { addToCartAction, syncGuestCart } from "@/actions/cart";
import { getSession } from "@/actions/user";

function ProductPage({ params }: { params: { productId: string } }) {
  const [viewMore, setViewMore] = useState(false);
  const [selectedCostPerFoot, setSelectedCostPerFoot] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { data: session } = useQuery({
    queryKey: ["user"],
    queryFn: getSession,
  });

  const { data: product, isLoading } = useQuery({
    queryKey: [params.productId],
    queryFn: async () => await getProductById(params.productId),
  });

  const addToCart = useMutation({
    mutationFn: async () => {
      if (!product) {
        throw new Error("Product not found");
      }
      return await addToCartAction({
        productId: product.id,
        costPerFootId: selectedCostPerFoot || product.costPerFoot[0].id,
        quantity: quantity,
        customNotes: "hello jee",
      });
    },
    onSuccess: (data) => {
      if (data.isGuest) {
        // Store in localStorage for guest users
        const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
        guestCart.push(data.cartItem);
        localStorage.setItem("guestCart", JSON.stringify(guestCart));
        toast({
          title: "Success",
          description: "Added to guest cart",
        });
      } else {
        toast({
          title: "Success",
          description: "Added to cart",
        });
      }
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to add to cart",
      });
    },
  });

  useEffect(() => {
    if (session?.user) {
      const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
      if (guestCart.length > 0) {
        syncGuestCart(guestCart)
          .then(() => {
            localStorage.removeItem("guestCart");
            toast({
              title: "Cart Synced",
              description: "Your guest cart has been added to your account",
            });
          })
          .catch((error) => {
            toast({
              variant: "destructive",
              title: "Error",
              description: `Failed to sync guest cart ${error}`,
            });
          });
      }
    }
  }, [session]);

  if (isLoading) {
    return <Loading />;
  }
  if (!product) {
    notFound();
  }
  return (
    <div className=" mx-auto px-4 lg:px-10 py-8">
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          <ProductGallery
            images={product.images}
            isFeatured={product.isFeatured}
            isPromoted={product.isPromoted}
          />
        </div>
        <div className="space-y-6 px-4 lg:px-1">
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
                <div className="relative w-fit">
                  <div className="absolute -right-0.5 -bottom-0.5 bg-yellow-700 w-full h-full -z-10"></div>

                  <p className=" bg-yellow-400 flex items-end w-fit text-black justify-center px-4">
                    <span className="text-xl font-semibold ">
                      ₹{product.discountPrice}
                    </span>
                  </p>
                </div>
              )}
              <span
                className={` font-bold ${
                  product.discountPrice ? "line-through" : ""
                } `}
              >
                ₹{product.basePrice}
              </span>
              <span className="text-xs font-light ">
                Prices are based on fixed dimension for your requirement it can
                change
              </span>
            </div>
            <p
              className={`text-sm text-muted-foreground ${
                product.stock < 5 ? "text-red-700" : ""
              }`}
            >
              Stock: {product.stock} units available
            </p>
            {product.stock < 5 ? (
              <span className="text-xs">Hurry only {product.stock} left! </span>
            ) : null}
          </div>
          <CalculatePrice productMaterialType={product.costPerFoot} />
          {/* Product Options */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Material Type</label>
              <RadioGroup
                defaultValue={product.costPerFoot[0].typeof}
                className="flex gap-2 mt-2"
                onValueChange={(value) => {
                  const option = product.costPerFoot.find(
                    (t) => t.typeof === value
                  );
                  setSelectedCostPerFoot(option?.id || "");
                }}
              >
                {product.costPerFoot.map((type) => (
                  <div
                    key={type.id}
                    className="flex items-center space-x-2 text-sm lg:text-base"
                  >
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
            <Button
              className="flex-1 bg-blue-600 hover:bg-blue-500 rounded-xl"
              onClick={() => addToCart.mutate()}
              disabled={addToCart.isPending}
            >
              {addToCart.isPending ? "Adding..." : "Add to Cart"}
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
