import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift } from 'lucide-react';
import { CONFIG } from '../config';
import { RSVPConfirmModal } from './RSVPConfirmModal';
import { GiftModal } from './GiftModal';

/**
 * RSVP component handles the registration for the wedding and gift options.
 */
export default function RSVP() {
  const [formData, setFormData] = useState({
    guestName: '',
    message: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState(false);

  // Sync body scroll with modal state
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
    <section id="rsvp" className="py-12 md:py-24 px-4 md:px-12 bg-[#fdfaf7] relative overflow-hidden flex items-center justify-center font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="w-full max-w-2xl bg-white/60 backdrop-blur-md p-4 md:p-14 rounded-[3rem] shadow-[0_15px_40px_rgba(183,110,121,0.08)] border border-white relative z-10"
      >
        <div className="text-center mb-6 md:mb-12">
          <span className="text-[#b76e79] font-serif italic text-lg block mb-2">R.S.V.P</span>
          <h2 className="text-3xl sm:text-5xl font-cursive text-[#2a2a2a] mb-4 md:mb-6">Xác Nhận Tham Dự</h2>
          <div className="w-20 h-px bg-[#b76e79]/30 mx-auto mb-6"></div>
          <p className="font-serif italic text-[#4a4a4a] text-lg">Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng tôi</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-8">
          <div>
            <label htmlFor="guestName" className="block text-[10px] font-bold uppercase tracking-[0.3em] text-[#b76e79] mb-2 md:mb-4">Danh Tính Khách Mời</label>
            <input 
              type="text" 
              id="guestName" 
              required 
              placeholder="Xin vui lòng nhập họ và tên của bạn..."
              value={formData.guestName}
              onChange={(e) => setFormData({...formData, guestName: e.target.value})}
              className="w-full border-b-2 border-[#e6d5c3] bg-transparent focus:border-[#b76e79] transition-all duration-500 py-3 outline-none font-serif text-xl text-[#2a2a2a] placeholder:text-stone-300 placeholder:italic" 
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-[10px] font-bold uppercase tracking-[0.3em] text-[#b76e79] mb-2 md:mb-4">Lời Chúc Tới Đôi Bạn Trẻ</label>
            <textarea 
              id="message" 
              rows={4} 
              placeholder="Gửi gắm những lời chúc tốt đẹp hoặc những lưu ý riêng..."
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full bg-white/50 border-2 border-[#e6d5c3]/30 rounded-2xl p-5 focus:border-[#b76e79]/50 focus:bg-white transition-all duration-500 outline-none resize-none font-serif text-lg text-[#2a2a2a] shadow-inner"
            ></textarea>
          </div>
          
          <div className="pt-4 pb-2">
            <button 
              type="submit" 
              className="w-full bg-[#b76e79] text-white py-3 md:py-5 rounded-2xl text-base md:text-lg font-serif uppercase tracking-[0.1em] md:tracking-[0.3em] shadow-[0_10px_25px_rgba(183,110,121,0.15)] hover:bg-[#a35d68] hover:shadow-[0_15px_30px_rgba(183,110,121,0.25)] transition-all duration-500 hover:-translate-y-1 active:scale-[0.98] overflow-hidden group relative"
            >
              <span className="relative z-10">Xác Nhận & Gửi Lời Chúc</span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setShowGiftModal(true)}
              className="group inline-flex items-center gap-2 text-[#b76e79] font-serif italic hover:text-[#a35d68] transition-colors"
            >
              <Gift size={20} className="group-hover:animate-bounce" />
              <span>Gửi quà mừng cưới đến chúng mình</span>
            </button>
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
