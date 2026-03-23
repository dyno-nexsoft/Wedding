import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CONFIG } from '../config';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 25);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 1, 
        transition: { delay: 2.6 } 
      }}
      className="fixed inset-0 z-[10000] flex overflow-hidden pointer-events-none"
    >
      {/* Left Panel - Bride */}
      <motion.div
        initial={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ duration: 1.8, ease: [0.77, 0, 0.175, 1], delay: 0.8 }}
        className="absolute inset-y-0 left-0 w-[51%] bg-[#fdfaf7] border-r border-[#e6d5c3]/60 z-50 flex items-center justify-end overflow-hidden pointer-events-auto"
      >
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }} />
        <div className="absolute right-6 inset-y-24 w-px bg-gradient-to-b from-transparent via-[#b76e79]/20 to-transparent" />
        
        <div className="relative mr-20 md:mr-32 text-right">
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.03, scale: 1 }}
            transition={{ duration: 2 }}
            className="absolute -top-12 -right-12 text-[12rem] font-serif select-none pointer-events-none text-[#b76e79]"
          >
            {CONFIG.wedding.bride.tên.charAt(0)}
          </motion.span>
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            <p className="text-[10px] tracking-[0.4em] text-[#b76e79] mb-4 uppercase font-medium">Cô dâu</p>
            <h2 className="text-3xl md:text-5xl font-serif text-[#2a2a2a] underline-offset-8 decoration-[#b76e79]/30 font-light tracking-wide">
              {CONFIG.wedding.bride.tên}
            </h2>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Right Panel - Groom */}
      <motion.div
        initial={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 1.8, ease: [0.77, 0, 0.175, 1], delay: 0.8 }}
        className="absolute inset-y-0 right-0 w-[51%] bg-[#fdfaf7] z-50 flex items-center justify-start overflow-hidden pointer-events-auto"
      >
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }} />
        <div className="absolute left-6 inset-y-24 w-px bg-gradient-to-b from-transparent via-[#b76e79]/20 to-transparent" />

        <div className="relative ml-20 md:ml-32 text-left">
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.03, scale: 1 }}
            transition={{ duration: 2 }}
            className="absolute -top-12 -left-12 text-[12rem] font-serif select-none pointer-events-none text-[#b76e79]"
          >
            {CONFIG.wedding.groom.tên.charAt(0)}
          </motion.span>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            <p className="text-[10px] tracking-[0.4em] text-[#b76e79] mb-4 uppercase font-medium">Chú rể</p>
            <h2 className="text-3xl md:text-5xl font-serif text-[#2a2a2a] font-light tracking-wide">
              {CONFIG.wedding.groom.tên}
            </h2>
          </motion.div>
        </div>
      </motion.div>

      {/* Heart Path Reveal Animation */}
      <motion.div
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[60] flex flex-col items-center justify-center pointer-events-none"
      >
        <div className="relative w-24 h-24">
            <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-[0_0_8px_rgba(183,110,121,0.15)]">
                {/* Animated Drawing Path: Top-Middle -> Down-Left -> Tip -> Up-Right -> Top-Middle */}
                <motion.path
                  d="M12 5.09C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5c0-3.08-2.42-5.5-5.5-5.5c-1.74 0-3.41.81-4.5 2.09z"
                  fill="none"
                  stroke="#b76e79"
                  strokeWidth="1"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, fill: "rgba(183, 110, 121, 0)" }}
                  animate={{ 
                    pathLength: progress / 100,
                    fill: progress >= 100 ? "rgba(183, 110, 121, 1)" : "rgba(183, 110, 121, 0)"
                  }}
                  transition={{ 
                    pathLength: { duration: 0.1, ease: "linear" },
                    fill: { duration: 0.8, ease: "easeIn" }
                  }}
                />
            </svg>
            
            {/* Minimal Heart Pulse in the middle (optional, very light) */}
            <motion.div
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 flex items-center justify-center"
            >
               <div className="w-4 h-4 rounded-full bg-[#b76e79]/20 blur-sm" />
            </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
