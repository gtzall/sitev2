"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Label } from "../components/ui/label"
import { Star, User, Calendar, ThumbsUp, MessageSquare, Send } from "lucide-react"
import { cn } from "../lib/utils"

interface Review {
  id: number
  name: string
  rating: number
  comment: string
  date: string
  verified: boolean
  helpful: number
  product: string
  avatar?: string
}

const existingReviews: Review[] = [
  {
    id: 1,
    name: "Carlos Silva",
    rating: 5,
    comment:
      "Qualidade incrível! A camisa do Real Madrid é exatamente igual à original. Entrega rápida e embalagem excelente. Recomendo muito!",
    date: "2024-01-15",
    verified: true,
    helpful: 23,
    product: "Real Madrid",
  },
  {
    id: 2,
    name: "Ana Santos",
    rating: 5,
    comment:
      "Perfeita! Comprei a camisa do Barcelona para meu filho e ele adorou. O material é premium e o caimento é perfeito.",
    date: "2024-01-12",
    verified: true,
    helpful: 18,
    product: "Barcelona",
  },
  {
    id: 3,
    name: "Roberto Lima",
    rating: 4,
    comment:
      "Camisa de ótima qualidade. A do Flamengo ficou linda. Chegou em apenas 4 dias. Com certeza comprarei novamente!",
    date: "2024-01-10",
    verified: true,
    helpful: 15,
    product: "Flamengo",
  },
  {
    id: 4,
    name: "Maria Oliveira",
    rating: 5,
    comment:
      "Superou as expectativas! A qualidade da camisa do Manchester United é excepcional. Atendimento também foi excelente.",
    date: "2024-01-08",
    verified: true,
    helpful: 31,
    product: "Manchester United",
  },
  {
    id: 5,
    name: "João Pedro",
    rating: 5,
    comment: "Incrível! A camisa do PSG está perfeita, exatamente como nas fotos. Envio rápido e preço justo. 10/10!",
    date: "2024-01-05",
    verified: true,
    helpful: 27,
    product: "PSG",
  },
]

export function ProductReviews() {
  const [reviews, setReviews] = useState<Review[]>(existingReviews)
  const [visibleReviews, setVisibleReviews] = useState(3)
  const [sortBy, setSortBy] = useState<"recent" | "helpful" | "rating">("recent")
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
    comment: "",
    product: "",
  })

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

  const handleSubmitReview = () => {
    if (newReview.name && newReview.rating && newReview.comment && newReview.product) {
      const review: Review = {
        id: reviews.length + 1,
        name: newReview.name,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split("T")[0],
        verified: false,
        helpful: 0,
        product: newReview.product,
      }

      setReviews((prev) => [review, ...prev])
      setNewReview({ name: "", rating: 0, comment: "", product: "" })
      setShowReviewForm(false)
    }
  }

  const handleRatingClick = (rating: number) => {
    setNewReview((prev) => ({ ...prev, rating }))
  }

  return (
    <section className="py-16 bg-premium-black-light">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-premium-white mb-4 cinematic-text">
            Avaliações dos Clientes
          </h2>
          <p className="text-premium-white-soft text-lg max-w-2xl mx-auto">
            Veja o que nossos clientes dizem sobre nossas camisas premium
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
                <p className="text-premium-white-soft">Baseado em {reviews.length} avaliações</p>
                <Button
                  onClick={() => setShowReviewForm(true)}
                  className="mt-4 btn-premium bg-premium-gold hover:bg-premium-gold-light text-premium-black"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Avaliar Produto
                </Button>
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

        {/* Review Form Modal */}
        {showReviewForm && (
          <div className="fixed inset-0 bg-premium-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="glass-premium rounded-2xl max-w-md w-full border border-premium-gold/20 animate-scale-in">
              <div className="p-6">
                <h3 className="text-xl font-bold text-premium-white mb-6">Avaliar Produto</h3>

                <div className="space-y-4">
                  <div>
                    <Label className="text-premium-white-soft">Nome</Label>
                    <Input
                      value={newReview.name}
                      onChange={(e) => setNewReview((prev) => ({ ...prev, name: e.target.value }))}
                      className="bg-premium-gray-dark border-premium-gold/20 text-premium-white"
                      placeholder="Seu nome"
                    />
                  </div>

                  <div>
                    <Label className="text-premium-white-soft">Produto</Label>
                    <Input
                      value={newReview.product}
                      onChange={(e) => setNewReview((prev) => ({ ...prev, product: e.target.value }))}
                      className="bg-premium-gray-dark border-premium-gold/20 text-premium-white"
                      placeholder="Nome do time/produto"
                    />
                  </div>

                  <div>
                    <Label className="text-premium-white-soft mb-2 block">Avaliação</Label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRatingClick(star)}
                          className="transition-all duration-200 hover:scale-110"
                        >
                          <Star
                            className={cn(
                              "w-8 h-8",
                              star <= newReview.rating
                                ? "fill-premium-gold text-premium-gold"
                                : "text-premium-gray-medium hover:text-premium-gold",
                            )}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-premium-white-soft">Comentário</Label>
                    <Textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
                      className="bg-premium-gray-dark border-premium-gold/20 text-premium-white"
                      placeholder="Conte sua experiência com o produto..."
                      rows={4}
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={() => setShowReviewForm(false)}
                    variant="outline"
                    className="flex-1 border-premium-gold/20 text-premium-white hover:bg-premium-gold/10"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleSubmitReview}
                    className="flex-1 btn-premium bg-premium-gold hover:bg-premium-gold-light text-premium-black"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Enviar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sort Options */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 glass-premium p-2 rounded-xl border border-premium-gold/20">
            {[
              { key: "recent", label: "Mais Recentes" },
              { key: "helpful", label: "Mais Úteis" },
              { key: "rating", label: "Maior Nota" },
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
                      {review.verified && <span className="text-premium-green text-xs">✓ Verificado</span>}
                      <span className="text-premium-white-soft text-xs">{review.product}</span>
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
                  <span>{new Date(review.date).toLocaleDateString("pt-BR")}</span>
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
              Carregar Mais Avaliações
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
