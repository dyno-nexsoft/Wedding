import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Copy, ExternalLink, X, Gift, Check } from 'lucide-react';
import { CONFIG } from '../config';

export default function RSVP() {
  const [formData, setFormData] = useState({
    guestName: '',
    message: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const fullMessage = `XÁC NHẬN THAM DỰ ĐÁM CƯỚI:
- Tên: ${formData.guestName}
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

  const copyToClipboardAccount = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(text);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  const getVietQRUrl = (bankId: string, accountNo: string, accountName: string) => {
    const encodedName = encodeURIComponent(accountName.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/Đ/g, "D"));
    return `https://img.vietqr.io/image/${bankId}-${accountNo}-compact.png?accountName=${encodedName}`;
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ guestName: '', message: '' });
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="rsvp" className="py-12 md:py-24 px-6 md:px-12 bg-[#fdfaf7] relative overflow-hidden flex items-center justify-center">

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="w-full max-w-2xl bg-white/60 backdrop-blur-md p-6 md:p-14 rounded-[3rem] shadow-[0_20px_50px_rgba(183,110,121,0.1)] border border-white relative z-10"
      >
        <div className="text-center mb-6 md:mb-12">
          <span className="text-accent font-serif italic text-lg block mb-2">R.S.V.P</span>
          <h2 className="text-4xl sm:text-5xl font-cursive text-text-title mb-4 md:mb-6">Xác Nhận Tham Dự</h2>
          <div className="w-20 h-px bg-accent/30 mx-auto mb-6"></div>
          <p className="font-serif italic text-text-main text-lg">Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng tôi</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-8">
          <div>
            <label htmlFor="guestName" className="block text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-2 md:mb-4">Danh Tính Khách Mời</label>
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
          
          
          <div>
            <label htmlFor="message" className="block text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-2 md:mb-4">Lời Chúc Tới Đôi Bạn Trẻ</label>
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
              className="w-full bg-accent text-white py-3 md:py-5 rounded-2xl text-base md:text-lg font-serif uppercase tracking-[0.1em] md:tracking-[0.3em] shadow-[0_15px_30px_rgba(183,110,121,0.25)] hover:bg-[#a35d68] hover:shadow-[0_20px_40px_rgba(183,110,121,0.35)] transition-all duration-500 hover:-translate-y-1 active:scale-[0.98] overflow-hidden group relative"
            >
              <span className="relative z-10">Sẽ Tham Dự & Gửi Lời Chúc</span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setShowGiftModal(true)}
              className="group inline-flex items-center gap-2 text-accent font-serif italic hover:text-[#a35d68] transition-colors"
            >
              <Gift size={20} className="group-hover:animate-bounce" />
              <span>Gửi quà mừng cưới đến chúng mình</span>
            </button>
          </div>
        </form>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center sm:p-6 p-0">
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
              className="relative w-full h-full sm:h-auto max-w-lg bg-[#fdfaf7] sm:rounded-[3rem] shadow-2xl overflow-y-auto sm:overflow-hidden border-0 sm:border border-white flex flex-col justify-center"
            >
              <div className="px-6 py-10 sm:p-10 text-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 12, delay: 0.2 }}
                  className="w-20 h-20 sm:w-24 sm:h-24 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 border border-accent/20"
                >
                  <CheckCircle className="w-10 h-10 sm:w-14 sm:h-14" strokeWidth={1.5} />
                </motion.div>
                
                <h3 className="text-2xl sm:text-3xl font-cursive text-text-title mb-2 sm:mb-3">Cảm ơn bạn yêu!</h3>
                <p className="font-serif text-text-main/80 mb-6 sm:mb-10 text-base sm:text-lg leading-relaxed">
                  Thông tin phản hồi đã được chuẩn bị sẵn sàng.<br/>
                  Bạn vui lòng gửi qua Zalo để chúng mình ghi nhận nhé!
                </p>
                
                <div className="bg-white/80 backdrop-blur-sm border border-secondary rounded-[2rem] p-5 sm:p-6 text-left mb-8 sm:mb-10 relative group shadow-inner">
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
                    onClick={openZalo}
                    className="py-5 bg-accent text-white rounded-2xl font-serif tracking-widest uppercase text-sm flex items-center justify-center gap-2 hover:bg-[#a35d68] transition-all duration-300 shadow-lg shadow-accent/20"
                  >
                    <ExternalLink size={20} /> Mở Zalo
                  </button>
                  <button 
                    onClick={closeModal}
                    className="py-5 border border-secondary/50 rounded-2xl text-text-main font-serif tracking-widest uppercase text-sm hover:bg-white transition-all duration-300"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showGiftModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowGiftModal(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full md:max-w-2xl bg-white md:rounded-3xl shadow-2xl overflow-hidden h-full md:h-auto md:max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-center mb-6 md:mb-8">
                  <h3 className="font-cursive text-2xl md:text-4xl text-[#2a2a2a] pr-4">Thông Tin Tài Khoản</h3>
                  <button onClick={() => setShowGiftModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>

                <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
                  {/* Groom Account */}
                  <div className="bg-[#fdfaf7] p-5 md:p-6 rounded-2xl border border-[#e6d5c3] relative">
                    <div className="absolute top-4 right-4 text-[10px] font-sans tracking-widest text-[#b76e79] uppercase font-bold">Chú Rể</div>
                    
                    <div className="space-y-4 text-left">
                      <div>
                        <p className="text-[10px] uppercase text-gray-400 font-sans tracking-wider">Chủ tài khoản</p>
                        <p className="font-serif font-bold text-[#4a4a4a]">{CONFIG.wedding.bank.groom.name}</p>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase text-gray-400 font-sans tracking-wider">Ngân hàng</p>
                        <p className="font-serif font-bold text-[#b76e79]">{CONFIG.wedding.bank.groom.bankName}</p>
                      </div>

                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[10px] uppercase text-gray-400 font-sans tracking-wider">Số tài khoản</p>
                          <p className="font-serif font-bold text-lg md:text-xl text-[#b76e79]">{CONFIG.wedding.bank.groom.number}</p>
                        </div>
                        <button 
                          onClick={() => copyToClipboardAccount(CONFIG.wedding.bank.groom.number)}
                          className="p-2 bg-white rounded-lg border border-[#e6d5c3] text-gray-400 hover:text-[#b76e79] hover:border-[#b76e79] transition-all"
                        >
                          {copiedAccount === CONFIG.wedding.bank.groom.number ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="mt-6 flex justify-center">
                      <img 
                        src={getVietQRUrl(CONFIG.wedding.bank.groom.bankId, CONFIG.wedding.bank.groom.number, CONFIG.wedding.bank.groom.name)} 
                        alt="QR chú rể" 
                        className="w-48 h-48 md:w-44 md:h-44 rounded-lg shadow-sm" 
                      />
                    </div>
                  </div>

                  {/* Bride Account */}
                  <div className="bg-[#fdfaf7] p-5 md:p-6 rounded-2xl border border-[#e6d5c3] relative">
                    <div className="absolute top-4 right-4 text-[10px] font-sans tracking-widest text-[#b76e79] uppercase font-bold text-opacity-70">Cô Dâu</div>
                    
                    <div className="space-y-4 text-left">
                      <div>
                        <p className="text-[10px] uppercase text-gray-400 font-sans tracking-wider">Chủ tài khoản</p>
                        <p className="font-serif font-bold text-[#4a4a4a]">{CONFIG.wedding.bank.bride.name}</p>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase text-gray-400 font-sans tracking-wider">Ngân hàng</p>
                        <p className="font-serif font-bold text-[#b76e79]">{CONFIG.wedding.bank.bride.bankName}</p>
                      </div>

                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[10px] uppercase text-gray-400 font-sans tracking-wider">Số tài khoản</p>
                          <p className="font-serif font-bold text-lg md:text-xl text-[#b76e79]">{CONFIG.wedding.bank.bride.number}</p>
                        </div>
                        <button 
                          onClick={() => copyToClipboardAccount(CONFIG.wedding.bank.bride.number)}
                          className="p-2 bg-white rounded-lg border border-[#e6d5c3] text-gray-400 hover:text-[#b76e79] hover:border-[#b76e79] transition-all"
                        >
                          {copiedAccount === CONFIG.wedding.bank.bride.number ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="mt-6 flex justify-center">
                      <img 
                        src={getVietQRUrl(CONFIG.wedding.bank.bride.bankId, CONFIG.wedding.bank.bride.number, CONFIG.wedding.bank.bride.name)} 
                        alt="QR cô dâu" 
                        className="w-48 h-48 md:w-44 md:h-44 rounded-lg shadow-sm" 
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center pb-8 md:pb-0">
                  <p className="font-cursive text-2xl text-[#b76e79]">Cảm ơn bạn rất nhiều!</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
