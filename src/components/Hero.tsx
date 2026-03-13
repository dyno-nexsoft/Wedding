import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { CONFIG } from '../config';

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    const targetDate = new Date(CONFIG.wedding.date).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days: d < 10 ? '0' + d : d.toString(),
          hours: h < 10 ? '0' + h : h.toString(),
          minutes: m < 10 ? '0' + m : m.toString(),
          seconds: s < 10 ? '0' + s : s.toString()
        });
      }
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="hero" 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden parallax-bg"
      style={{ backgroundImage: `url('${CONFIG.assets.heroBg}')` }}
    >
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="relative z-10 text-center text-white px-4">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-xl md:text-2xl font-serif mb-4 tracking-[0.3em] uppercase"
        >
          Lễ Cưới Của
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="text-6xl sm:text-7xl md:text-9xl font-cursive mb-6 drop-shadow-lg"
        >
          {CONFIG.wedding.coupleName}
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="gold-divider"
        ></motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-2xl md:text-3xl font-serif italic mb-8"
        >
          {CONFIG.wedding.dateFormatted}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex justify-center gap-3 sm:gap-4 md:gap-8 text-center flex-wrap"
        >
          {[
            { label: 'Ngày', value: timeLeft.days },
            { label: 'Giờ', value: timeLeft.hours },
            { label: 'Phút', value: timeLeft.minutes },
            { label: 'Giây', value: timeLeft.seconds }
          ].map((item, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-lg w-[72px] sm:w-20 md:w-24">
              <span className="block text-xl sm:text-2xl md:text-3xl font-bold">{item.value}</span>
              <span className="text-xs uppercase tracking-widest">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <ChevronDown className="w-8 h-8 text-white" />
      </motion.div>
    </section>
  );
}
