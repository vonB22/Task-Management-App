import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, FolderOpen, Settings } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Layout } from './components/Layout';
import { QuickAdd } from './components/QuickAdd';
import { AuthModal } from './components/AuthModal';
import { LoginPrompt } from './components/LoginPrompt';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider, useToast } from './context/ToastContext';
import { NotificationProvider, useNotifications } from './context/NotificationContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ReducedMotionProvider } from './components/ui/motion';
import { useLocalStorage } from './hooks';
import { renderRoute } from './routes';
import type { TabType } from './routes';
import type { Task } from './types';

// Mobile dock navigation items
const mobileNavItems: { id: TabType; icon: typeof Home; label: string }[] = [
  { id: 'tasks', icon: Home, label: 'Tasks' },
  { id: 'categories', icon: FolderOpen, label: 'Categories' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

function AppContent() {
  const [activeTab, setActiveTab] = useState<TabType>('tasks');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const { success } = useToast();
  const { addNotification } = useNotifications();
  const { user, showLoginPrompt, dismissLoginPrompt, promptLogin } = useAuth();

  // Show auth modal on first visit if no user
  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        setIsAuthModalOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleQuickAdd = useCallback(
    (newTask: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'order'>) => {
      const task: Task = {
        ...newTask,
        id: Date.now().toString(),
        order: tasks.length,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setTasks((prev: Task[]) => [...prev, task]);
      success('Task created successfully');
      addNotification({
        title: 'Task Created',
        message: `"${task.title}" has been added to your tasks`,
        type: 'task_completed',
      });
      promptLogin(); // Prompt login after actions
    },
    [tasks.length, setTasks, success, addNotification, promptLogin]
  );

  const handleNavigateToSettings = useCallback(() => {
    setActiveTab('settings');
  }, []);

  const handleNavigateToProfile = useCallback(() => {
    setActiveTab('profile');
  }, []);

  return (
    <Layout>
      <Navbar 
        onQuickAdd={() => setIsQuickAddOpen(true)} 
        onNavigateToSettings={handleNavigateToSettings}
        onNavigateToProfile={handleNavigateToProfile}
      />
      <div className="flex h-[calc(100vh-73px)] pb-16 lg:pb-0">
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
        />
        <main 
          className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-neutral-50 dark:bg-neutral-950 transition-all duration-200"
          style={{ 
            marginLeft: 0,
            transition: 'margin 200ms ease-out'
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            >
              {renderRoute(activeTab)}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Quick Add Modal */}
      <QuickAdd
        isOpen={isQuickAddOpen}
        onClose={() => setIsQuickAddOpen(false)}
        onAdd={handleQuickAdd}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        allowGuest={true}
      />

      {/* Login Prompt */}
      <LoginPrompt
        isOpen={showLoginPrompt}
        onLogin={() => {
          dismissLoginPrompt();
          setIsAuthModalOpen(true);
        }}
        onDismiss={dismissLoginPrompt}
      />

      {/* Mobile Bottom Dock */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border-t border-neutral-200 dark:border-neutral-800 safe-area-inset-bottom">
        <div className="flex items-center justify-around h-16 px-2">
          {mobileNavItems.map(({ id, icon: Icon, label }) => {
            const isActive = activeTab === id;
            return (
              <motion.button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex flex-col items-center justify-center flex-1 h-full gap-0.5 rounded-lg transition-colors ${
                  isActive 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-neutral-500 dark:text-neutral-400'
                }`}
                whileTap={{ scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <motion.div
                  animate={{ 
                    scale: isActive ? 1.1 : 1,
                    y: isActive ? -2 : 0 
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <Icon size={22} />
                </motion.div>
                <span className={`text-xs font-medium ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                  {label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="mobileDockIndicator"
                    className="absolute bottom-1 w-8 h-1 rounded-full bg-blue-600 dark:bg-blue-400"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </nav>
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ReducedMotionProvider>
        <AuthProvider>
          <NotificationProvider>
            <ToastProvider>
              <AppContent />
            </ToastProvider>
          </NotificationProvider>
        </AuthProvider>
      </ReducedMotionProvider>
    </ThemeProvider>
  );
}

export default App;
