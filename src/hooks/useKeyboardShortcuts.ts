import { useEffect, useCallback } from 'react';

type KeyboardShortcut = {
  key: string;
  ctrl?: boolean;
  meta?: boolean;
  shift?: boolean;
  alt?: boolean;
  action: () => void;
  description?: string;
};

/**
 * Custom hook for managing keyboard shortcuts
 * Handles both Windows (Ctrl) and Mac (Cmd) modifier keys
 */
export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        // Allow Escape to still work in inputs
        if (event.key !== 'Escape') {
          return;
        }
      }

      for (const shortcut of shortcuts) {
        const ctrlOrMeta = shortcut.ctrl || shortcut.meta;
        const modifierMatch =
          (ctrlOrMeta ? event.ctrlKey || event.metaKey : true) &&
          (shortcut.shift ? event.shiftKey : !event.shiftKey || shortcut.key === 'Escape') &&
          (shortcut.alt ? event.altKey : !event.altKey);

        if (
          event.key.toLowerCase() === shortcut.key.toLowerCase() &&
          modifierMatch
        ) {
          event.preventDefault();
          shortcut.action();
          break;
        }
      }
    },
    [shortcuts]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

/**
 * Returns a formatted keyboard shortcut string for display
 * Automatically uses ⌘ on Mac and Ctrl on Windows
 */
export function formatShortcut(shortcut: Omit<KeyboardShortcut, 'action'>): string {
  const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
  const parts: string[] = [];

  if (shortcut.ctrl || shortcut.meta) {
    parts.push(isMac ? '⌘' : 'Ctrl');
  }
  if (shortcut.shift) {
    parts.push(isMac ? '⇧' : 'Shift');
  }
  if (shortcut.alt) {
    parts.push(isMac ? '⌥' : 'Alt');
  }

  // Format special keys
  const keyDisplay = {
    escape: 'Esc',
    arrowup: '↑',
    arrowdown: '↓',
    arrowleft: '←',
    arrowright: '→',
    enter: '↵',
    backspace: '⌫',
    delete: '⌦',
    tab: '⇥',
  }[shortcut.key.toLowerCase()] || shortcut.key.toUpperCase();

  parts.push(keyDisplay);

  return parts.join(isMac ? '' : '+');
}
