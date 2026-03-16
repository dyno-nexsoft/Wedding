import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown, MailOpen } from 'lucide-react';
import { CONFIG } from '../config';

/**
 * Petal component for floating animation
 */
const Petal = ({ delay, x, size, duration }: { delay: number; x: string; size: number; duration: number }) => (
  <motion.div
    initial={{ y: -100, x: x, opacity: 0, rotate: 0 }}
    animate={{ 
      y: '110vh', 
      opacity: [0, 1, 1, 0],
      rotate: 360,
      x: [x, `calc(${x} + 50px)`, x]
    }}
    transition={{ 
      duration: duration, 
      repeat: Infinity, 
      delay: delay,
      ease: "linear" 
    }}
    className="absolute pointer-events-none z-0"
    style={{ width: size, height: size }}
  >
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M12 2C12 2 4 10 4 14C4 18.4183 7.58172 22 12 22C16.4183 22 20 18.4183 20 14C20 10 12 2 12 2Z" 
        fill="#b76e79" 
        fillOpacity="0.15" 
      />
    </svg>
  </motion.div>
);

export default function Hero() {
  const { scrollY } = useScroll();
  const yBackground = useTransform(scrollY, [0, 500], [0, 150]);
  const yCard = useTransform(scrollY, [0, 500], [0, -50]);
  const opacityCard = useTransform(scrollY, [0, 300], [1, 0.8]);

  const petals = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 10,
      x: `${Math.random() * 100}%`,
      size: Math.random() * 15 + 10,
      duration: Math.random() * 10 + 15
    }));
  }, []);

  const scrollToNext = () => {
    const storySection = document.getElementById('story');
    storySection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      className="relative h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden bg-[#fdfaf7]"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ 
          backgroundImage: `url(${CONFIG.assets.heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: yBackground
        }}
        className="absolute inset-0 z-0"
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] z-1"></div>

      {/* Floating Petals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {petals.map(petal => (
          <Petal key={petal.id} {...petal} />
        ))}
      </div>
      
      {/* Reference-Based Content Layout */}
      <div className="relative z-20 w-full max-w-lg mx-auto flex flex-col items-center -mt-24 md:-mt-32">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-16 md:mb-24"
        >
          <p className="text-xs md:text-sm font-serif tracking-[0.4em] text-[#4a4a4a] uppercase font-bold">
            TRÂN TRỌNG KÍNH MỜI:
          </p>
        </motion.div>


        {/* Central Envelope Section */}
        <motion.div
          style={{ y: yCard, opacity: opacityCard }}
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 }}
          className="relative w-full px-6 flex justify-center perspective-[1000px]"
        >


          {/* The Envelope */}
          <div className="relative w-full max-w-sm aspect-[4/3] bg-[#f9f7f5] rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden group z-10">
            {/* Floral Decoration - Top Left inside */}
            <div className="absolute top-[-8px] left-[-8px] w-24 md:w-32 z-40 pointer-events-none opacity-90">
              <img src={CONFIG.assets.floralAccent} alt="" className="w-full h-auto drop-shadow-sm" />
            </div>

            {/* Floral Decoration - Bottom Right inside */}
            <div className="absolute bottom-[-8px] right-[-8px] w-32 md:w-40 z-40 pointer-events-none opacity-90 scale-x-[-1] scale-y-[-1]">
              <img src={CONFIG.assets.floralAccent} alt="" className="w-full h-auto drop-shadow-sm" />
            </div>

            {/* Couple Names on Envelope Surface */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 md:pb-16 z-10 px-6">
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.8, y: 0 }}
                transition={{ duration: 1.2, delay: 1 }}
                className="text-2xl sm:text-3xl md:text-4xl font-cursive text-[#2a2a2a] leading-tight text-center italic"
              >
                {CONFIG.wedding.coupleName}
              </motion.h1>
            </div>
            {/* V-Flap SVG (Closed) */}
            <div className="absolute top-0 left-0 w-full h-[60%] z-20 drop-shadow-sm overflow-hidden">
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
            <div className="absolute inset-2 border border-[#e6d5c3]/40 z-10" />

            {/* Paper Texture Overlay (Subtle) */}

            {/* Green Wax Seal Clasp */}
            <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
              <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-20 h-20 md:w-26 md:h-26 group cursor-pointer relative"
              onClick={scrollToNext}
            >
              <img
                src={CONFIG.assets.waxSeal}
                alt="Thiệp mời"
                className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(244,162,97,0.3)] transition-transform duration-500 group-hover:scale-105"
              />
              </motion.div>
            </div>

            {/* "Open" Button integrated as an invisible hit area or subtle label */}
            <button
              onClick={scrollToNext}
              className="absolute inset-0 z-40 bg-transparent cursor-pointer group/env"
            >
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] font-serif text-[#b76e79] opacity-0 group-hover/env:opacity-60 transition-opacity whitespace-nowrap">
                CHẠM ĐỂ MỞ
              </span>
            </button>
          </div>
        </motion.div>

        {/* Date Display at the Bottom */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 1.5 }}
           className="mt-16 px-4"
        >
          <div className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#aaa] tracking-widest opacity-100 whitespace-nowrap">
            {CONFIG.wedding.dateFormatted}
          </div>
        </motion.div>
      </div>
      
      {/* Elegant Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-30"
        onClick={scrollToNext}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#b76e79] font-bold">Cuộn Xuống</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-[#b76e79]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
