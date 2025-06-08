"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingCart, Eye, Check } from 'lucide-react'
import { cn } from "../../lib/utils"

interface IconButtonProps {
  icon: React.ReactNode
  activeIcon?: React.ReactNode
  label?: string
  onClick: () => void
  isActive?: boolean
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function IconButton({
  icon,
  activeIcon,
  label,
  onClick,
  isActive = false,
  variant = 'primary',
  size = 'md',
  className,
}: IconButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  
  // Determine styles based on variant
  const variantStyles = {
    primary: "bg-premium-gold text-premium-black hover:bg-premium-gold-light",
    secondary: "bg-premium-blue text-white hover:bg-premium-blue-light",
    ghost: "bg-transparent text-premium-white hover:bg-premium-white/10",
    outline: "bg-transparent border border-premium-gold text-premium-gold hover:bg-premium-gold/10"
  }
  
  // Determine size styles
  const sizeStyles = {
    sm: "p-1.5 rounded-md",
    md: "p-2 rounded-lg",
    lg: "p-3 rounded-xl"
  }
  
  const handleClick = () => {
    setIsPressed(true)
    setShowFeedback(true)
    
    // Reset pressed state after animation
    setTimeout(() => {
      setIsPressed(false)
    }, 150)
    
    // Hide feedback after animation
    setTimeout(() => {
      setShowFeedback(false)
    }, 1000)
    
    onClick()
  }
  
  return (
    <motion.button
      className={cn(
        "relative flex items-center justify-center transition-all",
        variantStyles[variant],
        sizeStyles[size],
        isActive && "ring-2 ring-premium-gold ring-opacity-50",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0.9 }}
      animate={{ 
        opacity: 1,
        scale: isPressed ? 0.9 : 1,
        boxShadow: isHovered 
          ? "0px 4px 8px rgba(255, 193, 7, 0.3)" 
          : "0px 0px 0px rgba(255, 193, 7, 0)"
      }}
      transition={{ 
        duration: 0.15,
        type: "spring",
        stiffness: 500,
        damping: 15
      }}
    >
      {/* Icon with animation */}
      <motion.div
        animate={{ 
          rotate: isPressed ? [0, -10, 10, 0] : 0,
          scale: isPressed ? [1, 1.2, 1] : 1
        }}
        transition={{ duration: 0.3 }}
      >
        {isActive && activeIcon ? activeIcon : icon}
      </motion.div>
      
      {/* Optional label */}
      {label && (
        <span className="ml-2 text-sm font-medium">{label}</span>
      )}
      
      {/* Click feedback animation */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            className="absolute inset-0 rounded-full bg-white"
            initial={{ opacity: 0.7, scale: 0.5 }}
            animate={{ opacity: 0, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  )
}
