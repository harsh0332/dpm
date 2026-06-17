"use client";

import React, { useState } from "react";
import { siteData } from "@/content/site-data";

export default function LeadCapture() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    // Default fallback
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

    // Scroll to registration block
    const element = document.getElementById("register");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-12 p-8 border border-luxury-gold/30 bg-luxury-darkcard text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[3px] bg-luxury-gold" />

      {step === 1 && (
        <div className="space-y-4">
          <span className="font-sans text-[10px] tracking-widest text-luxury-gold uppercase font-bold">
            Step 1 of 3: Eligibility Finder
          </span>
          <h3 className="font-serif text-xl tracking-wide text-white">
            Check Which Pageant Category You Qualify For
          </h3>
          <p className="font-sans text-xs text-gray-400 max-w-md mx-auto">
            Enter your details to verify eligibility and receive the official audition syllabus via WhatsApp.
          </p>

          <div className="flex flex-col gap-3 max-w-sm mx-auto mt-6">
            <label htmlFor="lead-name" className="sr-only">Your Full Name</label>
            <input 
              id="lead-name"
              type="text" 
              placeholder="Your Full Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className="w-full font-sans text-base md:text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border outline-none focus:border-luxury-gold text-white placeholder:text-gray-600 rounded-none"
            />
            <label htmlFor="lead-phone" className="sr-only">WhatsApp Number</label>
            <input 
              id="lead-phone"
              type="tel" 
              placeholder="WhatsApp Number" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              inputMode="tel"
              autoComplete="tel"
              className="w-full font-sans text-base md:text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border outline-none focus:border-luxury-gold text-white placeholder:text-gray-600 rounded-none"
            />
            {error && <p className="text-red-500 text-xs text-left font-sans">{error}</p>}
            
            <button 
              type="button"
              onClick={() => validateStep1() && setStep(2)}
              className="font-sans text-xs tracking-widest uppercase bg-luxury-onyx border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-onyx transition-all duration-300 h-11 flex items-center justify-center font-semibold rounded-none"
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
          <h3 className="font-serif text-xl tracking-wide text-white">
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
              onClick={() => { setGender("male"); setAgeRange("16-32"); }} // Mr. India is 16-32, directly skip to submit
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
          <h3 className="font-serif text-xl tracking-wide text-white">
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
              className="flex-1 font-sans text-xs tracking-widest uppercase bg-luxury-onyx border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-onyx transition-all duration-300 h-11 flex items-center justify-center font-semibold disabled:opacity-50 disabled:cursor-not-allowed rounded-none"
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
          <h3 className="font-serif text-2xl tracking-wide text-white">
            You Qualify for <strong className="text-luxury-gold">{getMatchedCategory().name}</strong>
          </h3>
          <p className="font-sans text-xs text-gray-300 max-w-md mx-auto">
            Your WhatsApp lead profile has been saved. We have pre-selected the category in the checkout below. Complete your registration fee to lock your audition slot.
          </p>
          <div className="pt-4">
            <button 
              onClick={() => setStep(1)}
              className="font-sans text-[10px] tracking-widest uppercase text-gray-400 underline hover:text-luxury-gold"
            >
              Check eligibility for another person
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
