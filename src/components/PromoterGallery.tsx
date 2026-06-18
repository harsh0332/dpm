"use client";

import React, { useState, useRef } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { siteData } from "@/content/site-data";

export default function PromoterGallery() {
  const shouldReduceMotion = useReducedMotion();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const images = siteData.founderCelebsImages;

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
    const index = Math.round(percentage * (images.length - 1));
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
  };

  return (
    <section className="py-10 md:py-24 border-b border-luxury-border max-w-5xl mx-auto px-6 overflow-hidden">
      
      {/* Title */}
      <div className="text-center mb-8">
        <span className="text-[10px] font-sans tracking-[0.25em] text-luxury-gold uppercase block font-semibold">
          Legacy & Influence
        </span>
        <h2 className="font-serif text-2xl md:text-3xl tracking-wide text-white font-light leading-snug">
          Promoter Credibility – <span className="crown-gradient-text font-bold">DPM Group Founder with Indian Celebrities</span>
        </h2>
        <p className="font-sans text-xs tracking-wider text-luxury-stone mt-2">
          DPM Founder Shivanshu Mishra with leading Bollywood icons, pageantry legends, and industry leaders
        </p>
        <div className="w-16 h-[1px] bg-luxury-gold/50 mx-auto mt-4" />
      </div>

      {/* Desktop Grid Layout */}
      <div className="hidden md:block">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 justify-center">
          {images.map((imgSrc, i) => (
            <motion.div
              key={imgSrc}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={itemVariants}
              className="border border-luxury-border/30 bg-luxury-darkcard p-1.5 rounded-2xl luxury-glow-hover transition-all duration-300"
            >
              <div className="relative aspect-[3/4] bg-luxury-onyx overflow-hidden group rounded-xl">
                <img
                  src={imgSrc}
                  alt={`Founder Shivanshu Mishra with Celebrity ${i + 1}`}
                  className="w-full h-full object-cover object-top filter grayscale-0 md:grayscale md:hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105 rounded-xl"
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </div>
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
          {images.map((imgSrc, i) => (
            <motion.div
              key={imgSrc}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={itemVariants}
              className="border border-luxury-border/30 bg-luxury-darkcard p-1.5 rounded-2xl w-[60vw] max-w-[240px] luxury-glow-hover transition-all duration-300 flex-shrink-0 snap-center"
            >
              <div className="relative aspect-[3/4] bg-luxury-onyx overflow-hidden group rounded-xl">
                <img
                  src={imgSrc}
                  alt={`Founder Shivanshu Mishra with Celebrity ${i + 1}`}
                  className="w-full h-full object-cover object-top rounded-xl"
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-1.5 mt-2">
          {images.map((_, i) => (
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
