import React from "react";
import {
  BedSingle,
  HomeIcon,
  LogIn,
  ShoppingCart,
  User,
  User2,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
export function FloatingNavDemo() {
  const navItemsLeft = [
    {
      link: "/",
      icon: (
        <Image
          src="/Ecomm-Logo.jpg"
          alt="Large Image"
          width={100}
          height={100}
        />
      ),
    },
    {
      name: "Living Room",
      link: "/",
      icon: (
        <HomeIcon className="lg:h-4 lg:w-4 lg:border-none lg:rounded-none lg:p-0  border-2 rounded-full p-1 w-8 h-8 hover:border-black/40" />
      ),
    },
    {
      name: "Dining Room",
      link: "/auth/login",
      icon: (
        <Utensils className="lg:h-4 lg:w-4 lg:border-none lg:rounded-none lg:p-0  border-2 rounded-full p-1 w-8 h-8 hover:border-black/40" />
      ),
    },
    {
      name: "Bedroom",
      link: "/auth/register",
      icon: (
        <BedSingle className="lg:h-4 lg:w-4 lg:border-none lg:rounded-none lg:p-0  border-2 rounded-full p-1 w-8 h-8 hover:border-black/40" />
      ),
    },
  ];
  const navItemsRight = [
    {
      link: "/",
      icon: (
        <ShoppingCart className="border-2 rounded-full p-1 w-8 h-8 hover:border-black/40" />
      ),
    },
    {
      link: "/",
      icon: (
        <User2 className="border-2 rounded-full p-1 w-8 h-8 hover:border-black/40" />
      ),
    },
  ];
  return (
    <div className=" flex z-50 place-items-center justify-between shadow-lg bg-[#fefefe]">
      <div className="w-fit px-3 md:px-5 lg:px-7 xl:px-10 py-1 bg-[#fefefe] dark:bg-black  md:flex justify-center rounded-xl items-center gap-4 md:gap-5 lg:gap-7 xl:gap-10 hidden">
        {navItemsLeft.map((nav) => (
          <Link
            href={nav.link}
            key={nav.name}
            className="flex justify-center items-center gap-2 "
          >
            {nav.icon}
            {""}
            <div className="lg:block hidden">{nav.name}</div>
          </Link>
        ))}
      </div>
      <div className="w-fit px-3 md:px-5 lg:px-7 xl:px-10 py-3 bg-[#fefefe] dark:bg-black  flex justify-center rounded-xl items-center gap-4 md:gap-5 lg:gap-7 xl:gap-6 mx-auto md:mx-0">
        <form action="" className=" xl:w-96 ">
          <input
            type="text"
            className="w-full bg-[#ecedeb]  px-4 py-2 placeholder:text-[#757575] outline-none"
            placeholder="Search for Products..."
          />
        </form>
        {navItemsRight.map((nav) => (
          <Link key={nav.link} href={nav.link}>
            {nav.icon}
          </Link>
        ))}

        {/* <ModeToggle /> */}
      </div>
    </div>
  );
}
