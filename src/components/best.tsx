import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { MoveUpRight } from "lucide-react";

export function BestSeller() {
  const products = [
    {
      name: "Wooden Wardrobe",
      icon: (
        <Image
          src="/cupboard/cupboard3.webp"
          alt="Large Image"
          width={500}
          height={100}
          className="w-full h-full object-cover"
        />
      ),
      price: 2550,
    },
    {
      name: "Wooden TV Stand",
      icon: (
        <Image
          src="/tvstand/TVstand3.webp"
          alt="Large Image"
          width={500}
          height={100}
          className="w-full h-full object-cover"
        />
      ),
      price: 13500,
    },
    {
      name: "ceiling fan",
      icon: (
        <Image
          src="/ceilingfan/ceilingfan1.webp"
          alt="Large Image"
          width={500}
          height={100}
          className="w-full h-full object-cover"
        />
      ),
      price: 1999,
    },
    {
      name: "Bed",
      icon: (
        <Image
          src="/Bed/Bed2.webp"
          alt="Large Image"
          width={500}
          height={100}
          className="w-full h-full object-cover"
        />
      ),
      price: 2375,
    },
  ];

  return (
    <>
      <h1 className="text-center text-2xl mt-16 font-bold font-sans underline underline-offset-8 tracking-tight">
        Bag The Best
      </h1>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-[70%] sm:w-[80%] mx-auto my-6 border-2 sm:border-0 border-black/20"
      >
        <CarouselContent>
          {products.map((product, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className=" m-1 group relative cursor-pointer ">
                <Card>
                  <CardContent className="flex bg-[#ecedeb] p-0">
                    <div className=" group-hover:opacity-50 h-auto w-full" >
                      {product.icon}
                    </div>
                    <span className="hidden rounded-full border-2 p-4 border-blue-900/30 cursor-pointer group-hover:block absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 group-hover:animate-pulse">
                      <MoveUpRight className="size-10 text-blue-900" />
                    </span>
                    <div className="mt-4 uppercase absolute bottom-0 bg-black/70 group-hover:bg-black/0 transition-all duration-500 group-hover:text-black py-2 w-full pl-6 z-10 font-semibold text-white">
                      <p className="text-lg">{product.name}</p>
                      <p className="text-2xl">&#8377;{product.price}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
}
