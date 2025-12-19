import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface RippleType {
  x: number;
  y: number;
  id: number;
}

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
  isLoading?: boolean;
  ripple?: boolean;
}

const Button = React.memo(
  React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', variant = 'primary', size = 'md', children, isLoading = false, ripple = true, onClick, disabled, ...props }, ref) => {
      const [ripples, setRipples] = useState<RippleType[]>([]);
      const rippleIdRef = useRef(0);
      
      const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (ripple && !disabled && !isLoading) {
          const button = e.currentTarget;
          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const newRipple: RippleType = {
            x,
            y,
            id: rippleIdRef.current++,
          };
          
          setRipples((prev) => [...prev, newRipple]);
          
          setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
          }, 600);
        }
        
        if (onClick && !disabled && !isLoading) {
          onClick(e);
        }
      };
      
      const variantClasses = buttonVariantClasses[variant]?.[size] || buttonVariantClasses.primary.md;
      const classes = `inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ${variantClasses} ${className}`.trim();

      const getRippleColor = () => {
        switch (variant) {
          case 'primary':
          case 'danger':
            return 'rgba(255, 255, 255, 0.5)';
          case 'secondary':
          case 'ghost':
          case 'outline':
            return 'rgba(0, 0, 0, 0.1)';
          case 'link':
            return 'rgba(37, 99, 235, 0.2)';
          default:
            return 'rgba(255, 255, 255, 0.5)';
        }
      };

      return (
        <motion.button
          ref={ref}
          className={`${classes} relative overflow-hidden`}
          whileHover={!disabled && !isLoading ? { scale: 1.02 } : undefined}
          whileTap={!disabled && !isLoading ? { scale: 0.98 } : undefined}
          transition={{ type: 'spring', stiffness: 400, damping: 25 } as any}
          onClick={handleClick}
          disabled={disabled || isLoading}
          {...(props as any)}
        >
          {/* Ripple effects */}
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: ripple.x,
                top: ripple.y,
                backgroundColor: getRippleColor(),
              }}
              initial={{ width: 0, height: 0, x: '-50%', y: '-50%', opacity: 1 }}
              animate={{ width: 500, height: 500, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          ))}
          
          {/* Loading spinner */}
          {isLoading && (
            <Loader2 className="animate-spin" />
          )}
          
          {/* Content */}
          {!isLoading && children}
        </motion.button>
      );
    }
  )
);

Button.displayName = 'Button';

export { Button };
