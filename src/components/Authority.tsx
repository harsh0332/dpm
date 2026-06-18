import React from "react";
import { siteData } from "@/content/site-data";

export default function Authority() {
  return (
    <section className="py-8 md:py-16 my-6 md:my-12 bg-luxury-alabaster text-luxury-onyx rounded-[2rem] border border-luxury-border max-w-5xl mx-auto px-6 md:px-12 shadow-xl relative overflow-hidden">
      
      {/* Title */}
      <div className="text-center mb-10">
        <span className="text-[10px] font-sans tracking-[0.25em] text-luxury-gold-dark uppercase block font-semibold">
          Organization Legitimacy
        </span>
        <h2 className="font-serif text-2xl md:text-4xl tracking-wide text-luxury-onyx font-light mt-1">
          The Leadership & Organization
        </h2>
        <div className="w-16 h-[1px] bg-luxury-gold/50 mx-auto mt-4" />
      </div>

      <div className="grid md:grid-cols-12 gap-8 items-center bg-white border border-luxury-border p-6 md:p-10 rounded-2xl shadow-sm">
        
        {/* Left / Founder Info */}
        <div className="md:col-span-7 space-y-4">
          <span className="font-sans text-[10px] tracking-widest text-luxury-gold-dark uppercase font-bold">
            Founder & Director
          </span>
          <h3 className="font-serif text-2xl md:text-3xl text-luxury-onyx">
            {siteData.founder}
          </h3>
          <p className="font-sans text-xs md:text-sm text-luxury-stone leading-relaxed">
            Leading {siteData.brandName} with a vision to build transparent, professional pageantry in India. By establishing direct auditions and eliminating mid-level talent brokers, DPM has opened doors for thousands of aspiring models.
          </p>

        </div>

        {/* Right / Organization Legitimacy */}
        <div className="md:col-span-5 p-6 border-t md:border-t-0 md:border-l border-luxury-border space-y-4">
          <h4 className="font-sans text-xs tracking-wider uppercase text-luxury-onyx font-bold">
            Official Organization Details
          </h4>
          <div className="space-y-3 font-sans text-xs text-luxury-stone">
            <p>
              <strong>Inquiries:</strong> {siteData.contactEmail}
            </p>
          </div>
          
          {/* Trust Seal Crest */}
          <div className="mt-4 bg-luxury-gold/5 border border-luxury-gold/30 p-4 text-center rounded-xl flex items-center justify-center gap-2">
            <svg className="w-5 h-5 text-luxury-gold shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            <span className="text-[10px] font-sans tracking-widest uppercase text-luxury-gold-dark font-semibold">
              Verifiable Pageant Producer
            </span>
          </div>
        </div>

      </div>

    </section>
  );
}
