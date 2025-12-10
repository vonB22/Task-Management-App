import * as React from 'react';
import { Calendar, Clock } from 'lucide-react';
import type { Task } from '../types';
import { Modal } from './Modal';
import { Badge } from './Badge';
import { CategoryTag } from './CategoryTag';
import { Button } from './Button';
import { formatDate } from '../lib/utils';

export interface ViewTaskModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Task to view (null if no task selected) */
  task: Task | null;
  /** Callback when the modal should close */
  onClose: () => void;
  /** Callback when edit is requested */
  onEdit: () => void;
}

const ViewTaskModal = React.forwardRef<HTMLDivElement, ViewTaskModalProps>(
  ({ isOpen, task, onClose, onEdit }, ref) => {
    if (!task) return null;

    const createdDate = formatDate(task.createdAt);
    const updatedDate = formatDate(task.updatedAt);
    const wasUpdated = task.createdAt.toString() !== task.updatedAt.toString();

    return (
      <Modal
        ref={ref}
        isOpen={isOpen}
        onClose={onClose}
        title="Task Details"
        size="md"
      >
        <div className="space-y-6">
          {/* Header with title and tags */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
              {task.title}
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              <Badge status={task.status} />
              <CategoryTag category={task.category} />
            </div>
          </div>

          {/* Description */}
          {task.description && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Description
              </h4>
              <p className="text-neutral-600 dark:text-neutral-400 whitespace-pre-wrap">
                {task.description}
              </p>
            </div>
          )}

          {/* Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg">
            <div className="flex items-start gap-3">
              <Calendar
                size={18}
                className="text-neutral-500 dark:text-neutral-400 mt-0.5 shrink-0"
                aria-hidden="true"
              />
              <div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Created
                </p>
                <p className="text-sm font-medium text-neutral-900 dark:text-white">
                  {createdDate}
                </p>
              </div>
            </div>

            {wasUpdated && (
              <div className="flex items-start gap-3">
                <Clock
                  size={18}
                  className="text-neutral-500 dark:text-neutral-400 mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Last Updated
                  </p>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">
                    {updatedDate}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1"
            >
              Close
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={onEdit}
              className="flex-1"
            >
              Edit Task
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
);

ViewTaskModal.displayName = 'ViewTaskModal';

export { ViewTaskModal };
