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
  const [isProcessing, setIsProcessing] = useState(false);
  const [refNum] = useState(() => `DPM-${Math.floor(100000 + Math.random() * 900000)}`);
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

    // Save UTM/tracking parameters to sessionStorage if present in URL
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const keys = [
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_term",
        "utm_content",
        "utm_id",
        "placement",
        "site_source",
        "fbclid",
        "gclid"
      ];

      const result: { [key: string]: string | null } = {};
      let hasParams = false;

      keys.forEach(key => {
        const val = params.get(key);
        if (val) {
          result[key] = val;
          hasParams = true;
        }
      });

      // Capture referrer
      const referrer = document.referrer;
      if (referrer) {
        result["ref"] = referrer;
      }

      if (hasParams) {
        sessionStorage.setItem("dpm_utm_params", JSON.stringify(result));
      }
    }

    return () => window.removeEventListener("select-category", handleSelectEvent);
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

    // POST lead data via our own API route (server-side proxy to Google Sheets)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      // Parse tracking parameters at checkout time
      const trackingParams: { [key: string]: string | null } = {};
      
      if (typeof window !== "undefined") {
        const keys = [
          "utm_source",
          "utm_medium",
          "utm_campaign",
          "utm_term",
          "utm_content",
          "utm_id",
          "placement",
          "site_source",
          "fbclid",
          "gclid"
        ];
        
        // Start with a clean template
        keys.forEach(k => { trackingParams[k] = null; });
        trackingParams["ref"] = document.referrer || null;
        
        const params = new URLSearchParams(window.location.search);
        let hasParams = false;
        
        keys.forEach(key => {
          const val = params.get(key);
          if (val) {
            trackingParams[key] = val;
            hasParams = true;
          }
        });
        
        // Load from sessionStorage if URL has none
        if (!hasParams) {
          const stored = sessionStorage.getItem("dpm_utm_params");
          if (stored) {
            try {
              const parsed = JSON.parse(stored);
              Object.assign(trackingParams, parsed);
            } catch (e) {
              console.error("Error parsing stored UTM params:", e);
            }
          }
        }
        
        // Determine source
        let sourceVal = trackingParams["utm_source"];
        if (!sourceVal) {
          const referrer = document.referrer;
          if (referrer && (referrer.includes("instagram.com") || referrer.includes("ig"))) {
            sourceVal = "instagram";
          } else if (referrer && (referrer.includes("facebook.com") || referrer.includes("fb"))) {
            sourceVal = "facebook";
          } else {
            sourceVal = "organic";
          }
        }
        trackingParams["source"] = sourceVal;
      }
      
      const payload = {
        lead_id: `LEAD${Date.now()}`,
        full_name: name,
        email: email,
        whatsapp_number: phone,
        registration_time: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
        payment_status: "Pending",
        follow_up_stage: "Pending",
        notes: `Category: ${selectedCategory}`,
        ...trackingParams
      };

      await fetch("/api/capture-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
    } catch (error) {
      // Timeout or network error — still continue to payment
      console.warn("Lead capture failed, continuing to payment:", error);
    }

    // Redirect to Razorpay hosted Payment Page with pre-filled details
    const paymentUrl = `https://pages.razorpay.com/pl_Stw67RqFlyqASX/view?name=${encodeURIComponent(
      name
    )}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}`;

    window.location.href = paymentUrl;
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



      <div className="mt-8 pt-6 border-t border-luxury-border/30 text-center space-y-2 relative z-10">
        <span className="font-sans text-[9px] tracking-widest uppercase text-emerald-400 block flex items-center justify-center gap-1.5 font-bold">Secure 256-Bit SSL Payment via Razorpay</span>
      </div>
    </motion.section>
  );
}
