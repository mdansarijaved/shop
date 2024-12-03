import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { IconBrandFacebook } from "@tabler/icons-react";
import { CircleHelp, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Socials() {
  const contact = [
    {
      name: "Talk to us",
      link: "tel:+91-8091175856",
      icon: <Phone className="size-4" />,
      desc: "+91-8091175856",
    },
    {
      name: "Address",
      link: "https://maps.google.com/?q=Shop no. 32-33, Jhungian Road, Opposite NRI enclave, Kharar",
      icon: <CircleHelp className="size-4" />,
      desc: "Shop no. 32-33, Jhungian Road, Opposite NRI enclave, Kharar",
    },
    {
      name: "Write to us",
      link: "mailto:info@vishwakarmawoodworks.com",
      icon: <Mail className="size-4" />,
      desc: "info@vishwakarmawoodworks.com",
    },
  ];

  const icons = [
    {
      icon: <IconBrandFacebook className="lg:size-8 size-5" />,
      link: "#",
      label: "Facebook",
    },
    {
      icon: <TwitterLogoIcon className="lg:size-8 size-5" />,
      link: "#",
      label: "Twitter",
    },
    {
      icon: <InstagramLogoIcon className="lg:size-8 size-5" />,
      link: "#",
      label: "Instagram",
    },
  ];

  return (
    <footer className="px-10 mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center border-y py-6">
        <div className="md:flex gap-8 place-content-center place-items-center hidden">
          {contact.map((item) => (
            <Link
              key={item.desc}
              href={item.link}
              className="flex gap-3 place-items-center hover:text-primary transition-colors"
            >
              <span className="text-black border-2 rounded-full p-2 border-black/40">
                {item.icon}
              </span>
              <div className="flex flex-col text-sm tracking-wider">
                <span className="text-muted-foreground">{item.name}</span>
                <span>{item.desc}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex place-items-center">
          {icons.map((icon) => (
            <Button
              key={icon.label}
              variant="ghost"
              size="icon"
              className="hover:bg-accent hover:text-accent-foreground rounded-full"
              asChild
            >
              <Link href={icon.link}>
                {icon.icon}
                <span className="sr-only">{icon.label}</span>
              </Link>
            </Button>
          ))}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between my-3">
        <Image
          src="/Ecomm-Logo.jpg"
          alt="Vishwakarma Woodworks Logo"
          width={100}
          height={100}
        />
        <div className="flex text-[0.7rem] font-semibold sm:text-sm gap-1 mt-2 sm:mt-0 text-muted-foreground">
          <Button
            variant="link"
            className="p-0 h-auto font-semibold hover:text-primary"
          >
            <Link href="/terms">Terms & Conditions</Link>
          </Button>
          <span className="self-center">-</span>
          <Button
            variant="link"
            className="p-0 h-auto font-semibold hover:text-primary"
          >
            <Link href="/privacy">Privacy Policy</Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
