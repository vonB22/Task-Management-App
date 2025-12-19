import { useState, useEffect } from 'react';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/storageHelpers';

/**
 * Custom hook for localStorage with React state synchronization
 * @param {string} key - Storage key
 * @param {any} initialValue - Initial value if no stored value exists
 * @returns {Array} [storedValue, setValue] tuple
 */
export const useLocalStorage = (key, initialValue) => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = loadFromLocalStorage(key, null);
      // Parse stored json or if none return initialValue
      return item !== null ? item : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      saveToLocalStorage(key, valueToStore);
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  return [storedValue, setValue];
};

/**
 * Custom hook for debounced localStorage
 * @param {string} key - Storage key
 * @param {any} initialValue - Initial value
 * @param {number} delay - Debounce delay in ms
 * @returns {Array} [storedValue, setValue] tuple
 */
export const useDebouncedLocalStorage = (key, initialValue, delay = 500) => {
  const [storedValue, setStoredValue] = useLocalStorage(key, initialValue);
  const [pendingValue, setPendingValue] = useState(storedValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (pendingValue !== storedValue) {
        setStoredValue(pendingValue);
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [pendingValue, delay, storedValue, setStoredValue]);

  return [pendingValue, setPendingValue];
};

export default useLocalStorage;
