import * as React from "react";

import Image from "next/image";

export function Favourites() {
  const productsUp = [
    {
      name: "TV Stand",
      icon: (
        <Image
          src="/tvstand/TVstand4.webp"
          alt="Large Image"
          width={500}
          height={100}
          className="object-cover h-full"
        />
      ),
    },
    {
      name: "Dinning Table",
      icon: (
        <Image
          src="/dinningtable/dinningtable1.webp"
          alt="Large Image"
          width={500}
          height={100}
          className="object-cover h-full"
        />
      ),
    },
    {
      name: "Sofa",
      icon: (
        <Image
          src="/Sofas/sofa4.webp"
          alt="Large Image"
          width={500}
          height={100}
          className="object-cover h-full"
        />
      ),
    },
  ];
  const productsDown = [
    {
      name: "wardrobe",
      icon: (
        <Image
          src="/cupboard/cupboard2.webp"
          alt="Large Image"
          width={500}
          height={100}
          className="object-cover h-full"
        />
      ),
    },
    {
      name: "Bed",
      icon: (
        <Image
          src="/Bed/Bed2.webp"
          alt="Large Image"
          width={500}
          height={100}
          className="object-cover h-full"
        />
      ),
    },
    {
      name: "Temple",
      icon: (
        <Image
          src="/temple/temple1.webp"
          alt="Large Image"
          width={500}
          height={100}
          className="object-cover h-full"
        />
      ),
    },
  ];

  return (
    <>
      <h1 className="text-center text-2xl mt-10 font-bold font-sans underline underline-offset-8 tracking-tight">
        Cult Favourites
      </h1>

      <div className="flex mx-auto w-[90%] sm:w-[80%] gap-4 mt-10 justify-between">
        {productsUp.map((item) => (
          <div
            className=" cursor-pointer hover:scale-105 transition-all duration-300 text-center font-bold uppercase"
            key={item.name}
          >
            <div className="h-[90%] hover:shadow-lg w-full">
              {item.icon}
            </div>
            <p className="lg:text-xl mt-2 sm:tracking-wider text-[0.7rem] sm:text-[0.9rem]">{item.name}</p>
          </div>
        ))}
      </div>
      <div className="flex mx-auto w-[90%] sm:w-[80%] gap-4 mt-10 justify-between">
        {productsDown.map((item) => (
          <div
            className=" cursor-pointer hover:scale-105 transition-all duration-300 text-center font-bold uppercase"
            key={item.name}
          >
            <div className="h-[90%] hover:shadow-lg w-full">
              {item.icon}
            </div>
            <p className="lg:text-xl mt-2 sm:tracking-wider text-[0.7rem] sm:text-[0.9rem]">{item.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}
