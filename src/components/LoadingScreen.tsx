import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { CONFIG } from '../config';

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex overflow-hidden lg-screen-container"
    >
      {/* Left Panel */}
      <motion.div
        initial={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1], delay: 0.5 }}
        className="absolute inset-y-0 left-0 w-1/2 bg-[#fdfaf7] border-r border-[#e6d5c3]/40 z-20 shadow-[20px_0_40px_rgba(0,0,0,0.02)]"
      >
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#b76e79 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className="absolute right-4 inset-y-12 w-px bg-gradient-to-b from-transparent via-[#e6d5c3]/50 to-transparent" />
      </motion.div>
      
      {/* Right Panel */}
      <motion.div
        initial={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1], delay: 0.5 }}
        className="absolute inset-y-0 right-0 w-1/2 bg-[#fdfaf7] z-20 shadow-[-20px_0_40px_rgba(0,0,0,0.02)]"
      >
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#b76e79 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className="absolute left-4 inset-y-12 w-px bg-gradient-to-b from-transparent via-[#e6d5c3]/50 to-transparent" />
      </motion.div>

      <motion.div
        exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
        transition={{ duration: 0.8, ease: "easeIn" }}
        className="relative z-30 w-full h-full flex flex-col items-center justify-center pointer-events-none"
      >
        <div className="relative">
          {/* Heart Pulse Animation */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute inset-0 bg-[#b76e79]/10 rounded-full blur-2xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Heart Progress Animation */}
            <div className="relative w-24 h-24 mb-12 flex items-center justify-center">
              {/* Background Heart (The Container) */}
              <Heart 
                size={64} 
                strokeWidth={1.5} 
                className="text-[#e6d5c3] absolute opacity-40" 
              />
              
              {/* Filling Heart (The Fluid) masked by clip-path */}
              <motion.div
                initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute inset-0 flex items-center justify-center scale-[0.88]"
              >
                <Heart 
                  size={64} 
                  fill="#b76e79" 
                  strokeWidth={0} 
                  className="text-[#b76e79]" 
                />
              </motion.div>

              {/* Pulsating Glow */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-[#b76e79]/10 rounded-full blur-3xl -z-10"
              />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-sans text-[#2a2a2a] mb-8 font-extralight tracking-tight opacity-90">
              {CONFIG.wedding.coupleName}
            </h2>
            
            <div className="h-px w-12 bg-[#b76e79]/30 mb-8" />

            <p className="text-[10px] font-sans uppercase tracking-[0.5em] text-[#b76e79] font-medium opacity-60">
              Đang mở lời mời...
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
