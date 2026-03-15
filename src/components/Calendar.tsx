import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { CONFIG } from '../config';

const Calendar: React.FC = () => {
  const [timeLeft, setTimeLeft] = React.useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  React.useEffect(() => {
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

  // Extract month and year from CONFIG.wedding.date
  const weddingDate = new Date(CONFIG.wedding.date);
  const month = weddingDate.getMonth();
  const year = weddingDate.getFullYear();
  const date = weddingDate.getDate();

  // Get days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // Create calendar grid
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  
  // Use the first event from the configuration
  const mainEvent = CONFIG.events[0];

  return (
    <section id="calendar" className="py-24 bg-[#fdfaf7] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="none" stroke="#b76e79" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-stretch">
          
          {/* Calendar Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex-1 w-full bg-white p-8 rounded-[2.5rem] shadow-2xl border border-[#e6d5c3] relative overflow-hidden"
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

          {/* Merged Info & Countdown Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full lg:w-[400px] bg-white rounded-[2.5rem] shadow-2xl border border-[#e6d5c3] overflow-hidden flex flex-col"
          >
            {/* Event Info (Top Section) */}
            <div className="p-10 flex-1 flex flex-col justify-center text-center relative overflow-hidden">
              {/* Subtle Decorative Ornament */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none">
                 <div className="w-12 h-[1px] bg-[#b76e79]"></div>
              </div>
              
              <Heart className="mx-auto text-[#b76e79] mb-6 opacity-30" size={28} />
              
              <h3 className="font-cursive text-4xl text-[#b76e79] mb-4 tracking-tight">{mainEvent?.title}</h3>
              
              <div className="space-y-4">
                <p className="font-serif text-sm uppercase tracking-[0.3em] text-gray-400 font-medium">
                  {new Intl.DateTimeFormat('vi-VN', { weekday: 'long' }).format(weddingDate)}
                </p>
                
                <div className="text-5xl font-serif text-[#2a2a2a] font-light tracking-tighter">
                  {new Intl.DateTimeFormat('vi-VN', { hour: '2-digit', minute: '2-digit' }).format(weddingDate)}
                </div>
                
                <div className="pt-8 mt-8 border-t border-[#e6d5c3]/40">
                  <p className="font-serif text-[#4a4a4a] text-lg italic leading-relaxed">{mainEvent?.location}</p>
                  <p className="text-[10px] text-gray-400 font-sans mt-3 tracking-[0.2em] uppercase leading-widest">{mainEvent?.address}</p>
                </div>
              </div>
            </div>

            {/* Countdown (Bottom Section) - Harmonized Light Theme */}
            <div className="bg-[#fdfaf7] border-t border-[#e6d5c3]/60 p-10 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-1 border border-[#e6d5c3]/60 rounded-full shadow-sm">
                <p className="font-serif text-[9px] uppercase tracking-[0.3em] text-[#b76e79] font-bold">Countdown</p>
              </div>
              
              <div className="flex justify-between items-center gap-4">
                {[
                  { label: 'Ngày', value: timeLeft.days },
                  { label: 'Giờ', value: timeLeft.hours },
                  { label: 'Phút', value: timeLeft.minutes },
                  { label: 'Giây', value: timeLeft.seconds }
                ].map((item, index) => (
                  <React.Fragment key={index}>
                    <div className="text-center flex-1">
                      <motion.div 
                        key={item.value}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-3xl md:text-3xl font-serif font-light text-[#2a2a2a] mb-2"
                      >
                        {item.value}
                      </motion.div>
                      <div className="text-[8px] uppercase tracking-[0.2em] text-[#b76e79]/60 font-bold">
                        {item.label}
                      </div>
                    </div>
                    {index < 3 && (
                      <div className="w-[1px] h-8 bg-[#e6d5c3]/40 self-center"></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Calendar;
