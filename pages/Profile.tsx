
import React, { useState } from 'react';
import { api } from '../services/api';
import { User, WeightLog } from '../types';
import { CrowdChart } from '../components/Charts';
import { Save, PlusCircle, Edit3 } from 'lucide-react';

interface ProfileProps {
  user: User;
  onUpdate: (user: User) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleSave = async () => {
    const updated = await api.updateProfile(formData);
    onUpdate(updated);
    setEditing(false);
  };

  const MOCK_HISTORY: WeightLog[] = [
    { date: 'Jan', weight: 80 },
    { date: 'Feb', weight: 79 },
    { date: 'Mar', weight: 77 },
    { date: 'Apr', weight: 76 },
    { date: 'May', weight: 75 },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="glass p-8 rounded-[2.5rem] flex flex-col items-center text-center">
          <div className="relative mb-6">
            <img 
              src={`https://picsum.photos/seed/${user.id}/200/200`} 
              className="w-32 h-32 rounded-[2rem] border-4 border-white shadow-xl" 
              alt="Profile" 
            />
            <button className="absolute bottom-0 right-0 p-2 bg-emerald-500 text-white rounded-xl shadow-lg">
              <Edit3 size={16} />
            </button>
          </div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-slate-500 text-sm mt-1">{user.email}</p>
          <div className="flex gap-2 mt-6">
            <span className="px-4 py-1.5 bg-zinc-900 text-white rounded-full text-xs font-bold uppercase tracking-widest">{user.role}</span>
            <span className="px-4 py-1.5 bg-emerald-100 text-emerald-600 rounded-full text-xs font-bold uppercase tracking-widest">{user.goal}</span>
          </div>
        </div>

        {/* Form Details */}
        <div className="md:col-span-2 glass p-8 rounded-[2.5rem]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold">Health Profile</h3>
            {editing ? (
              <button onClick={handleSave} className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-emerald-500/20">
                <Save size={18} /> Save
              </button>
            ) : (
              <button onClick={() => setEditing(true)} className="flex items-center gap-2 bg-slate-100 dark:bg-zinc-800 px-6 py-2 rounded-xl font-bold transition-all hover:bg-slate-200">
                <Edit3 size={18} /> Edit
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Age</label>
              <input 
                disabled={!editing}
                type="number" 
                value={formData.age} 
                onChange={e => setFormData({...formData, age: Number(e.target.value)})}
                className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800 border-none outline-none disabled:opacity-70"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Height (cm)</label>
              <input 
                disabled={!editing}
                type="number" 
                value={formData.height} 
                onChange={e => setFormData({...formData, height: Number(e.target.value)})}
                className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800 border-none outline-none disabled:opacity-70"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Weight (kg)</label>
              <input 
                disabled={!editing}
                type="number" 
                value={formData.weight} 
                onChange={e => setFormData({...formData, weight: Number(e.target.value)})}
                className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800 border-none outline-none disabled:opacity-70"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Exercise Level</label>
              <select 
                disabled={!editing}
                value={formData.exerciseLevel} 
                onChange={e => setFormData({...formData, exerciseLevel: e.target.value as any})}
                className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800 border-none outline-none appearance-none disabled:opacity-70"
              >
                <option value="sedentary">Sedentary</option>
                <option value="light">Light</option>
                <option value="moderate">Moderate</option>
                <option value="active">Active</option>
                <option value="athlete">Athlete</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="glass p-8 rounded-[2.5rem]">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-xl font-bold">Long-term Progress</h3>
            <p className="text-slate-500 text-sm">Monthly weight trend analysis</p>
          </div>
          <button className="p-3 bg-emerald-500 text-white rounded-2xl shadow-lg">
            <PlusCircle size={24} />
          </button>
        </div>
        <CrowdChart data={MOCK_HISTORY} type="area" color="#10b981" />
      </div>
    </div>
  );
};

export default Profile;
