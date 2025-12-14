import type { TabType } from '../routes';
import { Sidebar } from './Sidebar';
import { AnimatePresence, motion } from 'framer-motion';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function MobileSidebar({ isOpen, onClose, activeTab, onTabChange }: MobileSidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 left-0 w-64 z-50 lg:hidden"
          >
            <Sidebar activeTab={activeTab} onTabChange={onTabChange} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
