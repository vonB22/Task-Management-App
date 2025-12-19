// Role-Based Access Control (RBAC) Configuration

export const ROLES = {
  ADMIN: 'Admin',
  MANAGER: 'Manager',
  TEAM_MEMBER: 'TeamMember',
  VIEWER: 'Viewer'
};

export const PERMISSIONS = {
  // Task Permissions
  CREATE_TASK: 'create_task',
  EDIT_OWN_TASK: 'edit_own_task',
  EDIT_ALL_TASKS: 'edit_all_tasks',
  DELETE_OWN_TASK: 'delete_own_task',
  DELETE_ALL_TASKS: 'delete_all_tasks',
  VIEW_OWN_TASKS: 'view_own_tasks',
  VIEW_ASSIGNED_TASKS: 'view_assigned_tasks',
  VIEW_ALL_TASKS: 'view_all_tasks',
  
  // Assignment Permissions
  ASSIGN_TASKS: 'assign_tasks',
  REASSIGN_TASKS: 'reassign_tasks',
  
  // User Management
  MANAGE_USERS: 'manage_users',
  EDIT_TEAM_MEMBERS: 'edit_team_members',
  
  // Analytics and Reports
  VIEW_ANALYTICS: 'view_analytics',
  VIEW_FULL_ANALYTICS: 'view_full_analytics',
  
  // Export
  EXPORT_OWN_TASKS: 'export_own_tasks',
  EXPORT_ALL_TASKS: 'export_all_tasks',
  
  // System
  MANAGE_SETTINGS: 'manage_settings',
  VIEW_ADMIN_PANEL: 'view_admin_panel'
};

// Permission Matrix - defines what each role can do
export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    // All permissions
    PERMISSIONS.CREATE_TASK,
    PERMISSIONS.EDIT_OWN_TASK,
    PERMISSIONS.EDIT_ALL_TASKS,
    PERMISSIONS.DELETE_OWN_TASK,
    PERMISSIONS.DELETE_ALL_TASKS,
    PERMISSIONS.VIEW_OWN_TASKS,
    PERMISSIONS.VIEW_ASSIGNED_TASKS,
    PERMISSIONS.VIEW_ALL_TASKS,
    PERMISSIONS.ASSIGN_TASKS,
    PERMISSIONS.REASSIGN_TASKS,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.EDIT_TEAM_MEMBERS,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.VIEW_FULL_ANALYTICS,
    PERMISSIONS.EXPORT_OWN_TASKS,
    PERMISSIONS.EXPORT_ALL_TASKS,
    PERMISSIONS.MANAGE_SETTINGS,
    PERMISSIONS.VIEW_ADMIN_PANEL
  ],
  
  [ROLES.MANAGER]: [
    PERMISSIONS.CREATE_TASK,
    PERMISSIONS.EDIT_OWN_TASK,
    PERMISSIONS.EDIT_ALL_TASKS,
    PERMISSIONS.DELETE_OWN_TASK,
    PERMISSIONS.DELETE_ALL_TASKS,
    PERMISSIONS.VIEW_OWN_TASKS,
    PERMISSIONS.VIEW_ASSIGNED_TASKS,
    PERMISSIONS.VIEW_ALL_TASKS,
    PERMISSIONS.ASSIGN_TASKS,
    PERMISSIONS.REASSIGN_TASKS,
    PERMISSIONS.EDIT_TEAM_MEMBERS,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.VIEW_FULL_ANALYTICS,
    PERMISSIONS.EXPORT_OWN_TASKS,
    PERMISSIONS.EXPORT_ALL_TASKS
  ],
  
  [ROLES.TEAM_MEMBER]: [
    PERMISSIONS.CREATE_TASK,
    PERMISSIONS.EDIT_OWN_TASK,
    PERMISSIONS.DELETE_OWN_TASK,
    PERMISSIONS.VIEW_OWN_TASKS,
    PERMISSIONS.VIEW_ASSIGNED_TASKS,
    PERMISSIONS.VIEW_ANALYTICS, // Limited
    PERMISSIONS.EXPORT_OWN_TASKS
  ],
  
  [ROLES.VIEWER]: [
    PERMISSIONS.VIEW_ASSIGNED_TASKS
  ]
};

// Helper function to check if a role has a specific permission
export const hasPermission = (role, permission) => {
  if (!role || !permission) return false;
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
};

// Helper function to check if a role can perform an action on a resource
export const canPerformAction = (userRole, action, resource = {}, userId = null) => {
  // Check if user has general permission
  if (!hasPermission(userRole, action)) {
    return false;
  }
  
  // For "own" permissions, check if resource belongs to user
  if (action === PERMISSIONS.EDIT_OWN_TASK || 
      action === PERMISSIONS.DELETE_OWN_TASK) {
    if (!resource || !userId) return false;
    return resource.createdBy === userId || resource.assignedTo === userId;
  }
  
  return true;
};

// Get all permissions for a role
export const getRolePermissions = (role) => {
  return ROLE_PERMISSIONS[role] || [];
};

// Check if role has admin privileges
export const isAdmin = (role) => {
  return role === ROLES.ADMIN;
};

// Check if role has manager or higher privileges
export const isManagerOrHigher = (role) => {
  return role === ROLES.ADMIN || role === ROLES.MANAGER;
};

// Get visible menu items based on role
export const getVisibleMenuItems = (role) => {
  const allMenuItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: 'dashboard', roles: ['all'] },
    { id: 'my-tasks', label: 'Tasks', path: '/tasks', icon: 'tasks', roles: ['all'] },
    { id: 'analytics', label: 'Analytics', path: '/analytics', icon: 'chart', roles: ['all'] },
    { id: 'settings', label: 'Settings', path: '/settings', icon: 'settings', roles: ['all'] },
    { id: 'profile', label: 'Profile', path: '/profile', icon: 'user', roles: ['all'] },
    { id: 'admin', label: 'Admin Panel', path: '/admin', icon: 'admin', roles: [ROLES.ADMIN] }
  ];
  
  return allMenuItems.filter(item => 
    item.roles.includes('all') || item.roles.includes(role)
  );
};

export default {
  ROLES,
  PERMISSIONS,
  ROLE_PERMISSIONS,
  hasPermission,
  canPerformAction,
  getRolePermissions,
  isAdmin,
  isManagerOrHigher,
  getVisibleMenuItems
};
