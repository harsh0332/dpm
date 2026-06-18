"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion, Variants } from "framer-motion";
import { siteData } from "@/content/site-data";

export default function PastEventGallery() {
  const [filter, setFilter] = useState<"all" | "ramp" | "glamour">("all");
  const shouldReduceMotion = useReducedMotion();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredImages = siteData.galleryImages.filter((img) =>
    filter === "all" ? true : img.category === filter
  );

  const handleFilterChange = (newFilter: "all" | "ramp" | "glamour") => {
    setFilter(newFilter);
    setActiveIndex(0);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
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
    const index = Math.round(percentage * (filteredImages.length - 1));
    setActiveIndex(index);
  };

  const itemVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
    exit: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  };

  return (
    <section className="py-10 md:py-24 border-b border-luxury-border max-w-5xl mx-auto px-6 overflow-hidden">
      
      {/* Title */}
      <div className="text-center mb-8">
        <span className="text-[10px] font-sans tracking-[0.25em] text-luxury-gold uppercase block font-semibold">
          Official Legacy
        </span>
        <h2 className="font-serif text-2xl md:text-4xl tracking-wide text-white font-light">
          Past Event <span className="crown-gradient-text font-bold">Gallery</span>
        </h2>
        <p className="font-sans text-xs tracking-wider text-luxury-stone mt-2">
          Verifiable highlights and crowning moments from previous seasons
        </p>
        <div className="w-16 h-[1px] bg-luxury-gold/50 mx-auto mt-4" />
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-3 mb-10">
        {[
          { id: "all", label: "All" },
          { id: "ramp", label: "Ramp Walk" },
          { id: "glamour", label: "Glamour Walk" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleFilterChange(tab.id as "all" | "ramp" | "glamour")}
            className={`font-sans text-[10px] tracking-widest uppercase px-6 h-10 border transition-all duration-300 rounded-full cursor-pointer ${
              filter === tab.id
                ? "gold-gradient-bg text-luxury-onyx border-transparent font-bold shadow-md"
                : "border-luxury-border/40 text-gray-400 hover:text-white hover:border-luxury-gold"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid (with smooth Framer Motion layout changes) - Desktop only */}
      <div className="hidden md:block">
        <motion.div 
          layout={!shouldReduceMotion}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, i) => (
              <motion.div
                layout={!shouldReduceMotion}
                key={img.src}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={itemVariants}
                className={`border border-luxury-border/30 p-1.5 bg-luxury-darkcard rounded-2xl transition-all duration-300 ${
                  img.category === "ramp" ? "sapphire-glow-hover" : "rose-glow-hover"
                }`}
              >
                <div className="relative aspect-[3/2] bg-luxury-onyx overflow-hidden group rounded-xl">
                  <img
                    src={img.src}
                    alt={`DPM Past Event Highlights ${i + 1}`}
                    className="w-full h-full object-cover filter grayscale-0 md:grayscale md:hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105 rounded-xl"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-onyx/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 pointer-events-none">
                    <span className="font-sans text-[9px] tracking-wider uppercase text-luxury-gold font-semibold">
                      {img.category === "ramp" ? "Ramp Walk" : "Glamour Walk"}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
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
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, i) => (
              <motion.div
                key={img.src}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={itemVariants}
                className={`border border-luxury-border/30 p-1.5 bg-luxury-darkcard rounded-2xl transition-all duration-300 w-[60vw] max-w-[240px] flex-shrink-0 snap-center ${
                  img.category === "ramp" ? "sapphire-glow-hover" : "rose-glow-hover"
                }`}
              >
                <div className="relative aspect-[3/2] bg-luxury-onyx overflow-hidden group rounded-xl">
                  <img
                    src={img.src}
                    alt={`DPM Past Event Highlights ${i + 1}`}
                    className="w-full h-full object-cover rounded-xl"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-onyx/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 pointer-events-none">
                    <span className="font-sans text-[9px] tracking-wider uppercase text-luxury-gold font-semibold">
                      {img.category === "ramp" ? "Ramp Walk" : "Glamour Walk"}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-1.5 mt-2">
          {filteredImages.map((_, i) => (
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

      <div className="text-center mt-12">
        <motion.div
          whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
        >
          <a
            href="#register"
            className="inline-flex items-center justify-center font-sans text-xs tracking-widest uppercase gold-gradient-bg text-luxury-onyx px-8 h-12 font-bold shadow-lg rounded-full hover:brightness-110 transition-all duration-300 btn-shimmer"
          >
            Apply for Auditions
          </a>
        </motion.div>
      </div>

    </section>
  );
}
