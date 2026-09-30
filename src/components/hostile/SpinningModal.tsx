import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { sound } from '../../utils/soundEngine';

interface SpinningModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const SpinningModal: React.FC<SpinningModalProps> = ({
  isOpen,
  onClose,
  title = 'POPUP ALERT',
  children,
}) => {
  useEffect(() => {
    if (isOpen) {
      sound.playPopupOpen();
    }
  }, [isOpen]);

  const handleClose = () => {
    sound.playPopupClose();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.4, rotate: -360, z: -500 }}
            animate={{ opacity: 1, scale: 1, rotate: 0, z: 0 }}
            exit={{ opacity: 0, scale: 0.3, rotate: 360, z: -500 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            className="relative glass-panel-glow p-6 rounded-2xl max-w-lg w-full border border-cyan-400/50 shadow-[0_0_50px_rgba(6,182,212,0.4)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-cyan-500/20">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                <h3 className="font-mono font-bold text-cyan-300 text-sm tracking-wider uppercase">
                  {title}
                </h3>
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs font-mono text-cyan-400/80 mb-3 italic">
              "You opened a popup."
            </p>

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
