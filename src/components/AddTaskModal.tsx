import React from 'react';
import type { Task, TaskStatus, TaskCategory, TaskPriority } from '../types';
import { Modal } from './Modal';
import { Button } from './Button';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Select } from './Select';
import { Label } from './Label';
import { DatePicker } from './DatePicker';

export interface AddTaskModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when the modal should close */
  onClose: () => void;
  /** Callback when a task is added */
  onAdd: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'order'>) => void;
}

const AddTaskModal = React.forwardRef<HTMLDivElement, AddTaskModalProps>(
  ({ isOpen, onClose, onAdd }, ref) => {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [category, setCategory] = React.useState<TaskCategory>('other');
    const [status, setStatus] = React.useState<TaskStatus>('todo');
    const [priority, setPriority] = React.useState<TaskPriority>('medium');
    const [dueDate, setDueDate] = React.useState<string | undefined>(undefined);
    const [notes, setNotes] = React.useState('');
    const [errors, setErrors] = React.useState<{ title?: string }>({});

    const resetForm = React.useCallback(() => {
      setTitle('');
      setDescription('');
      setCategory('other');
      setStatus('todo');
      setPriority('medium');
      setDueDate(undefined);
      setNotes('');
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
          priority,
          dueDate,
          notes: notes.trim() || undefined,
          attachments: [],
        });

        resetForm();
        onClose();
      },
      [title, description, category, status, priority, dueDate, notes, validateForm, onAdd, resetForm, onClose]
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
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-3" noValidate>
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
              rows={3}
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
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="shopping">Shopping</option>
                <option value="health">Health</option>
                <option value="other">Other</option>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="add-task-status">Status</Label>
              <Select
                id="add-task-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
              >
                <option value="todo">To-do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="add-task-priority">Priority</Label>
              <Select
                id="add-task-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
              >
                <option value="none">None</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
            </div>

            <div className="space-y-2">
              <DatePicker
                label="Due Date"
                value={dueDate}
                onChange={setDueDate}
                placeholder="Select due date"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="add-task-notes">Notes</Label>
            <Textarea
              id="add-task-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes (optional)"
              rows={2}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 border-t border-neutral-200 dark:border-neutral-800">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              className="flex-1 order-2 sm:order-1"
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="flex-1 order-1 sm:order-2">
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
