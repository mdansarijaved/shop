import { Metadata } from "next";
import TermsAndConditions from "@/components/terms-and-conditions";

export const metadata: Metadata = {
  title: "Terms and Conditions | Vishwakarma wood works",
  description: "Terms and conditions for using our vishwakarma wood works.",
};

export default function TermsPage() {
  return <TermsAndConditions />;
}
