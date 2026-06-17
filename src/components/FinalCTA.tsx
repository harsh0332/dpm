"use client";

import React, { useState, useEffect } from "react";
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
  const [refNum, setRefNum] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

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

  // Load Razorpay Script Dynamically
  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

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

    // Load Razorpay Checkout Script
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Failed to load Razorpay SDK. Please check your internet connection.");
      setIsProcessing(false);
      return;
    }

    // Set up options with dynamically retrieved Key ID (never hardcoded)
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
      amount: current * 100, // In paise
      currency: "INR",
      name: siteData.brandName,
      description: `Audition Registration: ${siteData.categories.find(c => c.id === selectedCategory)?.name || ""}`,
      image: siteData.logo,
      handler: function (response: { razorpay_payment_id: string }) {
        setIsProcessing(false);
        const generatedRef = `DPM-${Math.floor(100000 + Math.random() * 900000)}`;
        setRefNum(generatedRef);
        setSuccess(true);
      },
      prefill: {
        name: name,
        email: email,
        contact: phone,
      },
      theme: {
        color: "#C9A24B",
      },
      modal: {
        ondismiss: function () {
          setIsProcessing(false);
        }
      }
    };

    // Instantiate Razorpay Overlay Checkout
    const rzp = new (window as unknown as { Razorpay: new (options: unknown) => { open: () => void } }).Razorpay(options);
    rzp.open();
  };

  if (success) {
    return (
      <motion.section 
        id="register" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={revealVariants}
        className="py-10 md:py-24 border-2 border-green-600 bg-green-950/20 max-w-3xl mx-auto my-6 md:my-12 px-6 md:px-12 relative overflow-hidden text-center"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-green-600" />
        
        <div className="w-16 h-16 rounded-full bg-green-950/50 border border-green-500 flex items-center justify-center mx-auto mb-6">
          <span className="text-green-400 text-3xl font-bold">✓</span>
        </div>

        <span className="font-sans text-[10px] tracking-widest text-green-400 uppercase font-bold block mb-1">
          ✓ Audition Registration Submitted
        </span>
        <h2 className="font-serif text-3xl tracking-wide text-white font-light">
          Slot Pre-Reserved
        </h2>
        
        <div className="my-6 p-4 bg-luxury-onyx border border-green-500/30 inline-block">
          <p className="font-sans text-xs text-luxury-stone">Reference Number</p>
          <strong className="font-mono text-lg text-green-400">{refNum}</strong>
        </div>

        <div className="max-w-md mx-auto space-y-4 font-sans text-xs md:text-sm text-gray-300 leading-relaxed">
          <p>
            Thank you, <strong className="text-white">{name}</strong>. Your audition entry details for the category <strong className="text-white">{siteData.categories.find(c => c.id === selectedCategory)?.name}</strong> have been logged.
          </p>
          
          <div className="p-4 border-l-2 border-luxury-gold bg-luxury-onyx text-left max-w-sm mx-auto space-y-1">
            <span className="font-sans text-[9px] tracking-widest uppercase text-luxury-gold font-bold block">
              What happens in the next 24 hours
            </span>
            <p className="font-sans text-[11px] text-gray-300 leading-normal">
              A DPM coordinator will send a verification prompt to your WhatsApp number <strong className="text-white">{phone}</strong> to confirm your slot, share the official Zoom schedule link, and deliver the audition preparatory syllabus.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-luxury-border/30">
          <button 
            onClick={() => {
              setSuccess(false);
              setName("");
              setPhone("");
              setEmail("");
              setSelectedCategory("");
              setAgreeTerms(false);
            }}
            className="font-sans text-[10px] tracking-widest uppercase text-luxury-gold underline hover:text-white"
          >
            Register Another Candidate
          </button>
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
      {/* Emerald & Warm Gold Backdrop Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,78,59,0.08)_0%,rgba(201,162,75,0.03)_50%,transparent_100%)] pointer-events-none" />

      <div className="absolute top-0 left-0 w-full h-1 bg-emerald-600" />

      <div className="text-center mb-8 relative z-10">
        <span className="font-sans text-[10px] tracking-widest text-emerald-400 uppercase font-bold block mb-1 flex items-center justify-center gap-1">
          <svg className="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
          Secure Registration Gate
        </span>
        <h2 className="font-serif text-2xl md:text-3xl tracking-wide text-white font-light">
          Apply for <span className="crown-gradient-text font-bold">Auditions</span>
        </h2>
        <p className="font-sans text-xs text-gray-400 mt-2">
          Registration Fee: <strong className="text-luxury-gold text-sm">₹{current}</strong> (Inclusive of GST. No hidden fees) • Anchored against <del className="text-gray-500">₹{original}</del>
        </p>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-5 max-w-md mx-auto relative z-10">
        
        {/* Full Name input - text-base prevents auto-zoom on mobile */}
        <div className="space-y-1">
          <label htmlFor="reg-name" className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">
            Candidate&apos;s Full Name
          </label>
          <input 
            id="reg-name"
            type="text" 
            placeholder="Enter full name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className="w-full font-sans text-base md:text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white placeholder:text-gray-600 rounded-none transition-colors"
          />
          {errors.name && <p className="text-red-500 text-[10px] font-sans">{errors.name}</p>}
        </div>

        {/* WhatsApp input - inputMode + autoComplete + text-base */}
        <div className="space-y-1">
          <label htmlFor="reg-phone" className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">
            WhatsApp Number (For Schedule Delivery)
          </label>
          <input 
            id="reg-phone"
            type="tel" 
            placeholder="10-digit mobile number" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            inputMode="tel"
            autoComplete="tel"
            className="w-full font-sans text-base md:text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white placeholder:text-gray-600 rounded-none transition-colors"
          />
          {errors.phone && <p className="text-red-500 text-[10px] font-sans">{errors.phone}</p>}
        </div>

        {/* Email input - autoComplete + text-base */}
        <div className="space-y-1">
          <label htmlFor="reg-email" className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">
            Email Address (For Invoicing & Prep Kit)
          </label>
          <input 
            id="reg-email"
            type="email" 
            placeholder="name@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="w-full font-sans text-base md:text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white placeholder:text-gray-600 rounded-none transition-colors"
          />
          {errors.email && <p className="text-red-500 text-[10px] font-sans">{errors.email}</p>}
        </div>

        {/* Category selector dropdown - text-base */}
        <div className="space-y-1">
          <label htmlFor="reg-category" className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">
            Audition Category
          </label>
          <select 
            id="reg-category"
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full font-sans text-base md:text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white rounded-none transition-colors"
          >
            <option value="" disabled className="bg-luxury-darkcard">Select your category</option>
            {siteData.categories.map((cat) => (
              <option key={cat.id} value={cat.id} className="bg-luxury-darkcard text-white">
                {cat.name} ({cat.ageRange} Years)
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-[10px] font-sans">{errors.category}</p>}
        </div>

        {/* T&C + Cancellation Agreement */}
        <div className="flex items-start gap-2.5">
          <input 
            type="checkbox" 
            id="terms-check" 
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="w-4 h-4 border border-luxury-border rounded-none text-luxury-gold bg-luxury-onyx focus:ring-0 cursor-pointer mt-0.5"
          />
          <label htmlFor="terms-check" className="font-sans text-[10px] text-gray-400 leading-relaxed select-none cursor-pointer">
            I verify that I fit the age range criteria. I understand the entry fee is <strong className="text-white font-medium">non-refundable</strong> as DPM locks my audition slot immediately upon payment.
          </label>
        </div>
        {errors.terms && <p className="text-red-500 text-[10px] font-sans">{errors.terms}</p>}

        {/* Risk Reversal Summary */}
        <div className="text-center text-[10px] font-sans text-luxury-gold tracking-wide uppercase font-semibold">
          Guaranteed Audition Slot • Grooming Webinar Access • Digital Certificate
        </div>

        {/* Payment Button */}
        <motion.div
          whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
        >
          <button 
            type="button" 
            onClick={handleCheckout}
            disabled={isProcessing}
            className="w-full font-sans text-xs tracking-widest uppercase gold-gradient-bg text-luxury-onyx hover:brightness-110 transition-all duration-300 py-4 font-bold shadow-md cursor-pointer h-12 flex items-center justify-center rounded-full disabled:opacity-50 disabled:cursor-not-allowed btn-shimmer"
          >
            {isProcessing ? "Processing Secure Payment..." : `Pay ₹${current} & Register`}
          </button>
        </motion.div>

      </form>

      {/* Secure Payment Cue & SSL Badges */}
      <div className="mt-8 pt-6 border-t border-luxury-border/30 text-center space-y-2 relative z-10">
        <span className="font-sans text-[9px] tracking-widest uppercase text-emerald-400 block flex items-center justify-center gap-1.5 font-bold">
          <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          Secure 256-Bit SSL Encrypted Payment Gateway via Razorpay
        </span>
        <div className="flex justify-center items-center gap-4 text-luxury-stone text-[10px] font-semibold">
          <span>UPI</span>
          <span>•</span>
          <span>Cards</span>
          <span>•</span>
          <span>NetBanking</span>
          <span>•</span>
          <span>Wallets</span>
        </div>
      </div>

    </motion.section>
  );
}
