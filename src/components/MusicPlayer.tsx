import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Music2, Volume2, VolumeX } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showHint, setShowHint] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Tự động tắt hint sau 5 giây
    const timer = setTimeout(() => setShowHint(false), 5000);
    
    const startAudio = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setShowHint(false);
          removeListeners();
        }).catch(err => {
          console.log("Playback still prevented:", err);
        });
      }
    };

    const removeListeners = () => {
      window.removeEventListener('click', startAudio);
      window.removeEventListener('scroll', startAudio);
      window.removeEventListener('touchstart', startAudio);
    };

    // Thử phát ngay nếu trình duyệt cho phép
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Nếu bị chặn, đợi tương tác
        setIsPlaying(false);
        window.addEventListener('click', startAudio);
        window.addEventListener('scroll', startAudio);
        window.addEventListener('touchstart', startAudio);
      });
    }

    return () => {
      clearTimeout(timer);
      removeListeners();
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.error("Audio playback failed:", err);
          alert("Vui lòng tương tác với trang web để phát nhạc.");
        });
      }
      setIsPlaying(!isPlaying);
      setShowHint(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <AnimatePresence>
        {showHint && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute left-16 bottom-2 bg-white px-4 py-2 rounded-full shadow-lg border border-champagne whitespace-nowrap hidden md:block"
          >
            <p className="text-xs font-serif italic text-roseGold">Phát nhạc lãng mạn nhẹ nhàng ✨</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 bg-white border-2 ${isPlaying ? 'border-roseGold text-roseGold' : 'border-stone-200 text-stone-400'}`}
      >
        {isPlaying ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Music2 size={24} />
          </motion.div>
        ) : (
          <VolumeX size={24} />
        )}
        
        {isPlaying && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -inset-1 rounded-full border border-roseGold animate-ping opacity-20"
          />
        )}
      </motion.button>

      <audio 
        ref={audioRef}
        src="/song.mp3" 
        autoPlay
        loop 
      />
    </div>
  );
}
