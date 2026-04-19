"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Scroll, Sword, Trophy } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Gamepad2 },
  { href: "/plan", label: "My Scroll", icon: Scroll },
  { href: "/import", label: "Import", icon: Sword },
  { href: "/progress", label: "Stats", icon: Trophy },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md">
      <div className="glass-panel pixel-border flex items-center justify-around p-2 bg-white/40">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center justify-center p-3 transition-colors group"
            >
              {/* Active Indicator Glow */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-health/10 rounded-lg -z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </AnimatePresence>

              <motion.div
                animate={isActive ? { y: -2, scale: 1.1 } : { y: 0, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`${
                  isActive ? "text-health" : "text-slate-500 group-hover:text-slate-700"
                } transition-colors`}
              >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </motion.div>

              <span
                className={`text-[10px] mt-1 font-pixel uppercase tracking-tighter ${
                  isActive ? "text-health" : "text-slate-500"
                }`}
              >
                {item.label}
              </span>

              {/* Pixel Dot Indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeDot"
                  className="absolute -top-1 w-1.5 h-1.5 bg-health shadow-[0_0_8px_rgba(76,175,80,0.6)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
