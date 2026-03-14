import React from 'react';
import { motion } from 'motion/react';
import { CONFIG } from '../config';

export default function OurStory() {
  const stories = CONFIG.stories;

  return (
    <section id="story" className="py-24 px-4 md:px-12 bg-white relative overflow-hidden">
      
      <div className="max-w-4xl mx-auto text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-cursive text-roseGold mb-2 leading-tight">Hành Trình Yêu Thương</h2>
          <p className="font-serif italic text-gray-500 mb-12">Nơi tình yêu bắt đầu và lớn lên theo năm tháng</p>
        </motion.div>

        <div className="space-y-16">
          {stories.map((story, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: story.reverse ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
              className={`flex flex-col ${story.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-6 md:gap-8`}
            >
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#e6d5c3] flex-shrink-0 shadow-lg">
                <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
              </div>
              <div className={`text-center ${story.reverse ? 'md:text-right' : 'md:text-left'} w-full`}>
                <h3 className="text-xl md:text-2xl font-serif text-[#b76e79] mb-2">{story.title}</h3>
                <p className="text-[#4a4a4a] leading-relaxed">{story.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
