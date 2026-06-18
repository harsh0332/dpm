"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { siteData } from "@/content/site-data";

export default function YourMoment() {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  // Countdown Calculation Logic
  const calculateTimeLeft = () => {
    const difference = +new Date(siteData.config.countdownTarget) - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
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

  const revealVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className="py-16 md:py-24 max-w-5xl mx-auto px-6 text-center overflow-hidden">
      
      {/* Gold-Gradient Highlight Box */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariants}
        className="gold-gradient-bg text-luxury-onyx p-8 md:p-16 rounded-[2rem] shadow-2xl relative overflow-hidden space-y-6"
      >
        {/* Subtle decorative circles */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-white/10 blur-[80px] pointer-events-none" />
        
        <span className="font-sans text-[10px] tracking-[0.25em] text-luxury-onyx uppercase font-bold block">
          Auditions Closing Soon
        </span>
        
        <h2 className="font-serif text-3xl md:text-5xl tracking-wide font-light leading-tight max-w-3xl mx-auto text-luxury-onyx">
          Your Moment Is Waiting. Don&apos;t Let It Pass.
        </h2>
        
        <div className="w-16 h-[1.5px] bg-luxury-onyx/40 mx-auto" />
        
        {/* Offer Recap */}
        <p className="font-sans text-xs md:text-sm text-luxury-onyx/80 max-w-xl mx-auto leading-relaxed">
          Secure your national Zoom audition slot today for a flat fee of ₹{siteData.registrationFee.current} (including GST). You will receive your candidate preparation kit and grooming syllabus within 24 hours of checkout.
        </p>

        {/* Live Countdown in Solid Onyx */}
        {mounted && (
          <div className="bg-luxury-onyx text-white rounded-[20px] p-4 max-w-sm mx-auto my-6 shadow-xl border border-white/5 relative z-10 text-left">
            <div className="flex justify-between items-center mb-2">
              <span className="flex items-center gap-1.5 font-bold text-[8.5px] tracking-[0.14em] uppercase text-[#E7C877]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E0567E] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#E0567E]"></span>
                </span>
                Auditions closing in
              </span>
              <span className="font-bold text-[8.5px] tracking-[0.08em] uppercase text-white">
                {siteData.config.slotsRemaining} slots remaining
              </span>
            </div>
            <div className="flex gap-1.5">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Mins", value: timeLeft.minutes },
                { label: "Secs", value: timeLeft.seconds },
              ].map((item, i) => (
                <div key={i} className="flex-1 text-center bg-white/5 border border-white/7 rounded-[9px] py-1.5">
                  <div className="font-serif font-bold text-[18px] leading-none text-white">{String(item.value).padStart(2, "0")}</div>
                  <div className="font-semibold text-[7px] tracking-[0.1em] uppercase text-[#8A8597] mt-1">{item.label}</div>
                </div>
              ))}
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden mt-2">
              <div className="h-full rounded-full bg-gradient-to-r from-[#5470D9] via-[#C7458A] to-[#F3D78A]" style={{ width: `${(siteData.config.slotsRemaining / siteData.config.maxSlotsPerState) * 100}%` }} />
            </div>
          </div>
        )}

        {/* Dynamic Urgency / Slots remaining */}
        <p className="font-sans text-[10px] tracking-widest uppercase font-bold text-luxury-onyx/90 flex items-center justify-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-700 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-900"></span>
          </span>
          Only {siteData.config.slotsRemaining} State Slots Left &bull; Grand Finale {siteData.grandFinaleDate}
        </p>

        {/* Contrasting Solid Onyx CTA Button */}
        <div className="pt-4">
          <motion.div
            whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
            className="inline-block animate-pulse-slow"
          >
            <a 
              href="#register" 
              className="inline-flex items-center justify-center font-sans text-xs tracking-widest uppercase bg-luxury-onyx text-white px-10 h-12 font-bold shadow-lg rounded-full hover:bg-white hover:text-luxury-onyx transition-all duration-300"
            >
              Apply for Auditions Now
            </a>
          </motion.div>
        </div>

      </motion.div>

    </section>
  );
}
