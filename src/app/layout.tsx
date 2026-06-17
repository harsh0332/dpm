import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteData } from "@/content/site-data";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dpm-pageant.com"),
  title: "DPM Mr / Miss / Mrs / Miss Teen India 2026 | Official Registration",
  description: "Official registration portal for DPM Mr / Miss / Mrs / Miss Teen India 2026. Apply online for ₹999. Online Auditions via Zoom. Win ₹11,00,000 in prizes.",
  openGraph: {
    title: "DPM Mr / Miss / Mrs / Miss Teen India 2026 | Official Registration",
    description: "Official registration portal for DPM Mr / Miss / Mrs / Miss Teen India 2026. Apply online for ₹999. Online Auditions via Zoom.",
    url: "https://dpm-pageant.com",
    siteName: siteData.brandName,
    images: [
      {
        url: "/new-images/dpm-logo.png",
        width: 800,
        height: 800,
        alt: "DPM Entertainment Pageant Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DPM Mr / Miss / Mrs / Miss Teen India 2026 | Official Registration",
    description: "Official registration portal for DPM Mr / Miss / Mrs / Miss Teen India 2026. Apply online for ₹999. Online Auditions via Zoom.",
    images: ["/new-images/dpm-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${inter.variable}`}>
      <body className="bg-luxury-onyx text-luxury-alabaster font-sans antialiased min-h-screen flex flex-col overflow-x-hidden">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
