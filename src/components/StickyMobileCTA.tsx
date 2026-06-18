"use client";

import React, { useState, useEffect } from "react";
import { siteData } from "@/content/site-data";

export default function StickyMobileCTA() {
  const { current, original } = siteData.registrationFee;
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(siteData.config.countdownTarget) - +new Date();
      let tl = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      if (difference > 0) {
        tl = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return tl;
    };

    const timerId = setTimeout(() => {
      setMounted(true);
      setTimeLeft(calculateTimeLeft());
    }, 0);

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearTimeout(timerId);
      clearInterval(timer);
    };
  }, []);

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
        <div className="text-left flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5">
            <strong className="font-serif text-base text-white">
              ₹{current}
            </strong>
            <del className="font-sans text-[9px] text-gray-500">
              ₹{original}
            </del>
          </div>
          {mounted && (
            <p className="m-0 text-[8.5px] uppercase tracking-wider text-[#E7C877] font-bold animate-pulse flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-[#E0567E]"></span>
              Ends in: {timeLeft.days}d {String(timeLeft.hours).padStart(2, "0")}h {String(timeLeft.minutes).padStart(2, "0")}m {String(timeLeft.seconds).padStart(2, "0")}s
            </p>
          )}
        </div>
        
        <a 
          href="#register" 
          className="font-sans text-xs tracking-widest uppercase gold-gradient-bg text-luxury-onyx px-6 h-11 flex items-center justify-center font-bold hover:brightness-110 transition-all duration-300 rounded-full shadow-md text-decoration-none"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
}
