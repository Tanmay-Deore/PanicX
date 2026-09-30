import React, { useEffect, useState } from 'react';
import { sound } from '../utils/soundEngine';
import confetti from 'canvas-confetti';

interface EasterEggProps {
  onUnlockEgg: (title: string, message: string) => void;
}

export const EasterEggManager: React.FC<EasterEggProps> = ({ onUnlockEgg }) => {
  const [typedKeys, setTypedKeys] = useState('');

  useEffect(() => {
    // Key sequence listener for "PANIC"
    const handleKeyDown = (e: KeyboardEvent) => {
      const char = e.key.toUpperCase();
      const updated = (typedKeys + char).slice(-5);
      setTypedKeys(updated);

      if (updated === 'PANIC') {
        sound.playCelebration();
        try {
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        } catch (err) {}
        onUnlockEgg('EASTER EGG #6', 'SECRET PANIC PROTOCOL ACTIVATED! 🎉');
        setTypedKeys('');
      }
    };

    // Window resize listener (Easter Egg #12)
    let resizeTimer: number;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        onUnlockEgg('EASTER EGG #12', 'Interesting way to use a website.');
      }, 500);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [typedKeys, onUnlockEgg]);

  return null;
};
