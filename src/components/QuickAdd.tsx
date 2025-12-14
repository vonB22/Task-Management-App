import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Plus } from 'lucide-react';

import { Button } from './Button';

import { DatePicker } from './DatePicker';
import type { Task, TaskCategory, TaskPriority, TaskStatus } from '../types';

interface QuickAddProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'order'>) => void;
}

export const QuickAdd: React.FC<QuickAddProps> = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TaskCategory>('work');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [dueDate, setDueDate] = useState<string | undefined>();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleClose = () => {
    setTitle('');
    setCategory('work');
    setPriority('medium');
    setDueDate(undefined);
    setShowAdvanced(false);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      description: '',
      category,
      priority,
      status: 'todo' as TaskStatus,
      dueDate,
      attachments: [],
    });

    handleClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit(e);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/20 dark:bg-black/40 backdrop-blur-sm"
          />

          {/* Quick Add Panel */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed top-16 sm:top-24 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] sm:w-full max-w-lg"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-neutral-800 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden"
            >
              {/* Main Input */}
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                    <Plus size={18} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <input
                    ref={inputRef}
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="What needs to be done?"
                    className="flex-1 text-lg font-medium bg-transparent border-none outline-none text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={handleClose}
                    className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                  >
                    <X size={18} className="text-neutral-500" />
                  </button>
                </div>
              </div>

              {/* Quick Options */}
              <div className="px-4 pb-3 flex flex-wrap items-center gap-2">
                {/* Priority Quick Select */}
                <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-700 rounded-lg p-1">
                  {(['low', 'medium', 'high'] as TaskPriority[]).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                        priority === p
                          ? p === 'high'
                            ? 'bg-red-500 text-white'
                            : p === 'medium'
                            ? 'bg-amber-500 text-white'
                            : 'bg-green-500 text-white'
                          : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                      }`}
                    >
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Category */}
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as TaskCategory)}
                  className="px-3 py-1.5 text-xs font-medium bg-neutral-100 dark:bg-neutral-700 border-none rounded-lg text-neutral-700 dark:text-neutral-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="work">🏢 Work</option>
                  <option value="personal">👤 Personal</option>
                  <option value="shopping">🛒 Shopping</option>
                  <option value="health">💪 Health</option>
                  <option value="other">📌 Other</option>
                </select>

                {/* Due Date Toggle */}
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    dueDate
                      ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                      : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                  }`}
                >
                  <Calendar size={14} />
                  {dueDate ? 'Due date set' : 'Add due date'}
                </button>
              </div>

              {/* Advanced Options */}
              <AnimatePresence>
                {showAdvanced && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-neutral-200 dark:border-neutral-700"
                  >
                    <div className="p-4 pb-6 sm:pb-4">
                      <DatePicker
                        value={dueDate}
                        onChange={setDueDate}
                        label="Due Date"
                        placeholder="Select due date"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Footer */}
              <div className="px-4 py-3 bg-neutral-50 dark:bg-neutral-900/50 border-t border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Press <kbd className="px-1.5 py-0.5 bg-neutral-200 dark:bg-neutral-700 rounded text-xs">⌘</kbd> + <kbd className="px-1.5 py-0.5 bg-neutral-200 dark:bg-neutral-700 rounded text-xs">Enter</kbd> to save
                </p>
                <div className="flex gap-2">
                  <Button type="button" variant="secondary" size="sm" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm" disabled={!title.trim()}>
                    Add Task
                  </Button>
                </div>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
