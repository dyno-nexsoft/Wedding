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

  return (
    <section id="calendar" className="py-24 bg-[#fdfaf7] relative overflow-hidden">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-[#e6d5c3] relative overflow-hidden"
        >
          {/* Decorative Heart for background */}
          <div className="absolute -top-10 -right-10 opacity-5 pointer-events-none">
            <Heart size={200} fill="#b76e79" />
          </div>

          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl uppercase tracking-[0.3em] text-[#b76e79] mb-2">
              Lưu Lại Ngày Vui
            </h2>
            <p className="font-cursive text-4xl text-[#2a2a2a]">{CONFIG.wedding.monthYear}</p>
          </div>

          <div className="grid grid-cols-7 border-t border-b border-[#e6d5c3] py-4 mb-4">
            {weekDays.map(day => (
              <div key={day} className="text-center text-[10px] uppercase font-sans tracking-widest text-gray-400 font-bold">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-4">
            {days.map((d, i) => (
              <div key={i} className="flex items-center justify-center h-10 relative">
                {d === date ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, type: 'spring', stiffness: 200 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="relative">
                       <div className="w-10 h-10 border-2 border-[#b76e79] rounded-lg rotate-3 flex items-center justify-center bg-[#b76e79]/10">
                         <span className="font-serif font-bold text-[#b76e79]">{d}</span>
                       </div>
                    </div>
                  </motion.div>
                ) : (
                  <span className={`font-serif ${d ? 'text-[#4a4a4a]' : 'text-transparent'}`}>
                    {d}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center">
            <div className="inline-block px-6 py-2 border-l-2 border-r-2 border-[#e6d5c3] font-serif text-lg italic text-[#4a4a4a] mb-8">
              {new Intl.DateTimeFormat('vi-VN', { weekday: 'long', hour: '2-digit', minute: '2-digit' }).format(weddingDate)}
            </div>

            {/* COUNTDOWN TIMER */}
            <div className="flex gap-4 md:gap-8">
              {[
                { label: 'Ngày', value: timeLeft.days },
                { label: 'Giờ', value: timeLeft.hours },
                { label: 'Phút', value: timeLeft.minutes },
                { label: 'Giây', value: timeLeft.seconds }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-cursive text-[#b76e79] mb-1">
                    {item.value}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Calendar;
