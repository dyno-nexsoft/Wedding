/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Hero from './components/Hero';
import OurStory from './components/OurStory';
import EventDetails from './components/EventDetails';
import Gallery from './components/Gallery';
import RSVP from './components/RSVP';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import GiftSection from './components/GiftSection';
import Timeline from './components/Timeline';
import Calendar from './components/Calendar';
import DressCode from './components/DressCode';

export default function App() {
  return (
    <div className="bg-[#fdfaf7] text-[#4a4a4a] font-sans overflow-x-hidden">
      <Hero />
      <OurStory />
      <Gallery />
      <Calendar />
      <Timeline />
      <EventDetails />
      <DressCode />
      <GiftSection />
      <RSVP />
      <Footer />
      <MusicPlayer />
    </div>
  );
}

