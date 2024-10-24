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


export function Popular(){


    const products = [
        {
            name: "TV Stand",
            icon: <Image src="/Sofas/sofa1.webp" alt="Large Image" width={500} height={100} className="w-full h-full rounded-md"/>,
        },
        {
          name: "Dinning Table",
          icon: <Image src="/Sofas/sofa1.webp" alt="Large Image" width={500} height={100} className="w-full h-full rounded-md"/>,
        },
        {
          name: "Sofa",
          icon: <Image src="/Sofas/sofa1.webp" alt="Large Image" width={500} height={100} className="w-full h-full rounded-md"/>,
        },
        {
          name: "wardrobe",
          icon: <Image src="/Sofas/sofa1.webp" alt="Large Image" width={500} height={100} className="w-full h-full rounded-md"/>,
        },
        {
          name: "Bed",
          icon: <Image src="/Sofas/sofa1.webp" alt="Large Image" width={500} height={100} className="w-full h-full rounded-md"/>,
        },
        {
          name: "Temple",
          icon: <Image src="/Sofas/sofa1.webp" alt="Large Image" width={500} height={100} className="w-full h-full rounded-md"/>,
        },
      ];

  return (
    <>
    <h1 className="text-center text-5xl mt-10">Popular Categories</h1>
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full w-[80%] mx-auto my-6"
    >
      <CarouselContent>
        {products.map((product, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center pt-4 aspect-square flex-col">
                  {product.icon}
                  <span className="mt-2 uppercase font-semibold">{product.name}</span>
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
  )
}
