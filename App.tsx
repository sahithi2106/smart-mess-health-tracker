
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import Admin from './pages/Admin';
import { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  
  // Initialize state based on localStorage or system preference
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Sync state with DOM and localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  if (!user) {
    return <Auth onLoginSuccess={setUser} />;
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard user={user} />;
      case 'profile': return <Profile user={user} onUpdate={setUser} />;
      case 'notifications': return <Notifications />;
      case 'admin': return <Admin />;
      default: return <Dashboard user={user} />;
    }
  };

  return (
    <Layout 
      darkMode={darkMode} 
      setDarkMode={setDarkMode} 
      currentPage={currentPage} 
      setPage={setCurrentPage}
      user={user}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
