import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Default user roles
export const ROLES = {
  ADMIN: 'Admin',
  MANAGER: 'Manager',
  TEAM_MEMBER: 'TeamMember',
  VIEWER: 'Viewer'
};

// Default user for demo
const DEFAULT_USER = {
  id: 'user_default',
  name: 'Demo User',
  email: 'demo@taskflow.com',
  role: ROLES.TEAM_MEMBER,
  avatar: null,
  bio: 'Welcome to TaskFlow Pro!',
  preferences: {
    theme: 'warm',
    notificationSound: true,
    doNotDisturb: false,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h'
  },
  createdAt: new Date().toISOString()
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', DEFAULT_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Save current user ID for task creation
  useEffect(() => {
    if (user?.id) {
      localStorage.setItem('taskflow_current_user_id', user.id);
    }
  }, [user]);

  // Login function (simplified for frontend-only)
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    return Promise.resolve(userData);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('taskflow_current_user_id');
  };

  // Update user profile
  const updateProfile = (updates) => {
    setUser(prev => ({
      ...prev,
      ...updates,
      updatedAt: new Date().toISOString()
    }));
  };

  // Update user preferences
  const updatePreferences = (preferences) => {
    setUser(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        ...preferences
      }
    }));
  };

  // Change user role (Admin only feature)
  const changeRole = (newRole) => {
    if (Object.values(ROLES).includes(newRole)) {
      setUser(prev => ({
        ...prev,
        role: newRole,
        updatedAt: new Date().toISOString()
      }));
    }
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return 'U';
    const names = user.name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    updateProfile,
    updatePreferences,
    changeRole,
    hasRole,
    getUserInitials,
    ROLES
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
