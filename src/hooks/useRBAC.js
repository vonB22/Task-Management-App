import { useAuth } from '../contexts/AuthContext';
import { hasPermission, canPerformAction, PERMISSIONS } from '../config/permissions';

/**
 * Custom hook for Role-Based Access Control
 * @returns {object} RBAC utilities
 */
export const useRBAC = () => {
  const { user } = useAuth();
  
  // Check if current user has a specific permission
  const checkPermission = (permission) => {
    if (!user || !user.role) return false;
    return hasPermission(user.role, permission);
  };
  
  // Check if user can perform action on a resource
  const canPerform = (action, resource = {}) => {
    if (!user || !user.role) return false;
    return canPerformAction(user.role, action, resource, user.id);
  };
  
  // Check if user can create tasks
  const canCreateTask = () => {
    return checkPermission(PERMISSIONS.CREATE_TASK);
  };
  
  // Check if user can edit a specific task
  const canEditTask = (task) => {
    if (!task) return false;
    
    // Can edit all tasks?
    if (checkPermission(PERMISSIONS.EDIT_ALL_TASKS)) {
      return true;
    }
    
    // Can edit own task?
    if (checkPermission(PERMISSIONS.EDIT_OWN_TASK)) {
      return task.createdBy === user.id || task.assignedTo === user.id;
    }
    
    return false;
  };
  
  // Check if user can delete a specific task
  const canDeleteTask = (task) => {
    if (!task) return false;
    
    // Can delete all tasks?
    if (checkPermission(PERMISSIONS.DELETE_ALL_TASKS)) {
      return true;
    }
    
    // Can delete own task?
    if (checkPermission(PERMISSIONS.DELETE_OWN_TASK)) {
      return task.createdBy === user.id;
    }
    
    return false;
  };
  
  // Check if user can view a specific task
  const canViewTask = (task) => {
    if (!task) return false;
    
    // Can view all tasks?
    if (checkPermission(PERMISSIONS.VIEW_ALL_TASKS)) {
      return true;
    }
    
    // Can view assigned tasks?
    if (checkPermission(PERMISSIONS.VIEW_ASSIGNED_TASKS)) {
      return task.assignedTo === user.id || task.createdBy === user.id;
    }
    
    // Can view own tasks?
    if (checkPermission(PERMISSIONS.VIEW_OWN_TASKS)) {
      return task.createdBy === user.id;
    }
    
    return false;
  };
  
  // Check if user can assign tasks
  const canAssignTasks = () => {
    return checkPermission(PERMISSIONS.ASSIGN_TASKS);
  };
  
  // Check if user can manage users
  const canManageUsers = () => {
    return checkPermission(PERMISSIONS.MANAGE_USERS);
  };
  
  // Check if user can view analytics
  const canViewAnalytics = () => {
    return checkPermission(PERMISSIONS.VIEW_ANALYTICS);
  };
  
  // Check if user can export tasks
  const canExportTasks = (allTasks = false) => {
    if (allTasks) {
      return checkPermission(PERMISSIONS.EXPORT_ALL_TASKS);
    }
    return checkPermission(PERMISSIONS.EXPORT_OWN_TASKS);
  };
  
  // Check if user can access admin panel
  const canAccessAdminPanel = () => {
    return checkPermission(PERMISSIONS.VIEW_ADMIN_PANEL);
  };
  
  // Filter tasks based on user permissions
  const filterTasks = (tasks) => {
    if (!tasks || !Array.isArray(tasks)) return [];
    
    if (checkPermission(PERMISSIONS.VIEW_ALL_TASKS)) {
      return tasks;
    }
    
    if (checkPermission(PERMISSIONS.VIEW_ASSIGNED_TASKS)) {
      return tasks.filter(task => 
        task.assignedTo === user.id || task.createdBy === user.id
      );
    }
    
    if (checkPermission(PERMISSIONS.VIEW_OWN_TASKS)) {
      return tasks.filter(task => task.createdBy === user.id);
    }
    
    return [];
  };
  
  // Get user role display name
  const getRoleDisplay = () => {
    if (!user || !user.role) return 'Guest';
    return user.role;
  };
  
  // Check if user has elevated permissions (Manager or Admin)
  const hasElevatedPermissions = () => {
    return checkPermission(PERMISSIONS.VIEW_ALL_TASKS);
  };
  
  return {
    user,
    checkPermission,
    canPerform,
    canCreateTask,
    canEditTask,
    canDeleteTask,
    canViewTask,
    canAssignTasks,
    canManageUsers,
    canViewAnalytics,
    canExportTasks,
    canAccessAdminPanel,
    filterTasks,
    getRoleDisplay,
    hasElevatedPermissions,
    PERMISSIONS
  };
};

export default useRBAC;
