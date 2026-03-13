import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown, MailOpen } from 'lucide-react';
import { CONFIG } from '../config';

export default function Hero() {
  const scrollToNext = () => {
    const storySection = document.getElementById('story');
    storySection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden"
      style={{ 
        backgroundImage: 'url(/bg_1.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/5"></div>
      
      <div className="relative z-10 text-center px-6 w-full max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-[#e6d5c3] relative overflow-hidden"
        >
          {/* Decorative Flap */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#b76e79] to-transparent" />
          
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-[#fdfaf7] rounded-full flex items-center justify-center border-2 border-[#e6d5c3]">
              <MailOpen className="w-10 h-10 text-[#b76e79]" />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <p className="text-sm md:text-base font-serif tracking-[0.4em] text-[#b76e79] uppercase mb-4 opacity-80">
              Lời Mời Kết Hôn
            </p>
            
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-cursive mb-12 text-[#2a2a2a] leading-tight">
              {CONFIG.wedding.coupleName}
            </h1>

            <button
              onClick={scrollToNext}
              className="bg-[#b76e79] text-white px-10 py-4 rounded-full font-serif text-lg shadow-lg hover:bg-[#a35d68] transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Mở Thiệp
            </button>

            <div className="mt-10 pt-8 border-t border-[#e6d5c3]/30 text-xs font-sans tracking-[0.3em] text-[#a3a3a3] uppercase">
              {CONFIG.wedding.dateFormatted}
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer"
        onClick={scrollToNext}
      >
        <ChevronDown className="w-8 h-8 text-[#b76e79]" />
      </motion.div>
    </section>
  );
}
