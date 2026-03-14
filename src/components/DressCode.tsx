import React from 'react';
import { motion } from 'motion/react';
import { CONFIG } from '../config';

const DressCode: React.FC = () => {
  return (
    <section id="dresscode" className="py-24 bg-white text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="font-cursive text-4xl sm:text-5xl text-[#2a2a2a] mb-4">{CONFIG.dressCode.title}</h2>
        <p className="font-serif italic text-[#4a4a4a] mb-12 max-w-lg mx-auto leading-relaxed">
          {CONFIG.dressCode.description}
        </p>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {CONFIG.dressCode.colors.map((color, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-default"
            >
              <div 
                className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg mx-auto mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: color.hex }}
              />
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                {color.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Note about participation */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 font-sans text-[10px] uppercase tracking-[0.4em] text-gray-500"
        >
          Sự hiện diện của bạn là niềm vinh hạnh của chúng tôi
        </motion.p>
      </motion.div>
    </section>
  );
};

export default DressCode;
