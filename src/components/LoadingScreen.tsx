import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { CONFIG } from '../config';

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-[#fdfaf7] flex flex-col items-center justify-center"
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 flex flex-col items-center"
        >
          <Heart className="text-[#b76e79] w-12 h-12 mb-6" fill="currentColor" opacity={0.8} />
          
          <h2 className="text-4xl md:text-5xl font-cursive text-[#2a2a2a] mb-8">
            {CONFIG.wedding.coupleName}
          </h2>
          
          {/* Progress Bar Container */}
          <div className="w-48 h-[2px] bg-[#e6d5c3]/30 rounded-full overflow-hidden relative">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#b76e79] to-transparent w-full"
            />
          </div>
          
          <p className="mt-8 text-[10px] font-sans uppercase tracking-[0.4em] text-[#a3a3a3]">
            Đang tải lời mời...
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
