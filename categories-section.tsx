"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Globe, Trophy, Star, Zap } from "lucide-react"

const categories = [
  {
    id: "europe",
    name: "Europa",
    icon: Globe,
    description: "Premier League, La Liga, Serie A, Bundesliga",
    teams: ["Real Madrid", "Barcelona", "Manchester United", "Liverpool", "Juventus", "Bayern Munich"],
    color: "from-blue-600 to-blue-800",
  },
  {
    id: "south-america",
    name: "América do Sul",
    icon: Trophy,
    description: "Brasileirão, Libertadores, Campeonatos Nacionais",
    teams: ["Flamengo", "São Paulo", "Boca Juniors", "River Plate", "Santos", "Palmeiras"],
    color: "from-green-600 to-green-800",
  },
  {
    id: "premium",
    name: "Premium Collection",
    icon: Star,
    description: "Edições limitadas e especiais",
    teams: ["PSG", "Manchester City", "Chelsea", "Arsenal", "AC Milan", "Inter Milan"],
    color: "from-purple-600 to-purple-800",
  },
  {
    id: "new-releases",
    name: "Lançamentos",
    icon: Zap,
    description: "Temporada 2024/25",
    teams: ["Atlético Madrid", "Valencia", "Napoli", "Roma", "Borussia Dortmund", "Ajax"],
    color: "from-orange-600 to-orange-800",
  },
]

interface CategoriesSectionProps {
  onCategorySelect: (category: string) => void
}

export function CategoriesSection({ onCategorySelect }: CategoriesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId)
    onCategorySelect(categoryId)

    // Scroll to products
    const productsSection = document.getElementById("products-section")
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="categories-section" className="py-12 md:py-20 bg-modern-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 glow-text">Explore por Categoria</h2>
          <p className="text-modern-gray-text text-lg max-w-2xl mx-auto">
            Encontre a camisa perfeita navegando por região ou tipo de competição
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon
            const isSelected = selectedCategory === category.id

            return (
              <div
                key={category.id}
                className={`relative group cursor-pointer transition-all duration-300 ${
                  isSelected ? "scale-105" : "hover:scale-105"
                }`}
                onClick={() => handleCategoryClick(category.id)}
              >
                <div
                  className={`glass rounded-xl p-6 h-full border-2 transition-all duration-300 ${
                    isSelected
                      ? "border-modern-blue-electric shadow-lg shadow-modern-blue/20"
                      : "border-modern-blue/20 hover:border-modern-blue/40"
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 mx-auto`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-white text-center mb-2">{category.name}</h3>

                  <p className="text-modern-gray-text text-sm text-center mb-4">{category.description}</p>

                  <div className="space-y-1">
                    {category.teams.slice(0, 3).map((team) => (
                      <div key={team} className="text-xs text-modern-blue-electric text-center">
                        • {team}
                      </div>
                    ))}
                    {category.teams.length > 3 && (
                      <div className="text-xs text-modern-gray-text text-center">
                        +{category.teams.length - 3} mais times
                      </div>
                    )}
                  </div>

                  <Button className="w-full mt-4 bg-modern-blue hover:bg-modern-blue-light" size="sm">
                    Ver Camisas
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
