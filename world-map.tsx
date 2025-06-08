"use client"

import { useState } from "react"
import { cn } from "../lib/utils"

interface Country {
  name: string
  teams: string[]
  position: { x: number; y: number }
}

const countries: Country[] = [
  { name: "Brasil", teams: ["São Paulo", "Flamengo", "Corinthians", "Palmeiras"], position: { x: 25, y: 65 } },
  { name: "Argentina", teams: ["Boca Juniors", "River Plate"], position: { x: 28, y: 75 } },
  { name: "Inglaterra", teams: ["Manchester United", "Liverpool", "Chelsea", "Arsenal"], position: { x: 50, y: 25 } },
  { name: "Espanha", teams: ["Real Madrid", "Barcelona", "Atlético Madrid"], position: { x: 48, y: 35 } },
  { name: "Itália", teams: ["Juventus", "AC Milan", "Inter Milan"], position: { x: 52, y: 38 } },
  { name: "França", teams: ["PSG", "Olympique Marseille"], position: { x: 49, y: 30 } },
  { name: "Alemanha", teams: ["Bayern Munich", "Borussia Dortmund"], position: { x: 52, y: 28 } },
]

interface WorldMapProps {
  selectedTeam: string | null
  onCountrySelect: (country: string) => void
}

export function WorldMap({ selectedTeam, onCountrySelect }: WorldMapProps) {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)

  const getCountryForTeam = (team: string) => {
    return countries.find((country) => country.teams.some((t) => t.toLowerCase().includes(team.toLowerCase())))
  }

  const selectedCountry = selectedTeam ? getCountryForTeam(selectedTeam) : null

  return (
    <div className="relative w-full h-96 bg-football-dark rounded-lg overflow-hidden border border-football-green/30">
      {/* World Map SVG Background */}
      <svg
        viewBox="0 0 100 50"
        className="w-full h-full"
        style={{ background: "linear-gradient(135deg, #1a1a1a, #2a2a2a)" }}
      >
        {/* Simplified world map paths */}
        <path d="M15,20 L35,15 L40,25 L35,35 L15,30 Z" fill="#333" stroke="#555" strokeWidth="0.2" />
        <path d="M45,15 L65,12 L70,22 L65,32 L45,28 Z" fill="#333" stroke="#555" strokeWidth="0.2" />
        <path d="M20,40 L35,38 L40,48 L25,50 Z" fill="#333" stroke="#555" strokeWidth="0.2" />
      </svg>

      {/* Country Markers */}
      {countries.map((country) => {
        const isSelected = selectedCountry?.name === country.name
        const isHovered = hoveredCountry === country.name

        return (
          <div
            key={country.name}
            className={cn(
              "absolute w-4 h-4 rounded-full cursor-pointer transition-all duration-300 transform -translate-x-2 -translate-y-2",
              isSelected
                ? "bg-football-gold animate-map-glow scale-150 z-10"
                : "bg-football-green hover:bg-football-gold hover:scale-125",
              isHovered && "scale-125",
            )}
            style={{
              left: `${country.position.x}%`,
              top: `${country.position.y}%`,
            }}
            onClick={() => onCountrySelect(country.name)}
            onMouseEnter={() => setHoveredCountry(country.name)}
            onMouseLeave={() => setHoveredCountry(null)}
          >
            {/* Pulse effect for selected country */}
            {isSelected && (
              <div className="absolute inset-0 rounded-full bg-football-gold animate-ping opacity-75"></div>
            )}
          </div>
        )
      })}

      {/* Country Info Tooltip */}
      {hoveredCountry && (
        <div className="absolute bottom-4 left-4 bg-football-dark/90 text-white p-3 rounded-lg border border-football-green/30">
          <h4 className="font-bold text-football-gold">{hoveredCountry}</h4>
          <p className="text-sm">{countries.find((c) => c.name === hoveredCountry)?.teams.length} times disponíveis</p>
        </div>
      )}

      {/* Selected Country Info */}
      {selectedCountry && (
        <div className="absolute top-4 right-4 bg-football-green/90 text-white p-4 rounded-lg animate-slide-in">
          <h4 className="font-bold text-football-gold mb-2">{selectedCountry.name}</h4>
          <div className="space-y-1">
            {selectedCountry.teams.map((team) => (
              <div key={team} className="text-sm">
                • {team}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
