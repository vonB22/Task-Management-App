import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Dropdown Component
 * Accessible dropdown menu with keyboard navigation
 * @param {Object} props
 * @param {React.ReactNode} props.trigger - Button or element that triggers the dropdown
 * @param {Array} props.items - Array of menu items { label, onClick, icon?, disabled? }
 * @param {string} props.align - Alignment of dropdown menu: 'left' | 'right' (default: 'left')
 * @param {string} props.className - Additional classes for the trigger wrapper
 */
const Dropdown = ({ trigger, items, align = 'left', className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const itemsRef = useRef([]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex(0);
      }
      return;
    }

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setFocusedIndex(-1);
        break;

      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((prev) => {
          const nextIndex = prev < items.length - 1 ? prev + 1 : 0;
          return items[nextIndex]?.disabled ? (nextIndex < items.length - 1 ? nextIndex + 1 : 0) : nextIndex;
        });
        break;

      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) => {
          const nextIndex = prev > 0 ? prev - 1 : items.length - 1;
          return items[nextIndex]?.disabled ? (nextIndex > 0 ? nextIndex - 1 : items.length - 1) : nextIndex;
        });
        break;

      case 'Enter':
      case ' ':
        e.preventDefault();
        if (focusedIndex >= 0 && !items[focusedIndex]?.disabled) {
          handleItemClick(items[focusedIndex]);
        }
        break;

      case 'Home':
        e.preventDefault();
        setFocusedIndex(0);
        break;

      case 'End':
        e.preventDefault();
        setFocusedIndex(items.length - 1);
        break;

      default:
        break;
    }
  };

  // Focus the item when focusedIndex changes
  useEffect(() => {
    if (focusedIndex >= 0 && itemsRef.current[focusedIndex]) {
      itemsRef.current[focusedIndex].focus();
    }
  }, [focusedIndex]);

  const handleItemClick = (item) => {
    if (item.disabled) return;
    
    item.onClick?.();
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setFocusedIndex(0);
    } else {
      setFocusedIndex(-1);
    }
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Trigger */}
      <div
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        role="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        tabIndex={0}
      >
        {trigger}
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 mt-2 py-2 bg-white dark:bg-dark-surface border border-amber-200 dark:border-dark-border rounded-lg shadow-lg min-w-[200px] max-h-[400px] overflow-y-auto ${
              align === 'right' ? 'right-0' : 'left-0'
            }`}
            role="menu"
            aria-orientation="vertical"
          >
            {items.map((item, index) => (
              <button
                key={index}
                ref={(el) => (itemsRef.current[index] = el)}
                onClick={() => handleItemClick(item)}
                onKeyDown={handleKeyDown}
                disabled={item.disabled}
                role="menuitem"
                tabIndex={-1}
                className={`w-full px-4 py-2 text-left flex items-center gap-3 transition-colors ${
                  item.disabled
                    ? 'opacity-50 cursor-not-allowed text-gray-400'
                    : focusedIndex === index
                    ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                    : 'text-amber-700 dark:text-dark-text hover:bg-orange-50 dark:hover:bg-dark-border hover:text-orange-600'
                }`}
              >
                {item.icon && <span className="text-lg">{item.icon}</span>}
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
