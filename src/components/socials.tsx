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
      desc: "8091175856",
    },
    {
      name: "Address",
      link: "/",
      icon: <CircleHelp className="size-4" />,
      desc: "Shop no. 32-33, Jhungian Road, Opposite NRI enclave, Kharar",
    },
    {
      name: "Write to us",
      link: "/",
      icon: <Mail className="size-4" />,
      desc: "info@vishwakarmawoodworks.com",
    },
  ];

  const icons = [
    <IconBrandFacebook key="facebook" className="lg:size-8 size-5" />,
    <TwitterLogoIcon key="twitter" className="lg:size-8 size-5" />,
    <InstagramLogoIcon key="instagram" className="lg:size-8 size-5" />,
  ];
  return (
    <div className="px-10 mx-auto">
      <div className=" flex justify-between border-y py-6">
        <div className="md:flex gap-8 place-content-center place-items-center hidden">
          {contact.map((item, id) => (
            <div
              key={id}
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
          {icons.map((icon, id) => (
            <span
              key={id}
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
        <div className="flex text-[0.7rem] font-semibold sm:text-sm gap-1 ml-2 text-[#757575]">
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
