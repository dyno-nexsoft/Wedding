import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Copy, ExternalLink, X } from 'lucide-react';
import { CONFIG } from '../config';

interface RSVPConfirmModalProps {
  show: boolean;
  onClose: () => void;
  guestName: string;
  message: string;
}

export const RSVPConfirmModal: React.FC<RSVPConfirmModalProps> = ({ 
  show, 
  onClose, 
  guestName, 
  message 
}) => {
  const [copied, setCopied] = useState(false);

  if (!show) return null;

  const fullMessage = `XÁC NHẬN THAM DỰ ĐÁM CƯỚI:
- Tên: ${guestName}
- Lời nhắn: ${message || 'Hẹn gặp hai bạn nhé!'}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openZalo = () => {
    navigator.clipboard.writeText(fullMessage);
    const zaloUrl = `https://zalo.me/${CONFIG.wedding.rsvpPhoneNumber}`;
    window.open(zaloUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center sm:p-6 p-0">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/80 backdrop-blur-md"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        className="relative w-full h-full sm:h-auto max-w-lg bg-primary sm:rounded-sm shadow-2xl overflow-y-auto sm:overflow-hidden border-0 sm:border border-secondary flex flex-col justify-center tactile-card"
      >
        {/* Local Paper Texture for Modal */}
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
            <div className="absolute -top-3 left-6 px-3 bg-primary text-accent text-[10px] font-bold uppercase tracking-widest border border-secondary rounded-full">
              Nội dung xác nhận
            </div>
            <pre className="text-sm text-text-main whitespace-pre-wrap font-sans leading-relaxed pt-2">
              {fullMessage}
            </pre>
            <button 
              onClick={copyToClipboard}
              className="absolute bottom-4 right-4 p-3 bg-white border border-secondary rounded-xl text-accent/40 hover:text-accent-warm hover:border-accent-warm transition-all duration-300 shadow-sm flex items-center gap-2"
            >
              {copied ? <span className="text-xs font-bold text-accent-warm">Đã chép!</span> : <Copy size={20} />}
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
              onClick={onClose}
              className="py-5 border border-secondary/50 rounded-2xl text-text-main font-serif tracking-widest uppercase text-sm hover:bg-white transition-all duration-300"
            >
              Đóng
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
