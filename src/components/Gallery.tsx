import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { CONFIG } from '../config';

export default function Gallery() {
  const images = CONFIG.assets.gallery;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = 'auto';
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

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
            className="overflow-hidden h-40 sm:h-48 md:h-64 shadow-md rounded-lg cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <img 
              src={img} 
              alt={`Wedding Gallery ${index + 1}`} 
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 lg:p-12 cursor-zoom-out"
          >
            <button 
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white hover:text-roseGold transition-colors z-50 p-2"
            >
              <X size={32} />
            </button>

            <button 
              onClick={showPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50 p-2 bg-white/10 rounded-full backdrop-blur-sm"
            >
              <ChevronLeft size={40} />
            </button>

            <button 
              onClick={showNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50 p-2 bg-white/10 rounded-full backdrop-blur-sm"
            >
              <ChevronRight size={40} />
            </button>

            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -20 }}
              className="relative max-w-5xl w-full h-full flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={images[selectedIndex]} 
                alt={`Wedding Gallery Full ${selectedIndex + 1}`} 
                className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 font-serif">
                {selectedIndex + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
