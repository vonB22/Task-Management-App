import React from 'react';
import { AlertCircle, Circle, ArrowDown } from 'lucide-react';
import type { TaskPriority } from '../types';

interface PriorityBadgeProps {
  priority: TaskPriority;
  className?: string;
}

const priorityConfig: Record<Exclude<TaskPriority, 'none'>, { label: string; icon: React.ReactNode; className: string }> = {
  high: {
    label: 'High',
    icon: <AlertCircle size={14} />,
    className: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
  },
  medium: {
    label: 'Medium',
    icon: <Circle size={14} />,
    className: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
  },
  low: {
    label: 'Low',
    icon: <ArrowDown size={14} />,
    className: 'bg-neutral-100 text-neutral-700 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700',
  },
};

const PriorityBadge = React.memo<PriorityBadgeProps>(({ priority, className = '' }) => {
  if (priority === 'none') return null;
  
  const config = priorityConfig[priority];
  
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md border ${config.className} ${className}`.trim()}
      aria-label={`Priority: ${config.label}`}
    >
      {config.icon}
      {config.label}
    </span>
  );
});

PriorityBadge.displayName = 'PriorityBadge';

export { PriorityBadge };
