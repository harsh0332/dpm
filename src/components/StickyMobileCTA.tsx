"use client";

import React from "react";
import { siteData } from "@/content/site-data";

export default function StickyMobileCTA() {
  const { current, original } = siteData.registrationFee;
  return (
    <div 
      className="md:hidden fixed bottom-0 left-0 right-0 bg-luxury-darkcard border-t border-luxury-gold/30 px-4 py-2 flex flex-col gap-1 z-50 shadow-[0_-4px_25px_rgba(0,0,0,0.6)]"
    >
      {/* Scrollable highlights copy row */}
      <div className="overflow-hidden whitespace-nowrap w-full border-b border-luxury-border/30 pb-1 flex justify-center">
        <p className="font-sans text-[8px] uppercase tracking-wider text-luxury-gold m-0 animate-pulse">
          No Experience Needed • Grooming Support • Portfolio Shoot • Digital Exposure
        </p>
      </div>

      <div className="flex justify-between items-center w-full">
        <div className="text-left">
          <p className="m-0 text-[8px] uppercase tracking-wider text-luxury-stone font-semibold">
            Auditions Fee (inc. GST)
          </p>
          <div className="flex items-center gap-1.5">
            <strong className="font-serif text-lg text-white">
              ₹{current}
            </strong>
            <del className="font-sans text-[10px] text-gray-500">
              ₹{original}
            </del>
          </div>
        </div>
        
        <a 
          href="#register" 
          className="font-sans text-xs tracking-widest uppercase gold-gradient-bg text-luxury-onyx px-6 h-11 flex items-center justify-center font-bold hover:brightness-110 transition-all duration-300 rounded-full shadow-md"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
}
