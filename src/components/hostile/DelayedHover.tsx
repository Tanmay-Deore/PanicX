import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../../utils/soundEngine';

interface DelayedHoverProps {
  children: React.ReactNode;
  tooltipText?: string;
  className?: string;
  delayMs?: number;
}

export const DelayedHover: React.FC<DelayedHoverProps> = ({
  children,
  tooltipText = 'Why are you hovering here?',
  className = '',
  delayMs = 1500,
}) => {
  const [isExploded, setIsExploded] = useState(false);
  const timerRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      sound.playGlitch();
      setIsExploded(true);
    }, delayMs);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsExploded(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-block ${className}`}
    >
      <motion.div
        animate={
          isExploded
            ? {
                scale: 1.12,
                rotate: [0, -4, 4, -2, 0],
                boxShadow: '0 0 30px rgba(6, 182, 212, 0.6)',
              }
            : { scale: 1, rotate: 0 }
        }
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>

      <AnimatePresence>
        {isExploded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: -8 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-cyan-950/90 border border-cyan-400 text-cyan-200 text-xs font-mono font-bold shadow-2xl z-50 whitespace-nowrap pointer-events-none"
          >
            {tooltipText}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-cyan-400" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
