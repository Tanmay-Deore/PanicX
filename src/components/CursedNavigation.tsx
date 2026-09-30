import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/soundEngine';
import { LayoutDashboard, TrendingUp, BarChart, Wallet, ShoppingBag, Eye, Bell, ShieldAlert, Sliders, ChevronDown, Sparkles } from 'lucide-react';

interface CursedNavProps {
  activeRoute: string;
  onNavigate: (route: string) => void;
  onTriggerCinematic: (routeName: string) => void;
}

export const CursedNavigation: React.FC<CursedNavProps> = ({
  activeRoute,
  onNavigate,
  onTriggerCinematic,
}) => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const mainRoutes = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'markets', label: 'Markets', icon: TrendingUp },
    { id: 'charts', label: 'Charts', icon: BarChart },
    { id: 'portfolio', label: 'Portfolio', icon: Wallet },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'watchlist', label: 'Watchlist', icon: Eye },
    { id: 'analytics', label: 'Analytics', icon: BarChart },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'panic', label: 'Panic', icon: ShieldAlert },
    { id: 'settings', label: 'Settings', icon: Sliders },
  ];

  const moreRoutes = [
    { id: 'adv-markets', label: 'Advanced Markets' },
    { id: 'adv-charts', label: 'Advanced Charts' },
    { id: 'adv-analytics', label: 'Advanced Analytics' },
    { id: 'adv-adv', label: 'Advanced Advanced' },
    { id: 'why', label: '"Why"' },
  ];

  const handleRouteClick = (routeId: string, label: string) => {
    sound.playClick();
    onTriggerCinematic(label);
    onNavigate(routeId);
    setIsMoreOpen(false);
  };

  return (
    <nav className="w-full glass-panel border-y border-cyan-500/20 px-4 py-2 my-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto py-1">
        <div className="flex items-center gap-1 sm:gap-2">
          {mainRoutes.map((r) => {
            const Icon = r.icon;
            const isActive = activeRoute === r.id;
            return (
              <button
                key={r.id}
                onClick={() => handleRouteClick(r.id, r.label)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-cyan-400" />
                {r.label}
              </button>
            );
          })}

          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                sound.playClick();
                setIsMoreOpen(!isMoreOpen);
              }}
              className="px-3 py-1.5 rounded-xl font-mono text-xs font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/30 flex items-center gap-1 cursor-pointer whitespace-nowrap"
            >
              <span>More</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            <AnimatePresence>
              {isMoreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 mt-2 w-48 glass-panel-glow p-2 rounded-xl border border-purple-400/40 z-50 space-y-1 shadow-2xl"
                >
                  {moreRoutes.map((mr) => (
                    <button
                      key={mr.id}
                      onClick={() => handleRouteClick(mr.id, mr.label)}
                      className="w-full text-left px-3 py-1.5 rounded-lg font-mono text-xs text-purple-200 hover:bg-purple-500/20 hover:text-purple-100 transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span>{mr.label}</span>
                      {mr.id === 'why' && <Sparkles className="w-3 h-3 text-pink-400" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
};
