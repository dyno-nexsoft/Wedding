import React from 'react';
import { motion } from 'motion/react';
import { CONFIG } from '../config';

export default function OurStory() {
  const stories = CONFIG.stories;

  return (
    <section id="story" className="py-16 md:py-24 px-4 md:px-12 bg-white relative overflow-hidden">
      
      <div className="max-w-4xl mx-auto text-center w-full">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8 }}
           className="relative"
        >
          {/* Subtle Background Floral Decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 md:w-96 opacity-10 pointer-events-none -z-10">
            <img src={CONFIG.assets.floralAccent} alt="" className="w-full h-auto" />
          </div>

          <h2 className="text-4xl sm:text-6xl font-cursive text-[#2a2a2a] mb-6 leading-tight italic opacity-90">Hành Trình Yêu Thương</h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#b76e79]/40 to-transparent mx-auto mb-8 relative">
             <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-[#b76e79] text-xs">❦</span>
          </div>
          <p className="font-serif italic text-base sm:text-lg text-gray-500 mb-16 opacity-80">Nơi tình yêu bắt đầu và lớn lên theo năm tháng</p>
        </motion.div>

        {/* Timeline connector */}
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#e6d5c3]/50 to-transparent hidden md:block" />

          <div className="space-y-12 md:space-y-16">
            {stories.map((story, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: story.reverse ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: "easeOut", delay: index * 0.15 }}
                className={`flex flex-col ${story.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-6 md:gap-10 relative`}
              >
                {/* Connection heart dot */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center z-10">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.15, type: 'spring' }}
                    className="w-5 h-5 rounded-full bg-white border-2 border-[#b76e79]/30 flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#b76e79]/40" />
                  </motion.div>
                </div>

                {/* Image with hover effect */}
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#e6d5c3] flex-shrink-0 shadow-md shadow-[#b76e79]/10 group/img relative">
                  <img src={story.image} alt={story.title} className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110" />
                  <div className="absolute inset-0 bg-[#b76e79]/0 group-hover/img:bg-[#b76e79]/10 transition-colors duration-500 rounded-full" />
                </div>

                {/* Story text card with glass effect */}
                <div className={`text-center ${story.reverse ? 'md:text-right' : 'md:text-left'} w-full glass-card rounded-2xl p-5 md:p-6`}>
                  <h3 className="text-lg md:text-2xl font-serif text-[#b76e79] mb-2">{story.title}</h3>
                  <p className="text-[#4a4a4a] text-sm md:text-base leading-relaxed">{story.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
