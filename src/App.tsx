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

export default function App() {
  return (
    <div className="bg-[#FFFAF5] text-stone-800 font-sans overflow-x-hidden">
      <Hero />
      <OurStory />
      <EventDetails />
      <Gallery />
      <RSVP />
      <Footer />
    </div>
  );
}

