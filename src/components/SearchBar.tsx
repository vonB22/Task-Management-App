import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  onChange?: (value: string) => void;
  showClear?: boolean;
  onClear?: () => void;
}

const SearchBar = React.memo(
  React.forwardRef<HTMLInputElement, SearchBarProps>(
    (
      {
        className = '',
        placeholder = 'Search tasks...',
        value,
        onChange,
        showClear = true,
        onClear,
        ...props
      },
      ref
    ) => {
      const inputRef = React.useRef<HTMLInputElement>(null);

      React.useImperativeHandle(ref, () => inputRef.current!);

      const handleClear = () => {
        onChange?.('');
        onClear?.();
        inputRef.current?.focus();
      };

      const hasValue = typeof value === 'string' && value.length > 0;

      return (
        <div className={`relative transition-all ${className}`.trim()}>
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500 dark:text-neutral-400 pointer-events-none" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            role="searchbox"
            aria-label={placeholder}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className={`w-full h-10 pl-10 pr-10 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 transition-colors duration-200`}
            {...props}
          />
          {showClear && hasValue && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
            >
              <X size={16} aria-hidden="true" />
            </button>
          )}
        </div>
      );
    }
  )
);

SearchBar.displayName = 'SearchBar';

export { SearchBar };
