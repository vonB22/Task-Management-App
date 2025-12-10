import * as React from 'react';
import { Settings, User, Sun, Moon, ClipboardList } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';
import { slideUpVariants, easeOutTransition, springTransition } from '../lib/motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

const iconButtonClasses =
  'p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500';

export interface NavbarProps {
  /** Optional className for the nav element */
  className?: string;
}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(({ className }, ref) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.nav
      ref={ref}
      className={cn(
        'sticky top-0 z-40 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors duration-200',
        className
      )}
      role="navigation"
      aria-label="Main navigation"
      variants={prefersReducedMotion ? undefined : slideUpVariants}
      initial={prefersReducedMotion ? undefined : 'hidden'}
      animate={prefersReducedMotion ? undefined : 'visible'}
      transition={prefersReducedMotion ? undefined : easeOutTransition}
    >
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#"
          className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
          aria-label="TaskFlow - Go to home"
        >
          <motion.div
            whileHover={prefersReducedMotion ? undefined : { rotate: 10 }}
            transition={prefersReducedMotion ? undefined : springTransition}
          >
            <ClipboardList
              size={28}
              className="text-blue-600 dark:text-blue-400"
              aria-hidden="true"
            />
          </motion.div>
          <span className="text-2xl font-bold text-neutral-900 dark:text-white">
            TaskFlow
          </span>
        </a>

        {/* Actions */}
        <div className="flex items-center gap-2" role="toolbar" aria-label="User actions">
          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={isDarkMode}
            className={cn(iconButtonClasses)}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDarkMode ? (
                <motion.span
                  key="sun"
                  initial={prefersReducedMotion ? false : { rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={prefersReducedMotion ? undefined : { rotate: 90, opacity: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                  className="block"
                >
                  <Sun size={24} className="text-yellow-400" aria-hidden="true" />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={prefersReducedMotion ? false : { rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={prefersReducedMotion ? undefined : { rotate: -90, opacity: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                  className="block"
                >
                  <Moon size={24} className="text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Settings */}
          <button
            type="button"
            aria-label="Open settings"
            className={cn(iconButtonClasses)}
          >
            <Settings
              size={24}
              className="text-neutral-600 dark:text-neutral-400"
              aria-hidden="true"
            />
          </button>

          {/* User profile */}
          <button
            type="button"
            aria-label="Open user profile"
            aria-haspopup="menu"
            className={cn(iconButtonClasses)}
          >
            <User
              size={24}
              className="text-neutral-600 dark:text-neutral-400"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </motion.nav>
  );
});

Navbar.displayName = 'Navbar';

export { Navbar };
