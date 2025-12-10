import { useCallback } from 'react';

export interface UseLocalStorage<T> {
  value: T | null;
  setValue: (value: T) => void;
  removeValue: () => void;
}

export const useLocalStorage = <T,>(key: string): UseLocalStorage<T> => {
  const getValue = useCallback(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch {
      return null;
    }
  }, [key]);

  const setValue = useCallback(
    (value: T) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch {
        console.error(`Failed to set localStorage item: ${key}`);
      }
    },
    [key]
  );

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
    } catch {
      console.error(`Failed to remove localStorage item: ${key}`);
    }
  }, [key]);

  return { value: getValue(), setValue, removeValue };
};
