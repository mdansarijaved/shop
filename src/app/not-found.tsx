import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="flex flex-col min-h-[100dvh] ">
        <Navbar />
        <main className=" mb-16 flex-1 min-h-[calc(100vh-56px)] px-10 grid place-items-center">
          <div className="flex  flex-col gap-5 items-center">
            <h1 className="text-[clamp(100px,50vw,120px)] sm:text-[300px] leading-[0.8] font-black font-heading">
              404
            </h1>
            <p className="leading-none text-balance text-center text-lg sm:text-2xl font-sans">
              Oops it looks like you are lost.🤗🤗{" "}
            </p>

            <Link className={cn(buttonVariants())} href="/">
              Go back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
