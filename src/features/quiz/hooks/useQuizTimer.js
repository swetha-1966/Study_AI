import { useState, useEffect, useCallback } from 'react';

export function useQuizTimer(initialSeconds = 600, onTimeUp) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive || secondsLeft <= 0) {
      if (secondsLeft === 0 && onTimeUp) onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, secondsLeft, onTimeUp]);

  const pause = useCallback(() => setIsActive(false), []);
  const resume = useCallback(() => setIsActive(true), []);
  const reset = useCallback((secs = initialSeconds) => {
    setSecondsLeft(secs);
    setIsActive(true);
  }, [initialSeconds]);

  const minutes = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  const isWarning = secondsLeft <= 60;

  return { secondsLeft, formattedTime, isWarning, pause, resume, reset };
}
