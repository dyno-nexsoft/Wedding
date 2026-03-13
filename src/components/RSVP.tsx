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
    <section id="rsvp" className="py-24 px-6 md:px-12 bg-white flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="w-full max-w-2xl bg-[#fdfaf7] p-6 sm:p-8 md:p-12 rounded-[2rem] shadow-2xl border border-[#e6d5c3]/50"
      >
        <div className="text-center mb-10">
          <h2 className="text-5xl font-cursive text-[#b76e79] mb-4">Xác Nhận Tham Dự</h2>
          <p className="font-serif italic text-[#4a4a4a]">Chúng tôi rất mong bạn có thể chung vui trong ngày đặc biệt này!</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="guestName" className="block text-sm font-semibold uppercase tracking-widest text-stone-600 mb-2">Tên Khách Mời</label>
              <input 
                type="text" 
                id="guestName" 
                required 
                placeholder="Họ và tên của bạn"
                value={formData.guestName}
                onChange={(e) => setFormData({...formData, guestName: e.target.value})}
                className="w-full border-0 border-b-2 border-secondary bg-transparent focus:ring-0 focus:border-accent transition-colors py-2 outline-none" 
              />
            </div>
          </div>
          
          <div className="py-4">
            <span className="block text-sm font-semibold uppercase tracking-widest text-stone-600 mb-4">Bạn sẽ tham dự chứ?</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer group ${
                formData.attendance === 'attending' 
                  ? 'border-[#b76e79] bg-[#b76e79]/5 shadow-sm' 
                  : 'border-stone-100 bg-white hover:border-[#b76e79]/30'
              }`}>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    name="attendance" 
                    value="attending" 
                    className="hidden"
                    checked={formData.attendance === 'attending'}
                    onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                  />
                  <div className={`w-6 h-6 border-2 rounded-full mr-3 flex items-center justify-center transition-all ${
                    formData.attendance === 'attending' ? 'border-[#b76e79] bg-[#b76e79]' : 'border-stone-300'
                  }`}>
                    {formData.attendance === 'attending' && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                  </div>
                  <span className={`font-serif text-lg transition-colors ${
                    formData.attendance === 'attending' ? 'text-[#b76e79] font-bold' : 'text-stone-600'
                  }`}>Sẵn Lòng Tham Dự</span>
                </div>
              </label>

              <label className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer group ${
                formData.attendance === 'not-attending' 
                  ? 'border-[#b76e79] bg-[#b76e79]/5 shadow-sm' 
                  : 'border-stone-100 bg-white hover:border-[#b76e79]/30'
              }`}>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    name="attendance" 
                    value="not-attending" 
                    className="hidden"
                    checked={formData.attendance === 'not-attending'}
                    onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                  />
                  <div className={`w-6 h-6 border-2 rounded-full mr-3 flex items-center justify-center transition-all ${
                    formData.attendance === 'not-attending' ? 'border-[#b76e79] bg-[#b76e79]' : 'border-stone-300'
                  }`}>
                    {formData.attendance === 'not-attending' && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                  </div>
                  <span className={`font-serif text-lg transition-colors ${
                    formData.attendance === 'not-attending' ? 'text-[#b76e79] font-bold' : 'text-stone-600'
                  }`}>Rất Tiếc Không Thể</span>
                </div>
              </label>
            </div>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-semibold uppercase tracking-widest text-stone-600 mb-2">Lời Nhắn Gửi</label>
            <textarea 
              id="message" 
              rows={3} 
              placeholder="Lưu ý về chế độ ăn uống hoặc lời chúc đến cô dâu chú rể..."
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full border-0 border-b-2 border-secondary bg-transparent focus:ring-0 focus:border-accent transition-colors py-2 outline-none resize-none"
            ></textarea>
          </div>
          
          <div className="pt-6">
            <button 
              type="submit" 
              className="w-full bg-[#b76e79] text-white py-4 rounded-full text-lg font-serif uppercase tracking-[0.2em] shadow-lg hover:bg-[#a35d68] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Gửi Xác Nhận
            </button>
          </div>
        </form>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={48} />
                </div>
                <h3 className="text-2xl font-serif text-stone-800 mb-2">Thông tin đã sẵn sàng!</h3>
                <p className="text-stone-500 mb-8">Bạn có thể sao chép lời nhắn bên dưới và gửi qua Zalo để chúng tôi dễ dàng ghi nhận nhé.</p>
                
                <div className="bg-[#FFFAF5] border border-secondary rounded-2xl p-4 text-left mb-8 relative group">
                  <pre className="text-xs text-stone-600 whitespace-pre-wrap font-sans">
                    {fullMessage}
                  </pre>
                  <button 
                    onClick={copyToClipboard}
                    className="absolute top-2 right-2 p-2 bg-white border border-secondary rounded-lg text-stone-400 hover:text-accent hover:border-accent transition-all flex items-center gap-2"
                  >
                    {copied ? <span className="text-[10px] font-bold text-green-500">Đã chép!</span> : <Copy size={16} />}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={closeModal}
                    className="py-4 border border-secondary rounded-full text-stone-500 font-semibold hover:bg-stone-50 transition-colors"
                  >
                    Đóng
                  </button>
                  <button 
                    onClick={openZalo}
                    className="py-4 bg-accent text-white rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-stone-800 transition-colors shadow-lg shadow-accent/20"
                  >
                    <ExternalLink size={18} /> Mở Zalo
                  </button>
                </div>
              </div>
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 transition-colors"
              >
                <X size={24} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
