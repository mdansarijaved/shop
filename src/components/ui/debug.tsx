import { env } from "@/env";

export const Debug = () => {
  if (env.NODE_ENV === "production") return null;
  return (
    <div className=" z-[99999] aspect-square rounded-full h-12 shadow-md w-12 border bg-background fixed bottom-5 left-5  grid place-items-center">
      <span className=" hidden xl:block">xl</span>
      <span className=" hidden lg:block xl:hidden">lg</span>
      <span className=" hidden md:block lg:hidden ">md</span>
      <span className="  hidden sm:block  md:hidden ">sm</span>
      <span className="  xs sm:hidden   ">xs</span>
    </div>
  );
};
