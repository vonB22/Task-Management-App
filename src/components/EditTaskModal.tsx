import React, { useState, useEffect } from 'react';
import type { Task, TaskStatus, TaskCategory } from '../types';
import { Modal } from './Modal';
import { Button } from './Button';

interface EditTaskModalProps {
  isOpen: boolean;
  task: Task | null;
  onClose: () => void;
  onEdit: (task: Task) => void;
}

export const EditTaskModal: React.FC<EditTaskModalProps> = ({ isOpen, task, onClose, onEdit }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [category, setCategory] = useState<TaskCategory>(task?.category || 'other');
  const [status, setStatus] = useState<TaskStatus>(task?.status || 'todo');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setCategory(task.category);
      setStatus(task.status);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task || !title.trim()) return;

    onEdit({
      ...task,
      title,
      description,
      category,
      status,
      updatedAt: new Date(),
    });

    onClose();
  };

  if (!task) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Task">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-none transition-colors duration-200"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as TaskCategory)}
              title="Select a category"
              className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
            >
              <option value="work" className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white">Work</option>
              <option value="personal" className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white">Personal</option>
              <option value="shopping" className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white">Shopping</option>
              <option value="health" className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white">Health</option>
              <option value="other" className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              title="Select a status"
              className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
            >
              <option value="todo" className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white">To-do</option>
              <option value="in-progress" className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white">In Progress</option>
              <option value="done" className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white">Done</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button variant="primary" type="submit" className="flex-1">
            Update Task
          </Button>
        </div>
      </form>
    </Modal>
  );
};
