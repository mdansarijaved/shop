import React from "react";
import Socials from "./socials";

function Footer() {
  const furnitures = [
    "Living Furniture",
    "Bedroom Furniture",
    "Dining Furniture",
    "Accent Furniture",
    "Computer Desk and Chair",
    "Kids Furniture",
  ];
  const kitchen = [
    "Cooking",
    "Storage & Containers",
    "Kitchenware",
    "Kitchen Linen",
    "Appliances",
    "Serveware",
  ];
  const dining = [
    "Serving",
    "Crockery",
    "Dinner sets",
    "Table Accessories",
    "Cutlery",
  ];
  return (
    <footer>
      <div className="px-10 mx-auto flex gap-24 justify-between mb-10 border-t pt-10">
        <div className="  w-full lg:flex justify-between hidden">
          <div className="text-sm">
            <h1 className="font-bold mb-2">Furniture</h1>
            {furnitures.map((item) => (
              <p
                key={item}
                className="mb-1 text-[#757575] cursor-pointer w-fit"
              >
                {item}
              </p>
            ))}
          </div>
          <div className="text-sm">
            <h1 className="font-bold mb-2">Kitchen</h1>
            {kitchen.map((item) => (
              <p
                key={item}
                className="mb-1 text-[#757575] cursor-pointer w-fit"
              >
                {item}
              </p>
            ))}
          </div>
          <div className="text-sm">
            <h1 className="font-bold mb-2">Dining</h1>
            {dining.map((item) => (
              <p
                key={item}
                className="mb-1 text-[#757575] cursor-pointer w-fit"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="  w-full">
          <h1 className="font-semibold md:text-2xl text-[1.17rem]">
            Subscribe to our awesome emails.
          </h1>
          <p className="text-[#929391] mt-2 text-sm md:text-base">
            Get our latest offers and news straight in your inbox.
          </p>
          <form className="mt-8 flex">
            <input
              type="text"
              className="w-full placeholder:text-[#757575] outline-none px-4 py-2 md:px-6 md:py-4 bg-[#f7f8f7]"
              placeholder="Enter your email"
            />
            <button className="bg-black text-white text-sm md:text-base px-4 md:px-12 font-semibold">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <Socials />
    </footer>
  );
}

export default Footer;
