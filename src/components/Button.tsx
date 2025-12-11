import React from 'react';
import { motion } from 'framer-motion';

const buttonVariantClasses: Record<string, Record<string, string>> = {
  primary: { sm: 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 focus-visible:ring-blue-500 h-8 px-3 text-sm', md: 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 focus-visible:ring-blue-500 h-10 px-4 text-sm', lg: 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 focus-visible:ring-blue-500 h-12 px-6 text-base', icon: 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 focus-visible:ring-blue-500 h-10 w-10' },
  secondary: { sm: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 focus-visible:ring-neutral-500 h-8 px-3 text-sm', md: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 focus-visible:ring-neutral-500 h-10 px-4 text-sm', lg: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 focus-visible:ring-neutral-500 h-12 px-6 text-base', icon: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 focus-visible:ring-neutral-500 h-10 w-10' },
  danger: { sm: 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-500 focus-visible:ring-red-500 h-8 px-3 text-sm', md: 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-500 focus-visible:ring-red-500 h-10 px-4 text-sm', lg: 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-500 focus-visible:ring-red-500 h-12 px-6 text-base', icon: 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-500 focus-visible:ring-red-500 h-10 w-10' },
  ghost: { sm: 'hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-100 focus-visible:ring-neutral-500 h-8 px-3 text-sm', md: 'hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-100 focus-visible:ring-neutral-500 h-10 px-4 text-sm', lg: 'hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-100 focus-visible:ring-neutral-500 h-12 px-6 text-base', icon: 'hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-100 focus-visible:ring-neutral-500 h-10 w-10' },
  outline: { sm: 'border border-neutral-200 bg-transparent hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800 focus-visible:ring-neutral-500 h-8 px-3 text-sm', md: 'border border-neutral-200 bg-transparent hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800 focus-visible:ring-neutral-500 h-10 px-4 text-sm', lg: 'border border-neutral-200 bg-transparent hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800 focus-visible:ring-neutral-500 h-12 px-6 text-base', icon: 'border border-neutral-200 bg-transparent hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800 focus-visible:ring-neutral-500 h-10 w-10' },
  link: { sm: 'text-blue-600 underline-offset-4 hover:underline dark:text-blue-400 focus-visible:ring-blue-500 h-8 px-3 text-sm', md: 'text-blue-600 underline-offset-4 hover:underline dark:text-blue-400 focus-visible:ring-blue-500 h-10 px-4 text-sm', lg: 'text-blue-600 underline-offset-4 hover:underline dark:text-blue-400 focus-visible:ring-blue-500 h-12 px-6 text-base', icon: 'text-blue-600 underline-offset-4 hover:underline dark:text-blue-400 focus-visible:ring-blue-500 h-10 w-10' },
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

const Button = React.memo(
  React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {
      const variantClasses = buttonVariantClasses[variant]?.[size] || buttonVariantClasses.primary.md;
      const classes = `inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ${variantClasses} ${className}`.trim();

      return (
        <motion.button
          ref={ref}
          className={classes}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 } as any}
          {...(props as any)}
        >
          {children}
        </motion.button>
      );
    }
  )
);

Button.displayName = 'Button';

export { Button };
