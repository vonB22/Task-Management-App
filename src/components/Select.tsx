import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

const selectVariants = cva(
  'flex w-full items-center justify-between rounded-lg border bg-transparent text-neutral-900 dark:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 appearance-none cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400',
        error:
          'border-red-500 dark:border-red-500 bg-white dark:bg-neutral-800 focus-visible:ring-red-500',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof selectVariants> {
  /** Error state */
  error?: string;
  /** Placeholder text */
  placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant, size, error, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            selectVariants({ variant: error ? 'error' : variant, size, className }),
            'pr-10'
          )}
          ref={ref}
          aria-invalid={error ? 'true' : undefined}
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
);

Select.displayName = 'Select';

export interface SelectOptionProps
  extends React.OptionHTMLAttributes<HTMLOptionElement> {}

const SelectOption = React.forwardRef<HTMLOptionElement, SelectOptionProps>(
  ({ className, ...props }, ref) => (
    <option
      ref={ref}
      className={cn(
        'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white',
        className
      )}
      {...props}
    />
  )
);

SelectOption.displayName = 'SelectOption';

export { Select, SelectOption, selectVariants };
