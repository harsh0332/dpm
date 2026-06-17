"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { siteData } from "@/content/site-data";

export default function Hero() {
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
    setMounted(true);
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Animation variants
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const wordVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] as const,
      }
    }
  };

  const headlineWords = "The National Search for India's Next Pageant Titleholder".split(" ");

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex flex-col items-center justify-center px-6 overflow-hidden border-b border-luxury-border bg-luxury-onyx">
      
      {/* Drifting Gold Accent Glows */}
      <motion.div 
        className="absolute top-[-10%] left-[-10%] w-[350px] md:w-[500px] h-[350px] md:h-[500px] rounded-full bg-luxury-gold/6 blur-[100px] md:blur-[130px] pointer-events-none"
        animate={shouldReduceMotion ? {} : {
          x: [0, 40, -30, 0],
          y: [0, -30, 40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-[-10%] right-[-10%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-luxury-gold/5 blur-[100px] md:blur-[150px] pointer-events-none"
        animate={shouldReduceMotion ? {} : {
          x: [0, -40, 20, 0],
          y: [0, 40, -30, 0],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Static Luxury Gold-Vignette Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,162,75,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* Main Grid Container */}
      <div className="w-full max-w-6xl mx-auto z-10 relative">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center"
        >
          
          {/* LEFT COLUMN: TEXT CONTENT & ACTIONS */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-8 flex flex-col lg:items-start items-center">
            
            {/* Tag / Badge */}
            <motion.div variants={itemVariants} className="space-y-3">
              <span className="text-[9px] uppercase tracking-[0.3em] font-sans text-luxury-gold font-bold bg-luxury-gold/5 px-4 py-1.5 border border-luxury-gold/25 rounded-full inline-block">
                Official 2026 National Auditions
              </span>
              <p className="font-sans text-[11px] md:text-xs tracking-widest uppercase text-gray-300 font-semibold pt-1">
                {siteData.eventName}
              </p>
            </motion.div>

            {/* Title (Staggered Words Reveal) */}
            <motion.h1 
              variants={itemVariants}
              className="font-serif text-3xl md:text-5xl lg:text-[3.25rem] tracking-wide text-white leading-tight font-light max-w-2xl"
            >
              {headlineWords.map((word, index) => (
                <motion.span
                  key={index}
                  variants={wordVariants}
                  className="inline-block mr-2 md:mr-3"
                >
                  {word === "India's" || word === "Next" || word === "Titleholder" ? (
                    <span className="gold-gradient-text font-semibold">{word}</span>
                  ) : (
                    word
                  )}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subtext */}
            <motion.p 
              variants={itemVariants}
              className="font-sans text-xs md:text-sm text-gray-400 max-w-xl leading-relaxed lg:max-w-none"
            >
              Step onto the national stage. DPM Mr, Miss, Mrs, & Miss Teen India 2026 is India's most transparent and direct runway path. Submit your basic audition details in under 2 minutes, get groomed by Bollywood's top casting coaches, and claim your share of the ₹11 Lakhs prize pool.
            </motion.p>

            {/* Desktop Only: CTA + Trust Badge Stack */}
            <div className="hidden lg:flex flex-col items-start space-y-4 pt-2 w-full">
              <motion.div 
                variants={itemVariants}
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              >
                <a 
                  href="#register" 
                  className="inline-flex items-center justify-center font-sans text-xs tracking-widest uppercase gold-gradient-bg text-luxury-onyx px-10 h-12 font-bold shadow-lg rounded-full hover:brightness-110 transition-all duration-300 btn-shimmer"
                >
                  Apply for Auditions Now
                </a>
              </motion.div>

              {/* Trust Badges */}
              <motion.div 
                variants={itemVariants}
                className="flex items-center gap-x-4 text-[9px] font-sans uppercase tracking-wider text-gray-400 pt-2 border-t border-luxury-border/30 w-full"
              >
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-luxury-gold" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  Secure Payments
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-luxury-gold" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Verified Winners
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-luxury-gold" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  430+ Applied This Week
                </span>
              </motion.div>
            </div>
 
            {/* Stats Row */}
            <motion.div 
              variants={itemVariants}
              className="w-full max-w-lg lg:max-w-none grid grid-cols-2 sm:grid-cols-4 gap-4 py-4"
            >
              {[
                { value: siteData.config.careersLaunched, label: "Careers Launched" },
                { value: siteData.config.prizesPool, label: "Prizes Pool" },
                { value: siteData.config.categoriesCount, label: "Age Categories" },
                { value: siteData.config.groomingSupport, label: "Grooming Support" },
              ].map((stat, i) => (
                <div key={i} className="bg-luxury-darkcard/60 border border-luxury-gold/20 p-4 rounded-2xl text-center relative overflow-hidden luxury-glow-hover flex flex-col justify-center">
                  <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-luxury-gold/5 rounded-full blur-xl pointer-events-none" />
                  <strong className="font-serif text-2xl text-white font-medium block">{stat.value}</strong>
                  <p className="font-sans text-[9px] tracking-wider uppercase text-luxury-gold/80 mt-1 font-semibold">{stat.label}</p>
                </div>
              ))}
            </motion.div>
 
          </div>
 
          {/* RIGHT COLUMN: CELEBRITY TRUST CENTERPIECE */}
          <div className="lg:col-span-5 w-full flex flex-col justify-center items-center">
            <motion.div
              variants={itemVariants}
              className="w-full max-w-md aspect-[3/4] bg-luxury-darkcard border border-luxury-gold/30 rounded-[2.5rem] shadow-2xl relative overflow-hidden group luxury-glow-hover flex flex-col justify-end"
            >
              {/* Large Urvashi Portrait Background Image */}
              <img 
                src={siteData.celebrityPatron.image} 
                alt="Urvashi Rautela Chief Guest Portrait" 
                className="absolute inset-0 w-full h-full object-cover filter grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105 pointer-events-none"
              />
 
              {/* Luxury dark gradient overlay for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
 
              {/* VIP Mentor Badge */}
              <div className="absolute top-4 right-4 bg-luxury-gold text-luxury-onyx font-sans text-[9px] uppercase tracking-[0.2em] px-4 py-1.5 font-bold rounded-full shadow-lg z-10">
                VIP Patron & Chief Guest
              </div>
 
              {/* Interactive Info Card overlay (positioned at the bottom) */}
              <div className="relative z-10 p-5 md:p-6 space-y-4 text-left">
                
                {/* Celebrity Name & Seal */}
                <div className="space-y-0.5">
                  <span className="font-sans text-[8px] md:text-[9px] tracking-widest text-luxury-gold uppercase font-bold block">
                    Meet & Get Crowned By
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl text-white font-bold leading-tight drop-shadow-md">
                    {siteData.celebrityPatron.name}
                  </h3>
                  <p className="font-sans text-[9px] md:text-[10px] text-gray-300">
                    Miss Diva Universe & Pageant Mentor
                  </p>
                </div>
 
                {/* Countdown Grid Overlay */}
                {mounted && (
                  <div className="bg-black/65 border border-white/10 backdrop-blur-md p-3 rounded-2xl space-y-3">
                    <div className="flex justify-between items-center text-[8px] md:text-[9px] font-sans text-luxury-gold font-bold">
                      <span className="flex items-center gap-1.5">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                        </span>
                        AUDITIONS DEADLINE
                      </span>
                      <span className="text-white">{siteData.config.slotsRemaining} SLOTS REMAINING</span>
                    </div>
 
                    <div className="grid grid-cols-4 gap-1.5 text-center">
                      {[
                        { label: "Days", value: timeLeft.days },
                        { label: "Hours", value: timeLeft.hours },
                        { label: "Mins", value: timeLeft.minutes },
                        { label: "Secs", value: timeLeft.seconds },
                      ].map((item, i) => (
                        <div key={i} className="bg-black/40 border border-white/5 py-1.5 rounded-lg justify-center">
                          <span className="font-serif text-xs md:text-sm text-white font-bold block leading-none">
                            {String(item.value).padStart(2, "0")}
                          </span>
                          <span className="font-sans text-[7px] tracking-wider uppercase text-luxury-stone block mt-1 font-bold">
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
 
                    {/* Spots Remaining Indicator */}
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: `${(siteData.config.slotsRemaining / 150) * 100}%` }}
                        transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
                        className="h-full gold-gradient-bg"
                      />
                    </div>
                  </div>
                )}
 
                {/* Mobile Only: CTA Button inside the card to keep conversion high */}
                <div className="block lg:hidden w-full pt-1">
                  <motion.div 
                    whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  >
                    <a 
                      href="#register" 
                      className="w-full inline-flex items-center justify-center font-sans text-[10px] tracking-widest uppercase gold-gradient-bg text-luxury-onyx h-10 font-bold shadow-lg rounded-full hover:brightness-110 transition-all duration-300 btn-shimmer"
                    >
                      Apply for Auditions Now
                    </a>
                  </motion.div>
                  
                  {/* Mobile trust items */}
                  <div className="flex justify-center gap-3 text-[7px] font-sans uppercase tracking-wider text-gray-400 pt-2.5">
                    <span className="flex items-center gap-0.5">
                      <svg className="w-2.5 h-2.5 text-luxury-gold" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                      Secure Checkout
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5">
                      <svg className="w-2.5 h-2.5 text-luxury-gold" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      Winner Endorsed
                    </span>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>
      
    </section>
  );
}
