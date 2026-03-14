import React from 'react';
import { motion } from 'motion/react';
import { BellPlus } from 'lucide-react';
import { CONFIG } from '../config';

export default function EventDetails() {
  const addToCalendar = (event: typeof CONFIG.events[0]) => {
    const title = event.title;
    const location = event.location;
    const details = `Đám cưới ${CONFIG.wedding.coupleName}`;
    
    // Parse base date from wedding date
    const [datePart] = CONFIG.wedding.date.split('T');
    
    // Combine date with event time
    const startObj = new Date(`${datePart}T${event.time}:00`);
    const endObj = new Date(startObj.getTime() + 2 * 60 * 60 * 1000);
    
    // Format to YYYYMMDDTHHMMSSZ
    const formatUTC = (date: Date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    const startTimeStr = formatUTC(startObj);
    const endTimeStr = formatUTC(endObj);
    
    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}&dates=${startTimeStr}/${endTimeStr}`;
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <section 
      id="details" 
      className="relative py-24 parallax-bg"
      style={{ backgroundImage: `url('${CONFIG.assets.detailsBg}')` }}
    >
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-2 sm:px-6 grid md:grid-cols-2 gap-8 md:gap-12 text-white">
        {CONFIG.events.map((event, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut", delay: index * 0.2 }}
            className="bg-white/5 border border-white/10 p-6 md:p-12 rounded-3xl backdrop-blur-md text-center hover:bg-white/10 transition-colors"
          >
            <h3 className="text-4xl font-cursive mb-6 text-[#e6d5c3]">{event.title}</h3>
            <div className="mb-6">
              <p className="text-sm font-sans uppercase tracking-[0.3em] mb-2 text-white/60">Thời Gian</p>
              <p className="text-sm sm:text-xl font-serif">{event.day}</p>
              <p className="text-lg font-serif">Lúc {event.time}</p>
            </div>
            <div className="mb-10">
              <p className="text-sm font-sans uppercase tracking-[0.3em] mb-2 text-white/60">Địa Điểm</p>
              <p className="text-xl font-serif mb-1">{event.location}</p>
              <p className="text-white/70 font-sans">{event.address}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={event.mapLink} target="_blank" rel="noopener noreferrer" className="inline-block border border-[#e6d5c3] px-10 py-3 rounded-full text-[#e6d5c3] hover:bg-[#e6d5c3] hover:text-stone-900 transition-all duration-500 font-serif">
                Xem Bản Đồ
              </a>
              <button 
                onClick={() => addToCalendar(event)}
                className="inline-flex items-center gap-2 border border-white/30 px-8 py-3 rounded-full hover:bg-white hover:text-stone-800 transition-all duration-300"
              >
                <BellPlus size={18} /> Lưu Lịch Hẹn
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
