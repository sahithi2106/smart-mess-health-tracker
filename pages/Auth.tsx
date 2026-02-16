
import React, { useState } from 'react';
import { api } from '../services/api';
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Target, 
  TrendingDown, 
  Activity, 
  Dumbbell,
  Mail,
  Lock,
  ArrowRight,
  User as UserIcon,
  Weight
} from 'lucide-react';
import { Gender, ExerciseLevel, FoodType, Goal } from '../types';

interface AuthProps {
  onLoginSuccess: (user: any) => void;
}

const Auth: React.FC<AuthProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', age: 20, 
    gender: 'male' as Gender, height: 175, weight: 70, 
    exerciseLevel: 'moderate' as ExerciseLevel, foodType: 'veg' as FoodType, goal: 'healthy' as Goal
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await api.login(formData.email, formData.password);
    onLoginSuccess(user);
  };

  const handleSignup = async () => {
    const user = await api.register(formData);
    onLoginSuccess(user);
  };

  const updateForm = (fields: any) => setFormData(prev => ({ ...prev, ...fields }));

  const inputStyles = "w-full px-5 py-4 rounded-xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none text-slate-900 dark:text-white placeholder:text-slate-400 font-medium shadow-sm";
  const labelStyles = "block text-sm font-bold text-slate-700 dark:text-zinc-300 mb-2.5 ml-1";

  if (isLogin) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-6 bg-slate-50 dark:bg-zinc-950">
        <div className="w-full max-w-[440px]">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500 text-white shadow-xl shadow-emerald-500/20 mb-6">
              <Activity size={32} />
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">SmartMess</h1>
            <p className="text-slate-500 dark:text-zinc-400 font-medium mt-2">Manage your nutrition with intelligence</p>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-10 md:p-12 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-10 text-center">Sign In</h2>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className={labelStyles}>Institutional Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="email" required
                    className={`${inputStyles} pl-12`}
                    placeholder="name@university.edu"
                    onChange={e => updateForm({ email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className={labelStyles}>Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="password" required
                    className={`${inputStyles} pl-12`}
                    placeholder="••••••••"
                    onChange={e => updateForm({ password: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-zinc-400 font-medium">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 dark:border-zinc-700 text-emerald-500" />
                  Remember me
                </label>
                <button type="button" className="text-emerald-600 font-bold hover:underline">Forgot password?</button>
              </div>

              <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl mt-4 shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group">
                Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          <p className="mt-8 text-center text-slate-500 font-medium">
            New student? <button onClick={() => setIsLogin(false)} className="text-emerald-600 font-bold hover:underline">Register Account</button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-zinc-950 p-6">
      <div className="max-w-2xl w-full bg-white dark:bg-zinc-900 p-10 md:p-12 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-2xl">
        <div className="flex justify-between items-center mb-12">
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map(s => (
              <div key={s} className={`h-1.5 w-12 rounded-full transition-all duration-500 ${step >= s ? 'bg-emerald-500' : 'bg-slate-100 dark:bg-zinc-800'}`}></div>
            ))}
          </div>
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Profile Step {step}/4</span>
        </div>

        {step === 1 && (
          <div className="animate-fadeIn space-y-6">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Identity Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className={labelStyles}>Full Name</label>
                <input type="text" className={inputStyles} placeholder="John Doe" onChange={e => updateForm({ name: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <label className={labelStyles}>Institutional Email</label>
                <input type="email" className={inputStyles} placeholder="j.doe@campus.edu" onChange={e => updateForm({ email: e.target.value })} />
              </div>
              <div>
                <label className={labelStyles}>Age</label>
                <input type="number" className={inputStyles} placeholder="21" onChange={e => updateForm({ age: Number(e.target.value) })} />
              </div>
              <div>
                <label className={labelStyles}>Gender</label>
                <select className={inputStyles} onChange={e => updateForm({ gender: e.target.value })}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fadeIn space-y-10">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Body Composition</h2>
            <div className="space-y-10">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className={labelStyles}>Height (cm)</label>
                  <span className="text-2xl font-black text-emerald-500">{formData.height} cm</span>
                </div>
                <input type="range" min="100" max="250" value={formData.height} className="w-full accent-emerald-500" onChange={e => updateForm({ height: Number(e.target.value) })} />
              </div>
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className={labelStyles}>Weight (kg)</label>
                  <span className="text-2xl font-black text-emerald-500">{formData.weight} kg</span>
                </div>
                <input type="range" min="30" max="200" value={formData.weight} className="w-full accent-emerald-500" onChange={e => updateForm({ weight: Number(e.target.value) })} />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fadeIn space-y-8">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Lifestyle Factor</h2>
            <div className="grid grid-cols-1 gap-4">
              {['sedentary', 'light', 'moderate', 'active', 'athlete'].map(lvl => (
                <button 
                  key={lvl}
                  onClick={() => updateForm({ exerciseLevel: lvl })}
                  className={`p-5 rounded-xl text-left flex justify-between items-center transition-all border-2 ${formData.exerciseLevel === lvl ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg' : 'bg-slate-50 dark:bg-zinc-800 border-slate-100 dark:border-zinc-800 hover:border-slate-200'}`}
                >
                  <span className="capitalize font-bold text-base">{lvl}</span>
                  {formData.exerciseLevel === lvl && <CheckCircle2 size={20} />}
                </button>
              ))}
            </div>
            <div className="pt-4">
              <label className={labelStyles}>Dietary Preference</label>
              <div className="grid grid-cols-3 gap-3">
                {['veg', 'non-veg', 'vegan'].map(type => (
                   <button 
                    key={type}
                    onClick={() => updateForm({ foodType: type })}
                    className={`py-4 rounded-xl capitalize font-bold transition-all border-2 ${formData.foodType === type ? 'bg-slate-900 dark:bg-white text-white dark:text-zinc-950 border-slate-900 dark:border-white' : 'bg-slate-50 dark:bg-zinc-800 border-slate-100 dark:border-zinc-800'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-fadeIn space-y-8">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Primary Fitness Goal</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'maintain', label: 'Maintain', icon: <Target className="text-blue-500" /> },
                { id: 'lose', label: 'Lose Weight', icon: <TrendingDown className="text-orange-500" /> },
                { id: 'gain', label: 'Gain Muscle', icon: <Dumbbell className="text-indigo-500" /> },
                { id: 'healthy', label: 'Optimal Health', icon: <Activity className="text-emerald-500" /> },
              ].map(g => (
                <button 
                  key={g.id}
                  onClick={() => updateForm({ goal: g.id })}
                  className={`p-8 rounded-2xl flex flex-col items-center gap-4 transition-all border-2 ${formData.goal === g.id ? 'bg-slate-900 dark:bg-white text-white dark:text-zinc-950 border-slate-900 dark:border-white shadow-xl' : 'bg-slate-50 dark:bg-zinc-800 border-slate-100 dark:border-zinc-800 hover:border-slate-200'}`}
                >
                  <div className={`p-4 rounded-full ${formData.goal === g.id ? 'bg-white/10 dark:bg-black/5' : 'bg-white dark:bg-zinc-900 shadow-sm'}`}>{g.icon}</div>
                  <span className="font-extrabold">{g.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 flex gap-4">
          {step > 1 && (
            <button 
              onClick={() => setStep(step - 1)}
              className="px-6 py-4 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 transition-all font-bold text-slate-600 dark:text-zinc-400"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          <button 
            onClick={() => step < 4 ? setStep(step + 1) : handleSignup()}
            className="flex-1 bg-emerald-500 text-white font-bold py-4 rounded-xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
          >
            {step < 4 ? 'Continue' : 'Finish Setup'} <ChevronRight size={20} />
          </button>
        </div>
        
        <p className="text-center mt-10 text-slate-500 font-medium">
          Member already? <button onClick={() => setIsLogin(true)} className="text-emerald-600 font-bold hover:underline">Sign In</button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
