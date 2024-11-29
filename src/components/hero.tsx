import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export default function Hero() {
  return (
    <div className="relative  w-full h-[75vh]  mx-auto place-items-center  overflow-clip">
      <div className="w-full z-20 relative h-full flex  flex-col items-center justify-center  gap-2">
        <h1 className="text-white md:text-4xl text-center text-2xl font-bold italic">
          Welcome to Vishwakarma Woodworks.
        </h1>
        <p className="text-white text-sm text-center md:text-base font-semibold">
          New in from Vishwakarma Woodworks. Traditional craftmanship.
        </p>
        <Link
          href={"/products"}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "bg-gray-700/50 hover:bg-gray-700/70 px-6 py-3 mt-4 text-white border border-black/30 rounded-md"
          )}
        >
          Shop Products
        </Link>
      </div>
      <div className="absolute left-0 top-0 z-10 w-full h-full bg-red-400">
        <Image
          src="/Sofas/sofa1.webp"
          width={1000}
          height={1000}
          className="w-full h-full object-cover "
          alt="Sofa Image"
        />
      </div>
    </div>
  );
}
