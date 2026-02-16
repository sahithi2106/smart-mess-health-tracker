
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
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
      <div className="glass p-8 rounded-[2.5rem]">
        <h3 className="text-xl font-bold mb-8">Smart Notifications</h3>
        <div className="space-y-4">
          {[
            { id: 'lowCrowd', label: 'Low Crowd Alerts', desc: 'Notify me when the mess occupancy is below 20%', icon: <Zap className="text-yellow-500" /> },
            { id: 'suitableMeal', label: 'Suitable Meal Found', desc: 'Get alerted when a recommended dish is on today\'s menu', icon: <Bell className="text-emerald-500" /> },
            { id: 'weightChange', label: 'Weight Progress', desc: 'Weekly summary of your weight transformation', icon: <TrendingDown className="text-blue-500" /> },
            { id: 'peakHour', label: 'Peak Hour Warning', desc: 'Alert me before traditional peak hours (12:30 PM, 7:30 PM)', icon: <Info className="text-red-500" /> },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between p-6 bg-slate-50 dark:bg-zinc-800/50 rounded-3xl hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm">{item.icon}</div>
                <div>
                  <h4 className="font-bold">{item.label}</h4>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </div>
              <button 
                onClick={() => toggle(item.id as any)}
                className={`w-14 h-8 rounded-full relative transition-all duration-300 ${settings[item.id as keyof typeof settings] ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-zinc-700'}`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${settings[item.id as keyof typeof settings] ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-zinc-900 text-white p-8 rounded-[2.5rem] flex items-center justify-between">
        <div>
          <h4 className="text-lg font-bold">Email Digest</h4>
          <p className="text-zinc-400 text-sm">Receive a weekly PDF report of your health metrics</p>
        </div>
        <button className="px-6 py-3 bg-white text-zinc-900 rounded-2xl font-bold hover:bg-zinc-200 transition-all">Enable</button>
      </div>
    </div>
  );
};

export default Notifications;
