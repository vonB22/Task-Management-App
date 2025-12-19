import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, LogOut, ChevronRight, Moon, Sun, Crown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToSettings?: () => void;
  onNavigateToProfile?: () => void;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  isOpen,
  onClose,
  onNavigateToSettings,
  onNavigateToProfile,
}) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    {
      icon: User,
      label: 'My Profile',
      onClick: () => {
        onNavigateToProfile?.();
        onClose();
      },
    },
    {
      icon: Settings,
      label: 'Settings',
      onClick: () => {
        onNavigateToSettings?.();
        onClose();
      },
    },
    {
      icon: isDarkMode ? Sun : Moon,
      label: isDarkMode ? 'Light Mode' : 'Dark Mode',
      onClick: () => {
        toggleTheme();
      },
      rightElement: (
        <div className={`w-10 h-5 rounded-full relative transition-colors duration-200 ${isDarkMode ? 'bg-blue-600' : 'bg-neutral-300'}`}>
          <motion.div
            className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm"
            animate={{ left: isDarkMode ? 20 : 2 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </div>
      ),
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={onClose}
          />
          {/* Dropdown */}
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-xl z-50 overflow-hidden origin-top-right"
          >
            {/* User Info */}
            <div className="px-4 py-4 border-b border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg relative overflow-hidden">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    user?.name.split(' ').map(n => n[0]).join('').toUpperCase() || 'G'
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-neutral-900 dark:text-white truncate">
                      {user?.name || 'Guest User'}
                    </p>
                    {user?.role === 'admin' && (
                      <Crown size={14} className="text-yellow-500 flex-shrink-0" aria-label="Admin" />
                    )}
                  </div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 truncate">
                    {user?.email || 'Not logged in'}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item) => (
                <motion.button
                  key={item.label}
                  onClick={item.onClick}
                  className="w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className="text-neutral-500 dark:text-neutral-400" />
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                      {item.label}
                    </span>
                  </div>
                  {item.rightElement || (
                    <ChevronRight size={16} className="text-neutral-400" />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Sign Out */}
            <div className="border-t border-neutral-200 dark:border-neutral-700 py-2">
              <motion.button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group"
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.99 }}
              >
                <LogOut size={18} className="text-neutral-500 group-hover:text-red-500 dark:text-neutral-400 dark:group-hover:text-red-400 transition-colors" />
                <span className="text-sm font-medium text-neutral-700 group-hover:text-red-600 dark:text-neutral-200 dark:group-hover:text-red-400 transition-colors">
                  {user?.role === 'guest' ? 'Sign In' : 'Sign Out'}
                </span>
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
