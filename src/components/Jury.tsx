"use client";
 
import React, { useState, useRef } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { siteData } from "@/content/site-data";
 
export default function Jury() {
  const shouldReduceMotion = useReducedMotion();
  const [expandedMembers, setExpandedMembers] = useState<Record<number, boolean>>({});
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
 
  const toggleExpand = (index: number) => {
    setExpandedMembers((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
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
    const index = Math.round(percentage * (siteData.jury.length - 1));
    setActiveIndex(index);
  };
 
  const cardVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
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
    <section className="relative py-10 md:py-24 border-b border-luxury-border max-w-6xl mx-auto px-6 overflow-hidden">
      
      {/* Royal Sapphire Backdrop Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(15,58,95,0.12)_0%,transparent_60%)] pointer-events-none" />
      
      {/* Title */}
      <div className="text-center mb-12 relative z-10">
        <span className="text-[10px] font-sans tracking-[0.25em] text-luxury-gold uppercase block font-semibold">
          Selection Committee
        </span>
        <h2 className="font-serif text-2xl md:text-4xl tracking-wide text-white font-light">
          Meet Our <span className="crown-gradient-text font-bold">Esteemed Jury</span>
        </h2>
        <p className="font-sans text-xs tracking-wider text-luxury-stone mt-2">
          Verifiable Industry Experts & Pageant Mentors
        </p>
        <div className="w-16 h-[1px] bg-luxury-gold/50 mx-auto mt-4" />
      </div>
 
      {/* Grid of Jury Cards - Desktop only */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {siteData.jury.map((member, index) => (
          <motion.div 
            key={index} 
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
            whileHover={shouldReduceMotion ? {} : { y: -4 }}
            className="bg-luxury-darkcard/80 backdrop-blur-sm border border-luxury-border/30 p-4 flex items-start gap-4 transition-all duration-300 relative sapphire-glow-hover rounded-2xl"
          >
            {/* Circular Portrait Image */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-jewel-sapphire/50 overflow-hidden relative flex-shrink-0 bg-luxury-onyx shadow-lg">
              <img 
                src={member.image} 
                alt={`Jury Member ${member.name}`} 
                className="w-full h-full object-cover filter grayscale-0 md:grayscale md:hover:grayscale-0 transition-all duration-500"
                loading="lazy"
              />
            </div>
 
            {/* Details Column */}
            <div className="flex-grow min-w-0 space-y-2 text-left">
              <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                <h3 className="font-serif text-base text-white font-semibold truncate">
                  {member.name}
                </h3>
                {member.followers && (
                  <span className="bg-jewel-sapphire/20 text-[#60A5FA] border border-jewel-sapphire/40 font-sans text-[8px] uppercase tracking-widest px-2 py-0.5 font-bold rounded">
                    {member.followers}
                  </span>
                )}
              </div>
 
              <span className="font-sans text-[10px] tracking-wider text-luxury-gold uppercase font-bold block">
                {member.role}
              </span>
 
              {member.bio && (
                <div>
                  <p className={`font-sans text-xs text-gray-400 leading-relaxed ${expandedMembers[index] ? "" : "line-clamp-2"}`}>
                    {member.bio}
                  </p>
                  <button 
                    onClick={() => toggleExpand(index)}
                    className="text-luxury-gold hover:text-white text-[9px] uppercase tracking-wider font-bold mt-1 inline-block focus:outline-none cursor-pointer"
                  >
                    {expandedMembers[index] ? "Read Less" : "Read More"}
                  </button>
                </div>
              )}
 
              {/* Instagram Verification Handle */}
              {member.instagram && (
                <div className="pt-2 border-t border-luxury-border/10">
                  <a 
                    href={`https://instagram.com/${member.instagram.replace('@', '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-sans text-[9px] tracking-wider text-luxury-gold hover:text-white transition-colors duration-300 italic font-bold flex items-center gap-1"
                  >
                    <svg className="w-3 h-3 inline text-[#60A5FA]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051c-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    Verify: {member.instagram}
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        ))}
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
          {siteData.jury.map((member, index) => (
            <motion.div 
              key={index} 
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              className="w-[85vw] max-w-[340px] flex-shrink-0 snap-center bg-luxury-darkcard/80 backdrop-blur-sm border border-luxury-border/30 p-4 flex items-start gap-4 relative rounded-2xl select-none"
            >
              {/* Circular Portrait Image */}
              <div className="w-16 h-16 rounded-full border-2 border-jewel-sapphire/50 overflow-hidden relative flex-shrink-0 bg-luxury-onyx shadow-lg">
                <img 
                  src={member.image} 
                  alt={`Jury Member ${member.name}`} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
 
              {/* Details Column */}
              <div className="flex-grow min-w-0 space-y-2 text-left">
                <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                  <h3 className="font-serif text-base text-white font-semibold truncate">
                    {member.name}
                  </h3>
                  {member.followers && (
                    <span className="bg-jewel-sapphire/20 text-[#60A5FA] border border-jewel-sapphire/40 font-sans text-[8px] uppercase tracking-widest px-2 py-0.5 font-bold rounded">
                      {member.followers}
                    </span>
                  )}
                </div>
 
                <span className="font-sans text-[10px] tracking-wider text-luxury-gold uppercase font-bold block">
                  {member.role}
                </span>
 
                {member.bio && (
                  <div>
                    <p className={`font-sans text-xs text-gray-400 leading-relaxed ${expandedMembers[index] ? "" : "line-clamp-2"}`}>
                      {member.bio}
                    </p>
                    <button 
                      onClick={() => toggleExpand(index)}
                      className="text-luxury-gold hover:text-white text-[9px] uppercase tracking-wider font-bold mt-1 inline-block focus:outline-none cursor-pointer"
                    >
                      {expandedMembers[index] ? "Read Less" : "Read More"}
                    </button>
                  </div>
                )}
 
                {/* Instagram Verification Handle */}
                {member.instagram && (
                  <div className="pt-2 border-t border-luxury-border/10">
                    <a 
                      href={`https://instagram.com/${member.instagram.replace('@', '')}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-sans text-[9px] tracking-wider text-luxury-gold hover:text-white transition-colors duration-300 italic font-bold flex items-center gap-1"
                    >
                      <svg className="w-3 h-3 inline text-[#60A5FA]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051c-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                      Verify: {member.instagram}
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
 
        {/* Pagination Dots and Arrows */}
        <div className="flex items-center justify-center gap-4 mt-2">
          <button
            onClick={() => scrollToCard(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="w-8 h-8 rounded-full border border-luxury-gold/20 flex items-center justify-center text-luxury-gold disabled:opacity-30 disabled:pointer-events-none active:bg-luxury-gold/20 transition-colors"
            aria-label="Previous slide"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
 
          <div className="flex gap-1.5">
            {siteData.jury.map((_, i) => (
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
 
          <button
            onClick={() => scrollToCard(activeIndex + 1)}
            disabled={activeIndex === siteData.jury.length - 1}
            className="w-8 h-8 rounded-full border border-luxury-gold/20 flex items-center justify-center text-luxury-gold disabled:opacity-30 disabled:pointer-events-none active:bg-luxury-gold/20 transition-colors"
            aria-label="Next slide"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
 
      <div className="text-center mt-12 relative z-10">
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
