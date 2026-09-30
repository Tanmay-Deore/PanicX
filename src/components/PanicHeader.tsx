import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sliders, Activity, Sparkles, Flame } from 'lucide-react';
import { TAGLINES } from '../utils/mockData';
import { sound } from '../utils/soundEngine';
import { GlitchText } from './hostile/GlitchText';

interface PanicHeaderProps {
  onOpenSettings: () => void;
  onTogglePanicMode: () => void;
  isPanicMode: boolean;
  panicLevel: number;
  onLogoClick: () => void;
}

export const PanicHeader: React.FC<PanicHeaderProps> = ({
  onOpenSettings,
  onTogglePanicMode,
  isPanicMode,
  panicLevel,
  onLogoClick,
}) => {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [volume, setVolume] = useState(sound.getVolume());

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % TAGLINES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleMuteToggle = () => {
    const nextMute = !isMuted;
    sound.setMuted(nextMute);
    setIsMuted(nextMute);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    sound.setVolume(val);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-cyan-500/20 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo & Tagline */}
        <div className="flex items-center gap-4 cursor-pointer" onClick={onLogoClick}>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse" />
            <div className="relative px-3 py-1.5 bg-slate-950 rounded-lg flex items-center gap-2 border border-cyan-500/40">
              <Flame className="w-5 h-5 text-cyan-400 animate-bounce" />
              <span className="font-black text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-500">
                PANICX
              </span>
            </div>
          </div>

          {/* Tagline */}
          <div className="hidden md:flex flex-col border-l border-slate-800 pl-4">
            <span className="text-xs font-mono text-cyan-400/90 font-semibold tracking-wide">
              "Professional Trading. Unprofessional Interface."
            </span>
            <span className="text-[11px] font-mono text-slate-400 italic flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <GlitchText text={TAGLINES[taglineIndex]} triggerOnHover={true} />
            </span>
          </div>
        </div>

        {/* Right Header Controls */}
        <div className="flex items-center gap-3">
          {/* Panic Level Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-amber-500/30 text-xs font-mono">
            <Activity className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="text-slate-400">PANIC:</span>
            <span className="font-bold text-amber-300">{panicLevel}%</span>
          </div>

          {/* Sound Controls */}
          <div className="flex items-center gap-2 bg-slate-900/70 border border-slate-800 px-2.5 py-1 rounded-xl">
            <button
              onClick={handleMuteToggle}
              title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
              className="p-1 rounded text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-cyan-400" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-14 h-1 accent-cyan-400 cursor-pointer hidden lg:block"
            />
          </div>

          {/* Settings from Hell */}
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-purple-500/40 text-purple-300 hover:bg-purple-500/10 text-xs font-mono font-bold transition-all cursor-pointer shadow-sm hover:shadow-purple-500/20"
          >
            <Sliders className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">Settings</span>
          </button>

          {/* PANIC MODE CTA */}
          <button
            onClick={onTogglePanicMode}
            className={`px-4 py-1.5 rounded-xl font-mono font-black text-xs uppercase tracking-wider cursor-pointer shadow-lg transition-all flex items-center gap-1.5 ${
              isPanicMode
                ? 'bg-rose-600 text-white animate-pulse shadow-rose-500/50 border border-rose-400'
                : 'bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 border border-amber-300 shadow-amber-500/30 hover:scale-105'
            }`}
          >
            <Activity className="w-4 h-4" />
            {isPanicMode ? 'EXIT PANIC MODE' : 'PANIC MODE'}
          </button>
        </div>
      </div>
    </header>
  );
};
