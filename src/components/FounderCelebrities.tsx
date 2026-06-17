"use client";

import React from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { siteData } from "@/content/site-data";

export default function FounderCelebrities() {
  const shouldReduceMotion = useReducedMotion();

  const itemVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: shouldReduceMotion ? 0 : i * 0.05,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  // Asymmetrical grid column/row configurations for 7 images to create a premium editorial collage
  const layoutClasses = [
    "col-span-2 row-span-2", // Image 1 (Featured)
    "col-span-1 row-span-1", // Image 2
    "col-span-1 row-span-1", // Image 3
    "col-span-1 row-span-2", // Image 4
    "col-span-2 row-span-1", // Image 5
    "col-span-1 row-span-1", // Image 6
    "col-span-1 row-span-1", // Image 7
  ];

  return (
    <section className="py-12 md:py-16 my-12 bg-luxury-alabaster text-luxury-onyx rounded-[2rem] border border-luxury-border max-w-5xl mx-auto px-6 md:px-12 shadow-xl relative overflow-hidden">
      
      {/* Title & Founder Description */}
      <div className="grid md:grid-cols-12 gap-8 items-center mb-10">
        <div className="md:col-span-6 space-y-4 text-left">
          <span className="text-[10px] font-sans tracking-[0.25em] text-luxury-gold-dark uppercase block font-semibold">
            Promoter Credibility
          </span>
          <h2 className="font-serif text-2xl md:text-4xl tracking-wide text-luxury-onyx font-light leading-tight">
            DPM Group Founder with Indian Celebrities
          </h2>
          <div className="w-12 h-[1px] bg-luxury-gold/50" />
        </div>
        <div className="md:col-span-6 text-left">
          <p className="font-sans text-xs md:text-sm text-luxury-stone leading-relaxed">
            Our founder and director, <strong>{siteData.founder}</strong>, maintains active collaborations and partnerships across Bollywood casting agencies and event circles. These real photos highlight DPM Entertainment's long-standing credibility and authority as a national beauty pageant launcher.
          </p>
        </div>
      </div>

      {/* Asymmetrical Collage Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[120px] md:auto-rows-[160px]">
        {siteData.founderCelebsImages.map((img, i) => {
          const layoutClass = layoutClasses[i] || "col-span-1 row-span-1";
          return (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={itemVariants}
              className={`${layoutClass} border border-luxury-border/30 p-1 bg-white hover:border-luxury-gold transition-colors duration-300 rounded-2xl shadow-sm`}
            >
              <div className="relative w-full h-full bg-luxury-onyx overflow-hidden group rounded-xl">
                <img
                  src={img}
                  alt={`Founder Shivanshu Mishra with Celebrities ${i + 1}`}
                  className="w-full h-full object-cover filter grayscale-0 md:grayscale md:hover:grayscale-0 transition-all duration-500 transform group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-onyx/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 pointer-events-none">
                  <span className="font-sans text-[9px] tracking-wider uppercase text-luxury-gold font-semibold">
                    DPM Network Presence
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA Button */}
      <div className="text-center mt-10">
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
