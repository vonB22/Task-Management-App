export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type TaskCategory = 'work' | 'personal' | 'shopping' | 'health' | 'other';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}
