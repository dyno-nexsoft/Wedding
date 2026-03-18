import React from 'react';
import { motion } from 'motion/react';
import { Camera, Heart, Utensils, Music } from 'lucide-react';
import { CONFIG } from '../config';

const iconMap: Record<string, React.ReactNode> = {
  camera: <Camera className="w-5 h-5" />,
  heart: <Heart className="w-5 h-5" />,
  utensils: <Utensils className="w-5 h-5" />,
  music: <Music className="w-5 h-5" />
};

const Timeline: React.FC = () => {
  return (
    <section id="timeline" className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="font-cursive text-4xl sm:text-6xl text-[#2a2a2a] mb-6 italic opacity-90">Lịch Trình Tiệc Cưới</h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#b76e79]/40 to-transparent mx-auto relative">
             <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-[#b76e79] text-xs">❦</span>
          </div>
        </motion.div>

        <div className="relative">
          {/* Static vertical connector line between icons */}
          <div className="absolute left-[23px] md:left-1/2 top-0 bottom-0 w-[2px] bg-[#f3e8dd] -translate-x-1/2" />

          {/* Gradient Progress Line (animated overlay) */}
          <div className="absolute left-[23px] md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 overflow-hidden">
            <motion.div
              className="w-full h-full"
              style={{
                background: 'linear-gradient(to bottom, transparent, #e6d5c3 15%, #b76e79 50%, #e6d5c3 85%, transparent)',
                transformOrigin: 'top',
              }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </div>

          <div className="space-y-12">
            {CONFIG.timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Icon Circle with entrance pulse */}
                <motion.div 
                  className="absolute left-[23px] md:left-1/2 -translate-x-1/2 z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.2, type: 'spring', stiffness: 200 }}
                >
                  <div className="w-12 h-12 bg-white rounded-full border-2 border-[#e6d5c3] flex items-center justify-center shadow-sm text-[#b76e79] relative">
                    {iconMap[item.icon]}
                    {/* Pulse ring on entrance */}
                    <motion.div
                      className="absolute inset-0 rounded-full border border-[#b76e79]/20"
                      initial={{ scale: 1, opacity: 0.4 }}
                      whileInView={{ scale: 1.8, opacity: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.2, duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                </motion.div>

                {/* Content Area */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'
                }`}>
                  <div className="bg-[#fdfaf7] p-4 md:p-6 rounded-2xl border border-[#e6d5c3]/30 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500 group/card">
                    <span className="font-sans text-[10px] md:text-sm tracking-[0.2em] text-[#b76e79] font-bold block mb-1 group-hover/card:tracking-[0.3em] transition-all duration-300">
                      {item.time}
                    </span>
                    <h3 className="font-serif text-lg md:text-xl text-[#2a2a2a] mb-1.5 md:mb-2">{item.title}</h3>
                    <p className="font-sans text-[#4a4a4a] text-xs md:text-sm leading-relaxed text-pretty">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
