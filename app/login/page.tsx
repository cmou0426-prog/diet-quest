'use client'

import { useState, use } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { login, signup } from './actions'
import { Mail, Lock, Gamepad2, AlertCircle } from 'lucide-react'

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>
}) {
  const { message } = use(searchParams)
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = (action: (formData: FormData) => Promise<void>) => {
    return async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setIsPending(true)
      const formData = new FormData(e.currentTarget)
      await action(formData)
      setIsPending(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020617] overflow-hidden">
      {/* Retro Grid Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          transform: 'perspective(500px) rotateX(60deg) translateY(-100px)',
          transformOrigin: 'top',
        }}
      />
      
      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-[128px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <div className="glass-panel pixel-border p-8 backdrop-blur-xl bg-slate-900/40 border-slate-700/50">
          <div className="flex flex-col items-center mb-8">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0] 
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 4,
                ease: "easeInOut"
              }}
              className="w-16 h-16 bg-indigo-500 flex items-center justify-center pixel-border mb-4"
            >
              <Gamepad2 className="text-white w-8 h-8" />
            </motion.div>
            <h1 className="text-3xl font-pixel text-white tracking-tighter text-center">
              PLAYER 1 LOGIN
            </h1>
            <p className="text-slate-400 font-retro text-xs mt-2 uppercase tracking-widest">
              Ready to start your quest?
            </p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-indigo-400 font-retro text-xs uppercase tracking-wider flex items-center gap-2">
                <Mail size={14} /> Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full bg-slate-950/50 border-2 border-slate-700 p-3 text-white font-retro focus:border-indigo-500 outline-none transition-colors"
                placeholder="HERO@EXAMPLE.COM"
              />
            </div>

            <div className="space-y-2">
              <label className="text-indigo-400 font-retro text-xs uppercase tracking-wider flex items-center gap-2">
                <Lock size={14} /> Password
              </label>
              <input
                name="password"
                type="password"
                required
                className="w-full bg-slate-950/50 border-2 border-slate-700 p-3 text-white font-retro focus:border-indigo-500 outline-none transition-colors"
                placeholder="********"
              />
            </div>

            {message && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-3 bg-red-500/10 border-2 border-red-500/50 flex items-center gap-3"
              >
                <AlertCircle className="text-red-500 w-5 h-5 flex-shrink-0" />
                <p className="text-red-500 font-retro text-[10px] uppercase">
                  {message}
                </p>
              </motion.div>
            )}

            <div className="grid grid-cols-2 gap-4 pt-2">
              <button
                formAction={login}
                disabled={isPending}
                className="pixel-button bg-indigo-600 py-3 font-pixel text-sm uppercase disabled:opacity-50"
              >
                {isPending ? 'WAIT...' : 'LOGIN'}
              </button>
              <button
                formAction={signup}
                disabled={isPending}
                className="pixel-button bg-slate-700 py-3 font-pixel text-sm uppercase disabled:opacity-50"
              >
                SIGN UP
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 font-retro text-[10px] uppercase">
              DietQuest v0.1.0 - Alpha Phase
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
