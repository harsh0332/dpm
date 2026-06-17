"use client";

import React from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";

export default function Opportunity() {
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

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const features = [
    {
      title: "No Modelling Experience Required",
      description: "We welcome fresh talent from all states and backgrounds. Prior ramp walk training or professional portfolios are not required to apply."
    },
    {
      title: "Grooming Support Provided",
      description: "Get trained directly by India's leading choreographers, personality coaches, fitness mentors, and communication experts."
    },
    {
      title: "Guaranteed Portfolio & Exposure",
      description: "Secure high-fidelity portfolio shoots and digital media features to launch your acting and modeling career nationally."
    }
  ];

  return (
    <section className="py-12 md:py-16 my-12 bg-luxury-alabaster text-luxury-onyx rounded-[2rem] border border-luxury-border max-w-5xl mx-auto px-6 md:px-12 shadow-xl relative overflow-hidden">
      
      {/* Warm Gold Backdrop Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(201,162,75,0.03)_0%,transparent_60%)] pointer-events-none" />
      
      {/* Title */}
      <div className="text-center mb-10 relative z-10">
        <span className="text-[10px] font-sans tracking-[0.25em] text-luxury-gold-dark uppercase block font-semibold">
          The Launchpad
        </span>
        <h2 className="font-serif text-2xl md:text-4xl tracking-wide text-luxury-onyx font-light mt-1">
          The DPM <span className="crown-gradient-text font-bold">Opportunity</span>
        </h2>
        <p className="font-sans text-xs tracking-wider text-luxury-stone mt-2">
          Dismantling barriers for India&apos;s regional talent
        </p>
        <div className="w-16 h-[1px] bg-luxury-gold/50 mx-auto mt-4" />
      </div>

      {/* 3 Premium Feature Cards Grid */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="grid sm:grid-cols-3 gap-6 relative z-10"
      >
        {features.map((feat, i) => (
          <motion.div 
            key={i}
            variants={revealVariants}
            whileHover={shouldReduceMotion ? {} : { y: -4 }}
            className="p-6 border border-luxury-border bg-white rounded-2xl flex flex-col justify-between space-y-4 transition-all duration-300 luxury-glow-hover shadow-sm"
          >
            <div className="space-y-3">
              <span className="font-serif text-luxury-gold text-lg italic block">
                0{i + 1}
              </span>
              <h3 className="font-serif text-lg text-luxury-onyx font-medium">
                {feat.title}
              </h3>
              <p className="font-sans text-xs text-luxury-stone leading-relaxed">
                {feat.description}
              </p>
            </div>
            <div className="pt-2 border-t border-luxury-border/30 text-left flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-luxury-gold" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span className="text-[9px] font-sans tracking-widest text-luxury-gold-dark uppercase font-bold">
                Verified Inclusion
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom CTA Button */}
      <div className="text-center mt-10 relative z-10">
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
