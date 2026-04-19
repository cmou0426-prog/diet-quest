"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Flame, 
  Zap, 
  Utensils, 
  Scroll, 
  Trophy, 
  Activity,
  ChevronRight,
  ShieldCheck,
  Sword,
  Plus,
  Loader2
} from "lucide-react";
import { addMeal } from "./dashboard-actions";
import { useRouter } from "next/navigation";

export interface DailyLog {
  id: string;
  meal_name: string;
  calories: number;
  created_at: string;
}

interface DashboardViewProps {
  questName: string;
  targetCalories: number;
  dailyLogs: DailyLog[];
}

export default function DashboardView({ questName, targetCalories, dailyLogs }: DashboardViewProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [mealName, setMealName] = useState("");
  const [calories, setCalories] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const currentCalories = dailyLogs.reduce((sum, log) => sum + log.calories, 0);
  const hpPercent = targetCalories > 0 ? (currentCalories / targetCalories) * 100 : 0;
  const isOverBudget = currentCalories > targetCalories;
  
  const xpValue = 1250;
  const streakDays = 7;

  async function handleAddMeal(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    
    const formData = new FormData();
    formData.append("meal_name", mealName);
    formData.append("calories", calories);

    try {
      await addMeal(formData);
      setMealName("");
      setCalories("");
      router.refresh();
    } catch (err) {
      alert("Failed to log meal. The dungeon master is displeased.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <main className="flex-1 flex flex-col gap-8 pb-10">
      {/* Header section */}
      <header className="flex justify-between items-start pt-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Sword className="w-4 h-4 text-slate-400" />
            <h2 className="font-pixel text-[10px] text-slate-500 tracking-wider uppercase">
              Current Quest
            </h2>
          </div>
          <h1 className="font-pixel text-lg text-slate-900 leading-tight">
            {questName}
          </h1>
          <Link href="/plan" className="flex items-center gap-1 mt-1 text-blue-500 hover:text-blue-600 transition-colors group">
            <span className="font-pixel text-[8px] uppercase tracking-tighter">View Quest Scroll</span>
            <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="glass-panel p-3 flex items-center gap-2 cursor-pointer"
        >
           <Trophy className="w-5 h-5 text-yellow-500" />
           <div className="flex flex-col">
             <span className="font-pixel text-[8px] text-slate-400">LVL</span>
             <span className="font-pixel text-[12px]">12</span>
           </div>
        </motion.div>
      </header>

      {/* HP Bar Section */}
      <section className="flex flex-col gap-3">
        <div className="flex justify-between items-end">
          <div className="flex items-center gap-2">
             <Activity className={`w-5 h-5 ${isOverBudget ? 'text-red-500 animate-pulse' : 'text-health'}`} />
             <span className="font-pixel text-[10px] tracking-tighter">CALORIE HP</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className={`font-retro text-3xl tracking-tighter ${isOverBudget ? 'text-red-600 font-bold' : 'text-slate-900'}`}>
              {currentCalories.toLocaleString()}
            </span>
            <span className="font-retro text-xl text-slate-400">/ {targetCalories.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="pixel-border h-10 w-full bg-slate-200 overflow-hidden p-1 bg-white">
          <div className="h-full w-full bg-slate-100/50 rounded-sm relative overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(hpPercent, 100)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full relative ${
                isOverBudget 
                ? 'bg-gradient-to-r from-orange-500 to-red-600' 
                : 'bg-gradient-to-r from-health via-yellow-400 to-orange-400'
              }`}
            >
              {/* Glossy overlay effect */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20" />
              {/* Animated pulses */}
              <motion.div
                animate={{ x: ["0%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 h-full w-20 bg-white/30 skew-x-12"
              />
            </motion.div>
          </div>
        </div>
        {isOverBudget && (
          <motion.p 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-pixel text-[8px] text-red-500 text-center uppercase tracking-widest"
          >
            Critical Status: Calorie Limit Exceeded!
          </motion.p>
        )}
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div 
          whileTap={{ scale: 0.95 }}
          className="glass-panel p-5 flex flex-col gap-2 group cursor-pointer"
        >
           <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center mb-1 group-hover:animate-bounce">
              <Flame className="w-6 h-6 text-orange-500" />
           </div>
           <span className="text-[10px] font-pixel text-slate-400 uppercase">Streak</span>
           <div className="flex items-baseline gap-1">
              <span className="font-retro text-4xl leading-none">{streakDays}</span>
              <span className="text-xs text-slate-400 font-medium">days</span>
           </div>
        </motion.div>

        <motion.div 
          whileTap={{ scale: 0.95 }}
          className="glass-panel p-5 flex flex-col gap-2 group cursor-pointer"
        >
           <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mb-1 group-hover:rotate-12 transition-transform">
              <Zap className="w-6 h-6 text-blue-500" />
           </div>
           <span className="text-[10px] font-pixel text-slate-400 uppercase">EXP</span>
           <div className="flex items-baseline gap-1">
              <span className="font-retro text-4xl leading-none">{xpValue}</span>
              <span className="text-xs text-slate-400 font-medium">pts</span>
           </div>
        </motion.div>
      </div>

      {/* Quick Log UI */}
      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="font-pixel text-[10px] text-slate-500 tracking-wider uppercase">
            Quick Log Meal
          </h3>
          <Plus className="w-4 h-4 text-blue-400" />
        </div>
        
        <div className="glass-panel p-6 bg-white/40 border-white/60 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
          <form onSubmit={handleAddMeal} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-pixel text-[8px] text-slate-400 uppercase">Meal Name</label>
                <input 
                  required
                  name="meal_name"
                  type="text" 
                  placeholder="e.g. Health Potion"
                  value={mealName}
                  onChange={(e) => setMealName(e.target.value)}
                  className="w-full bg-white/50 border-2 border-slate-200 p-2 font-retro text-lg focus:border-blue-400 focus:outline-none rounded-md transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-pixel text-[8px] text-slate-400 uppercase">Calories</label>
                <input 
                  required
                  name="calories"
                  type="number" 
                  placeholder="300"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  className="w-full bg-white/50 border-2 border-slate-200 p-2 font-retro text-lg focus:border-orange-400 focus:outline-none rounded-md transition-colors"
                />
              </div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isPending}
              type="submit"
              className="pixel-button w-full py-4 flex items-center justify-center gap-2 font-pixel text-[10px] tracking-tight group cursor-pointer disabled:opacity-50"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Zap className="w-4 h-4 group-hover:rotate-12 transition-transform text-yellow-400" />
              )}
              ADD TO LOG
            </motion.button>
          </form>
        </div>
      </section>

      {/* Recent Activity / Daily Log List */}
      <section className="flex flex-col gap-4">
        <h3 className="font-pixel text-[10px] text-slate-500 tracking-wider uppercase px-1">
          Today's Log Entries
        </h3>
        
        <div className="glass-panel overflow-hidden border-white/50">
           <AnimatePresence initial={false}>
             {dailyLogs.length === 0 ? (
               <div className="p-8 text-center">
                 <p className="font-retro text-slate-400 italic text-lg">No meals logged yet today...</p>
               </div>
             ) : (
               dailyLogs.map((item, i) => (
                 <motion.div 
                   key={item.id} 
                   initial={{ x: -20, opacity: 0 }}
                   animate={{ x: 0, opacity: 1 }}
                   transition={{ delay: i * 0.05 }}
                   className={`p-4 flex items-center justify-between hover:bg-white/40 transition-colors cursor-pointer group ${i !== dailyLogs.length - 1 ? 'border-b border-white/20' : ''}`}
                 >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Utensils className="w-5 h-5 text-slate-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900 text-sm">{item.meal_name}</h4>
                        <span className="text-[10px] text-slate-400 font-medium uppercase">
                          {mounted ? new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "..."}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-retro text-2xl">{item.calories}</span>
                      <span className="font-pixel text-[8px] text-slate-400 uppercase">kcal</span>
                    </div>
                 </motion.div>
               ))
             )}
           </AnimatePresence>
        </div>
      </section>

      {/* CTA Button */}
      <footer className="mt-auto pt-6">
        <Link href="/import">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="pixel-button w-full py-6 flex items-center justify-center gap-3 font-pixel text-[11px] tracking-tight group cursor-pointer"
          >
             <Scroll className="w-5 h-5 group-hover:rotate-12 transition-transform" />
             IMPORT AI DIET SCROLL
             <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </Link>
      </footer>
    </main>
  );
}
