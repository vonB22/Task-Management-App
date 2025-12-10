import * as React from 'react';
import type { Task, TaskStatus, TaskCategory } from '../types';
import { Modal } from './Modal';
import { Button } from './Button';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Select, SelectOption } from './Select';
import { Label } from './Label';

export interface AddTaskModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when the modal should close */
  onClose: () => void;
  /** Callback when a task is added */
  onAdd: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const AddTaskModal = React.forwardRef<HTMLDivElement, AddTaskModalProps>(
  ({ isOpen, onClose, onAdd }, ref) => {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [category, setCategory] = React.useState<TaskCategory>('other');
    const [status, setStatus] = React.useState<TaskStatus>('todo');
    const [errors, setErrors] = React.useState<{ title?: string }>({});

    const resetForm = React.useCallback(() => {
      setTitle('');
      setDescription('');
      setCategory('other');
      setStatus('todo');
      setErrors({});
    }, []);

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

        if (!validateForm()) return;

        onAdd({
          title: title.trim(),
          description: description.trim(),
          category,
          status,
        });

        resetForm();
        onClose();
      },
      [title, description, category, status, validateForm, onAdd, resetForm, onClose]
    );

    const handleClose = React.useCallback(() => {
      resetForm();
      onClose();
    }, [resetForm, onClose]);

    return (
      <Modal
        ref={ref}
        isOpen={isOpen}
        onClose={handleClose}
        title="Add New Task"
        description="Create a new task by filling out the form below."
      >
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor="add-task-title" required>
              Title
            </Label>
            <Input
              id="add-task-title"
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
              <p className="text-sm text-red-600 dark:text-red-400\" role="alert">
                {errors.title}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="add-task-description">Description</Label>
            <Textarea
              id="add-task-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description (optional)"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="add-task-category">Category</Label>
              <Select
                id="add-task-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as TaskCategory)}
              >
                <SelectOption value="work">Work</SelectOption>
                <SelectOption value="personal">Personal</SelectOption>
                <SelectOption value="shopping">Shopping</SelectOption>
                <SelectOption value="health">Health</SelectOption>
                <SelectOption value="other">Other</SelectOption>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="add-task-status">Status</Label>
              <Select
                id="add-task-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
              >
                <SelectOption value="todo">To-do</SelectOption>
                <SelectOption value="in-progress">In Progress</SelectOption>
                <SelectOption value="done">Done</SelectOption>
              </Select>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="flex-1">
              Add Task
            </Button>
          </div>
        </form>
      </Modal>
    );
  }
);

AddTaskModal.displayName = 'AddTaskModal';

export { AddTaskModal };
