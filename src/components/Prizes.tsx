"use client";

import React, { useState, useRef } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";

export default function Prizes() {
  const shouldReduceMotion = useReducedMotion();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
    const index = Math.round(percentage * (prizes.length - 1));
    setActiveIndex(index);
  };

  const prizes = [
    {
      title: "Cash Prize ₹11,00,000",
      description: "Massive cash prize pool distributed to category winners and runners-up (T&C apply).",
      icon: "💰"
    },
    {
      title: "1-Year In-House Contract",
      description: "Direct contracts for upcoming web series, short films, music videos, and commercial fashion walks.",
      icon: "📄"
    },
    {
      title: "International Platform",
      description: "Direct representation rights at top-tier global beauty pageants and runway weeks abroad.",
      icon: "🌐"
    },
    {
      title: "Brand Ambassadorship",
      description: "Signed national & international modeling contracts as official faces of brand partners.",
      icon: "👑"
    },
    {
      title: "Bollywood Access",
      description: "Direct entry, screening invitations, and official casting director introductions.",
      icon: "🎬"
    }
  ];

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
    <section className="relative py-10 md:py-24 border-b border-luxury-border max-w-5xl mx-auto px-6 overflow-hidden">
      
      {/* Deep Emerald Backdrop Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(6,78,59,0.15)_0%,transparent_60%)] pointer-events-none" />
      
      {/* Title */}
      <div className="text-center mb-12 relative z-10">
        <span className="text-[10px] font-sans tracking-[0.25em] text-luxury-gold uppercase block font-semibold">
          Rewards
        </span>
        <h2 className="font-serif text-2xl md:text-4xl tracking-wide text-white font-light">
          Prizes Worth ₹11L+ — and a <span className="crown-gradient-text font-bold">Direct Ticket to Bollywood</span>
        </h2>
        <p className="font-sans text-xs tracking-wider text-luxury-stone mt-2">
          Quantified career opportunities for DPM finalists
        </p>
        <div className="w-16 h-[1px] bg-luxury-gold/50 mx-auto mt-4" />
      </div>

      {/* Grid of 5 Prizes Cards - Desktop only */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto relative z-10">
        {prizes.map((prize, i) => {
          const isTopPrize = prize.title.toLowerCase().includes("cash");
          return (
            <motion.div 
              key={i} 
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
              className={`p-6 border flex flex-col justify-between space-y-4 transition-all duration-300 emerald-glow-hover rounded-2xl ${
                isTopPrize 
                  ? "border-emerald-500 bg-[#101b15]/95 sm:col-span-2 lg:col-span-1 shadow-[0_15px_30px_rgba(5,150,105,0.08)] border-2" 
                  : "border-luxury-border/30 bg-luxury-darkcard/80 backdrop-blur-sm"
              }`}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-2xl">{prize.icon}</span>
                  <span className="font-serif text-luxury-gold text-sm italic">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-serif text-lg text-white font-semibold">
                  {prize.title}
                </h3>
                <p className="font-sans text-xs text-gray-400 leading-relaxed">
                  {prize.description}
                </p>
              </div>
              
              {isTopPrize && (
                <div className="pt-2 border-t border-emerald-900/30">
                  <span className="text-[9px] font-sans tracking-wider text-emerald-400 font-semibold italic block">
                    * Terms & Conditions Apply
                  </span>
                </div>
              )}
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
          {prizes.map((prize, i) => {
            const isTopPrize = prize.title.toLowerCase().includes("cash");
            return (
              <motion.div 
                key={i} 
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={cardVariants}
                className={`p-6 border flex flex-col justify-between space-y-4 transition-all duration-300 w-[85vw] max-w-[320px] flex-shrink-0 snap-center rounded-2xl ${
                  isTopPrize 
                    ? "border-emerald-500 bg-[#101b15]/95 shadow-[0_15px_30px_rgba(5,150,105,0.08)] border-2" 
                    : "border-luxury-border/30 bg-luxury-darkcard/80 backdrop-blur-sm"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl">{prize.icon}</span>
                    <span className="font-serif text-luxury-gold text-sm italic">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg text-white font-semibold">
                    {prize.title}
                  </h3>
                  <p className="font-sans text-xs text-gray-400 leading-relaxed">
                    {prize.description}
                  </p>
                </div>
                
                {isTopPrize && (
                  <div className="pt-2 border-t border-emerald-900/30">
                    <span className="text-[9px] font-sans tracking-wider text-emerald-400 font-semibold italic block">
                      * Terms & Conditions Apply
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-1.5 mt-2">
          {prizes.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex 
                  ? "w-4 bg-emerald-500" 
                  : "w-1.5 bg-emerald-500/30"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-12 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
          }}
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
