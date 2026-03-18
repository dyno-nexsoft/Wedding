import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { CONFIG } from '../config';

export default function Gallery() {
  const items = CONFIG.gallery;
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
      setSelectedIndex((selectedIndex + 1) % items.length);
    }
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + items.length) % items.length);
    }
  };

  return (
    <section id="gallery" className="pt-16 pb-8 md:pt-24 md:pb-12 bg-[#fdfaf7] px-4">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="max-w-6xl mx-auto text-center mb-12 md:mb-20"
      >
        <h2 className="text-4xl md:text-6xl font-cursive text-[#2a2a2a] mb-6 italic opacity-90">Thư Viện Ảnh</h2>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#b76e79]/40 to-transparent mx-auto relative">
           <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fdfaf7] px-2 text-[#b76e79] text-xs">❦</span>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto px-4">
        {items.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20, rotate: index % 2 === 0 ? -2 : 2 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, rotate: 0, zIndex: 10 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="group relative p-3 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-sm cursor-pointer border border-gray-100/50 hover:shadow-[0_20px_50px_rgba(183,110,121,0.12)] transition-shadow duration-500"
            onClick={() => openLightbox(index)}
          >
            <div className="overflow-hidden h-[24rem] sm:h-[28rem] lg:h-[32rem] relative">
              <img 
                src={item.url} 
                alt={`Ảnh cưới ${index + 1}`} 
                className="w-full h-full object-cover grayscale-[0.15] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" 
              />
              {/* Caption overlay — always visible on mobile, hover on desktop */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                <span className="text-white/90 font-cursive text-2xl tracking-wide italic translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
                  {item.caption ?? `Khoảnh khắc ${index + 1}`}
                </span>
              </div>
              {/* Inner shadow for photo depth */}
              <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.05)] pointer-events-none" />
            </div>
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
              className="absolute top-6 right-6 text-white hover:text-[#b76e79] transition-colors z-50 p-2"
            >
              <X size={32} />
            </button>

            <button 
              onClick={showPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50 p-2 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20"
            >
              <ChevronLeft size={40} />
            </button>

            <button 
              onClick={showNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50 p-2 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20"
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
                src={items[selectedIndex].url} 
                alt={`Ảnh cưới ${selectedIndex + 1}`} 
                className="max-w-full max-h-full object-contain shadow-xl shadow-black/30 rounded-sm"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 font-serif">
                {selectedIndex + 1} / {items.length}
              </div>
            </motion.div>

            {/* Thumbnail strip at bottom */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-50">
              {items.map((item, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setSelectedIndex(i); }}
                  className={`w-12 h-12 rounded-sm overflow-hidden border-2 transition-all duration-300 ${
                    i === selectedIndex ? 'border-[#b76e79] opacity-100 scale-110' : 'border-white/20 opacity-50 hover:opacity-80'
                  }`}
                >
                  <img src={item.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
