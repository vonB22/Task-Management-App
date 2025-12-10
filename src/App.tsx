import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Layout } from './components/Layout';
import { ThemeProvider } from './context/ThemeContext';
import { renderRoute } from './routes';
import type { TabType } from './routes';

function AppContent() {
  const [activeTab, setActiveTab] = useState<TabType>('tasks');

  return (
    <Layout>
      <Navbar />
      <div className="flex min-h-screen">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-8 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-200">
          {renderRoute(activeTab)}
        </main>
      </div>
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
