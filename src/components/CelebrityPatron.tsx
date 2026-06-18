"use client";

import React from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { siteData } from "@/content/site-data";

export default function CelebrityPatron() {
  const shouldReduceMotion = useReducedMotion();
  const patron = siteData.celebrityPatron;

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

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };


  return (
    <section className="relative py-10 md:py-24 border-b border-luxury-border max-w-5xl mx-auto px-6 overflow-hidden">
      
      {/* Deep Rose-Magenta Backdrop Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(136,13,60,0.1)_0%,transparent_60%)] pointer-events-none" />
      
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="flex flex-col items-center text-center bg-luxury-darkcard/80 backdrop-blur-sm border border-luxury-border/30 p-8 md:p-12 relative z-10 rose-glow-hover rounded-[2rem] max-w-3xl mx-auto"
      >
        
        {/* Left Column: Premium Portrait Image (Now Top Centered) */}
        <motion.div 
          variants={revealVariants}
          className="relative flex items-center justify-center w-full mb-8"
        >
          <div className="border border-luxury-gold/30 p-2 bg-luxury-onyx/50 w-full max-w-xs md:max-w-sm rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-luxury-gold/70 shadow-lg">
            <img 
              src={patron.image} 
              alt="Urvashi Rautela Chief Guest Portrait" 
              className="w-full h-auto object-contain filter grayscale-0 md:grayscale md:hover:grayscale-0 transition-all duration-500 rounded-[1.75rem]"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Celebrity Guest Label / Title (Moved directly below image) */}
        <motion.div variants={revealVariants} className="mb-6 space-y-2">
          <span className="text-[10px] font-sans tracking-[0.25em] text-[#C9A24B] uppercase block font-semibold">
            Celebrity Guest
          </span>
          <h2 className="font-serif text-2xl md:text-4xl tracking-wide text-white font-light">
            Meet Our Celebrity Patron
          </h2>
          <div className="w-16 h-[1px] bg-luxury-gold/50 mx-auto mt-3" />
        </motion.div>

        {/* Right Column: Title, Credentials, Pull-Quote, CTA (Now stacked below title block) */}
        <div className="space-y-6 max-w-xl mx-auto flex flex-col items-center">
          <motion.span 
            variants={revealVariants}
            className="font-sans text-[10px] tracking-widest text-[#BE185D] uppercase font-bold block"
          >
            Femina Miss India Universe
          </motion.span>
          <motion.h3 
            variants={revealVariants}
            className="font-serif text-2xl md:text-3xl text-white font-light leading-tight"
          >
            Get Crowned by Miss Universe Urvashi Rautela
          </motion.h3>
          <motion.p 
            variants={revealVariants}
            className="font-serif italic text-base text-luxury-gold"
          >
            {patron.title}
          </motion.p>
          
          {/* Rose-Magenta Credentials List */}
          <motion.div 
            variants={revealVariants}
            className="flex flex-wrap justify-center gap-2 pt-2"
          >
            {patron.credentials.map((cred, i) => (
              <span 
                key={i} 
                className="bg-jewel-rose/20 text-[#F472B6] border border-jewel-rose/40 font-sans text-[9px] uppercase tracking-wider px-3 py-1 font-bold rounded"
              >
                ★ {cred}
              </span>
            ))}
          </motion.div>

          {/* Pull-Quote Block */}
          <motion.div 
            variants={revealVariants}
            className="p-5 border-l-2 border-luxury-gold bg-luxury-onyx/80 italic text-gray-300 font-serif text-sm leading-relaxed rounded-r-2xl text-left w-full"
          >
            &ldquo;DPM Pageant is India&apos;s most credible, transparent, and direct runway launchpad for regional modeling talent.&rdquo;
          </motion.div>
          
          <motion.p 
            variants={revealVariants}
            className="font-sans text-xs md:text-sm text-gray-400 leading-relaxed"
          >
            Urvashi Rautela will lead the grand mentoring sessions, evaluate the finalists, and crown the national winners at the Grand Finale on September 27th.
          </motion.p>
        </div>

      </motion.div>

      {/* CTA Button */}
      <div className="text-center mt-12 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
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
