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
    <section className="relative min-h-screen pt-28 pb-16 flex flex-col items-center justify-center px-6 overflow-hidden border-b border-luxury-border bg-base-night">
      
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
                    <span className="crown-gradient-text font-semibold">{word}</span>
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
              Step onto the national stage. DPM Mr, Miss, Mrs, &amp; Miss Teen India 2026 is India&apos;s most transparent and direct runway path. Submit your basic audition details in under 2 minutes, get groomed by Bollywood&apos;s top casting coaches, and claim your share of the ₹11 Lakhs prize pool.
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

              {/* Trust Badges (Zero Emojis, Gold SVGs) */}
              <motion.div 
                variants={itemVariants}
                className="flex items-center gap-x-4 text-[9px] font-sans uppercase tracking-wider text-gray-400 pt-2 border-t border-luxury-border/30 w-full"
              >
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-luxury-gold" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Secure Payments
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-luxury-gold" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
                  </svg>
                  Verified Winners
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-luxury-gold" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 005.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  430+ Applied This Week
                </span>
              </motion.div>
            </div>
 
            {/* Stats Row with Jewel Dividers & Correct Hierarchy */}
            <motion.div 
              variants={itemVariants}
              className="w-full max-w-lg lg:max-w-none grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-t border-b border-luxury-border/30 my-4"
            >
              {[
                { value: siteData.config.careersLaunched, label: "Careers Launched" },
                { value: siteData.config.prizesPool, label: "Prizes Pool" },
                { value: siteData.config.categoriesCount, label: "Age Categories" },
                { value: siteData.config.groomingSupport, label: "Grooming Support" },
              ].map((stat, i) => (
                <div 
                  key={i} 
                  className={`flex flex-col items-center sm:items-start text-center sm:text-left relative ${
                    i > 0 ? "sm:pl-6 sm:border-l sm:border-jewel-sapphire/30" : ""
                  } ${
                    i % 2 !== 0 ? "border-l border-jewel-rose/20 sm:border-none pl-4 sm:pl-0" : ""
                  }`}
                >
                  <strong className="font-serif text-2xl md:text-3xl text-white font-medium tracking-tight">
                    {stat.value}
                  </strong>
                  <span className="font-sans text-[8px] md:text-[9px] tracking-[0.15em] uppercase text-luxury-gold font-bold mt-1.5 block">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>

          </div>
 
          {/* RIGHT COLUMN: CELEBRITY TRUST CENTERPIECE */}
          <div className="lg:col-span-5 w-full flex flex-col justify-center items-center relative">
            {/* Ambient Sapphire & Rose glows (Low Opacity) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] pointer-events-none z-0">
              <div className="absolute top-1/4 left-1/4 w-[60%] h-[60%] rounded-full bg-jewel-sapphire/8 blur-[80px] md:blur-[100px]" />
              <div className="absolute bottom-1/4 right-1/4 w-[60%] h-[60%] rounded-full bg-jewel-rose/8 blur-[80px] md:blur-[100px]" />
            </div>

            <motion.div
              variants={itemVariants}
              className="w-full max-w-md aspect-[3/4] bg-luxury-darkcard border border-luxury-gold/30 rounded-[2.5rem] shadow-2xl relative overflow-hidden group luxury-glow-hover flex flex-col justify-end z-10"
            >
              {/* Inner Gold Frame Border */}
              <div className="absolute inset-4 border border-luxury-gold/15 rounded-[2rem] pointer-events-none z-20" />

              {/* Large Urvashi Portrait Background Image */}
              <img 
                src={siteData.celebrityPatron.image} 
                alt="Urvashi Rautela Chief Guest Portrait" 
                className="absolute inset-0 w-full h-full object-cover filter grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105 pointer-events-none"
              />
 
              {/* Luxury dark gradient overlay for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none z-10" />
 
              {/* VIP Mentor Badge */}
              <div className="absolute top-6 right-6 bg-[#15101E]/95 border border-luxury-gold/45 text-luxury-gold font-sans text-[8px] md:text-[9px] uppercase tracking-[0.2em] px-4 py-2 font-extrabold rounded-full shadow-2xl z-20 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>{siteData.celebrityPatron.title}</span>
              </div>
 
              {/* Interactive Info Card overlay (positioned at the bottom) */}
              <div className="relative z-20 p-6 md:p-8 space-y-4 text-left">
                
                {/* Celebrity Name & Seal */}
                <div className="space-y-1.5">
                  <span className="font-sans text-[8px] md:text-[9px] tracking-widest text-luxury-gold uppercase font-bold block">
                    Meet & Get Crowned By
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl text-white font-bold leading-tight drop-shadow-md">
                    {siteData.celebrityPatron.name}
                  </h3>
                  <p className="font-sans text-[9px] md:text-[10px] text-gray-300">
                    Miss Diva Universe & Pageant Mentor
                  </p>

                  {/* Verified credentials rendered as small pill chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1.5">
                    {siteData.celebrityPatron.credentials.map((cred, idx) => (
                      <span 
                        key={idx} 
                        className="font-sans text-[8px] md:text-[9px] uppercase tracking-[0.08em] bg-[#15101E]/85 text-luxury-gold-light border border-luxury-gold/30 px-2.5 py-0.5 rounded-full font-bold shadow-[0_2px_8px_rgba(20,20,20,0.3)]"
                      >
                        {cred}
                      </span>
                    ))}
                  </div>
                </div>
 
                {/* Countdown Grid Overlay */}
                {mounted && (
                  <div className="bg-[#15101E]/85 border border-luxury-border/60 backdrop-blur-md p-3.5 rounded-2xl space-y-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                    <div className="flex justify-between items-center text-[8px] md:text-[9px] font-sans text-luxury-gold font-extrabold tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                        </span>
                        AUDITIONS DEADLINE
                      </span>
                      <span className="text-white">{siteData.config.slotsRemaining} SLOTS REMAINING</span>
                    </div>
 
                    <div className="grid grid-cols-4 gap-2 text-center">
                      {[
                        { label: "Days", value: timeLeft.days },
                        { label: "Hours", value: timeLeft.hours },
                        { label: "Mins", value: timeLeft.minutes },
                        { label: "Secs", value: timeLeft.seconds },
                      ].map((item, i) => (
                        <div key={i} className="bg-[#1E182A]/80 border border-luxury-border/30 py-2 rounded-xl flex flex-col items-center justify-center">
                          <span className="font-serif text-sm md:text-base text-white font-bold block leading-none">
                            {String(item.value).padStart(2, "0")}
                          </span>
                          <span className="font-sans text-[7px] tracking-widest uppercase text-luxury-stone block mt-1 font-bold">
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
 
                    {/* Spots Remaining Indicator (Jewel-tinted progress bar) */}
                    <div className="w-full h-1.5 bg-[#1E182A] border border-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: `${(siteData.config.slotsRemaining / 150) * 100}%` }}
                        transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
                        className="h-full rose-gradient-bg"
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
                    <span className="flex items-center gap-1">
                      <svg className="w-2.5 h-2.5 text-luxury-gold" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Secure Checkout
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <svg className="w-2.5 h-2.5 text-luxury-gold" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
                      </svg>
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
