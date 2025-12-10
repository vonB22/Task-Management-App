import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-60 flex items-center justify-center z-50 transition-colors duration-200">
      <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-2xl dark:shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-neutral-200 dark:border-neutral-800 transition-colors duration-200">
        <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};
