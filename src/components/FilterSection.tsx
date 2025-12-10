import * as React from 'react';
import type { TaskStatus, TaskCategory } from '../types';
import { SearchBar } from './SearchBar';
import { Select, SelectOption } from './Select';
import { Label } from './Label';
import { Card } from './Card';
import { cn } from '../lib/utils';

export interface FilterSectionProps {
  /** Current search query */
  searchQuery: string;
  /** Callback when search changes */
  onSearchChange: (query: string) => void;
  /** Currently selected status filter */
  selectedStatus: TaskStatus | 'all';
  /** Callback when status filter changes */
  onStatusChange: (status: TaskStatus | 'all') => void;
  /** Currently selected category filter */
  selectedCategory: TaskCategory | 'all';
  /** Callback when category filter changes */
  onCategoryChange: (category: TaskCategory | 'all') => void;
  /** Additional className */
  className?: string;
}

const FilterSection = React.forwardRef<HTMLDivElement, FilterSectionProps>(
  (
    {
      searchQuery,
      onSearchChange,
      selectedStatus,
      onStatusChange,
      selectedCategory,
      onCategoryChange,
      className,
    },
    ref
  ) => {
    const handleClearSearch = React.useCallback(() => {
      onSearchChange('');
    }, [onSearchChange]);

    return (
      <Card
        ref={ref}
        className={cn('space-y-4', className)}
        disableAnimation
        role="search"
        aria-label="Filter tasks"
      >
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          onClear={handleClearSearch}
          placeholder="Search tasks by title or description..."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="status-filter">Status</Label>
            <Select
              id="status-filter"
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value as TaskStatus | 'all')}
              aria-label="Filter by status"
            >
              <SelectOption value="all">All Statuses</SelectOption>
              <SelectOption value="todo">To-do</SelectOption>
              <SelectOption value="in-progress">In Progress</SelectOption>
              <SelectOption value="done">Done</SelectOption>
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
              <SelectOption value="all">All Categories</SelectOption>
              <SelectOption value="work">Work</SelectOption>
              <SelectOption value="personal">Personal</SelectOption>
              <SelectOption value="shopping">Shopping</SelectOption>
              <SelectOption value="health">Health</SelectOption>
              <SelectOption value="other">Other</SelectOption>
            </Select>
          </div>
        </div>
      </Card>
    );
  }
);

FilterSection.displayName = 'FilterSection';

export { FilterSection };
