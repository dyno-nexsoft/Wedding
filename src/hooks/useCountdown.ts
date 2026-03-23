import { useState, useEffect, useCallback } from 'react';
import { toJSDate } from '../utils/weddingUtils';

/**
 * useCountdown hook calculates and updates the time remaining until a target date.
 * @param targetDate - The target date string (ISO format) or date object.
 * @returns An object containing formatted days, hours, minutes, and seconds.
 */
export function useCountdown(targetDate: any) {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  const calculateTimeLeft = useCallback(() => {
    const dateObj = (targetDate?.năm) ? toJSDate(targetDate) : new Date(targetDate);
    const target = dateObj.getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      return {
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00'
      };
    }

    const d = Math.floor(difference / (1000 * 60 * 60 * 24));
    const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days: d.toString().padStart(2, '0'),
      hours: h.toString().padStart(2, '0'),
      minutes: m.toString().padStart(2, '0'),
      seconds: s.toString().padStart(2, '0')
    };
  }, [targetDate]);

  useEffect(() => {
    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      const nextTimeLeft = calculateTimeLeft();
      setTimeLeft(prev => {
        // Only update state if values actually changed to avoid unnecessary re-renders
        if (
          prev.days === nextTimeLeft.days &&
          prev.hours === nextTimeLeft.hours &&
          prev.minutes === nextTimeLeft.minutes &&
          prev.seconds === nextTimeLeft.seconds
        ) {
          return prev;
        }
        return nextTimeLeft;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateTimeLeft]);

  return timeLeft;
}
