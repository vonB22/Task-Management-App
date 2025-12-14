import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { MobileSidebar } from './MobileSidebar';
import type { TabType } from '../routes';

export function RootLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('tasks');

  return (
    <div className="flex h-screen bg-white dark:bg-[#0A0A0A] overflow-hidden">
      {/* Desktop Sidebar - Fixed */}
      <div className="hidden lg:block lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:w-64">
        <Sidebar 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
      
      {/* Mobile Sidebar Overlay */}
      <MobileSidebar 
        isOpen={isMobileSidebarOpen} 
        onClose={() => setIsMobileSidebarOpen(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      {/* Main Content - With left margin to account for fixed sidebar */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        <Outlet />
      </div>
      
      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <MobileNav onMenuClick={() => setIsMobileSidebarOpen(true)} />
      </div>
    </div>
  );
}
