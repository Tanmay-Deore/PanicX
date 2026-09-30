import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../../utils/soundEngine';

interface RunawayButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  maxEscapes?: number;
}

export const RunawayButton: React.FC<RunawayButtonProps> = ({
  children,
  onClick,
  className = '',
  maxEscapes = 3,
}) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [escapeCount, setEscapeCount] = useState(0);
  const [microcopy, setMicrocopy] = useState<string | null>(null);

  const microcopies = [
    'Too slow.',
    'Nice try.',
    'You almost had me.',
    'Catch me if you can!',
  ];

  const handleMouseEnter = () => {
    if (escapeCount < maxEscapes) {
      sound.playWhoosh();
      const newX = (Math.random() - 0.5) * 160;
      const newY = (Math.random() - 0.5) * 100;
      setOffset({ x: newX, y: newY });
      const nextCount = escapeCount + 1;
      setEscapeCount(nextCount);
      setMicrocopy(microcopies[(nextCount - 1) % microcopies.length]);

      if (nextCount >= maxEscapes) {
        setTimeout(() => {
          setOffset({ x: 0, y: 0 });
          setMicrocopy('Fine. You can click me.');
        }, 800);
      }
    }
  };

  const handleClick = () => {
    sound.playClick();
    if (onClick) onClick();
  };

  return (
    <div className="relative inline-block">
      <motion.button
        animate={{ x: offset.x, y: offset.y }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-shadow shadow-lg ${className}`}
      >
        {children}
      </motion.button>
      {microcopy && (
        <motion.span
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-mono text-cyan-400 bg-slate-900/90 px-2 py-0.5 rounded border border-cyan-500/30 z-20 pointer-events-none"
        >
          {microcopy}
        </motion.span>
      )}
    </div>
  );
};
