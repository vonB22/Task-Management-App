import React from 'react';
import { Trash2, Edit2, Eye, GripVertical, Calendar, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Task } from '../types';
import { Card } from './Card';
import { Badge } from './Badge';
import { CategoryTag } from './CategoryTag';
import { Button } from './Button';
import { itemVariants } from '../lib/animations';
import { PriorityBadge } from './PriorityBadge';

const truncate = (str: string, length: number) => {
  return str.length > length ? str.substring(0, length) + '...' : str;
};

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onView: (task: Task) => void;
  className?: string;
  draggable?: boolean;
  dragControls?: any;
}

const TaskCard = React.memo(
  React.forwardRef<HTMLDivElement, TaskCardProps>(
    ({ task, onEdit, onDelete, onView, className = '', draggable = false, dragControls }, ref) => {
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
      
      const formatDueDate = (dateString?: string) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dueDate = new Date(date);
        dueDate.setHours(0, 0, 0, 0);
        
        const isOverdue = dueDate < today && task.status !== 'done';
        const isToday = dueDate.getTime() === today.getTime();
        
        const formatted = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        
        return { formatted, isOverdue, isToday };
      };
      
      const dueDateInfo = formatDueDate(task.dueDate);

      return (
        <motion.article
          ref={ref}
          className={`group ${className}`.trim()}
          aria-labelledby={`task-title-${task.id}`}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          drag={draggable ? "y" : false}
          dragControls={dragControls}
          dragElastic={0.1}
          dragConstraints={{ top: 0, bottom: 0 }}
        >
          <Card className="h-full hover:shadow-md dark:hover:shadow-lg transition-shadow">
            <div className="flex flex-col h-full space-y-4">
              <div className="flex gap-2">
                {draggable && (
                  <div className="flex items-start pt-1 cursor-grab active:cursor-grabbing" onPointerDown={(e) => dragControls?.start(e)}>
                    <GripVertical size={20} className="text-neutral-400 dark:text-neutral-600" />
                  </div>
                )}
                <div className="flex-1">
                  <h3 id={`task-title-${task.id}`} className="text-lg font-bold text-neutral-900 dark:text-white mb-2 line-clamp-2">
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm line-clamp-2">
                      {descriptionPreview}
                    </p>
                  )}
                </div>
              </div>

              {/* Due date display */}
              {dueDateInfo && (
                <div className={`flex items-center gap-1 text-xs ${dueDateInfo.isOverdue ? 'text-red-600 dark:text-red-400' : dueDateInfo.isToday ? 'text-orange-600 dark:text-orange-400' : 'text-neutral-500 dark:text-neutral-400'}`}>
                  {dueDateInfo.isOverdue && <AlertCircle size={14} />}
                  <Calendar size={14} />
                  <span>{dueDateInfo.isOverdue ? 'Overdue: ' : dueDateInfo.isToday ? 'Due Today: ' : ''}{dueDateInfo.formatted}</span>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2">
                <Badge status={task.status} />
                <CategoryTag category={task.category} />
                {task.priority && task.priority !== 'none' && <PriorityBadge priority={task.priority} />}
              </div>

              <div className="flex gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800" role="group" aria-label={`Actions for ${task.title}`}>
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
  )
);

TaskCard.displayName = 'TaskCard';

export { TaskCard };
