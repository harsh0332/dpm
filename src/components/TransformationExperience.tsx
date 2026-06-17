"use client";

import React from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";

export default function TransformationExperience() {
  const shouldReduceMotion = useReducedMotion();

  const experiences = [
    {
      title: "Grand Stage Experience",
      description: "Walk the national ramp under professional lights, production, and massive media coverage. Experience what it truly feels like to be in the spotlight.",
      icon: "👑"
    },
    {
      title: "1-on-1 Training",
      description: "Receive personalized coaching in posture, diction, ramp walk, styling, and public speaking directly from verified industry titleholders.",
      icon: "✨"
    },
    {
      title: "Career Exposure",
      description: "Secure direct casting calls, professional portfolio shoots, and modeling contract introductions to top fashion labels and production houses.",
      icon: "💼"
    },
    {
      title: "Industry Networking",
      description: "Interact directly with leading film directors, producers, active runway models, and brand partners throughout the mentoring program.",
      icon: "🤝"
    }
  ];

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
    <section className="py-8 md:py-16 my-6 md:my-12 bg-luxury-alabaster text-luxury-onyx rounded-[2rem] border border-luxury-border max-w-5xl mx-auto px-6 md:px-12 shadow-xl relative overflow-hidden">
      
      {/* Soft Rose Backdrop Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_50%,rgba(136,13,60,0.03)_0%,transparent_55%)] pointer-events-none" />
      
      {/* Title */}
      <div className="text-center mb-10 relative z-10">
        <span className="text-[10px] font-sans tracking-[0.25em] text-luxury-gold-dark uppercase block font-semibold">
          The Experience
        </span>
        <h2 className="font-serif text-2xl md:text-4xl tracking-wide text-luxury-onyx font-light mt-1">
          Your <span className="crown-gradient-text font-bold">Transformation</span>
        </h2>
        <p className="font-sans text-xs tracking-wider text-luxury-stone mt-2">
          What your audition steps build towards
        </p>
        <div className="w-16 h-[1px] bg-luxury-gold/50 mx-auto mt-4" />
      </div>

      {/* Grid of Features */}
      <div className="grid md:grid-cols-2 gap-6 relative z-10">
        {experiences.map((exp, i) => (
          <motion.div 
            key={i} 
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
            whileHover={shouldReduceMotion ? {} : { y: -4 }}
            className="p-8 border border-luxury-border bg-white space-y-4 relative overflow-hidden transition-all duration-300 flex flex-col justify-between rose-glow-hover rounded-2xl shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-2xl">{exp.icon}</span>
                <span className="font-serif text-[#BE185D] text-sm font-semibold italic">
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-serif text-xl text-luxury-onyx font-semibold pt-1">
                {exp.title}
              </h3>
              <p className="font-sans text-xs md:text-sm text-luxury-stone leading-relaxed">
                {exp.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="text-center mt-10 relative z-10">
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
