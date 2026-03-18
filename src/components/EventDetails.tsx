import React from 'react';
import { motion } from 'motion/react';
import { CalendarPlus, Map, Heart } from 'lucide-react';
import { CONFIG } from '../config';
import { useCountdown } from '../hooks/useCountdown';
import { generateGoogleCalendarUrl } from '../utils/weddingUtils';

/**
 * EventDetails component displays the main wedding event information
 * with animated gradient border, sophisticated countdown, and decorative ornaments.
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
      className="relative pt-8 pb-16 md:pt-12 md:pb-24 bg-[#fdfaf7] overflow-hidden"
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
            className="w-full relative"
          >
            {/* Animated gradient border wrapper */}
            <div 
              className="absolute inset-0 rounded-[2.5rem] p-[1px]"
              style={{
                background: 'linear-gradient(135deg, #e6d5c3, #b76e79, #f4a261, #e6d5c3)',
                backgroundSize: '300% 300%',
                animation: 'gradient-rotate 6s ease infinite',
                opacity: 0.6,
              }}
            />
            
            <div className="relative bg-white rounded-[2.5rem] shadow-xl shadow-[#b76e79]/5 overflow-hidden flex flex-col h-full">
              {/* Decorative corner ornaments */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-[#e6d5c3]/30 rounded-tl-lg pointer-events-none" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-[#e6d5c3]/30 rounded-tr-lg pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-[#e6d5c3]/30 rounded-bl-lg pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-[#e6d5c3]/30 rounded-br-lg pointer-events-none" />

              {/* Event Info (Top Section) */}
              <div className="p-6 md:p-10 flex-1 flex flex-col justify-center text-center relative overflow-hidden">
                {/* Subtle Decorative Ornament */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none">
                  <div className="w-12 h-[1px] bg-[#b76e79]"></div>
                </div>
                
                <Heart className="mx-auto text-[#b76e79] mb-5 md:mb-6 opacity-30" size={24} />
                
                <h3 className="font-cursive text-3xl md:text-4xl text-[#b76e79] mb-4 tracking-tight">{event.title}</h3>
                
                <div className="space-y-3 md:space-y-4">
                  <p className="font-serif text-[10px] md:text-sm uppercase tracking-[0.3em] text-gray-400 font-medium">
                    {event.day.split(',')[0]}
                  </p>
                  
                  <div className="text-4xl md:text-5xl font-serif text-[#2a2a2a] font-light tracking-tighter">
                    {event.time}
                  </div>
                  
                  <div className="pt-6 mt-6 md:pt-8 md:mt-8 border-t border-[#e6d5c3]/40">
                    <p className="font-serif text-[#4a4a4a] text-base md:text-lg italic leading-relaxed">{event.location}</p>
                    <p className="text-[9px] md:text-[10px] text-gray-400 font-sans mt-2 md:mt-3 tracking-[0.2em] uppercase leading-widest">{event.address}</p>
                  </div>
                </div>

                <div className="mt-8 md:mt-10 flex flex-wrap justify-center gap-3 md:gap-4">
                  <button 
                    onClick={handleAddToCalendar}
                    className="inline-flex items-center gap-2 border border-[#b76e79] px-4 md:px-6 py-2.5 rounded-full text-[#b76e79] hover:bg-[#b76e79] hover:text-white transition-all duration-300 font-serif text-xs md:text-sm whitespace-nowrap hover:shadow-md hover:shadow-[#b76e79]/20"
                  >
                    <CalendarPlus size={16} /> Lưu Lịch
                  </button>
                  <a 
                    href={event.mapLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#b76e79] px-4 md:px-6 py-2.5 rounded-full text-white hover:bg-[#a55d68] transition-all duration-300 font-serif text-xs md:text-sm shadow-md shadow-[#b76e79]/20 whitespace-nowrap hover:shadow-lg hover:shadow-[#b76e79]/30"
                  >
                    <Map size={16} /> Mở Map
                  </a>
                </div>
              </div>

              {/* Countdown (Bottom Section) */}
              <div className="bg-[#fdfaf7] border-t border-[#e6d5c3]/60 p-6 md:p-10 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-1 border border-[#e6d5c3]/60 rounded-full shadow-sm">
                  <p className="font-serif text-[9px] uppercase tracking-[0.3em] text-[#b76e79] font-bold">Đếm ngược</p>
                </div>
                
                <div className="flex justify-between items-center gap-2 md:gap-4">
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
                          initial={{ scale: 0.8, opacity: 0, y: -5 }}
                          animate={{ scale: 1, opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                          className="text-2xl md:text-3xl font-serif font-light text-[#2a2a2a] mb-1 md:mb-2"
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
