import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, X, Copy, Check } from 'lucide-react';
import { CONFIG } from '../config';

const GiftSection: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(text);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  const getVietQRUrl = (bankId: string, accountNo: string, accountName: string) => {
    const encodedName = encodeURIComponent(accountName.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/Đ/g, "D"));
    return `https://img.vietqr.io/image/${bankId}-${accountNo}-compact.png?accountName=${encodedName}`;
  };

  return (
    <section className="py-24 bg-[#fdfaf7] text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md border border-[#e6d5c3]">
            <Gift className="w-8 h-8 text-[#b76e79]" />
          </div>
        </div>
        <h2 className="font-cursive text-5xl text-[#2a2a2a] mb-4">Gửi Quà Mừng Cưới</h2>
        <p className="font-serif italic text-[#4a4a4a] mb-12 max-w-lg mx-auto">
          Sự hiện diện của bạn là món quà lớn nhất đối với chúng mình. 
          Nếu bạn muốn gửi một món quà nhỏ, bạn có thể sử dụng thông tin bên dưới.
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#b76e79] text-white px-10 py-4 rounded-full font-serif text-lg shadow-lg hover:bg-[#a35d68] transition-all hover:scale-105 active:scale-95"
        >
          Mừng Cưới Đến Cặp Đôi
        </button>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full md:max-w-2xl bg-white md:rounded-3xl shadow-2xl overflow-hidden h-full md:h-auto md:max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-center mb-6 md:mb-8">
                  <h3 className="font-cursive text-3xl md:text-4xl text-[#2a2a2a]">Thông Tin Tài Khoản</h3>
                  <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>

                <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
                  {/* Groom Account */}
                  <div className="bg-[#fdfaf7] p-5 md:p-6 rounded-2xl border border-[#e6d5c3] relative">
                    <div className="absolute top-4 right-4 text-[10px] font-sans tracking-widest text-[#b76e79] uppercase font-bold">Chú Rể</div>
                    <h4 className="font-serif text-lg md:text-xl mb-4 text-[#2a2a2a]">{CONFIG.wedding.bank.groom.bankName}</h4>
                    <div className="space-y-3 text-left">
                      <div>
                        <p className="text-[10px] uppercase text-gray-400 font-sans tracking-wider">Chủ tài khoản</p>
                        <p className="font-serif font-bold text-[#4a4a4a]">{CONFIG.wedding.bank.groom.name}</p>
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[10px] uppercase text-gray-400 font-sans tracking-wider">Số tài khoản</p>
                          <p className="font-serif font-bold text-lg md:text-xl text-[#b76e79]">{CONFIG.wedding.bank.groom.number}</p>
                        </div>
                        <button 
                          onClick={() => copyToClipboard(CONFIG.wedding.bank.groom.number)}
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
                    <h4 className="font-serif text-lg md:text-xl mb-4 text-[#2a2a2a]">{CONFIG.wedding.bank.bride.bankName}</h4>
                    <div className="space-y-3 text-left">
                      <div>
                        <p className="text-[10px] uppercase text-gray-400 font-sans tracking-wider">Chủ tài khoản</p>
                        <p className="font-serif font-bold text-[#4a4a4a]">{CONFIG.wedding.bank.bride.name}</p>
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[10px] uppercase text-gray-400 font-sans tracking-wider">Số tài khoản</p>
                          <p className="font-serif font-bold text-lg md:text-xl text-[#b76e79]">{CONFIG.wedding.bank.bride.number}</p>
                        </div>
                        <button 
                          onClick={() => copyToClipboard(CONFIG.wedding.bank.bride.number)}
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
};

export default GiftSection;
