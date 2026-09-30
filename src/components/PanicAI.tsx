import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Sparkles } from 'lucide-react';
import { sound } from '../utils/soundEngine';

interface PanicAIProps {
  lastActionMessage?: string | null;
}

export const PanicAI: React.FC<PanicAIProps> = ({ lastActionMessage }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [quote, setQuote] = useState("Hello. I'm PANIC AI. I monitor your unnecessary clicks.");

  useEffect(() => {
    if (lastActionMessage) {
      setQuote(lastActionMessage);
      if (!isOpen) setIsOpen(true);
    }
  }, [lastActionMessage, isOpen]);

  const handleClose = () => {
    sound.playPopupClose();
    setQuote("Leaving already? I'll be right here when you regret this.");
    setTimeout(() => setIsOpen(false), 800);
  };

  const handleOpen = () => {
    sound.playPopupOpen();
    setIsOpen(true);
    setQuote("Oh. You're back. Did you miss my unsolicited advice?");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            className="glass-panel-glow p-4 rounded-2xl max-w-xs w-72 border border-cyan-400/40 shadow-[0_0_30px_rgba(6,182,212,0.3)] relative"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded bg-cyan-500/20 text-cyan-400 animate-pulse">
                  <Bot className="w-4 h-4" />
                </div>
                <span className="font-mono font-bold text-xs text-cyan-300 tracking-wide uppercase">
                  PANIC AI (JUDGMENTAL)
                </span>
              </div>
              <button
                onClick={handleClose}
                className="p-1 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* AI Speech Bubble */}
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs font-mono text-cyan-200 leading-relaxed shadow-inner">
              <Sparkles className="w-3 h-3 text-amber-400 inline mr-1" />
              "{quote}"
            </div>

            <div className="mt-2 text-[10px] font-mono text-slate-400 text-right">
              CONFIDENCE: QUESTIONABLE
            </div>
          </motion.div>
        ) : (
          <motion.button
            onClick={handleOpen}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3.5 rounded-full bg-slate-900 border border-cyan-400 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer flex items-center justify-center group"
          >
            <Bot className="w-6 h-6 animate-bounce" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
