import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";


export function Favourites(){


    const productsUp = [
        {
            name: "TV Stand",
            icon: <Image src="/Sofas/sofa1.webp" alt="Large Image" width={500} height={100} className="w-full h-full "/>,
        },
        {
          name: "Dinning Table",
          icon: <Image src="/Sofas/sofa1.webp" alt="Large Image" width={500} height={100} className="w-full h-full "/>,
        },
        {
          name: "Sofa",
          icon: <Image src="/Sofas/sofa1.webp" alt="Large Image" width={500} height={100} className="w-full h-full "/>,
        },
      ]
      const productsDown = [
        {
          name: "wardrobe",
          icon: <Image src="/Sofas/sofa1.webp" alt="Large Image" width={500} height={100} className="w-full h-full "/>,
        },
        {
          name: "Bed",
          icon: <Image src="/Sofas/sofa1.webp" alt="Large Image" width={500} height={100} className="w-full h-full "/>,
        },
        {
          name: "Temple",
          icon: <Image src="/Sofas/sofa1.webp" alt="Large Image" width={500} height={100} className="w-full h-full "/>,
        },
      ];

  return (
    <>
    <h1 className="text-center text-2xl mt-10 font-bold font-sans underline underline-offset-8 tracking-tight">Cult Favourites</h1>
    <div className="flex gap-4 mx-auto w-[80%] justify-between mt-8">
      {productsUp.map((item) => (
        <div className=" items-center place-content-center text-center font-bold uppercase">
          {item.icon}
          {item.name}
        </div>
      ))}
          </div>
          <div className="flex gap-4 mx-auto w-[80%] justify-between mt-10">
      {productsDown.map((item) => (
        <div className=" items-center place-content-center text-center font-bold uppercase">
          {item.icon}
          {item.name}
        </div>
      ))}
          </div>
    
    </>
  )
}
