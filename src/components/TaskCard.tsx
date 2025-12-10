import * as React from 'react';
import { Trash2, Edit2, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Task } from '../types';
import { Card } from './Card';
import { Badge } from './Badge';
import { CategoryTag } from './CategoryTag';
import { Button } from './Button';
import { cn, truncate } from '../lib/utils';
import { cardHoverProps, getMotionProps } from '../lib/motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

export interface TaskCardProps {
  /** Task data */
  task: Task;
  /** Callback when edit is clicked */
  onEdit: (task: Task) => void;
  /** Callback when delete is clicked */
  onDelete: (id: string) => void;
  /** Callback when view is clicked */
  onView: (task: Task) => void;
  /** Additional className */
  className?: string;
}

const TaskCard = React.forwardRef<HTMLDivElement, TaskCardProps>(
  ({ task, onEdit, onDelete, onView, className }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    const descriptionPreview = truncate(task.description, 80);

    const handleDelete = React.useCallback(() => {
      onDelete(task.id);
    }, [onDelete, task.id]);

    const handleEdit = React.useCallback(() => {
      onEdit(task);
    }, [onEdit, task]);

    const handleView = React.useCallback(() => {
      onView(task);
    }, [onView, task]);

    const hoverProps = getMotionProps(cardHoverProps, prefersReducedMotion);

    return (
      <motion.article
        ref={ref}
        className={cn('group', className)}
        aria-labelledby={`task-title-${task.id}`}
        {...hoverProps}
      >
        <Card
          className="h-full hover:shadow-md dark:hover:shadow-lg transition-shadow"
          disableAnimation
        >
          <div className="flex flex-col h-full space-y-4">
            {/* Header */}
            <div className="flex-1">
              <h3
                id={`task-title-${task.id}`}
                className="text-lg font-bold text-neutral-900 dark:text-white mb-2 line-clamp-2"
              >
                {task.title}
              </h3>
              {task.description && (
                <p className="text-neutral-600 dark:text-neutral-400 text-sm line-clamp-2">
                  {descriptionPreview}
                </p>
              )}
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge status={task.status} />
              <CategoryTag category={task.category} />
            </div>

            {/* Actions */}
            <div
              className="flex gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800"
              role="group"
              aria-label={`Actions for ${task.title}`}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={handleView}
                className="flex-1"
                aria-label={`View details of ${task.title}`}
              >
                <Eye size={16} aria-hidden="true" />
                <span className="sr-only sm:not-sr-only">View</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEdit}
                className="flex-1"
                aria-label={`Edit ${task.title}`}
              >
                <Edit2 size={16} aria-hidden="true" />
                <span className="sr-only sm:not-sr-only">Edit</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
                aria-label={`Delete ${task.title}`}
              >
                <Trash2 size={16} aria-hidden="true" />
                <span className="sr-only sm:not-sr-only">Delete</span>
              </Button>
            </div>
          </div>
        </Card>
      </motion.article>
    );
  }
);

TaskCard.displayName = 'TaskCard';

export { TaskCard };
