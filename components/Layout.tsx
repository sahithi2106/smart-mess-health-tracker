
import React, { ReactNode } from 'react';
import { 
  LayoutDashboard, 
  User as UserIcon, 
  Settings, 
  Bell, 
  ShieldCheck, 
  LogOut, 
  Sun, 
  Moon 
} from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  currentPage: string;
  setPage: (page: string) => void;
  user?: any;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  darkMode, 
  setDarkMode, 
  currentPage, 
  setPage, 
  user 
}) => {
  const navItems = [
    { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { id: 'profile', icon: <UserIcon size={20} />, label: 'Profile' },
    { id: 'notifications', icon: <Bell size={20} />, label: 'Alerts' },
  ];

  if (user?.role === 'admin') {
    navItems.push({ id: 'admin', icon: <ShieldCheck size={20} />, label: 'Admin' });
  }

  return (
    <div className={`min-h-screen flex flex-col md:flex-row ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <aside className="w-full md:w-64 glass border-r dark:border-zinc-800 flex flex-col z-20 sticky top-0 md:h-screen">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">M</div>
          <span className="font-bold text-xl tracking-tight">SmartMess</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                currentPage === item.id 
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                  : 'hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-500 dark:text-zinc-400'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t dark:border-zinc-800 space-y-2">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-500 dark:text-zinc-400 transition-all"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            <span className="font-medium">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <button 
            onClick={() => window.location.reload()} // Mock logout
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-zinc-950 p-4 md:p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold capitalize">{currentPage}</h1>
            <p className="text-slate-500 dark:text-zinc-400">Welcome back, {user?.name || 'User'}</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 glass rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <img 
              src={`https://picsum.photos/seed/${user?.id || 'default'}/100/100`} 
              className="w-10 h-10 rounded-full border-2 border-white dark:border-zinc-800" 
              alt="Profile" 
            />
          </div>
        </header>
        {children}
      </main>
    </div>
  );
};

export default Layout;
