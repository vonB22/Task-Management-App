import React from 'react';
import type { Task, TaskStatus, TaskCategory } from '../types';
import { Modal } from './Modal';
import { Button } from './Button';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Select } from './Select';
import { Label } from './Label';

export interface EditTaskModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Task to edit (null if no task selected) */
  task: Task | null;
  /** Callback when the modal should close */
  onClose: () => void;
  /** Callback when task is updated */
  onEdit: (task: Task) => void;
}

const EditTaskModal = React.forwardRef<HTMLDivElement, EditTaskModalProps>(
  ({ isOpen, task, onClose, onEdit }, ref) => {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [category, setCategory] = React.useState<TaskCategory>('other');
    const [status, setStatus] = React.useState<TaskStatus>('todo');
    const [errors, setErrors] = React.useState<{ title?: string }>({});

    // Sync form state when task changes
    React.useEffect(() => {
      if (task) {
        setTitle(task.title);
        setDescription(task.description);
        setCategory(task.category);
        setStatus(task.status);
        setErrors({});
      }
    }, [task]);

    const validateForm = React.useCallback((): boolean => {
      const newErrors: { title?: string } = {};

      if (!title.trim()) {
        newErrors.title = 'Title is required';
      } else if (title.trim().length < 3) {
        newErrors.title = 'Title must be at least 3 characters';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }, [title]);

    const handleSubmit = React.useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();

        if (!task || !validateForm()) return;

        onEdit({
          ...task,
          title: title.trim(),
          description: description.trim(),
          category,
          status,
          updatedAt: new Date(),
        });

        onClose();
      },
      [task, title, description, category, status, validateForm, onEdit, onClose]
    );

    if (!task) return null;

    return (
      <Modal
        ref={ref}
        isOpen={isOpen}
        onClose={onClose}
        title="Edit Task"
        description="Update the task details below."
      >
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor="edit-task-title" required>
              Title
            </Label>
            <Input
              id="edit-task-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              error={errors.title}
              autoFocus
              required
              aria-required="true"
            />
            {errors.title && (
              <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                {errors.title}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-task-description">Description</Label>
            <Textarea
              id="edit-task-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description (optional)"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-task-category">Category</Label>
              <Select
                id="edit-task-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as TaskCategory)}
              >
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="shopping">Shopping</option>
                <option value="health">Health</option>
                <option value="other">Other</option>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-task-status">Status</Label>
              <Select
                id="edit-task-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
              >
                <option value="todo">To-do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </Select>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="flex-1">
              Update Task
            </Button>
          </div>
        </form>
      </Modal>
    );
  }
);

EditTaskModal.displayName = 'EditTaskModal';

export { EditTaskModal };
