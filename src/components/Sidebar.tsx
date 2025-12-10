import React from 'react';
import { CheckSquare2, Grid2x2, Settings } from 'lucide-react';
import type { TabType } from '../routes';

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'tasks', label: 'Tasks', icon: CheckSquare2 },
    { id: 'categories', label: 'Categories', icon: Grid2x2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-neutral-50 dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors duration-200">
      <div className="space-y-2">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id as 'tasks' | 'categories' | 'settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === id
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <Icon size={20} />
            {label}
          </button>
        ))}
      </div>
    </aside>
  );
};
