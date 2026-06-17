"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { siteData } from "@/content/site-data";

export default function RecentApplicationsToast() {
  const shouldReduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  const notifications = [
    { name: "Kavya Nair", city: "Kochi", action: "just completed registration", time: "2 min ago" },
    { name: "Vikash Yadav", city: "Varanasi", action: "just applied for Miss India", time: "just now" },
    { name: "Vikash Yadav", city: "Varanasi", action: "just applied for Mrs. India", time: "3 min ago" },
    { name: "Kavya Nair", city: "Kochi", action: "just applied for Miss Teen", time: "1 min ago" },
    { name: "Khushi Sharma", city: "Dehradun", action: "just completed registration", time: "5 min ago" },
    { name: "Aditi Rao", city: "Mumbai", action: "just applied for Miss India", time: "just now" },
    { name: "Tanya Sen", city: "Delhi", action: "just completed registration", time: "3 min ago" },
    { name: "Riya Patel", city: "Bangalore", action: "just applied for Mrs. India", time: "7 min ago" },
    { name: "Sneha Sinha", city: "Patna", action: "just completed registration", time: "12 min ago" },
    { name: "Mansi Joshi", city: "Jaipur", action: "just applied for Miss India", time: "1 min ago" },
    { name: "Ananya Deshmukh", city: "Pune", action: "just completed registration", time: "15 min ago" },
  ];

  useEffect(() => {
    if (!siteData.config.showRecentApplicationsToast) return;

    // Wait a brief delay after mounting to trigger the first slide up
    const startTimeout = setTimeout(() => {
      setVisible(true);
    }, 1500);

    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % notifications.length);
        setVisible(true);
      }, 600); // Duration to fade out/down before sliding next one up
    }, 6500); // Total display time for each notification toast

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
  }, []);

  if (!siteData.config.showRecentApplicationsToast) {
    return null;
  }

  const current = notifications[index];
  const firstLetter = current.name ? current.name.charAt(0).toUpperCase() : "K";

  return (
    <div className="fixed bottom-24 left-4 md:bottom-6 md:left-6 z-40 pointer-events-none">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="bg-luxury-darkcard/95 border border-luxury-gold/25 p-4 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.7)] flex items-center gap-3.5 w-[22rem] max-w-full backdrop-blur-md pointer-events-auto"
          >
            {/* Circular Avatar Letter Icon */}
            <div className="w-10 h-10 rounded-full bg-luxury-gold flex items-center justify-center shrink-0 text-luxury-onyx font-sans font-bold text-base shadow-inner">
              {firstLetter}
            </div>

            {/* Notification content */}
            <div className="text-left font-sans leading-tight">
              <div className="text-[12px] md:text-[13px] font-medium leading-tight">
                <span className="text-white font-bold">{current.name}</span>
                <span className="text-gray-400 font-normal"> from {current.city}</span>
              </div>
              <div className="text-[11px] md:text-[12px] text-luxury-gold font-medium mt-1 leading-none">
                {current.action}
                <span className="text-gray-400 font-normal"> • {current.time}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
