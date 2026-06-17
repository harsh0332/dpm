"use client";

import React from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { siteData } from "@/content/site-data";

export default function CategorySelector() {
  const shouldReduceMotion = useReducedMotion();

  const handleSelect = (categoryId: string) => {
    // Dispatch custom event to let FinalCTA know which category was selected
    const event = new CustomEvent("select-category", { detail: categoryId });
    window.dispatchEvent(event);
  };

  const cardVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: shouldReduceMotion ? 0 : i * 0.05,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="relative py-16 md:py-24 border-b border-luxury-border max-w-5xl mx-auto px-6 overflow-hidden">
      
      {/* Rose-Magenta Backdrop Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_60%,rgba(136,13,60,0.08)_0%,transparent_55%)] pointer-events-none" />
      
      {/* Title */}
      <div className="text-center mb-12 relative z-10">
        <span className="text-[10px] font-sans tracking-[0.25em] text-[#C9A24B] uppercase block font-semibold">
          Entry Categories
        </span>
        <h2 className="font-serif text-2xl md:text-4xl tracking-wide text-white font-light">
          Find Your Crown
        </h2>
        <p className="font-sans text-xs tracking-wider text-luxury-stone mt-2 uppercase">
          Review age ranges & requirements. Click Select to auto-fill registration below.
        </p>
        <div className="w-16 h-[1px] bg-luxury-gold/50 mx-auto mt-4" />
      </div>

      {/* Grid of Categories */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {siteData.categories.map((cat, index) => {
          return (
            <motion.div 
              key={cat.id} 
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
              className={`p-5 border flex flex-col justify-between relative bg-luxury-darkcard/80 backdrop-blur-sm transition-all duration-300 rose-glow-hover rounded-2xl ${
                cat.isPopular ? "border-luxury-gold" : "border-luxury-border/30"
              }`}
            >
              {/* MOST POPULAR Badge for Miss India */}
              {cat.isPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-luxury-gold text-luxury-onyx font-sans text-[9px] uppercase tracking-widest px-3 py-1 font-bold shadow-md rounded-full">
                  Most Popular
                </span>
              )}

              <div className="space-y-4">
                {/* Real Photo Slot */}
                <div className="aspect-[4/5] bg-luxury-onyx border border-luxury-border/30 flex items-center justify-center relative overflow-hidden rounded-xl">
                  <img 
                    src={cat.image} 
                    alt={`${cat.name} Category Cover`} 
                    className="w-full h-full object-cover filter grayscale-0 md:grayscale md:hover:grayscale-0 transition-all duration-500 rounded-lg"
                    loading="lazy"
                  />
                </div>

                <div className="space-y-2 text-center">
                  {/* Crown styling indicator */}
                  <span className="text-luxury-gold text-base block">👑</span>
                  
                  <h3 className="font-serif text-xl text-white font-semibold">
                    {cat.name}
                  </h3>
                  
                  <div>
                    <span className="text-[9px] font-sans tracking-widest text-luxury-stone uppercase block font-semibold">
                      Age Limit
                    </span>
                    <span className="font-sans text-sm font-bold text-luxury-gold">
                      {cat.ageRange} Years {cat.id === "mrs-india" ? "(Married)" : ""}
                    </span>
                  </div>

                  {cat.subtitle && (
                    <p className="font-sans text-xs text-gray-400 leading-relaxed pt-1">
                      {cat.subtitle}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-luxury-border/20">
                <a 
                  href="#register" 
                  onClick={() => handleSelect(cat.id)}
                  className={`flex items-center justify-center text-center font-sans text-xs tracking-widest uppercase h-11 font-bold transition-all duration-300 rounded-full ${
                    cat.isPopular 
                      ? "gold-gradient-bg text-luxury-onyx hover:brightness-110 btn-shimmer" 
                      : "border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-onyx"
                  }`}
                >
                  Select & Apply
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
