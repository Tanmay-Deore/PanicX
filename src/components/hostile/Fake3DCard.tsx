import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface Fake3DCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export const Fake3DCard: React.FC<Fake3DCardProps> = ({
  children,
  className = '',
  intensity = 25,
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rY = ((mouseX - width / 2) / (width / 2)) * intensity;
    const rX = -((mouseY - height / 2) / (height / 2)) * intensity;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="perspective-1000" style={{ perspective: 1000 }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX, rotateY }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
        className={`glass-panel p-5 rounded-2xl relative transition-shadow duration-300 hover:shadow-[0_0_35px_rgba(6,182,212,0.25)] ${className}`}
      >
        <div style={{ transform: 'translateZ(30px)' }}>{children}</div>
      </motion.div>
    </div>
  );
};
