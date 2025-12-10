import * as React from 'react';
import { CheckSquare2, Grid2x2, Settings, type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import type { TabType } from '../routes';
import { cn } from '../lib/utils';
import { slideLeftVariants, easeOutTransition, springTransition, getMotionProps } from '../lib/motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

export interface SidebarProps {
  /** Currently active tab */
  activeTab: TabType;
  /** Callback when tab changes */
  onTabChange: (tab: TabType) => void;
  /** Optional className */
  className?: string;
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

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ activeTab, onTabChange, className }, ref) => {
    const prefersReducedMotion = useReducedMotion();

    const sidebarMotionProps = getMotionProps(
      {
        variants: slideLeftVariants,
        initial: 'hidden',
        animate: 'visible',
        transition: easeOutTransition,
      },
      prefersReducedMotion
    );

    const buttonMotionProps = getMotionProps(
      {
        whileHover: { x: 4 },
        whileTap: { scale: 0.98 },
        transition: springTransition,
      },
      prefersReducedMotion
    );

    return (
      <motion.aside
        ref={ref}
        className={cn(
          'w-64 shrink-0 bg-neutral-50 dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 transition-colors duration-200',
          className
        )}
        role="navigation"
        aria-label="Sidebar navigation"
        {...sidebarMotionProps}
      >
        <nav className="p-4 space-y-1" role="tablist" aria-label="Main sections">
          {navItems.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <motion.button
                key={id}
                type="button"
                role="tab"
                id={`${id}-tab`}
                aria-selected={isActive}
                aria-controls={`${id}-panel`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => onTabChange(id)}
                onKeyDown={(e) => {
                  // Arrow key navigation
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
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset',
                  isActive
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                )}
                {...buttonMotionProps}
              >
                <Icon size={20} aria-hidden="true" />
                <span>{label}</span>
              </motion.button>
            );
          })}
        </nav>
      </motion.aside>
    );
  }
);

Sidebar.displayName = 'Sidebar';

export { Sidebar };
