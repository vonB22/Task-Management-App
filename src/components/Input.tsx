import React from 'react';

const inputVariantClasses: Record<string, Record<string, string>> = {
  default: { sm: 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 h-8 px-3 text-sm', md: 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 h-10 px-4 text-sm', lg: 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 h-12 px-4 text-base' },
  error: { sm: 'border-red-500 dark:border-red-500 bg-white dark:bg-neutral-800 focus-visible:ring-red-500 h-8 px-3 text-sm', md: 'border-red-500 dark:border-red-500 bg-white dark:bg-neutral-800 focus-visible:ring-red-500 h-10 px-4 text-sm', lg: 'border-red-500 dark:border-red-500 bg-white dark:bg-neutral-800 focus-visible:ring-red-500 h-12 px-4 text-base' },
  ghost: { sm: 'border-transparent bg-neutral-100 dark:bg-neutral-800 focus-visible:ring-blue-500 h-8 px-3 text-sm', md: 'border-transparent bg-neutral-100 dark:bg-neutral-800 focus-visible:ring-blue-500 h-10 px-4 text-sm', lg: 'border-transparent bg-neutral-100 dark:bg-neutral-800 focus-visible:ring-blue-500 h-12 px-4 text-base' },
};

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  error?: string;
  variant?: 'default' | 'error' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Input = React.memo(
  React.forwardRef<HTMLInputElement, InputProps>(
    ({ className = '', variant = 'default', size = 'md', type = 'text', error, ...props }, ref) => {
      const resolvedVariant = error ? 'error' : variant;
      const variantClasses = inputVariantClasses[resolvedVariant]?.[size] || inputVariantClasses.default.md;
      const classes = `flex w-full rounded-lg border bg-transparent text-neutral-900 dark:text-white transition-colors duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses} ${className}`.trim();

      return (
        <input
          type={type}
          className={classes}
          ref={ref}
          {...(error && { 'aria-invalid': 'true', 'aria-describedby': `${props.id}-error` })}
          {...props}
        />
      );
    }
  )
);

Input.displayName = 'Input';

export { Input };
