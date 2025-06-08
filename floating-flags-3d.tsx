"use client"

import { Canvas } from "@react-three/fiber"
import { Float, Html, Environment, PerspectiveCamera } from "@react-three/drei"
import { useState, useRef, Suspense, useEffect } from "react"
import type { Mesh } from "three"

interface Region {
  id: string
  name: string
  flag: string
  position: [number, number, number]
  color: string
  teams: string[]
  description: string
  leagues: string[]
}

const regions: Region[] = [
  {
    id: "europe",
    name: "Europa Elite",
    flag: "🇪🇺",
    position: [0, 2, 0],
    color: "#0066FF",
    description: "O berço do futebol moderno",
    leagues: ["Premier League", "La Liga", "Serie A", "Bundesliga", "Ligue 1"],
    teams: [
      "Real Madrid",
      "Barcelona",
      "Manchester United",
      "Liverpool",
      "PSG",
      "Bayern Munich",
      "Juventus",
      "AC Milan",
    ],
  },
  {
    id: "south-america",
    name: "América do Sul",
    flag: "🌎",
    position: [-2.5, -1, 1],
    color: "#00FF00",
    description: "Paixão e magia do futebol",
    leagues: ["Brasileirão", "Libertadores", "Primera División"],
    teams: [
      "Flamengo",
      "São Paulo",
      "Boca Juniors",
      "River Plate",
      "Santos",
      "Palmeiras",
      "Corinthians",
      "Internacional",
    ],
  },
  {
    id: "north-america",
    name: "América do Norte",
    flag: "🇺🇸",
    position: [-3.5, 1, 0],
    color: "#FF0000",
    description: "Crescimento e inovação",
    leagues: ["MLS", "Liga MX"],
    teams: ["LA Galaxy", "Inter Miami", "NYCFC", "Atlanta United", "Club América", "Chivas"],
  },
  {
    id: "asia",
    name: "Ásia",
    flag: "🇯🇵",
    position: [3, 0, -1],
    color: "#FFD700",
    description: "Tradição e modernidade",
    leagues: ["J-League", "K-League", "Chinese Super League"],
    teams: ["Kashima Antlers", "FC Seoul", "Shanghai SIPG", "Urawa Red Diamonds"],
  },
  {
    id: "africa",
    name: "África",
    flag: "🌍",
    position: [1, -2.5, 1],
    color: "#FF6600",
    description: "Berço de grandes talentos",
    leagues: ["Egyptian Premier League", "South African Premier"],
    teams: ["Al Ahly", "Zamalek", "Raja Casablanca", "Kaizer Chiefs"],
  },
  {
    id: "oceania",
    name: "Oceania",
    flag: "🇦🇺",
    position: [2.5, -3, -2],
    color: "#9966FF",
    description: "Espírito competitivo único",
    leagues: ["A-League"],
    teams: ["Sydney FC", "Melbourne Victory", "Perth Glory", "Wellington Phoenix"],
  },
]

