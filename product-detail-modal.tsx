"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "../components/ui/button"
import { X, ChevronLeft, ChevronRight, Star, Heart, ShoppingCart, Ruler, Shield, Truck } from "lucide-react"
import { cn } from "../lib/utils"

interface ProductDetailModalProps {
  isOpen: boolean
  onClose: () => void
  product: any
  onAddToCart: (product: any) => void
  onBuyNow: (product: any) => void
}

export function ProductDetailModal({ isOpen, onClose, product, onAddToCart, onBuyNow }: ProductDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [isLiked, setIsLiked] = useState(false)

  const sizes = ["P", "M", "G", "GG", "XGG"]
  const sizeGuide = {
    P: { chest: "88-92cm", length: "68cm" },
    M: { chest: "96-100cm", length: "70cm" },
    G: { chest: "104-108cm", length: "72cm" },
    GG: { chest: "112-116cm", length: "74cm" },
    XGG: { chest: "120-124cm", length: "76cm" },
  }

  if (!isOpen || !product) return null

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="fixed inset-0 bg-premium-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-premium rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-premium-gold/20 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-premium-gold/20">
          <h2 className="text-2xl font-bold text-premium-white">{product.team}</h2>
          <button onClick={onClose} className="p-2 hover:bg-premium-gold/10 rounded-lg transition-colors duration-300">
            <X className="w-6 h-6 text-premium-white" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <Image
                src={product.images[currentImageIndex] || "/placeholder.svg"}
                alt={product.team}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 glass-premium p-2 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-premium-white" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 glass-premium p-2 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-premium-white" />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="bg-premium-gold text-premium-black text-xs px-3 py-1 rounded-full font-bold">
                    NOVO
                  </span>
                )}
                {discountPercentage > 0 && (
                  <span className="bg-premium-red text-premium-white text-xs px-3 py-1 rounded-full font-bold">
                    -{discountPercentage}%
                  </span>
                )}
              </div>

              {/* Like Button */}
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="absolute top-4 right-4 glass-premium p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                <Heart
                  className={cn("w-5 h-5", isLiked ? "fill-premium-red text-premium-red" : "text-premium-white")}
                />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={cn(
                    "relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300",
                    index === currentImageIndex ? "ring-2 ring-premium-gold scale-110" : "opacity-60 hover:opacity-100",
                  )}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.team} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-premium-gold text-sm font-semibold">{product.league}</span>
                <span className="text-premium-white-soft text-sm">•</span>
                <span className="text-premium-white-soft text-sm">{product.country}</span>
              </div>
              <h1 className="text-3xl font-bold text-premium-white mb-4">{product.team}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-premium-gold text-premium-gold" />
                  ))}
                </div>
                <span className="text-premium-white-soft text-sm">4.8 (127 avaliações)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-premium-gold font-bold text-3xl">R$ {product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-premium-gray-medium line-through text-xl">
                    R$ {product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-premium-white font-semibold mb-3">Tamanho</h3>
              <div className="grid grid-cols-5 gap-2 mb-4">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "p-3 rounded-lg border-2 transition-all duration-300 font-semibold",
                      selectedSize === size
                        ? "border-premium-gold bg-premium-gold/10 text-premium-gold"
                        : "border-premium-gray-dark text-premium-white-soft hover:border-premium-gold/50",
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* Size Guide */}
              {selectedSize && (
                <div className="glass-premium p-3 rounded-lg border border-premium-gold/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Ruler className="w-4 h-4 text-premium-gold" />
                    <span className="text-premium-white font-semibold">Tamanho {selectedSize}</span>
                  </div>
                  <div className="text-sm text-premium-white-soft">
                    <p>Peito: {sizeGuide[selectedSize as keyof typeof sizeGuide]?.chest}</p>
                    <p>Comprimento: {sizeGuide[selectedSize as keyof typeof sizeGuide]?.length}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-premium-gold" />
                <span className="text-premium-white-soft">Qualidade AAA+ Garantida</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-premium-gold" />
                <span className="text-premium-white-soft">Entrega em 3-7 dias úteis</span>
              </div>
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-premium-gold" />
                <span className="text-premium-white-soft">Material premium oficial</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={() => onBuyNow(product)}
                className="w-full btn-premium bg-premium-gold hover:bg-premium-gold-light text-premium-black font-semibold py-4 text-lg rounded-xl"
                disabled={!selectedSize}
              >
                Comprar Agora
              </Button>
              <Button
                onClick={() => onAddToCart({ ...product, selectedSize })}
                variant="outline"
                className="w-full border-premium-gold text-premium-gold hover:bg-premium-gold hover:text-premium-black py-4 text-lg rounded-xl"
                disabled={!selectedSize}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Adicionar ao Carrinho
              </Button>
            </div>

            {/* Product Description */}
            <div className="glass-premium p-4 rounded-xl border border-premium-gold/20">
              <h3 className="text-premium-white font-semibold mb-3">Descrição do Produto</h3>
              <p className="text-premium-white-soft text-sm leading-relaxed">
                Camisa oficial do {product.team} temporada 2024/25. Confeccionada com materiais premium de alta
                qualidade, oferece conforto excepcional e durabilidade. Design autêntico com todos os detalhes oficiais,
                incluindo escudo bordado e tecnologia Dri-FIT para máximo desempenho.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
