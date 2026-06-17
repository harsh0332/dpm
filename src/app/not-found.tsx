import React from "react";
import Link from "next/link";
import { siteData } from "@/content/site-data";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto py-24 px-6 text-center space-y-6 min-h-[60vh] flex flex-col items-center justify-center">
      
      <span className="font-sans text-[10px] tracking-widest text-luxury-gold uppercase font-bold block">
        Error 404
      </span>
      
      <h1 className="font-serif text-3xl md:text-5xl text-white tracking-wide font-light">
        Page Not Found
      </h1>
      
      <p className="font-sans text-xs md:text-sm text-gray-400 leading-relaxed max-w-md mx-auto">
        The page you are looking for does not exist or has been moved. You can return to the main registration page below.
      </p>

      <div className="pt-6">
        <Link 
          href="/" 
          className="inline-flex items-center justify-center font-sans text-xs tracking-widest uppercase gold-gradient-bg text-luxury-onyx px-8 h-12 font-bold shadow-lg rounded-full hover:brightness-110 transition-all duration-300"
        >
          Return to Registration
        </Link>
      </div>

    </div>
  );
}
