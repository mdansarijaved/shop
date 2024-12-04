"use client";
import React, { useState, useEffect, useCallback, memo } from "react";
import { useImagePreloader } from "./useImagePreloader";
import { CarouselSlide } from "./carouselSlide";
import { CarouselDots } from "./CarouselDots";

export const images = ["/home1.jpg", "/home2.jpg", "/home3.jpg", "/home4.jpg"];

export const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { allLoaded, imageStates } = useImagePreloader(images);

  const goToSlide = useCallback(
    (index: number, dir: "next" | "prev") => {
      if (isTransitioning) return;

      setIsTransitioning(true);
      setDirection(dir);
      setCurrentIndex(index);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 700); // Match transition duration
    },
    [isTransitioning]
  );

  const nextSlide = useCallback(() => {
    const nextIndex = (currentIndex + 1) % images.length;
    goToSlide(nextIndex, "next");
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    goToSlide(prevIndex, "prev");
  }, [currentIndex, goToSlide]);

  const handleDotClick = useCallback(
    (index: number) => {
      if (index === currentIndex) return;
      const dir = index > currentIndex ? "next" : "prev";
      goToSlide(index, dir);
    },
    [currentIndex, goToSlide]
  );

  useEffect(() => {
    if (!isAutoPlaying || !allLoaded || isTransitioning) return;

    const intervalId = setInterval(nextSlide, 5000);
    return () => clearInterval(intervalId);
  }, [nextSlide, isAutoPlaying, allLoaded, isTransitioning]);

  if (!allLoaded) {
    return (
      <div className="w-full h-full  flex items-center justify-center">
        <div className="text-white text-xl"></div>
      </div>
    );
  }

  const hasAnyErrors = Object.values(imageStates).some((state) => state.error);

  return (
    <div
      className="relative w-screen h-full overflow-hidden bg-black"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {images.map((image, index) => (
        <CarouselSlide
          key={image}
          imageUrl={image}
          isActive={currentIndex === index}
          direction={direction}
          isPrev={index === (currentIndex - 1 + images.length) % images.length}
          isNext={index === (currentIndex + 1) % images.length}
          hasError={imageStates[image]?.error}
        />
      ))}

      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {hasAnyErrors && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-full text-sm">
          Some images failed to load
        </div>
      )}

      <CarouselDots
        total={images.length}
        active={currentIndex}
        onDotClick={handleDotClick}
      />
    </div>
  );
};
