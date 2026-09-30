import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { NotificationItem } from '../types';
import { sound } from '../utils/soundEngine';
import { Info, AlertTriangle, ShieldAlert, Bot } from 'lucide-react';

interface NotificationProps {
  notifications: NotificationItem[];
  onDismiss: (id: string) => void;
}

export const FloatingNotificationManager: React.FC<NotificationProps> = ({
  notifications,
  onDismiss,
}) => {
  const getVariants = (dir: NotificationItem['direction']) => {
    switch (dir) {
      case 'left':
        return { initial: { opacity: 0, x: -200, y: 0 }, animate: { opacity: 1, x: 0, y: 0 } };
      case 'right':
        return { initial: { opacity: 0, x: 200, y: 0 }, animate: { opacity: 1, x: 0, y: 0 } };
      case 'top':
        return { initial: { opacity: 0, x: 0, y: -150 }, animate: { opacity: 1, x: 0, y: 0 } };
      case 'bottom':
        return { initial: { opacity: 0, x: 0, y: 150 }, animate: { opacity: 1, x: 0, y: 0 } };
      case 'diagonal':
        return { initial: { opacity: 0, x: -150, y: -150 }, animate: { opacity: 1, x: 0, y: 0 } };
      default:
        return { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 } };
    }
  };

  return (
    <div className="fixed top-20 right-6 z-40 space-y-3 max-w-sm pointer-events-none">
      <AnimatePresence>
        {notifications.map((n) => {
          const v = getVariants(n.direction);
          return (
            <motion.div
              key={n.id}
              initial={v.initial}
              animate={v.animate}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              className="pointer-events-auto glass-panel-glow p-4 rounded-xl border border-cyan-500/40 shadow-2xl flex items-start gap-3 relative overflow-hidden"
            >
              <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300">
                {n.type === 'panic' ? (
                  <ShieldAlert className="w-5 h-5 text-rose-400 animate-pulse" />
                ) : n.type === 'warning' ? (
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                ) : n.type === 'ai' ? (
                  <Bot className="w-5 h-5 text-purple-400" />
                ) : (
                  <Info className="w-5 h-5 text-cyan-400" />
                )}
              </div>

              <div className="flex-1 space-y-0.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-mono font-bold text-xs text-slate-100">{n.title}</h4>
                  <span className="text-[10px] font-mono text-slate-400">{n.timestamp}</span>
                </div>
                <p className="text-xs font-mono text-slate-300">{n.message}</p>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  onDismiss(n.id);
                }}
                className="text-slate-400 hover:text-slate-200 text-xs font-mono cursor-pointer"
              >
                ✕
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
