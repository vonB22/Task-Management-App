import React from 'react';
import type { TaskStatus, TaskCategory, TaskPriority } from '../types';
import { SearchBar } from './SearchBar';
import { Select } from './Select';
import { Label } from './Label';
import { Card } from './Card';

interface FilterSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedStatus: TaskStatus | 'all';
  onStatusChange: (status: TaskStatus | 'all') => void;
  selectedCategory: TaskCategory | 'all';
  onCategoryChange: (category: TaskCategory | 'all') => void;
  selectedPriority?: TaskPriority | 'all';
  onPriorityChange?: (priority: TaskPriority | 'all') => void;
  className?: string;
}

const FilterSection = React.memo(
  React.forwardRef<HTMLDivElement, FilterSectionProps>(
    (
      {
        searchQuery,
        onSearchChange,
        selectedStatus,
        onStatusChange,
        selectedCategory,
        onCategoryChange,
        selectedPriority = 'all',
        onPriorityChange,
        className = '',
      },
      ref
    ) => {
      const handleClearSearch = React.useCallback(() => {
        onSearchChange('');
      }, [onSearchChange]);

      return (
        <Card
          ref={ref}
          className={`space-y-4 ${className}`.trim()}
          role="search"
          aria-label="Filter tasks"
        >
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            onClear={handleClearSearch}
            placeholder="Search tasks by title or description..."
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status-filter">Status</Label>
              <Select
                id="status-filter"
                value={selectedStatus}
                onChange={(e) => onStatusChange(e.target.value as TaskStatus | 'all')}
                aria-label="Filter by status"
              >
                <option value="all">All Statuses</option>
                <option value="todo">To-do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category-filter">Category</Label>
              <Select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value as TaskCategory | 'all')}
                aria-label="Filter by category"
              >
                <option value="all">All Categories</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="shopping">Shopping</option>
                <option value="health">Health</option>
                <option value="other">Other</option>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority-filter">Priority</Label>
              <Select
                id="priority-filter"
                value={selectedPriority}
                onChange={(e) => onPriorityChange?.(e.target.value as TaskPriority | 'all')}
                aria-label="Filter by priority"
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
                <option value="none">None</option>
              </Select>
            </div>
          </div>
        </Card>
      );
    }
  )
);

FilterSection.displayName = 'FilterSection';

export { FilterSection };
