import React from "react";

interface CarouselSlideProps {
  imageUrl: string;
  isActive: boolean;
  direction: "next" | "prev";
  isPrev: boolean;
  isNext: boolean;
  hasError?: boolean;
}

export const CarouselSlide: React.FC<CarouselSlideProps> = ({
  imageUrl,
  isActive,
  direction,
  isPrev,
  isNext,
  hasError = false,
}) => {
  const getSlideClass = () => {
    if (isActive) return "translate-x-0 opacity-100";
    if (isPrev) return "-translate-x-full opacity-0";
    if (isNext) return "translate-x-full opacity-0";
    return direction === "next"
      ? "translate-x-full opacity-0"
      : "-translate-x-full opacity-0";
  };

  const getFallbackBackground = () => {
    // Generate a unique but consistent background color based on the URL
    const hash = imageUrl.split("").reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 80%)`;
  };

  return (
    <div
      className={`absolute inset-0 w-screen h-screen will-change-transform
        transition-all duration-700 ease-out transform-gpu ${getSlideClass()}`}
      style={
        hasError ? { backgroundColor: getFallbackBackground() } : undefined
      }
    >
      {hasError ? (
        <div className="w-full h-full flex items-center justify-center text-gray-600">
          <div className="text-center">
            <p className="text-xl mb-2">Image failed to load</p>
            <p className="text-sm">Please try refreshing the page</p>
          </div>
        </div>
      ) : (
        <img
          src={imageUrl}
          alt="Carousel slide"
          className="w-full h-full object-cover"
          loading="eager"
        />
      )}
    </div>
  );
};
