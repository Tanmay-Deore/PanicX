import React, { useState } from 'react';
import { WEATHERS } from '../utils/mockData';
import { sound } from '../utils/soundEngine';

export const CryptoWeather: React.FC = () => {
  const [weatherIndex, setWeatherIndex] = useState(0);

  const handleNextWeather = () => {
    sound.playClick();
    setWeatherIndex((prev) => (prev + 1) % WEATHERS.length);
  };

  const currentWeather = WEATHERS[weatherIndex];

  return (
    <div
      onClick={handleNextWeather}
      className="glass-panel p-5 rounded-2xl border border-cyan-500/30 space-y-3 cursor-pointer hover:border-cyan-400/50 transition-colors relative overflow-hidden group"
    >
      <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
        <span>CRYPTO WEATHER REPORT</span>
        <span className="text-[11px] text-slate-400 group-hover:text-cyan-300">
          [ Click to Forecast ]
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-4xl animate-bounce">{currentWeather.icon}</div>
        <div>
          <h4 className="font-mono font-bold text-slate-100 text-lg">{currentWeather.title}</h4>
          <p className="text-xs font-mono text-slate-400">{currentWeather.subtitle}</p>
        </div>
        <div className="ml-auto font-mono text-xl font-bold text-cyan-400">
          {currentWeather.temp}
        </div>
      </div>

      <div className="text-[11px] font-mono text-pink-400/80 italic border-t border-slate-800 pt-2">
        "Weather remains unhelpful."
      </div>
    </div>
  );
};
