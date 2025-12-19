import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

// Notification types
export const NOTIFICATION_TYPES = {
  TASK_ASSIGNED: 'task_assigned',
  DUE_DATE_REMINDER: 'due_date_reminder',
  STATUS_CHANGE: 'status_change',
  TEAM_ACTIVITY: 'team_activity',
  SYSTEM: 'system_notification',
  COMMENT_MENTION: 'comment_mention'
};

// Notification priorities
export const NOTIFICATION_PRIORITIES = {
  URGENT: 'urgent',
  NORMAL: 'normal',
  LOW: 'low'
};

const DEFAULT_PREFERENCES = {
  [NOTIFICATION_TYPES.TASK_ASSIGNED]: true,
  [NOTIFICATION_TYPES.DUE_DATE_REMINDER]: true,
  [NOTIFICATION_TYPES.STATUS_CHANGE]: true,
  [NOTIFICATION_TYPES.TEAM_ACTIVITY]: true,
  [NOTIFICATION_TYPES.SYSTEM]: true,
  [NOTIFICATION_TYPES.COMMENT_MENTION]: true,
  sound: true,
  frequency: 'immediate',
  doNotDisturb: false
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useLocalStorage('notifications', []);
  const [preferences, setPreferences] = useLocalStorage('notification_preferences', DEFAULT_PREFERENCES);
  const [toasts, setToasts] = useState([]);

  // Calculate unread count
  const unreadCount = notifications.filter(n => !n.read).length;

  // Generate notification ID
  const generateNotificationId = () => {
    return `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  // Add a new notification
  const addNotification = useCallback((notification) => {
    const newNotification = {
      id: generateNotificationId(),
      ...notification,
      read: false,
      createdAt: new Date().toISOString()
    };

    // Check if notification type is enabled
    if (!preferences[notification.type] || preferences.doNotDisturb) {
      return null;
    }

    // Add to notification history
    setNotifications(prev => [newNotification, ...prev].slice(0, 100)); // Keep last 100

    // Show as toast
    showToast(newNotification);

    // Play sound if enabled
    if (preferences.sound) {
      playNotificationSound();
    }

    return newNotification.id;
  }, [preferences, setNotifications]);

  // Show toast notification
  const showToast = (notification) => {
    const toastId = notification.id || Date.now();
    setToasts(prev => [...prev, { ...notification, id: toastId }]);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      removeToast(toastId);
    }, 5000);
  };

  // Remove toast
  const removeToast = (toastId) => {
    setToasts(prev => prev.filter(t => t.id !== toastId));
  };

  // Mark notification as read
  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Delete notification
  const deleteNotification = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Update preferences
  const updatePreferences = (newPreferences) => {
    setPreferences(prev => ({
      ...prev,
      ...newPreferences
    }));
  };

  // Toggle notification type
  const toggleNotificationType = (type) => {
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  // Play notification sound
  const playNotificationSound = () => {
    // Simple beep sound (you can replace with a custom sound file)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    gainNode.gain.value = 0.1;
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  // Get notifications by type
  const getNotificationsByType = (type) => {
    return notifications.filter(n => n.type === type);
  };

  // Get unread notifications
  const getUnreadNotifications = () => {
    return notifications.filter(n => !n.read);
  };

  const value = {
    notifications,
    preferences,
    unreadCount,
    toasts,
    addNotification,
    showToast,
    removeToast,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    updatePreferences,
    toggleNotificationType,
    getNotificationsByType,
    getUnreadNotifications,
    NOTIFICATION_TYPES,
    NOTIFICATION_PRIORITIES
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
