import { Loader2 } from "lucide-react";
import Image from "next/image";
import React from "react";

function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex flex-col items-center justify-center gap-6 p-4">
      <div className="relative">
        <Image
          src={"/Ecomm-Logo.jpg"}
          width={200}
          height={100}
          alt="company logo"
        />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>

      <div className="space-y-4 text-center">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight animate-pulse">
          Loading your furniture experience...
        </h1>
        <p className="text-muted-foreground max-w-sm mx-auto">
          We're preparing a curated collection of premium furniture just for you
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-8">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-24 h-24 rounded-lg bg-muted animate-pulse"
            style={{
              animationDelay: `${i * 200}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Loading;
