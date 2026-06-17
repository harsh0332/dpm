"use client";

import React from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { siteData } from "@/content/site-data";

export default function YourMoment() {
  const shouldReduceMotion = useReducedMotion();

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

        {/* Dynamic Urgency / Slots remaining */}
        <p className="font-sans text-[10px] tracking-widest uppercase font-bold text-luxury-onyx/90 flex items-center justify-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-700 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-900"></span>
          </span>
          Only {siteData.config.slotsRemaining} State Slots Left • Grand Finale {siteData.grandFinaleDate}
        </p>

        {/* Contrasting Solid Onyx CTA Button */}
        <div className="pt-4">
          <motion.div
            whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
            className="inline-block"
          >
            <a 
              href="#register" 
              className="inline-flex items-center justify-center font-sans text-xs tracking-widest uppercase bg-luxury-onyx text-white px-10 h-12 font-bold shadow-lg rounded-full hover:bg-white hover:text-luxury-onyx transition-all duration-300"
            >
              Apply for Auditions
            </a>
          </motion.div>
        </div>

      </motion.div>

    </section>
  );
}
