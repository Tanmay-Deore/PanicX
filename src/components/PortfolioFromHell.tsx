import React from 'react';
import type { PortfolioHolding } from '../types';
import { sound } from '../utils/soundEngine';
import { Wallet } from 'lucide-react';
import { GlitchText } from './hostile/GlitchText';

interface PortfolioProps {
  holdings: PortfolioHolding[];
}

export const PortfolioFromHell: React.FC<PortfolioProps> = ({ holdings }) => {
  const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);
  const totalPnl = holdings.reduce((sum, h) => sum + h.pnl, 0);

  return (
    <div className="glass-panel p-6 rounded-2xl border border-purple-500/20 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-purple-500/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-mono text-purple-300">TOTAL SIMULATED PORTFOLIO</div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-white">
              $<GlitchText text={totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <div className="text-slate-400">TOTAL P&L</div>
            <div className={`font-bold text-sm ${totalPnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {totalPnl >= 0 ? '+' : ''}${totalPnl.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <div className="text-slate-400">REGRET STATUS</div>
            <div className="font-bold text-sm text-amber-400">EXTREME</div>
          </div>
        </div>
      </div>

      <div className="text-xs font-mono text-cyan-400/80 italic">
        "Everything is fine. Probably."
      </div>

      {/* Holdings List */}
      <div className="space-y-3">
        {holdings.map((h) => (
          <div
            key={h.symbol}
            onMouseEnter={() => sound.playHover()}
            className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/40 transition-colors flex items-center justify-between gap-4 text-xs font-mono"
          >
            <div>
              <div className="font-bold text-slate-100 flex items-center gap-2">
                {h.name} <span className="text-purple-400">({h.symbol})</span>
              </div>
              <div className="text-slate-400">{h.amount} units @ ${h.avgPrice.toLocaleString()}</div>
            </div>

            <div className="text-right">
              <div className="font-bold text-slate-200">${h.value.toLocaleString()}</div>
              <div className={h.pnl >= 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {h.pnl >= 0 ? '+' : ''}{h.pnlPercent}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
