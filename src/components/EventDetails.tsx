import React from 'react';
import { motion } from 'motion/react';
import { CONFIG } from '../config';

export default function EventDetails() {
  return (
    <section 
      id="details" 
      className="relative py-24 parallax-bg"
      style={{ backgroundImage: `url('${CONFIG.assets.detailsBg}')` }}
    >
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 md:gap-12 text-white">
        {CONFIG.events.map((event, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="bg-white/10 border border-white/20 p-8 md:p-12 rounded-2xl backdrop-blur-md text-center"
          >
            <h3 className="text-4xl font-cursive mb-6 text-champagne">{event.title}</h3>
            <div className="mb-4">
              <p className="text-xl font-serif mb-1 uppercase tracking-widest">Thời Gian</p>
              <p className="text-lg">{event.day}</p>
              <p className="text-lg">Lúc {event.time}</p>
            </div>
            <div className="mb-8">
              <p className="text-xl font-serif mb-1 uppercase tracking-widest">Địa Điểm</p>
              <p className="text-lg">{event.location}</p>
              <p className="text-stone-300">{event.address}</p>
            </div>
            <a href={event.mapLink} className="inline-block border border-champagne px-8 py-3 rounded-full hover:bg-champagne hover:text-stone-800 transition-all duration-300">
              Xem Bản Đồ
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
