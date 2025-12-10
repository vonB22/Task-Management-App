import React, { createContext, useState, useCallback, useEffect } from 'react';
import type { ThemeContextType } from '../types';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Initialize theme on client side only
    try {
      const savedTheme = localStorage?.getItem('theme-mode');
      const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
      
      const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark;
      setIsDarkMode(shouldBeDark);
      
      // Apply theme to document
      const htmlElement = document.documentElement;
      if (shouldBeDark) {
        htmlElement.classList.add('dark');
      } else {
        htmlElement.classList.remove('dark');
      }
    } catch (error) {
      console.error('Theme initialization error:', error);
    }
  }, []);

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
