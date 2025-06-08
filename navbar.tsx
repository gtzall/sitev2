"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ThemeSwitcher } from './ui/theme-switcher'
import { useTheme } from 'next-themes'

interface NavbarProps {
  className?: string
}

export function Navbar({ className }: NavbarProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 backdrop-blur-md transition-colors ${
        isDark 
          ? 'bg-premium-black/80 border-b border-premium-gold/10' 
          : 'bg-premium-white/80 border-b border-premium-blue/10'
      } ${className}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src="/sport_ag_logo_ag_only.png" 
            alt="Sport AG" 
            className="h-8 w-auto"
          />
          <span className={`font-bold text-xl ${
            isDark ? 'text-premium-white' : 'text-premium-black'
          }`}>
            Sport AG
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
        </div>
      </div>
    </motion.header>
  )
}
