import React from "react";
import { siteData } from "@/content/site-data";

export default function PrivacyRefundPage() {
  const { current } = siteData.registrationFee;
  return (
    <div className="max-w-4xl mx-auto pt-32 pb-24 px-6 md:px-8 min-h-[80vh] flex flex-col justify-center">
      
      {/* Premium Card Container */}
      <div className="bg-luxury-darkcard border border-luxury-border/80 rounded-2xl p-8 md:p-12 shadow-[0_10px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
        {/* Subtle decorative gold-glow corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/5 blur-3xl rounded-full pointer-events-none" />
        
        {/* Title & Badge */}
        <div className="border-b border-luxury-border/50 pb-8 mb-8 text-center md:text-left">
          <span className="font-sans text-[10px] tracking-[0.25em] text-luxury-gold uppercase font-bold bg-luxury-gold/5 px-4 py-1.5 border border-luxury-gold/25 rounded-full inline-block mb-3">
            Legitimacy & Clear Commitments
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-white tracking-wide font-light mt-1">
            Privacy Policy & Refund Terms
          </h1>
        </div>

        {/* Content Layout */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-10">
          
          {/* Refund Terms Panel */}
          <div className="md:col-span-6 space-y-4 p-6 rounded-xl bg-luxury-onyx border border-luxury-border/60 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-luxury-gold">
                <svg className="w-5 h-5 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h2 className="font-serif text-lg text-white font-medium">
                  Refund Policy
                </h2>
              </div>
              <p className="font-sans text-xs md:text-sm text-gray-300 leading-relaxed">
                The registration fee of <strong className="text-white">₹{current}</strong> (inclusive of GST) is collected strictly to allocate your online Zoom audition slot, verify candidate eligibility, and resource jury review. Because these resources are committed instantly upon checkout, <strong className="text-luxury-gold">this entry fee is non-refundable</strong> under any circumstances.
              </p>
            </div>
            
            <div className="text-[10px] text-gray-500 border-t border-luxury-border/30 pt-3 mt-2">
              Payment is securely verified on successful transaction receipt.
            </div>
          </div>

          {/* Privacy Policy Panel */}
          <div className="md:col-span-6 space-y-4 p-6 rounded-xl bg-luxury-onyx border border-luxury-border/60 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-luxury-gold">
                <svg className="w-5 h-5 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <h2 className="font-serif text-lg text-white font-medium">
                  Privacy Policy
                </h2>
              </div>
              <p className="font-sans text-xs md:text-sm text-gray-300 leading-relaxed">
                We at {siteData.brandName} respect your privacy. The information you submit on our registration form (name, email, phone number, age, category, and city) is processed only to coordinate your audition slot and send preparatory kits. We do not sell, rent, or lease your contact information to third-party advertisers.
              </p>
            </div>

            <div className="text-[10px] text-gray-500 border-t border-luxury-border/30 pt-3 mt-2">
              All personal data is processed using 256-bit secure SSL encryption.
            </div>
          </div>

        </div>

      </div>
      
    </div>
  );
}
