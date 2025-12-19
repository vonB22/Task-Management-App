import { useState, useCallback } from 'react';

/**
 * Custom hook for filter functionality
 * @returns {object} Filter state and methods
 */
export const useFilter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setPriorityFilter(null);
    setStatusFilter(null);
  }, []);

  // Check if any filters are active
  const hasActiveFilters = searchTerm !== '' || priorityFilter !== null || statusFilter !== null;

  // Filter tasks based on current filters
  const filterTasks = useCallback((tasks) => {
    return tasks.filter(task => {
      // Search filter - handle undefined description
      const matchesSearch = searchTerm === '' || 
        task.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Priority filter - handle case variations (low, Low, medium, Medium, high, High)
      const matchesPriority = !priorityFilter || 
        task.priority?.toLowerCase() === priorityFilter.toLowerCase();
      
      // Status filter - handle case variations and different formats
      const matchesStatus = !statusFilter || 
        task.status === statusFilter ||
        task.status?.toLowerCase() === statusFilter.toLowerCase() ||
        (statusFilter === 'todo' && (task.status === 'Backlog' || task.status === 'backlog')) ||
        (statusFilter === 'inProgress' && task.status === 'In Progress') ||
        (statusFilter === 'done' && task.status === 'Done');
      
      return matchesSearch && matchesPriority && matchesStatus;
    });
  }, [searchTerm, priorityFilter, statusFilter]);

  return {
    searchTerm,
    setSearchTerm,
    priorityFilter,
    setPriorityFilter,
    statusFilter,
    setStatusFilter,
    clearFilters,
    hasActiveFilters,
    filterTasks
  };
};

export default useFilter;
