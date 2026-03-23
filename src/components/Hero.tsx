import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { CONFIG } from '../config';

/// Floating sparkle particle for dreamy atmosphere
function SparkleParticle({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-[#b76e79]/30 pointer-events-none"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{
        opacity: [0, 0.8, 0],
        scale: [0, 1.2, 0],
        y: [0, -20, 0],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  
  const yBackground = useTransform(scrollY, [0, 500], [0, 150]);
  const yCard = useTransform(scrollY, [0, 500], [0, -50]);
  const opacityCard = useTransform(scrollY, [0, 300], [1, 0.8]);

  /// Sparkle positions for dreamy floating effect
  const sparkles = useMemo(() => [
    { delay: 0, x: '15%', y: '20%', size: 4 },
    { delay: 1.2, x: '80%', y: '30%', size: 3 },
    { delay: 2.4, x: '25%', y: '70%', size: 5 },
    { delay: 0.8, x: '70%', y: '65%', size: 3 },
    { delay: 1.8, x: '50%', y: '15%', size: 4 },
    { delay: 3.0, x: '85%', y: '80%', size: 3 },
  ], []);

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
      
      {/* Subtler Overlay — reduced mist for better image clarity */}
      <div className="absolute inset-0 z-1" style={{
        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(253,250,247,0.1) 40%, rgba(253,250,247,0.3) 100%)'
      }} />
      <div className="absolute inset-0 bg-black/5 z-1" />

      {/* Floating Sparkle Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {sparkles.map((s, i) => (
          <SparkleParticle key={i} {...s} />
        ))}
      </div>

      {/* Content Layout */}
      <div className="relative z-20 w-full max-w-lg mx-auto flex flex-col items-center -mt-24 md:-mt-32">
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="mb-16 md:mb-24 text-center px-4"
        >
          <p className="text-[10px] md:text-xs font-serif tracking-[0.6em] text-[#4a4a4a] uppercase font-bold whitespace-nowrap">
            TRÂN TRỌNG KÍNH MỜI
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
          <div className="relative w-full max-w-sm aspect-[4/3] bg-[#f9f7f5] rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden group z-10 hover:shadow-[0_25px_70px_rgba(183,110,121,0.15)] transition-shadow duration-700">
            {/* Floral Decorations */}
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
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 1.2, delay: 2.2 }}
                className="text-[10px] md:text-xs font-serif tracking-[0.5em] text-[#4a4a4a] mt-3 uppercase"
              >
                {String(CONFIG.wedding.date.ngày).padStart(2, '0')}.{String(CONFIG.wedding.date.tháng).padStart(2, '0')}.{CONFIG.wedding.date.năm}
              </motion.p>
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
            <div className="absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 md:w-14 md:h-14 group cursor-pointer relative"
                onClick={scrollToNext}
              >
                {/* Pulsing glow behind wax seal */}
                <motion.div
                  className="absolute inset-[-4px] rounded-full bg-[#f4a261]/20 blur-md"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
                <img
                  src={CONFIG.assets.waxSeal}
                  alt="Dấu sáp"
                  width={104}
                  height={104}
                  className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(244,162,97,0.3)] transition-transform duration-500 group-hover:scale-105 relative z-10"
                />
              </motion.div>
            </div>

            {/* "Open" Button integrated as an invisible hit area */}
            <button
              onClick={scrollToNext}
              aria-label="Mở thiệp mời"
              className="absolute inset-0 z-40 bg-transparent cursor-pointer group/env"
            />
          </div>
        </motion.div>

      </div>
      
      {/* Elegant Scroll Indicator with pulse ring */}
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
          className="relative"
        >
          {/* Pulse ring behind chevron */}
          <motion.div
            className="absolute inset-[-8px] rounded-full border border-[#b76e79]/20"
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <ChevronDown className="w-5 h-5 text-[#b76e79]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
