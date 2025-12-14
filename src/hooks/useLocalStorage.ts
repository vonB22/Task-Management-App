import { useState } from 'react';
import { dataPersistence } from '../lib/dataPersistence';

const canAccessWindow = typeof window !== 'undefined' && Boolean(window.localStorage);

function readStoredValue<T>(key: string, initialValue: T): T {
  if (!canAccessWindow) {
    return initialValue;
  }

  try {
    const rawItem = window.localStorage.getItem(key);
    if (!rawItem) {
      return dataPersistence.load(key, initialValue);
    }

    const parsed = JSON.parse(rawItem);
    if (parsed && typeof parsed === 'object' && 'data' in parsed) {
      return parsed.data as T;
    }

    return parsed as T;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    try {
      return dataPersistence.load(key, initialValue);
    } catch (fallbackError) {
      console.error('Error reading via dataPersistence:', fallbackError);
      return initialValue;
    }
  }
}

export function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => readStoredValue(key, initialValue));

  // Return a wrapped version of useState's setter function that persists to localStorage
  const setValue: React.Dispatch<React.SetStateAction<T>> = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (canAccessWindow) {
        try {
          dataPersistence.save(key, valueToStore);
        } catch (persistError) {
          console.error('Failed to persist data via dataPersistence:', persistError);
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue];
}
