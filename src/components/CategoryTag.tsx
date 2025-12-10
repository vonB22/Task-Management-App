import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { popVariants, quickSpring, getMotionProps } from '../lib/motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import type { TaskCategory } from '../types';

const categoryTagVariants = cva(
  'inline-flex items-center rounded text-xs font-medium transition-colors',
  {
    variants: {
      category: {
        work: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300',
        personal: 'bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300',
        shopping: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300',
        health: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
        other: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300',
      },
      size: {
        sm: 'px-2 py-0.5',
        md: 'px-2.5 py-0.5',
        lg: 'px-3 py-1',
      },
    },
    defaultVariants: {
      category: 'other',
      size: 'md',
    },
  }
);

const categoryLabels: Record<TaskCategory, string> = {
  work: 'Work',
  personal: 'Personal',
  shopping: 'Shopping',
  health: 'Health',
  other: 'Other',
};

export interface CategoryTagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof categoryTagVariants> {
  category: TaskCategory;
}

const CategoryTag = React.forwardRef<HTMLSpanElement, CategoryTagProps>(
  ({ className, category, size, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();

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
          role="note"
          aria-label={`Category: ${categoryLabels[category]}`}
          className={cn(categoryTagVariants({ category, size, className }))}
          {...props}
        >
          {categoryLabels[category]}
        </span>
      );
    }

    return (
      <motion.span
        ref={ref}
        role="note"
        aria-label={`Category: ${categoryLabels[category]}`}
        className={cn(categoryTagVariants({ category, size, className }))}
        {...motionProps}
        {...(props as object)}
      >
        {categoryLabels[category]}
      </motion.span>
    );
  }
);

CategoryTag.displayName = 'CategoryTag';

export { CategoryTag, categoryTagVariants };
