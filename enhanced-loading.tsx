"use client"

import { useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float } from "@react-three/drei"
import { cn } from "../lib/utils"
import { Suspense } from "react"

function FloatingJersey({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh position={position}>
        <boxGeometry args={[0.8, 1, 0.1]} />
        <meshStandardMaterial color="#D4AF37" />
      </mesh>
    </Float>
  )
}

function FloatingBall({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
      <mesh position={position}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
    </Float>
  )
}

function Logo3D() {
  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh>
        <boxGeometry args={[2, 0.5, 0.2]} />
        <meshStandardMaterial color="#D4AF37" />
      </mesh>
    </Float>
  )
}

export function EnhancedLoading() {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("INICIALIZANDO")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const loadingTexts = [
      "CARREGANDO ESTÁDIO...",
      "PREPARANDO CAMISAS...",
      "CONECTANDO TIMES GLOBAIS...",
      "FINALIZANDO EXPERIÊNCIA...",
      "BEM-VINDO AO JERSEY 2025",
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
          setTimeout(() => setIsComplete(true), 1000)
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
        "fixed inset-0 z-[100] flex flex-col items-center justify-center transition-all duration-1000 bg-gradient-to-br from-premium-black via-premium-black-light to-premium-gray-dark",
        isComplete ? "opacity-0 pointer-events-none" : "opacity-100",
      )}
    >
      {/* 3D Scene Background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#D4AF37" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3B82F6" />

          <Suspense fallback={null}>
            {/* Floating Elements */}
            <FloatingJersey position={[-4, 2, -2]} />
            <FloatingJersey position={[4, -2, -3]} />
            <FloatingBall position={[-3, -1, -1]} />
            <FloatingBall position={[3, 1, -2]} />
            <FloatingBall position={[0, 3, -4]} />

            {/* 3D Logo */}
            <group position={[0, 0, 0]}>
              <Logo3D />
            </group>
          </Suspense>

          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Loading Content */}
      <div className="relative z-10 text-center animate-cinematic-fade">
        {/* Year Badge */}
        <div className="mb-8">
          <div className="inline-block bg-premium-gold text-premium-black px-6 py-2 rounded-full font-bold text-2xl tracking-wider animate-glow-pulse">
            2025
          </div>
        </div>

        {/* Loading Text */}
        <div className="mb-8 animate-text-reveal">
          <p className="text-lg md:text-xl font-light text-premium-white-soft tracking-widest">{loadingText}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 md:w-96 mx-auto mb-6">
          <div className="h-1 bg-premium-gray-dark rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-premium-gold to-premium-gold-light transition-all duration-300 ease-out animate-glow-pulse"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Progress Percentage */}
        <div className="text-premium-gold font-mono text-sm tracking-wider">{progress.toFixed(0)}%</div>

        {/* Location Badge */}
        <div className="mt-8">
          <p className="text-premium-white-soft text-sm">📍 Guarulhos, São Paulo</p>
        </div>
      </div>

      {/* Floating Particles */}
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
