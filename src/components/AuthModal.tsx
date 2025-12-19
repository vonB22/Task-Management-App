import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import { Button } from './Button';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  allowGuest?: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, allowGuest = true }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup, continueAsGuest } = useAuth();
  const { success, error } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password);
        success('Welcome back!');
      } else {
        await signup(email, password, name);
        success('Account created successfully!');
      }
      onClose();
    } catch (err) {
      error((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestContinue = () => {
    continueAsGuest();
    success('Continuing as guest');
    onClose();
  };

  const handleClose = () => {
    if (!isLoading) {
      setEmail('');
      setPassword('');
      setName('');
      setShowPassword(false);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-md bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="relative px-6 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <button
                  onClick={handleClose}
                  disabled={isLoading}
                  className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50"
                >
                  <X size={20} />
                </button>
                <h2 className="text-2xl font-bold mb-1">
                  {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-blue-100 text-sm">
                  {mode === 'login'
                    ? 'Sign in to sync your tasks across devices'
                    : 'Join TaskFlow to get started'}
                </p>
              </div>

              {/* Demo Credentials */}
              <div className="px-6 py-3 bg-blue-50 dark:bg-blue-900/20 border-y border-blue-100 dark:border-blue-900/50">
                <p className="text-xs font-medium text-blue-900 dark:text-blue-100 mb-1">Demo Credentials:</p>
                <div className="text-xs text-blue-700 dark:text-blue-300 space-y-0.5">
                  <p>👑 Admin: admin@taskflow.com / admin123</p>
                  <p>👤 User: user@taskflow.com / user123</p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {mode === 'signup' && (
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                      />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        required
                        className="w-full pl-10 pr-3 py-2.5 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full pl-10 pr-3 py-2.5 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                    />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      minLength={6}
                      className="w-full pl-10 pr-10 py-2.5 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    'Please wait...'
                  ) : mode === 'login' ? (
                    <>
                      <LogIn size={18} />
                      Sign In
                    </>
                  ) : (
                    <>
                      <UserPlus size={18} />
                      Create Account
                    </>
                  )}
                </Button>

                {/* Toggle Mode */}
                <div className="text-center text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">
                    {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
                  </span>{' '}
                  <button
                    type="button"
                    onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                    disabled={isLoading}
                    className="text-blue-600 dark:text-blue-400 font-medium hover:underline disabled:opacity-50"
                  >
                    {mode === 'login' ? 'Sign up' : 'Sign in'}
                  </button>
                </div>

                {/* Guest Option */}
                {allowGuest && (
                  <>
                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-neutral-200 dark:border-neutral-700" />
                      </div>
                      <div className="relative flex justify-center text-xs">
                        <span className="bg-white dark:bg-neutral-800 px-2 text-neutral-500">
                          OR
                        </span>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="secondary"
                      className="w-full"
                      onClick={handleGuestContinue}
                      disabled={isLoading}
                    >
                      Continue as Guest
                    </Button>
                    <p className="text-xs text-center text-neutral-500 dark:text-neutral-400">
                      No account required • Limited features
                    </p>
                  </>
                )}
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
