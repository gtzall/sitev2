"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, ShoppingBag } from 'lucide-react'

interface PromoBannerProps {
  title: string
  subtitle: string
  description: string
  buttonText: string
  image: string
  playerImage?: string
  color?: string
  onClick?: () => void
}

export function PromoBanner({
  title,
  subtitle,
  description,
  buttonText,
  image,
  playerImage,
  color = "#D4AF37",
  onClick
}: PromoBannerProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  
  // Handle mouse movement for parallax effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5
    })
  }

  return (
    <motion.div
      className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden cursor-pointer group"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        animate={{
          x: isHovered ? mousePosition.x * -20 : 0,
          y: isHovered ? mousePosition.y * -20 : 0
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-premium-black via-premium-black/70 to-transparent" />
      
      {/* Player Image with Parallax (if provided) */}
      {playerImage && (
        <motion.div
          className="absolute right-0 bottom-0 h-[95%] w-auto z-10"
          style={{
            filter: 'drop-shadow(0px 0px 15px rgba(0,0,0,0.5))'
          }}
          animate={{
            x: isHovered ? mousePosition.x * 30 : 0,
            y: isHovered ? mousePosition.y * 15 : 0,
            scale: isHovered ? 1.05 : 1
          }}
          transition={{ type: 'spring', stiffness: 150, damping: 15 }}
        >
          <Image 
            src={playerImage} 
            alt={title} 
            width={400} 
            height={500}
            className="h-full w-auto object-contain object-bottom"
            priority
          />
          
          {/* Strategic overlay to hide watermarks */}
          <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-gradient-to-t from-premium-black to-transparent" />
          <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[20%] rounded-full bg-premium-gold/30 blur-2xl" />
          
          {/* Additional strategic elements to hide watermarks */}
          <div className="absolute bottom-[5%] right-[5%] w-[60px] h-[60px] rounded-full bg-premium-gold/80 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-premium-black" />
          </div>
        </motion.div>
      )}
      
      {/* Content */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-center z-20 max-w-[60%]">
        <motion.div
          animate={{
            y: isHovered ? -5 : 0
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          <div 
            className="text-sm font-semibold mb-2 inline-block px-3 py-1 rounded-full"
            style={{ backgroundColor: `${color}30`, color: color }}
          >
            {subtitle}
          </div>
          
          <h3 
            className="text-3xl md:text-5xl font-bold mb-3"
            style={{ color }}
          >
            {title}
          </h3>
          
          <p className="text-premium-white-soft mb-6 max-w-[90%]">{description}</p>
          
          <motion.button
            className="px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
            style={{ backgroundColor: color, color: '#000' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{buttonText}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
      
      {/* Animated border on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          boxShadow: isHovered 
            ? `0 0 0 2px ${color}, 0 0 30px rgba(212, 175, 55, 0.5)` 
            : `0 0 0 0px ${color}, 0 0 0px rgba(212, 175, 55, 0)`
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 pointer-events-none"
        animate={{
          opacity: isHovered ? 0.1 : 0,
          left: isHovered ? '100%' : '-100%'
        }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}

// Example usage with player images
export function PromoShowcase() {
  return (
    <div className="space-y-6">
      <PromoBanner
        title="PAGUE 2 LEVE 3"
        subtitle="Oferta Especial"
        description="Promoção por tempo limitado em camisas selecionadas. Aproveite!"
        buttonText="Ver Ofertas"
        image="/images/compositions/promo_banner.png"
        playerImage="/images/new_promotional/ronaldinho_brazil.jpeg"
        color="#FFD700"
      />
      <PromoBanner
        title="NOVOS LANÇAMENTOS"
        subtitle="Recém Chegados"
        description="Confira as novas camisas da temporada 2025/2026"
        buttonText="Ver Coleção"
        image="/images/compositions/lancamentos_banner.png"
        playerImage="/images/new_promotional/mbappe_madrid.jpeg"
        color="#4fc3f7"
      />
    </div>
  )
}
