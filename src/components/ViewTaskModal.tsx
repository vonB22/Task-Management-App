import React from 'react';
import type { Task } from '../types';
import { Modal } from './Modal';
import { Badge } from './Badge';
import { CategoryTag } from './CategoryTag';
import { Button } from './Button';

interface ViewTaskModalProps {
  isOpen: boolean;
  task: Task | null;
  onClose: () => void;
  onEdit: () => void;
}

export const ViewTaskModal: React.FC<ViewTaskModalProps> = ({ isOpen, task, onClose, onEdit }) => {
  if (!task) return null;

  const formattedDate = new Date(task.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Task Details">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">{task.title}</h3>
          <div className="flex items-center gap-2">
            <Badge status={task.status} />
            <CategoryTag category={task.category} />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Description</h4>
          <p className="text-neutral-600 dark:text-neutral-400">{task.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-neutral-500 dark:text-neutral-400">Created</p>
            <p className="text-neutral-900 dark:text-white font-medium">{formattedDate}</p>
          </div>
          <div>
            <p className="text-neutral-500 dark:text-neutral-400">Status</p>
            <p className="text-neutral-900 dark:text-white font-medium capitalize">{task.status.replace('-', ' ')}</p>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <Button variant="secondary" onClick={onClose} className="flex-1">
            Close
          </Button>
          <Button variant="primary" onClick={onEdit} className="flex-1">
            Edit Task
          </Button>
        </div>
      </div>
    </Modal>
  );
};
