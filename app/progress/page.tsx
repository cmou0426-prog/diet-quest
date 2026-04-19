"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Trophy, 
  TrendingUp, 
  ChevronLeft, 
  Scale, 
  Award,
  Calendar,
  Sparkles,
  Zap
} from "lucide-react";
import Link from "next/link";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const placeholderData = [
  { day: "D1", weight: 200 },
  { day: "D4", weight: 199.2 },
  { day: "D7", weight: 198 },
  { day: "D10", weight: 197.5 },
  { day: "D14", weight: 195 },
];

const achievements = [
  { id: 1, name: "First Entry", icon: Scale, unlocked: true },
  { id: 2, name: "5 Lbs Lost", icon: Award, unlocked: false },
  { id: 3, name: "7-Day Streak", icon: Zap, unlocked: false },
  { id: 4, name: "Goal Crusher", icon: Trophy, unlocked: false },
];

export default function ProgressPage() {
  const router = useRouter();
  const supabase = createClient();
  const [weight, setWeight] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) router.push("/login");
    };
    checkUser();
  }, [supabase, router]);

  const handleUpdateWeight = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setWeight("");
      alert("Stat updated! Your hero grows stronger.");
    }, 1000);
  };

  if (!mounted) return null;

  return (
    <main className="flex-1 flex flex-col gap-6">
      {/* Header */}
      <header className="pt-4 flex flex-col gap-4">
        <Link 
          href="/" 
          className="flex items-center gap-2 font-pixel text-[10px] text-slate-500 hover:text-slate-900 transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          BACK TO DASHBOARD
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-health" />
              <h2 className="font-pixel text-[10px] text-slate-500 tracking-wider uppercase">
                Hero Stats
              </h2>
            </div>
            <h1 className="font-pixel text-xl text-slate-900 leading-tight">
              Progress Tracker
            </h1>
          </div>
          <div className="w-12 h-12 rounded-xl bg-health/10 border-2 border-health/20 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-health" />
          </div>
        </div>
      </header>

      {/* Chart Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 bg-slate-900/90 border-slate-800 shadow-2xl relative overflow-hidden min-h-[300px]"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-health/50 to-transparent" />
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-slate-400">
            <Calendar size={14} />
            <span className="font-pixel text-[8px] uppercase tracking-widest">Last 14 Days</span>
          </div>
          <div className="flex items-center gap-2 text-health">
            <Sparkles size={14} />
            <span className="font-pixel text-[8px] uppercase tracking-widest">-5.0 LBS</span>
          </div>
        </div>

        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={placeholderData}>
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'var(--font-pixel)' }}
                dy={10}
              />
              <YAxis 
                hide 
                domain={['dataMin - 5', 'dataMax + 5']} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  fontFamily: 'var(--font-retro)',
                  fontSize: '16px',
                  color: '#fff'
                }}
                itemStyle={{ color: '#4CAF50' }}
                cursor={{ stroke: '#334155', strokeWidth: 1 }}
              />
              <Line 
                type="monotone" 
                dataKey="weight" 
                stroke="#4CAF50" 
                strokeWidth={4} 
                dot={{ fill: '#4CAF50', stroke: '#1e293b', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
                filter="url(#glow)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.section>

      {/* Input Section */}
      <section className="flex flex-col gap-4">
        <h3 className="font-pixel text-[10px] text-slate-500 tracking-wider uppercase px-1">
          Record Weight
        </h3>
        <div className="glass-panel p-6 bg-white/40 border-white/60">
          <form onSubmit={handleUpdateWeight} className="flex gap-3">
            <div className="relative flex-1">
              <Scale className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                required
                type="number" 
                step="0.1"
                placeholder="Current Weight (lbs)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full bg-white/50 border-2 border-slate-200 pl-11 pr-4 py-3 font-retro text-xl focus:border-health focus:outline-none rounded-xl transition-colors"
              />
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className="pixel-button px-6 py-3 font-pixel text-[10px] whitespace-nowrap disabled:opacity-50"
            >
              UPDATE STATS
            </motion.button>
          </form>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="flex flex-col gap-4">
        <h3 className="font-pixel text-[10px] text-slate-500 tracking-wider uppercase px-1">
          Milestone Badges
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {achievements.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={item.id}
                whileHover={item.unlocked ? { y: -5 } : {}}
                className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${
                  item.unlocked 
                  ? 'bg-white border-health/20 shadow-sm' 
                  : 'bg-slate-100/50 border-slate-200/50 opacity-40 grayscale'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  item.unlocked ? 'bg-health/10' : 'bg-slate-200'
                }`}>
                  <Icon className={`w-5 h-5 ${item.unlocked ? 'text-health' : 'text-slate-400'}`} />
                </div>
                <span className={`font-pixel text-[6px] text-center uppercase leading-tight ${
                  item.unlocked ? 'text-slate-700' : 'text-slate-400'
                }`}>
                  {item.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </section>

      <div className="h-32 w-full shrink-0"></div>
    </main>
  );
}
