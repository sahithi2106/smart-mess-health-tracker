
import React, { useState } from 'react';
import { api } from '../services/api';
// Added missing icons TrendingDown and Activity to fix the build errors.
import { ChevronRight, ChevronLeft, CheckCircle2, User as UserIcon, Scale, Dumbbell, Target, TrendingDown, Activity } from 'lucide-react';

interface AuthProps {
  onLoginSuccess: (user: any) => void;
}

const Auth: React.FC<AuthProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', age: 20, 
    gender: 'male', height: 175, weight: 70, 
    exerciseLevel: 'moderate', foodType: 'veg', goal: 'healthy'
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

  const stepClasses = "animate-fadeIn step-transition space-y-4";

  if (isLogin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md w-full glass p-10 rounded-[2.5rem] shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Welcome Back</h2>
            <p className="text-slate-500 mt-2">Login to manage your mess and nutrition</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 ml-1">Email Address</label>
              <input 
                type="email" 
                required
                className="w-full px-5 py-4 rounded-2xl bg-slate-100 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                placeholder="name@university.edu"
                onChange={e => updateForm({ email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 ml-1">Password</label>
              <input 
                type="password" 
                required
                className="w-full px-5 py-4 rounded-2xl bg-slate-100 border-none focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                placeholder="••••••••"
                onChange={e => updateForm({ password: e.target.value })}
              />
            </div>
            <div className="flex items-center justify-between text-sm px-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-300 text-emerald-500 focus:ring-emerald-500" />
                Remember me
              </label>
              <button type="button" className="text-emerald-600 font-semibold hover:underline underline-offset-4">Forgot password?</button>
            </div>
            <button className="w-full bg-zinc-900 text-white font-bold py-4 rounded-2xl mt-4 hover:bg-zinc-800 transition-all shadow-lg active:scale-95">
              Sign In
            </button>
          </form>
          <p className="text-center mt-8 text-slate-500">
            New here? <button onClick={() => setIsLogin(false)} className="text-emerald-600 font-bold hover:underline">Create Account</button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-xl w-full glass p-10 rounded-[2.5rem] shadow-xl">
        <div className="flex justify-between items-center mb-10">
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map(s => (
              <div key={s} className={`h-1.5 w-8 rounded-full transition-all duration-500 ${step >= s ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
            ))}
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Step {step} of 4</span>
        </div>

        {step === 1 && (
          <div className={stepClasses}>
            <div className="mb-8">
              <h2 className="text-3xl font-bold">Personal Details</h2>
              <p className="text-slate-500 mt-2">Let's get to know you better</p>
            </div>
            <div className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full px-5 py-4 rounded-2xl bg-slate-100 outline-none" onChange={e => updateForm({ name: e.target.value })} />
              <input type="email" placeholder="Email" className="w-full px-5 py-4 rounded-2xl bg-slate-100 outline-none" onChange={e => updateForm({ email: e.target.value })} />
              <input type="password" placeholder="Password" className="w-full px-5 py-4 rounded-2xl bg-slate-100 outline-none" onChange={e => updateForm({ password: e.target.value })} />
              <div className="grid grid-cols-2 gap-4">
                <input type="number" placeholder="Age" className="px-5 py-4 rounded-2xl bg-slate-100 outline-none" onChange={e => updateForm({ age: Number(e.target.value) })} />
                <select className="px-5 py-4 rounded-2xl bg-slate-100 outline-none appearance-none" onChange={e => updateForm({ gender: e.target.value })}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={stepClasses}>
             <div className="mb-8">
              <h2 className="text-3xl font-bold">Body Metrics</h2>
              <p className="text-slate-500 mt-2">Required for ML calorie calculation</p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2 ml-1">Height (cm)</label>
                <input type="range" min="100" max="250" value={formData.height} className="w-full accent-emerald-500" onChange={e => updateForm({ height: Number(e.target.value) })} />
                <div className="text-center font-bold text-2xl mt-2">{formData.height} cm</div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 ml-1">Weight (kg)</label>
                <input type="range" min="30" max="200" value={formData.weight} className="w-full accent-emerald-500" onChange={e => updateForm({ weight: Number(e.target.value) })} />
                <div className="text-center font-bold text-2xl mt-2">{formData.weight} kg</div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className={stepClasses}>
            <div className="mb-8">
              <h2 className="text-3xl font-bold">Lifestyle</h2>
              <p className="text-slate-500 mt-2">Help us understand your activity</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {['sedentary', 'light', 'moderate', 'active', 'athlete'].map(lvl => (
                <button 
                  key={lvl}
                  onClick={() => updateForm({ exerciseLevel: lvl })}
                  className={`p-4 rounded-2xl text-left flex justify-between items-center transition-all ${formData.exerciseLevel === lvl ? 'bg-emerald-500 text-white shadow-lg' : 'bg-slate-100 hover:bg-slate-200'}`}
                >
                  <span className="capitalize font-semibold">{lvl}</span>
                  {formData.exerciseLevel === lvl && <CheckCircle2 size={20} />}
                </button>
              ))}
            </div>
            <div className="mt-6">
              <label className="block text-sm font-semibold mb-3 ml-1">Diet Preference</label>
              <div className="flex gap-2">
                {['veg', 'non-veg', 'vegan'].map(type => (
                   <button 
                    key={type}
                    onClick={() => updateForm({ foodType: type })}
                    className={`flex-1 py-3 rounded-xl capitalize font-semibold transition-all ${formData.foodType === type ? 'bg-zinc-900 text-white' : 'bg-slate-100'}`}
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
            <div className="mb-8">
              <h2 className="text-3xl font-bold">Your Goal</h2>
              <p className="text-slate-500 mt-2">What do you want to achieve?</p>
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
                  className={`p-6 rounded-[2rem] flex flex-col items-center gap-3 transition-all text-center ${formData.goal === g.id ? 'bg-zinc-900 text-white ring-4 ring-emerald-500/20' : 'bg-slate-100 hover:bg-slate-200'}`}
                >
                  <div className={`p-3 rounded-full ${formData.goal === g.id ? 'bg-white/10' : 'bg-white shadow-sm'}`}>{g.icon}</div>
                  <span className="font-bold">{g.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 flex gap-4">
          {step > 1 && (
            <button 
              onClick={() => setStep(step - 1)}
              className="px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 transition-all font-bold text-slate-600 flex items-center gap-2"
            >
              <ChevronLeft size={20} /> Back
            </button>
          )}
          {step < 4 ? (
            <button 
              onClick={() => setStep(step + 1)}
              className="flex-1 bg-zinc-900 text-white font-bold py-4 rounded-2xl hover:bg-zinc-800 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              Continue <ChevronRight size={20} />
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
        
        <p className="text-center mt-8 text-slate-400 font-medium text-sm uppercase tracking-wider">
          Already have an account? <button onClick={() => setIsLogin(true)} className="text-emerald-600 font-bold hover:underline">Sign In</button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
