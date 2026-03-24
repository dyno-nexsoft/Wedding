import React from 'react';
import { CONFIG } from '../config';

export default function Footer() {
  const initials = `${CONFIG.wedding.bride.firstName[0]} & ${CONFIG.wedding.groom.firstName[0]}`;
  return (
    <footer className="pt-16 pb-32 md:pb-24 bg-[#fdfaf7] text-center text-[#a3a3a3] font-serif relative">
      {/* Decorative top divider */}
      <div className="section-divider mb-8" />

      {/* Animated heartbeat on initials */}
      <p className="text-3xl font-cursive text-[#b76e79] mb-4 animate-heartbeat inline-block">{initials}</p>
      <p className="text-xs tracking-[0.3em] uppercase text-[#b76e79]/40">LÀM VỚI TÌNH YÊU • Tháng {CONFIG.wedding.date.month} Năm {CONFIG.wedding.date.year}</p>
    </footer>
  );
}
