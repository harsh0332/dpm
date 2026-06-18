import React from "react";
import Hero from "@/components/Hero";
import AspirationProblem from "@/components/AspirationProblem";
import Opportunity from "@/components/Opportunity";
import Jury from "@/components/Jury";
import CelebrityPatron from "@/components/CelebrityPatron";
import Authority from "@/components/Authority";
import TransformationExperience from "@/components/TransformationExperience";
import VideoShowcase from "@/components/VideoShowcase";
import Prizes from "@/components/Prizes";
import PromoterGallery from "@/components/PromoterGallery";
import SocialProof from "@/components/SocialProof";
import HowToApply from "@/components/HowToApply";
import CategorySelector from "@/components/CategorySelector";
import PastEventGallery from "@/components/PastEventGallery";
import YourMoment from "@/components/YourMoment";
import FinalCTA from "@/components/FinalCTA";
import FAQ from "@/components/FAQ";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import LiveActivityTicker from "@/components/LiveActivityTicker";
import RecentApplicationsToast from "@/components/RecentApplicationsToast";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 pb-24 md:pb-12 relative overflow-x-hidden">
      {/* Floating Live Activity Ticker Slot */}
      <LiveActivityTicker />



      {/* Floating Recent Applications Social Proof Toast */}
      <RecentApplicationsToast />

      {/* 1. Hero */}
      <Hero />

      {/* 3. Opportunity */}
      <Opportunity />

      {/* 5. Celebrity Patron */}
      <CelebrityPatron />

      {/* 8. Reel Video Showcase ("The DPM Experience") */}
      <VideoShowcase />

      {/* 7. Transformation Journey */}
      <TransformationExperience />

      {/* 9. Prizes */}
      <Prizes />

      {/* 11. How to Apply Timeline */}
      <HowToApply />

      {/* 4. Grand Jury */}
      <Jury />

      {/* 12. Entry Categories Selector */}
      <CategorySelector />

      {/* 13. Past Event Gallery */}
      <PastEventGallery />

      {/* 6. Organization Authority & Credibility */}
      <Authority />

      {/* Standalone Promoter Gallery Section */}
      <PromoterGallery />

      {/* 2. Aspiration & Scam Prevention Barriers */}
      <AspirationProblem />

      {/* 10. Success Stories & Testimonials */}
      <SocialProof />



      {/* 15. Your Moment Transitional Hook */}
      <YourMoment />

      {/* 16. Registration Form Block */}
      <FinalCTA />

      {/* 17. FAQ Accordion Lists */}
      <FAQ />

      {/* Floating Sticky Bottom CTA Bar for Mobile */}
      <StickyMobileCTA />
    </div>
  );
}

