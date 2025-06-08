"use client"

import { cn } from "../lib/utils"

import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Play, Pause, ShoppingBag, Users } from "lucide-react"

export function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "CAMISAS PREMIUM",
      subtitle: "Qualidade AAA+ Garantida",
      description: "As melhores réplicas do mercado com materiais premium",
    },
    {
      title: "TIMES DO MUNDO",
      subtitle: "Mais de 500 Clubes",
      description: "Encontre a camisa do seu time favorito de qualquer lugar",
    },
    {
      title: "ENTREGA RÁPIDA",
      subtitle: "3-7 Dias Úteis",
      description: "Receba em casa com segurança e agilidade",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const handleShopClick = () => {
    const productSection = document.getElementById("categories-section")
    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-modern-darker via-modern-dark to-modern-gray">
      {/* Stadium background effect */}
      <div className="absolute inset-0 stadium-lights"></div>

      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-modern-blue to-transparent animate-pulse"></div>
      </div>

      {/* Video controls */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute top-4 right-4 z-10 p-3 glass rounded-full text-white hover:bg-white/10 transition-colors"
      >
        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </button>

      {/* Hero content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-4 glow-text">{slides[currentSlide].title}</h1>
          <h2 className="text-xl md:text-3xl text-modern-blue-electric mb-2 font-semibold">
            {slides[currentSlide].subtitle}
          </h2>
          <p className="text-base md:text-lg text-modern-gray-text mb-8 max-w-2xl">
            {slides[currentSlide].description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
          <Button
            onClick={handleShopClick}
            size="lg"
            className="bg-modern-blue hover:bg-modern-blue-light text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg animate-glow"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            EXPLORAR CAMISAS
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-modern-blue-electric text-modern-blue-electric hover:bg-modern-blue-electric hover:text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg"
          >
            <Users className="w-5 h-5 mr-2" />
            VER TIMES
          </Button>
        </div>

        {/* Slide indicators */}
        <div className="flex gap-2 mt-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-colors cursor-pointer",
                index === currentSlide ? "bg-modern-blue-electric" : "bg-modern-gray-light",
              )}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-modern-blue rounded-full animate-float opacity-60"></div>
      <div
        className="absolute bottom-32 right-20 w-3 h-3 bg-modern-blue-electric rounded-full animate-float opacity-40"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-20 w-2 h-2 bg-modern-accent rounded-full animate-float opacity-50"
        style={{ animationDelay: "2s" }}
      ></div>
    </div>
  )
}
