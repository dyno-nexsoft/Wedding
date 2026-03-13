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
    <section id="timeline" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="font-cursive text-3xl sm:text-5xl text-[#2a2a2a] mb-4">Lịch Trình Tiệc Cưới</h2>
          <div className="w-16 h-[1px] bg-[#e6d5c3] mx-auto"></div>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[23px] md:left-1/2 top-0 bottom-0 w-[2px] bg-[#f3e8dd] -translate-x-1/2" />

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
                {/* Icon Circle */}
                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full border-2 border-[#e6d5c3] flex items-center justify-center z-10 shadow-sm text-[#b76e79]">
                  {iconMap[item.icon]}
                </div>

                {/* Content Area */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'
                }`}>
                  <div className="bg-[#fdfaf7] p-6 rounded-2xl border border-[#e6d5c3]/30 shadow-sm hover:shadow-md transition-shadow">
                    <span className="font-sans text-sm tracking-[0.2em] text-[#b76e79] font-bold block mb-1">
                      {item.time}
                    </span>
                    <h3 className="font-serif text-xl text-[#2a2a2a] mb-2">{item.title}</h3>
                    <p className="font-sans text-[#4a4a4a] text-sm leading-relaxed text-pretty">
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
