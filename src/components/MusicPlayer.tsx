import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music2, VolumeX, Loader2 } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Tự động tắt hint sau 8 giây
    const timer = setTimeout(() => setShowHint(false), 8000);

    const handleWaiting = () => setIsLoading(true);
    const handlePlaying = () => {
      setIsLoading(false);
      setIsPlaying(true);
    };
    const handleCanPlay = () => setIsLoading(false);
    const handleLoadStart = () => setIsLoading(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('pause', handlePause);

    const startAudio = async () => {
      if (audio && !isPlaying) {
        try {
          await audio.play();
          setIsPlaying(true);
          setShowHint(false);
          removeListeners();
        } catch (err) {
          console.log("Interaction playback still prevented:", err);
        }
      }
    };

    const removeListeners = () => {
      window.removeEventListener('click', startAudio);
      window.removeEventListener('touchstart', startAudio);
      window.removeEventListener('scroll', startAudio);
    };

    // Thử phát ngay (thường bị chặn trên mobile)
    const attemptAutoplay = async () => {
      try {
        audio.load();
        await audio.play();
        setIsPlaying(true);
        setShowHint(false);
      } catch (err) {
        console.log("Autoplay prevented, waiting for interaction");
        window.addEventListener('click', startAudio, { once: true });
        window.addEventListener('touchstart', startAudio, { once: true });
        window.addEventListener('scroll', startAudio, { once: true });
      }
    };

    attemptAutoplay();

    return () => {
      clearTimeout(timer);
      removeListeners();
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  const togglePlay = async (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
        }
      }
      setShowHint(false);
    } catch (err) {
      console.error("Manual playback failed:", err);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {showHint && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute left-16 bottom-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-roseGold/20 whitespace-nowrap"
          >
            <p className="text-xs font-serif italic text-roseGold">Chạm để nghe nhạc đám cưới ✨</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        onTouchEnd={togglePlay}
        disabled={isLoading}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 bg-white border-2 ${
          isPlaying ? 'border-roseGold text-roseGold' : 'border-stone-200 text-stone-400'
        } ${isLoading ? 'opacity-80' : 'opacity-100'}`}
        aria-label={isPlaying ? "Tạm dừng nhạc" : "Phát nhạc"}
      >
        {isLoading ? (
          <Loader2 size={24} className="animate-spin text-roseGold" />
        ) : isPlaying ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Music2 size={24} />
          </motion.div>
        ) : (
          <VolumeX size={24} />
        )}
        
        {isPlaying && !isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -inset-1 rounded-full border border-roseGold animate-ping opacity-20"
          />
        )}
      </motion.button>

      <audio 
        ref={audioRef}
        src="song.m4a" 
        loop 
        preload="auto"
        playsInline
        onError={(e) => {
          console.error("Audio error details:", e);
          setIsLoading(false);
        }}
      />
    </div>
  );
}
