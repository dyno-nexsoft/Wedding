/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import Hero from './components/Hero';
import OurStory from './components/OurStory';
import EventDetails from './components/EventDetails';
import Gallery from './components/Gallery';
import RSVP from './components/RSVP';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import Timeline from './components/Timeline';
import Calendar from './components/Calendar';
import DressCode from './components/DressCode';
import LoadingScreen from './components/LoadingScreen';

export default function App() {
  const [loading, setLoading] = useState(() => {
    // Check sessionStorage immediately during initialization to avoid flash
    return typeof window !== 'undefined' && !sessionStorage.getItem('hasLoaded');
  });

  useEffect(() => {
    if (loading) {
      // First time in this session: show full loading
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('hasLoaded', 'true');
      }, 3000);

      const handleLoad = () => {
        setLoading(false);
        sessionStorage.setItem('hasLoaded', 'true');
      };

      window.addEventListener('load', handleLoad);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('load', handleLoad);
      };
    }
  }, [loading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      <div className="bg-[#fdfaf7] text-[#4a4a4a] font-sans overflow-x-hidden">
        <Hero />
        <OurStory />
        <Gallery />
        <Calendar />
        <Timeline />
        <EventDetails />
        <DressCode />
        <RSVP />
        <Footer />
        <MusicPlayer />
      </div>
    </>
  );
}

