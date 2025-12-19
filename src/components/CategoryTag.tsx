import React from 'react';
import type { TaskCategory } from '../types';

const categoryColors: Record<TaskCategory, string> = {
  work: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300',
  personal: 'bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300',
  shopping: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300',
  health: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
  other: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300',
};

const categoryLabels: Record<TaskCategory, string> = {
  work: 'Work',
  personal: 'Personal',
  shopping: 'Shopping',
  health: 'Health',
  other: 'Other',
};

interface CategoryTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  category: TaskCategory;
}

const CategoryTag = React.memo(
  React.forwardRef<HTMLSpanElement, CategoryTagProps>(
    ({ className = '', category, ...props }, ref) => {
      const colorClass = categoryColors[category];
      const classes = `inline-flex items-center rounded text-xs font-medium transition-colors px-2.5 py-0.5 ${colorClass} ${className}`.trim();

      return (
        <span
          ref={ref}
          role="note"
          aria-label={`Category: ${categoryLabels[category]}`}
          className={classes}
          {...props}
        >
          {categoryLabels[category]}
        </span>
      );
    }
  )
);

CategoryTag.displayName = 'CategoryTag';

export { CategoryTag };
