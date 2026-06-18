"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { siteData } from "@/content/site-data";

export default function FinalCTA() {
  const { current, original } = siteData.registrationFee;
  const shouldReduceMotion = useReducedMotion();
  
  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  // Validation/Checkout State
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showFallbackBtn, setShowFallbackBtn] = useState(false);
  const [refNum] = useState(() => `DPM-${Math.floor(100000 + Math.random() * 900000)}`);

  const rzpFormContainerRef = useRef<HTMLFormElement>(null);
  const fallbackContainerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleSelectEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setSelectedCategory(customEvent.detail);
    };
    window.addEventListener("select-category", handleSelectEvent);
    return () => window.removeEventListener("select-category", handleSelectEvent);
  }, []);

  // Mount the hosted payment button inside the container
  useEffect(() => {
    const container = rzpFormContainerRef.current;
    if (!container) return;

    // Clean up container
    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/payment-button.js";
    script.async = true;
    script.setAttribute("data-payment_button_id", "pl_T31OG3R1jueUAB");

    container.appendChild(script);

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  const handleCheckout = async () => {
    const formErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      formErrors.name = "Please enter your full name.";
    }
    const cleanPhone = phone.replace(/\s+/g, "");
    if (!/^\d{10}$/.test(cleanPhone)) {
      formErrors.phone = "Please enter a valid 10-digit WhatsApp number.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formErrors.email = "Please enter a valid email address.";
    }
    if (!selectedCategory) {
      formErrors.category = "Please select your audition category.";
    }
    if (!agreeTerms) {
      formErrors.terms = "You must agree to the terms & refund policy.";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    setIsProcessing(true);

    // POST lead data to Google Sheets webhook
    try {
      const webhookUrl = process.env.NEXT_PUBLIC_SHEETS_WEBHOOK_URL;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({ name, email, whatsapp: phone, category: selectedCategory }),
        });
      }
    } catch (error) {
      console.error("Failed to capture lead to Google Sheets:", error);
    }

    // Programmatically find the Razorpay button and click it
    let button: HTMLButtonElement | null = null;
    const maxPolls = 30; // Wait up to 3 seconds for button to render
    for (let i = 0; i < maxPolls; i++) {
      button = rzpFormContainerRef.current?.querySelector("button") || null;
      if (button) break;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    if (button) {
      try {
        button.click();
        // Reset processing state after a delay of 5 seconds so user can try again if they cancel
        setTimeout(() => {
          setIsProcessing(false);
        }, 5000);
      } catch (err) {
        console.error("Failed to click Razorpay button programmatically:", err);
        setIsProcessing(false);
        setShowFallbackBtn(true);
        setTimeout(() => {
          fallbackContainerRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      console.warn("Razorpay hosted button not found. Revealing fallback.");
      setIsProcessing(false);
      setShowFallbackBtn(true);
      setTimeout(() => {
        fallbackContainerRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  if (success) {
    return (
      <motion.section 
        id="register" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={revealVariants}
        className="py-10 md:py-24 border-2 border-green-600 bg-green-950/20 max-w-3xl mx-auto my-6 md:my-12 px-6 md:px-12 relative overflow-hidden text-center rounded-[2.5rem]"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-green-600" />
        <div className="w-16 h-16 rounded-full bg-green-950/50 border border-green-500 flex items-center justify-center mx-auto mb-6">
          <span className="text-green-400 text-3xl font-bold">✓</span>
        </div>
        <span className="font-sans text-[10px] tracking-widest text-green-400 uppercase font-bold block mb-1">✓ Audition Registration Submitted</span>
        <h2 className="font-serif text-3xl tracking-wide text-white font-light">Slot Pre-Reserved</h2>
        <div className="my-6 p-4 bg-luxury-onyx border border-green-500/30 inline-block">
          <p className="font-sans text-xs text-luxury-stone">Reference Number</p>
          <strong className="font-mono text-lg text-green-400">{refNum}</strong>
        </div>
        <div className="max-w-md mx-auto space-y-4 font-sans text-xs md:text-sm text-gray-300 leading-relaxed">
          <p>Thank you, <strong className="text-white">{name}</strong>. Your entry for <strong className="text-white">{siteData.categories.find(c => c.id === selectedCategory)?.name}</strong> is logged.</p>
          <div className="p-4 border-l-2 border-luxury-gold bg-luxury-onyx text-left max-w-sm mx-auto space-y-1">
            <span className="font-sans text-[9px] tracking-widest uppercase text-luxury-gold font-bold block">What happens in the next 24 hours</span>
            <p className="font-sans text-[11px] text-gray-300 leading-normal">A coordinator will contact you at <strong className="text-white">{phone}</strong> to confirm your slot and send your preparatory materials.</p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-luxury-border/30">
          <button onClick={() => { setSuccess(false); setName(""); setPhone(""); setEmail(""); setSelectedCategory(""); setAgreeTerms(false); }} className="font-sans text-[10px] tracking-widest uppercase text-luxury-gold underline hover:text-white">Register Another Candidate</button>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section 
      id="register" 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={revealVariants}
      className="py-8 md:py-16 border border-emerald-600/40 bg-luxury-darkcard max-w-3xl mx-auto my-6 md:my-12 px-6 md:px-12 relative overflow-hidden emerald-glow-hover rounded-[2.5rem] shadow-xl"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,78,59,0.08)_0%,rgba(201,162,75,0.03)_50%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-1 bg-emerald-600" />
      <div className="text-center mb-8 relative z-10">
        <h2 className="font-serif text-2xl md:text-3xl tracking-wide text-white font-light">
          Apply for <span className="crown-gradient-text font-bold">Auditions</span>
        </h2>
        <p className="font-sans text-xs text-gray-400 mt-2">Registration Fee: <strong className="text-luxury-gold text-sm">₹{current}</strong> • Anchored against <del className="text-gray-500">₹{original}</del></p>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-5 max-w-md mx-auto relative z-10">
        <div className="space-y-1">
          <label htmlFor="reg-name" className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">Candidate&apos;s Full Name</label>
          <input id="reg-name" type="text" placeholder="Enter full name" value={name} onChange={(e) => setName(e.target.value)} className="w-full font-sans text-base md:text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white rounded-none transition-colors" />
          {errors.name && <p className="text-red-500 text-[10px] font-sans">{errors.name}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="reg-phone" className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">WhatsApp Number</label>
          <input id="reg-phone" type="tel" placeholder="10-digit mobile number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full font-sans text-base md:text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white rounded-none transition-colors" />
          {errors.phone && <p className="text-red-500 text-[10px] font-sans">{errors.phone}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="reg-email" className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">Email Address</label>
          <input id="reg-email" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full font-sans text-base md:text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white rounded-none transition-colors" />
          {errors.email && <p className="text-red-500 text-[10px] font-sans">{errors.email}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="reg-category" className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">Audition Category</label>
          <select id="reg-category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full font-sans text-base md:text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white rounded-none transition-colors">
            <option value="" disabled>Select your category</option>
            {siteData.categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name} ({cat.ageRange} Years)</option>)}
          </select>
          {errors.category && <p className="text-red-500 text-[10px] font-sans">{errors.category}</p>}
        </div>

        <div className="flex items-start gap-2.5">
          <input type="checkbox" id="terms-check" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} className="w-4 h-4 border border-luxury-border rounded-none text-luxury-gold bg-luxury-onyx focus:ring-0 cursor-pointer mt-0.5" />
          <label htmlFor="terms-check" className="font-sans text-[10px] text-gray-400 leading-relaxed select-none cursor-pointer">I verify that I fit the criteria and understand the fee is <strong className="text-white font-medium">non-refundable</strong>.</label>
        </div>
        {errors.terms && <p className="text-red-500 text-[10px] font-sans">{errors.terms}</p>}

        <motion.div whileHover={shouldReduceMotion ? {} : { scale: 1.02 }} whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}>
          <button type="button" onClick={handleCheckout} disabled={isProcessing} className="w-full font-sans text-xs tracking-widest uppercase gold-gradient-bg text-luxury-onyx hover:brightness-110 transition-all duration-300 py-4 font-bold shadow-md cursor-pointer h-12 flex items-center justify-center rounded-full disabled:opacity-50">
            {isProcessing ? "Processing..." : `Pay ₹${current} & Register`}
          </button>
        </motion.div>
      </form>

      {/* Hidden/Fallback Razorpay Form Container */}
      <div 
        ref={fallbackContainerRef}
        className={showFallbackBtn 
          ? "mt-6 p-6 border border-emerald-500/30 bg-luxury-onyx rounded-[1.5rem] text-center space-y-4 max-w-md mx-auto relative z-10 animate-fade-in"
          : "absolute opacity-0 pointer-events-none w-px h-px overflow-hidden select-none"
        }
      >
        <p className="font-sans text-xs text-emerald-400 font-bold uppercase tracking-wider">Payment Action Required</p>
        <p className="font-sans text-xs text-gray-300">
          If the payment window did not open automatically, please click the button below to complete your registration:
        </p>
        <div className="flex justify-center py-2">
          <form ref={rzpFormContainerRef} className="inline-block" />
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-luxury-border/30 text-center space-y-2 relative z-10">
        <span className="font-sans text-[9px] tracking-widest uppercase text-emerald-400 block flex items-center justify-center gap-1.5 font-bold">Secure 256-Bit SSL Payment via Razorpay</span>
      </div>
    </motion.section>
  );
}
