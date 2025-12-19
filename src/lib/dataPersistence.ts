/**
 * Enhanced Data Persistence Manager
 * Handles localStorage with versioning, validation, backup, and export/import
 */

export interface StorageData {
  version: number;
  timestamp: Date;
  data: any;
}

export interface ExportData {
  version: number;
  exportDate: string;
  taskCount: number;
  categoryCount: number;
  tasks: any[];
  categories: any[];
  settings: any;
}

class DataPersistenceManager {
  private readonly STORAGE_VERSION = 1;
  private readonly BACKUP_KEY_PREFIX = 'taskapp_backup_';
  private readonly MAX_BACKUPS = 5;

  /**
   * Get storage usage percentage
   */
  getStorageUsage(): number {
    try {
      let total = 0;
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          total += localStorage[key].length + key.length;
        }
      }
      
      // Approximate localStorage limit (5MB = 5 * 1024 * 1024)
      const limit = 5 * 1024 * 1024;
      return (total / limit) * 100;
    } catch {
      return 0;
    }
  }

  /**
   * Check if storage quota is near limit
   */
  isStorageNearLimit(): boolean {
    return this.getStorageUsage() > 80;
  }

  /**
   * Validate data structure
   */
  private validateData(data: any): boolean {
    try {
      // Basic validation - can be extended
      return data !== null && typeof data === 'object';
    } catch {
      return false;
    }
  }

  /**
   * Save data with versioning
   */
  save<T>(key: string, data: T): boolean {
    try {
      const storageData: StorageData = {
        version: this.STORAGE_VERSION,
        timestamp: new Date(),
        data,
      };

      const serialized = JSON.stringify(storageData);
      localStorage.setItem(key, serialized);
      
      // Create backup
      this.createBackup(key, serialized);
      
      return true;
    } catch (error) {
      console.error('Failed to save data:', error);
      return false;
    }
  }

  /**
   * Load data with validation
   */
  load<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      
      if (!item) {
        return defaultValue;
      }

      const parsed: StorageData = JSON.parse(item);

      // Validate structure
      if (!this.validateData(parsed.data)) {
        console.warn('Invalid data structure, using default');
        return defaultValue;
      }

      // Handle version migration if needed
      if (parsed.version !== this.STORAGE_VERSION) {
        console.log('Migrating data from version', parsed.version, 'to', this.STORAGE_VERSION);
        // Add migration logic here
      }

      return parsed.data as T;
    } catch (error) {
      console.error('Failed to load data:', error);
      
      // Try to restore from backup
      const backup = this.restoreFromBackup(key);
      if (backup) {
        console.log('Restored from backup');
        return backup as T;
      }
      
      return defaultValue;
    }
  }

  /**
   * Create backup of data
   */
  private createBackup(key: string, data: string): void {
    try {
      const backupKey = `${this.BACKUP_KEY_PREFIX}${key}_${Date.now()}`;
      localStorage.setItem(backupKey, data);

      // Clean old backups
      this.cleanOldBackups(key);
    } catch (error) {
      console.error('Failed to create backup:', error);
    }
  }

  /**
   * Clean old backups keeping only MAX_BACKUPS
   */
  private cleanOldBackups(key: string): void {
    try {
      const backups: { key: string; timestamp: number }[] = [];

      for (let i = 0; i < localStorage.length; i++) {
        const storageKey = localStorage.key(i);
        if (storageKey?.startsWith(`${this.BACKUP_KEY_PREFIX}${key}_`)) {
          const timestamp = parseInt(storageKey.split('_').pop() || '0');
          backups.push({ key: storageKey, timestamp });
        }
      }

      // Sort by timestamp descending
      backups.sort((a, b) => b.timestamp - a.timestamp);

      // Remove old backups
      for (let i = this.MAX_BACKUPS; i < backups.length; i++) {
        localStorage.removeItem(backups[i].key);
      }
    } catch (error) {
      console.error('Failed to clean old backups:', error);
    }
  }

  /**
   * Restore from most recent backup
   */
  private restoreFromBackup(key: string): any {
    try {
      const backups: { key: string; timestamp: number }[] = [];

      for (let i = 0; i < localStorage.length; i++) {
        const storageKey = localStorage.key(i);
        if (storageKey?.startsWith(`${this.BACKUP_KEY_PREFIX}${key}_`)) {
          const timestamp = parseInt(storageKey.split('_').pop() || '0');
          backups.push({ key: storageKey, timestamp });
        }
      }

      if (backups.length === 0) return null;

      // Sort by timestamp descending and get most recent
      backups.sort((a, b) => b.timestamp - a.timestamp);
      const mostRecent = localStorage.getItem(backups[0].key);

      if (!mostRecent) return null;

      const parsed: StorageData = JSON.parse(mostRecent);
      return parsed.data;
    } catch (error) {
      console.error('Failed to restore from backup:', error);
      return null;
    }
  }

  /**
   * Export all data to JSON file
   */
  exportData(): ExportData {
    const tasks = this.load('tasks', []);
    const categories = this.load('task_categories', []);
    const settings = this.load('taskapp_settings', {});

    return {
      version: this.STORAGE_VERSION,
      exportDate: new Date().toISOString(),
      taskCount: tasks.length,
      categoryCount: categories.length,
      tasks,
      categories,
      settings,
    };
  }

  /**
   * Download export data as JSON file
   */
  downloadExport(): void {
    try {
      const data = this.exportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `taskapp_export_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download export:', error);
      throw new Error('Export failed');
    }
  }

  /**
   * Import data from JSON
   */
  importData(data: ExportData, merge: boolean = false): boolean {
    try {
      // Validate import data
      if (!data.version || !data.tasks || !data.categories) {
        throw new Error('Invalid import data structure');
      }

      if (merge) {
        // Merge with existing data
        const existingTasks = this.load('tasks', []);
        const existingCategories = this.load('task_categories', []);

        this.save('tasks', [...existingTasks, ...data.tasks]);
        this.save('task_categories', [...existingCategories, ...data.categories]);
      } else {
        // Replace existing data
        this.save('tasks', data.tasks);
        this.save('task_categories', data.categories);
        if (data.settings) {
          this.save('taskapp_settings', data.settings);
        }
      }

      return true;
    } catch (error) {
      console.error('Failed to import data:', error);
      return false;
    }
  }

  /**
   * Clear all app data
   */
  clearAllData(): void {
    const keys = ['tasks', 'task_categories', 'taskapp_settings'];
    keys.forEach(key => {
      localStorage.removeItem(key);
      // Also clear backups
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const storageKey = localStorage.key(i);
        if (storageKey?.startsWith(`${this.BACKUP_KEY_PREFIX}${key}_`)) {
          localStorage.removeItem(storageKey);
        }
      }
    });
  }
}

// Singleton instance
export const dataPersistence = new DataPersistenceManager();
