
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { CrowdChart } from '../components/Charts';
import { 
  Users, 
  Activity, 
  Utensils, 
  TrendingDown, 
  ChevronRight,
  Info
} from 'lucide-react';
import { MessStatus, CrowdData, FoodRecommendation, WeightLog, User } from '../types';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [mess, setMess] = useState<MessStatus | null>(null);
  const [crowd, setCrowd] = useState<CrowdData[]>([]);
  const [recommendation, setRecommendation] = useState<FoodRecommendation | null>(null);
  const [weightHistory, setWeightHistory] = useState<WeightLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [m, c, r, w] = await Promise.all([
          api.getMessStatus(),
          api.getCrowdDensity(),
          api.getFoodRecommendation(user),
          api.getWeightHistory()
        ]);
        setMess(m);
        setCrowd(c);
        setRecommendation(r);
        setWeightHistory(w);
      } catch (err) {
        console.error("Failed to load dashboard", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (loading) return <div className="p-8 text-center">Analysing health metrics...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-fadeIn">
      
      {/* Quick Stats */}
      <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Mess Status Card */}
        <div className="glass p-6 rounded-3xl relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-slate-500 dark:text-zinc-400 font-medium">Mess Occupancy</p>
              <h3 className="text-3xl font-bold mt-1">
                {mess?.occupancy} <span className="text-lg font-normal text-slate-400">/ {mess?.capacity}</span>
              </h3>
            </div>
            <div className={`p-3 rounded-2xl ${mess?.entryAllowed ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
              <Users size={24} />
            </div>
          </div>
          <div className="w-full bg-slate-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500 h-full transition-all duration-1000" 
              style={{ width: `${((mess?.occupancy || 0) / (mess?.capacity || 1)) * 100}%` }}
            ></div>
          </div>
          <p className="mt-4 text-sm flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${mess?.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>
            {mess?.isOpen ? 'Entry Allowed' : 'Closed Now'}
          </p>
        </div>

        {/* Weight Progress Card */}
        <div className="glass p-6 rounded-3xl group">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-slate-500 dark:text-zinc-400 font-medium">Weight Trend</p>
              <h3 className="text-3xl font-bold mt-1">75.0 <span className="text-lg font-normal text-slate-400">kg</span></h3>
            </div>
            <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
              <Activity size={24} />
            </div>
          </div>
          <div className="flex items-center gap-2 text-emerald-500 font-medium text-sm">
            <TrendingDown size={16} />
            <span>1.2kg lost this week</span>
          </div>
          <div className="mt-4 h-12 flex items-end gap-1">
            {[40, 60, 45, 70, 55, 80, 50].map((h, i) => (
              <div key={i} className="flex-1 bg-blue-500/20 hover:bg-blue-500 transition-all rounded-t-md" style={{height: `${h}%`}}></div>
            ))}
          </div>
        </div>

        {/* Crowd Graph */}
        <div className="sm:col-span-2 glass p-6 rounded-3xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Live Crowd Density</h3>
            <button className="text-emerald-500 text-sm font-semibold flex items-center gap-1">
              Live Forecast <ChevronRight size={16} />
            </button>
          </div>
          <CrowdChart data={crowd} type="line" />
        </div>
      </div>

      {/* Side Profile/Recommendation */}
      <div className="md:col-span-4 space-y-6">
        {/* ML Recommendation */}
        <div className="bg-zinc-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Utensils size={100} />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <Activity size={14} /> AI Recommendation
            </div>
            <h3 className="text-2xl font-bold leading-tight mb-2">{recommendation?.meal}</h3>
            <p className="text-zinc-400 text-sm mb-6">{recommendation?.calories}</p>
            
            <div className="bg-zinc-800/50 p-4 rounded-2xl border border-zinc-700/50 mb-6">
              <p className="text-xs text-zinc-400 leading-relaxed italic">
                "{recommendation?.reason}"
              </p>
            </div>
            
            <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2">
              Log this Meal <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass p-6 rounded-3xl">
          <h3 className="font-bold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Add Weight', color: 'bg-indigo-50 text-indigo-600' },
              { label: 'View Menu', color: 'bg-orange-50 text-orange-600' },
              { label: 'Peak Times', color: 'bg-pink-50 text-pink-600' },
              { label: 'Supplements', color: 'bg-emerald-50 text-emerald-600' },
            ].map((btn, i) => (
              <button key={i} className={`p-4 rounded-2xl ${btn.color} font-semibold text-sm transition-transform active:scale-95`}>
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
