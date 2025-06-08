"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

interface CategoryCardProps {
  title: string
  description: string
  image: string
  playerImage?: string
  color?: string
  onClick?: () => void
}

export function CategoryCard({
  title,
  description,
  image,
  playerImage,
  color = "#D4AF37",
  onClick
}: CategoryCardProps) {
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
      className="relative w-full h-[400px] md:h-[450px] rounded-2xl overflow-hidden cursor-pointer group"
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
      <div className="absolute inset-0 bg-gradient-to-t from-premium-black via-transparent to-transparent opacity-80" />
      
      {/* Player Image with Parallax (if provided) */}
      {playerImage && (
        <motion.div
          className="absolute right-0 bottom-0 h-[90%] w-auto z-10"
          style={{
            filter: 'drop-shadow(0px 0px 10px rgba(0,0,0,0.5))'
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
            width={350} 
            height={450}
            className="h-full w-auto object-contain object-bottom"
            priority
          />
          
          {/* Strategic overlay to hide watermarks */}
          <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-gradient-to-t from-premium-black to-transparent" />
          <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[20%] rounded-full bg-premium-gold/30 blur-2xl" />
        </motion.div>
      )}
      
      {/* Content */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-20">
        <motion.div
          animate={{
            y: isHovered ? -5 : 0
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          <h3 
            className="text-3xl md:text-4xl font-bold mb-2"
            style={{ color }}
          >
            {title}
          </h3>
          <p className="text-premium-white-soft mb-6 max-w-[70%]">{description}</p>
          
          <motion.div
            className="inline-flex items-center gap-2 text-premium-white font-medium"
            animate={{
              x: isHovered ? 5 : 0
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <span>Ver coleção</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
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
export function CategoryShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CategoryCard
        title="Europeias"
        description="Camisas oficiais dos maiores clubes da Europa"
        image="/images/compositions/europeias_card.png"
        playerImage="/images/new_promotional/cr7_united_front.jpeg"
        color="#4fc3f7"
      />
      <CategoryCard
        title="Brasileiras"
        description="Camisas dos principais times do Brasil"
        image="/images/compositions/brasileiras_card.png"
        playerImage="/images/new_promotional/neymar_santos.jpeg"
        color="#4caf50"
      />
      <CategoryCard
        title="Retrôs"
        description="Modelos clássicos que marcaram época"
        image="/images/compositions/retros_card.png"
        playerImage="/images/new_promotional/cr7_united_back.jpeg"
        color="#ff9800"
      />
      <CategoryCard
        title="Seleções"
        description="Camisas das principais seleções do mundo"
        image="/images/compositions/selecoes_card.png"
        playerImage="/images/new_promotional/ronaldinho_brazil.jpeg"
        color="#e91e63"
      />
    </div>
  )
}
