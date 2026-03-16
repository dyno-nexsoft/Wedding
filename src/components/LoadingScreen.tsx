import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { CONFIG } from '../config';

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex overflow-hidden lg-screen-container"
    >
      {/* Left Panel - Groom */}
      <motion.div
        initial={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ duration: 1.8, ease: [0.77, 0, 0.175, 1], delay: 0.8 }}
        className="absolute inset-y-0 left-0 w-1/2 bg-[#fdfaf7] border-r border-[#e6d5c3]/60 z-20 flex items-center justify-end overflow-hidden"
      >
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }} />
        
        {/* Subtle Ornament Line */}
        <div className="absolute right-6 inset-y-24 w-px bg-gradient-to-b from-transparent via-[#b76e79]/20 to-transparent" />
        
        <div className="relative mr-12 md:mr-24 text-right">
          {/* Large Initial Background */}
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.03, scale: 1 }}
            transition={{ duration: 2 }}
            className="absolute -top-12 -right-8 text-[12rem] font-serif select-none pointer-events-none"
          >
            {CONFIG.wedding.groom.split(' ').pop()?.charAt(0)}
          </motion.span>
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            <p className="text-[10px] tracking-[0.4em] text-[#b76e79] mb-4 uppercase font-medium">Chú rể</p>
            <h2 className="text-3xl md:text-5xl font-serif text-[#2a2a2a] underline-offset-8 decoration-[#b76e79]/30 font-light tracking-wide">
              {CONFIG.wedding.groom.split(' ').pop()}
            </h2>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Right Panel - Bride */}
      <motion.div
        initial={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 1.8, ease: [0.77, 0, 0.175, 1], delay: 0.8 }}
        className="absolute inset-y-0 right-0 w-1/2 bg-[#fdfaf7] z-20 flex items-center justify-start overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }} />
        
        {/* Subtle Ornament Line */}
        <div className="absolute left-6 inset-y-24 w-px bg-gradient-to-b from-transparent via-[#b76e79]/20 to-transparent" />
 
        <div className="relative ml-12 md:ml-24 text-left">
          {/* Large Initial Background */}
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.03, scale: 1 }}
            transition={{ duration: 2 }}
            className="absolute -top-12 -left-8 text-[12rem] font-serif select-none pointer-events-none"
          >
            {CONFIG.wedding.bride.split(' ').pop()?.charAt(0)}
          </motion.span>
 
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            <p className="text-[10px] tracking-[0.4em] text-[#b76e79] mb-4 uppercase font-medium">Cô dâu</p>
            <h2 className="text-3xl md:text-5xl font-serif text-[#2a2a2a] font-light tracking-wide">
              {CONFIG.wedding.bride.split(' ').pop()}
            </h2>
          </motion.div>
        </div>
      </motion.div>
 
      {/* Central Progress Heart */}
      <motion.div
        exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.5 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className="relative z-30 w-full h-full flex flex-col items-center justify-center pointer-events-none"
      >
        <div className="relative flex flex-col items-center">
          {/* Decorative Circle Ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute w-48 h-48 border border-dashed border-[#b76e79]/10 rounded-full"
          />
 
          {/* Animated Glow Aura */}
          <motion.div
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 45, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-[#b76e79]/5 rounded-full blur-[80px]"
          />
          
          <div className="relative w-40 h-40 flex items-center justify-center">
            {/* Pulsing Outer Bloom */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute inset-0 border-[0.5px] border-[#b76e79]/30 rounded-full"
            />
 
            {/* Background Heart Silhouette */}
            <Heart 
              size={56} 
              strokeWidth={0.5} 
              className="text-[#e6d5c3] absolute transition-opacity duration-1000" 
            />
            
            {/* modern Filling Progress Heart with Gradient to avoid square look */}
            <div className="relative flex items-center justify-center w-14 h-14">
              <svg width="0" height="0" style={{ position: 'absolute' }}>
                <defs>
                  <linearGradient id="heartGradient" x1="0" y1="1" x2="0" y2="0">
                    <motion.stop 
                      offset="0%" 
                      stopColor="#b76e79" 
                      animate={{ offset: ["0%", "100%", "0%"] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.stop 
                      offset="0%" 
                      stopColor="transparent" 
                      animate={{ offset: ["0%", "100%", "0%"] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </linearGradient>
                </defs>
              </svg>
              
              <Heart 
                size={56} 
                fill="url(#heartGradient)" 
                strokeWidth={0} 
                className="text-[#b76e79] drop-shadow-[0_0_15px_rgba(183,110,121,0.4)]" 
              />
              
              {/* Liquid Wave Effect - Subtle Layer */}
              <motion.div 
                animate={{ 
                  y: [1, -1, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 blur-[2px]"
              >
                <Heart size={56} fill="url(#heartGradient)" strokeWidth={0} className="scale-105 opacity-20" />
              </motion.div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 100 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="h-[1px] bg-gradient-to-r from-transparent via-[#b76e79]/40 to-transparent mb-6"
            />
            <motion.p 
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-[9px] font-sans uppercase tracking-[0.8em] text-[#b76e79] font-light"
            >
              Chuẩn bị không gian lễ cưới
            </motion.p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
