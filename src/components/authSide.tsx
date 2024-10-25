"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export function AuthSide() {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div className="h-full flex flex-col lg:flex-row overflow-hidden items-center justify-center  w-full gap-4 mx-auto relative ">
      {/* <p className="md:text-2xl text-2xl font-medium text-center text-white relative z-20 max-w-2xl mx-auto">
        With insomnia, nothing&apos;s real. Everything is far away. Everything
        is a copy, of a copy, of a copy
      </p> */}
      <Image
        src={"/sofasofa.jpg"}
        width={1000}
        height={1000}
        alt="side"
        className="object-cover w-full h-full"
      />
      <Link href={"/"} className="absolute top-10 left-10">
        <Image
          src={"/Ecomm-Logo.jpg"}
          width={1000}
          height={1000}
          alt="side"
          className="w-40 h-20 "
        />
      </Link>
    </div>
  );
}
