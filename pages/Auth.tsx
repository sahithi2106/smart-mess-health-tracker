
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
  ArrowRight
} from 'lucide-react';
// Added missing imports for types to fix type mismatch error on line 37
import { Gender, ExerciseLevel, FoodType, Goal } from '../types';

interface AuthProps {
  onLoginSuccess: (user: any) => void;
}

const Auth: React.FC<AuthProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1);
  // Explicitly type initial state values to match Gender, ExerciseLevel, FoodType, and Goal types
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
    // Fixed type error on line 37 by ensuring formData properties match the expected literal types
    const user = await api.register(formData);
    onLoginSuccess(user);
  };

  const updateForm = (fields: any) => setFormData(prev => ({ ...prev, ...fields }));

  const stepClasses = "animate-fadeIn step-transition space-y-5";

  if (isLogin) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-slate-50 dark:bg-zinc-950">
        {/* Subtle background glow effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-[440px] z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500 text-white shadow-xl shadow-emerald-500/20 mb-6 transform transition-transform hover:scale-110 duration-500">
              <Activity size={32} strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
              SmartMess <span className="text-emerald-500">+</span> Health
            </h1>
            <p className="text-slate-500 dark:text-zinc-400 font-medium">
              Precision nutrition and mess management
            </p>
          </div>

          <div className="glass p-8 md:p-10 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] backdrop-blur-2xl bg-white/70 dark:bg-zinc-900/70 border border-white/40 dark:border-white/5 animate-fadeIn">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">Sign In</h2>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="group">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-500 mb-2 ml-1">
                  University Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email" 
                    required
                    className="w-full pl-11 pr-5 py-4 rounded-2xl bg-slate-100/50 dark:bg-zinc-800/50 border border-transparent focus:bg-white dark:focus:bg-zinc-800 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 font-medium"
                    placeholder="name@university.edu"
                    onChange={e => updateForm({ email: e.target.value })}
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-500 mb-2 ml-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input 
                    type="password" 
                    required
                    className="w-full pl-11 pr-5 py-4 rounded-2xl bg-slate-100/50 dark:bg-zinc-800/50 border border-transparent focus:bg-white dark:focus:bg-zinc-800 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 font-medium"
                    placeholder="••••••••"
                    onChange={e => updateForm({ password: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm px-1">
                <label className="flex items-center gap-2.5 cursor-pointer text-slate-600 dark:text-zinc-400 select-none">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 dark:border-zinc-700 text-emerald-500 focus:ring-emerald-500 bg-white/50 dark:bg-zinc-800" />
                  <span>Remember me</span>
                </label>
                <button type="button" className="text-emerald-600 dark:text-emerald-500 font-bold hover:text-emerald-700 transition-colors">Forgot password?</button>
              </div>

              <button className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-bold py-4 rounded-2xl mt-2 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 group">
                Sign In 
                <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          <div className="mt-10 text-center">
            <p className="text-slate-500 dark:text-zinc-500 font-medium">
              Don't have an account? <button onClick={() => setIsLogin(false)} className="text-emerald-600 dark:text-emerald-500 font-bold hover:underline decoration-2 underline-offset-4 ml-1">Join the community</button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-zinc-950 p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-xl w-full glass p-10 rounded-[2.5rem] shadow-2xl relative z-10 bg-white/70 dark:bg-zinc-900/70 border border-white/40 dark:border-white/5">
        <div className="flex justify-between items-center mb-10">
          <div className="flex gap-2">
            {[1, 2, 3, 4].map(s => (
              <div key={s} className={`h-1.5 w-10 rounded-full transition-all duration-500 ${step >= s ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'bg-slate-200 dark:bg-zinc-800'}`}></div>
            ))}
          </div>
          <span className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-[0.2em]">Step {step} of 4</span>
        </div>

        {step === 1 && (
          <div className={stepClasses}>
            <div className="mb-6">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Personal Details</h2>
              <p className="text-slate-500 dark:text-zinc-400 mt-2 font-medium">Tell us who you are to begin your journey</p>
            </div>
            <div className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full px-5 py-4 rounded-2xl bg-slate-100/50 dark:bg-zinc-800/50 border border-transparent focus:bg-white dark:focus:bg-zinc-800 focus:border-emerald-500/50 outline-none text-slate-900 dark:text-white font-medium" onChange={e => updateForm({ name: e.target.value })} />
              <input type="email" placeholder="Email" className="w-full px-5 py-4 rounded-2xl bg-slate-100/50 dark:bg-zinc-800/50 border border-transparent focus:bg-white dark:focus:bg-zinc-800 focus:border-emerald-500/50 outline-none text-slate-900 dark:text-white font-medium" onChange={e => updateForm({ email: e.target.value })} />
              <input type="password" placeholder="Password" className="w-full px-5 py-4 rounded-2xl bg-slate-100/50 dark:bg-zinc-800/50 border border-transparent focus:bg-white dark:focus:bg-zinc-800 focus:border-emerald-500/50 outline-none text-slate-900 dark:text-white font-medium" onChange={e => updateForm({ password: e.target.value })} />
              <div className="grid grid-cols-2 gap-4">
                <input type="number" placeholder="Age" className="px-5 py-4 rounded-2xl bg-slate-100/50 dark:bg-zinc-800/50 border border-transparent focus:bg-white dark:focus:bg-zinc-800 focus:border-emerald-500/50 outline-none text-slate-900 dark:text-white font-medium" onChange={e => updateForm({ age: Number(e.target.value) })} />
                <div className="relative">
                  <select className="w-full px-5 py-4 rounded-2xl bg-slate-100/50 dark:bg-zinc-800/50 border border-transparent focus:bg-white dark:focus:bg-zinc-800 focus:border-emerald-500/50 outline-none text-slate-900 dark:text-white font-medium appearance-none" onChange={e => updateForm({ gender: e.target.value })}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <ChevronRight size={18} className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={stepClasses}>
             <div className="mb-6">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Body Metrics</h2>
              <p className="text-slate-500 dark:text-zinc-400 mt-2 font-medium">Used for precision calorie calculations</p>
            </div>
            <div className="space-y-8 py-4">
              <div>
                <div className="flex justify-between items-center mb-3 ml-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-500">Height (cm)</label>
                  <span className="font-bold text-lg text-emerald-500">{formData.height} cm</span>
                </div>
                <input type="range" min="100" max="250" value={formData.height} className="w-full h-2 bg-slate-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500" onChange={e => updateForm({ height: Number(e.target.value) })} />
              </div>
              <div>
                <div className="flex justify-between items-center mb-3 ml-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-500">Weight (kg)</label>
                  <span className="font-bold text-lg text-emerald-500">{formData.weight} kg</span>
                </div>
                <input type="range" min="30" max="200" value={formData.weight} className="w-full h-2 bg-slate-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500" onChange={e => updateForm({ weight: Number(e.target.value) })} />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className={stepClasses}>
            <div className="mb-6">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Lifestyle</h2>
              <p className="text-slate-500 dark:text-zinc-400 mt-2 font-medium">Help us understand your metabolic rate</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {['sedentary', 'light', 'moderate', 'active', 'athlete'].map(lvl => (
                <button 
                  key={lvl}
                  onClick={() => updateForm({ exerciseLevel: lvl })}
                  className={`p-4 rounded-2xl text-left flex justify-between items-center transition-all border-2 ${formData.exerciseLevel === lvl ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-50 dark:bg-zinc-800/50 border-transparent hover:border-slate-200 dark:hover:border-zinc-700'}`}
                >
                  <span className="capitalize font-bold">{lvl}</span>
                  {formData.exerciseLevel === lvl && <CheckCircle2 size={20} />}
                </button>
              ))}
            </div>
            <div className="mt-6">
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-500 mb-3 ml-1">Diet Preference</label>
              <div className="flex gap-3">
                {['veg', 'non-veg', 'vegan'].map(type => (
                   <button 
                    key={type}
                    onClick={() => updateForm({ foodType: type })}
                    className={`flex-1 py-3.5 rounded-2xl capitalize font-bold transition-all border-2 ${formData.foodType === type ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 border-zinc-900 dark:border-white' : 'bg-slate-50 dark:bg-zinc-800/50 border-transparent hover:border-slate-200 dark:hover:border-zinc-700 text-slate-600 dark:text-zinc-400'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className={stepClasses}>
            <div className="mb-6">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Primary Goal</h2>
              <p className="text-slate-500 dark:text-zinc-400 mt-2 font-medium">What is your desired outcome?</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'maintain', label: 'Maintain', icon: <Target className="text-blue-500" /> },
                { id: 'lose', label: 'Lose Fat', icon: <TrendingDown className="text-orange-500" /> },
                { id: 'gain', label: 'Gain Muscle', icon: <Dumbbell className="text-indigo-500" /> },
                { id: 'healthy', label: 'Healthy Life', icon: <Activity className="text-emerald-500" /> },
              ].map(g => (
                <button 
                  key={g.id}
                  onClick={() => updateForm({ goal: g.id })}
                  className={`p-6 rounded-[2.5rem] flex flex-col items-center gap-3 transition-all text-center border-2 ${formData.goal === g.id ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 border-zinc-900 dark:border-white ring-8 ring-emerald-500/5' : 'bg-slate-50 dark:bg-zinc-800/50 border-transparent hover:border-slate-200 dark:hover:border-zinc-700'}`}
                >
                  <div className={`p-4 rounded-3xl ${formData.goal === g.id ? 'bg-white/10 dark:bg-zinc-900/10' : 'bg-white dark:bg-zinc-900 shadow-sm'}`}>{g.icon}</div>
                  <span className="font-bold text-sm tracking-tight">{g.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 flex gap-4">
          {step > 1 && (
            <button 
              onClick={() => setStep(step - 1)}
              className="px-6 py-4 rounded-2xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-all font-bold text-slate-600 dark:text-zinc-400 flex items-center gap-2"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          {step < 4 ? (
            <button 
              onClick={() => setStep(step + 1)}
              className="flex-1 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-bold py-4 rounded-2xl hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              Next Step <ChevronRight size={20} />
            </button>
          ) : (
            <button 
              onClick={handleSignup}
              className="flex-1 bg-emerald-500 text-zinc-900 font-bold py-4 rounded-2xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
            >
              Complete Setup <CheckCircle2 size={20} />
            </button>
          )}
        </div>
        
        <p className="text-center mt-10 text-slate-400 dark:text-zinc-500 font-medium text-sm">
          Already a member? <button onClick={() => setIsLogin(true)} className="text-emerald-600 dark:text-emerald-500 font-bold hover:underline decoration-2 underline-offset-4 ml-1">Sign In</button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
