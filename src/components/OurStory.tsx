import React from 'react';
import { motion } from 'motion/react';
import { CONFIG } from '../config';

export default function OurStory() {
  const stories = CONFIG.stories;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.7,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98]
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0, rotate: -15, opacity: 0 },
    visible: { 
      scale: 1, 
      rotate: 0, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 260,
        damping: 18,
        mass: 1
      } 
    }
  };

  return (
    <section id="story" className="py-16 md:py-24 px-4 md:px-8 lg:px-12 bg-white relative overflow-hidden">
      
      <div className="max-w-5xl xl:max-w-6xl mx-auto text-center w-full">
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

        {/* SVG Defs for Curved Timeline */}
        <svg className="w-0 h-0 absolute pointer-events-none">
          <defs>
            <linearGradient id="wave-grad-top" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e6d5c3" stopOpacity="0" />
              <stop offset="20%" stopColor="#e6d5c3" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#e6d5c3" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="wave-grad-bottom" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e6d5c3" stopOpacity="0.8" />
              <stop offset="80%" stopColor="#e6d5c3" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#e6d5c3" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="wave-grad-mid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e6d5c3" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#e6d5c3" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>

        {/* Timeline connector */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative mt-8 md:mt-16 w-full"
        >
          <div className="relative z-10 py-4 flex flex-col">
            {stories.map((story, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="flex w-full items-center relative group min-h-[110px] md:min-h-[220px] py-6 md:py-20"
              >
                {/* Mobile Curved Vine Line (Background) */}
                <div className="absolute top-0 bottom-0 left-12 w-[60px] -translate-x-1/2 pointer-events-none md:hidden z-0">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path 
                      d={story.reverse 
                          ? "M 10 0 C 10 40, 90 60, 90 100" 
                          : "M 90 0 C 90 40, 10 60, 10 100"} 
                      fill="none" 
                      stroke={index === 0 ? "url(#wave-grad-top)" : index === stories.length - 1 ? "url(#wave-grad-bottom)" : "url(#wave-grad-mid)"}
                      strokeWidth="2" 
                      vectorEffect="non-scaling-stroke" 
                    />
                  </svg>
                </div>

                {/* Desktop Curved Wavy Line (Background) */}
                <div className="absolute inset-0 pointer-events-none hidden md:block w-full h-full z-0">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path 
                      d={story.reverse 
                          ? "M 50 0 C 80 20, 80 80, 50 100" 
                          : "M 50 0 C 20 20, 20 80, 50 100"} 
                      fill="none" 
                      stroke={index === 0 ? "url(#wave-grad-top)" : index === stories.length - 1 ? "url(#wave-grad-bottom)" : "url(#wave-grad-mid)"}
                      strokeWidth="2" 
                      vectorEffect="non-scaling-stroke" 
                    />
                  </svg>
                </div>

                {/* Timeline Image Node (Replaces Dot) */}
                <div className={`absolute left-12 ${story.reverse ? 'md:left-[72.5%]' : 'md:left-[27.5%]'} top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20 pointer-events-none transition-all duration-700`}>
                  <motion.div 
                    variants={imageVariants}
                    className="relative flex items-center justify-center pointer-events-auto"
                  >
                    {/* Glowing pulse behind image (Sequential Staggered Pulse) */}
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.1, 0.35, 0.1],
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity, 
                        delay: index * 1.2, 
                        ease: "easeInOut" 
                      }}
                      className="absolute inset-[-8px] md:inset-[-12px] rounded-full bg-[#b76e79]/20" 
                    />
                    
                    {/* Main Image Node */}
                    <div className="w-24 h-24 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden border-[3px] md:border-4 border-white ring-4 ring-[#e6d5c3]/40 shadow-xl shadow-[#b76e79]/10 relative group/img cursor-pointer bg-[#fffAf9]">
                      <img src={story.image} alt={story.title} className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110" />
                      <div className="absolute inset-0 bg-[#b76e79]/0 group-hover/img:bg-[#b76e79]/10 transition-colors duration-500 rounded-full" />
                    </div>
                  </motion.div>
                </div>

                {/* Left/Right Text Content (Zigzag on Desktop, Left-aligned on Mobile) */}
                <div className={`w-full md:w-[60%] flex flex-col justify-center py-4 md:py-8 relative z-10
                  ${story.reverse 
                      ? 'pl-[7.5rem] pr-4 md:pl-0 md:pr-16 lg:pr-24 md:mr-auto md:text-right text-left' 
                      : 'pl-[7.5rem] pr-4 md:pr-0 md:pl-16 lg:pl-24 md:ml-auto md:text-left text-left'}
                `}>
                   <div className="p-0 transition-all duration-300">
                    <h3 className="text-xl md:text-[1.75rem] font-serif text-[#b76e79] mb-3 md:mb-5 leading-tight">{story.title}</h3>
                    <p className="text-[#4a4a4a] text-sm md:text-[1.05rem] leading-relaxed opacity-90">{story.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
