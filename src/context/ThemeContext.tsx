import React, { createContext, useState, useCallback, useEffect } from 'react';
import type { ThemeContextType } from '../types';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage immediately
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const savedTheme = localStorage?.getItem('theme-mode');
      const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
      const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark;
      
      // Apply theme to document immediately
      const htmlElement = document.documentElement;
      if (shouldBeDark) {
        htmlElement.classList.add('dark');
      } else {
        htmlElement.classList.remove('dark');
      }
      
      return shouldBeDark;
    } catch (error) {
      console.error('Theme initialization error:', error);
      return false;
    }
  });

  useEffect(() => {
    // Sync theme with document on state changes
    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => {
      const newValue = !prev;
      
      // Update DOM
      const htmlElement = document.documentElement;
      if (newValue) {
        htmlElement.classList.add('dark');
      } else {
        htmlElement.classList.remove('dark');
      }
      
      // Save preference
      try {
        localStorage.setItem('theme-mode', newValue ? 'dark' : 'light');
      } catch (error) {
        console.error('Failed to save theme preference:', error);
      }
      
      return newValue;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
