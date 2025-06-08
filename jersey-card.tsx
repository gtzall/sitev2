"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "../components/ui/button"
import { ChevronLeft, ChevronRight, Heart, ShoppingCart, Eye } from "lucide-react"
import { cn } from "../lib/utils"

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
  onSelect: (team: string) => void
  onAddToCart: (jersey: any) => void
}

export function JerseyCard({
  id,
  team,
  league,
  price,
  originalPrice,
  images,
  country,
  isNew,
  category,
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

  return (
    <div
      className={cn(
        "glass rounded-xl overflow-hidden border border-modern-blue/20 transition-all duration-300 cursor-pointer group",
        isHovered && "border-modern-blue-electric/60 shadow-lg shadow-modern-blue/20 transform scale-105",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(team)}
    >
      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={images[currentImageIndex] || "/placeholder.svg?height=400&width=400"}
          alt={`${team} Jersey`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {/* Image Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 glass p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 glass p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </>
        )}

        {/* Image Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-colors",
                  index === currentImageIndex ? "bg-modern-blue-electric" : "bg-white/50",
                )}
              />
            ))}
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isNew && <span className="bg-modern-accent text-white text-xs px-2 py-1 rounded-full font-bold">NOVO</span>}
          {originalPrice && (
            <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-bold">OFERTA</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsLiked(!isLiked)
            }}
            className="glass p-2 rounded-full transition-colors hover:bg-white/20"
          >
            <Heart className={cn("w-4 h-4", isLiked ? "fill-red-500 text-red-500" : "text-white")} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onSelect(team)
            }}
            className="glass p-2 rounded-full transition-colors hover:bg-white/20"
          >
            <Eye className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-modern-blue-electric text-sm font-medium">{league}</span>
          <span className="text-modern-gray-text text-xs">{country}</span>
        </div>

        <h3 className="text-white font-bold text-lg mb-2 group-hover:text-modern-blue-electric transition-colors">
          {team}
        </h3>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-modern-blue-electric font-bold text-xl">R$ {price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-modern-gray-text line-through text-sm">R$ {originalPrice.toFixed(2)}</span>
            )}
          </div>
          {originalPrice && (
            <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
              -{Math.round(((originalPrice - price) / originalPrice) * 100)}%
            </span>
          )}
        </div>

        <Button className="w-full bg-modern-blue hover:bg-modern-blue-light text-white" onClick={handleAddToCart}>
          <ShoppingCart className="w-4 h-4 mr-2" />
          Adicionar ao Carrinho
        </Button>
      </div>
    </div>
  )
}
