import React from 'react';
import { motion } from 'motion/react';
import { CONFIG } from '../config';

const DressCode: React.FC = () => {
  return (
    <section id="dresscode" className="py-16 md:py-24 bg-white text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="font-cursive text-3xl sm:text-5xl text-[#2a2a2a] mb-4">{CONFIG.dressCode.title}</h2>
        <p className="font-serif italic text-sm md:text-base text-[#4a4a4a] mb-12 max-w-lg mx-auto leading-relaxed px-2">
          {CONFIG.dressCode.description}
        </p>

        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {CONFIG.dressCode.colors.map((color, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group cursor-default"
            >
              <div className="relative mx-auto mb-4">
                {/* Animated pulse ring behind swatch */}
                <motion.div
                  className="absolute inset-[-4px] rounded-full"
                  style={{ border: `2px solid ${color.hex}`, opacity: 0.3 }}
                  initial={{ scale: 1, opacity: 0 }}
                  whileInView={{ scale: [1, 1.4, 1.4], opacity: [0, 0.4, 0] }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.15, duration: 1.2, ease: 'easeOut' }}
                />
                <div 
                  className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-white shadow-md shadow-[#b76e79]/10 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#b76e79]/15 relative overflow-hidden"
                  style={{ backgroundColor: color.hex }}
                >
                  {/* Subtle fabric-like texture overlay */}
                  <div 
                    className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none rounded-full"
                    style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)' }}
                  />
                </div>
              </div>
              <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#b76e79]/50 font-bold group-hover:text-[#b76e79]/80 transition-colors duration-300">
                {color.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Decorative divider */}
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#b76e79]/20 to-transparent mx-auto mt-12 mb-8" />

        {/* Note about participation */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#b76e79]/60"
        >
          Sự hiện diện của bạn là niềm vinh hạnh của chúng tôi
        </motion.p>
      </motion.div>
    </section>
  );
};

export default DressCode;
