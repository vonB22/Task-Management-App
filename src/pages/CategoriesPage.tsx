import React from 'react';
import { Card } from '../components/Card';

interface CategoryCount {
  name: string;
  count: number;
  color: string;
}

export const CategoriesPage: React.FC = () => {
  const categories: CategoryCount[] = [
    { name: 'Work', count: 8, color: 'purple' },
    { name: 'Personal', count: 5, color: 'pink' },
    { name: 'Shopping', count: 3, color: 'orange' },
    { name: 'Health', count: 2, color: 'green' },
    { name: 'Other', count: 1, color: 'neutral' },
  ];

  const colorMap: { [key: string]: string } = {
    purple: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300',
    pink: 'bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300',
    orange: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300',
    green: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
    neutral: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300',
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">Categories</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.name}>
            <div className="space-y-4">
              <div className={`inline-block px-4 py-2 rounded-lg ${colorMap[category.color]} transition-colors duration-200`}>
                {category.name}
              </div>
              <div className="pt-2">
                <p className="text-neutral-500 dark:text-neutral-400 text-sm">Total Tasks</p>
                <p className="text-3xl font-bold text-neutral-900 dark:text-white">{category.count}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
