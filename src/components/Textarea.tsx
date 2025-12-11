import React from 'react';

const textareaVariantClasses: Record<string, Record<string, string>> = {
  default: { sm: 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 px-3 py-2 text-sm', md: 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 px-4 py-2 text-sm', lg: 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 px-4 py-3 text-base' },
  error: { sm: 'border-red-500 dark:border-red-500 bg-white dark:bg-neutral-800 focus-visible:ring-red-500 px-3 py-2 text-sm', md: 'border-red-500 dark:border-red-500 bg-white dark:bg-neutral-800 focus-visible:ring-red-500 px-4 py-2 text-sm', lg: 'border-red-500 dark:border-red-500 bg-white dark:bg-neutral-800 focus-visible:ring-red-500 px-4 py-3 text-base' },
};

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  variant?: 'default' | 'error';
  size?: 'sm' | 'md' | 'lg';
}

const Textarea = React.memo(
  React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className = '', variant = 'default', size = 'md', error, ...props }, ref) => {
      const resolvedVariant = error ? 'error' : variant;
      const variantClasses = textareaVariantClasses[resolvedVariant]?.[size] || textareaVariantClasses.default.md;
      const classes = `flex min-h-[80px] w-full rounded-lg border bg-transparent text-neutral-900 dark:text-white transition-colors duration-200 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 resize-none ${variantClasses} ${className}`.trim();

      return (
        <textarea
          className={classes}
          ref={ref}
          {...(error && { 'aria-invalid': 'true' })}
          {...props}
        />
      );
    }
  )
);

Textarea.displayName = 'Textarea';

export { Textarea };
