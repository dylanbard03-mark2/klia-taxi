import type { Metadata } from "next";
import "./globals.css";
import { brand } from "@/config/business";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBottomBar } from "@/components/MobileBottomBar";

export const metadata: Metadata = {
  title: {
    default: `${brand.name} — Airport Transfers to KLIA & KLIA2`,
    template: `%s | ${brand.name}`,
  },
  description:
    "Pre-book your airport transfer to KLIA & KLIA2. Reliable, comfortable taxi and private car service for Kuala Lumpur International Airport.",
  keywords: [
    "KLIA taxi",
    "KLIA2 taxi",
    "airport transfer KL",
    "KLIA airport transfer",
    "taxi to KLIA",
    "taxi from KLIA",
    "Kuala Lumpur airport taxi",
    "KLIA cab",
    "KLIA2 cab",
    "airport pickup KLIA",
  ],
  openGraph: {
    title: `${brand.name} — Airport Transfers to KLIA & KLIA2`,
    description:
      "Pre-book your airport transfer to KLIA & KLIA2. Reliable, comfortable taxi and private car service.",
    type: "website",
    locale: "en_MY",
    siteName: brand.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <MobileBottomBar />
      </body>
    </html>
  );
}

