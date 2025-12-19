import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';
import NotificationCenter from './NotificationCenter';
import { ToastContainer } from '../ui/Toast';
import { useNotifications } from '../../contexts/NotificationContext';

/**
 * Main Layout Component
 * Provides consistent layout structure for all protected pages
 */
const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { toasts, removeToast } = useNotifications();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />

      {/* Main Content Area */}
      <div 
        className={`transition-all duration-300 ${
          isSidebarOpen ? 'lg:ml-72' : 'lg:ml-20'
        }`}
      >
        {/* Header */}
        <Header 
          onToggleSidebar={toggleSidebar}
          onToggleNotifications={toggleNotifications}
          isSidebarOpen={isSidebarOpen}
        />

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      {/* Notification Center Overlay */}
      <AnimatePresence>
        {isNotificationOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={toggleNotifications}
            />
            
            {/* Notification Panel */}
            <NotificationCenter 
              isOpen={isNotificationOpen}
              onClose={toggleNotifications}
            />
          </>
        )}
      </AnimatePresence>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default Layout;
