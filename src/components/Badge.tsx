import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { popVariants, quickSpring, getMotionProps } from '../lib/motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import type { TaskStatus } from '../types';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300',
        primary: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
        success: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
        warning: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300',
        danger: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

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

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Task status - auto-maps to variant */
  status?: TaskStatus;
  /** Custom label (overrides status label) */
  children?: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, status, children, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    const resolvedVariant = status ? statusVariantMap[status] : variant;
    const label = children ?? (status ? statusLabels[status] : null);

    const motionProps = getMotionProps(
      {
        variants: popVariants,
        initial: 'hidden',
        animate: 'visible',
        transition: quickSpring,
      },
      prefersReducedMotion
    );

    if (prefersReducedMotion) {
      return (
        <span
          ref={ref}
          role="status"
          aria-label={status ? `Task status: ${statusLabels[status]}` : undefined}
          className={cn(badgeVariants({ variant: resolvedVariant, size, className }))}
          {...props}
        >
          {label}
        </span>
      );
    }

    return (
      <motion.span
        ref={ref}
        role="status"
        aria-label={status ? `Task status: ${statusLabels[status]}` : undefined}
        className={cn(badgeVariants({ variant: resolvedVariant, size, className }))}
        {...motionProps}
        {...(props as object)}
      >
        {label}
      </motion.span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
