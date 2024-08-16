import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import ToasterProvider from "@/lib/provider/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Go4It | Home",
  description: "Next.js 14 Ecommerce layout",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ClerkProvider> */}
          <ToasterProvider />
          <Navbar />
          {children}
        {/* </ClerkProvider> */}
      </body>
    </html>
  );
}
