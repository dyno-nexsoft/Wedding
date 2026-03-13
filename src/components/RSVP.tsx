import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Copy, ExternalLink, X } from 'lucide-react';
import { CONFIG } from '../config';

export default function RSVP() {
  const [formData, setFormData] = useState({
    guestName: '',
    attendance: 'attending',
    message: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const attendanceText = formData.attendance === 'attending' ? 'Sẽ tham dự' : 'Rất tiếc không thể tham dự';
  const fullMessage = `XÁC NHẬN THAM DỰ ĐÁM CƯỚI:
- Tên: ${formData.guestName}
- Tham dự: ${attendanceText}
- Lời nhắn: ${formData.message}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openZalo = () => {
    const zaloUrl = `https://zalo.me/${CONFIG.wedding.rsvpPhoneNumber}`;
    window.open(zaloUrl, '_blank');
    closeModal();
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ guestName: '', attendance: 'attending', message: '' });
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="rsvp" className="py-24 px-6 md:px-12 bg-[#fdfaf7] relative overflow-hidden flex items-center justify-center">
      {/* Decorative Accents */}
      <div className="absolute top-0 left-0 w-64 h-64 pointer-events-none opacity-10 rotate-180">
        <img src={CONFIG.assets.storyAccent} alt="Flower accent" />
      </div>
      <div className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none opacity-10">
        <img src={CONFIG.assets.storyAccent} alt="Flower accent" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="w-full max-w-2xl bg-white/60 backdrop-blur-md p-8 md:p-14 rounded-[3rem] shadow-[0_20px_50px_rgba(183,110,121,0.1)] border border-white relative z-10"
      >
        <div className="text-center mb-12">
          <span className="text-accent font-serif italic text-lg block mb-2">R.S.V.P</span>
          <h2 className="text-5xl font-cursive text-text-title mb-6">Xác Nhận Tham Dự</h2>
          <div className="w-20 h-px bg-accent/30 mx-auto mb-6"></div>
          <p className="font-serif italic text-text-main text-lg">Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng tôi</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="guestName" className="block text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-4">Danh Tính Khách Mời</label>
            <input 
              type="text" 
              id="guestName" 
              required 
              placeholder="Vui lòng nhập họ và tên của bạn"
              value={formData.guestName}
              onChange={(e) => setFormData({...formData, guestName: e.target.value})}
              className="w-full border-b-2 border-secondary bg-transparent focus:border-accent transition-all duration-500 py-3 outline-none font-serif text-xl text-text-title placeholder:text-stone-300 placeholder:italic" 
            />
          </div>
          
          <div className="py-2">
            <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-4">Bạn Sẽ Đến Chung Vui Chứ?</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'attending', label: 'Sẵn Lòng Tham Dự' },
                { id: 'not-attending', label: 'Rất Tiếc Không Thể' }
              ].map((option) => (
                <label key={option.id} className={`relative flex items-center p-3 sm:p-4 rounded-3xl border transition-all duration-500 cursor-pointer overflow-hidden group ${
                  formData.attendance === option.id 
                    ? 'border-accent bg-accent/5 shadow-[0_8px_20px_rgba(183,110,121,0.06)]' 
                    : 'border-secondary/30 bg-white/50 hover:border-accent/30'
                }`}>
                  <input 
                    type="radio" 
                    name="attendance" 
                    value={option.id} 
                    className="hidden"
                    checked={formData.attendance === option.id}
                    onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                  />
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-500 mr-3 flex-shrink-0 ${
                    formData.attendance === option.id ? 'border-accent bg-accent' : 'border-secondary'
                  }`}>
                    {formData.attendance === option.id && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>
                  <span className={`font-serif text-lg transition-colors ${
                    formData.attendance === option.id ? 'text-accent font-bold' : 'text-text-title'
                  }`}>{option.label}</span>
                  
                  {/* Decorative corner */}
                  <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border border-accent/20 transition-all duration-700 ${
                    formData.attendance === option.id ? 'scale-[4] opacity-10' : 'scale-100 opacity-0'
                  }`} />
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-4">Lời Chúc Tới Đôi Bạn Trẻ</label>
            <textarea 
              id="message" 
              rows={4} 
              placeholder="Gửi gắm yêu thương hoặc lưu ý về thực đơn của bạn..."
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full bg-white/50 border-2 border-secondary/30 rounded-2xl p-5 focus:border-accent/50 focus:bg-white transition-all duration-500 outline-none resize-none font-serif text-lg text-text-title shadow-inner"
            ></textarea>
          </div>
          
          <div className="pt-4 pb-2">
            <button 
              type="submit" 
              className="w-full bg-accent text-white py-5 rounded-2xl text-lg font-serif uppercase tracking-[0.3em] shadow-[0_15px_30px_rgba(183,110,121,0.25)] hover:bg-[#a35d68] hover:shadow-[0_20px_40px_rgba(183,110,121,0.35)] transition-all duration-500 hover:-translate-y-1 active:scale-[0.98] overflow-hidden group relative"
            >
              <span className="relative z-10">Gửi Lời Xác Nhận</span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </button>
          </div>
        </form>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-text-title/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-lg bg-[#fdfaf7] rounded-[3rem] shadow-2xl overflow-hidden border border-white"
            >
              <div className="p-10 text-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 12, delay: 0.2 }}
                  className="w-24 h-24 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-8 border border-accent/20"
                >
                  <CheckCircle size={56} strokeWidth={1.5} />
                </motion.div>
                
                <h3 className="text-3xl font-cursive text-text-title mb-3">Cảm ơn bạn yêu!</h3>
                <p className="font-serif text-text-main/80 mb-10 text-lg leading-relaxed">
                  Thông tin phản hồi đã được chuẩn bị sẵn sàng.<br/>
                  Bạn vui lòng gửi qua Zalo để chúng mình ghi nhận nhé!
                </p>
                
                <div className="bg-white/80 backdrop-blur-sm border border-secondary rounded-[2rem] p-6 text-left mb-10 relative group shadow-inner">
                  <div className="absolute -top-3 left-6 px-3 bg-[#fdfaf7] text-accent text-[10px] font-bold uppercase tracking-widest border border-secondary rounded-full">
                    Nội dung xác nhận
                  </div>
                  <pre className="text-sm text-text-main whitespace-pre-wrap font-sans leading-relaxed pt-2">
                    {fullMessage}
                  </pre>
                  <button 
                    onClick={copyToClipboard}
                    className="absolute bottom-4 right-4 p-3 bg-white border border-secondary rounded-xl text-text-main/40 hover:text-accent hover:border-accent transition-all duration-300 shadow-sm flex items-center gap-2"
                  >
                    {copied ? <span className="text-xs font-bold text-green-600">Đã chép!</span> : <Copy size={20} />}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button 
                    onClick={closeModal}
                    className="py-5 border border-secondary/50 rounded-2xl text-text-main font-serif tracking-widest uppercase text-sm hover:bg-white transition-all duration-300"
                  >
                    Đóng
                  </button>
                  <button 
                    onClick={openZalo}
                    className="py-5 bg-accent text-white rounded-2xl font-serif tracking-widest uppercase text-sm flex items-center justify-center gap-2 hover:bg-[#a35d68] transition-all duration-300 shadow-lg shadow-accent/20"
                  >
                    <ExternalLink size={20} /> Mở Zalo
                  </button>
                </div>
              </div>
              <button 
                onClick={closeModal}
                className="absolute top-8 right-8 text-secondary hover:text-accent transition-colors transition-all duration-300"
              >
                <X size={32} strokeWidth={1} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
