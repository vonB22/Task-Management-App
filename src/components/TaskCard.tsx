import React from 'react';
import { Trash2, Edit2, Eye } from 'lucide-react';
import type { Task } from '../types';
import { Card } from './Card';
import { Badge } from './Badge';
import { CategoryTag } from './CategoryTag';
import { Button } from './Button';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onView: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = React.memo(({ task, onEdit, onDelete, onView }) => {
  const descriptionPreview = task.description.length > 80 
    ? task.description.substring(0, 80) + '...' 
    : task.description;

  return (
    <Card className="hover:shadow-md dark:hover:shadow-lg transition-shadow duration-200">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">{task.title}</h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm">{descriptionPreview}</p>
        </div>

        <div className="flex items-center gap-2">
          <Badge status={task.status} />
          <CategoryTag category={task.category} />
        </div>

        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onView(task)}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <Eye size={18} />
            View
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit(task)}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <Edit2 size={18} />
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(task.id)}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <Trash2 size={18} />
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
});

TaskCard.displayName = 'TaskCard';
