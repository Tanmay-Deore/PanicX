import React, { useEffect, useRef } from 'react';
import { sound } from '../utils/soundEngine';

interface IdleDetectorProps {
  onIdleTrigger: (msg: string) => void;
}

export const IdleDetector: React.FC<IdleDetectorProps> = ({ onIdleTrigger }) => {
  const idleTimer = useRef<number | null>(null);
  const isIdle = useRef(false);

  const resetTimer = () => {
    if (isIdle.current) {
      isIdle.current = false;
      onIdleTrigger("Oh. You're back.");
    }

    if (idleTimer.current) clearTimeout(idleTimer.current);

    idleTimer.current = window.setTimeout(() => {
      isIdle.current = true;
      sound.playIdleCough();
      onIdleTrigger('Are you waiting for something?');
    }, 20000); // 20s idle
  };

  useEffect(() => {
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('click', resetTimer);
    resetTimer();

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('click', resetTimer);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  return null;
};
