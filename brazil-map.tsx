"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "../lib/utils"

interface Region {
  id: string
  name: string
  teams: string[]
  position: { x: number; y: number }
}

const regions: Region[] = [
  {
    id: "norte",
    name: "Norte",
    teams: ["Remo", "Paysandu", "Manaus FC", "Rio Branco"],
    position: { x: 45, y: 25 },
  },
  {
    id: "nordeste",
    name: "Nordeste",
    teams: ["Bahia", "Sport", "Fortaleza", "Ceará", "Vitória", "Náutico", "Santa Cruz", "CRB"],
    position: { x: 75, y: 30 },
  },
  {
    id: "centro-oeste",
    name: "Centro-Oeste",
    teams: ["Goiás", "Atlético Goianiense", "Cuiabá", "Vila Nova", "Brasiliense"],
    position: { x: 55, y: 45 },
  },
  {
    id: "sudeste",
    name: "Sudeste",
    teams: [
      "Flamengo",
      "Fluminense",
      "Vasco",
      "Botafogo",
      "São Paulo",
      "Corinthians",
      "Palmeiras",
      "Santos",
      "Cruzeiro",
      "Atlético Mineiro",
      "América Mineiro",
    ],
    position: { x: 70, y: 60 },
  },
  {
    id: "sul",
    name: "Sul",
    teams: ["Internacional", "Grêmio", "Athletico Paranaense", "Coritiba", "Avaí", "Figueirense", "Chapecoense"],
    position: { x: 55, y: 75 },
  },
]

interface BrazilMapProps {
  onRegionSelect: (region: string) => void
  selectedTeam: string | null
}

export function BrazilMap({ onRegionSelect, selectedTeam }: BrazilMapProps) {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const getRegionForTeam = (team: string) => {
    return regions.find((region) => region.teams.some((t) => t.toLowerCase().includes(team.toLowerCase())))
  }

  const teamRegion = selectedTeam ? getRegionForTeam(selectedTeam) : null

  useEffect(() => {
    if (teamRegion) {
      setSelectedRegion(teamRegion)
    }
  }, [selectedTeam, teamRegion])

  const handleRegionClick = (region: Region) => {
    setSelectedRegion(region)
    onRegionSelect(region.name)

    // Trigger animation
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 1000)
  }

  return (
    <div className="relative w-full h-[600px] bg-premium-black rounded-2xl overflow-hidden border border-premium-gold/20">
      {/* Map Container */}
      <div className="relative w-full h-full">
        {/* Brazil Map Image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={cn("relative w-[80%] h-[80%]", isAnimating && "animate-pulse")}>
            <Image
              src="/images/brazil-map-3d.jpg"
              alt="Mapa do Brasil"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        </div>

        {/* Region Markers */}
        {regions.map((region) => {
          const isSelected = selectedRegion?.id === region.id

          return (
            <div
              key={region.id}
              className={cn(
                "absolute w-6 h-6 rounded-full cursor-pointer transition-all duration-500 transform -translate-x-1/2 -translate-y-1/2",
                isSelected
                  ? "bg-premium-gold animate-glow-pulse scale-150 z-10"
                  : "bg-premium-blue hover:bg-premium-gold hover:scale-125",
              )}
              style={{
                left: `${region.position.x}%`,
                top: `${region.position.y}%`,
              }}
              onClick={() => handleRegionClick(region)}
            >
              {/* Pulse effect for selected region */}
              {isSelected && (
                <div className="absolute inset-0 rounded-full bg-premium-gold animate-ping opacity-75"></div>
              )}
            </div>
          )
        })}
      </div>

      {/* Selected Region Info */}
      {selectedRegion && (
        <div className="absolute bottom-4 left-4 right-4 glass-premium p-6 rounded-xl animate-slide-up-elegant border border-premium-gold/30">
          <h4 className="font-bold text-xl text-premium-gold mb-4">{selectedRegion.name}</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {selectedRegion.teams.map((team) => (
              <div
                key={team}
                className="text-sm text-premium-white bg-premium-gold/10 px-3 py-2 rounded-lg border border-premium-gold/20 hover:bg-premium-gold/20 transition-all duration-300 cursor-pointer"
              >
                {team}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Region Legend */}
      <div className="absolute top-4 right-4 glass-premium p-4 rounded-xl">
        <h5 className="font-semibold text-premium-gold mb-2">Regiões</h5>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-premium-white-soft">Norte</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-premium-white-soft">Nordeste</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-premium-white-soft">Centro-Oeste</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-premium-white-soft">Sudeste</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-premium-white-soft">Sul</span>
          </div>
        </div>
      </div>
    </div>
  )
}
