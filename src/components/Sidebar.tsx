import React from 'react';
import { CheckSquare2, Grid2x2, Settings, ChevronLeft, type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import type { TabType } from '../routes';
import { slideInFromLeftVariants, containerVariants, itemVariants } from '../lib/animations';

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  className?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

interface NavItem {
  id: TabType;
  label: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { id: 'tasks', label: 'Tasks', icon: CheckSquare2 },
  { id: 'categories', label: 'Categories', icon: Grid2x2 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const Sidebar = React.memo(
  React.forwardRef<HTMLElement, SidebarProps>(
    ({ activeTab, onTabChange, className = '', isCollapsed = false, onToggleCollapse }, ref) => {
      return (
        <motion.aside
          ref={ref}
          className={`shrink-0 bg-neutral-50 dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 transition-all duration-300 hidden lg:flex flex-col ${className}`.trim()}
          role="navigation"
          aria-label="Sidebar navigation"
          variants={slideInFromLeftVariants}
          initial="hidden"
          animate="visible"
          style={{ width: isCollapsed ? 72 : 256 }}
        >
          {/* Collapse Toggle Button */}
          <div className="flex justify-end p-2 border-b border-neutral-200 dark:border-neutral-800">
            <motion.button
              type="button"
              onClick={onToggleCollapse}
              className="p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors duration-150"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: isCollapsed ? 180 : 0 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              >
                <ChevronLeft size={18} className="text-neutral-600 dark:text-neutral-400" />
              </motion.div>
            </motion.button>
          </div>

          <motion.nav
            className={`p-3 space-y-1 flex-1 ${isCollapsed ? 'px-2' : 'p-4'}`}
            role="tablist"
            aria-label="Main sections"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {navItems.map(({ id, label, icon: Icon }) => {
              const isActive = activeTab === id;
              return (
                <motion.button
                  key={id}
                  type="button"
                  role="tab"
                  id={`${id}-tab`}
                  {...(isActive && { 'aria-selected': 'true' })}
                  aria-controls={`${id}-panel`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => onTabChange(id)}
                  onKeyDown={(e) => {
                    const currentIndex = navItems.findIndex((item) => item.id === id);
                    if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      const nextIndex = (currentIndex + 1) % navItems.length;
                      onTabChange(navItems[nextIndex].id);
                    } else if (e.key === 'ArrowUp') {
                      e.preventDefault();
                      const prevIndex = (currentIndex - 1 + navItems.length) % navItems.length;
                      onTabChange(navItems[prevIndex].id);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset ${
                    isActive
                      ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  } ${isCollapsed ? 'justify-center px-2' : ''}`.trim()}
                  title={isCollapsed ? label : undefined}
                  variants={itemVariants}
                  whileHover={{ x: isCollapsed ? 0 : 4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <Icon size={20} aria-hidden="true" />
                  {!isCollapsed && <span className="truncate">{label}</span>}
                </motion.button>
              );
            })}
          </motion.nav>
        </motion.aside>
      );
    }
  )
);

Sidebar.displayName = 'Sidebar';

export { Sidebar };
