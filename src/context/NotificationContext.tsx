import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Clock, AlertTriangle, Trash2, Bell } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export type NotificationType = 'task_due' | 'task_completed' | 'reminder' | 'system';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: Date;
  taskId?: string;
}

interface NotificationContextValue {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

const iconMap = {
  task_due: Clock,
  task_completed: CheckCircle,
  reminder: Bell,
  system: AlertTriangle,
};

const colorMap = {
  task_due: 'text-orange-500 bg-orange-100 dark:bg-orange-900/30',
  task_completed: 'text-green-500 bg-green-100 dark:bg-green-900/30',
  reminder: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30',
  system: 'text-amber-500 bg-amber-100 dark:bg-amber-900/30',
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Task Due Soon',
      message: 'Complete project proposal is due tomorrow',
      type: 'task_due',
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    },
    {
      id: '2',
      title: 'Welcome to TaskFlow!',
      message: 'Get started by creating your first task',
      type: 'system',
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const addNotification = useCallback(
    (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
      const newNotification: Notification = {
        ...notification,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        read: false,
        createdAt: new Date(),
      };
      setNotifications((prev) => [newNotification, ...prev]);
    },
    []
  );

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextValue => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

// Notification Dropdown Component
interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  isOpen,
  onClose,
}) => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, clearAll } =
    useNotifications();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={onClose}
          />
          {/* Dropdown */}
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="absolute right-0 top-full mt-2 w-80 sm:w-96 max-h-[70vh] overflow-hidden bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-xl z-50 origin-top-right"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-neutral-900 dark:text-white">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline px-2 py-1"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                >
                  <X size={16} className="text-neutral-500" />
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto max-h-[50vh]">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-neutral-500 dark:text-neutral-400">
                  <Bell size={32} className="mb-2 opacity-50" />
                  <p className="text-sm">No notifications</p>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {notifications.map((notification) => {
                    const Icon = iconMap[notification.type];
                    return (
                      <motion.div
                        key={notification.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, height: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => markAsRead(notification.id)}
                        className={`flex gap-3 px-4 py-3 border-b border-neutral-100 dark:border-neutral-700/50 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors ${
                          !notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                        }`}
                      >
                        <div
                          className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${colorMap[notification.type]}`}
                        >
                          <Icon size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p
                              className={`text-sm font-medium truncate ${
                                !notification.read
                                  ? 'text-neutral-900 dark:text-white'
                                  : 'text-neutral-700 dark:text-neutral-300'
                              }`}
                            >
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <span className="flex-shrink-0 w-2 h-2 mt-1.5 rounded-full bg-blue-500" />
                            )}
                          </div>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-0.5">
                            {notification.message}
                          </p>
                          <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
                            {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification(notification.id);
                          }}
                          className="flex-shrink-0 p-1 opacity-0 group-hover:opacity-100 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded transition-all"
                        >
                          <Trash2 size={14} className="text-neutral-400" />
                        </button>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="px-4 py-2 border-t border-neutral-200 dark:border-neutral-700">
                <button
                  onClick={clearAll}
                  className="w-full text-center text-sm text-neutral-500 dark:text-neutral-400 hover:text-red-500 dark:hover:text-red-400 py-1 transition-colors"
                >
                  Clear all notifications
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
