import type { Metadata } from "next";
// Only load the 2 fonts that are actually rendered:
// Playfair Display → --font-playfair → used as --font-serif across all headings
// Hanken Grotesk   → --font-hanken   → used as --font-sans across all body text
// Cormorant Garamond and Inter were loaded but overridden in globals.css (removed).
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { siteData } from "@/content/site-data";

const playfair = localFont({
  src: [
    { path: "../../public/fonts/playfair-display-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/playfair-display-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../../public/fonts/playfair-display-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/playfair-display-500-italic.woff2", weight: "500", style: "italic" },
    { path: "../../public/fonts/playfair-display-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/playfair-display-600-italic.woff2", weight: "600", style: "italic" },
    { path: "../../public/fonts/playfair-display-700-normal.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/playfair-display-700-italic.woff2", weight: "700", style: "italic" },
  ],
  variable: "--font-playfair",
  display: "swap",
});

const hanken = localFont({
  src: [
    { path: "../../public/fonts/hanken-grotesk-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/hanken-grotesk-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/hanken-grotesk-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-hanken",
  display: "swap",
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
    <html lang="en" className={`${playfair.variable} ${hanken.variable}`}>
      <body className="bg-luxury-onyx text-luxury-alabaster font-sans antialiased min-h-screen flex flex-col overflow-x-hidden">
        {/* Meta Pixel Code */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1769592324049337');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1769592324049337&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <Navbar />
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
