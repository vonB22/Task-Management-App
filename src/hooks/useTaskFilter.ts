import { useState, useCallback, useMemo } from 'react';
import type { Task, TaskStatus, TaskCategory } from '../types';

export interface UseTaskFilter {
  filteredTasks: Task[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedStatus: TaskStatus | 'all';
  setSelectedStatus: (status: TaskStatus | 'all') => void;
  selectedCategory: TaskCategory | 'all';
  setSelectedCategory: (category: TaskCategory | 'all') => void;
  reset: () => void;
}

export const useTaskFilter = (tasks: Task[]): UseTaskFilter => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory | 'all'>('all');

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === 'all' || task.status === selectedStatus;

      const matchesCategory =
        selectedCategory === 'all' || task.category === selectedCategory;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [tasks, searchQuery, selectedStatus, selectedCategory]);

  const reset = useCallback(() => {
    setSearchQuery('');
    setSelectedStatus('all');
    setSelectedCategory('all');
  }, []);

  return {
    filteredTasks,
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    selectedCategory,
    setSelectedCategory,
    reset,
  };
};
