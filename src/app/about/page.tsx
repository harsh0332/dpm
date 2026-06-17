import React from "react";
import { siteData } from "@/content/site-data";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto pt-32 pb-24 px-6 md:px-8 min-h-[80vh] flex flex-col justify-center">
      
      {/* Premium Card Container */}
      <div className="bg-luxury-darkcard border border-luxury-border/80 rounded-2xl p-8 md:p-12 shadow-[0_10px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
        {/* Subtle decorative gold-glow corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/5 blur-3xl rounded-full pointer-events-none" />
        
        {/* Title & Badge */}
        <div className="border-b border-luxury-border/50 pb-8 mb-8 text-center md:text-left">
          <span className="font-sans text-[10px] tracking-[0.25em] text-luxury-gold uppercase font-bold bg-luxury-gold/5 px-4 py-1.5 border border-luxury-gold/25 rounded-full inline-block mb-3">
            Corporate Leadership & Credibility
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-white tracking-wide font-light mt-1">
            About {siteData.brandName}
          </h1>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* Key Facts / Verification Badges */}
          <div className="md:col-span-5 space-y-4">
            <div className="p-5 rounded-xl bg-luxury-onyx border border-luxury-border/60 space-y-4">
              <h3 className="font-serif text-sm text-luxury-gold tracking-widest uppercase font-semibold border-b border-luxury-border/30 pb-2">
                Official Entity
              </h3>
              
              <div className="space-y-3 font-sans text-xs text-gray-300">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Registered Name</p>
                  <p className="font-semibold text-white mt-0.5">{siteData.organization}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Founder & Director</p>
                  <p className="font-semibold text-white mt-0.5">{siteData.founder}</p>
                </div>
              </div>
            </div>

            {/* Direct Audition Reassurance Stamp */}
            <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/10 flex items-start gap-3.5">
              <div className="text-emerald-400 mt-0.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="space-y-0.5">
                <h4 className="font-sans text-[11px] font-bold text-white tracking-wider uppercase">Direct Path Audition</h4>
                <p className="font-sans text-[10px] text-gray-400 leading-normal">
                  All Zoom live auditions are directly reviewed by our 9-member elite jury with zero middleman influence.
                </p>
              </div>
            </div>
          </div>

          {/* Main Narrative */}
          <div className="md:col-span-7 space-y-6 font-sans text-xs md:text-sm text-gray-300 leading-relaxed">
            <p>
              {siteData.brandName} is India&apos;s premier digital-first national talent discovery platform. Built upon the principles of transparent, meritocratic pageantry, we provide aspiring models and talent from tier-1, tier-2, and tier-3 cities a direct runway to the entertainment industry.
            </p>
            <p>
              Through our streamlined online audition funnel, candidates skip the expensive travel, agencies, and middleman brokers. For a simple entry fee of ₹{siteData.registrationFee.current}, candidates receive professional jury feedback, digital grooming guides, and direct evaluation.
            </p>
            <p className="border-t border-luxury-border/40 pt-6 text-[11px] md:text-xs text-gray-400 italic">
              &ldquo;Our vision is to democratize Indian pageantry. We search for charisma, grit, and authenticity—giving every candidate their fair moment in the spotlight.&rdquo;
            </p>
          </div>

        </div>

      </div>
      
    </div>
  );
}
