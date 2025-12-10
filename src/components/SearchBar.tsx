import * as React from 'react';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { springTransition, getMotionProps } from '../lib/motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

export interface SearchBarProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  /** Callback when the search value changes */
  onChange?: (value: string) => void;
  /** Show clear button when value is present */
  showClear?: boolean;
  /** Callback when clear button is clicked */
  onClear?: () => void;
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      className,
      placeholder = 'Search tasks...',
      value,
      onChange,
      showClear = true,
      onClear,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const [isFocused, setIsFocused] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Combine refs
    React.useImperativeHandle(ref, () => inputRef.current!);

    const handleClear = () => {
      onChange?.('');
      onClear?.();
      inputRef.current?.focus();
    };

    const hasValue = typeof value === 'string' && value.length > 0;

    const motionProps = getMotionProps(
      {
        animate: { scale: isFocused ? 1.01 : 1 },
        transition: springTransition,
      },
      prefersReducedMotion
    );

    return (
      <motion.div className="relative" {...motionProps}>
        <Search
          className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500 dark:text-neutral-400 pointer-events-none"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          type="search"
          role="searchbox"
          aria-label={placeholder}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            'w-full h-10 pl-10 pr-10 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 transition-colors duration-200',
            className
          )}
          {...props}
        />
        {showClear && hasValue && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 p-0.5 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </motion.div>
    );
  }
);

SearchBar.displayName = 'SearchBar';

export { SearchBar };
