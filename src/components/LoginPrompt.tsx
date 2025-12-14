import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, X } from 'lucide-react';
import { Button } from './Button';

interface LoginPromptProps {
  isOpen: boolean;
  onLogin: () => void;
  onDismiss: () => void;
}

export const LoginPrompt: React.FC<LoginPromptProps> = ({ isOpen, onLogin, onDismiss }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-[150] max-w-sm"
        >
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <Save size={20} />
                <h3 className="font-semibold">Save Your Progress</h3>
              </div>
              <button
                onClick={onDismiss}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-4">
              <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-4">
                Create an account to save your tasks and access them from any device. Your current data will be preserved.
              </p>
              <div className="flex gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  onClick={onLogin}
                >
                  Sign Up / Sign In
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={onDismiss}
                >
                  Later
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
