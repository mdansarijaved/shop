"use client";

import * as React from "react";
import Image from "next/image";
import { Heart, Share2, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProductGallery({
  images,
  isFeatured,
  isPromoted,
}: {
  images: { url: string }[];
  isFeatured: boolean;
  isPromoted: boolean;
}) {
  const [isZoomed, setIsZoomed] = React.useState(false);
  const [zoomPosition, setZoomPosition] = React.useState({ x: 0, y: 0 });
  const [api, setApi] = React.useState<CarouselApi>();
  const imageContainerRef = React.useRef<HTMLDivElement>(null);

  // Example product images

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;

    const { left, top, width, height } =
      imageContainerRef.current.getBoundingClientRect();
    const x = ((event.clientX - left) / width) * 100;
    const y = ((event.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  };

  const toggleZoom = () => {
    setIsZoomed((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto ">
      <div className="relative">
        <div className="absolute flex gap-2 z-10 left-4 top-2 w-full">
          {isFeatured && (
            <div className="gradient-button p-[1px] h-full flex items-center justify-center rounded-md">
              <span className=" rounded bg-white px-2 py-1 text-xs ">
                Bestseller
              </span>
            </div>
          )}
          {isPromoted && (
            <span className=" flex justify-center items-center bg-white rounded-md px-4   py-1 text-xs ">
              Sale
            </span>
          )}
        </div>
        <Carousel setApi={setApi}>
          <CarouselContent className="">
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div
                  ref={imageContainerRef}
                  className={cn(
                    "relative aspect-square overflow-hidden ",
                    isZoomed && "cursor-zoom-out"
                  )}
                  onMouseMove={isZoomed ? handleMouseMove : undefined}
                  onMouseLeave={() => setIsZoomed(false)}
                  onClick={toggleZoom}
                >
                  <div
                    className={cn(
                      " w-full h-full transition-transform duration-200 ease-out",
                      isZoomed && "scale-150"
                    )}
                    style={
                      isZoomed
                        ? {
                            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                          }
                        : undefined
                    }
                  >
                    <Image
                      src={image.url}
                      alt={image.url}
                      fill
                      className="object-cover rounded-md"
                      quality={90}
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {!isZoomed && (
            <>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />

              {/* Action Buttons */}
              <div className="absolute right-4 top-4 flex flex-col gap-2 z-10">
                <Button
                  size="icon"
                  variant="secondary"
                  aria-label="Share"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  aria-label="Add to favorites"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Heart className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  aria-label="Zoom image"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleZoom();
                  }}
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>

              {/* Zoom Instructions */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2  text-white px-4 py-2 rounded-full text-sm flex items-center gap-2 z-10">
                <ZoomIn className="w-4 h-4" />
                Click to zoom
              </div>
            </>
          )}
        </Carousel>
      </div>

      {/* Thumbnails */}
      <Tabs
        defaultValue="0"
        className="w-full"
        onValueChange={(value) => {
          if (api) {
            api.scrollTo(parseInt(value));
          }
        }}
      >
        <TabsList className="grid grid-flow-col justify-start gap-2 h-20 p-1 bg-white">
          {images.map((image, index) => (
            <TabsTrigger
              key={index}
              value={index.toString()}
              className="relative aspect-square w-20  rounded-md overflow-hidden data-[state=active]:border-2 data-[state=active]:border-primary"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={image.url}
                alt={image.url}
                fill
                className="object-cover"
              />
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
