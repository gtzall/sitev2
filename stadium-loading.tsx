
"use client"

import { useEffect, useState } from "react"
import { cn } from "../lib/utils"

export function StadiumLoading() {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("INICIALIZANDO SISTEMA")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const loadingTexts = [
      "CARREGANDO ESTÁDIO...",
      "PREPARANDO CAMISAS...",
      "CONECTANDO TIMES GLOBAIS...",
      "SISTEMA PRONTO!",
    ]

    let textIndex = 0
    let interval: NodeJS.Timeout

    const textInterval = setInterval(() => {
      if (textIndex < loadingTexts.length) {
        setLoadingText(loadingTexts[textIndex])
        textIndex++
      }
    }, 700)

    interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          clearInterval(textInterval)
          setTimeout(() => setIsComplete(true), 800)
          return 100
        }
        return prev + 1.5
      })
    }, 40)

    return () => {
      clearInterval(interval)
      clearInterval(textInterval)
    }
  }, [])

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] flex items-end justify-center transition-opacity duration-1000",
        isComplete ? "opacity-0 pointer-events-none" : "opacity-100",
      )}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: "grayscale(100%) contrast(1.2) brightness(0.4)",
        }}
      >
        <source src="/videos/intro-video.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

      <div className="w-full max-w-md mx-auto px-4 sm:px-6 pb-8 sm:pb-12 md:pb-16 lg:pb-20 z-10">
        <div className="font-mono text-white text-center mb-4 sm:mb-6">
          <div className="text-xs sm:text-sm md:text-base lg:text-lg font-medium tracking-wider">{loadingText}</div>
        </div>

        <div className="w-full mb-3 sm:mb-4">
          <div className="h-0.5 sm:h-1 md:h-1.5 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 transition-all duration-150 ease-out"
              style={{
                width: `${progress}%`,
                boxShadow: "0 0 8px rgba(251, 191, 36, 0.6), 0 0 16px rgba(251, 191, 36, 0.3)",
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs sm:text-sm">
          <div className="font-mono text-yellow-400 font-semibold">{`${progress.toFixed(0)}%`}</div>
          <div className="font-mono text-white/60 text-right">Carregando...</div>
        </div>

        <div className="flex justify-center mt-3 sm:mt-4 space-x-1">
          {[0, 1, 2, 3].map((dot) => (
            <div
              key={dot}
              className={cn(
                "w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300",
                progress > dot * 25 ? "bg-yellow-400 shadow-sm shadow-yellow-400/50" : "bg-white/30",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

