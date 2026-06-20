"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteData } from "@/content/site-data";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-luxury-onyx/95 backdrop-blur-md border-b border-luxury-border/80 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3.5" 
          : "bg-transparent border-b border-transparent py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group text-decoration-none">
          <Image
            src={siteData.logo}
            alt={`${siteData.brandName} Logo`}
            width={40}
            height={40}
            loading="eager"
            sizes="40px"
            className="w-10 h-10 object-contain border border-luxury-gold/30 rounded-full bg-white/5 p-0.5 transition-transform duration-500 group-hover:rotate-[360deg]"
          />
          <span className="font-serif tracking-[0.2em] text-lg font-bold text-white group-hover:text-luxury-gold transition-colors duration-300">
            DPM Entertainment
          </span>
        </Link>

        {/* Dynamic Navigation Links & Gold Gradient CTA Pill */}
        <div className="flex items-center gap-6 md:gap-8">
          <div className="hidden md:flex items-center gap-6 font-sans text-[10px] tracking-[0.2em] uppercase font-medium">
            <Link href="/" className="text-gray-300 hover:text-luxury-gold transition-colors duration-300 text-decoration-none">
              Home
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-luxury-gold transition-colors duration-300 text-decoration-none">
              About
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-luxury-gold transition-colors duration-300 text-decoration-none">
              Contact
            </Link>
            <Link href="/privacy-refund" className="text-gray-300 hover:text-luxury-gold transition-colors duration-300 text-decoration-none">
              Policies
            </Link>
          </div>

          <a 
            href="#register" 
            className="hidden md:flex font-sans text-[9px] sm:text-[10px] tracking-[0.15em] uppercase gold-gradient-bg text-luxury-onyx px-5 h-11 items-center justify-center font-extrabold hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 rounded-full shadow-[0_4px_15px_rgba(201,162,75,0.25)] btn-shimmer gap-2 text-decoration-none"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>APPLY NOW — ₹{siteData.registrationFee.current}</span>
          </a>
        </div>

      </div>
    </nav>
  );
}
