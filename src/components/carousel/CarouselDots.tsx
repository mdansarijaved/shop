import React, { memo } from "react";

interface CarouselDotsProps {
  total: number;
  active: number;
  onDotClick: (index: number) => void;
}

export const CarouselDots: React.FC<CarouselDotsProps> = memo(
  ({ total, active, onDotClick }) => {
    return (
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {Array.from({ length: total }).map((_, index) => (
          <button
            key={index}
            onClick={() => onDotClick(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer
            hover:bg-white will-change-transform
            ${
              active === index
                ? "bg-white w-6"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    );
  }
);
