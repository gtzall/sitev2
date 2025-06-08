"use client"

import { useEffect, useState } from "react"
import { cn } from "../lib/utils"

export function CinematicLoading() {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("INICIALIZANDO")
  const [isComplete, setIsComplete] = useState(false)
  const [showVideo, setShowVideo] = useState(true)

  useEffect(() => {
    const loadingTexts = [
      "CARREGANDO ESTÁDIO...",
      "PREPARANDO CAMISAS...",
      "CONECTANDO TIMES GLOBAIS...",
      "FINALIZANDO EXPERIÊNCIA...",
      "BEM-VINDO AO JERSEY WORLD",
    ]

    let textIndex = 0
    let interval: NodeJS.Timeout

    const textInterval = setInterval(() => {
      if (textIndex < loadingTexts.length) {
        setLoadingText(loadingTexts[textIndex])
        textIndex++
      }
    }, 800)

    interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          clearInterval(textInterval)
          setTimeout(() => {
            setShowVideo(false)
            setTimeout(() => setIsComplete(true), 1000)
          }, 1000)
          return 100
        }
        return prev + 1.2
      })
    }, 50)

    return () => {
      clearInterval(interval)
      clearInterval(textInterval)
    }
  }, [])

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center transition-all duration-1000",
        isComplete ? "opacity-0 pointer-events-none" : "opacity-100",
      )}
    >
      {/* Background Video */}
      {showVideo && (
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover filter grayscale"
            style={{ filter: "grayscale(100%) contrast(1.2)" }}
          >
            <source src="/videos/intro-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 loading-overlay"></div>
        </div>
      )}

      {/* Loading Content */}
      <div className="relative z-10 text-center animate-cinematic-fade">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-black cinematic-text mb-4 tracking-wider">JERSEY</h1>
          <h2 className="text-4xl md:text-6xl font-light text-premium-gold tracking-[0.3em]">WORLD</h2>
        </div>

        {/* Loading Text */}
        <div className="mb-8 animate-text-reveal">
          <p className="text-lg md:text-xl font-light text-premium-white-soft tracking-widest">{loadingText}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 md:w-96 mx-auto mb-6">
          <div className="h-0.5 bg-premium-gray-dark rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-premium-gold to-premium-gold-light transition-all duration-300 ease-out animate-glow-pulse"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Progress Percentage */}
        <div className="text-premium-gold font-mono text-sm tracking-wider">{progress.toFixed(0)}%</div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-premium-gold rounded-full animate-float-gentle opacity-60"></div>
      <div
        className="absolute bottom-32 right-20 w-1.5 h-1.5 bg-premium-gold-light rounded-full animate-float-gentle opacity-40"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-20 w-1 h-1 bg-premium-gold rounded-full animate-float-gentle opacity-50"
        style={{ animationDelay: "2s" }}
      ></div>
    </div>
  )
}
