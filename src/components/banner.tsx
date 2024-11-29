import Link from "next/link";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

const categories = [
  "KITCHEN",
  "WARDROBE",
  "SHOERACK",
  "PARTITION",
  "DRESSER",
  "WALLDESIGN",
  "INTERIOR",
  "DOORS",
  "EXTERIOR",
  "HOMEDECOR",
];

export default function Categories() {
  return (
    <nav className="bg-gray-100 py-2 px-4 md:px-16 sticky top-0 left-0 w-full z-50">
      <div className="w-full flex justify-center">
        <ScrollArea className="w-[100vw] ">
          <ul className={`flex justify-center space-x-4 lg:space-x-8`}>
            {categories.map((category) => (
              <li key={category}>
                <Link
                  href={`/category/${category.toLowerCase()}`}
                  className="text-sm font-light text-gray-600 hover:text-blue-600 hover:underline"
                >
                  {category.charAt(0) + category.slice(1).toLowerCase()}
                </Link>
              </li>
            ))}
          </ul>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </nav>
  );
}
