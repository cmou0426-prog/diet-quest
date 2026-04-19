import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Scroll, Shield, Sword, Wand2, Sparkles } from "lucide-react";

export default async function PlanPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // Fetch the most recent quest for this user
  const { data: quest, error: questError } = await supabase
    .from("quests")
    .select("quest_name, raw_ai_text")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (questError || !quest) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-6 text-center">
        <div className="glass-panel p-8 flex flex-col items-center gap-4 border-white/60 shadow-[0_0_20px_rgba(0,0,0,0.05)]">
           <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-2">
             <Shield className="w-8 h-8 text-slate-300" />
           </div>
           <h1 className="font-pixel text-lg uppercase tracking-wider text-slate-800">Your inventory is empty!</h1>
           <p className="font-retro text-xl text-slate-500 max-w-xs leading-tight">
             No active quest scroll found in your archives. You must venture to the archives to begin.
           </p>
           <Link href="/import" className="pixel-button px-8 py-4 font-pixel text-[10px] mt-4 flex items-center gap-2">
             <Sparkles className="w-4 h-4" />
             GO TO ARCHIVES
           </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1 flex flex-col gap-6 pb-10">
      <header className="pt-4">
        <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-pixel text-[10px] uppercase tracking-tighter">Back to Dashboard</span>
        </Link>
      </header>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Scroll className="w-4 h-4 text-orange-400" />
          <h2 className="font-pixel text-[10px] text-slate-500 tracking-wider uppercase">
            Quest Inventory
          </h2>
        </div>
        <h1 className="font-pixel text-xl text-slate-900 leading-tight">
          {quest.quest_name}
        </h1>
      </div>

      {/* The "Scroll" Panel */}
      <section className="relative group">
        {/* Animated Glow Effect behind the panel */}
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-400/20 via-yellow-400/20 to-orange-400/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
        
        <div className="glass-panel relative bg-amber-50/90 border-amber-200/50 min-h-[500px] overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)]">
          {/* Subtle Scanline Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(0,0,0,1)_1px,transparent_1px)] bg-[length:100%_3px]" />
          
          {/* Header of the Scroll */}
          <div className="border-b border-amber-200/50 p-4 flex justify-between items-center bg-amber-100/30">
             <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
             </div>
             <div className="flex items-center gap-2">
                <Wand2 className="w-3.5 h-3.5 text-amber-500/50" />
                <span className="font-pixel text-[8px] text-amber-600/60 tracking-widest uppercase">Ancient Wisdom</span>
                <Wand2 className="w-3.5 h-3.5 text-amber-500/50 scale-x-[-1]" />
             </div>
             <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
             </div>
          </div>

          {/* Main Content Area */}
          <div className="p-6 md:p-10 relative">
             {/* Large background watermark icon */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03]">
                <Scroll className="w-64 h-64 text-amber-900" />
             </div>

             <div className="relative z-10">
                <pre className="font-retro text-xl md:text-2xl text-slate-800 whitespace-pre-wrap break-words leading-relaxed selection:bg-orange-200">
                  {quest.raw_ai_text}
                </pre>
             </div>
          </div>
          
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <Shield className="w-12 h-12 text-amber-900" />
          </div>
          <div className="absolute bottom-0 left-0 p-3 opacity-10">
            <Sword className="w-12 h-12 text-amber-900" />
          </div>

          {/* Bottom Footer of the Scroll */}
          <div className="border-t border-amber-200/30 p-4 mt-4 bg-amber-100/20 flex justify-center items-center">
            <div className="h-[1px] w-12 bg-amber-200/50" />
            <div className="mx-4 w-2 h-2 rotate-45 border border-amber-300" />
            <div className="h-[1px] w-12 bg-amber-200/50" />
          </div>
        </div>
      </section>

      <footer className="flex flex-col items-center gap-2 pt-4">
        <p className="font-pixel text-[8px] text-slate-400 uppercase tracking-[0.2em] text-center">
          End of Document — Safe Travels, Adventurer
        </p>
        <div className="w-16 h-1 bg-slate-200 rounded-full opacity-50" />
      </footer>
      <div className="h-32 w-full shrink-0"></div>
    </main>
  );
}
