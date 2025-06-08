"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'

interface ThemeSwitcherProps {
  className?: string
}

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isHovered, setIsHovered] = useState(false)
  
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return null
  }
  
  const isDark = theme === 'dark'
  
  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }
  
  return (
    <motion.button
      className={`relative flex items-center justify-center p-2 rounded-full transition-all ${className}`}
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0.9 }}
      animate={{ 
        opacity: 1,
        scale: 1,
        backgroundColor: isHovered 
          ? isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
          : 'transparent'
      }}
      transition={{ 
        duration: 0.2,
        type: "spring",
        stiffness: 500,
        damping: 15
      }}
      aria-label={isDark ? "Mudar para modo claro" : "Mudar para modo escuro"}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isDark ? 'dark' : 'light'}
          initial={{ y: -20, opacity: 0, rotate: -30 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-premium-gold" />
          ) : (
            <Moon className="w-5 h-5 text-premium-blue" />
          )}
        </motion.div>
      </AnimatePresence>
      
      {/* Glow effect */}
      <motion.div
        className={`absolute inset-0 rounded-full ${
          isDark ? 'bg-premium-gold' : 'bg-premium-blue'
        }`}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isHovered ? 0.15 : 0,
          scale: isHovered ? 1.2 : 1
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  )
}
