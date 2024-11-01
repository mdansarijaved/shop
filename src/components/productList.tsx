"use client"

import Image from 'next/image';
import { useEffect, useState } from 'react';

const productsData = [
    {
      id: 1,
      name: "Bed Design",
      category: "Bed",
      price: 1400,
      icon: (
        <Image
          src="/bed/Bed1.webp"
          alt="Bed Design"
          width={500}
          height={100}
          className="object-cover h-full"
        />
      ),
      link: "/products",
    },
    {
      id: 2,
      name: "Wooden Wardrobe",
      category: "Wardrobe",
      price: 5500,
      icon: (
        <Image
          src="/cupboard/cupboard1.webp"
          alt="Wooden Wardrobe"
          width={500}
          height={100}
          className="object-cover h-full"
        />
      ),
      link: "/products",
    },
    {
      id: 3,
      name: "Sofa",
      category: "Sofa",
      price: 8000,
      icon: (
        <Image
          src="/Sofas/Sofa1.webp"
          alt="Sofa"
          width={500}
          height={100}
          className="object-cover h-full"
        />
      ),
      link: "/products",
    },
    {
      id: 4,
      name: "Bed",
      category: "Bed",
      price: 1800,
      icon: (
        <Image
          src="/bed/Bed2.webp"
          alt="Bed"
          width={500}
          height={100}
          className="object-cover h-full"
        />
      ),
      link: "/products",
    },
    {
      id: 5,
      name: "Sofa",
      category: "Sofa",
      price: 7500,
      icon: (
        <Image
          src="/Sofas/sofa2.webp"
          alt="Sofa"
          width={500}
          height={100}
          className="object-cover h-full"
        />
      ),
      link: "/products",
    },
    {
      id: 6,
      name: "Dining Table",
      category: "Dining Table",
      price: 1400,
      icon: (
        <Image
          src="/dinningtable/dinningtable1.webp"
          alt="Dining Table"
          width={500}
          height={100}
          className="object-cover h-full"
        />
      ),
      link: "/products",
    },
    {
      id: 7,
      name: "Dining Table Design",
      category: "Dining Table",
      price: 1800,
      icon: (
        <Image
          src="/dinningtable/dinningtable2.webp"
          alt="Dining Table Design"
          width={500}
          height={100}
          className="object-cover h-full"
        />
      ),
      link: "/products",
    },
    {
      id: 8,
      name: "Sofa",
      category: "Sofa",
      price: 8000,
      icon: (
        <Image
          src="/Sofas/sofa3.webp"
          alt="Sofa"
          width={500}
          height={100}
          className="object-cover h-full"
        />
      ),
      link: "/products",
    },
    {
      id: 9,
      name: "TV Stand",
      category: "TV Stand",
      price: 9000,
      icon: (
        <Image
          src="/tvstand/TVstand1.webp"
          alt="TV Stand"
          width={500}
          height={100}
          className="object-cover h-full"
        />
      ),
      link: "/products",
    },
    {
      id: 10,
      name: "TV Stand Design",
      category: "TV Stand",
      price: 6500,
      icon: (
        <Image
          src="/tvstand/TVstand2.webp"
          alt="TV Stand Design"
          width={500}
          height={100}
          className="object-cover h-full"
        />
      ),
      link: "/products",
    },
    {
      id: 11,
      name: "Ceiling Fan",
      category: "Fan",
      price: 1500,
      icon: (
        <Image
          src="/ceilingfan/ceilingfan1.webp"
          alt="Ceiling Fan"
          width={500}
          height={100}
          className="object-cover h-full"
        />
      ),
      link: "/products",
    },
    {
      id: 12,
      name: "Door Design",
      category: "Door",
      price: 800,
      icon: (
        <Image
          src="/door/door1.webp"
          alt="Door Design"
          width={500}
          height={100}
          className="object-cover h-full"
        />
      ),
      link: "/products",
    },
    {
      id: 13,
      name: "Entrance Door",
      category: "Door",
      price: 1800,
      icon: (
        <Image
          src="/door/door2.webp"
          alt="Entrance Door"
          width={500}
          height={100}
          className="object-cover h-full"
        />
      ),
      link: "/products",
    },
    {
      id: 14,
      name: "Kitchen Design",
      category: "Kitchen",
      price: 10000,
      icon: (
        <Image
          src="/kitchen/kitchen1.webp"
          alt="Kitchen Design"
          width={500}
          height={100}
          className="object-cover h-full"
        />
      ),
      link: "/products",
    },
    {
      id: 15,
      name: "Kitchen Interior",
      category: "Kitchen",
      price: 15000,
      icon: (
        <Image
          src="/kitchen/Kitchen2.webp"
          alt="Kitchen Interior"
          width={500}
          height={100}
          className="object-cover h-full"
        />
      ),
      link: "/products",
    },
    {
      id: 16,
      name: "Kitchen Design",
      category: "Kitchen",
      price: 20000,
      icon: (
        <Image
          src="/kitchen/Kitchen3.webp"
          alt="Kitchen Design"
          width={500}
          height={100}
          className="object-cover h-full"
        />
      ),
      link: "/products",
    },
    {
      id: 17,
      name: "TV Stand Design",
      category: "TV Stand",
      price: 5000,
      icon: (
        <Image
          src="/tvstand/TVstand3.webp"
          alt="TV Stand Design"
          width={500}
          height={100}
          className="object-cover h-full"
        />
      ),
      link: "/products",
    },
    {
      id: 18,
      name: "TV Stand",
      category: "TV Stand",
      price: 7500,
      icon: (
        <Image
          src="/tvstand/TVstand4.webp"
          alt="TV Stand"
          width={500}
          height={100}
          className="object-cover h-full"
        />
      ),
      link: "/products",
    },
    {
      id: 19,
      name: "Wardrobe Design",
      category: "Wardrobe",
      price: 14000,
      icon: (
        <Image
          src="/cupboard/Cupboard2.webp"
          alt="Wardrobe Design"
          width={500}
          height={100}
          className="object-cover h-full"
        />
      ),
      link: "/products",
    },
    {
      id: 20,
      name: "Wardrobe Design",
      category: "Wardrobe",
      price: 18000,
      icon: (
        <Image
          src="/cupboard/Cupboard3.webp"
          alt="Wardrobe Design"
          width={500}
          height={100}
          className="object-cover h-full"
        />
      ),
      link: "/products",
    },
    {
      id: 21,
      name: "Temple Design",
      category: "Temple",
      price: 1400,
      icon: (
        <Image
          src="/temple/Temple1.webp"
          alt="Temple Design"
          width={500}
          height={100}
          className="object-cover h-full"
        />
      ),
      link: "/products",
    },
    {
      id: 22,
      name: "Sofa Design",
      category: "Sofa",
      price: 1400,
      icon: (
        <Image
          src="/sofas/Sofa4.webp"
          alt="Sofa Design"
          width={500}
          height={100}
          className="object-cover h-full"
        />
      ),
      link: "/products",
    },
    {
      id: 23,
      name: "Sofa Set",
      category: "Sofa",
      price: 1400,
      icon: (
        <Image
          src="/sofas/Sofa5.webp"
          alt="Sofa Set"
          width={500}
          height={100}
          className="object-cover h-full"
        />
      ),
      link: "/products",
    },
    {
      id: 24,
      name: "Sofa Set Design",
      category: "Sofa",
      price: 1400,
      icon: (
        <Image
          src="/sofas/Sofa6.webp"
          alt="Sofa Set Design"
          width={500}
          height={100}
          className="object-cover h-full"
          />
      ),
      link: "/products",
    },
  
];

export default function ProductList({selectedCategories}) {

  const filteredProducts = selectedCategories.length > 0
    ? productsData.filter(product => selectedCategories.includes(product.category))
    : productsData; // Show all products if no category is selected

  return (
    <>
      <main className="md:p-4 mt-4 mb-12 h-[100vh] overflow-y-scroll 2xl:flex flex-col 2xl:place-items-center">
        <h2 className="text-xl 2xl:text-3xl font-bold mb-4">Products</h2>
        <div className="grid xl:grid-cols-3 grid-cols-2 2xl:gap-6 gap-4 w-[95%] mx-auto">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border hover:scale-105 h-72 transition-all duration-300 cursor-pointer md:max-h-80 p-2 shadow-md">
              <div className='2xl:h-[85%] h-[85%] md:h-[90%] mx-auto'>
                {product.icon}
              </div>
              <div className='flex justify-between pt-2 gap-2'>
              <h3 className="font-semibold font-sans text-[0.75rem] md:text-sm 2xl:text-xl">{product.name}</h3>
              <h3 className="font-bold 2xl:text-[1.65rem]">&#8377;{product.price}</h3>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
