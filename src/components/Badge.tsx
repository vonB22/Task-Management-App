import React from 'react';
import type { TaskStatus } from '../types';

const badgeVariantClasses: Record<string, Record<string, string>> = {
  default: { sm: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-2 py-0.5 text-xs', md: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-3 py-1 text-sm', lg: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-4 py-1.5 text-sm' },
  primary: { sm: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-0.5 text-xs', md: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 text-sm', lg: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-4 py-1.5 text-sm' },
  success: { sm: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-0.5 text-xs', md: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 text-sm', lg: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-4 py-1.5 text-sm' },
};

const statusVariantMap: Record<TaskStatus, 'default' | 'primary' | 'success'> = {
  todo: 'default',
  'in-progress': 'primary',
  done: 'success',
};

const statusLabels: Record<TaskStatus, string> = {
  todo: 'To-do',
  'in-progress': 'In Progress',
  done: 'Done',
};

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: TaskStatus;
  variant?: 'default' | 'primary' | 'success';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

const Badge = React.memo(
  React.forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className = '', variant = 'default', size = 'md', status, children, ...props }, ref) => {
      const resolvedVariant = status ? statusVariantMap[status] : variant;
      const label = children ?? (status ? statusLabels[status] : null);
      const variantClasses = badgeVariantClasses[resolvedVariant]?.[size] || badgeVariantClasses.default.md;
      const classes = `inline-flex items-center justify-center rounded-full font-medium transition-colors ${variantClasses} ${className}`.trim();

      return (
        <span
          ref={ref}
          role="status"
          aria-label={status ? `Task status: ${statusLabels[status]}` : undefined}
          className={classes}
          {...props}
        >
          {label}
        </span>
      );
    }
  )
);

Badge.displayName = 'Badge';

export { Badge };
