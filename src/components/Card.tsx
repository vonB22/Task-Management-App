import React from 'react';

const cardVariantClasses: Record<string, Record<string, string>> = {
  default: { none: 'rounded-lg border transition-colors duration-200 bg-white dark:bg-neutral-900 shadow-sm dark:shadow-md border-neutral-200 dark:border-neutral-800 p-0', sm: 'rounded-lg border transition-colors duration-200 bg-white dark:bg-neutral-900 shadow-sm dark:shadow-md border-neutral-200 dark:border-neutral-800 p-4', md: 'rounded-lg border transition-colors duration-200 bg-white dark:bg-neutral-900 shadow-sm dark:shadow-md border-neutral-200 dark:border-neutral-800 p-6', lg: 'rounded-lg border transition-colors duration-200 bg-white dark:bg-neutral-900 shadow-sm dark:shadow-md border-neutral-200 dark:border-neutral-800 p-8' },
  elevated: { none: 'rounded-lg border transition-colors duration-200 bg-white dark:bg-neutral-900 shadow-lg dark:shadow-xl border-neutral-200 dark:border-neutral-800 p-0', sm: 'rounded-lg border transition-colors duration-200 bg-white dark:bg-neutral-900 shadow-lg dark:shadow-xl border-neutral-200 dark:border-neutral-800 p-4', md: 'rounded-lg border transition-colors duration-200 bg-white dark:bg-neutral-900 shadow-lg dark:shadow-xl border-neutral-200 dark:border-neutral-800 p-6', lg: 'rounded-lg border transition-colors duration-200 bg-white dark:bg-neutral-900 shadow-lg dark:shadow-xl border-neutral-200 dark:border-neutral-800 p-8' },
  outline: { none: 'rounded-lg border transition-colors duration-200 bg-transparent border-neutral-300 dark:border-neutral-700 p-0', sm: 'rounded-lg border transition-colors duration-200 bg-transparent border-neutral-300 dark:border-neutral-700 p-4', md: 'rounded-lg border transition-colors duration-200 bg-transparent border-neutral-300 dark:border-neutral-700 p-6', lg: 'rounded-lg border transition-colors duration-200 bg-transparent border-neutral-300 dark:border-neutral-700 p-8' },
  ghost: { none: 'rounded-lg border transition-colors duration-200 border-transparent bg-transparent p-0', sm: 'rounded-lg border transition-colors duration-200 border-transparent bg-transparent p-4', md: 'rounded-lg border transition-colors duration-200 border-transparent bg-transparent p-6', lg: 'rounded-lg border transition-colors duration-200 border-transparent bg-transparent p-8' },
};

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outline' | 'ghost';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  disableAnimation?: boolean;
}

const Card = React.memo(
  React.forwardRef<HTMLDivElement, CardProps>(
    ({ className = '', variant = 'default', padding = 'md', disableAnimation = false, ...props }, ref) => {
      const variantClasses = cardVariantClasses[variant]?.[padding] || cardVariantClasses.default.md;
      const classes = `${variantClasses} ${className}`.trim();

      return <div ref={ref} className={classes} {...props} />;
    }
  )
);

Card.displayName = 'Card';

const CardHeader = React.memo(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className = '', ...props }, ref) => (
      <div ref={ref} className={`flex flex-col space-y-1.5 p-6 ${className}`.trim()} {...props} />
    )
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.memo(
  React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className = '', ...props }, ref) => (
      <h3 ref={ref} className={`text-lg font-bold leading-none tracking-tight text-neutral-900 dark:text-white ${className}`.trim()} {...props} />
    )
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.memo(
  React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    ({ className = '', ...props }, ref) => (
      <p ref={ref} className={`text-sm text-neutral-600 dark:text-neutral-400 ${className}`.trim()} {...props} />
    )
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.memo(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className = '', ...props }, ref) => (
      <div ref={ref} className={`p-6 pt-0 ${className}`.trim()} {...props} />
    )
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.memo(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className = '', ...props }, ref) => (
      <div ref={ref} className={`flex items-center p-6 pt-0 ${className}`.trim()} {...props} />
    )
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
