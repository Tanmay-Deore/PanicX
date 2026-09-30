import React from 'react';
import { motion } from 'framer-motion';
import { CryptoCoin3D } from './3d/CryptoCoin3D';
import { RunawayButton } from './hostile/RunawayButton';
import { MagneticButton } from './hostile/MagneticButton';
import { RubberButton } from './hostile/RubberButton';
import { DelayedHover } from './hostile/DelayedHover';
import { GlitchText } from './hostile/GlitchText';
import { ArrowUpRight, Zap, RefreshCw, AlertTriangle } from 'lucide-react';

interface HeroSectionProps {
  onTriggerToast: (title: string, msg: string, type?: 'info' | 'warning' | 'panic') => void;
  onCoinClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onTriggerToast, onCoinClick }) => {
  return (
    <section className="relative overflow-hidden py-12 px-4 border-b border-cyan-500/10 hud-grid">
      {/* Background Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Hero Text & Hostile Controls */}
        <div className="lg:col-span-7 space-y-6 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Zap className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span>SIMULATED CRYPTOCURRENCY TERMINAL</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            THE TRADING TERMINAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">
              NOBODY ASKED FOR.
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl font-sans">
            Engineered with <span className="text-cyan-400 font-mono">10/10 visual perfection</span> and{' '}
            <span className="text-pink-400 font-mono">0/10 user tolerance</span>. Experience physics-based button resistance, cursing loading bars, and an AI that actively judges your life decisions.
          </p>

          {/* Action Buttons Showcase */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Runaway Button */}
            <RunawayButton
              onClick={() => onTriggerToast('Runaway Clicked!', 'You actually caught it. Impressive.', 'info')}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold border border-cyan-300/40"
            >
              <span className="flex items-center gap-1.5">
                EXECUTE ORDER <ArrowUpRight className="w-4 h-4" />
              </span>
            </RunawayButton>

            {/* Magnetic Button */}
            <MagneticButton
              onClick={() => onTriggerToast('Magnetic Attraction', 'The UI was drawn to your touch.', 'info')}
              className="bg-purple-900/60 hover:bg-purple-800/80 text-purple-200 border border-purple-400/40"
            >
              <span className="flex items-center gap-1.5">
                <RefreshCw className="w-4 h-4 text-purple-400" />
                MAGNETIC TRADE
              </span>
            </MagneticButton>

            {/* Rubber Button */}
            <RubberButton
              onClick={() => onTriggerToast('Squished!', 'That button took structural damage.', 'warning')}
              variant="red"
            >
              <span className="flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                DO NOT CLICK
              </span>
            </RubberButton>

            {/* Delayed Hover Button */}
            <DelayedHover tooltipText="Why are you hovering here?">
              <button
                onClick={() => onTriggerToast('Hover Survived', 'You waited 1.5 seconds just for this.', 'info')}
                className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-slate-300 font-mono text-sm cursor-pointer"
              >
                [ Delayed Hover Target ]
              </button>
            </DelayedHover>
          </div>

          {/* Live Micro Ticker */}
          <div className="pt-4 flex items-center gap-6 text-xs font-mono text-slate-400">
            <div>
              BTC: <GlitchText text="$104,321.42" className="text-cyan-400 font-bold" />
            </div>
            <div>
              ETH: <GlitchText text="$3,892.15" className="text-purple-400 font-bold" />
            </div>
            <div>
              PANIC: <GlitchText text="$42.069" className="text-pink-400 font-bold" />
            </div>
          </div>
        </div>

        {/* Right Column: 3D Crypto Coin & Floating Cards */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          {/* Floating Percentages Parallax Cards */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="absolute -top-4 -left-4 glass-panel px-3 py-1.5 rounded-xl border border-cyan-500/30 text-xs font-mono text-cyan-300 z-20 shadow-xl"
          >
            BTC +5.64% 🚀
          </motion.div>

          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
            className="absolute -bottom-2 -right-2 glass-panel px-3 py-1.5 rounded-xl border border-rose-500/30 text-xs font-mono text-rose-300 z-20 shadow-xl"
          >
            PANIC +420.69% 💥
          </motion.div>

          {/* 3D Coin Canvas */}
          <div className="w-full max-w-sm aspect-square relative">
            <CryptoCoin3D onCoinClick={onCoinClick} />
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[11px] font-mono text-cyan-400/80 bg-slate-950/80 px-2.5 py-0.5 rounded border border-cyan-500/20 pointer-events-none">
              [ Click 3D Coin ]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
