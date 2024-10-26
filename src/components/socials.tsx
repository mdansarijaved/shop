import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { IconBrandFacebook } from "@tabler/icons-react";
import { CircleHelp, Mail, Phone } from "lucide-react";
import Image from "next/image";

export default function Socials() {
  const contact = [
    {
      name: "Talk to us",
      link: "/",
      icon: <Phone className="size-4" />,
      desc: "1200-123-4567",
    },
    {
      name: "Helpcentre",
      link: "/",
      icon: <CircleHelp className="size-4" />,
      desc: "home.in/help",
    },
    {
      name: "Write to us",
      link: "/",
      icon: <Mail className="size-4" />,
      desc: "help@me.in",
    },
  ];

  const icons = [
    <IconBrandFacebook key="facebook" />,
    <TwitterLogoIcon key="twitter" />,
    <InstagramLogoIcon key="instagram" />,
  ];
  return (
    <div className="w-[80%] mx-auto">
      <div className=" flex justify-between border-y py-6">
        <div className="flex gap-8 place-content-center place-items-center">
          {contact.map((item) => (
            <div
              key={item.link}
              className="flex gap-3 place-items-center cursor-pointer"
            >
              <span className="text-black border-2 rounded-full p-2 border-black/40">
                {item.icon}
              </span>
              <div className="flex flex-col text-sm tracking-wider">
                <h1 className="text-[#757575] ">{item.name}</h1>
                <h1>{item.desc}</h1>
              </div>
            </div>
          ))}
        </div>
        <div className="flex place-items-center">
          {icons.map((icon) => (
            <span
              key={icon.key}
              className="hover:bg-[#f5f5f5] p-4 rounded-full cursor-pointer"
            >
              {icon}
            </span>
          ))}
        </div>
      </div>
      <div className="flex place-items-center my-3">
        <Image
          src="/Ecomm-Logo.jpg"
          alt="Large Image"
          width={100}
          height={100}
        />
        <div className="flex text-sm gap-1 ml-2 text-[#757575]">
          <h1 className="cursor-pointer hover:text-[#764927]">
            Terms & Conditions
          </h1>
          <h1>-</h1>
          <h1 className="cursor-pointer hover:text-[#764927]">
            Privacy Policy
          </h1>
        </div>
      </div>
    </div>
  );
}
