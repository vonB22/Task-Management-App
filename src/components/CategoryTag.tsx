import React from 'react';
import type { TaskCategory } from '../types';

interface CategoryTagProps {
  category: TaskCategory;
}

export const CategoryTag: React.FC<CategoryTagProps> = React.memo(({ category }) => {
  const categoryStyles = {
    'work': 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300',
    'personal': 'bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300',
    'shopping': 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300',
    'health': 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
    'other': 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300',
  };

  const categoryLabels = {
    'work': 'Work',
    'personal': 'Personal',
    'shopping': 'Shopping',
    'health': 'Health',
    'other': 'Other',
  };

  return (
    <span className={`inline-block px-2.5 py-0.5 rounded text-xs font-medium ${categoryStyles[category]}`}>
      {categoryLabels[category]}
    </span>
  );
});

CategoryTag.displayName = 'CategoryTag';
