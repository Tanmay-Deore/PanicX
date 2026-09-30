import React from 'react';
import { GlitchText } from './hostile/GlitchText';

interface FakeStatsProps {
  escapedCount: number;
  clickCount: number;
}

export const FakeStats: React.FC<FakeStatsProps> = ({ escapedCount, clickCount }) => {
  const stats = [
    { label: 'CONFUSION LEVEL', value: '91%', color: 'text-cyan-400' },
    { label: 'FRUSTRATION', value: '87%', color: 'text-purple-400' },
    { label: 'BUTTONS ESCAPED', value: escapedCount.toString(), color: 'text-amber-400' },
    { label: 'USER PATIENCE', value: 'LOW', color: 'text-rose-400' },
    { label: 'CHARTS OPEN', value: '17', color: 'text-cyan-400' },
    { label: 'UNNECESSARY CLICKS', value: clickCount.toString(), color: 'text-pink-400' },
    { label: 'REGRET SCORE', value: '73%', color: 'text-amber-300' },
    { label: 'AI JUDGMENT', value: '99%', color: 'text-cyan-300' },
  ];

  return (
    <div className="glass-panel p-5 rounded-2xl border border-purple-500/30 space-y-4">
      <div className="flex items-center justify-between text-xs font-mono text-purple-300 border-b border-purple-500/20 pb-2">
        <span className="font-bold tracking-wider">INTERFACE METRICS FROM HELL</span>
        <span className="text-[11px] text-slate-400">[ SIMULATED HARMFUL DATA ]</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((st, idx) => (
          <div key={idx} className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-1">
            <div className="text-[10px] font-mono text-slate-400 tracking-tight">{st.label}</div>
            <div className={`text-lg font-black font-mono ${st.color}`}>
              <GlitchText text={st.value} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
