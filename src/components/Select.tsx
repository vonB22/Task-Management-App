import React from 'react';
import { ChevronDown } from 'lucide-react';

const selectVariantClasses: Record<string, Record<string, string>> = {
  default: { sm: 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 h-8 px-3 text-sm', md: 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 h-10 px-4 text-sm', lg: 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 h-12 px-4 text-base' },
  error: { sm: 'border-red-500 dark:border-red-500 bg-white dark:bg-neutral-800 focus-visible:ring-red-500 h-8 px-3 text-sm', md: 'border-red-500 dark:border-red-500 bg-white dark:bg-neutral-800 focus-visible:ring-red-500 h-10 px-4 text-sm', lg: 'border-red-500 dark:border-red-500 bg-white dark:bg-neutral-800 focus-visible:ring-red-500 h-12 px-4 text-base' },
};

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  error?: string;
  placeholder?: string;
  variant?: 'default' | 'error';
  size?: 'sm' | 'md' | 'lg';
}

const Select = React.memo(
  React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className = '', variant = 'default', size = 'md', error, children, ...props }, ref) => {
      const resolvedVariant = error ? 'error' : variant;
      const variantClasses = selectVariantClasses[resolvedVariant]?.[size] || selectVariantClasses.default.md;
      const classes = `flex w-full items-center justify-between rounded-lg border bg-transparent text-neutral-900 dark:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 appearance-none cursor-pointer pr-10 ${variantClasses} ${className}`.trim();

      return (
        <div className="relative">
          <select
            className={classes}
            ref={ref}
            {...(error && { 'aria-invalid': 'true' })}
            {...props}
          >
            {children}
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500 dark:text-neutral-400 pointer-events-none"
            aria-hidden="true"
          />
        </div>
      );
    }
  )
);

Select.displayName = 'Select';

export { Select };
