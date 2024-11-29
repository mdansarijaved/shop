import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Carousel } from "./carousel/carousel";

export default function Hero() {
  return (
    <div className="relative  w-full h-[85vh]  mx-auto place-items-center  overflow-clip">
      <div className="w-full z-20 absolute  h-full flex  flex-col items-center justify-center  gap-2">
        <h1 className="text-white md:text-4xl lg:text-5xl text-center text-2xl font-bold ">
          Welcome to Vishwakarma Woodworks.
        </h1>
        <p className="text-white text-sm text-center md:text-base font-semibold">
          New in from Vishwakarma Woodworks. Traditional craftmanship.
        </p>
        <Link
          href={"/categories"}
          className={cn(
            buttonVariants({ variant: "outline" }),
            " px-6 py-3 mt-4  rounded-md"
          )}
        >
          Shop Products
        </Link>
      </div>
      <Carousel />
    </div>
  );
}
