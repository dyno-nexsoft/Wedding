import React from 'react';
import { CONFIG } from '../config';

export default function Footer() {
  const initials = `${CONFIG.wedding.bride.split(' ').pop()?.[0]} & ${CONFIG.wedding.groom.split(' ').pop()?.[0]}`;
  return (
    <footer className="py-16 bg-[#fdfaf7] text-center text-[#a3a3a3] font-serif relative">
      {/* Decorative top divider */}
      <div className="section-divider mb-8" />

      {/* Animated heartbeat on initials */}
      <p className="text-3xl font-cursive text-[#b76e79] mb-4 animate-heartbeat inline-block">{initials}</p>
      <p className="text-xs tracking-[0.3em] uppercase text-[#b76e79]/40">LÀM VỚI TÌNH YÊU • {CONFIG.wedding.monthYear}</p>
    </footer>
  );
}
