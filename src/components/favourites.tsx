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
    <div className="w-full ">
      <h1 className="text-center text-2xl mt-10 font-bold font-sans underline underline-offset-8 tracking-tight">
        Cult Favourites
      </h1>

      <div className="grid mx-auto w-[90%] sm:w-[80%] gap-4 mt-10 grid-cols-3 auto-rows-auto">
        {products.map((item) => (
          <Link
            href={`/products/${item.slug}`}
            className=" cursor-pointer  transition-all duration-300 text-center font-bold uppercase"
            key={item.name}
          >
            <Carousel>
              <CarouselContent>
                {item.images.map((url) => (
                  <CarouselItem key={url.url}>
                    <Image
                      src={url.url}
                      alt={url.url}
                      width={500}
                      height={100}
                      className="object-cover w-full h-[200px] md:h-[400px] lg:h-[500px] xl:h-[600px]"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
            <p className="lg:text-xl mt-2 sm:tracking-wider text-[0.7rem] sm:text-[0.9rem]">
              {item.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
