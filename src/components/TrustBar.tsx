"use client";

import React from "react";
import Link from "next/link";
import { siteData } from "@/content/site-data";

export default function TrustBar() {
  return (
    <div className="w-full bg-ivory text-ink py-3.5 px-6 border-b border-luxury-border/30 font-sans z-20 relative shadow-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold">
        
        {/* Legitimacy Info */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {/* Registered Org */}
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-luxury-gold" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="tracking-wide">{siteData.organization}</span>
          </span>

          {/* Contact Support */}
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-luxury-gold" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a href={`mailto:${siteData.contactEmail}`} className="hover:text-jewel-sapphire transition-colors duration-200 underline">
              {siteData.contactEmail}
            </a>
          </span>

          {/* GST Inclusion Indicator */}
          {siteData.registrationFee.gstIncluded && (
            <span className="flex items-center gap-1 bg-emerald-500/10 text-jewel-emerald px-2 py-0.5 border border-emerald-500/20 rounded text-[10px]">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
              </svg>
              <span>GST Included</span>
            </span>
          )}
        </div>

        {/* Payments Gateway & Refund link */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <span className="flex items-center gap-2 text-jewel-sapphire bg-jewel-sapphire/5 border border-jewel-sapphire/10 px-2.5 py-0.5 rounded">
            <svg className="w-3.5 h-3.5 text-jewel-sapphire" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Payments via Razorpay</span>
          </span>

          <span className="text-gray-300 hidden sm:inline">|</span>

          <Link href="/privacy-refund" className="text-jewel-rose hover:text-jewel-rose/80 hover:underline transition-colors duration-200">
            Read Refund Policy
          </Link>
        </div>

      </div>
    </div>
  );
}
