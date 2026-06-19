import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Playfair_Display, Hanken_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
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

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    <html lang="en" className={`${cormorantGaramond.variable} ${inter.variable} ${playfair.variable} ${hanken.variable}`}>
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
