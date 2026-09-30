import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';
import { sound } from '../utils/soundEngine';

interface PanicModeOverlayProps {
  isPanicMode: boolean;
  onExitPanicMode: () => void;
}

export const PanicModeOverlay: React.FC<PanicModeOverlayProps> = ({
  isPanicMode,
  onExitPanicMode,
}) => {
  if (!isPanicMode) return null;

  return (
    <div className="fixed inset-0 z-30 pointer-events-none border-4 border-rose-500/60 animate-pulse">
      {/* Background pulsing red atmospheric glow */}
      <div className="absolute inset-0 bg-rose-950/15 pointer-events-none" />

      {/* Floating Panic Mode Banner at the top */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="pointer-events-auto bg-gradient-to-r from-rose-600 via-amber-600 to-rose-600 p-2 text-center text-white font-mono font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl"
      >
        <ShieldAlert className="w-4 h-4 animate-bounce" />
        <span>PANIC MODE: 100% — RELAX. IT'S SIMULATED.</span>
        <button
          onClick={() => {
            sound.playClick();
            onExitPanicMode();
          }}
          className="ml-4 px-3 py-0.5 rounded bg-slate-950 text-rose-300 hover:text-white border border-rose-400 text-[11px] cursor-pointer"
        >
          [ EXIT PANIC MODE ]
        </button>
      </motion.div>
    </div>
  );
};
