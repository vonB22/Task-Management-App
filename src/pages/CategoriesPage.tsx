import React from 'react';
import { Plus, Edit2, Trash2, Folder } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { Label } from '../components/Label';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Category } from '../types';
import { FadeUp, StaggerContainer, StaggerItem } from '../components/ui/motion';

const PRESET_COLORS = [
  '#EF4444', '#F97316', '#F59E0B', '#EAB308', '#84CC16',
  '#22C55E', '#10B981', '#14B8A6', '#06B6D4', '#0EA5E9',
  '#3B82F6', '#6366F1', '#8B5CF6', '#A855F7', '#D946EF',
];

const PRESET_ICONS = ['Folder', 'Briefcase', 'Heart', 'ShoppingCart', 'Home', 'Coffee', 'Book', 'Code', 'Music', 'Camera'];

export const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useLocalStorage<Category[]>('task_categories', [
    { id: '1', name: 'Work', color: '#3B82F6', icon: 'Briefcase', taskCount: 0, createdAt: new Date() },
    { id: '2', name: 'Personal', color: '#8B5CF6', icon: 'Heart', taskCount: 0, createdAt: new Date() },
    { id: '3', name: 'Shopping', color: '#F59E0B', icon: 'ShoppingCart', taskCount: 0, createdAt: new Date() },
    { id: '4', name: 'Health', color: '#22C55E', icon: 'Heart', taskCount: 0, createdAt: new Date() },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [editingCategory, setEditingCategory] = React.useState<Category | null>(null);
  const [deleteConfirm, setDeleteConfirm] = React.useState<Category | null>(null);

  const [formData, setFormData] = React.useState({
    name: '',
    color: PRESET_COLORS[0],
    icon: PRESET_ICONS[0],
  });

  const handleAddCategory = () => {
    if (!formData.name.trim()) return;

    const newCategory: Category = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      color: formData.color,
      icon: formData.icon,
      taskCount: 0,
      createdAt: new Date(),
    };

    setCategories([...categories, newCategory]);
    setIsAddModalOpen(false);
    setFormData({ name: '', color: PRESET_COLORS[0], icon: PRESET_ICONS[0] });
  };

  const handleEditCategory = () => {
    if (!editingCategory || !formData.name.trim()) return;

    setCategories(
      categories.map((cat) =>
        cat.id === editingCategory.id
          ? { ...cat, name: formData.name.trim(), color: formData.color, icon: formData.icon }
          : cat
      )
    );
    setEditingCategory(null);
    setFormData({ name: '', color: PRESET_COLORS[0], icon: PRESET_ICONS[0] });
  };

  const handleDeleteCategory = () => {
    if (!deleteConfirm) return;

    setCategories(categories.filter((cat) => cat.id !== deleteConfirm.id));
    setDeleteConfirm(null);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      color: category.color,
      icon: category.icon,
    });
  };

  return (
    <FadeUp className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
            Categories
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Manage your task categories and organize your work
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus size={20} />
          Add Category
        </Button>
      </div>

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <StaggerItem key={category.id}>
            <motion.div
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 hover:shadow-lg transition-shadow"
              whileHover={{ y: -4 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: category.color + '20' }}
                  >
                    <Folder size={24} style={{ color: category.color }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white">
                      {category.name}
                    </h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {category.taskCount} tasks
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openEditModal(category)}
                  className="flex-1"
                >
                  <Edit2 size={16} />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDeleteConfirm(category)}
                  className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  <Trash2 size={16} />
                  Delete
                </Button>
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {categories.length === 0 && (
        <div className="text-center py-16">
          <Folder size={64} className="mx-auto text-neutral-300 dark:text-neutral-700 mb-4" />
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
            No categories yet
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Create your first category to organize your tasks
          </p>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus size={20} />
            Add Category
          </Button>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isAddModalOpen || editingCategory !== null}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingCategory(null);
          setFormData({ name: '', color: PRESET_COLORS[0], icon: PRESET_ICONS[0] });
        }}
        title={editingCategory ? 'Edit Category' : 'Add Category'}
        size="sm"
      >
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="category-name">Category Name</Label>
            <Input
              id="category-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter category name"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label>Color</Label>
            <div className="grid grid-cols-5 gap-2">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`w-full h-10 rounded-lg border-2 transition-all ${
                    formData.color === color
                      ? 'border-neutral-900 dark:border-white scale-110'
                      : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setFormData({ ...formData, color })}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3">
            <Button
              variant="secondary"
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingCategory(null);
                setFormData({ name: '', color: PRESET_COLORS[0], icon: PRESET_ICONS[0] });
              }}
              className="flex-1 order-2 sm:order-1"
            >
              Cancel
            </Button>
            <Button
              onClick={editingCategory ? handleEditCategory : handleAddCategory}
              className="flex-1 order-1 sm:order-2"
              disabled={!formData.name.trim()}
            >
              {editingCategory ? 'Update' : 'Add'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Category"
        size="sm"
      >
        <div className="space-y-3">
          <p className="text-neutral-600 dark:text-neutral-400">
            Are you sure you want to delete <strong>{deleteConfirm?.name}</strong>?
            {deleteConfirm && deleteConfirm.taskCount > 0 && (
              <span className="block mt-2 text-orange-600 dark:text-orange-400">
                Warning: This category has {deleteConfirm.taskCount} associated tasks.
              </span>
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3">
            <Button variant="secondary" onClick={() => setDeleteConfirm(null)} className="flex-1 order-2 sm:order-1">
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteCategory} className="flex-1 order-1 sm:order-2">
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </FadeUp>
  );
};
