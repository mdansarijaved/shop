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

export function Favourites() {
  const productsUp = [
    {
      name: "TV Stand",
      icon: (
        <Image
          src="/tvstand/TVstand1.webp"
          alt="Large Image"
          width={350}
          height={100}
          className="w-full h-full object-cover"
        />
      ),
    },
    {
      name: "Dinning Table",
      icon: (
        <Image
          src="/dinningtable/dinningtable1.webp"
          alt="Large Image"
          width={350}
          height={100}
          className="w-full h-full object-cover"
        />
      ),
    },
    {
      name: "Sofa",
      icon: (
        <Image
          src="/Sofas/sofa3.webp"
          alt="Large Image"
          width={350}
          height={100}
          className="w-full h-full object-cover"
        />
      ),
    },
  ];
  const productsDown = [
    {
      name: "wardrobe",
      icon: (
        <Image
          src="/cupboard/cupboard2.webp"
          alt="Large Image"
          width={350}
          height={100}
          className="w-full h-full object-cover"
        />
      ),
    },
    {
      name: "Bed",
      icon: (
        <Image
          src="/Bed/Bed2.webp"
          alt="Large Image"
          width={350}
          height={100}
          className="w-full h-full object-cover"
        />
      ),
    },
    {
      name: "Temple",
      icon: (
        <Image
          src="/temple/temple1.webp"
          alt="Large Image"
          width={350}
          height={700}
          className="w-full h-full object-cover"
        />
      ),
    },
  ];

  return (
    <>
      <h1 className="text-center text-2xl mt-10 font-bold font-sans underline underline-offset-8 tracking-tight">
        Cult Favourites
      </h1>
      <div className="flex gap-4 mx-auto w-[80%] justify-between mt-8">
        {productsUp.map((item) => (
          <div className=" items-center cursor-pointer place-content-center hover:scale-105 transition-all duration-300 text-center font-bold uppercase">
            <div className="h-96 w-96 object-cover hover:shadow-lg">{item.icon}</div>
            <p className="text-xl mt-2 tracking-wider">{item.name}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mx-auto w-[80%] justify-between mt-10">
        {productsDown.map((item) => (
          <div className=" items-center cursor-pointer place-content-center hover:scale-105 transition-all duration-300 text-center font-bold uppercase">
            <div className="h-96 w-96 object-cover hover:shadow-lg">{item.icon}</div>
            <p className="text-xl mt-2 tracking-wider">{item.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}