// Fallback 2D Component
function FallbackFlags2D({ onRegionSelect, selectedRegion }: FloatingFlags3DProps) {
  const [selectedRegionData, setSelectedRegionData] = useState<Region | null>(null)

  const handleRegionSelect = (region: Region) => {
    setSelectedRegionData(region)
    onRegionSelect(region.id)
  }

  return (
    <div className="relative w-full h-[700px] bg-gradient-to-br from-premium-black via-premium-black-light to-premium-black rounded-3xl overflow-hidden border border-premium-gold/30 shadow-2xl">
      <div className="absolute inset-0 p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-premium-gold mb-2">Explore as Regiões</h3>
          <p className="text-premium-white-soft">Clique nas bandeiras para descobrir os times</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 h-[500px] overflow-y-auto">
          {regions.map((region) => (
            <div
              key={region.id}
              onClick={() => handleRegionSelect(region)}
              className={`glass-premium p-6 rounded-2xl border cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedRegion === region.id || selectedRegionData?.id === region.id
                  ? "border-premium-gold/60 bg-premium-gold/10"
                  : "border-premium-gold/20 hover:border-premium-gold/40"
              }`}
            >
              <div className="text-center">
                <div className="text-4xl mb-3">{region.flag}</div>
                <h4 className="font-bold text-premium-gold text-lg mb-2">{region.name}</h4>
                <p className="text-premium-white-soft text-sm mb-3">{region.description}</p>
                <div className="text-xs text-premium-gold">{region.teams.length} times</div>
              </div>
            </div>
          ))}
        </div>

        {selectedRegionData && (
          <div className="absolute bottom-6 left-6 right-6 glass-premium p-6 rounded-2xl border border-premium-gold/40">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{selectedRegionData.flag}</span>
              <div>
                <h4 className="font-bold text-xl text-premium-gold">{selectedRegionData.name}</h4>
                <p className="text-premium-white-soft">{selectedRegionData.description}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {selectedRegionData.teams.slice(0, 8).map((team) => (
                <div
                  key={team}
                  className="text-sm text-premium-white bg-premium-gold/10 px-2 py-1 rounded border border-premium-gold/20 text-center"
                >
                  {team}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function FloatingFlag({
  region,
  isSelected,
  onSelect,
}: {
  region: Region
  isSelected: boolean
  onSelect: (region: Region) => void
}) {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1.5}>
      <group position={region.position}>
        {/* Main Flag */}
        <mesh
          ref={meshRef}
          onClick={() => onSelect(region)}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          position={[0, 0, 0]}
        >
          <planeGeometry args={[2, 1.3, 32, 32]} />
          <meshStandardMaterial
            color={region.color}
            transparent
            opacity={isSelected ? 0.95 : hovered ? 0.8 : 0.6}
            emissive={region.color}
            emissiveIntensity={isSelected ? 0.4 : hovered ? 0.3 : 0.15}
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>

        {/* Flag Pole */}
        <mesh position={[-1.1, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 2.5]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} metalness={0.2} />
        </mesh>

        {/* Flag Base */}
        <mesh position={[-1.1, -1.3, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.1]} />
          <meshStandardMaterial color="#444444" roughness={0.9} metalness={0.3} />
        </mesh>

        {/* Selection Ring */}
        {isSelected && (
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
            <ringGeometry args={[1.5, 1.8, 64]} />
            <meshBasicMaterial color={region.color} transparent opacity={0.7} />
          </mesh>
        )}

        {/* Enhanced Info Panel */}
        {(hovered || isSelected) && (
          <Html distanceFactor={6} position={[0, -1.8, 0]}>
            <div className="glass-premium p-6 rounded-2xl border border-premium-gold/30 backdrop-blur-md min-w-[320px] animate-scale-in shadow-2xl">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{region.flag}</span>
                <div>
                  <div className="font-bold text-premium-gold text-xl">{region.name}</div>
                  <div className="text-sm text-premium-white-soft italic">{region.description}</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-xs text-premium-gold font-semibold mb-2">PRINCIPAIS LIGAS</div>
                <div className="flex flex-wrap gap-1">
                  {region.leagues.slice(0, 3).map((league) => (
                    <div
                      key={league}
                      className="text-xs text-premium-white bg-premium-gold/20 px-2 py-1 rounded-full border border-premium-gold/30"
                    >
                      {league}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <div className="text-xs text-premium-gold font-semibold mb-2">
                  TIMES DISPONÍVEIS ({region.teams.length})
                </div>
                <div className="grid grid-cols-2 gap-1 max-h-24 overflow-y-auto">
                  {region.teams.slice(0, 6).map((team) => (
                    <div
                      key={team}
                      className="text-xs text-premium-white bg-premium-black/30 px-2 py-1 rounded border border-premium-gold/20"
                    >
                      {team}
                    </div>
                  ))}
                  {region.teams.length > 6 && (
                    <div className="text-xs text-premium-gold col-span-2 text-center py-1">
                      +{region.teams.length - 6} mais times
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => onSelect(region)}
                className="w-full bg-premium-gold hover:bg-premium-gold-light text-premium-black font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-sm"
              >
                Explorar Camisas
              </button>
            </div>
          </Html>
        )}
      </group>
    </Float>
  )
}

interface FloatingFlags3DProps {
  onRegionSelect: (region: string) => void
  selectedRegion: string | null
}

export function FloatingFlags3D({ onRegionSelect, selectedRegion }: FloatingFlags3DProps) {
  const [selectedRegionData, setSelectedRegionData] = useState<Region | null>(null)
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null)
  const [canvasError, setCanvasError] = useState(false)

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      setWebglSupported(!!gl)
    } catch (e) {
      setWebglSupported(false)
    }
  }, [])

  const handleRegionSelect = (region: Region) => {
    setSelectedRegionData(region)
    onRegionSelect(region.id)
  }

  const handleCanvasError = () => {
    setCanvasError(true)
  }

  // Show fallback if WebGL is not supported or Canvas errors
  if (webglSupported === false || canvasError) {
    return <FallbackFlags2D onRegionSelect={onRegionSelect} selectedRegion={selectedRegion} />
  }

  // Show loading while checking WebGL support
  if (webglSupported === null) {
    return (
      <div className="relative w-full h-[700px] bg-gradient-to-br from-premium-black via-premium-black-light to-premium-black rounded-3xl overflow-hidden border border-premium-gold/30 shadow-2xl flex items-center justify-center">
        <div className="text-premium-gold">Carregando experiência 3D...</div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-[700px] bg-gradient-to-br from-premium-black via-premium-black-light to-premium-black rounded-3xl overflow-hidden border border-premium-gold/30 shadow-2xl">
      <Canvas
        onError={handleCanvasError}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "default",
          failIfMajorPerformanceCaveat: false,
        }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={60} />

        {/* Enhanced Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#D4AF37" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#3B82F6" />
        <spotLight position={[0, 25, 0]} intensity={1.2} color="#FFFFFF" angle={0.3} penumbra={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} color="#FFD700" />

        {/* Environment */}
        <Suspense fallback={null}>
          <Environment preset="night" />
        </Suspense>

        <Suspense fallback={null}>
          {regions.map((region) => (
            <FloatingFlag
              key={region.id}
              region={region}
              isSelected={selectedRegion === region.id || selectedRegionData?.id === region.id}
              onSelect={handleRegionSelect}
            />
          ))}
        </Suspense>
      </Canvas>

      {/* Enhanced Controls */}
      <div className="absolute top-6 left-6">
        <button
          onClick={() => {
            setSelectedRegionData(null)
            onRegionSelect("")
          }}
          className="glass-premium p-4 rounded-xl text-premium-white hover:bg-white/10 transition-all duration-300 border border-premium-gold/20 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌍</span>
            <span className="font-semibold">Ver Todas</span>
          </div>
        </button>
      </div>

      {/* Enhanced Selected Region Info */}
      {selectedRegionData && (
        <div className="absolute bottom-6 left-6 right-6 glass-premium p-8 rounded-2xl animate-slide-up-elegant border border-premium-gold/40 shadow-2xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl">{selectedRegionData.flag}</span>
            <div>
              <h4 className="font-bold text-2xl text-premium-gold">{selectedRegionData.name}</h4>
              <p className="text-premium-white-soft italic">{selectedRegionData.description}</p>
              <p className="text-sm text-premium-gold">
                {selectedRegionData.teams.length} times • {selectedRegionData.leagues.length} ligas
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {selectedRegionData.teams.slice(0, 8).map((team) => (
              <div
                key={team}
                className="text-sm text-premium-white bg-premium-gold/10 px-3 py-2 rounded-lg border border-premium-gold/20 hover:bg-premium-gold/20 transition-all duration-300 cursor-pointer text-center font-medium"
              >
                {team}
              </div>
            ))}
          </div>

          {selectedRegionData.teams.length > 8 && (
            <div className="text-center mt-4">
              <span className="text-premium-gold font-semibold">
                +{selectedRegionData.teams.length - 8} times adicionais disponíveis
              </span>
            </div>
          )}
        </div>
      )}

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-4 right-4 w-2 h-2 bg-premium-gold rounded-full animate-pulse"></div>
        <div
          className="absolute top-12 right-8 w-1 h-1 bg-premium-gold rounded-full animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute top-8 right-12 w-1.5 h-1.5 bg-premium-gold rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
    </div>
  )
}
