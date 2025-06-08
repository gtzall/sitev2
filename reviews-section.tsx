"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Star, ThumbsUp, User, Calendar } from "lucide-react"
import { cn } from "../lib/utils"

interface Review {
  id: number
  name: string
  rating: number
  comment: string
  date: string
  verified: boolean
  helpful: number
  team: string
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Carlos Silva",
    rating: 5,
    comment:
      "Incredible quality! The Real Madrid jersey is exactly like the original. Fast delivery and excellent packaging. Highly recommend!",
    date: "2024-01-15",
    verified: true,
    helpful: 23,
    team: "Real Madrid",
  },
  {
    id: 2,
    name: "Ana Santos",
    rating: 5,
    comment:
      "Perfect! Bought the Barcelona jersey for my son and he loved it. The material is premium and the fit is perfect.",
    date: "2024-01-12",
    verified: true,
    helpful: 18,
    team: "Barcelona",
  },
  {
    id: 3,
    name: "Roberto Lima",
    rating: 4,
    comment:
      "Great quality jersey. The Flamengo home kit looks amazing. Only took 4 days to arrive. Will definitely buy again!",
    date: "2024-01-10",
    verified: true,
    helpful: 15,
    team: "Flamengo",
  },
  {
    id: 4,
    name: "Maria Oliveira",
    rating: 5,
    comment:
      "Exceeded expectations! The Manchester United jersey quality is outstanding. Customer service was also excellent.",
    date: "2024-01-08",
    verified: true,
    helpful: 31,
    team: "Manchester United",
  },
  {
    id: 5,
    name: "João Pedro",
    rating: 5,
    comment:
      "Amazing! The PSG jersey is perfect, exactly as shown in the photos. Fast shipping and great price. 10/10!",
    date: "2024-01-05",
    verified: true,
    helpful: 27,
    team: "PSG",
  },
  {
    id: 6,
    name: "Fernanda Costa",
    rating: 4,
    comment:
      "Very good quality. The São Paulo jersey arrived quickly and the material feels premium. Satisfied with the purchase!",
    date: "2024-01-03",
    verified: true,
    helpful: 12,
    team: "São Paulo",
  },
]

export function ReviewsSection() {
  const [visibleReviews, setVisibleReviews] = useState(3)
  const [sortBy, setSortBy] = useState<"recent" | "helpful" | "rating">("recent")

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "helpful":
        return b.helpful - a.helpful
      case "rating":
        return b.rating - a.rating
      case "recent":
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime()
    }
  })

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  const ratingDistribution = [5, 4, 3, 2, 1].map(
    (rating) => reviews.filter((review) => review.rating === rating).length,
  )

  const loadMoreReviews = () => {
    setVisibleReviews((prev) => Math.min(prev + 3, reviews.length))
  }

  return (
    <section className="py-16 bg-premium-black-light">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-premium-white mb-4 cinematic-text">Customer Reviews</h2>
          <p className="text-premium-white-soft text-lg max-w-2xl mx-auto">
            See what our customers say about our premium jerseys
          </p>
        </div>

        {/* Rating Overview */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="glass-premium rounded-2xl p-8 border border-premium-gold/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Average Rating */}
              <div className="text-center">
                <div className="text-5xl font-bold text-premium-gold mb-2">{averageRating.toFixed(1)}</div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-6 h-6",
                        i < Math.floor(averageRating)
                          ? "fill-premium-gold text-premium-gold"
                          : "text-premium-gray-medium",
                      )}
                    />
                  ))}
                </div>
                <p className="text-premium-white-soft">Based on {reviews.length} reviews</p>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating, index) => (
                  <div key={rating} className="flex items-center gap-3">
                    <span className="text-premium-white-soft w-8">{rating}★</span>
                    <div className="flex-1 bg-premium-gray-dark rounded-full h-2">
                      <div
                        className="bg-premium-gold h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${(ratingDistribution[index] / reviews.length) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-premium-white-soft text-sm w-8">{ratingDistribution[index]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 glass-premium p-2 rounded-xl border border-premium-gold/20">
            {[
              { key: "recent", label: "Most Recent" },
              { key: "helpful", label: "Most Helpful" },
              { key: "rating", label: "Highest Rating" },
            ].map((option) => (
              <button
                key={option.key}
                onClick={() => setSortBy(option.key as any)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                  sortBy === option.key
                    ? "bg-premium-gold text-premium-black"
                    : "text-premium-white-soft hover:text-premium-white hover:bg-premium-gold/10",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {sortedReviews.slice(0, visibleReviews).map((review, index) => (
            <div
              key={review.id}
              className="glass-premium rounded-xl p-6 border border-premium-gold/20 hover:border-premium-gold/40 transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-premium-gold rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-premium-black" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-premium-white">{review.name}</h4>
                    <div className="flex items-center gap-2">
                      {review.verified && <span className="text-premium-green text-xs">✓ Verified</span>}
                      <span className="text-premium-white-soft text-xs">{review.team}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-4 h-4",
                        i < review.rating ? "fill-premium-gold text-premium-gold" : "text-premium-gray-medium",
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Review Content */}
              <p className="text-premium-white-soft mb-4 leading-relaxed">{review.comment}</p>

              {/* Review Footer */}
              <div className="flex items-center justify-between text-xs text-premium-gray-medium">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(review.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-3 h-3" />
                  <span>{review.helpful}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleReviews < reviews.length && (
          <div className="text-center">
            <Button
              onClick={loadMoreReviews}
              variant="outline"
              className="border-premium-gold text-premium-gold hover:bg-premium-gold hover:text-premium-black px-8 py-3 rounded-xl"
            >
              Load More Reviews
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
