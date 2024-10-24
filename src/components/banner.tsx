import { CalendarRange, Truck } from "lucide-react";

export default function Banner(){

    const bannerLeft = [
        {
            icon: <Truck className="text-white size-5"/>,
            title: <h1 className="text-sm font-semibold">Free Shipping</h1>,
        },
        {
            icon: <CalendarRange className="text-white size-5"/>,
            title: <h1 className="text-sm font-semibold">EMI Options</h1>,
        },
    ]
    return(
        <div className="bg-black h-10 items-center flex justify-between place-content-center px-16">
            <div className="text-white flex gap-6">
            {bannerLeft.map((item) => (
                <div className="flex gap-2">
                    {item.icon}
                    {item.title}
                </div>
            ))}
            </div>
            <h1 className="text-white text-sm font-semibold">Help</h1>
        </div>
    )
}