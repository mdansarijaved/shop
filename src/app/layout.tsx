import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import { Debug } from "@/components/ui/debug";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vishwakarma wood works",
  description: "Best wood works in India",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <Providers>
          {children}
          <Debug />
        </Providers>
      </body>
    </html>
  );
}
