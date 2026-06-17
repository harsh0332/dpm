import React from "react";
import { siteData } from "@/content/site-data";

export default function AspirationProblem() {
  return (
    <section className="py-12 md:py-16 my-12 bg-luxury-alabaster text-luxury-onyx rounded-[2rem] border border-luxury-border max-w-5xl mx-auto px-6 md:px-12 shadow-xl relative overflow-hidden">
      
      {/* Title */}
      <div className="text-center mb-10">
        <span className="text-[10px] font-sans tracking-[0.25em] text-luxury-gold-dark uppercase block font-semibold">
          Industry Transparency
        </span>
        <h2 className="font-serif text-2xl md:text-4xl tracking-wide text-luxury-onyx font-light mt-1">
          Your Runway Journey <span className="crown-gradient-text font-bold">Starts Here</span>
        </h2>
        <div className="w-16 h-[1px] bg-luxury-gold/50 mx-auto mt-4" />
      </div>

      {/* Grid Layout: Pain vs. Dream */}
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        
        {/* Left: The Barriers (Scam-Sensitivity & Lack of access) */}
        <div className="p-6 border border-red-200/60 border-l-4 border-red-600 bg-red-50/40 rounded-2xl shadow-sm">
          <h3 className="font-serif italic text-lg text-red-950 mb-3 flex items-center gap-2">
            <span className="text-red-600 font-sans font-bold text-sm">⚠</span> The Barriers Aspirants Face
          </h3>
          <ul className="space-y-3 font-sans text-xs md:text-sm text-luxury-stone leading-relaxed">
            <li className="flex items-start gap-1.5">
              <span className="text-red-500">•</span>
              <span>Pageantry often feels closed, accessible only to those with major city connections.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-red-500">•</span>
              <span>Scam-sensitive industry where exorbitant, hidden agency fees scare away genuine talent.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-red-500">•</span>
              <span>The false belief that you need professional training or prior modeling experience to apply.</span>
            </li>
          </ul>
        </div>

        {/* Right: The DPM Promise & Dream */}
        <div className="p-6 border border-luxury-gold/30 border-l-4 border-luxury-gold bg-luxury-gold/5 rounded-2xl shadow-sm">
          <h3 className="font-serif italic text-lg text-luxury-gold-dark mb-3 flex items-center gap-2">
            <span className="text-luxury-gold font-sans font-bold text-sm">✓</span> The DPM Opportunity
          </h3>
          <ul className="space-y-3 font-sans text-xs md:text-sm text-luxury-onyx leading-relaxed">
            <li className="flex items-start gap-1.5">
              <span className="text-luxury-gold-dark font-bold">✓</span>
              <span><strong>Open to All:</strong> No prior runway experience required. We groom you from scratch.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-luxury-gold-dark font-bold">✓</span>
              <span><strong>Any City, Any Background:</strong> Auditions conducted online via Zoom so talent from all tiers is evaluated fairly.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-luxury-gold-dark font-bold">✓</span>
              <span><strong>Transparent Fees:</strong> A nominal ₹999 entry fee, inclusive of GST, with no hidden pre-finale costs.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* The Permission Statement */}
      <div className="mt-10 text-center p-6 border border-luxury-border bg-white rounded-2xl max-w-3xl mx-auto shadow-sm">
        <p className="font-serif text-base text-luxury-onyx italic">
          &ldquo;Whether you are a college student, working professional, or a homemaker—this platform belongs to you. Your age, city, or height is no longer a barrier.&rdquo;
        </p>
      </div>

    </section>
  );
}
