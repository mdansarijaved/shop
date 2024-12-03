import { Metadata } from "next";
import PrivacyPolicy from "@/components/privacy-policy";

export const metadata: Metadata = {
  title: "Privacy Policy | Your E-commerce Store",
  description: "Privacy policy for our e-commerce platform.",
};

export default function PrivacyPage() {
  return <PrivacyPolicy />;
}
