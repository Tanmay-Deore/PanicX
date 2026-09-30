import React, { useState } from 'react';
import { SpinningModal } from './hostile/SpinningModal';
import type { ChaosSettings } from '../types';
import { sound } from '../utils/soundEngine';
import { Sparkles, AlertCircle } from 'lucide-react';

interface ChaosSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ChaosSettings;
  onUpdateSettings: (newSettings: ChaosSettings) => void;
  onSarcasmTrigger: (msg: string) => void;
}

export const ChaosSettingsModal: React.FC<ChaosSettingsProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onSarcasmTrigger,
}) => {
  const [commentary, setCommentary] = useState<string | null>(null);

  const sliders: { key: keyof ChaosSettings; label: string; minMsg: string; maxMsg: string }[] = [
    { key: 'buttonResistance', label: 'BUTTON RESISTANCE', minMsg: 'Too easy.', maxMsg: 'Buttons will escape at light speed.' },
    { key: 'marketDrama', label: 'MARKET DRAMA', minMsg: 'Boring calm.', maxMsg: 'Extreme theatrical charts!' },
    { key: 'uiConfusion', label: 'UI CONFUSION', minMsg: 'Sanity restored.', maxMsg: 'Total orientation loss.' },
    { key: 'chartAnxiety', label: 'CHART ANXIETY', minMsg: 'Relaxed candles.', maxMsg: 'Hyperventilating numbers.' },
    { key: 'notificationAggression', label: 'NOTIFICATION AGGRESSION', minMsg: 'Peace & Quiet.', maxMsg: 'Spam incoming!' },
    { key: 'sarcasm', label: 'SARCASM LEVEL', minMsg: 'Polite AI.', maxMsg: 'Maximum roast.' },
    { key: 'animationChaos', label: 'ANIMATION CHAOS', minMsg: 'Static grid.', maxMsg: 'Uncontrolled physics.' },
    { key: 'soundAnnoyance', label: 'SOUND ANNOYANCE', minMsg: 'Soft boops.', maxMsg: 'Cursed audio.' },
    { key: 'tooltipVerbosity', label: 'TOOLTIP VERBOSITY', minMsg: 'Brief tooltips.', maxMsg: 'Novel length explanations.' },
    { key: 'userRegret', label: 'USER REGRET', minMsg: 'No regrets yet.', maxMsg: 'Why did you click this?' },
  ];

  const handleSliderChange = (key: keyof ChaosSettings, value: number) => {
    sound.playHover();
    const updated = { ...settings, [key]: value };
    onUpdateSettings(updated);

    const s = sliders.find((sl) => sl.key === key);
    const msg = value > 50 ? s?.maxMsg : s?.minMsg;
    const fullComment = `Wonderful. You've set ${s?.label} to ${value}%. ${msg}`;
    setCommentary(fullComment);
    onSarcasmTrigger(fullComment);
  };

  return (
    <SpinningModal isOpen={isOpen} onClose={onClose} title="SETTINGS FROM HELL">
      <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-2">
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-300">
          <AlertCircle className="w-4 h-4 text-purple-400" />
          <span>Warning: Adjusting these sliders directly alters interface difficulty.</span>
        </div>

        {commentary && (
          <div className="text-xs font-mono font-bold text-amber-300 bg-slate-900/90 p-2.5 rounded-xl border border-amber-500/40 animate-pulse">
            <Sparkles className="w-3.5 h-3.5 inline mr-1 text-amber-400" />
            {commentary}
          </div>
        )}

        <div className="space-y-3">
          {sliders.map((s) => (
            <div key={s.key} className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-1.5 text-xs font-mono">
              <div className="flex justify-between items-center text-slate-300">
                <span className="font-bold">{s.label}</span>
                <span className="font-bold text-cyan-400">{settings[s.key]}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings[s.key]}
                onChange={(e) => handleSliderChange(s.key, parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
          ))}
        </div>
      </div>
    </SpinningModal>
  );
};
