"use client";

import React from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { siteData } from "@/content/site-data";

export default function HowToApply() {
  const shouldReduceMotion = useReducedMotion();
  const { current, original, gstIncluded } = siteData.registrationFee;

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

  const steps = [
    {
      num: 1,
      title: "Paid Registration",
      description: "Secure your audition slot by completing the ₹999 registration fee online.",
      icon: "💳"
    },
    {
      num: 2,
      title: "Online Auditions (Zoom)",
      description: "Join the virtual audition room. Evaluated live by our 9-member expert panel.",
      icon: "📹"
    },
    {
      num: 3,
      title: "Photoshoot",
      description: "Participate in professional portfolio shoots and profile curation days.",
      icon: "📸"
    },
    {
      num: 4,
      title: "Interview",
      description: "Diction, personality, and communication evaluation round.",
      icon: "🗣️"
    },
    {
      num: 5,
      title: "Grand Finale",
      description: "Walk the national ramp, crowned directly by celebrity Urvashi Rautela.",
      icon: "👑"
    }
  ];

  return (
    <section className="py-12 md:py-16 my-12 bg-luxury-alabaster text-luxury-onyx rounded-[2rem] border border-luxury-border max-w-5xl mx-auto px-6 md:px-12 shadow-xl relative overflow-hidden">
      
      {/* Warm Gold Backdrop Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(201,162,75,0.03)_0%,transparent_50%)] pointer-events-none" />
      
      {/* Title */}
      <div className="text-center mb-10 relative z-10">
        <span className="text-[10px] font-sans tracking-[0.25em] text-luxury-gold-dark uppercase block font-semibold">
          The Process
        </span>
        <h2 className="font-serif text-2xl md:text-4xl tracking-wide text-luxury-onyx font-light mt-1">
          How to Apply
        </h2>
        <p className="font-sans text-xs tracking-wider text-luxury-stone mt-2">
          Your direct path from registration to the national spotlight
        </p>
        <div className="w-16 h-[1px] bg-luxury-gold/50 mx-auto mt-4" />
      </div>

      {/* 5 Numbered Circular Steps Grid */}
      <div className="grid sm:grid-cols-5 gap-6 max-w-5xl mx-auto items-start relative z-10">
        {steps.map((step, idx) => (
          <motion.div 
            key={step.num}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={revealVariants}
            className="flex flex-col items-center text-center space-y-4 relative"
          >
            {/* Number Circle with Icon inside */}
            <div className="w-16 h-16 rounded-full border-2 border-luxury-gold flex flex-col items-center justify-center bg-white relative shadow-md">
              <span className="text-xl">{step.icon}</span>
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-luxury-gold text-luxury-onyx font-sans text-[10px] font-bold flex items-center justify-center shadow">
                {step.num}
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-base text-luxury-onyx font-semibold">
                {step.title}
              </h3>
              <p className="font-sans text-xs text-luxury-stone leading-relaxed max-w-[150px] mx-auto">
                {step.description}
              </p>
            </div>

            {/* Connecting Chevron on Desktop (except last) */}
            {idx < 4 && (
              <span className="hidden sm:block absolute top-6 right-[-24px] text-luxury-gold-dark/60 text-sm font-bold">
                →
              </span>
            )}
          </motion.div>
        ))}
      </div>

      {/* What ₹999 Covers & Post-Payment Reassurance */}
      <div className="mt-12 max-w-3xl mx-auto bg-white border border-luxury-border p-6 md:p-8 space-y-6 relative z-10 luxury-glow-hover rounded-2xl shadow-sm">
        <div className="text-center">
          <span className="font-sans text-[10px] tracking-widest text-luxury-gold-dark uppercase font-bold block mb-1">
            Fee Breakdown
          </span>
          <h3 className="font-serif text-xl text-luxury-onyx font-light">
            What Your ₹{current} Registration Covers
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 font-sans text-xs text-luxury-onyx">
            <p>
              For only <strong className="text-base text-luxury-gold-dark">₹{current}</strong> (was <del className="text-luxury-stone">₹{original}</del>) {gstIncluded ? "inclusive of GST" : ""}:
            </p>
            <ul className="space-y-1.5 text-luxury-stone">
              <li className="flex items-center gap-1.5">
                <span className="text-luxury-gold font-bold">✓</span> Direct entry to Zoom virtual auditions round.
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-luxury-gold font-bold">✓</span> Live evaluation by our 9-member expert panel.
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-luxury-gold font-bold">✓</span> Digital Certificate of Participation.
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-luxury-gold font-bold">✓</span> Professional grooming session webinar access.
              </li>
            </ul>
          </div>

          {/* Reassurance Block */}
          <div className="p-4 border border-green-200 border-l-4 border-green-600 bg-green-50/50 rounded-xl space-y-1">
            <span className="font-sans text-[9px] tracking-widest uppercase text-green-800 font-bold block">
              Instant Reassurance
            </span>
            <p className="font-sans text-xs text-green-950 leading-normal">
              <strong>Confirmation Method:</strong> Within 24 hours of checkout, you will receive an automated schedule and candidate prep kit on your registered WhatsApp number.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Button */}
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
