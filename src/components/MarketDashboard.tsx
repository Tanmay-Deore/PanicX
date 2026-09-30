import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { CoinData } from '../types';
import { GlitchText } from './hostile/GlitchText';
import { sound } from '../utils/soundEngine';
import { BarChart2 } from 'lucide-react';

interface MarketDashboardProps {
  coins: CoinData[];
  selectedCoin: CoinData;
  onSelectCoin: (coin: CoinData) => void;
  onWhyClick: () => void;
}

export const MarketDashboard: React.FC<MarketDashboardProps> = ({
  coins,
  selectedCoin,
  onSelectCoin,
  onWhyClick,
}) => {
  const [activeTab, setActiveTab] = useState('15M');
  const [chartType, setChartType] = useState<'line' | 'candles' | 'depth'>('line');

  const tabs = [
    '1M',
    '5M',
    '15M',
    '1H',
    '4H',
    '1D',
    '1W',
    'CUSTOM',
    'ADVANCED CUSTOM',
    'VERY ADVANCED CUSTOM',
    'WHY',
  ];

  const handleTabClick = (tab: string) => {
    sound.playClick();
    if (tab === 'WHY') {
      onWhyClick();
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 space-y-6">
      {/* Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cyan-500/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
            <BarChart2 className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h2 className="font-mono font-bold text-lg text-slate-100 flex items-center gap-2">
              {selectedCoin.name} ({selectedCoin.symbol})
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-cyan-500/30">
                SIMULATED
              </span>
            </h2>
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <span>Price: <GlitchText text={`$${selectedCoin.price.toLocaleString()}`} className="text-cyan-300 font-bold" /></span>
              <span className={selectedCoin.change24h >= 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {selectedCoin.change24h >= 0 ? '+' : ''}{selectedCoin.change24h.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        {/* Chart View Toggle */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => { sound.playClick(); setChartType('line'); }}
            className={`px-3 py-1 rounded-lg cursor-pointer transition-all ${chartType === 'line' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            LINE
          </button>
          <button
            onClick={() => { sound.playClick(); setChartType('candles'); }}
            className={`px-3 py-1 rounded-lg cursor-pointer transition-all ${chartType === 'candles' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            CANDLES
          </button>
          <button
            onClick={() => { sound.playClick(); setChartType('depth'); }}
            className={`px-3 py-1 rounded-lg cursor-pointer transition-all ${chartType === 'depth' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            DEPTH
          </button>
        </div>
      </div>

      {/* Absurd Timeframe Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono cursor-pointer transition-all border ${
              tab === activeTab
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold border-cyan-400 shadow-lg'
                : tab === 'WHY'
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Chart Area Canvas / Visualizer */}
      <div className="h-72 bg-slate-950/80 rounded-xl border border-slate-800 p-4 relative overflow-hidden flex flex-col justify-between">
        {/* HUD Overlay Lines */}
        <div className="absolute inset-0 hud-grid opacity-50 pointer-events-none" />
        <div className="absolute top-2 right-2 text-[10px] font-mono text-cyan-500/50">
          HUD GRID :: LIVE STREAMING (SIMULATED)
        </div>

        {/* Dynamic Simulated Chart SVG */}
        <div className="w-full h-full relative flex items-center justify-center">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Sparkline Path */}
            {chartType === 'line' && (
              <>
                <path
                  d="M 0 140 Q 80 180, 150 90 T 300 110 T 420 40 T 500 20 L 500 200 L 0 200 Z"
                  fill="url(#chartGrad)"
                />
                <motion.path
                  d="M 0 140 Q 80 180, 150 90 T 300 110 T 420 40 T 500 20"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                />
              </>
            )}

            {/* Simulated Candles */}
            {chartType === 'candles' && (
              <g className="animate-pulse">
                <rect x="30" y="80" width="16" height="60" fill="#10b981" rx="2" />
                <line x1="38" y1="60" x2="38" y2="150" stroke="#10b981" strokeWidth="2" />

                <rect x="100" y="40" width="16" height="90" fill="#f43f5e" rx="2" />
                <line x1="108" y1="20" x2="108" y2="140" stroke="#f43f5e" strokeWidth="2" />

                <rect x="170" y="70" width="16" height="50" fill="#10b981" rx="2" />
                <line x1="178" y1="50" x2="178" y2="130" stroke="#10b981" strokeWidth="2" />

                <rect x="240" y="30" width="16" height="110" fill="#10b981" rx="2" />
                <line x1="248" y1="15" x2="248" y2="150" stroke="#10b981" strokeWidth="2" />

                <rect x="310" y="90" width="16" height="40" fill="#f43f5e" rx="2" />
                <line x1="318" y1="70" x2="318" y2="140" stroke="#f43f5e" strokeWidth="2" />

                <rect x="380" y="20" width="16" height="120" fill="#10b981" rx="2" />
                <line x1="388" y1="10" x2="388" y2="160" stroke="#10b981" strokeWidth="2" />
              </g>
            )}

            {/* Simulated Depth Chart */}
            {chartType === 'depth' && (
              <g>
                <path d="M 0 180 L 250 180 L 250 80 L 0 160 Z" fill="#10b981" opacity="0.3" />
                <path d="M 250 80 L 250 180 L 500 180 L 500 40 Z" fill="#f43f5e" opacity="0.3" />
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* Coin Selector Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {coins.map((coin) => (
          <div
            key={coin.id}
            onClick={() => {
              sound.playClick();
              onSelectCoin(coin);
            }}
            className={`p-3 rounded-xl cursor-pointer transition-all border text-xs font-mono space-y-1 ${
              selectedCoin.id === coin.id
                ? 'bg-cyan-500/10 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between font-bold text-slate-200">
              <span>{coin.symbol}</span>
              <span className={coin.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                {coin.change24h >= 0 ? '▲' : '▼'}
              </span>
            </div>
            <div className="text-slate-400">${coin.price.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
