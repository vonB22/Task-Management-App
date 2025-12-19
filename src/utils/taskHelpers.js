// Task helper functions

/**
 * Generate a unique ID for tasks
 * @returns {string} Unique task ID
 */
export const generateTaskId = () => {
  return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Get color classes based on priority
 * @param {string} priority - Task priority (High, Medium, Low)
 * @returns {object} Object with background and text color classes
 */
export const getPriorityColor = (priority) => {
  const colors = {
    High: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      border: 'border-red-500',
      badge: 'bg-red-500'
    },
    Medium: {
      bg: 'bg-orange-100',
      text: 'text-orange-800',
      border: 'border-orange-500',
      badge: 'bg-orange-500'
    },
    Low: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-500',
      badge: 'bg-green-500'
    }
  };
  return colors[priority] || colors.Medium;
};

/**
 * Get color classes based on status
 * @param {string} status - Task status (Backlog, In Progress, Done)
 * @returns {string} Background color class
 */
export const getStatusColor = (status) => {
  const colors = {
    'Backlog': 'bg-gray-100',
    'In Progress': 'bg-blue-100',
    'Done': 'bg-green-100'
  };
  return colors[status] || colors.Backlog;
};

/**
 * Filter tasks based on search term and filters
 * @param {Array} tasks - Array of tasks
 * @param {string} searchTerm - Search term for title/description
 * @param {object} filters - Filter object with priority and status
 * @returns {Array} Filtered tasks
 */
export const filterTasks = (tasks, searchTerm, filters) => {
  return tasks.filter(task => {
    const matchesSearch = searchTerm === '' || 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPriority = !filters.priority || task.priority === filters.priority;
    const matchesStatus = !filters.status || task.status === filters.status;
    
    return matchesSearch && matchesPriority && matchesStatus;
  });
};

/**
 * Group tasks by status
 * @param {Array} tasks - Array of tasks
 * @returns {object} Object with tasks grouped by status
 */
export const groupTasksByStatus = (tasks) => {
  return {
    'Backlog': tasks.filter(task => task.status === 'Backlog'),
    'In Progress': tasks.filter(task => task.status === 'In Progress'),
    'Done': tasks.filter(task => task.status === 'Done')
  };
};

/**
 * Validate task data
 * @param {object} task - Task object to validate
 * @returns {object} Validation result with isValid and errors
 */
export const validateTask = (task) => {
  const errors = [];
  
  if (!task.title || task.title.trim() === '') {
    errors.push('Title is required');
  }
  
  if (task.title && task.title.length > 100) {
    errors.push('Title must be less than 100 characters');
  }
  
  if (task.description && task.description.length > 500) {
    errors.push('Description must be less than 500 characters');
  }
  
  const validPriorities = ['High', 'Medium', 'Low'];
  if (task.priority && !validPriorities.includes(task.priority)) {
    errors.push('Invalid priority level');
  }
  
  const validStatuses = ['Backlog', 'In Progress', 'Done'];
  if (task.status && !validStatuses.includes(task.status)) {
    errors.push('Invalid status');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Sanitize user input to prevent XSS
 * @param {string} input - User input string
 * @returns {string} Sanitized string
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Sort tasks by creation date
 * @param {Array} tasks - Array of tasks
 * @param {boolean} ascending - Sort order
 * @returns {Array} Sorted tasks
 */
export const sortTasksByDate = (tasks, ascending = false) => {
  return [...tasks].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

/**
 * Get task statistics
 * @param {Array} tasks - Array of tasks
 * @returns {object} Statistics object
 */
export const getTaskStats = (tasks) => {
  return {
    total: tasks.length,
    byStatus: {
      backlog: tasks.filter(t => t.status === 'Backlog').length,
      inProgress: tasks.filter(t => t.status === 'In Progress').length,
      done: tasks.filter(t => t.status === 'Done').length
    },
    byPriority: {
      high: tasks.filter(t => t.priority === 'High').length,
      medium: tasks.filter(t => t.priority === 'Medium').length,
      low: tasks.filter(t => t.priority === 'Low').length
    }
  };
};
