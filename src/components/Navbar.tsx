import React from 'react';
import { Settings, User, Sun, Moon, ClipboardList } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Navbar: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors duration-200">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ClipboardList size={28} className="text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">TaskFlow</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
          >
            {isDarkMode ? (
              <Sun size={24} className="text-yellow-500 dark:text-yellow-400" />
            ) : (
              <Moon size={24} className="text-indigo-600 dark:text-indigo-400" />
            )}
          </button>
          <button
            aria-label="Settings"
            className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <Settings size={24} className="text-neutral-600 dark:text-neutral-400" />
          </button>
          <button
            aria-label="User profile"
            className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <User size={24} className="text-neutral-600 dark:text-neutral-400" />
          </button>
        </div>
      </div>
    </nav>
  );
};
