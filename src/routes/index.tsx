import type { ReactNode } from 'react';
import { TasksPage } from '../pages/TasksPage';
import { CategoriesPage } from '../pages/CategoriesPage';
import { SettingsPage } from '../pages/SettingsPage';
import { ProfilePage } from '../pages/ProfilePage';

export type TabType = 'tasks' | 'categories' | 'settings' | 'profile';

export interface Route {
  id: TabType;
  label: string;
  component: ReactNode;
}

export const getRoutes = (): Record<TabType, ReactNode> => {
  return {
    tasks: <TasksPage />,
    categories: <CategoriesPage />,
    settings: <SettingsPage />,
    profile: <ProfilePage />,
  };
};

export const getRouteLabel = (tab: TabType): string => {
  const labels: Record<TabType, string> = {
    tasks: 'Tasks',
    categories: 'Categories',
    settings: 'Settings',
    profile: 'Profile',
  };
  return labels[tab];
};

export const renderRoute = (activeTab: TabType): ReactNode => {
  const routes = getRoutes();
  return routes[activeTab] || routes.tasks;
};
