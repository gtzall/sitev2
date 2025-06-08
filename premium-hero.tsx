"use client"

import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { Play, Pause, ShoppingBag, Globe, Star } from "lucide-react"
import { cn } from "../../lib/utils"

export function PremiumHero() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)

  const heroSlides = [
    {
      title: "CAMISAS PREMIUM",
      subtitle: "Qualidade AAA+ Garantida",
      description: "Experimente as melhores camisas de futebol com qualidade inigualável e designs autênticos",
      cta: "EXPLORAR COLEÇÃO",
    },
    {
      title: "TIMES GLOBAIS",
      subtitle: "Mais de 500 Clubes",
      description: "Da Premier League ao Brasileirão, encontre a camisa do seu time de qualquer parte do mundo",
      cta: "DESCOBRIR TIMES",
    },
    {
      title: "ENTREGA RÁPIDA",
      subtitle: "3-7 Dias Úteis",
      description: "Serviço de envio premium garantindo que sua camisa chegue rápido e com segurança",
      cta: "COMPRAR AGORA",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleExploreClick = () => {
    const mapSection = document.getElementById("world-map-section")
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative h-screen overflow-hidden bg-premium-black">
      <div className="absolute inset-0">
        <iframe
          className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
          src="https://www.youtube.com/embed/NGpC2D2SqTw?autoplay=1&mute=1&loop=1&playlist=NGpC2D2SqTw&controls=0&showinfo=0&modestbranding=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <div className="absolute inset-0 video-overlay"></div>
      </div>

      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute top-6 right-6 z-20 p-3 glass-premium rounded-full text-premium-white hover:bg-white/10 transition-all duration-300"
      >
        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </button>

      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-4">
          <div className="animate-slide-up-elegant">
            <h1 className="text-5xl md:text-8xl font-black mb-6 cinematic-text tracking-wider">
              {heroSlides[currentSlide].title}
            </h1>

            <h2 className="text-2xl md:text-4xl font-light text-premium-gold mb-4 tracking-wide">
              {heroSlides[currentSlide].subtitle}
            </h2>

            <p className="text-lg md:text-xl text-premium-white-soft mb-12 max-w-2xl mx-auto leading-relaxed">
              {heroSlides[currentSlide].description}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                onClick={handleExploreClick}
                size="lg"
                className="btn-premium bg-premium-gold hover:bg-premium-gold-light text-premium-black px-8 py-4 text-lg font-semibold tracking-wide rounded-none"
              >
                <ShoppingBag className="w-5 h-5 mr-3" />
                {heroSlides[currentSlide].cta}
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-premium-gold text-premium-gold hover:bg-premium-gold hover:text-premium-black px-8 py-4 text-lg font-semibold tracking-wide rounded-none transition-all duration-300"
              >
                <Globe className="w-5 h-5 mr-3" />
                EXPLORAR MAPA
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              index === currentSlide ? "bg-premium-gold scale-125" : "bg-premium-white/30 hover:bg-premium-white/50",
            )}
          />
        ))}
      </div>

      <div className="absolute top-1/4 left-10 animate-float-gentle">
        <Star className="w-6 h-6 text-premium-gold opacity-60" />
      </div>
      <div className="absolute bottom-1/4 right-16 animate-float-gentle" style={{ animationDelay: "1s" }}>
        <Globe className="w-8 h-8 text-premium-gold opacity-40" />
      </div>
      <div className="absolute top-1/3 right-20 animate-float-gentle" style={{ animationDelay: "2s" }}>
        <ShoppingBag className="w-5 h-5 text-premium-gold opacity-50" />
      </div>
    </section>
  )
}
