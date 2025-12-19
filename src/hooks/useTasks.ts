import { useState, useCallback } from 'react';
import type { Task } from '../types';

export interface UseTasks {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTaskById: (id: string) => Task | undefined;
  reorderTasks: (startIndex: number, endIndex: number) => void;
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

  const reorderTasks = useCallback((startIndex: number, endIndex: number) => {
    setTasks((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      
      // Update order property for all tasks
      return result.map((task, index) => ({
        ...task,
        order: index,
        updatedAt: new Date(),
      }));
    });
  }, []);

  return { tasks, addTask, updateTask, deleteTask, getTaskById, reorderTasks };
};
