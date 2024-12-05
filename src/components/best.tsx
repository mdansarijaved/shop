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
import { db } from "@/lib/db";
import Link from "next/link";

export async function BestSeller() {
  const products = await db.product.findMany({
    where: {
      isPromoted: true,
      visible: true,
    },
    include: {
      images: true,
    },
  });
  return (
    <div className="py-10 ">
      <h1 className="text-start text-2xl  font-bold font-sans  tracking-tight">
        Bag The Best
      </h1>
      <Carousel
        opts={{
          align: "start",
        }}
        className=" mx-auto my-6 border-2 sm:border-0 border-black/20"
      >
        <CarouselContent>
          {products.map((product, index) => (
            <Link href={`/products/${product.slug}`}>
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className=" m-1 group relative cursor-pointer ">
                  <Card>
                    <CardContent className="flex bg-[#ecedeb] p-0">
                      <Image
                        src={product.images[0].url}
                        width={500}
                        alt="productImage"
                        height={500}
                        className="object-cover w-full h-full"
                      />
                      <span className="hidden rounded-full border-2 p-4 border-blue-900/30 cursor-pointer group-hover:block absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 group-hover:animate-pulse">
                        <MoveUpRight className="size-10 text-blue-900" />
                      </span>
                      <div className="mt-4 uppercase absolute bottom-0 bg-black/70 group-hover:bg-black/0 transition-all duration-500 group-hover:text-black py-2 w-full pl-6 z-10 font-semibold text-white">
                        <p className="text-lg">{product.name}</p>
                        <p className="text-2xl">&#8377;{product.basePrice}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            </Link>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
