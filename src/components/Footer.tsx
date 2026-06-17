import React from "react";
import Link from "next/link";
import { siteData } from "@/content/site-data";

export default function Footer() {
  return (
    <footer className="bg-luxury-darkcard text-[#F5F2EC] border-t border-luxury-border py-16 mt-16 font-sans relative">
      {/* Subtle gold top-line glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent" />
      
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-8">
        
        {/* Left Side: Brand Logo, Organization Info */}
        <div className="md:col-span-7 space-y-4">
          <div className="flex items-center gap-3">
            <img 
              src={siteData.logo} 
              alt={`${siteData.brandName} Logo`} 
              className="w-8 h-8 object-contain border border-luxury-gold/40 rounded-full bg-white/5 p-0.5"
            />
            <span className="font-serif tracking-widest text-lg font-bold text-white">
              {siteData.brandName}
            </span>
          </div>
          <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
            {siteData.organization}. Official national beauty pageant and talent discovery launchpad.
          </p>
          <div className="space-y-1 text-xs text-gray-400">
            <p><strong className="text-gray-300">Founder & Director:</strong> {siteData.founder}</p>
            <p>
              <strong className="text-gray-300">Contact Email:</strong>{" "}
              <a href={`mailto:${siteData.contactEmail}`} className="text-luxury-gold hover:text-luxury-gold-light transition-colors duration-200">
                {siteData.contactEmail}
              </a>
            </p>
          </div>
        </div>

        {/* Right Side: Quick Links */}
        <div className="md:col-span-5 flex flex-col space-y-4">
          <h4 className="font-serif text-sm tracking-widest text-luxury-gold uppercase font-semibold">
            Information & Policy
          </h4>
          <div className="flex flex-col space-y-2.5 text-xs text-gray-400">
            <Link href="/" className="hover:text-luxury-gold transition-colors duration-200 text-decoration-none">
              Funnel Home
            </Link>
            <Link href="/about" className="hover:text-luxury-gold transition-colors duration-200 text-decoration-none">
              About Founder & Org
            </Link>
            <Link href="/contact" className="hover:text-luxury-gold transition-colors duration-200 text-decoration-none">
              Contact Support
            </Link>
            <Link href="/privacy-refund" className="hover:text-luxury-gold transition-colors duration-200 text-decoration-none">
              Privacy Policy & Refund Terms
            </Link>
          </div>
        </div>

        {/* Phase 4 Trust Badges for the Funnel Footer */}
        <div className="md:col-span-12 border-t border-luxury-border/50 pt-8 mt-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="p-2 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h5 className="text-[10px] font-bold text-white tracking-widest uppercase">100% Secure Audition</h5>
              <p className="text-[10px] text-gray-400 leading-tight mt-0.5">SSL encrypted payment gateway</p>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="p-2 rounded-full bg-blue-950/40 border border-blue-500/20 text-blue-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a3 3 0 016 0m-5 9l2 2 4-4" />
              </svg>
            </div>
            <div>
              <h5 className="text-[10px] font-bold text-white tracking-widest uppercase">Direct Jury Evaluation</h5>
              <p className="text-[10px] text-gray-400 leading-tight mt-0.5">No agents, brokers or middlemen</p>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="p-2 rounded-full bg-amber-950/40 border border-amber-500/20 text-luxury-gold">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <div>
              <h5 className="text-[10px] font-bold text-white tracking-widest uppercase">Government Registered</h5>
              <p className="text-[10px] text-gray-400 leading-tight mt-0.5">Operated by {siteData.organization}</p>
            </div>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="max-w-6xl mx-auto px-6 mt-12 pt-6 border-t border-gray-800/60 text-center text-[10px] text-gray-500 tracking-wider">
        © {new Date().getFullYear()} {siteData.brandName}. All rights reserved. Secure payment gateway integrations.
      </div>
    </footer>
  );
}
