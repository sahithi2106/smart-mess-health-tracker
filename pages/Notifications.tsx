
import React, { useState } from 'react';
import { api } from '../services/api';
import { Bell, Info, Zap, TrendingDown } from 'lucide-react';

const Notifications: React.FC = () => {
  const [settings, setSettings] = useState({
    lowCrowd: true,
    suitableMeal: true,
    weightChange: false,
    peakHour: true
  });

  const toggle = (key: keyof typeof settings) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);
    api.updateNotifications(newSettings);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-10 rounded-2xl card-shadow">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8">Smart Alerts & Monitoring</h3>
        <div className="space-y-2">
          {[
            { id: 'lowCrowd', label: 'Low Crowd Alerts', desc: 'Notify when mess occupancy drops below 20%', icon: <Zap className="text-yellow-500" /> },
            { id: 'suitableMeal', label: 'ML Nutrition Match', desc: 'Get alerted when recommended meals are served', icon: <Bell className="text-emerald-500" /> },
            { id: 'weightChange', label: 'Weekly Summary', desc: 'Performance report on weight and calories', icon: <TrendingDown className="text-blue-500" /> },
            { id: 'peakHour', label: 'Traffic Warning', desc: 'Automatic alert before traditional peak hours', icon: <Info className="text-red-500" /> },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between p-6 rounded-2xl hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors group">
              <div className="flex items-center gap-5">
                <div className="p-3.5 bg-slate-50 dark:bg-zinc-800 rounded-xl group-hover:bg-white dark:group-hover:bg-zinc-700 transition-colors shadow-sm">{item.icon}</div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{item.label}</h4>
                  <p className="text-sm text-slate-500 dark:text-zinc-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
              <button 
                onClick={() => toggle(item.id as any)}
                className={`w-14 h-8 rounded-full relative transition-all duration-300 ${settings[item.id as keyof typeof settings] ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-zinc-700'}`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-sm transition-all duration-300 ${settings[item.id as keyof typeof settings] ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 dark:bg-zinc-800 p-10 rounded-2xl border border-slate-800 dark:border-zinc-700 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-xl font-bold text-white">Full Weekly Health Digest</h4>
          <p className="text-slate-400 text-sm mt-1 max-w-md">Get a professional PDF report delivered to your university email every Sunday evening.</p>
        </div>
        <button className="whitespace-nowrap px-8 py-4 bg-emerald-500 text-slate-950 font-bold rounded-xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20">
          Activate PDF Reports
        </button>
      </div>
    </div>
  );
};

export default Notifications;
