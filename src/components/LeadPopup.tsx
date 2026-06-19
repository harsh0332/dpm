"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { siteData } from "@/content/site-data";

export default function LeadPopup() {
  const shouldReduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!siteData.config.showLeadPopup) return;

    // Check if user has already dismissed the popup in the current session
    try {
      const dismissed = sessionStorage.getItem("dpm-lead-dismissed");
      if (!dismissed) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 1500); // 1.5 seconds delay on mount
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.warn("sessionStorage is blocked:", e);
    }
  }, []);

  const handleClose = () => {
    try {
      sessionStorage.setItem("dpm-lead-dismissed", "true");
    } catch (e) {
      console.warn("sessionStorage write is blocked:", e);
    }
    setIsOpen(false);
  };

  const validateStep1 = () => {
    if (!name.trim()) {
      setError("Please enter your name");
      return false;
    }
    const cleanPhone = phone.replace(/\s+/g, "");
    if (!/^\d{10}$/.test(cleanPhone)) {
      setError("Please enter a valid 10-digit WhatsApp number");
      return false;
    }
    setError("");
    return true;
  };

  const getMatchedCategory = () => {
    if (gender === "male") {
      return { id: "mr-india", name: "Mr. India" };
    }
    if (gender === "female") {
      if (ageRange === "12-18") return { id: "miss-teen-india", name: "Miss Teen India" };
      if (ageRange === "16-28") return { id: "miss-india", name: "Miss India" };
      if (ageRange === "23-60") return { id: "mrs-india", name: "Mrs. India" };
    }
    return { id: "miss-india", name: "Miss India" };
  };

  const handleSubmitLead = async () => {
    setIsSubmitting(true);
    const matched = getMatchedCategory();
    
    // Submit lead to configuration endpoint or mock API
    try {
      await fetch(process.env.NEXT_PUBLIC_LEAD_API || "/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, gender, ageRange, matchedCategory: matched.id }),
      });
    } catch (e) {
      console.warn("Lead mock submission complete (ignored network error in static demo)");
    }

    // Dispatch selection event to FinalCTA
    const selectEvent = new CustomEvent("select-category", { detail: matched.id });
    window.dispatchEvent(selectEvent);

    setIsSubmitting(false);
    setStep(4);

    // Auto close and scroll to registration form after a brief delay
    setTimeout(() => {
      handleClose();
      const element = document.getElementById("register");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 1800);
  };

  if (!siteData.config.showLeadPopup) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-luxury-darkcard border-2 border-luxury-gold/40 max-w-md w-full p-6 md:p-8 rounded-[1.5rem] shadow-2xl z-10 text-center"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close eligibility popup"
              className="absolute top-4 right-4 text-luxury-stone hover:text-white transition-all text-xl font-bold h-8 w-8 flex items-center justify-center rounded-full border border-luxury-border/50 hover:border-luxury-gold cursor-pointer"
            >
              ×
            </button>

            {step === 1 && (
              <div className="space-y-4">
                <span className="font-sans text-[10px] tracking-widest text-luxury-gold uppercase font-bold">
                  Eligibility Finder Quiz
                </span>
                <h3 className="font-serif text-xl md:text-2xl tracking-wide text-white font-light">
                  Find Your Pageant Category
                </h3>
                <p className="font-sans text-xs text-gray-400 max-w-sm mx-auto">
                  Verify your eligibility parameters to unlock the official audition syllabus via WhatsApp.
                </p>

                <div className="flex flex-col gap-3 max-w-sm mx-auto mt-6">
                  <label htmlFor="modal-lead-name" className="sr-only">Your Full Name</label>
                  <input 
                    id="modal-lead-name"
                    type="text" 
                    placeholder="Your Full Name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    className="w-full font-sans text-base md:text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border outline-none focus:border-luxury-gold text-white placeholder:text-gray-600 rounded-none transition-colors"
                  />
                  <label htmlFor="modal-lead-phone" className="sr-only">WhatsApp Number</label>
                  <input 
                    id="modal-lead-phone"
                    type="tel" 
                    placeholder="WhatsApp Number" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    inputMode="tel"
                    autoComplete="tel"
                    className="w-full font-sans text-base md:text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border outline-none focus:border-luxury-gold text-white placeholder:text-gray-600 rounded-none transition-colors"
                  />
                  {error && <p className="text-red-500 text-xs text-left font-sans">{error}</p>}
                  
                  <button 
                    type="button"
                    onClick={() => validateStep1() && setStep(2)}
                    className="font-sans text-xs tracking-widest uppercase bg-luxury-onyx border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-onyx transition-all duration-300 h-11 flex items-center justify-center font-bold rounded-none"
                  >
                    Continue Check
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <span className="font-sans text-[10px] tracking-widest text-luxury-gold uppercase font-bold">
                  Step 2 of 3: Gender Selection
                </span>
                <h3 className="font-serif text-xl tracking-wide text-white font-light">
                  What is your gender?
                </h3>
                
                <div className="flex justify-center gap-4 max-w-xs mx-auto mt-6">
                  <button 
                    onClick={() => { setGender("female"); setStep(3); }}
                    className={`flex-1 font-sans text-xs tracking-widest uppercase h-11 flex items-center justify-center border border-luxury-gold rounded-none transition-colors ${
                      gender === "female" ? "bg-luxury-gold text-luxury-onyx" : "text-white hover:bg-luxury-gold hover:text-luxury-onyx"
                    }`}
                  >
                    Female
                  </button>
                  <button 
                    onClick={() => { setGender("male"); setAgeRange("16-32"); }} // Mr. India is 16-32
                    className={`flex-1 font-sans text-xs tracking-widest uppercase h-11 flex items-center justify-center border border-luxury-gold rounded-none transition-colors ${
                      gender === "male" ? "bg-luxury-gold text-luxury-onyx" : "text-white hover:bg-luxury-gold hover:text-luxury-onyx"
                    }`}
                  >
                    Male
                  </button>
                </div>
                
                {gender === "male" && (
                  <div className="pt-4">
                    <button 
                      onClick={handleSubmitLead}
                      disabled={isSubmitting}
                      className="font-sans text-xs tracking-widest uppercase bg-luxury-onyx border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-onyx transition-all duration-300 px-6 h-11 flex items-center justify-center mx-auto font-semibold rounded-none"
                    >
                      {isSubmitting ? "Processing..." : "Get Results"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <span className="font-sans text-[10px] tracking-widest text-luxury-gold uppercase font-bold">
                  Step 3 of 3: Age Verification
                </span>
                <h3 className="font-serif text-xl tracking-wide text-white font-light">
                  Select your age range
                </h3>
                
                <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto mt-6">
                  {["12-18", "16-28", "23-60"].map((range) => (
                    <button 
                      key={range}
                      onClick={() => setAgeRange(range)}
                      className={`font-sans text-xs h-11 flex items-center justify-center border border-luxury-gold rounded-none transition-colors ${
                        ageRange === range ? "bg-luxury-gold text-luxury-onyx" : "text-white hover:bg-luxury-gold hover:text-luxury-onyx"
                      }`}
                    >
                      {range} Yrs
                    </button>
                  ))}
                </div>

                <div className="pt-4 flex gap-3 justify-center max-w-sm mx-auto">
                  <button 
                    onClick={() => setStep(2)}
                    className="flex-1 font-sans text-xs tracking-widest uppercase border border-luxury-border text-gray-400 h-11 flex items-center justify-center rounded-none hover:text-white transition-colors"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleSubmitLead}
                    disabled={!ageRange || isSubmitting}
                    className="flex-1 font-sans text-xs tracking-widest uppercase bg-luxury-onyx border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-onyx transition-all duration-300 h-11 flex items-center justify-center font-bold disabled:opacity-50 disabled:cursor-not-allowed rounded-none"
                  >
                    {isSubmitting ? "Processing..." : "Find Category"}
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <span className="font-sans text-[10px] tracking-widest text-green-400 uppercase font-bold block">
                  Eligibility Confirmed ✓
                </span>
                <h3 className="font-serif text-2xl tracking-wide text-white font-light">
                  You Qualify for <strong className="text-luxury-gold">{getMatchedCategory().name}</strong>
                </h3>
                <p className="font-sans text-xs text-gray-300 max-w-sm mx-auto leading-relaxed">
                  Your WhatsApp lead profile has been saved. Redirecting to checkout with pre-selected category...
                </p>
                <div className="w-8 h-8 rounded-full border-2 border-luxury-gold border-t-transparent animate-spin mx-auto mt-4" />
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
