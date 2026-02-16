
import React, { ReactNode } from 'react';
import { 
  LayoutDashboard, 
  User as UserIcon, 
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
    { id: 'dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { id: 'profile', icon: <UserIcon size={18} />, label: 'Profile' },
    { id: 'notifications', icon: <Bell size={18} />, label: 'Alerts' },
  ];

  if (user?.role === 'admin') {
    navItems.push({ id: 'admin', icon: <ShieldCheck size={18} />, label: 'Admin' });
  }

  return (
    <div className={`min-h-screen flex flex-col md:flex-row bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100`}>
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-zinc-900 border-r border-slate-200 dark:border-zinc-800 flex flex-col z-20 sticky top-0 md:h-screen transition-colors duration-300">
        <div className="p-8 flex items-center gap-3">
          <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/20">
            M
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">SmartMess</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all font-medium ${
                currentPage === item.id 
                  ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                  : 'text-slate-500 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-zinc-800 space-y-1">
          <button 
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-500 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all font-medium"
          >
            {darkMode ? <Sun size={18} className="text-yellow-500" /> : <Moon size={18} className="text-slate-600" />}
            <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <button 
            type="button"
            onClick={() => window.location.reload()}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-500 dark:text-zinc-400 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 transition-all font-medium"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-12 transition-colors duration-300">
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white capitalize">{currentPage}</h1>
            <p className="text-slate-500 dark:text-zinc-400 text-sm mt-0.5">Welcome back, {user?.name || 'User'}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors relative shadow-sm">
              <Bell size={20} className="text-slate-600 dark:text-zinc-400" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white dark:border-zinc-900"></span>
            </button>
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-900 dark:text-white leading-none">{user?.name}</p>
                <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1 uppercase tracking-tighter">Student ID: 2023049</p>
              </div>
              <img 
                src={`https://picsum.photos/seed/${user?.id || 'default'}/100/100`} 
                className="w-10 h-10 rounded-xl border border-slate-200 dark:border-zinc-800 object-cover shadow-sm" 
                alt="Profile" 
              />
            </div>
          </div>
        </header>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
