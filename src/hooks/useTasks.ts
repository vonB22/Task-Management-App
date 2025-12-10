import { useState, useCallback } from 'react';
import type { Task } from '../types';

export interface UseTasks {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTaskById: (id: string) => Task | undefined;
}

export const useTasks = (initialTasks: Task[]): UseTasks => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = useCallback((task: Task) => {
    setTasks((prev) => [...prev, task]);
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const getTaskById = useCallback(
    (id: string) => tasks.find((task) => task.id === id),
    [tasks]
  );

  return { tasks, addTask, updateTask, deleteTask, getTaskById };
};
