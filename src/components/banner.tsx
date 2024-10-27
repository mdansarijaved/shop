import { CalendarRange, Truck } from "lucide-react";

export default function Banner() {
  const bannerLeft = [
    {
      icon: <Truck className="text-white size-5" />,
      title: <h1 className="text-sm font-semibold">Free Shipping</h1>,
    },
    {
      icon: <CalendarRange className="text-white size-5" />,
      title: <h1 className="text-sm font-semibold">EMI Options</h1>,
    },
  ];
  return (
    <div className="bg-black h-10 items-center flex justify-between place-content-center px-2 md:px-16">
      <div className="text-white hidden md:flex md:gap-6 gap-4">
        {bannerLeft.map((item, index) => (
          <div className="flex md:gap-2 gap-1" key={index}>
            {item.icon}
            {item.title}
          </div>
        ))}
      </div>
      <h1 className="text-white mx-auto md:mx-0 text-sm font-semibold">Help?</h1>
    </div>
  );
}
