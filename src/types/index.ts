export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type TaskCategory = 'work' | 'personal' | 'shopping' | 'health' | 'other';
export type TaskPriority = 'none' | 'low' | 'medium' | 'high';

export interface TaskAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  data: string; // base64 encoded
  uploadedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  taskCount: number;
  createdAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string; // ISO string
  notes?: string;
  attachments?: TaskAttachment[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSettings {
  version: number;
  theme: 'light' | 'dark' | 'system';
  animations: {
    enabled: boolean;
    speed: 'slow' | 'normal' | 'fast';
    pageTransitions: boolean;
    hoverEffects: boolean;
    modalAnimations: boolean;
  };
  display: {
    viewMode: 'grid' | 'list';
    compactView: boolean;
    showCompleted: boolean;
    tasksPerPage: number;
  };
}

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}
