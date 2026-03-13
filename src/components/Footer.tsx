import React from 'react';
import { CONFIG } from '../config';

export default function Footer() {
  const initials = `${CONFIG.wedding.bride[0]} & ${CONFIG.wedding.groom[0]}`;
  return (
    <footer className="py-12 bg-stone-100 text-center text-stone-500 font-serif">
      <p className="text-2xl font-cursive text-roseGold mb-4">{initials}</p>
      <p className="text-sm tracking-widest">LÀM VỚI TÌNH YÊU • {CONFIG.wedding.monthYear}</p>
    </footer>
  );
}
