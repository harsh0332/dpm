"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function ThankYouPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Step 1: Contact (prefilled if available)
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");

  // Step 2: Measurements & Personal Details
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("Single");
  const [altPhone, setAltPhone] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [bust, setBust] = useState("");
  const [waist, setWaist] = useState("");
  const [hips, setHips] = useState("");
  
  // Step 3: Address & Appearance
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [hairColor, setHairColor] = useState("");
  const [skinTone, setSkinTone] = useState("");
  const [eyeColor, setEyeColor] = useState("");
  const [bodyShape, setBodyShape] = useState("");

  // Step 4: Socials & Questionnaire
  const [instagramUrl, setInstagramUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [qualification, setQualification] = useState("");
  const [professionalDetail, setProfessionalDetail] = useState("");
  const [qaWhyModel, setQaWhyModel] = useState("");
  const [qaStrengths, setQaStrengths] = useState("");
  const [qaRoleModel, setQaRoleModel] = useState("");
  const [qaAdventure, setQaAdventure] = useState("");
  const [qaIfWin, setQaIfWin] = useState("");

  // Step 5: Photo Base64
  const [photo1Base64, setPhoto1Base64] = useState<string | null>(null);
  const [photo2Base64, setPhoto2Base64] = useState<string | null>(null);
  const [photo1Mime, setPhoto1Mime] = useState<string | null>(null);
  const [photo2Mime, setPhoto2Mime] = useState<string | null>(null);
  const [photo1Preview, setPhoto1Preview] = useState<string | null>(null);
  const [photo2Preview, setPhoto2Preview] = useState<string | null>(null);

  // Pre-fill contact details from sessionStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("dpm_lead_contact");
      if (stored) {
        setTimeout(() => {
          try {
            const parsed = JSON.parse(stored);
            setFullName(parsed.name || "");
            setEmail(parsed.email || "");
            setWhatsappNumber(parsed.phone || "");

            // Split name into first and last name if possible
            if (parsed.name) {
              const parts = parsed.name.trim().split(/\s+/);
              if (parts.length > 0) setFirstName(parts[0]);
              if (parts.length > 1) setLastName(parts.slice(1).join(" "));
            }
          } catch (e) {
            console.error("Error reading lead contact info:", e);
          }
        }, 0);
      }
    }
  }, []);

  // Helper to convert File to Base64
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, photoNum: 1 | 2) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 3MB for base64 transport safety)
    if (file.size > 3 * 1024 * 1024) {
      alert("File is too large! Please choose an image smaller than 3MB.");
      e.target.value = "";
      return;
    }

    // Set preview URL
    const previewUrl = URL.createObjectURL(file);
    if (photoNum === 1) {
      setPhoto1Preview(previewUrl);
    } else {
      setPhoto2Preview(previewUrl);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const commaIdx = result.indexOf(",");
      const base64 = result.substring(commaIdx + 1);
      const mime = result.substring(5, result.indexOf(";"));
      
      if (photoNum === 1) {
        setPhoto1Base64(base64);
        setPhoto1Mime(mime);
      } else {
        setPhoto2Base64(base64);
        setPhoto2Mime(mime);
      }
    };
    reader.onerror = (err) => {
      console.error("FileReader error:", err);
    };
  };

  const handleNextStep = () => {
    // Basic step validation
    if (step === 1) {
      if (!fullName.trim() || !email.trim() || !whatsappNumber.trim()) {
        alert("Please fill in your name, email, and WhatsApp number.");
        return;
      }
    } else if (step === 2) {
      if (!firstName.trim() || !lastName.trim() || !dob || !heightCm || !weightKg) {
        alert("Please fill in Name, DOB, Height, and Weight.");
        return;
      }
    } else if (step === 3) {
      if (!addressLine1.trim() || !city.trim() || !state.trim() || !postalCode.trim()) {
        alert("Please fill in your address, city, state, and postal code.");
        return;
      }
    }

    setStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    const payload = {
      sheet_name: "Profiles",
      full_name: fullName,
      email: email,
      whatsapp_number: whatsappNumber,
      first_name: firstName,
      last_name: lastName,
      dob: dob,
      age: age,
      marital_status: maritalStatus,
      alt_phone: altPhone,
      height_cm: heightCm,
      weight_kg: weightKg,
      bust: bust,
      chest: bust, // Fill both columns for compatibility
      waist: waist,
      hips: hips,
      hip: hips, // Fill both columns for compatibility
      address_line1: addressLine1,
      address_line2: addressLine2,
      city: city,
      state: state,
      postal_code: postalCode,
      hair_color: hairColor,
      skin_tone: skinTone,
      eye_color: eyeColor,
      body_shape: bodyShape,
      instagram_url: instagramUrl,
      facebook_url: facebookUrl,
      qualification: qualification,
      professional_detail: professionalDetail,
      qa_why_model: qaWhyModel,
      qa_strengths: qaStrengths,
      qa_role_model: qaRoleModel,
      qa_adventure: qaAdventure,
      qa_if_win: qaIfWin,
      photo1_base64: photo1Base64,
      photo1_mime: photo1Mime,
      photo2_base64: photo2Base64,
      photo2_mime: photo2Mime
    };

    try {
      const res = await fetch("/api/capture-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await res.json();
      
      if (result.success) {
        setSubmitSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setErrorMsg(result.error || "Failed to submit profile. Please try again.");
      }
    } catch (err) {
      console.error("Profile submission error:", err);
      setErrorMsg("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepsCount = 5;

  return (
    <div className="min-h-screen bg-luxury-onyx py-12 px-4 md:px-8 text-luxury-alabaster relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.04)_0%,rgba(201,162,75,0.02)_60%,transparent_100%)] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Header Success Card */}
        <div className="text-center mb-10 p-6 md:p-8 border border-emerald-500/30 bg-emerald-950/10 rounded-[2rem] shadow-lg backdrop-blur-sm">
          <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500 flex items-center justify-center mx-auto mb-4">
            <span className="text-emerald-400 text-3xl">✓</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-white font-light tracking-wide">
            Registration <span className="crown-gradient-text font-bold">Confirmed!</span>
          </h1>
          <p className="font-sans text-xs md:text-sm text-gray-400 mt-2 max-w-lg mx-auto leading-relaxed">
            Thank you! Your payment was processed successfully. 
            Please complete your audition profile below so our casting coordinators can prepare your preparatory materials.
          </p>
        </div>

        {/* Multi-step Profile Card */}
        <div className="border border-luxury-border bg-luxury-darkcard rounded-[2.5rem] p-6 md:p-12 shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-luxury-gold" />
          
          {/* Progress Tracker */}
          {!submitSuccess && (
            <div className="mb-8">
              <div className="flex justify-between items-center text-xs font-sans tracking-widest text-luxury-gold uppercase font-semibold">
                <span>Step {step} of {stepsCount}</span>
                <span>{Math.round((step / stepsCount) * 100)}% Complete</span>
              </div>
              <div className="w-full h-1 bg-luxury-onyx mt-2 overflow-hidden rounded-full">
                <motion.div 
                  className="h-full bg-luxury-gold" 
                  initial={{ width: 0 }}
                  animate={{ width: `${(step / stepsCount) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {submitSuccess ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-10 space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-luxury-gold/10 border border-luxury-gold flex items-center justify-center mx-auto mb-2">
                  <span className="text-luxury-gold text-4xl">👑</span>
                </div>
                <h2 className="font-serif text-3xl text-white font-light">Profile Submitted!</h2>
                <p className="font-sans text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                  Your pageant audition portfolio is complete. 
                  A pageant coordinator will contact you at <strong className="text-white">{whatsappNumber}</strong> within the next 24 hours to schedule your Zoom audition slot.
                </p>
                <div className="pt-4">
                  <Link 
                    href="/" 
                    className="inline-flex items-center justify-center font-sans text-xs tracking-widest uppercase border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-onyx px-8 py-3 rounded-full transition-all duration-300 font-bold"
                  >
                    Back to Home Page
                  </Link>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={e => e.preventDefault()} className="space-y-6">
                
                {/* STEP 1: CONTACT INFO */}
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <div className="border-b border-luxury-border/30 pb-3 mb-4">
                      <h3 className="font-serif text-xl text-white font-light">Step 1: Verify Contact Information</h3>
                      <p className="font-sans text-[11px] text-gray-400 mt-1">Please confirm these match the details used during payment.</p>
                    </div>

                    <div className="space-y-1">
                      <label className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">Full Name</label>
                      <input 
                        type="text" 
                        value={fullName} 
                        onChange={e => setFullName(e.target.value)} 
                        className="w-full font-sans text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white rounded-xl transition-colors" 
                        placeholder="Candidate full name"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">Email Address</label>
                      <input 
                        type="email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        className="w-full font-sans text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white rounded-xl transition-colors" 
                        placeholder="candidate@example.com"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">WhatsApp Number</label>
                      <input 
                        type="tel" 
                        value={whatsappNumber} 
                        onChange={e => setWhatsappNumber(e.target.value)} 
                        className="w-full font-sans text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white rounded-xl transition-colors" 
                        placeholder="10-digit mobile number"
                      />
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: MEASUREMENTS & BIO */}
                {step === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <div className="border-b border-luxury-border/30 pb-3 mb-4">
                      <h3 className="font-serif text-xl text-white font-light">Step 2: Name & Physical Measurements</h3>
                      <p className="font-sans text-[11px] text-gray-400 mt-1">Provide your measurements for designer costume fittings.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">First Name</label>
                        <input 
                          type="text" 
                          value={firstName} 
                          onChange={e => setFirstName(e.target.value)} 
                          className="w-full font-sans text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white rounded-xl transition-colors" 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">Last Name</label>
                        <input 
                          type="text" 
                          value={lastName} 
                          onChange={e => setLastName(e.target.value)} 
                          className="w-full font-sans text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white rounded-xl transition-colors" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">Date of Birth</label>
                        <input 
                          type="date" 
                          value={dob} 
                          onChange={e => setDob(e.target.value)} 
                          className="w-full font-sans text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white rounded-xl transition-colors" 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">Age</label>
                        <input 
                          type="number" 
                          value={age} 
                          onChange={e => setAge(e.target.value)} 
                          className="w-full font-sans text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white rounded-xl transition-colors" 
                          placeholder="Years"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">Marital Status</label>
                        <select 
                          value={maritalStatus} 
                          onChange={e => setMaritalStatus(e.target.value)} 
                          className="w-full font-sans text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white rounded-xl transition-colors"
                        >
                          <option value="Single">Single</option>
                          <option value="Married">Married</option>
                          <option value="Divorced">Divorced</option>
                          <option value="Widowed">Widowed</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">Height (in cm)</label>
                        <input 
                          type="number" 
                          value={heightCm} 
                          onChange={e => setHeightCm(e.target.value)} 
                          placeholder="e.g. 172"
                          className="w-full font-sans text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white rounded-xl transition-colors" 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">Weight (in kg)</label>
                        <input 
                          type="number" 
                          value={weightKg} 
                          onChange={e => setWeightKg(e.target.value)} 
                          placeholder="e.g. 58"
                          className="w-full font-sans text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white rounded-xl transition-colors" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">Chest / Bust (inches)</label>
                        <input 
                          type="number" 
                          value={bust} 
                          onChange={e => setBust(e.target.value)} 
                          placeholder="e.g. 34"
                          className="w-full font-sans text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white rounded-xl transition-colors" 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">Waist (inches)</label>
                        <input 
                          type="number" 
                          value={waist} 
                          onChange={e => setWaist(e.target.value)} 
                          placeholder="e.g. 26"
                          className="w-full font-sans text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white rounded-xl transition-colors" 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">Hips (inches)</label>
                        <input 
                          type="number" 
                          value={hips} 
                          onChange={e => setHips(e.target.value)} 
                          placeholder="e.g. 36"
                          className="w-full font-sans text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white rounded-xl transition-colors" 
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">Alternate Phone / Guardian Phone</label>
                      <input 
                        type="tel" 
                        value={altPhone} 
                        onChange={e => setAltPhone(e.target.value)} 
                        className="w-full font-sans text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white rounded-xl transition-colors" 
                        placeholder="Alternate mobile number"
                      />
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: ADDRESS & APPEARANCE */}
                {step === 3 && (
                  <motion.div 
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <div className="border-b border-luxury-border/30 pb-3 mb-4">
                      <h3 className="font-serif text-xl text-white font-light">Step 3: Address & Appearance</h3>
                      <p className="font-sans text-[11px] text-gray-400 mt-1">Specify your location and physical features.</p>
                    </div>

                    <div className="space-y-1">
                      <label className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">Address Line 1</label>
                      <input 
                        type="text" 
                        value={addressLine1} 
                        onChange={e => setAddressLine1(e.target.value)} 
                        placeholder="House no, Street name"
                        className="w-full font-sans text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white rounded-xl transition-colors" 
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">Address Line 2</label>
                      <input 
                        type="text" 
                        value={addressLine2} 
                        onChange={e => setAddressLine2(e.target.value)} 
                        placeholder="Apartment, Area, Landmark (Optional)"
                        className="w-full font-sans text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white rounded-xl transition-colors" 
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">City</label>
                        <input 
                          type="text" 
                          value={city} 
                          onChange={e => setCity(e.target.value)} 
                          className="w-full font-sans text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white rounded-xl transition-colors" 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">State</label>
                        <input 
                          type="text" 
                          value={state} 
                          onChange={e => setState(e.target.value)} 
                          className="w-full font-sans text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white rounded-xl transition-colors" 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">Postal / PIN Code</label>
                        <input 
                          type="text" 
                          value={postalCode} 
                          onChange={e => setPostalCode(e.target.value)} 
                          className="w-full font-sans text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white rounded-xl transition-colors" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">Hair Color</label>
                        <input 
                          type="text" 
                          value={hairColor} 
                          onChange={e => setHairColor(e.target.value)} 
                          placeholder="e.g. Black / Brown"
                          className="w-full font-sans text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white rounded-xl transition-colors" 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">Skin Tone</label>
                        <input 
                          type="text" 
                          value={skinTone} 
                          onChange={e => setSkinTone(e.target.value)} 
                          placeholder="e.g. Fair / Wheatish / Dusky"
                          className="w-full font-sans text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white rounded-xl transition-colors" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">Eye Color</label>
                        <input 
                          type="text" 
                          value={eyeColor} 
                          onChange={e => setEyeColor(e.target.value)} 
                          placeholder="e.g. Black / Brown / Hazel"
                          className="w-full font-sans text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white rounded-xl transition-colors" 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">Body Shape / Type</label>
                        <input 
                          type="text" 
                          value={bodyShape} 
                          onChange={e => setBodyShape(e.target.value)} 
                          placeholder="e.g. Slim / Athletic / Hourglass"
                          className="w-full font-sans text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white rounded-xl transition-colors" 
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: SOCIALS & AUDITION QUESTIONS */}
                {step === 4 && (
                  <motion.div 
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-5"
                  >
                    <div className="border-b border-luxury-border/30 pb-3 mb-4">
                      <h3 className="font-serif text-xl text-white font-light">Step 4: Socials & Background</h3>
                      <p className="font-sans text-[11px] text-gray-400 mt-1">Briefly tell us about your background and motivation.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">Instagram Profile URL</label>
                        <input 
                          type="url" 
                          value={instagramUrl} 
                          onChange={e => setInstagramUrl(e.target.value)} 
                          placeholder="https://instagram.com/username"
                          className="w-full font-sans text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white rounded-xl transition-colors" 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">Facebook Profile URL</label>
                        <input 
                          type="url" 
                          value={facebookUrl} 
                          onChange={e => setFacebookUrl(e.target.value)} 
                          placeholder="https://facebook.com/username"
                          className="w-full font-sans text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white rounded-xl transition-colors" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">Highest Qualification</label>
                        <input 
                          type="text" 
                          value={qualification} 
                          onChange={e => setQualification(e.target.value)} 
                          placeholder="e.g. Graduate / Student"
                          className="w-full font-sans text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white rounded-xl transition-colors" 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">Profession / Job Details</label>
                        <input 
                          type="text" 
                          value={professionalDetail} 
                          onChange={e => setProfessionalDetail(e.target.value)} 
                          placeholder="e.g. Model / IT Professional"
                          className="w-full font-sans text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white rounded-xl transition-colors" 
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">Why do you want to be a Model / Pageant Candidate?</label>
                      <textarea 
                        rows={2}
                        value={qaWhyModel} 
                        onChange={e => setQaWhyModel(e.target.value)} 
                        className="w-full font-sans text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white rounded-xl transition-colors resize-none" 
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">Your major strengths?</label>
                        <input 
                          type="text" 
                          value={qaStrengths} 
                          onChange={e => setQaStrengths(e.target.value)} 
                          className="w-full font-sans text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white rounded-xl transition-colors" 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">Who is your role model?</label>
                        <input 
                          type="text" 
                          value={qaRoleModel} 
                          onChange={e => setQaRoleModel(e.target.value)} 
                          className="w-full font-sans text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white rounded-xl transition-colors" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">Describe a major adventure you did?</label>
                        <input 
                          type="text" 
                          value={qaAdventure} 
                          onChange={e => setQaAdventure(e.target.value)} 
                          className="w-full font-sans text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white rounded-xl transition-colors" 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold">What will you do if you win?</label>
                        <input 
                          type="text" 
                          value={qaIfWin} 
                          onChange={e => setQaIfWin(e.target.value)} 
                          className="w-full font-sans text-sm tracking-wider px-4 py-3 bg-luxury-onyx border border-luxury-border focus:border-luxury-gold outline-none text-white rounded-xl transition-colors" 
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 5: PORTFOLIO PHOTOS UPLOAD */}
                {step === 5 && (
                  <motion.div 
                    key="step5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="border-b border-luxury-border/30 pb-3 mb-4">
                      <h3 className="font-serif text-xl text-white font-light">Step 5: Portfolio Photos</h3>
                      <p className="font-sans text-[11px] text-gray-400 mt-1">Upload 2 clear, professional photos (Close-up and Full-length). Max 3MB each.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Photo 1 Upload Box */}
                      <div className="space-y-2">
                        <label className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold text-center">Photo 1 (Close-up / Portrait)</label>
                        <div className="border-2 border-dashed border-luxury-border/40 hover:border-luxury-gold/50 bg-luxury-onyx rounded-2xl h-56 flex flex-col items-center justify-center overflow-hidden relative group transition-colors cursor-pointer">
                          {photo1Preview ? (
                            <>
                              <img src={photo1Preview} alt="Preview 1" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <span className="font-sans text-xs text-luxury-gold uppercase font-bold">Change Image</span>
                              </div>
                            </>
                          ) : (
                            <div className="text-center p-4">
                              <span className="text-3xl block mb-2">📸</span>
                              <span className="font-sans text-[11px] text-gray-400 block font-medium">Click to select image</span>
                              <span className="font-sans text-[9px] text-gray-500 block mt-1">JPEG or PNG under 3MB</span>
                            </div>
                          )}
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={e => handleFileChange(e, 1)}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                        </div>
                      </div>

                      {/* Photo 2 Upload Box */}
                      <div className="space-y-2">
                        <label className="font-sans text-[10px] tracking-wider uppercase text-gray-300 block font-semibold text-center">Photo 2 (Full-length / Runway)</label>
                        <div className="border-2 border-dashed border-luxury-border/40 hover:border-luxury-gold/50 bg-luxury-onyx rounded-2xl h-56 flex flex-col items-center justify-center overflow-hidden relative group transition-colors cursor-pointer">
                          {photo2Preview ? (
                            <>
                              <img src={photo2Preview} alt="Preview 2" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <span className="font-sans text-xs text-luxury-gold uppercase font-bold">Change Image</span>
                              </div>
                            </>
                          ) : (
                            <div className="text-center p-4">
                              <span className="text-3xl block mb-2">💃</span>
                              <span className="font-sans text-[11px] text-gray-400 block font-medium">Click to select image</span>
                              <span className="font-sans text-[9px] text-gray-500 block mt-1">JPEG or PNG under 3MB</span>
                            </div>
                          )}
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={e => handleFileChange(e, 2)}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                        </div>
                      </div>

                    </div>

                    {errorMsg && (
                      <div className="p-4 bg-red-950/20 border border-red-500/30 text-red-400 font-sans text-xs text-center rounded-xl">
                        {errorMsg}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-6 border-t border-luxury-border/30 mt-8">
                  {step > 1 ? (
                    <button 
                      type="button" 
                      onClick={handlePrevStep}
                      disabled={isSubmitting}
                      className="font-sans text-xs tracking-widest uppercase border border-luxury-border/60 hover:border-white text-gray-300 hover:text-white px-6 py-3 rounded-full transition-colors font-bold disabled:opacity-50"
                    >
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < stepsCount ? (
                    <button 
                      type="button" 
                      onClick={handleNextStep}
                      className="font-sans text-xs tracking-widest uppercase gold-gradient-bg text-luxury-onyx hover:brightness-110 px-8 py-3 rounded-full transition-all font-bold"
                    >
                      Continue
                    </button>
                  ) : (
                    <button 
                      type="button" 
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="font-sans text-xs tracking-widest uppercase gold-gradient-bg text-luxury-onyx hover:brightness-110 px-8 py-3 rounded-full transition-all font-bold disabled:opacity-50 min-w-[150px] flex items-center justify-center"
                    >
                      {isSubmitting ? "Uploading Profile..." : "Submit Profile"}
                    </button>
                  )}
                </div>

              </form>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
