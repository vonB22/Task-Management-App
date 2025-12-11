import React from 'react';
import { Settings, User, Sun, Moon, ClipboardList } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { slideInFromTopVariants } from '../lib/animations';

const iconButtonClasses = 'p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500';

interface NavbarProps {
  className?: string;
}

const Navbar = React.memo(
  React.forwardRef<HTMLElement, NavbarProps>(({ className = '' }, ref) => {
    const { isDarkMode, toggleTheme } = useTheme();
    const [iconKey, setIconKey] = React.useState<'sun' | 'moon'>(isDarkMode ? 'sun' : 'moon');

    React.useEffect(() => {
      setIconKey(isDarkMode ? 'sun' : 'moon');
    }, [isDarkMode]);

    return (
      <motion.nav
        ref={ref}
        className={`sticky top-0 z-40 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors duration-200 ${className}`.trim()}
        role="navigation"
        aria-label="Main navigation"
        variants={slideInFromTopVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="px-6 py-4 flex items-center justify-between">
          <a
            href="#"
            className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
            aria-label="TaskFlow - Go to home"
          >
            <ClipboardList size={28} className="text-blue-600 dark:text-blue-400" aria-hidden="true" />
            <span className="text-2xl font-bold text-neutral-900 dark:text-white">TaskFlow</span>
          </a>

          <div className="flex items-center gap-2" role="toolbar" aria-label="User actions">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={isDarkMode}
              className={iconButtonClasses}
            >
              {isDarkMode ? (
                <Sun key={iconKey} size={24} className="text-yellow-400" aria-hidden="true" />
              ) : (
                <Moon key={iconKey} size={24} className="text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
              )}
            </button>

            <button type="button" aria-label="Open settings" className={iconButtonClasses}>
              <Settings size={24} className="text-neutral-600 dark:text-neutral-400" aria-hidden="true" />
            </button>

            <button type="button" aria-label="Open user profile" aria-haspopup="menu" className={iconButtonClasses}>
              <User size={24} className="text-neutral-600 dark:text-neutral-400" aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.nav>
    );
  })
);

Navbar.displayName = 'Navbar';

export { Navbar };
