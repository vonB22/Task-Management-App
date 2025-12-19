import React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const selectVariantClasses: Record<string, Record<string, string>> = {
  default: { 
    sm: 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-500 focus:border-blue-500 dark:focus:border-blue-400 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 h-9 px-3 text-sm transition-colors duration-150', 
    md: 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-500 focus:border-blue-500 dark:focus:border-blue-400 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 h-10 px-3 text-sm transition-colors duration-150', 
    lg: 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-500 focus:border-blue-500 dark:focus:border-blue-400 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 h-11 px-4 text-base transition-colors duration-150' 
  },
  error: { 
    sm: 'border-red-500 dark:border-red-500 bg-white dark:bg-neutral-800 focus-visible:ring-red-500 h-9 px-3 text-sm transition-colors duration-150', 
    md: 'border-red-500 dark:border-red-500 bg-white dark:bg-neutral-800 focus-visible:ring-red-500 h-10 px-3 text-sm transition-colors duration-150', 
    lg: 'border-red-500 dark:border-red-500 bg-white dark:bg-neutral-800 focus-visible:ring-red-500 h-11 px-4 text-base transition-colors duration-150' 
  },
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
      const [isFocused, setIsFocused] = React.useState(false);
      const resolvedVariant = error ? 'error' : variant;
      const variantClasses = selectVariantClasses[resolvedVariant]?.[size] || selectVariantClasses.default.md;
      const classes = `flex w-full items-center justify-between rounded-lg border text-neutral-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 appearance-none cursor-pointer pr-10 ${variantClasses} ${className}`.trim();

      return (
        <div className="relative w-full">
          <select
            className={classes}
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...(error && { 'aria-invalid': 'true' })}
            {...props}
          >
            {children}
          </select>
          <motion.div
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ willChange: isFocused ? 'transform' : 'auto' }}
            animate={{ rotate: isFocused ? 180 : 0 }}
            transition={{ 
              duration: 0.2, 
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <ChevronDown
              className="h-4 w-4 text-neutral-500 dark:text-neutral-400"
              aria-hidden="true"
            />
          </motion.div>
        </div>
      );
    }
  )
);

Select.displayName = 'Select';

export { Select };
