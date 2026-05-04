import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift } from 'lucide-react';
import { CONFIG } from '../config';
import { RSVPConfirmModal } from './RSVPConfirmModal';
import { GiftModal } from './GiftModal';

/// Floating heart particle for romantic background atmosphere
function FloatingHeart({ delay, x, size }: { delay: number; x: string; size: number }) {
  return (
    <motion.div
      className="absolute bottom-0 text-accent/10 pointer-events-none select-none"
      style={{ left: x, fontSize: size }}
      animate={{
        y: [0, -400, -800],
        x: [0, 15, -15, 0],
        opacity: [0, 0.6, 0],
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration: 12,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      ♡
    </motion.div>
  );
}

/**
 * RSVP component handles the registration for the wedding and gift options.
 * Enhanced with floating hearts, shimmering submit button, and refined focus states.
 */
export default function RSVP() {
  const [formData, setFormData] = useState({
    guestName: '',
    message: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (showModal || showGiftModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal, showGiftModal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleCloseConfirm = () => {
    setShowModal(false);
    setFormData({ guestName: '', message: '' });
  };

  return (
    <section id="rsvp" className="py-16 md:py-24 px-4 md:px-12 bg-primary relative overflow-hidden flex items-center justify-center font-sans">
      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <FloatingHeart delay={0} x="10%" size={20} />
        <FloatingHeart delay={3} x="85%" size={16} />
        <FloatingHeart delay={6} x="45%" size={18} />
        <FloatingHeart delay={9} x="70%" size={14} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="w-full max-w-2xl bg-primary px-6 py-8 md:p-14 rounded-sm shadow-[0_15px_50px_rgba(0,0,0,0.08)] border border-secondary relative z-10 tactile-card"
      >
        <div className="text-center mb-10 md:mb-14">
          <span className="text-accent font-serif italic text-base md:text-lg block mb-4 uppercase tracking-[0.2em] font-bold opacity-70">R.S.V.P</span>
          <h2 className="text-3xl sm:text-6xl font-cursive text-text-title mb-6 leading-tight italic opacity-90">Xác Nhận Tham Dự</h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent mx-auto mb-8 relative">
             <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary px-2 text-accent text-[10px]">❦</span>
          </div>
          <p className="font-serif italic text-text-main text-lg md:text-xl opacity-80">Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng tôi</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-10">
          <div className="relative group/field">
            <label htmlFor="guestName" className="block text-[10px] font-serif font-bold uppercase tracking-[0.4em] text-accent mb-4 opacity-70 group-focus-within/field:opacity-100 transition-opacity">Danh Tính Khách Mời</label>
            <div className="relative">
              <input 
                type="text" 
                id="guestName" 
                required 
                placeholder="Xin vui lòng nhập họ và tên của bạn..."
                value={formData.guestName}
                onChange={(e) => setFormData({...formData, guestName: e.target.value})}
                className="w-full border-b-[1px] border-secondary bg-transparent focus:border-accent transition-all duration-700 py-3 outline-none font-serif text-xl md:text-2xl text-text-title placeholder:text-stone-300 placeholder:italic placeholder:text-base md:placeholder:text-lg peer" 
              />
              {/* Animated focus underline */}
              <div className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-gradient-to-r from-accent/60 via-accent to-accent/60 peer-focus:w-full peer-focus:left-0 transition-all duration-500" />
            </div>
          </div>
          
          <div className="relative group/field">
            <label htmlFor="message" className="block text-[10px] font-serif font-bold uppercase tracking-[0.4em] text-accent mb-4 opacity-70 group-focus-within/field:opacity-100 transition-opacity">Lời Chúc Tới Đôi Bạn Trẻ</label>
            <div className="relative">
              <textarea 
                id="message" 
                rows={isMobile ? 2 : 1} 
                placeholder={isMobile ? "Gửi gắm những lời chúc tốt đẹp\nhoặc những lưu ý riêng..." : "Gửi gắm những lời chúc tốt đẹp hoặc những lưu ý riêng..."}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full border-b-[1px] border-secondary bg-transparent focus:border-accent transition-all duration-700 py-3 outline-none outline-0 resize-none font-serif text-xl md:text-2xl text-text-title placeholder:text-stone-300 placeholder:italic placeholder:text-base md:placeholder:text-lg overflow-hidden peer"
              ></textarea>
              {/* Animated focus underline */}
              <div className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-gradient-to-r from-accent/60 via-accent to-accent/60 peer-focus:w-full peer-focus:left-0 transition-all duration-500" />
            </div>
          </div>
          
          <div className="pt-4 flex flex-col gap-6">
            <button 
              type="submit" 
              className="w-full relative z-10 bg-accent text-white py-4 md:py-5 rounded-full font-serif text-base md:text-lg tracking-[0.2em] uppercase shadow-lg shadow-accent/20 hover:bg-[#a35d68] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer overflow-hidden group/btn hover:shadow-xl hover:shadow-accent/30"
            >
              <span className="relative z-10">Gửi Lời Chúc</span>
              {/* Shimmer highlight effect */}
              <div className="absolute inset-0 shimmer-btn" />
            </button>

            <div className="relative flex items-center justify-center py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-secondary to-transparent"></div>
              </div>
              <div className="relative bg-primary px-4">
                <span className="text-[10px] font-serif tracking-[0.4em] text-accent opacity-70 whitespace-nowrap">Hoặc</span>
              </div>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowGiftModal(true)}
                className="group inline-flex items-center gap-3 text-accent font-serif italic hover:text-[#a35d68] transition-all"
              >
                <Gift size={22} className="group-hover:rotate-12 transition-transform opacity-70" />
                <span className="text-sm md:text-base border-b border-transparent group-hover:border-accent/30 transition-all">Gửi quà mừng cưới đến chúng mình</span>
              </button>
            </div>
          </div>
        </form>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <RSVPConfirmModal 
            show={showModal} 
            onClose={handleCloseConfirm} 
            guestName={formData.guestName}
            message={formData.message}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showGiftModal && (
          <GiftModal 
            show={showGiftModal} 
            onClose={() => setShowGiftModal(false)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
