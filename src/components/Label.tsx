import React from 'react';

const labelVariantClasses: Record<string, string> = {
  default: 'text-neutral-700 dark:text-neutral-300',
  error: 'text-red-600 dark:text-red-400',
};

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  variant?: 'default' | 'error';
  required?: boolean;
}

const Label = React.memo(
  React.forwardRef<HTMLLabelElement, LabelProps>(
    ({ className = '', variant = 'default', required, children, ...props }, ref) => {
      const variantClasses = labelVariantClasses[variant];
      const classes = `text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${variantClasses} ${className}`.trim();

      return (
        <label ref={ref} className={classes} {...props}>
          {children}
          {required && (
            <span className="text-red-500 ml-1" aria-hidden="true">
              *
            </span>
          )}
        </label>
      );
    }
  )
);

Label.displayName = 'Label';

export { Label };
