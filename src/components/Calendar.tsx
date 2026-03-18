import React from 'react';
import { motion } from 'motion/react';
import { CONFIG } from '../config';
import { getCalendarGrid } from '../utils/weddingUtils';

const Calendar: React.FC = () => {
  const days = getCalendarGrid(CONFIG.wedding.date);
  const date = new Date(CONFIG.wedding.date).getDate();
  const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  return (
    <section id="calendar" className="pt-8 pb-8 md:pt-12 md:pb-12 bg-[#fdfaf7] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="none" stroke="#b76e79" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>

      <div className="max-w-2xl mx-auto px-4 relative z-10">
        <div className="flex justify-center">
          
          {/* Calendar Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full bg-[#fdfaf7] p-6 md:p-10 rounded-sm shadow-[0_15px_50px_rgba(0,0,0,0.08)] border border-[#e6d5c3] relative overflow-visible tactile-card"
          >
            {/* Floral Accessory */}
            <div className="absolute -top-12 -right-12 w-48 h-48 opacity-40 rotate-12 pointer-events-none">
          <img src={CONFIG.assets.floralAccent} alt="" className="w-full h-full object-contain" />
        </div>

            <div className="text-center mb-10">
              <h2 className="font-serif text-[10px] md:text-sm uppercase tracking-[0.5em] text-[#b76e79] mb-4 font-bold">
                LỊCH CƯỚI
              </h2>
              <p className="font-cursive text-3xl md:text-5xl text-[#2a2a2a] pb-4 mx-auto w-fit italic opacity-90">
                {CONFIG.wedding.monthYear}
              </p>
              <div className="w-16 h-[1px] bg-[#e6d5c3] mx-auto opacity-50"></div>
            </div>

            <div className="grid grid-cols-7 mb-6">
              {weekDays.map(day => (
                <div key={day} className="text-center text-[10px] uppercase font-serif tracking-widest text-gray-400 font-bold py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-4">
              {days.map((d, i) => (
                <div key={i} className="flex items-center justify-center h-10 md:h-14 relative">
                  {d === date ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -20 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="w-12 h-12 md:w-16 md:h-16 relative flex items-center justify-center">
                        {/* Shimmer glow around wedding date */}
                        <motion.div
                          className="absolute inset-[-6px] rounded-full bg-[#f4a261]/15 blur-md"
                          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        <img 
                          src={CONFIG.assets.waxSeal} 
                          alt="Special Date" 
                          className="absolute inset-0 w-full h-full object-contain filter drop-shadow-md opacity-90"
                        />
                        <span className="font-serif font-bold text-white text-lg md:text-xl relative z-10 pt-0.5">{d}</span>
                      </div>
                    </motion.div>
                  ) : (
                    <span className={`font-serif text-sm md:text-lg ${d ? 'text-[#4a4a4a] cursor-default' : 'text-transparent'} transition-colors duration-300 hover:text-[#b76e79] relative group/day`}>
                      {d}
                      {/* Hover dot under day */}
                      {d && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#b76e79]/0 group-hover/day:bg-[#b76e79]/40 transition-colors duration-300" />}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


export default Calendar;
