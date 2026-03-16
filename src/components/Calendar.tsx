import React from 'react';
import { motion } from 'motion/react';
import { CONFIG } from '../config';
import { getCalendarGrid } from '../utils/weddingUtils';

const Calendar: React.FC = () => {
  const days = getCalendarGrid(CONFIG.wedding.date);
  const date = new Date(CONFIG.wedding.date).getDate();
  const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  return (
    <section id="calendar" className="py-12 bg-[#fdfaf7] relative overflow-hidden">
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
            className="w-full bg-white p-8 rounded-[2.5rem] shadow-xl shadow-[#b76e79]/5 border border-[#e6d5c3] relative overflow-hidden"
          >
            <div className="text-center mb-8">
              <h2 className="font-serif text-sm uppercase tracking-[0.4em] text-[#b76e79] mb-4">
                Lịch Cưới
              </h2>
              <p className="font-serif text-2xl md:text-3xl text-[#2a2a2a] border-b border-[#e6d5c3] pb-4 mx-auto w-fit">
                {CONFIG.wedding.monthYear}
              </p>
            </div>

            <div className="grid grid-cols-7 mb-4">
              {weekDays.map(day => (
                <div key={day} className="text-center text-[10px] uppercase font-sans tracking-widest text-gray-400 font-bold py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-2">
              {days.map((d, i) => (
                <div key={i} className="flex items-center justify-center h-10 md:h-12 relative">
                  {d === date ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-[#b76e79] rounded-full flex items-center justify-center shadow-lg shadow-[#b76e79]/30">
                        <span className="font-serif font-bold text-white text-lg">{d}</span>
                      </div>
                    </motion.div>
                  ) : (
                    <span className={`font-serif text-sm md:text-base ${d ? 'text-[#4a4a4a]' : 'text-transparent'}`}>
                      {d}
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

