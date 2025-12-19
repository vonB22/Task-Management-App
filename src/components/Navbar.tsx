import React, { useState } from 'react';
import { Bell, Sun, Moon, ClipboardList, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useNotifications, NotificationDropdown } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';
import { ProfileDropdown } from './ProfileDropdown';
import { slideInFromTopVariants } from '../lib/animations';

const iconButtonClasses = 'p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500';

interface NavbarProps {
  className?: string;
  onQuickAdd?: () => void;
  onNavigateToSettings?: () => void;
  onNavigateToProfile?: () => void;
}

const Navbar = React.memo(
  React.forwardRef<HTMLElement, NavbarProps>(({ className = '', onQuickAdd, onNavigateToSettings, onNavigateToProfile }, ref) => {
    const { isDarkMode, toggleTheme } = useTheme();
    const { unreadCount } = useNotifications();
    const { user } = useAuth();
    const [iconKey, setIconKey] = React.useState<'sun' | 'moon'>(isDarkMode ? 'sun' : 'moon');
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

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
        <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
          <a
            href="#"
            className="flex items-center gap-2 sm:gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
            aria-label="TaskFlow - Go to home"
          >
            <ClipboardList size={24} className="sm:w-7 sm:h-7 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            <span className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">TaskFlow</span>
          </a>

          <div className="flex items-center gap-1 sm:gap-2" role="toolbar" aria-label="User actions">
            {/* Quick Add Button */}
            {onQuickAdd && (
              <motion.button
                type="button"
                onClick={onQuickAdd}
                aria-label="Quick add task"
                className="hidden sm:flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus size={18} />
                <span>Quick Add</span>
              </motion.button>
            )}

            {/* Mobile Quick Add */}
            {onQuickAdd && (
              <button
                type="button"
                onClick={onQuickAdd}
                aria-label="Quick add task"
                className="sm:hidden p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                <Plus size={20} />
              </button>
            )}

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={isDarkMode}
              className={iconButtonClasses}
            >
              {isDarkMode ? (
                <Sun key={iconKey} size={22} className="text-yellow-400" aria-hidden="true" />
              ) : (
                <Moon key={iconKey} size={22} className="text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
              )}
            </button>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsNotificationOpen(!isNotificationOpen);
                  setIsProfileOpen(false);
                }}
                aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
                aria-expanded={isNotificationOpen}
                className={`${iconButtonClasses} relative`}
              >
                <Bell size={22} className="text-neutral-600 dark:text-neutral-400" aria-hidden="true" />
                {unreadCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full"
                  >
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </motion.span>
                )}
              </button>
              <NotificationDropdown
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
              />
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsNotificationOpen(false);
                }}
                aria-label="Open user profile"
                aria-haspopup="menu"
                aria-expanded={isProfileOpen}
                className={iconButtonClasses}
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name || 'User'}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'G'}
                  </div>
                )}
              </button>
              <ProfileDropdown
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
                onNavigateToSettings={onNavigateToSettings}
                onNavigateToProfile={onNavigateToProfile}
              />
            </div>
          </div>
        </div>
      </motion.nav>
    );
  })
);

Navbar.displayName = 'Navbar';

export { Navbar };
