import React from 'react';
import { motion } from 'motion/react';
import { CalendarPlus, Map, Heart } from 'lucide-react';
import { CONFIG } from '../config';
import { useCountdown } from '../hooks/useCountdown';
import { generateGoogleCalendarUrl } from '../utils/weddingUtils';

/**
 * EventDetails component displays the main wedding event information.
 * It integrates the sophisticated Card UI and countdown logic directly.
 */
export default function EventDetails() {
  const timeLeft = useCountdown(CONFIG.wedding.date);
  const event = CONFIG.event;

  const handleAddToCalendar = () => {
    const url = generateGoogleCalendarUrl(event, CONFIG.wedding.coupleName, CONFIG.wedding.date);
    window.open(url, '_blank');
  };

  return (
    <section 
      id="details" 
      className="relative py-24 bg-[#fdfaf7] overflow-hidden"
    >
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="none" stroke="#b76e79" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4">
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full bg-white rounded-[2.5rem] shadow-xl shadow-[#b76e79]/5 border border-[#e6d5c3] overflow-hidden flex flex-col h-full"
          >
            {/* Event Info (Top Section) */}
            <div className="p-10 flex-1 flex flex-col justify-center text-center relative overflow-hidden">
              {/* Subtle Decorative Ornament */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none">
                <div className="w-12 h-[1px] bg-[#b76e79]"></div>
              </div>
              
              <Heart className="mx-auto text-[#b76e79] mb-6 opacity-30" size={28} />
              
              <h3 className="font-cursive text-4xl text-[#b76e79] mb-4 tracking-tight">{event.title}</h3>
              
              <div className="space-y-4">
                <p className="font-serif text-sm uppercase tracking-[0.3em] text-gray-400 font-medium">
                  {event.day.split(',')[0]}
                </p>
                
                <div className="text-5xl font-serif text-[#2a2a2a] font-light tracking-tighter">
                  {event.time}
                </div>
                
                <div className="pt-8 mt-8 border-t border-[#e6d5c3]/40">
                  <p className="font-serif text-[#4a4a4a] text-lg italic leading-relaxed">{event.location}</p>
                  <p className="text-[10px] text-gray-400 font-sans mt-3 tracking-[0.2em] uppercase leading-widest">{event.address}</p>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <button 
                  onClick={handleAddToCalendar}
                  className="inline-flex items-center gap-2 border border-[#b76e79] px-6 py-2.5 rounded-full text-[#b76e79] hover:bg-[#b76e79] hover:text-white transition-all duration-300 font-serif text-sm"
                >
                  <CalendarPlus size={18} /> Lưu Lịch
                </button>
                <a 
                  href={event.mapLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#b76e79] px-6 py-2.5 rounded-full text-white hover:bg-[#a55d68] transition-all duration-300 font-serif text-sm shadow-md shadow-[#b76e79]/20"
                >
                  <Map size={18} /> Mở Map
                </a>
              </div>
            </div>

            {/* Countdown (Bottom Section) */}
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
                        className="text-3xl font-serif font-light text-[#2a2a2a] mb-2"
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
}
