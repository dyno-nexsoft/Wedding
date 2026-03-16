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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center"
        >
          {/* Pulsating Green Wax Seal */}
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              filter: ["drop-shadow(0 5px 15px rgba(244,162,97,0.2))", "drop-shadow(0 10px 25px rgba(244,162,97,0.4))", "drop-shadow(0 5px 15px rgba(244,162,97,0.2))"]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-24 h-24 mb-8"
          >
            <img src="/orange_wax_seal.png" alt="Seal" className="w-full h-full object-contain" />
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-cursive text-[#2a2a2a] mb-8 italic opacity-90">
            {CONFIG.wedding.coupleName}
          </h2>
          
          {/* Minimalist Progress Line */}
          <div className="w-32 h-[1px] bg-[#e6d5c3]/40 relative overflow-hidden">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute inset-0 bg-[#b76e79] w-full"
            />
          </div>
          
          <p className="mt-8 text-[9px] font-serif uppercase tracking-[0.5em] text-[#a3a3a3] font-bold">
            Đang mở lời mời...
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
