import React from "react";
import { siteData } from "@/content/site-data";

export default function SocialProof() {
  return (
    <section className="py-8 md:py-16 my-6 md:my-12 bg-luxury-alabaster text-luxury-onyx rounded-[2rem] border border-luxury-border max-w-5xl mx-auto px-6 md:px-12 shadow-xl relative overflow-hidden">
      
      {/* Title */}
      <div className="text-center mb-10">
        <span className="text-[10px] font-sans tracking-[0.25em] text-luxury-gold-dark uppercase block font-semibold">
          Alumni Success
        </span>
        <h2 className="font-serif text-2xl md:text-4xl tracking-wide text-luxury-onyx font-light mt-1">
          The Success <span className="crown-gradient-text font-bold">Framework</span>
        </h2>
        <p className="font-sans text-xs tracking-wider text-luxury-stone mt-2">
          Verifiable Success Stories & Testimonials
        </p>
        <div className="w-16 h-[1px] bg-luxury-gold/50 mx-auto mt-4" />
      </div>

      {/* Grid of Testimonials */}
      <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-10">
        {siteData.testimonials.map((t) => (
          <div key={t.id} className="p-6 border border-luxury-border bg-white rounded-2xl flex flex-col justify-between shadow-sm">
            <p className="font-serif italic text-base text-luxury-onyx leading-relaxed">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-6 pt-4 border-t border-luxury-border flex justify-between items-center">
              <div>
                <cite className="font-sans text-xs font-bold text-luxury-onyx not-italic">
                  {t.author}
                </cite>
                <span className="font-sans text-[10px] text-luxury-stone block">
                  {t.role}
                </span>
              </div>
              {t.date && (
                <span className="font-sans text-[10px] text-luxury-gold-dark font-semibold tracking-wider">
                  Season {t.date}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Past Seasons */}
      <div className="pt-4 border-t border-luxury-border/30">
        <h3 className="font-serif text-xl text-luxury-onyx text-center mb-6">
          Past Seasons & Legacy
        </h3>
        <div className="grid sm:grid-cols-2 gap-6">
          {siteData.pastEvents.map((pe) => (
            <div key={pe.id} className="p-6 border border-luxury-border bg-white rounded-2xl space-y-2 shadow-sm">
              <div className="flex justify-between items-center">
                <h4 className="font-serif text-base font-semibold text-luxury-onyx">
                  {pe.title}
                </h4>
                <span className="font-sans text-[10px] text-luxury-gold-dark font-bold">
                  {pe.year}
                </span>
              </div>
              <p className="font-sans text-xs text-luxury-stone leading-relaxed">
                {pe.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-10">
        <a 
          href="#register" 
          className="inline-flex items-center justify-center font-sans text-xs tracking-widest uppercase gold-gradient-bg text-luxury-onyx px-8 h-12 font-bold shadow-lg rounded-full hover:brightness-110 transition-all duration-300 btn-shimmer"
        >
          Apply for Auditions
        </a>
      </div>

    </section>
  );
}
