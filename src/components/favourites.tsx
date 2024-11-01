import * as React from "react";
import {useRouter} from 'next/navigation'
import Image from "next/image";

export function Favourites() {

  const router = useRouter();

  const productsUp = [
    {
      name: "TV Stand",
      category: "TV Stand",
      icon: (
        <Image
          src="/tvstand/TVstand4.webp"
          alt="Large Image"
          width={500}
          height={100}
          className="object-cover h-full"
        />
      ),
      link: "/products",
    },
    {
      name: "Dinning Table",
      category: "Dining Table",
      icon: (
        <Image
          src="/dinningtable/dinningtable1.webp"
          alt="Large Image"
          width={500}
          height={100}
          className="object-cover h-full"
        />
      ),
      link: "/products",
    },
    {
      name: "Sofa",
      category: "Sofa",
      icon: (
        <Image
          src="/Sofas/sofa4.webp"
          alt="Large Image"
          width={500}
          height={100}
          className="object-cover h-full"
        />
      ),
      link: "/products",
    },
  ];
  const productsDown = [
    {
      name: "wardrobe",
      category: "Wardrobe",
      icon: (
        <Image
          src="/cupboard/cupboard2.webp"
          alt="Large Image"
          width={500}
          height={100}
          className="object-cover h-full"
        />
      ),
      link: "/products",
    },
    {
      name: "Bed",
      category: "Bed",
      icon: (
        <Image
          src="/Bed/Bed2.webp"
          alt="Large Image"
          width={500}
          height={100}
          className="object-cover h-full"
        />
      ),
      link: "/products",
    },
    {
      name: "Temple",
      category: "Temple",
      icon: (
        <Image
          src="/temple/temple1.webp"
          alt="Large Image"
          width={500}
          height={100}
          className="object-cover h-full"
        />
      ),
      link: "/products",
    },
  ];

  const handleClick = (item) => {
    router.push(`${item.link}?category=${item.category}`);
  }

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
            onClick={() => handleClick(item)}
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
            onClick={() => handleClick(item)}
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
