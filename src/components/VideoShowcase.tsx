"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion, Variants } from "framer-motion";

export default function VideoShowcase() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [inView, setInView] = useState(false);
  const [isPlayClicked, setIsPlayClicked] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Detect mobile and IntersectionObserver for lazy mounting
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // Trigger once
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // When play is clicked on mobile, load and play the video
  useEffect(() => {
    if (isPlayClicked && isMobile && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.error("Autoplay failed:", err);
      });
    }
  }, [isPlayClicked, isMobile]);

  const handleTogglePlay = () => {
    if (isMobile) {
      if (!isPlayClicked) {
        setIsPlayClicked(true);
        setIsPlaying(true);
      } else {
        if (videoRef.current) {
          if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
          } else {
            videoRef.current.play();
            setIsPlaying(true);
          }
        }
      }
    } else {
      if (videoRef.current) {
        if (!isPlaying) {
          videoRef.current.muted = false;
          videoRef.current.controls = true;
          videoRef.current.play();
          setIsPlaying(true);
        } else {
          videoRef.current.muted = true;
          videoRef.current.controls = false;
          videoRef.current.pause();
          setIsPlaying(false);
        }
      }
    }
  };

  const revealVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const shouldShowVideo = !isMobile ? inView : isPlayClicked;

  return (
    <section 
      ref={containerRef}
      className="relative py-8 md:py-16 my-6 md:my-12 bg-luxury-darkcard border border-luxury-border/30 max-w-5xl mx-auto px-6 overflow-hidden rounded-[2rem] shadow-xl"
    >
      
      {/* Deep Royal Sapphire Backdrop Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,58,95,0.15)_0%,transparent_60%)] pointer-events-none" />
      
      {/* Title */}
      <div className="text-center mb-12 relative z-10">
        <span className="text-[10px] font-sans tracking-[0.25em] text-[#C9A24B] uppercase block font-semibold">
          Highlight Reel
        </span>
        <h2 className="font-serif text-2xl md:text-4xl tracking-wide text-white font-light">
          The DPM Experience
        </h2>
        <p className="font-sans text-xs tracking-wider text-luxury-stone mt-2">
          A Glimpse of the Grandeur
        </p>
        <div className="w-16 h-[1px] bg-luxury-gold/50 mx-auto mt-4" />
      </div>

      {/* Grid: Player Left, Description/CTA Right */}
      <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center max-w-4xl mx-auto relative z-10">
        
        {/* Left: Smartphone Player (9:16 Portrait Reel) */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={revealVariants}
          className="md:col-span-6 flex justify-center"
        >
          <div 
            onClick={handleTogglePlay}
            className="w-full max-w-[260px] aspect-[9/16] rounded-[2.5rem] border-[10px] border-[#242424] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden relative bg-black group ring-1 ring-white/10 cursor-pointer sapphire-glow-hover"
          >
            {shouldShowVideo ? (
              <video
                 ref={videoRef}
                 poster="/new-images/video-poster.jpg"
                 preload="none"
                 autoPlay={!isMobile}
                 muted={!isMobile || !isPlayClicked}
                 loop={!isMobile}
                 playsInline
                 controls={(!isMobile && isPlaying) || (isMobile && isPlayClicked)}
                 className="w-full h-full object-cover"
              >
                <source src="/dpm-experience-compressed.mp4" type="video/mp4" />
                <source src="/dpm-experience.mp4" type="video/mp4" />
              </video>
            ) : (
              <Image
                src="/new-images/video-poster.jpg"
                alt="DPM Experience Video Poster"
                fill
                sizes="(max-width: 768px) 100vw, 260px"
                className="object-cover"
                loading="lazy"
              />
            )}

            {/* Play Button Overlay (fades out when playing) */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-luxury-onyx/50 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-4 transition-all duration-300 group-hover:bg-luxury-onyx/40">
                {/* Custom Play Button */}
                <div className="w-14 h-14 rounded-full border border-luxury-gold/60 flex items-center justify-center bg-luxury-onyx/60 group-hover:bg-gradient-to-r group-hover:from-[#C9A24B] group-hover:via-[#F3D78A] group-hover:to-[#AA7C11] group-hover:border-transparent transition-all duration-300 transform group-hover:scale-105 shadow-xl">
                  <span className="text-luxury-gold group-hover:text-luxury-onyx text-base ml-1 transition-colors">▶</span>
                </div>
                <span className="font-sans text-[9px] tracking-widest uppercase text-luxury-gold font-bold mt-4 block">
                  Tap to Unmute
                </span>
                <span className="font-sans text-[8px] text-gray-400 mt-1">
                  Watch Urvashi&apos;s Message (16s)
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Right: Description & CTA */}
        <div className="md:col-span-6 space-y-6 text-center md:text-left">
          <span className="font-sans text-[10px] tracking-widest text-[#60A5FA] uppercase font-bold block">
            From Our Judge
          </span>
          <h3 className="font-serif text-2xl md:text-3xl text-white font-light leading-tight">
            Hear It Directly From Urvashi Rautela
          </h3>
          
          {/* Premium Pull-Quote Block */}
          <div className="border-l-2 border-luxury-gold pl-4 py-1 text-left my-4">
            <p className="font-serif italic text-sm md:text-base text-luxury-gold/90 leading-relaxed">
              &ldquo;We are not just looking for contestants, we are searching for India&apos;s next supermodel.&rdquo;
            </p>
            <span className="block font-sans text-[9px] tracking-wider uppercase text-gray-400 mt-1">
              &mdash; Urvashi Rautela &middot; Judge, Ms Teen India 2026
            </span>
          </div>

          <p className="font-sans text-sm text-gray-300 leading-relaxed text-left md:text-left">
            Urvashi Rautela has joined DPM Entertainment as a judge for Ms Teen India 2026, with the grand finale in Lucknow on 27th September. In her own words, this search isn&apos;t for just another contestant &mdash; it&apos;s for India&apos;s next supermodel.
          </p>

          <div className="p-4 border border-luxury-border/30 rounded-xl bg-luxury-onyx/80 backdrop-blur-sm space-y-1 text-left sapphire-glow-hover">
            <span className="font-sans text-[9px] tracking-widest uppercase text-luxury-gold font-bold block">
              Zoom Auditions Inclusions
            </span>
            <p className="font-sans text-xs text-gray-400">
              Evaluated directly by our 9 grand jury members. Prep kit syllabus delivered within 24 hours of payment.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
            className="pt-2"
          >
            <a 
              href="#register" 
              className="inline-flex items-center justify-center font-sans text-xs tracking-widest uppercase gold-gradient-bg text-luxury-onyx px-8 h-12 font-bold shadow-lg rounded-full hover:brightness-110 transition-all duration-300 btn-shimmer"
            >
              Apply for Auditions
            </a>
          </motion.div>
        </div>

      </div>

    </section>
  );
}
