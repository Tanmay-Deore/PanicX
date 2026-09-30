import React from 'react';
import type { OrderBookEntry } from '../types';
import { sound } from '../utils/soundEngine';

interface OrderBookProps {
  entries: OrderBookEntry[];
}

export const OrderBookNightmare: React.FC<OrderBookProps> = ({ entries }) => {
  return (
    <div className="glass-panel p-5 rounded-2xl border border-cyan-500/20 space-y-4">
      <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800 pb-3">
        <span className="font-bold text-cyan-300 tracking-wider">ORDER BOOK NIGHTMARE</span>
        <span className="text-[11px] text-pink-400 italic font-mono">
          "Someone placed an order. Thrilling."
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="text-slate-400 border-b border-slate-800/80 pb-2">
              <th className="py-2 px-2">PRICE ($)</th>
              <th className="py-2 px-2">AMOUNT</th>
              <th className="py-2 px-2">TOTAL</th>
              <th className="py-2 px-2 hidden sm:table-cell">CONFIDENCE</th>
              <th className="py-2 px-2">DRAMA</th>
              <th className="py-2 px-2">PANIC</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            {entries.map((entry, idx) => (
              <tr
                key={idx}
                onMouseEnter={() => sound.playHover()}
                className={`hover:bg-cyan-500/10 transition-colors cursor-pointer ${
                  entry.type === 'sell' ? 'text-rose-400' : 'text-emerald-400'
                }`}
              >
                <td className="py-2 px-2 font-bold">${entry.price.toLocaleString()}</td>
                <td className="py-2 px-2 text-slate-300">{entry.amount}</td>
                <td className="py-2 px-2 text-slate-400">${entry.total.toLocaleString()}</td>
                <td className="py-2 px-2 hidden sm:table-cell text-slate-400">{entry.confidence}%</td>
                <td className="py-2 px-2 font-bold text-amber-400">{entry.drama}</td>
                <td className="py-2 px-2 font-bold text-pink-400">{entry.panic}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
