"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  Scroll, 
  Flame, 
  Sword, 
  Save, 
  Loader2,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function ImportQuestPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [loading, setLoading] = useState(false);
  const [questName, setQuestName] = useState("");
  const [rawAiText, setRawAiText] = useState("");
  const [targetCalories, setTargetCalories] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      } else {
        // Redirect to login if no user
        router.push("/login");
      }
    };
    getUser();
  }, [supabase, router]);

  const handleSaveQuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    setLoading(true);

    try {
      const { error } = await supabase.from("quests").insert([
        {
          user_id: userId,
          quest_name: questName,
          raw_ai_text: rawAiText,
          target_calories: parseInt(targetCalories),
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      // Success! Redirect to dashboard
      router.push("/");
    } catch (error) {
      console.error("Error saving quest:", error);
      alert("Failed to forge the quest. Check the console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col gap-6 pb-10">
      {/* Back Link */}
      <nav className="pt-4">
        <Link 
          href="/" 
          className="flex items-center gap-2 font-pixel text-[10px] text-slate-500 hover:text-slate-900 transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          BACK TO DASHBOARD
        </Link>
      </nav>

      {/* Header */}
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-400" />
          <h1 className="font-pixel text-xl text-slate-900 leading-tight">
            Import AI Scroll
          </h1>
        </div>
        <p className="font-retro text-lg text-slate-500 leading-tight">
          Transcribe your magical nutrition plan into the eternal Quest Log.
        </p>
      </header>

      {/* Main Form Container */}
      <motion.section 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="glass-panel p-6 relative overflow-hidden flex flex-col gap-6 border-white/60 shadow-[0_0_20px_rgba(186,230,253,0.2)]"
      >
        {/* Animated magical scanline */}
        <motion.div 
          animate={{ y: ["0%", "100%", "0%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-blue-400/5 to-transparent h-40 w-full z-0"
        />

        {/* Decorative corner accents */}
        <div className="absolute top-0 right-0 w-12 h-12 bg-blue-100/30 rounded-bl-3xl -mr-4 -mt-4 blur-xl" />
        <div className="absolute bottom-0 left-0 w-12 h-12 bg-health/20 rounded-tr-3xl -ml-4 -mb-4 blur-xl" />

        <form onSubmit={handleSaveQuest} className="flex flex-col gap-6 relative z-10">
          {/* Quest Name */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 font-pixel text-[10px] text-slate-400 uppercase tracking-widest">
              <Sword className="w-3 h-3" />
              Quest Name
            </label>
            <input
              required
              type="text"
              placeholder="e.g., The Summer Cut"
              value={questName}
              onChange={(e) => setQuestName(e.target.value)}
              className="w-full bg-white/50 border-2 border-slate-200 p-4 font-retro text-xl focus:border-blue-400 focus:outline-none transition-colors rounded-lg"
            />
          </div>

          {/* Daily Calories */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 font-pixel text-[10px] text-slate-400 uppercase tracking-widest">
              <Flame className="w-3 h-3 text-orange-400" />
              Daily Target Calories
            </label>
            <input
              required
              type="number"
              placeholder="2500"
              value={targetCalories}
              onChange={(e) => setTargetCalories(e.target.value)}
              className="w-full bg-white/50 border-2 border-slate-200 p-4 font-retro text-xl focus:border-orange-300 focus:outline-none transition-colors rounded-lg"
            />
          </div>

          {/* AI Scroll Content */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 font-pixel text-[10px] text-slate-400 uppercase tracking-widest">
              <Scroll className="w-3 h-3 text-slate-500" />
              AI Diet Scroll Content
            </label>
            <textarea
              required
              rows={8}
              placeholder="Paste the raw AI output here..."
              value={rawAiText}
              onChange={(e) => setRawAiText(e.target.value)}
              className="w-full bg-white/50 border-2 border-slate-200 p-4 font-retro text-lg focus:border-slate-400 focus:outline-none transition-colors rounded-lg resize-none scrollbar-thin scrollbar-thumb-slate-200"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="pixel-button mt-4 py-6 flex items-center justify-center gap-3 font-pixel text-[12px] tracking-tight group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3"
                >
                  <Loader2 className="w-5 h-5 animate-spin" />
                  FORGING...
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3"
                >
                  <Save className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  SAVE TO QUEST LOG
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </form>
      </motion.section>

      {/* Help Tip */}
      <footer className="px-2">
        <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50/50 border border-blue-100">
           <div className="mt-1 w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
           <p className="text-[11px] font-medium text-blue-600 leading-relaxed italic">
             "Tip: Paste the entire output from ChatGPT or Claude. Our system will analyze the magic for you."
           </p>
        </div>
      </footer>
    </main>
  );
}
