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
      const matchesSearch = searchTerm === '' || 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPriority = !priorityFilter || task.priority === priorityFilter;
      const matchesStatus = !statusFilter || task.status === statusFilter;
      
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
