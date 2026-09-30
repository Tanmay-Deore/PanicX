import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../../utils/soundEngine';

interface CursedLoaderProps {
  onComplete?: () => void;
  title?: string;
}

export const CursedLoader: React.FC<CursedLoaderProps> = ({
  onComplete,
  title = 'INITIALIZING MARKET INTELLIGENCE...',
}) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  const startSequence = () => {
    setProgress(0);
    setStatusText('');
    setIsFinished(false);
    sound.playStartup();

    setTimeout(() => setProgress(23), 200);
    setTimeout(() => setProgress(61), 450);
    setTimeout(() => setProgress(89), 700);
    setTimeout(() => setProgress(99), 1000);

    // Pause at 99%
    setTimeout(() => {
      sound.playRecordScratch();
      setStatusText('Almost...');
    }, 1400);

    // Drop BACKWARDS to 73%
    setTimeout(() => {
      sound.playDescendingError();
      setProgress(73);
      setStatusText('Oops. Recalibrating universe...');
    }, 1900);

    setTimeout(() => setProgress(81), 2300);
    setTimeout(() => setProgress(98), 2600);

    setTimeout(() => {
      setStatusText('Fine.');
      setProgress(99);
    }, 2900);

    setTimeout(() => {
      setProgress(100);
      setStatusText('Loading complete.');
      sound.playCelebration();
      setIsFinished(true);
      if (onComplete) onComplete();
    }, 3200);
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 max-w-lg w-full text-center space-y-4">
      <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
        <span className="animate-pulse">{title}</span>
        <span className="font-bold text-sm text-cyan-300">{progress}%</span>
      </div>

      {/* Progress Track */}
      <div className="relative h-4 bg-slate-900 rounded-full overflow-hidden border border-slate-700 p-0.5">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.8)]"
          animate={{ width: `${progress}%` }}
          transition={{ ease: 'easeInOut', duration: 0.3 }}
        />
      </div>

      <div className="h-6 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {statusText && (
            <motion.p
              key={statusText}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-xs font-mono text-pink-400 font-bold"
            >
              {statusText}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {!isFinished && progress === 0 && (
        <button
          onClick={startSequence}
          className="px-4 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono cursor-pointer transition-all"
        >
          [ Run System Diagnostic ]
        </button>
      )}
    </div>
  );
};
