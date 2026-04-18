"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Scroll, ChevronRight, Sparkles } from "lucide-react";

export default function EmptyQuestState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-8 pb-10 min-h-[60vh]">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center text-center gap-6"
      >
        <div className="relative">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="w-24 h-24 bg-slate-100 rounded-2xl flex items-center justify-center pixel-border shadow-xl"
          >
            <Sparkles className="w-12 h-12 text-slate-300" />
          </motion.div>
          
          {/* Decorative floating pixels */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [-10, 10, -10],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 2 + i, 
                repeat: Infinity,
                delay: i * 0.5
              }}
              className="absolute w-2 h-2 bg-blue-400/30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-pixel text-xl text-slate-900 uppercase tracking-tight">
            No Active Quests Found
          </h2>
          <p className="text-slate-500 text-sm max-w-[240px] leading-relaxed">
            Your journey hasn't begun yet, traveler. Summon your first diet scroll to start your quest.
          </p>
        </div>
      </motion.div>

      <Link href="/import" className="w-full max-w-sm">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="pixel-button w-full py-6 flex items-center justify-center gap-3 font-pixel text-[11px] tracking-tight group relative overflow-hidden"
        >
          {/* Glowing pulse effect */}
          <motion.div
            animate={{ 
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="absolute inset-0 bg-blue-400/10 pointer-events-none"
          />
          
          <Scroll className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          START NEW QUEST
          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </Link>
    </div>
  );
}
