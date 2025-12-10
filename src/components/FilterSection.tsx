import React from 'react';
import type { TaskStatus, TaskCategory } from '../types';
import { SearchBar } from './SearchBar';

interface FilterSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedStatus: TaskStatus | 'all';
  onStatusChange: (status: TaskStatus | 'all') => void;
  selectedCategory: TaskCategory | 'all';
  onCategoryChange: (category: TaskCategory | 'all') => void;
}

export const FilterSection: React.FC<FilterSectionProps> = React.memo(({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 space-y-4 transition-colors duration-200">
      <SearchBar value={searchQuery} onChange={onSearchChange} />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="status-filter" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Status
          </label>
          <select
            id="status-filter"
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value as TaskStatus | 'all')}
            className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
          >
            <option value="all">All Status</option>
            <option value="todo">To-do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div>
          <label htmlFor="category-filter" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Category
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value as TaskCategory | 'all')}
            className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
          >
            <option value="all">All Categories</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="shopping">Shopping</option>
            <option value="health">Health</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );
});

FilterSection.displayName = 'FilterSection';
