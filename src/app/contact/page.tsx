import React from "react";
import { siteData } from "@/content/site-data";

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto pt-32 pb-24 px-6 md:px-8 min-h-[80vh] flex flex-col justify-center">
      
      {/* Premium Card Container */}
      <div className="bg-luxury-darkcard border border-luxury-border/80 rounded-2xl p-8 md:p-12 shadow-[0_10px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
        {/* Subtle decorative gold-glow corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/5 blur-3xl rounded-full pointer-events-none" />
        
        {/* Title & Badge */}
        <div className="border-b border-luxury-border/50 pb-8 mb-8 text-center md:text-left">
          <span className="font-sans text-[10px] tracking-[0.25em] text-luxury-gold uppercase font-bold bg-luxury-gold/5 px-4 py-1.5 border border-luxury-gold/25 rounded-full inline-block mb-3">
            Official Helpdesk & Inquiries
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-white tracking-wide font-light mt-1">
            Contact Support
          </h1>
        </div>

        {/* Content Layout */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-stretch">
          
          {/* Left Side: Reassurance & Response Times */}
          <div className="md:col-span-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-white font-medium">
                Here to Assist You
              </h3>
              <p className="font-sans text-xs md:text-sm text-gray-400 leading-relaxed">
                Have questions about your upcoming Zoom audition, payment status, or candidate categories? Our support team is available to guide you.
              </p>
            </div>

            {/* Response Time Guarantee Box */}
            <div className="p-5 rounded-xl bg-luxury-onyx border border-luxury-border/40 space-y-3">
              <div className="flex items-center gap-2 text-luxury-gold">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-sans text-[10px] font-bold tracking-widest uppercase">Support SLA</span>
              </div>
              <p className="font-sans text-xs text-gray-300 leading-normal">
                Official queries are processed in chronological order. We aim to reply to all emails within <strong className="text-white">12-24 business hours</strong>.
              </p>
            </div>
          </div>

          {/* Right Side: Contact Details Grid */}
          <div className="md:col-span-6 space-y-4">
            
            {/* Support Email Card */}
            <a 
              href={`mailto:${siteData.contactEmail}`}
              className="block p-5 rounded-xl bg-luxury-onyx border border-luxury-border/60 hover:border-luxury-gold/50 transition-all duration-300 group text-decoration-none"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-luxury-gold/5 border border-luxury-gold/20 text-luxury-gold group-hover:bg-luxury-gold group-hover:text-luxury-onyx transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Email Address</p>
                  <p className="font-semibold text-white mt-0.5 group-hover:text-luxury-gold transition-colors text-xs sm:text-sm truncate">
                    {siteData.contactEmail}
                  </p>
                </div>
              </div>
            </a>

            {/* Corporate Entity Card */}
            <div className="p-5 rounded-xl bg-luxury-onyx border border-luxury-border/60">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-luxury-gold/5 border border-luxury-gold/20 text-luxury-gold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Registered Entity</p>
                  <p className="font-semibold text-white mt-0.5 text-xs sm:text-sm">
                    {siteData.organization}
                  </p>
                </div>
              </div>
            </div>

            {/* Executive Office */}
            <div className="p-5 rounded-xl bg-luxury-onyx border border-luxury-border/60">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-luxury-gold/5 border border-luxury-gold/20 text-luxury-gold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Founder / Director</p>
                  <p className="font-semibold text-white mt-0.5 text-xs sm:text-sm">
                    {siteData.founder}
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
      
    </div>
  );
}
