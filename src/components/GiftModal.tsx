import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Copy, Check } from 'lucide-react';
import { CONFIG } from '../config';
import { getVietQRUrl } from '../utils/weddingUtils';

interface GiftModalProps {
  show: boolean;
  onClose: () => void;
}

export const GiftModal: React.FC<GiftModalProps> = ({ show, onClose }) => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  if (!show) return null;

  const copyToClipboardAccount = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(text);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
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
            <h3 className="font-cursive text-2xl md:text-4xl text-text-title pr-4">Thông Tin Tài Khoản</h3>
            <button onClick={onClose} className="p-2 hover:bg-accent/5 rounded-full transition-colors">
              <X className="w-6 h-6 text-accent/40" />
            </button>
          </div>

          <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
            {/* Groom Account */}
            <div className="bg-primary p-5 md:p-6 rounded-2xl border border-secondary relative">
              <div className="absolute top-4 right-4 text-[10px] font-sans tracking-widest text-accent uppercase font-bold">Chú Rể</div>
              
              <div className="space-y-4 text-left">
                <div>
                  <p className="text-[10px] uppercase text-gray-400 font-sans tracking-wider">Chủ tài khoản</p>
                  <p className="font-serif font-bold text-text-main">{CONFIG.wedding.bank.groom.name}</p>
                </div>

                <div>
                  <p className="text-[10px] uppercase text-gray-400 font-sans tracking-wider">Ngân hàng</p>
                  <p className="font-serif font-bold text-accent">{CONFIG.wedding.bank.groom.bankName}</p>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 font-sans tracking-wider">Số tài khoản</p>
                    <p className="font-serif font-bold text-lg md:text-xl text-accent">{CONFIG.wedding.bank.groom.number}</p>
                  </div>
                  <button 
                    onClick={() => copyToClipboardAccount(CONFIG.wedding.bank.groom.number)}
                    className="p-2 bg-white rounded-lg border border-secondary text-accent/40 hover:text-accent-warm hover:border-accent-warm transition-all"
                  >
                    {copiedAccount === CONFIG.wedding.bank.groom.number ? <Check className="w-4 h-4 text-accent-warm" /> : <Copy className="w-4 h-4" />}
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
            <div className="bg-primary p-5 md:p-6 rounded-2xl border border-secondary relative">
              <div className="absolute top-4 right-4 text-[10px] font-sans tracking-widest text-accent uppercase font-bold text-opacity-70">Cô Dâu</div>
              
              <div className="space-y-4 text-left">
                <div>
                  <p className="text-[10px] uppercase text-gray-400 font-sans tracking-wider">Chủ tài khoản</p>
                  <p className="font-serif font-bold text-text-main">{CONFIG.wedding.bank.bride.name}</p>
                </div>

                <div>
                  <p className="text-[10px] uppercase text-gray-400 font-sans tracking-wider">Ngân hàng</p>
                  <p className="font-serif font-bold text-accent">{CONFIG.wedding.bank.bride.bankName}</p>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] uppercase text-accent/60 font-serif tracking-wider">Chủ tài khoản</p>
                    <p className="font-serif font-bold text-lg md:text-xl text-accent">{CONFIG.wedding.bank.bride.number}</p>
                  </div>
                  <button 
                    onClick={() => copyToClipboardAccount(CONFIG.wedding.bank.bride.number)}
                    className="p-2 bg-white rounded-lg border border-secondary text-accent/40 hover:text-accent-warm hover:border-accent-warm transition-all"
                  >
                    {copiedAccount === CONFIG.wedding.bank.bride.number ? <Check className="w-4 h-4 text-accent-warm" /> : <Copy className="w-4 h-4" />}
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
            <p className="font-cursive text-2xl text-accent">Cảm ơn bạn rất nhiều!</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
