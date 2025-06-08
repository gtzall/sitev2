"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Html } from "@react-three/drei"
import { useState, useRef } from "react"
import type * as THREE from "three"

interface Country {
  name: string
  teams: string[]
  position: [number, number, number]
  region: string
}

const countries: Country[] = [
  {
    name: "Brasil",
    teams: ["São Paulo", "Flamengo", "Corinthians", "Palmeiras", "Santos"],
    position: [-2, -1, 0],
    region: "América do Sul",
  },
  {
    name: "Argentina",
    teams: ["Boca Juniors", "River Plate", "Racing"],
    position: [-2, -2, 0],
    region: "América do Sul",
  },
  {
    name: "Inglaterra",
    teams: ["Manchester United", "Liverpool", "Chelsea", "Arsenal", "Manchester City"],
    position: [0, 2, 0],
    region: "Europa",
  },
  {
    name: "Espanha",
    teams: ["Real Madrid", "Barcelona", "Atlético Madrid", "Valencia"],
    position: [-0.5, 1.5, 0],
    region: "Europa",
  },
  {
    name: "Itália",
    teams: ["Juventus", "AC Milan", "Inter Milan", "Roma", "Napoli"],
    position: [0.5, 1.5, 0],
    region: "Europa",
  },
  { name: "França", teams: ["PSG", "Olympique Marseille", "Lyon"], position: [-0.2, 1.8, 0], region: "Europa" },
  {
    name: "Alemanha",
    teams: ["Bayern Munich", "Borussia Dortmund", "RB Leipzig"],
    position: [0.5, 2, 0],
    region: "Europa",
  },
  { name: "Holanda", teams: ["Ajax", "PSV", "Feyenoord"], position: [0.3, 2.2, 0], region: "Europa" },
  { name: "Portugal", teams: ["Porto", "Benfica", "Sporting"], position: [-0.8, 1.3, 0], region: "Europa" },
  { name: "México", teams: ["Club América", "Chivas", "Cruz Azul"], position: [-3, 1, 0], region: "América do Norte" },
  {
    name: "Estados Unidos",
    teams: ["LA Galaxy", "Inter Miami", "NYCFC"],
    position: [-2.5, 1.5, 0],
    region: "América do Norte",
  },
  { name: "Japão", teams: ["Kashima Antlers", "Urawa Red Diamonds"], position: [4, 1.5, 0], region: "Ásia" },
  { name: "Coreia do Sul", teams: ["FC Seoul", "Jeonbuk Motors"], position: [3.8, 1.3, 0], region: "Ásia" },
]

function CountryMarker({
  country,
  isSelected,
  onSelect,
}: { country: Country; isSelected: boolean; onSelect: (country: Country) => void }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  return (
    <group position={country.position}>
      <mesh
        ref={meshRef}
        onClick={() => onSelect(country)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[isSelected ? 0.15 : 0.1, 16, 16]} />
        <meshStandardMaterial
          color={isSelected ? "#F59E0B" : hovered ? "#3B82F6" : "#2563EB"}
          emissive={isSelected ? "#F59E0B" : hovered ? "#1E40AF" : "#1E3A8A"}
          emissiveIntensity={isSelected ? 0.5 : hovered ? 0.3 : 0.1}
        />
      </mesh>

      {(hovered || isSelected) && (
        <Html distanceFactor={10}>
          <div className="bg-modern-dark/90 text-white p-2 rounded-lg border border-modern-blue/30 backdrop-blur-sm">
            <div className="font-bold text-modern-blue-electric">{country.name}</div>
            <div className="text-xs text-modern-gray-text">{country.teams.length} times</div>
          </div>
        </Html>
      )}
    </group>
  )
}

function Globe() {
  return (
    <mesh>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial color="#1A1B23" transparent opacity={0.3} wireframe />
    </mesh>
  )
}

interface WorldMap3DProps {
  selectedTeam: string | null
  onCountrySelect: (country: string) => void
}

export function WorldMap3D({ selectedTeam, onCountrySelect }: WorldMap3DProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country)
    onCountrySelect(country.name)
  }

  const getCountryForTeam = (team: string) => {
    return countries.find((country) => country.teams.some((t) => t.toLowerCase().includes(team.toLowerCase())))
  }

  const teamCountry = selectedTeam ? getCountryForTeam(selectedTeam) : null

  return (
    <div className="w-full h-96 md:h-[500px] bg-modern-dark rounded-xl overflow-hidden border border-modern-blue/20">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <Globe />

        {countries.map((country) => (
          <CountryMarker
            key={country.name}
            country={country}
            isSelected={teamCountry?.name === country.name || selectedCountry?.name === country.name}
            onSelect={handleCountrySelect}
          />
        ))}

        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      </Canvas>

      {selectedCountry && (
        <div className="absolute bottom-4 left-4 right-4 glass p-4 rounded-lg animate-slide-up">
          <h4 className="font-bold text-modern-blue-electric mb-2">{selectedCountry.name}</h4>
          <p className="text-sm text-modern-gray-text mb-2">{selectedCountry.region}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
            {selectedCountry.teams.map((team) => (
              <div key={team} className="text-xs text-white bg-modern-blue/20 px-2 py-1 rounded">
                {team}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
