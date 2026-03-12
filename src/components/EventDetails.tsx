import React from 'react';
import { motion } from 'motion/react';

export default function EventDetails() {
  return (
    <section 
      id="details" 
      className="relative py-24 parallax-bg"
      style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDUQYIYfe4o3E57uHS_8lSG1xbiDeqCS_TCVdIxSThhT6dYfc8ciHwcLnX4Zn_j9IODMvFU1-xwG5oN8kSpYDCw3zYOk3ponaot9U2vB8bQ0TNzKyGtmLCnCHKw1NUXxMdA3orBT_MuKUAGS6l_VzpwSD19ulgnHIuZkDZVLENkQwgsLVkBiVgGn6Acjpeu8kZ8ACPpZrigXZK6hNQhEztMIDGIU-rxvtLUJxqQIVVPyL-m5Tz9XKRylVunfKEIHqEpCUFhL8AbAV0')" }}
    >
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 md:gap-12 text-white">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 border border-white/20 p-8 md:p-12 rounded-2xl backdrop-blur-md text-center"
        >
          <h3 className="text-4xl font-cursive mb-6 text-champagne">Lễ Cưới Truyền Thống</h3>
          <div className="mb-4">
            <p className="text-xl font-serif mb-1 uppercase tracking-widest">Thời Gian</p>
            <p className="text-lg">Thứ Bảy, ngày 24 tháng 9 năm 2025</p>
            <p className="text-lg">Lúc 14:30</p>
          </div>
          <div className="mb-8">
            <p className="text-xl font-serif mb-1 uppercase tracking-widest">Địa Điểm</p>
            <p className="text-lg">Nhà Thờ St. Jude</p>
            <p className="text-stone-300">123 Heritage Lane, Phố Cổ, Florence</p>
          </div>
          <a href="#" className="inline-block border border-champagne px-8 py-3 rounded-full hover:bg-champagne hover:text-stone-800 transition-all duration-300">
            Xem Bản Đồ
          </a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/10 border border-white/20 p-8 md:p-12 rounded-2xl backdrop-blur-md text-center"
        >
          <h3 className="text-4xl font-cursive mb-6 text-champagne">Tiệc Cưới</h3>
          <div className="mb-4">
            <p className="text-xl font-serif mb-1 uppercase tracking-widest">Thời Gian</p>
            <p className="text-lg">Thứ Bảy, ngày 24 tháng 9 năm 2025</p>
            <p className="text-lg">Lúc 18:00</p>
          </div>
          <div className="mb-8">
            <p className="text-xl font-serif mb-1 uppercase tracking-widest">Địa Điểm</p>
            <p className="text-lg">Khu Vườn Grand Villa Rose</p>
            <p className="text-stone-300">456 Emerald Way, Đỉnh đồi Tuscany</p>
          </div>
          <a href="#" className="inline-block border border-champagne px-8 py-3 rounded-full hover:bg-champagne hover:text-stone-800 transition-all duration-300">
            Xem Bản Đồ
          </a>
        </motion.div>
      </div>
    </section>
  );
}
