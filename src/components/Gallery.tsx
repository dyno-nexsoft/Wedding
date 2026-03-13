import React from 'react';
import { motion } from 'motion/react';
import { CONFIG } from '../config';

export default function Gallery() {
  const images = CONFIG.assets.gallery;

  return (
    <section id="gallery" className="py-24 px-6 bg-[#FFFAF5]">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto text-center mb-16"
      >
        <h2 className="text-5xl font-cursive text-roseGold mb-4">Thư Viện Ảnh</h2>
        <div className="w-24 h-1 bg-champagne mx-auto"></div>
      </motion.div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-7xl mx-auto">
        {images.map((img, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="overflow-hidden h-40 sm:h-48 md:h-64 shadow-md rounded-lg"
          >
            <img 
              src={img} 
              alt={`Wedding Gallery ${index + 1}`} 
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
