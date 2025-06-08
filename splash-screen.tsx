"use client"

import { useEffect, useState } from "react"
import { cn } from "../lib/utils"

export function SplashScreen() {
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
        "fixed inset-0 z-[60] flex flex-col items-center justify-center bg-gradient-to-br from-modern-darker via-modern-dark to-modern-gray transition-opacity duration-1000",
        isComplete ? "opacity-0 pointer-events-none" : "opacity-100",
      )}
    >
      {/* Stadium entrance effect */}
      <div className="relative mb-8 animate-stadium-entrance">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-modern-blue to-modern-blue-electric flex items-center justify-center animate-glow">
          <div className="text-4xl font-bold text-white">JW</div>
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 glow-text">JERSEY WORLD</h1>
      <p className="text-modern-blue-electric text-lg mb-8">Camisas Premium do Mundo Todo</p>

      <div className="font-mono text-white mb-4 h-6 text-center text-sm md:text-base">{loadingText}</div>

      <div className="w-72 md:w-80 h-1 bg-modern-gray rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-modern-blue to-modern-blue-electric transition-all duration-100 ease-out animate-glow"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-4 font-mono text-sm text-modern-blue-electric">{`${progress.toFixed(0)}%`}</div>
    </div>
  )
}
