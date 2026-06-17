import React from "react";
import { siteData } from "@/content/site-data";

export default function ProcessWhatItBuys() {
  const { current, original, gstIncluded } = siteData.registrationFee;
  return (
    <section className="py-16 md:py-24 border-b border-luxury-border max-w-5xl mx-auto">
      
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="font-serif text-2xl md:text-4xl tracking-wide text-luxury-onyx">
          Audition Process & Inclusions
        </h2>
        <p className="font-sans text-xs tracking-widest uppercase text-luxury-stone mt-2">
          From Application to the Grand Stage
        </p>
        <div className="w-16 h-[1px] bg-luxury-gold/50 mx-auto mt-4" />
      </div>

      <div className="grid md:grid-cols-12 gap-8 items-start">
        
        {/* Left: 5-Step Timeline */}
        <div className="md:col-span-7 space-y-8 relative pl-6 border-l border-luxury-gold/30">
          {siteData.processSteps.map((step) => (
            <div key={step.step} className="relative space-y-1">
              {/* Timeline dot */}
              <span className="absolute -left-[30px] top-1.5 w-2 h-2 rounded-full bg-luxury-gold" />
              <span className="absolute -left-[38px] -top-0.5 text-[10px] font-sans text-luxury-gold bg-luxury-alabaster px-1">
                {step.step}
              </span>
              
              <h3 className="font-serif text-lg text-luxury-onyx font-medium">
                {step.title}
              </h3>
              <p className="font-sans text-xs md:text-sm text-luxury-stone leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Right: What ₹999 Buys & Post-Payment Reassurance */}
        <div className="md:col-span-5 bg-[#FCFAF7] border border-luxury-border p-6 md:p-8 space-y-6">
          <div>
            <span className="font-sans text-[10px] tracking-widest text-luxury-gold uppercase font-bold block mb-1">
              Fee Breakdown
            </span>
            <h3 className="font-serif text-xl text-luxury-onyx">
              What Your Registration Covers
            </h3>
          </div>

          <div className="space-y-4">
            <p className="font-sans text-xs md:text-sm text-luxury-onyx leading-relaxed">
              For only <strong className="text-lg text-luxury-gold">₹{current}</strong> (Anchored against <del className="text-luxury-stone">₹{original}</del>) {gstIncluded ? "inclusive of GST" : ""}:
            </p>

            <ul className="space-y-2 font-sans text-xs text-luxury-stone leading-relaxed">
              <li>• Direct registration code for the Zoom Auditions.</li>
              <li>• Access to pre-audition training webinars.</li>
              <li>• Evaluation by our 9-member Grand Jury panel.</li>
              <li>• Inclusion in national casting database for 1 year.</li>
            </ul>
          </div>

          {/* Explicit Post-Payment Reassurance Block */}
          <div className="p-4 border-l-2 border-green-700 bg-green-50/50 space-y-1">
            <span className="font-sans text-[9px] tracking-widest uppercase text-green-800 font-bold block">
              Instant Reassurance
            </span>
            <p className="font-sans text-xs text-green-900 leading-normal">
              <strong>What happens after you pay:</strong> Within 24 hours of successful payment, you will receive an automated WhatsApp confirmation containing your Zoom audition schedule, checklist, and preparatory guide.
            </p>
          </div>
        </div>

      </div>

      <div className="text-center mt-12">
        <a 
          href="#register" 
          className="inline-block font-sans text-xs tracking-widest uppercase bg-luxury-gold text-luxury-onyx px-8 py-4 font-bold shadow-md hover:bg-luxury-onyx hover:text-luxury-gold transition-all duration-300"
        >
          Apply for Auditions
        </a>
      </div>

    </section>
  );
}
