
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { CrowdChart } from '../components/Charts';
import { 
  Users, 
  Activity, 
  Utensils, 
  TrendingDown, 
  ChevronRight,
  TrendingUp,
  Clock
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

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium animate-pulse">Syncing health data...</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Row: Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Mess Status */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-8 rounded-2xl card-shadow card-shadow-hover transition-all duration-300">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded-xl">
              <Users size={24} />
            </div>
            <div className="flex flex-col items-end">
              <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${mess?.isOpen ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${mess?.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>
                {mess?.isOpen ? 'Open' : 'Closed'}
              </span>
            </div>
          </div>
          <p className="text-slate-500 dark:text-zinc-400 font-semibold text-sm">Mess Occupancy</p>
          <div className="flex items-baseline gap-2 mt-1 mb-6">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{mess?.occupancy}</h3>
            <span className="text-slate-400 text-sm font-medium">of {mess?.capacity} students</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500 h-full transition-all duration-1000 ease-out" 
              style={{ width: `${((mess?.occupancy || 0) / (mess?.capacity || 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Weight Change */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-8 rounded-2xl card-shadow card-shadow-hover transition-all duration-300">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-blue-50 dark:bg-blue-500/10 text-blue-600 rounded-xl">
              <Activity size={24} />
            </div>
            <span className="flex items-center gap-1 text-emerald-500 text-xs font-bold">
              <TrendingDown size={14} /> -1.2kg
            </span>
          </div>
          <p className="text-slate-500 dark:text-zinc-400 font-semibold text-sm">Current Weight</p>
          <div className="flex items-baseline gap-2 mt-1 mb-6">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">75.0</h3>
            <span className="text-slate-400 text-sm font-medium">Kilograms</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium italic">
            <Clock size={12} /> Last updated: Today, 8:45 AM
          </div>
        </div>

        {/* Nutritional Goal */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-8 rounded-2xl card-shadow card-shadow-hover transition-all duration-300">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-orange-50 dark:bg-orange-500/10 text-orange-600 rounded-xl">
              <Utensils size={24} />
            </div>
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Goal: Maintain</span>
          </div>
          <p className="text-slate-500 dark:text-zinc-400 font-semibold text-sm">Daily Calorie Target</p>
          <div className="flex items-baseline gap-2 mt-1 mb-6">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">2,450</h3>
            <span className="text-slate-400 text-sm font-medium">kcal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div className="w-[65%] h-full bg-orange-500 rounded-full"></div>
            </div>
            <span className="text-xs font-bold text-slate-600 dark:text-zinc-400">1,592 consumed</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Crowd and Recommendation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Graph */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-8 rounded-2xl card-shadow">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Live Crowd Density</h3>
                <p className="text-sm text-slate-500">Real-time occupancy sensor data</p>
              </div>
              <button className="px-4 py-2 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-sm font-bold text-slate-600 dark:text-zinc-300 hover:bg-slate-100 transition-colors">
                Past 24h
              </button>
            </div>
            <div className="h-72">
              <CrowdChart data={crowd} type="line" />
            </div>
          </div>
        </div>

        {/* Right Col: Recommendation & Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 dark:bg-zinc-800 text-white p-8 rounded-2xl shadow-xl shadow-slate-900/10 flex flex-col h-full border border-slate-800 dark:border-zinc-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs font-bold uppercase tracking-wider mb-6 w-fit">
              <Activity size={14} /> AI Recommendation
            </div>
            <h3 className="text-2xl font-bold leading-snug mb-3">{recommendation?.meal}</h3>
            <p className="text-slate-400 text-sm font-medium mb-6">{recommendation?.calories}</p>
            <div className="bg-white/5 p-5 rounded-xl border border-white/5 mb-8">
              <p className="text-xs text-slate-300 leading-relaxed italic opacity-80">
                "{recommendation?.reason}"
              </p>
            </div>
            <button className="mt-auto w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 group">
              Confirm Meal <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-8 rounded-2xl card-shadow">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-3">
              {[
                { label: 'Log New Weight', color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' },
                { label: 'Today\'s Mess Menu', color: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20' },
                { label: 'Historical Analytics', color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' },
              ].map((btn, i) => (
                <button key={i} className={`w-full p-4 rounded-xl ${btn.color} font-bold text-sm text-left flex items-center justify-between hover:opacity-80 transition-opacity`}>
                  {btn.label}
                  <ChevronRight size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
