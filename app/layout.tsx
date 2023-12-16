import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "@/components/NavBar";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Taxi Booking App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
          <NavBar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
