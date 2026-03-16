import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown, MailOpen } from 'lucide-react';
import { CONFIG } from '../config';

export default function Hero() {
  const { scrollY } = useScroll();
  
  // Parallax transforms - motion handles these efficiently
  const yBackground = useTransform(scrollY, [0, 500], [0, 150]);
  const yCard = useTransform(scrollY, [0, 500], [0, -50]);
  const opacityCard = useTransform(scrollY, [0, 300], [1, 0.8]);

  const scrollToNext = () => {
    const storySection = document.getElementById('story');
    storySection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      className="relative h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden bg-[#fdfaf7]"
    >
      {/* Optimized Background Image (LCP) */}
      <motion.img 
        src={CONFIG.assets.heroBg}
        alt="Wedding Background"
        className="absolute inset-0 w-full h-full object-cover z-0 select-none pointer-events-none"
        style={{ 
          y: yBackground,
          willChange: 'transform'
        }}
        // @ts-ignore - fetchpriority is a new attribute
        fetchpriority="high"
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] z-1" />

      {/* Content Layout */}
      <div className="relative z-20 w-full max-w-lg mx-auto flex flex-col items-center -mt-24 md:-mt-32">
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="mb-16 md:mb-24 text-center px-4"
        >
          <p className="text-[10px] md:text-xs font-serif tracking-[0.6em] text-[#4a4a4a] uppercase font-bold whitespace-nowrap">
            TRÂN TRỌNG KÍNH MỜI:
          </p>
        </motion.div>


        {/* Central Envelope Section */}
        <motion.div
          style={{ 
            y: yCard, 
            opacity: opacityCard,
            willChange: 'transform, opacity'
          }}
          initial={{ opacity: 0, scale: 1.1, y: 60 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            duration: 1.8, 
            ease: [0.16, 1, 0.3, 1],
            delay: 1.2 
          }}
          className="relative w-full px-6 flex justify-center perspective-[1200px]"
        >
          {/* Subtle Glow Behind Card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#b76e79]/5 blur-[80px] rounded-full z-0" />


          {/* The Envelope */}
          <div className="relative w-full max-w-sm aspect-[4/3] bg-[#f9f7f5] rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden group z-10">
            {/* Floral Decorations with explicit dimensions to prevent CLS */}
            <div className="absolute top-[-8px] left-[-8px] w-24 md:w-32 z-40 pointer-events-none opacity-90">
              <img 
                src={CONFIG.assets.floralAccent} 
                alt="Hoa trang trí" 
                width={128}
                height={128}
                loading="eager"
                className="w-full h-auto drop-shadow-sm select-none" 
              />
            </div>

            <div className="absolute bottom-[-8px] right-[-8px] w-32 md:w-40 z-40 pointer-events-none opacity-90 scale-x-[-1] scale-y-[-1]">
              <img 
                src={CONFIG.assets.floralAccent} 
                alt="Hoa trang trí" 
                width={160}
                height={160}
                loading="eager"
                className="w-full h-auto drop-shadow-sm select-none" 
              />
            </div>

            {/* Couple Names on Envelope Surface */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 md:pb-16 z-10 px-6">
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ duration: 1.2, delay: 2 }}
                className="text-2xl sm:text-3xl md:text-4xl font-cursive text-[#2a2a2a] leading-tight text-center italic"
              >
                {CONFIG.wedding.coupleName}
              </motion.h1>
            </div>

            {/* V-Flap SVG (Closed) */}
            <div className="absolute top-0 left-0 w-full h-[60%] z-20 drop-shadow-sm overflow-hidden pointer-events-none">
               <svg 
                viewBox="0 0 100 60" 
                preserveAspectRatio="none" 
                className="w-full h-full"
              >
                <path 
                  d="M0 0 L50 48 L100 0 Z" 
                  fill="#fdfaf7" 
                  stroke="#e6d5c3" 
                  strokeWidth="0.2"
                />
              </svg>
            </div>

            {/* Side Folds / Internal Borders */}
            <div className="absolute inset-2 border border-[#e6d5c3]/40 z-10 pointer-events-none" />

            {/* Green Wax Seal Clasp */}
            <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 md:w-26 md:h-26 group cursor-pointer relative"
                onClick={scrollToNext}
              >
                <img
                  src={CONFIG.assets.waxSeal}
                  alt="Dấu sáp"
                  width={104}
                  height={104}
                  className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(244,162,97,0.3)] transition-transform duration-500 group-hover:scale-105"
                />
              </motion.div>
            </div>

            {/* "Open" Button integrated as an invisible hit area */}
            <button
              onClick={scrollToNext}
              aria-label="Mở thiệp mời"
              className="absolute inset-0 z-40 bg-transparent cursor-pointer group/env"
            >
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] font-serif text-[#b76e79] opacity-0 group-hover/env:opacity-60 transition-opacity whitespace-nowrap uppercase">
                Chạm để xem
              </span>
            </button>
          </div>
        </motion.div>

        {/* Date Display at the Bottom */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 2.2 }}
           className="mt-16 px-4"
        >
          <div className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2a2a2a]/10 tracking-[0.2em] whitespace-nowrap select-none font-light">
            {CONFIG.wedding.dateFormatted}
          </div>
        </motion.div>
      </div>
      
      {/* Elegant Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-30"
        onClick={scrollToNext}
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-[#b76e79] font-bold">Cuộn Xuống</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-[#b76e79]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
