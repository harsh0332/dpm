"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion, Variants } from "framer-motion";
import { siteData } from "@/content/site-data";

export default function FAQ() {
  const { current } = siteData.registrationFee;
  const shouldReduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const faqs = [
    {
      q: "Is DPM Entertainment a registered, legitimate organization?",
      a: `Yes, ${siteData.brandName} is a legally registered organization based out of Allahabad, Uttar Pradesh, founded by ${siteData.founder}. We maintain a transparent process with verifiable jury members, public profiles, and a clear refund policy.`
    },
    {
      q: "Is the ₹999 registration fee refundable?",
      a: `No, the registration fee of ₹${current} (inclusive of GST) is strictly non-refundable. Since audition slots are immediately locked and allocated in our virtual scheduler upon checkout, we cannot offer cancellations.`
    },
    {
      q: "How will the audition rounds be conducted?",
      a: "The initial auditions are conducted completely online via Zoom. This eliminates travel, hotel, and portfolio expenses for regional candidates, ensuring anyone from Tier 1, 2, or 3 cities can participate comfortably."
    },
    {
      q: "What is the age limit and eligibility criteria?",
      a: `We have four categories: Mr. India (16–32), Miss India (16–28), Miss Teen India (12–18), and Mrs. India (23–60, open to married, widowed, or divorced women). Final age parameters are subject to confirmation.`
    },
    {
      q: "What happens immediately after I complete my payment?",
      a: "Within 24 hours of successful payment, you will receive an automated confirmation message on WhatsApp with your Zoom schedule details, preparatory syllabus, and official candidate checklist."
    },
    {
      q: "Is celebrity judge Urvashi Rautela directly involved?",
      a: `Yes, Urvashi Rautela is the officially signed Celebrity Patron & Chief Guest. She will be present at the Grand Finale on ${siteData.grandFinaleDate} to evaluate, mentor, and crown the winners.`
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const itemVariants: Variants = {
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
    <section className="py-12 md:py-16 my-12 bg-luxury-alabaster text-luxury-onyx rounded-[2rem] border border-luxury-border max-w-4xl mx-auto px-6 md:px-12 shadow-xl relative overflow-hidden">
      
      {/* Title */}
      <div className="text-center mb-10 relative z-10">
        <span className="text-[10px] font-sans tracking-[0.25em] text-luxury-gold-dark uppercase block font-semibold">
          Clarifications
        </span>
        <h2 className="font-serif text-2xl md:text-4xl tracking-wide text-luxury-onyx font-light mt-1">
          Frequently Asked <span className="crown-gradient-text font-bold">Questions</span>
        </h2>
        <p className="font-sans text-xs tracking-wider text-luxury-stone mt-2 uppercase">
          Resolve Your Doubts & Audition Policies
        </p>
        <div className="w-16 h-[1px] bg-luxury-gold/50 mx-auto mt-4" />
      </div>

      {/* Accordion List */}
      <div className="space-y-4 max-w-3xl mx-auto relative z-10">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div 
              key={i} 
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={itemVariants}
              className="border-b border-luxury-border/30 pb-3"
            >
              {/* Question Header (Toggles accordion) */}
              <button
                onClick={() => handleToggle(i)}
                aria-expanded={isOpen}
                className="w-full flex justify-between items-center text-left py-4 focus:outline-none group cursor-pointer"
              >
                <span className="font-serif text-base md:text-lg text-luxury-onyx font-semibold group-hover:text-luxury-gold-dark transition-colors duration-300">
                  {faq.q}
                </span>
                
                {/* Visual indicator (+ / -) */}
                <span className="text-luxury-gold-dark text-lg md:text-xl font-bold shrink-0 ml-4 transition-transform duration-300">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {/* Collapsible Answer */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="font-sans text-xs md:text-sm text-luxury-stone leading-relaxed pb-4 pl-4 border-l border-luxury-gold/50">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
