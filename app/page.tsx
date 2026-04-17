"use client";

import { motion } from "framer-motion";
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
  Sword
} from "lucide-react";

export default function Home() {
  const hpPercent = 65; // Example HP
  const xpValue = 1250;
  const streakDays = 7;

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
            The Bulk Trials
          </h1>
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
             <Activity className="w-5 h-5 text-health" />
             <span className="font-pixel text-[10px] tracking-tighter">CALORIE HP</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-retro text-3xl tracking-tighter text-slate-900">1,430</span>
            <span className="font-retro text-xl text-slate-400">/ 2,200</span>
          </div>
        </div>
        
        <div className="pixel-border h-10 w-full bg-slate-200 overflow-hidden p-1 bg-white">
          <div className="h-full w-full bg-slate-100/50 rounded-sm relative overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${hpPercent}%` }}
              transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="h-full bg-gradient-to-r from-health via-yellow-400 to-red-500 relative"
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

      {/* Daily Macros Mini-Grid */}
      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="font-pixel text-[10px] text-slate-500 tracking-wider uppercase">
            Quick Stats
          </h3>
          <ShieldCheck className="w-4 h-4 text-blue-400" />
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "P", val: "120g", color: "bg-red-400" },
            { label: "C", val: "180g", color: "bg-blue-400" },
            { label: "F", val: "45g", color: "bg-yellow-400" },
          ].map((macro, i) => (
            <div key={i} className="glass-panel p-3 flex flex-col items-center gap-1">
              <span className={`text-[8px] font-pixel ${macro.color.replace('bg-', 'text-')}`}>{macro.label}</span>
              <span className="font-retro text-xl">{macro.val}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="flex flex-col gap-4">
        <h3 className="font-pixel text-[10px] text-slate-500 tracking-wider uppercase px-1">
          Daily Log
        </h3>
        
        <div className="glass-panel overflow-hidden border-white/50">
           {[
             { name: "Breakfast", kcal: 450, time: "8:30 AM", icon: Utensils },
             { name: "Post-Workout", kcal: 320, time: "11:15 AM", icon: Zap },
             { name: "Lunch", kcal: 660, time: "1:45 PM", icon: Utensils },
           ].map((item, i) => (
             <motion.div 
               key={i} 
               initial={{ x: -20, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ delay: i * 0.1 }}
               className={`p-4 flex items-center justify-between hover:bg-white/40 transition-colors cursor-pointer group ${i !== 2 ? 'border-b border-white/20' : ''}`}
             >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <item.icon className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 text-sm">{item.name}</h4>
                    <span className="text-[10px] text-slate-400 font-medium uppercase">{item.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-retro text-2xl">{item.kcal}</span>
                  <span className="font-pixel text-[8px] text-slate-400 uppercase">kcal</span>
                </div>
             </motion.div>
           ))}
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
