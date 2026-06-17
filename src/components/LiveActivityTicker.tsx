"use client";

import React, { useState, useEffect } from "react";
import { siteData } from "@/content/site-data";

export default function LiveActivityTicker() {
  const [tickerText, setTickerText] = useState("Auditions Status: Registration open nationwide");

  useEffect(() => {
    if (!siteData.config.showLiveActivityTicker) return;

    const statuses = [
      "Auditions Status: Registration open nationwide",
      "Notice: Zoom Audition slots allocation in progress",
      "Status: Miss India 2026 category registrations active",
      "Status: Mr. India category registrations active",
      "Notice: Verification guidelines sent within 24 hours of payment"
    ];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % statuses.length;
      setTickerText(statuses[index]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Suppress rendering if toggle is disabled
  if (!siteData.config.showLiveActivityTicker) {
    return null;
  }

  return (
    <div className="fixed top-20 left-4 z-40 hidden lg:flex items-center gap-2 bg-luxury-darkcard/95 border border-luxury-gold/30 px-4 py-2.5 shadow-xl backdrop-blur-sm">
      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      <span className="font-sans text-[10px] tracking-wider uppercase text-luxury-gold font-bold">
        Live
      </span>
      <span className="w-[1px] h-3 bg-luxury-gold/30" />
      <p className="font-sans text-[10px] text-gray-300 tracking-wide m-0">
        {tickerText}
      </p>
    </div>
  );
}
