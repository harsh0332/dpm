"use client";

import React, { useState, useEffect } from "react";
import { siteData } from "@/content/site-data";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  // Countdown Calculation Logic
  const calculateTimeLeft = () => {
    const difference = +new Date(siteData.config.countdownTarget) - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setMounted(true);
      setTimeLeft(calculateTimeLeft());
    }, 0);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    const handleScroll = () => {
      if (window.innerWidth < 1024 && window.scrollY > 380) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      clearTimeout(timerId);
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section className="hero-scope relative min-h-screen pt-28 pb-16 flex flex-col items-center justify-center px-4 overflow-hidden bg-[radial-gradient(120%_60%_at_50%_-5%,#251C3B_0%,#171127_50%,#100C1A_100%)] lg:bg-[radial-gradient(115%_90%_at_16%_-5%,#251C3B_0%,#171127_52%,#100C1A_100%)]">
      
      {/* Ambient Jewel Glows */}
      <div className="absolute top-[-120px] right-[-90px] lg:top-[-160px] lg:left-[34%] w-[340px] h-[340px] lg:w-[560px] lg:h-[560px] rounded-full bg-[radial-gradient(circle,rgba(59,95,204,0.22),transparent_70%)] filter blur-[20px] animate-drift-a pointer-events-none z-0" />
      <div className="absolute bottom-[60px] left-[-120px] lg:bottom-[-200px] lg:right-[-60px] w-[320px] h-[320px] lg:w-[620px] lg:h-[620px] rounded-full bg-[radial-gradient(circle,rgba(199,69,138,0.18),transparent_70%)] filter blur-[20px] animate-drift-b pointer-events-none z-0" />
      
      {/* Top shadow overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/18 to-transparent pointer-events-none z-0" />

      {/* Main Grid Container */}
      <div className="w-full max-w-[1200px] mx-auto px-1.5 lg:px-[70px] z-10 relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: TEXT CONTENT & ACTIONS */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 w-full">
            
            {/* Tag / Kicker Badge */}
            <div className="animate-fadeup inline-flex items-center gap-2 px-4 py-2 border border-[#D4AF55]/42 rounded-full bg-[#D4AF55]/6" style={{ animationDelay: '0.04s' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF55] shadow-[0_0_8px_#D4AF55] animate-pulse-dot" />
              <span className="font-bold text-[8.5px] lg:text-[10.5px] tracking-[0.18em] lg:tracking-[0.22em] uppercase text-[#E7C877]">
                Official National Auditions Active
              </span>
            </div>

            {/* Event Name (Desktop only) */}
            <div className="animate-fadeup font-semibold text-xs tracking-[0.16em] uppercase text-[#8A8597] hidden lg:block" style={{ animationDelay: '0.1s' }}>
              {siteData.eventName}
            </div>

            {/* Title (Staggered Words Reveal on Desktop) */}
            <div className="animate-fadeup lg:animate-none w-full" style={{ animationDelay: '0.12s' }}>
              <h1 className="margin-0 font-serif font-semibold text-[35px] lg:text-[64px] leading-[1.08] lg:leading-[1.06] tracking-[-0.01em] text-[#F6F3EE]">
                <span className="lg:animate-fadeup inline-block mr-2 lg:mr-3" style={{ animationDelay: '0.16s' }}>The</span>
                <span className="lg:animate-fadeup inline-block mr-2 lg:mr-3" style={{ animationDelay: '0.2s' }}>Stage</span>
                <span className="lg:animate-fadeup inline-block mr-2 lg:mr-3" style={{ animationDelay: '0.24s' }}>for</span>
                <span className="lg:animate-fadeup inline-block mr-2 lg:mr-3" style={{ animationDelay: '0.28s' }}>India&rsquo;s</span>
                <span className="lg:animate-fadeup inline-block mr-2 lg:mr-3" style={{ animationDelay: '0.32s' }}>Next</span>
                <br className="hidden lg:inline" />
                <span className="lg:animate-fadeup inline-block font-bold italic bg-gradient-to-r from-[#F3D78A] via-[#E0B65A] via-[#C7458A] to-[#5470D9] bg-clip-text text-transparent" style={{ animationDelay: '0.44s' }}>Crowned Icon</span>
              </h1>
            </div>

            {/* Urvashi Verified Card (Mobile only) */}
            <div className="animate-fadeup block lg:hidden w-full relative" style={{ animationDelay: '0.2s' }}>
              <div className="relative p-[1.5px] rounded-[24px] bg-gradient-to-br from-[#5470D9]/75 via-[#C7458A]/55 to-[#D4AF55]/45 shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
                <div className="relative w-full aspect-[3/4] rounded-[23px] overflow-hidden bg-[radial-gradient(120%_80%_at_50%_8%,#2B2142_0%,#160F23_72%)]">
                  
                  {/* Inner ambient glows */}
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[220px] h-[220px] rounded-full bg-[radial-gradient(circle,rgba(84,112,217,0.32),transparent_68%)] filter blur-[10px] animate-drift-a pointer-events-none" />
                  <div className="absolute bottom-[40px] left-[20px] w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle,rgba(199,69,138,0.28),transparent_68%)] filter blur-[10px] animate-drift-b pointer-events-none" />
                  
                  {/* Image */}
                  <img src={siteData.celebrityPatron.image} alt={siteData.celebrityPatron.name} className="absolute left-0 bottom-0 w-full h-full object-cover object-top pointer-events-none z-10" />
                  
                  {/* Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0811]/94 via-[#0B0811]/40 to-transparent pointer-events-none z-15" />
                  
                  {/* Verified Badge top-left */}
                  <div className="absolute top-[12px] left-[12px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0C0912]/62 backdrop-blur-[10px] border border-[#D4AF55]/50 z-20">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F3D78A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.4 12 2.3 2.3L15.7 9.6"/></svg>
                    <span className="font-bold text-[7.5px] tracking-[0.1em] uppercase text-[#F3D78A]">{siteData.celebrityPatron.title}</span>
                  </div>

                  {/* Bottom text overlays */}
                  <div className="absolute left-[16px] right-[16px] bottom-[16px] flex flex-col gap-2 z-20 text-left">
                    <div>
                      <div className="font-bold text-[8px] tracking-[0.2em] uppercase text-[#E7C877] mb-0.5">Meet &amp; get crowned by</div>
                      <div className="font-serif font-bold text-[22px] leading-none text-white">{siteData.celebrityPatron.name}</div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {siteData.celebrityPatron.credentials.map((cred, idx) => (
                        <span key={idx} className="font-semibold text-[8px] leading-none text-[#1A1206] bg-gradient-to-br from-[#F7DD93] to-[#D4AF55] px-2.5 py-1 rounded-full">{cred}</span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Paragraph / Subtext (Desktop only) */}
            <p className="animate-fadeup font-sans text-base text-[#B9B3C7] max-w-[486px] leading-relaxed hidden lg:block" style={{ animationDelay: '0.5s' }}>
              DPM Mr, Miss, Mrs &amp; Miss Teen India 2026 &mdash; a transparent, mentor-led runway from audition to the national grand finale.
            </p>

            {/* Desktop CTA & Checkout Info (Desktop only) */}
            <div className="animate-fadeup hidden lg:flex items-center gap-5 mt-1.5" style={{ animationDelay: '0.62s' }}>
              <a href="#register" className="btn-shimmer-sweep relative inline-flex items-center gap-2.5 h-[54px] px-[30px] rounded-full bg-gradient-to-br from-[#F7DD93] via-[#D4AF55] to-[#AA7C11] text-[#1A1206] font-bold text-[12.5px] tracking-[0.16em] uppercase shadow-[0_14px_34px_rgba(212,175,85,0.28)] hover:brightness-105 transition-all duration-300">
                Apply for Auditions Now
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13"/><path d="m12 6 6 6-6 6"/></svg>
              </a>
            </div>

            {/* Mobile CTA (Mobile only) */}
            <a href="#register" className="animate-fadeup btn-shimmer-sweep flex lg:hidden items-center justify-center gap-2.5 h-[54px] w-full rounded-[15px] bg-gradient-to-br from-[#F7DD93] via-[#D4AF55] to-[#AA7C11] text-[#1A1206] font-bold text-[13px] tracking-[0.14em] uppercase shadow-[0_12px_30px_rgba(212,175,85,0.28)]" style={{ animationDelay: '0.28s' }}>
              Apply for Auditions Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13"/><path d="m12 6 6 6-6 6"/></svg>
            </a>

            {/* Unified Countdown Timer Placeholder Wrapper */}
            <div className="w-full max-w-[480px] min-h-[110px] lg:min-h-[120px] relative">
              {mounted && (
                <div className={`transition-all duration-300 w-full ${
                  isSticky 
                    ? "fixed top-[70px] left-[50%] -translate-x-[50%] w-[92%] max-w-[480px] z-45 bg-[#0D0915]/95 backdrop-blur-[12px] border border-[#D4AF55]/40 rounded-[16px] p-3 shadow-[0_15px_35px_rgba(0,0,0,0.8)] lg:relative lg:top-0 lg:left-0 lg:translate-x-0 lg:w-full lg:max-w-none lg:border-white/10 lg:bg-[#0D0915]/55 lg:p-[13px_14px] lg:shadow-none" 
                    : "relative bg-[#0D0915]/55 backdrop-blur-[12px] border border-white/10 rounded-[16px] p-[13px_14px]"
                }`}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="flex items-center gap-1.5 font-bold text-[8.5px] lg:text-[9px] tracking-[0.12em] lg:tracking-[0.14em] uppercase text-[#E7C877]">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E0567E] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#E0567E]"></span>
                      </span>
                      Auditions deadline
                    </span>
                    <span className="font-bold text-[8.5px] lg:text-[9px] tracking-[0.08em] lg:tracking-[0.1em] uppercase text-white">
                      {siteData.config.slotsRemaining} slots remaining
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    {[
                      { label: "Days", value: timeLeft.days },
                      { label: "Hours", value: timeLeft.hours },
                      { label: "Mins", value: timeLeft.minutes },
                      { label: "Secs", value: timeLeft.seconds },
                    ].map((item, i) => (
                      <div key={i} className="flex-1 text-center bg-white/5 border border-white/7 rounded-[9px] py-1.5">
                        <div className="font-serif font-bold text-[18px] lg:text-[20px] leading-none text-white">{String(item.value).padStart(2, "0")}</div>
                        <div className="font-semibold text-[7px] lg:text-[7.5px] tracking-[0.1em] lg:tracking-[0.12em] uppercase text-[#8A8597] mt-1">{item.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden mt-2">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#5470D9] via-[#C7458A] to-[#F3D78A]" style={{ width: `${(siteData.config.slotsRemaining / siteData.config.maxSlotsPerState) * 100}%` }} />
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Checkout Info (Desktop only) */}
            <div className="animate-fadeup hidden lg:flex items-center gap-2 mt-1" style={{ animationDelay: '0.68s' }}>
              <svg className="w-[15px] h-[15px] text-[#9C97A6]" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="11" width="14" height="9.5" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>
              <div className="text-left leading-[1.3]">
                <div className="font-semibold text-[11px] text-[#C9C4D2]">Razorpay secured checkout</div>
                <div className="font-medium text-[10px] text-[#7A7682] mt-0.5">Registration &#8377;{siteData.registrationFee.current} &middot; all-inclusive</div>
              </div>
            </div>

            {/* Mobile Trust Chips (Mobile only) */}
            <div className="animate-fadeup flex lg:hidden gap-1.5 w-full mt-1" style={{ animationDelay: '0.34s' }}>
              <div className="flex-1 flex items-center justify-center gap-1.5 py-2 px-1 rounded-[11px] bg-white/4 border border-white/7">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#D4AF55" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="9.5" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>
                <span className="font-bold text-[8px] tracking-[0.04em] uppercase text-[#C9C4D2]">Razorpay Secured</span>
              </div>
              <div className="flex-1 flex items-center justify-center gap-1.5 py-2 px-1 rounded-[11px] bg-white/4 border border-white/7">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#D4AF55" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.4 12 2.3 2.3L15.7 9.6"/></svg>
                <span className="font-bold text-[8px] tracking-[0.04em] uppercase text-[#C9C4D2]">Celebrity Patron</span>
              </div>
              <div className="flex-1 flex items-center justify-center gap-1.5 py-2 px-1 rounded-[11px] bg-white/4 border border-white/7">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#D4AF55" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 4 5v6c0 5 3.5 8.4 8 9.9 4.5-1.5 8-4.9 8-9.9V5l-8-3Z"/><path d="m8.8 12 2.1 2.1 4.3-4.3"/></svg>
                <span className="font-bold text-[8px] tracking-[0.04em] uppercase text-[#C9C4D2]">Secure Payment</span>
              </div>
            </div>

            {/* Desktop Trust Badges (Desktop only) */}
            <div className="animate-fadeup hidden lg:flex flex-wrap gap-x-6 gap-y-3.5 items-center mt-2 text-[#C9C4D2] text-[11px] font-semibold tracking-[0.08em] uppercase" style={{ animationDelay: '0.56s' }}>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF55" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 4 5v6c0 5 3.5 8.4 8 9.9 4.5-1.5 8-4.9 8-9.9V5l-8-3Z"/><path d="m8.8 12 2.1 2.1 4.3-4.3"/></svg>
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF55" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.4 12 2.3 2.3L15.7 9.6"/></svg>
                <span>Past Winners</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF55" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="9.5" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>
                <span>Razorpay Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF55" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M3.6 19c0-3 2.4-5 5.4-5s5.4 2 5.4 5"/><path d="M16.2 5.4a3 3 0 0 1 0 5.6"/><path d="M18.4 19c0-2.3-1-4-2.6-4.8"/></svg>
                <span>{siteData.config.careersLaunched} Careers Launched</span>
              </div>
            </div>

            {/* Desktop Stat Band (Desktop only) */}
            <div className="animate-fadeup hidden lg:flex items-center w-full max-w-[580px] border-t border-b border-[#D4AF55]/18 py-[22px] mt-4" style={{ animationDelay: '0.68s' }}>
              <div className="flex-1 flex flex-col gap-1.5">
                <strong className="font-serif font-bold text-[34px] leading-none text-white">{siteData.config.careersLaunched}</strong>
                <span className="font-semibold text-[9.5px] leading-[1.2] tracking-[0.13em] uppercase text-[#8A8597]">Careers Launched</span>
              </div>
              <span className="w-[1px] h-[42px] bg-gradient-to-b from-transparent via-[#C7458A]/55 via-[#5470D9]/55 to-transparent"></span>
              <div className="flex-1 flex flex-col gap-1.5 pl-6">
                <strong className="font-serif font-bold text-[34px] leading-none text-white">{siteData.config.prizesPool}</strong>
                <span className="font-semibold text-[9.5px] leading-[1.2] tracking-[0.13em] uppercase text-[#8A8597]">Prize Pool</span>
              </div>
              <span className="w-[1px] h-[42px] bg-gradient-to-b from-transparent via-[#C7458A]/55 via-[#5470D9]/55 to-transparent"></span>
              <div className="flex-1 flex flex-col gap-1.5 pl-6">
                <strong className="font-serif font-bold text-[34px] leading-none text-white">{siteData.config.categoriesCount}</strong>
                <span className="font-semibold text-[9.5px] leading-[1.2] tracking-[0.13em] uppercase text-[#8A8597]">Categories</span>
              </div>
              <span className="w-[1px] h-[42px] bg-gradient-to-b from-transparent via-[#C7458A]/55 via-[#5470D9]/55 to-transparent"></span>
              <div className="flex-1 flex flex-col gap-1.5 pl-6">
                <strong className="font-serif font-bold text-[34px] leading-none text-white">{siteData.config.groomingSupport}</strong>
                <span className="font-semibold text-[9.5px] leading-[1.2] tracking-[0.13em] uppercase text-[#8A8597]">Grooming Support</span>
              </div>
            </div>

            {/* Mobile Stats Grid 2x2 (Mobile only) */}
            <div className="animate-fadeup grid grid-cols-2 gap-[1px] bg-[#D4AF55]/16 border border-[#D4AF55]/16 rounded-[15px] overflow-hidden lg:hidden w-full mt-4" style={{ animationDelay: '0.4s' }}>
              <div className="bg-[#160F23] p-[14px_16px] flex flex-col gap-1 text-left">
                <strong className="font-serif font-bold text-[27px] leading-none text-white">{siteData.config.careersLaunched}</strong>
                <span className="font-semibold text-[8.5px] leading-[1.2] tracking-[0.15em] uppercase text-[#8A8597]">Careers Launched</span>
              </div>
              <div className="bg-[#160F23] p-[14px_16px] flex flex-col gap-1 text-left">
                <strong className="font-serif font-bold text-[27px] leading-none text-white">{siteData.config.prizesPool}</strong>
                <span className="font-semibold text-[8.5px] leading-[1.2] tracking-[0.15em] uppercase text-[#8A8597]">Prize Pool</span>
              </div>
              <div className="bg-[#160F23] p-[14px_16px] flex flex-col gap-1 text-left">
                <strong className="font-serif font-bold text-[27px] leading-none text-white">{siteData.config.categoriesCount}</strong>
                <span className="font-semibold text-[8.5px] leading-[1.2] tracking-[0.15em] uppercase text-[#8A8597]">Categories</span>
              </div>
              <div className="bg-[#160F23] p-[14px_16px] flex flex-col gap-1 text-left">
                <strong className="font-serif font-bold text-[27px] leading-none text-white">{siteData.config.groomingSupport}</strong>
                <span className="font-semibold text-[8.5px] leading-[1.2] tracking-[0.15em] uppercase text-[#8A8597]">Grooming Support</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: CELEBRITY CENTERPIECE & COUNTDOWN (Desktop only) */}
          <div className="animate-fadeup lg:col-span-5 hidden lg:block w-full relative" style={{ animationDelay: '0.34s' }}>
            <div className="relative p-[1.5px] rounded-[30px] bg-gradient-to-br from-[#5470D9]/75 via-[#C7458A]/55 to-[#D4AF55]/45 shadow-[0_30px_70px_rgba(0,0,0,0.45)]">
              <div className="relative h-[606px] rounded-[29px] overflow-hidden bg-[radial-gradient(120%_80%_at_50%_8%,#2B2142_0%,#160F23_72%)]">
                
                {/* Inner ambient glows */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[340px] h-[340px] rounded-full bg-[radial-gradient(circle,rgba(84,112,217,0.32),transparent_68%)] filter blur-[14px] animate-drift-a pointer-events-none" />
                <div className="absolute bottom-[60px] left-[30px] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(199,69,138,0.28),transparent_68%)] filter blur-[14px] animate-drift-b pointer-events-none" />
                
                {/* Chief Guest Image */}
                <img 
                  src={siteData.celebrityPatron.image} 
                  alt={siteData.celebrityPatron.name} 
                  className="absolute left-0 bottom-0 w-full h-full object-cover object-top filter grayscale contrast-[1.02] hover:grayscale-0 hover:scale-[1.03] transition-all duration-700 pointer-events-none z-10" 
                />
                
                {/* Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0811]/94 via-[#0B0811]/40 to-transparent pointer-events-none z-15" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B0811]/5 to-transparent pointer-events-none z-15" />
                
                {/* Verified Badge */}
                <div className="absolute top-[18px] left-[18px] inline-flex items-center gap-2 px-[14px] py-2 rounded-full bg-[#0C0912]/62 backdrop-blur-[10px] border border-[#D4AF55]/50 z-20">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#F3D78A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.4 12 2.3 2.3L15.7 9.6"/></svg>
                  <span className="font-bold text-[9.5px] tracking-[0.16em] uppercase text-[#F3D78A]">{siteData.celebrityPatron.title}</span>
                </div>
                
                {/* Bottom text overlays */}
                <div className="absolute left-[18px] right-[18px] bottom-[24px] flex flex-col gap-3 z-20 text-left">
                  <div>
                    <div className="font-bold text-[9px] tracking-[0.2em] uppercase text-[#E7C877] mb-1">Meet &amp; get crowned by</div>
                    <div className="font-serif font-bold text-[28px] leading-none text-white">{siteData.celebrityPatron.name}</div>
                  </div>
                  <div className="flex flex-wrap gap-[7px]">
                    {siteData.celebrityPatron.credentials.map((cred, idx) => (
                      <span key={idx} className="font-semibold text-[10px] leading-none text-[#1A1206] bg-gradient-to-br from-[#F7DD93] to-[#D4AF55] px-3 py-1.5 rounded-full">{cred}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
