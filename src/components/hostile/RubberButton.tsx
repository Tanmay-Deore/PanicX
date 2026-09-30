import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../../utils/soundEngine';

interface RubberButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'cyan' | 'purple' | 'red' | 'amber';
}

export const RubberButton: React.FC<RubberButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'cyan',
}) => {
  const [microcopy, setMicrocopy] = useState<string | null>(null);

  const colorClasses = {
    cyan: 'bg-cyan-600 hover:bg-cyan-500 text-slate-950 border border-cyan-400/50 shadow-cyan-500/20',
    purple: 'bg-purple-600 hover:bg-purple-500 text-white border border-purple-400/50 shadow-purple-500/20',
    red: 'bg-rose-600 hover:bg-rose-500 text-white border border-rose-400/50 shadow-rose-500/20',
    amber: 'bg-amber-500 hover:bg-amber-400 text-slate-950 border border-amber-300/50 shadow-amber-500/20',
  };

  const microcopies = ['Ow.', 'That was unnecessary.', 'Ouch!', 'Stop squishing me!'];

  const handleClick = () => {
    sound.playRubber();
    const randomMsg = microcopies[Math.floor(Math.random() * microcopies.length)];
    setMicrocopy(randomMsg);
    setTimeout(() => setMicrocopy(null), 1200);

    if (onClick) onClick();
  };

  return (
    <div className="relative inline-block">
      <motion.button
        whileTap={{
          scaleX: 1.35,
          scaleY: 0.65,
          rotate: [0, -6, 6, 0],
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 10 }}
        onClick={handleClick}
        className={`px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg cursor-pointer flex items-center justify-center gap-2 ${colorClasses[variant]} ${className}`}
      >
        {children}
      </motion.button>
      {microcopy && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: -25 }}
          exit={{ opacity: 0 }}
          className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-mono font-bold text-amber-300 bg-slate-900 px-2 py-0.5 rounded border border-amber-500/40 z-30 pointer-events-none shadow-xl"
        >
          {microcopy}
        </motion.span>
      )}
    </div>
  );
};
