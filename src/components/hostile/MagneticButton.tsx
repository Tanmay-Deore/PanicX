import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { sound } from '../../utils/soundEngine';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  className = '',
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  const ref = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) * 0.35;
    const distanceY = (e.clientY - centerY) * 0.35;

    const rotX = -(e.clientY - centerY) * 0.15;
    const rotY = (e.clientX - centerX) * 0.15;

    setPosition({ x: distanceX, y: distanceY, rotateX: rotX, rotateY: rotY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  };

  const handleMouseEnter = () => {
    sound.playHover();
  };

  const handleClick = () => {
    sound.playClick();
    if (onClick) onClick();
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      animate={{
        x: position.x,
        y: position.y,
        rotateX: position.rotateX,
        rotateY: position.rotateY,
      }}
      transition={{ type: 'spring', stiffness: 250, damping: 15 }}
      style={{ transformStyle: 'preserve-3d' }}
      className={`relative px-5 py-2.5 rounded-xl font-semibold text-sm cursor-pointer shadow-lg overflow-hidden ${className}`}
    >
      <div className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 opacity-0 hover:opacity-100 transition-opacity"
        style={{ pointerEvents: 'none' }}
      />
    </motion.button>
  );
};
