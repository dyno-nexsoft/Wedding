import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CONFIG } from '../config';

export default function RSVP() {
  const [formData, setFormData] = useState({
    guestName: '',
    phone: '',
    attendance: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const attendanceText = formData.attendance === 'attending' ? 'Sẽ tham dự' : 'Rất tiếc không thể tham dự';
    const messageBody = `XÁC NHẬN THĂM DỰ ĐÁM CƯỚI:
- Tên: ${formData.guestName}
- SĐT: ${formData.phone}
- Tham dự: ${attendanceText}
- Lời nhắn: ${formData.message}`;

    // Lưu ý: Zalo không hỗ trợ pre-fill message qua URL như WhatsApp.
    // Tuy nhiên, chúng ta sẽ mở link Zalo và có thể lưu lời nhắn vào bộ nhớ tạm (nếu muốn) 
    // hoặc đơn giản là điều hướng đến Zalo của bạn.
    
    const zaloUrl = `https://zalo.me/${CONFIG.wedding.rsvpPhoneNumber}`;
    
    // Hiện tại Zalo chủ yếu mở profile, khách sẽ cần paste hoặc tự soạn tin nhắn.
    // Để tiện nhất, chúng ta hiện thông báo rồi mở Zalo.
    alert('Thông tin của bạn đã sẵn sàng! Trang sẽ chuyển hướng sang Zalo để bạn gửi tin nhắn xác nhận.');
    window.open(zaloUrl, '_blank');
    
    setFormData({ guestName: '', phone: '', attendance: '', message: '' });
  };

  return (
    <section id="rsvp" className="py-24 px-6 md:px-12 bg-white flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl bg-[#FFFAF5] p-6 sm:p-8 md:p-12 rounded-3xl shadow-xl border border-champagne"
      >
        <div className="text-center mb-10">
          <h2 className="text-5xl font-cursive text-roseGold mb-4">Xác Nhận Tham Dự</h2>
          <p className="font-serif italic text-gray-500">Chúng tôi rất mong bạn có thể chung vui trong ngày đặc biệt này!</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="guestName" className="block text-sm font-semibold uppercase tracking-widest text-stone-600 mb-2">Tên Khách Mời</label>
              <input 
                type="text" 
                id="guestName" 
                required 
                placeholder="Họ và tên của bạn"
                value={formData.guestName}
                onChange={(e) => setFormData({...formData, guestName: e.target.value})}
                className="w-full border-0 border-b-2 border-champagne bg-transparent focus:ring-0 focus:border-roseGold transition-colors py-2 outline-none" 
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold uppercase tracking-widest text-stone-600 mb-2">Số Điện Thoại</label>
              <input 
                type="tel" 
                id="phone" 
                placeholder="+1 (234) 567 890"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full border-0 border-b-2 border-champagne bg-transparent focus:ring-0 focus:border-roseGold transition-colors py-2 outline-none" 
              />
            </div>
          </div>
          
          <div className="py-4">
            <span className="block text-sm font-semibold uppercase tracking-widest text-stone-600 mb-4">Bạn sẽ tham dự chứ?</span>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-8">
              <label className="flex items-center cursor-pointer group">
                <input 
                  type="radio" 
                  name="attendance" 
                  value="attending" 
                  className="hidden peer"
                  checked={formData.attendance === 'attending'}
                  onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                />
                <div className="w-5 h-5 border-2 border-champagne rounded-full mr-3 peer-checked:bg-roseGold peer-checked:border-roseGold transition-all"></div>
                <span className="text-stone-700 group-hover:text-roseGold transition-colors">Sẵn Lòng Tham Dự</span>
              </label>
              <label className="flex items-center cursor-pointer group">
                <input 
                  type="radio" 
                  name="attendance" 
                  value="not-attending" 
                  className="hidden peer"
                  checked={formData.attendance === 'not-attending'}
                  onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                />
                <div className="w-5 h-5 border-2 border-champagne rounded-full mr-3 peer-checked:bg-roseGold peer-checked:border-roseGold transition-all"></div>
                <span className="text-stone-700 group-hover:text-roseGold transition-colors">Rất Tiếc Không Thể Tham Dự</span>
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
              className="w-full border-0 border-b-2 border-champagne bg-transparent focus:ring-0 focus:border-roseGold transition-colors py-2 outline-none resize-none"
            ></textarea>
          </div>
          
          <div className="pt-6">
            <button 
              type="submit" 
              className="w-full bg-roseGold text-white py-4 rounded-full text-lg font-serif uppercase tracking-[0.2em] shadow-lg hover:bg-stone-800 transition-all duration-300"
            >
              Gửi Xác Nhận
            </button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
