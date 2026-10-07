import type { Metadata, Viewport } from "next";
import "./globals.css";
import { RentalProvider } from "@/context/RentalContext";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Rent Gaming Consoles in Bangalore | PS5, Xbox, GTA VI on Rent - SharePal",
  description:
    "Rent the latest gaming gadgets from PS5, Xbox, Oculus VR, Racing Wheel on rent in Bangalore. Doorstep delivery and flexible rental plans on SharePal.",
  keywords: [
    "Gaming gadgets on rent",
    "PS5 on rent Bangalore",
    "Xbox console rental",
    "GTA VI rental",
    "SharePal gaming",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#fcfcfc] text-gray-900">
        <RentalProvider>{children}</RentalProvider>
      </body>
    </html>
  );
}
