import React from 'react';
import type { TaskStatus } from '../types';

interface BadgeProps {
  status: TaskStatus;
}

export const Badge: React.FC<BadgeProps> = React.memo(({ status }) => {
  const statusStyles = {
    'todo': 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300',
    'in-progress': 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
    'done': 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
  };

  const statusLabels = {
    'todo': 'To-do',
    'in-progress': 'In Progress',
    'done': 'Done',
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}>
      {statusLabels[status]}
    </span>
  );
});

Badge.displayName = 'Badge';
