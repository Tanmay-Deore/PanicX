import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../../utils/soundEngine';

interface MisleadingButtonProps {
  initialLabel?: string;
  hoverLabel?: string;
  clickedLabel?: string;
  onClick?: () => void;
  className?: string;
}

export const MisleadingButton: React.FC<MisleadingButtonProps> = ({
  initialLabel = 'START SIMULATION',
  hoverLabel = 'REALLY?',
  clickedLabel = 'TOO LATE',
  onClick,
  className = '',
}) => {
  const [label, setLabel] = useState(initialLabel);

  const handleMouseEnter = () => {
    sound.playHover();
    setLabel(hoverLabel);
  };

  const handleMouseLeave = () => {
    setLabel(initialLabel);
  };

  const handleClick = () => {
    sound.playClick();
    setLabel(clickedLabel);
    setTimeout(() => setLabel(initialLabel), 1500);
    if (onClick) onClick();
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`px-5 py-2.5 rounded-xl font-mono font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg cursor-pointer transition-all border border-cyan-300/40 ${className}`}
    >
      {label}
    </motion.button>
  );
};
