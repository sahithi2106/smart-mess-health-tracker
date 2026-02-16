
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { CrowdChart } from '../components/Charts';
import { 
  Users, 
  Settings, 
  Clock, 
  FileText, 
  Lock, 
  Unlock,
  Upload,
  BarChart3
} from 'lucide-react';

const Admin: React.FC = () => {
  const [occupancy, setOccupancy] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      const occ = await api.getAdminOccupancy();
      const l = await api.getAdminLogs();
      setOccupancy(occ);
      setLogs(l);
    };
    fetchAdminData();
  }, []);

  const toggleMess = () => {
    // api.post('/api/admin/mess-control', { status: !isOpen })
    setIsOpen(!isOpen);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center">
          <div className={`p-5 rounded-3xl mb-4 ${isOpen ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
            {isOpen ? <Unlock size={32} /> : <Lock size={32} />}
          </div>
          <h3 className="text-2xl font-bold mb-1">Mess is {isOpen ? 'Open' : 'Closed'}</h3>
          <p className="text-slate-500 text-sm mb-6">Controlled manually or by schedule</p>
          <button 
            onClick={toggleMess}
            className={`w-full py-4 rounded-2xl font-bold transition-all ${isOpen ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'}`}
          >
            {isOpen ? 'Close Mess' : 'Open Mess'}
          </button>
        </div>

        <div className="md:col-span-2 glass p-8 rounded-[2.5rem]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Analytics Overview</h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-slate-100 dark:bg-zinc-800 rounded-xl text-sm font-semibold">Today</button>
              <button className="px-4 py-2 text-sm text-slate-500 font-semibold">Week</button>
            </div>
          </div>
          <CrowdChart data={occupancy?.history || []} type="line" color="#6366f1" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-8 rounded-[2.5rem]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Upload Menu</h3>
            <Upload size={20} className="text-slate-400" />
          </div>
          <div className="border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-3xl p-10 flex flex-col items-center text-center">
            <div className="p-4 bg-slate-100 dark:bg-zinc-800 rounded-2xl mb-4">
              <FileText size={24} className="text-slate-400" />
            </div>
            <p className="font-semibold">Drag & drop menu JSON or CSV</p>
            <p className="text-xs text-slate-400 mt-1">Updates ML recommendations instantly</p>
            <button className="mt-6 px-8 py-3 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-zinc-800 transition-all">Browse Files</button>
          </div>
        </div>

        <div className="glass p-8 rounded-[2.5rem]">
          <h3 className="text-xl font-bold mb-6">Recent Activity Logs</h3>
          <div className="space-y-4">
            {logs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                    {log.user.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{log.user}</p>
                    <p className="text-xs text-slate-500">{log.action}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-400">{log.time}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 border border-slate-200 dark:border-zinc-800 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-50 transition-all">
            View All Logs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
