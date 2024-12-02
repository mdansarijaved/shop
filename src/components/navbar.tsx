import React from "react";
import {
  BedSingle,
  HomeIcon,
  ShoppingCart,
  User2,
  Utensils,
  ShoppingBag,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { auth, signOut } from "@/auth";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export async function Navbar() {
  const user = await auth();
  const navItemsLeft = [
    {
      name: "home",
      link: "/",
      icon: (
        <Image
          src="/Ecomm-Logo.jpg"
          alt="Large Image"
          width={500}
          height={500}
          className="h-[60px] w-[100px]"
        />
      ),
    },
  ];
  const navItemsRight = [
    {
      link: "/cart",
      icon: (
        <ShoppingCart className="border-2 rounded-full p-1 w-8 h-8 hover:border-black/40" />
      ),
    },
  ];
  const userDropdownItems = [
    {
      name: "My Account",
      link: "/account",
      icon: <User2 className="h-4 w-4 mr-2" />,
    },
    {
      name: "My Orders",
      link: "/orders",
      icon: <ShoppingBag className="h-4 w-4 mr-2" />,
    },
    {
      name: "Settings",
      link: "/settings",
      icon: <Settings className="h-4 w-4 mr-2" />,
    },
  ];
  return (
    <div className=" flex z-50 place-items-center justify-between shadow-lg bg-[#fefefe] px-3 md:px-5 lg:px-7 xl:px-10">
      <div className="">
        {navItemsLeft.map((nav, index) => (
          <Link
            href={nav.link}
            key={index}
            className="flex justify-center items-center gap-2 "
          >
            {nav.icon}
          </Link>
        ))}
      </div>
      <div className=" py-3 bg-[#fefefe] dark:bg-black  flex justify-center rounded-xl items-center gap-4 md:gap-5 lg:gap-7 xl:gap-6 mx-auto md:mx-0">
        <form action="" className=" xl:w-96 ">
          <input
            type="text"
            className="w-full bg-gray-100  px-4 py-2 rounded-md placeholder:text-[#757575] outline-none"
            placeholder="Search for Products..."
          />
        </form>
        {navItemsRight.map((nav, index) => (
          <Link key={index} href={nav.link}>
            {nav.icon}
          </Link>
        ))}
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border-2  p-1 w-8 h-8 hover:border-black/40"
              >
                <User2 className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="justify-start">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.user.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {userDropdownItems.map((item) => (
                <DropdownMenuItem key={item.name} asChild className="pr-5">
                  <Link href={item.link} className="flex items-center">
                    {item.icon}
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 focus:text-red-600"
                asChild
              >
                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start p-0"
                    type="submit"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </Button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            href={"/auth/login"}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
