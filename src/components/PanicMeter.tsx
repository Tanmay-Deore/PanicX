import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Zap } from 'lucide-react';
import { sound } from '../utils/soundEngine';

interface PanicMeterProps {
  panicLevel: number;
  onPanicChange: (val: number) => void;
}

export const PanicMeter: React.FC<PanicMeterProps> = ({ panicLevel, onPanicChange }) => {
  const [panicLabel, setPanicLabel] = useState('Slightly Concerning');
  const [commentary, setCommentary] = useState('Everything is under control.');

  const labels = [
    { min: 0, max: 20, text: 'Totally Fine', sub: 'Unbelievably calm.' },
    { min: 21, max: 40, text: 'Fine-ish', sub: 'Low tension in the air.' },
    { min: 41, max: 60, text: 'Suspicious', sub: 'Something feels off.' },
    { min: 61, max: 80, text: 'Slightly Concerning', sub: 'We may be overreacting.' },
    { min: 81, max: 95, text: 'EXTREME CONCERN', sub: 'WHY IS EVERYTHING RED?' },
    { min: 96, max: 100, text: 'Absolute Chaos', sub: 'Abandon all rational thought.' },
  ];

  useEffect(() => {
    const current = labels.find((l) => panicLevel >= l.min && panicLevel <= l.max) || labels[3];
    setPanicLabel(current.text);
    setCommentary(current.sub);
  }, [panicLevel]);

  const handleJitterClick = () => {
    sound.playClick();
    const nextVal = Math.floor(Math.random() * 40) + 60; // 60-100
    onPanicChange(nextVal);
  };

  return (
    <div className="glass-panel p-5 rounded-2xl border border-amber-500/30 space-y-4 relative overflow-hidden micro-jitter">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-amber-400 animate-pulse" />
          <h3 className="font-mono font-bold text-amber-300 text-sm tracking-wider uppercase">
            MARKET PANIC METER
          </h3>
        </div>
        <button
          onClick={handleJitterClick}
          className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30 cursor-pointer"
        >
          [ Recalibrate Panic ]
        </button>
      </div>

      {/* Meter Gauge Visual */}
      <div className="relative py-2 flex flex-col items-center">
        {/* Semi circle arc gauge */}
        <div className="w-48 h-24 overflow-hidden relative flex items-end justify-center">
          <div className="w-48 h-48 rounded-full border-[14px] border-slate-800 border-t-amber-500 border-r-rose-500 border-l-cyan-500 transform rotate-45" />
          {/* Needle */}
          <motion.div
            className="absolute bottom-0 w-1 h-20 bg-amber-300 origin-bottom rounded-full shadow-[0_0_10px_rgba(251,191,36,0.8)]"
            animate={{ rotate: (panicLevel / 100) * 180 - 90 }}
            transition={{ type: 'spring', stiffness: 150, damping: 10 }}
          />
        </div>

        <div className="text-center mt-2">
          <div className="text-3xl font-black font-mono text-amber-400">{panicLevel}%</div>
          <div className="text-sm font-mono font-bold text-slate-200 mt-1 uppercase tracking-wide">
            {panicLabel}
          </div>
          <div className="text-xs font-mono text-slate-400 italic mt-0.5">"{commentary}"</div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-800 pt-3">
        <span>STABILITY: QUESTIONABLE</span>
        <span className="flex items-center gap-1 text-rose-400">
          <Zap className="w-3 h-3" /> VOLATILITY: HIGH
        </span>
      </div>
    </div>
  );
};
