import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/soundEngine';
import { Flame } from 'lucide-react';

interface PageLoadAnimationProps {
  onComplete: () => void;
}

export const PageLoadAnimation: React.FC<PageLoadAnimationProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [message, setMessage] = useState('INITIALIZING MARKET INTELLIGENCE...');

  useEffect(() => {
    sound.playStartup();

    setTimeout(() => setStep(1), 500); // Dot & Line
    setTimeout(() => setStep(2), 1200); // Numbers
    setTimeout(() => {
      setStep(3); // Intelligence message
      setMessage('INTELLIGENCE INITIALIZED.');
    }, 2000);
    setTimeout(() => {
      setMessage('CONFIDENCE LEVEL: QUESTIONABLE.');
      sound.playRecordScratch();
    }, 2800);
    setTimeout(() => {
      sound.playCelebration();
      onComplete();
    }, 3600);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-6 overflow-hidden">
      {/* Laser line drawing */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: step >= 1 ? '100%' : 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
      />

      {/* Center Logo Materializing */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="relative z-10 flex flex-col items-center gap-3"
          >
            <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-400/50 shadow-[0_0_50px_rgba(6,182,212,0.5)]">
              <Flame className="w-12 h-12 text-cyan-400 animate-bounce" />
            </div>

            <h1 className="text-5xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-500 font-mono">
              PANICX
            </h1>
            <p className="text-xs font-mono text-cyan-400">
              "Professional Trading. Unprofessional Interface."
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ticker numbers */}
      {step >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 text-xs font-mono text-slate-400"
        >
          <span>BTC: $104,321.42</span>
          <span>•</span>
          <span>ETH: $3,892.15</span>
          <span>•</span>
          <span>PANIC: $42.069</span>
        </motion.div>
      )}

      {/* System Diagnostic Messages */}
      <div className="h-8 flex items-center justify-center z-10">
        <motion.div
          key={message}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-300 font-bold tracking-wider"
        >
          {message}
        </motion.div>
      </div>

      <button
        onClick={onComplete}
        className="text-[11px] font-mono text-slate-400 hover:text-cyan-300 underline cursor-pointer pt-4"
      >
        [ Skip Cinematic Intro ]
      </button>
    </div>
  );
};
