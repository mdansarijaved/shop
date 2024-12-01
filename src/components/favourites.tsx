import * as React from "react";
import Image from "next/image";
import { db } from "@/lib/db";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Link from "next/link";

export async function Favourites() {
  const products = await db.product.findMany({
    where: {
      isFeatured: true,
    },
    select: {
      id: true,
      name: true,
      images: { select: { url: true } },
      slug: true,
    },
    take: 6,
  });

  return (
    <div className="w-full max-w-[1920px] mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-semibold text-gray-900">
            Collection in focus
          </h2>
          <p className="text-sm text-gray-600 mt-1">All our favourites</p>
        </div>
      </div>

      <Carousel
        opts={{
          align: "start",
          slidesToScroll: 3,
          containScroll: "trimSnaps",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {products.map((item) => (
            <CarouselItem
              key={item.name}
              className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
            >
              <Link
                href={`/products/${item.slug}`}
                className="block cursor-pointer transition-all duration-300 group h-full"
              >
                <div className="relative w-full h-[400px] overflow-hidden rounded-lg ">
                  {/* <Carousel className="w-full h-full">
                    <CarouselContent className="h-full">
                      {item.images.map((url) => (
                        <CarouselItem key={url.url} className="h-full w-full">
                          <Image
                            src={url.url}
                            alt={item.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            priority
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CarouselNext className="right-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Carousel> */}
                  <Image
                    src={item.images[0].url}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 h-[300px] w-[300px] group-hover:scale-105"
                    priority
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
                    {item.name}
                  </h3>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-end gap-2 mt-4">
          <CarouselPrevious className="position-static" />
          <CarouselNext className="position-static" />
        </div>
      </Carousel>
    </div>
  );
}
