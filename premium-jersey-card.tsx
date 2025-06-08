"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Button } from "../components/ui/button"
import { ChevronLeft, ChevronRight, Heart, ShoppingCart, Eye, Star } from "lucide-react"
import { cn } from "../lib/utils"
import { motion } from "framer-motion"

interface JerseyCardProps {
  id: number
  team: string
  league: string
  price: number
  originalPrice?: number
  images: string[]
  country: string
  isNew?: boolean
  category: string
  rating?: number
  reviews?: number
  onSelect: (team: string) => void
  onAddToCart: (jersey: any) => void
}

export function PremiumJerseyCard({
  id,
  team,
  league,
  price,
  originalPrice,
  images,
  country,
  isNew,
  category,
  rating = 4.8,
  reviews = 127,
  onSelect,
  onAddToCart,
}: JerseyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    onAddToCart({
      id,
      team,
      league,
      price,
      originalPrice,
      image: images[0],
      country,
      category,
    })
  }

  const discountPercentage = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  return (
    <motion.div
      className={cn(
        "premium-card glass-premium rounded-2xl overflow-hidden border border-premium-gold/20 cursor-pointer group",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(team)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03, boxShadow: "0px 8px 25px rgba(255, 193, 7, 0.15)" }}
    >
      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={images[currentImageIndex] || "/placeholder.svg?height=400&width=400"}
          alt={`${team} Jersey`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-premium-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Image Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 glass-premium p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20"
            >
              <ChevronLeft className="w-4 h-4 text-premium-white" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 glass-premium p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20"
            >
              <ChevronRight className="w-4 h-4 text-premium-white" />
            </button>
          </>
        )}

        {/* Image Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all duration-300",
                  index === currentImageIndex ? "bg-premium-gold scale-125" : "bg-premium-white/50",
                )}
              />
            ))}
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <span className="bg-premium-gold text-premium-black text-xs px-3 py-1 rounded-full font-bold tracking-wide">
              NOVO
            </span>
          )}
          {originalPrice && (
            <span className="bg-premium-red text-premium-white text-xs px-3 py-1 rounded-full font-bold tracking-wide">
              -{discountPercentage}%
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsLiked(!isLiked)
            }}
            className="glass-premium p-2 rounded-full transition-all duration-300 hover:bg-white/20"
          >
            <Heart className={cn("w-4 h-4", isLiked ? "fill-premium-red text-premium-red" : "text-premium-white")} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onSelect(team)
            }}
            className="glass-premium p-2 rounded-full transition-all duration-300 hover:bg-white/20"
          >
            <Eye className="w-4 h-4 text-premium-white" />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-premium-gold text-sm font-semibold tracking-wide">{league}</span>
          <span className="text-premium-white-soft text-xs">{country}</span>
        </div>

        {/* Team Name */}
        <h3 className="text-premium-white font-bold text-xl mb-3 group-hover:text-premium-gold transition-colors duration-300">
          {team}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-3 h-3",
                  i < Math.floor(rating) ? "fill-premium-gold text-premium-gold" : "text-premium-gray-medium",
                )}
              />
            ))}
          </div>
          <span className="text-premium-white-soft text-sm">{rating}</span>
          <span className="text-premium-gray-medium text-xs">({reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-premium-gold font-bold text-2xl">R$ {price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-premium-gray-medium line-through text-lg">R$ {originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          className="w-full btn-premium bg-premium-gold hover:bg-premium-gold-light text-premium-black font-semibold py-3 rounded-xl transition-all duration-300"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Adicionar ao Carrinho
        </Button>
      </div>
    </div>
  )
}
