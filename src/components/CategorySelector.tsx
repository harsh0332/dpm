"use client";

import React, { useState, useRef } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { siteData } from "@/content/site-data";

export default function CategorySelector() {
  const shouldReduceMotion = useReducedMotion();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (categoryId: string) => {
    // Dispatch custom event to let FinalCTA know which category was selected
    const event = new CustomEvent("select-category", { detail: categoryId });
    window.dispatchEvent(event);
  };

  const scrollToCard = (index: number) => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const card = container.children[index] as HTMLElement;
      if (card) {
        container.scrollTo({
          left: card.offsetLeft - (container.clientWidth - card.clientWidth) / 2,
          behavior: "smooth"
        });
        setActiveIndex(index);
      }
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth - container.clientWidth;
    if (scrollWidth <= 0) return;
    const percentage = scrollLeft / scrollWidth;
    const index = Math.round(percentage * (siteData.categories.length - 1));
    setActiveIndex(index);
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

  const categoryAccents: Record<string, {
    glowClass: string;
    textColor: string;
    borderClass: string;
    btnClass: string;
  }> = {
    "mr-india": {
      glowClass: "sapphire-glow-hover",
      textColor: "text-blue-400",
      borderClass: "border-blue-500/25",
      btnClass: "border border-blue-500/40 text-blue-400 hover:bg-blue-500 hover:text-white"
    },
    "miss-india": {
      glowClass: "rose-glow-hover",
      textColor: "text-rose-400",
      borderClass: "border-rose-500/25",
      btnClass: "border border-rose-500/40 text-rose-400 hover:bg-rose-500/80 hover:text-white"
    },
    "miss-teen-india": {
      glowClass: "emerald-glow-hover",
      textColor: "text-emerald-400",
      borderClass: "border-emerald-500/25",
      btnClass: "border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500 hover:text-white"
    },
    "mrs-india": {
      glowClass: "luxury-glow-hover",
      textColor: "text-luxury-gold",
      borderClass: "border-luxury-gold/25",
      btnClass: "border border-luxury-gold/40 text-luxury-gold hover:bg-luxury-gold hover:text-luxury-onyx"
    }
  };

  return (
    <section className="relative py-10 md:py-24 border-b border-luxury-border max-w-5xl mx-auto px-6 overflow-hidden">
      
      {/* Rose-Magenta Backdrop Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_60%,rgba(136,13,60,0.08)_0%,transparent_55%)] pointer-events-none" />
      
      {/* Title */}
      <div className="text-center mb-12 relative z-10">
        <span className="text-[10px] font-sans tracking-[0.25em] text-luxury-gold uppercase block font-semibold">
          Entry Categories
        </span>
        <h2 className="font-serif text-2xl md:text-4xl tracking-wide text-white font-light">
          Find Your <span className="crown-gradient-text font-bold">Crown</span>
        </h2>
        <p className="font-sans text-xs tracking-wider text-luxury-stone mt-2 uppercase">
          Review age ranges & requirements. Click Select to auto-fill registration below.
        </p>
        <div className="w-16 h-[1px] bg-luxury-gold/50 mx-auto mt-4" />
      </div>

      {/* Grid of Categories - Desktop only */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {siteData.categories.map((cat, index) => {
          const accent = categoryAccents[cat.id] || categoryAccents["miss-india"];
          return (
            <motion.div 
              key={cat.id} 
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
              className={`p-4 border flex flex-col justify-between relative bg-luxury-darkcard/80 backdrop-blur-sm transition-all duration-300 rounded-2xl ${accent.glowClass} ${accent.borderClass}`}
            >

              <div className="space-y-3">
                {/* Real Photo Slot */}
                <div className="aspect-[4/3] bg-luxury-onyx border border-luxury-border/30 flex items-center justify-center relative overflow-hidden rounded-xl">
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
                    <span className={`font-sans text-sm font-bold ${accent.textColor}`}>
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

              <div className="mt-4 pt-3 border-t border-luxury-border/20">
                <a 
                  href="#register" 
                  onClick={() => handleSelect(cat.id)}
                  className={`flex items-center justify-center text-center font-sans text-xs tracking-widest uppercase h-11 font-bold transition-all duration-300 rounded-full ${accent.btnClass}`}
                >
                  Select & Apply
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile Swipeable Carousel - Mobile only */}
      <div className="md:hidden relative z-10">
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="relative flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 pb-6 px-6 -mx-6"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch"
          }}
        >
          {siteData.categories.map((cat, index) => {
            const accent = categoryAccents[cat.id] || categoryAccents["miss-india"];
            return (
              <motion.div 
                key={cat.id} 
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={cardVariants}
                className={`p-4 border flex flex-col justify-between relative bg-luxury-darkcard/80 backdrop-blur-sm transition-all duration-300 w-[85vw] max-w-[300px] flex-shrink-0 snap-center rounded-2xl ${accent.glowClass} ${accent.borderClass}`}
              >

                <div className="space-y-3">
                  {/* Real Photo Slot */}
                  <div className="aspect-[4/3] bg-luxury-onyx border border-luxury-border/30 flex items-center justify-center relative overflow-hidden rounded-xl">
                    <img 
                      src={cat.image} 
                      alt={`${cat.name} Category Cover`} 
                      className="w-full h-full object-cover rounded-lg"
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
                      <span className={`font-sans text-sm font-bold ${accent.textColor}`}>
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

                <div className="mt-4 pt-3 border-t border-luxury-border/20">
                  <a 
                    href="#register" 
                    onClick={() => handleSelect(cat.id)}
                    className={`flex items-center justify-center text-center font-sans text-xs tracking-widest uppercase h-11 font-bold transition-all duration-300 rounded-full ${accent.btnClass}`}
                  >
                    Select & Apply
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-1.5 mt-2">
          {siteData.categories.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex 
                  ? "w-4 bg-luxury-gold" 
                  : "w-1.5 bg-luxury-gold/30"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
