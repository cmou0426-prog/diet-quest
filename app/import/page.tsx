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
  Sparkles,
  Zap,
  Copy,
  Check
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
  const [copied, setCopied] = useState(false);

  const promptTemplate = `Act as an expert sports nutritionist. Create a customized diet plan for me. My goal is [Insert Goal here, e.g., lose 10 lbs]. Please format the response clearly with Day 1 to Day 7 headings. For each day, list Breakfast, Lunch, and Dinner with exact calories and macros. Keep the formatting clean, structured, and easy to read.`;

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(promptTemplate);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy spell:", err);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      } else {
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

      {/* Step 1: AI Prompt Generator */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-panel p-6 border-blue-200/50 bg-blue-50/30 flex flex-col gap-4 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-500" />
            <h2 className="font-pixel text-[10px] text-blue-600 tracking-wider uppercase">
              Step 1: The Summoning Spell
            </h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopyPrompt}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-pixel text-[8px] transition-all ${
              copied 
              ? "bg-health text-white" 
              : "bg-blue-500 text-white hover:bg-blue-600 shadow-[0_4px_0_#1d4ed8]"
            }`}
          >
            {copied ? (
              <Check className="w-3 h-3" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
            {copied ? "COPIED!" : "COPY PROMPT"}
          </motion.button>
        </div>
        
        <div className="bg-slate-900/90 rounded-lg p-4 border border-slate-800 relative group overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
             <Sparkles size={48} className="text-blue-400" />
          </div>
          <p className="font-retro text-lg text-blue-100 leading-relaxed italic select-all">
            "{promptTemplate}"
          </p>
        </div>
        <p className="font-pixel text-[8px] text-slate-400 uppercase italic">
          * Use this spell with ChatGPT or Claude to generate your plan.
        </p>
      </motion.section>

      {/* Main Form Container - Step 2 */}
      <motion.section 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="glass-panel p-6 relative overflow-hidden flex flex-col gap-6 border-white/60 shadow-[0_0_20px_rgba(186,230,253,0.2)]"
      >
        <div className="flex items-center gap-2 relative z-10">
          <Scroll className="w-4 h-4 text-orange-400" />
          <h2 className="font-pixel text-[10px] text-slate-500 tracking-wider uppercase">
            Step 2: Paste the Ancient Wisdom
          </h2>
        </div>

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
      <div className="h-32 w-full shrink-0"></div>
    </main>
  );
}
