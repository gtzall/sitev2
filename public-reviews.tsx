"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Label } from "../components/ui/label"
import { Star, User, Send, MessageSquare, Heart, ThumbsUp } from "lucide-react"
import { cn } from "../lib/utils"

interface Review {
  id: number
  name: string
  productRating: number
  serviceRating: number
  websiteRating: number
  comment: string
  date: string
  product: string
  verified: boolean
}

export function PublicReviews() {
  const [reviews, setReviews] = useState<Review[]>([])

  const [newReview, setNewReview] = useState({
    name: "",
    productRating: 0,
    serviceRating: 0,
    websiteRating: 0,
    comment: "",
    product: "",
  })

  const [showForm, setShowForm] = useState(false)

  const handleSubmitReview = () => {
    if (
      newReview.name &&
      newReview.productRating &&
      newReview.serviceRating &&
      newReview.websiteRating &&
      newReview.comment &&
      newReview.product
    ) {
      const review: Review = {
        id: reviews.length + 1,
        name: newReview.name,
        productRating: newReview.productRating,
        serviceRating: newReview.serviceRating,
        websiteRating: newReview.websiteRating,
        comment: newReview.comment,
        date: new Date().toISOString().split("T")[0],
        product: newReview.product,
        verified: false,
      }

      setReviews((prev) => [review, ...prev])
      setNewReview({ name: "", productRating: 0, serviceRating: 0, websiteRating: 0, comment: "", product: "" })
      setShowForm(false)
    }
  }

  const averageProductRating =
    reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.productRating, 0) / reviews.length : 0
  const averageServiceRating =
    reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.serviceRating, 0) / reviews.length : 0
  const averageWebsiteRating =
    reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.websiteRating, 0) / reviews.length : 0

  const StarRating = ({
    rating,
    onRatingChange,
    label,
  }: { rating: number; onRatingChange?: (rating: number) => void; label?: string }) => (
    <div className="flex flex-col gap-2">
      {label && <Label className="text-premium-white-soft text-sm">{label}</Label>}
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRatingChange?.(star)}
            className="transition-all duration-200 hover:scale-110"
            disabled={!onRatingChange}
          >
            <Star
              className={cn(
                "w-6 h-6",
                star <= rating
                  ? "fill-premium-gold text-premium-gold"
                  : "text-premium-gray-medium hover:text-premium-gold",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <section id="reviews-section" className="py-16 bg-premium-black-light">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-premium-white mb-4 cinematic-text">
            Avaliações dos Clientes
          </h2>
          <p className="text-premium-white-soft text-lg max-w-2xl mx-auto">
            Compartilhe sua experiência e ajude outros clientes a conhecer nosso trabalho
          </p>
        </div>

        {/* Rating Overview & Add Review */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="glass-premium rounded-2xl p-8 border border-premium-gold/20">
            {reviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {/* Product Rating */}
                <div className="text-center">
                  <div className="text-4xl font-bold text-premium-gold mb-2">{averageProductRating.toFixed(1)}</div>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-5 h-5",
                          i < Math.floor(averageProductRating)
                            ? "fill-premium-gold text-premium-gold"
                            : "text-premium-gray-medium",
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-premium-white-soft text-sm">Qualidade dos Produtos</p>
                </div>

                {/* Service Rating */}
                <div className="text-center">
                  <div className="text-4xl font-bold text-premium-gold mb-2">{averageServiceRating.toFixed(1)}</div>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-5 h-5",
                          i < Math.floor(averageServiceRating)
                            ? "fill-premium-gold text-premium-gold"
                            : "text-premium-gray-medium",
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-premium-white-soft text-sm">Atendimento</p>
                </div>

                {/* Website Rating */}
                <div className="text-center">
                  <div className="text-4xl font-bold text-premium-gold mb-2">{averageWebsiteRating.toFixed(1)}</div>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-5 h-5",
                          i < Math.floor(averageWebsiteRating)
                            ? "fill-premium-gold text-premium-gold"
                            : "text-premium-gray-medium",
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-premium-white-soft text-sm">Experiência do Site</p>
                </div>
              </div>
            ) : (
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">⭐</div>
                <h3 className="text-xl font-semibold text-premium-white mb-2">Seja o Primeiro a Avaliar!</h3>
                <p className="text-premium-white-soft">Compartilhe sua experiência e ajude outros clientes</p>
              </div>
            )}

            <div className="flex justify-center">
              <Button
                onClick={() => setShowForm(!showForm)}
                className="btn-premium bg-premium-gold hover:bg-premium-gold-light text-premium-black px-8 py-4"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                {showForm ? "Cancelar" : "Deixar Avaliação"}
              </Button>
            </div>
          </div>
        </div>

        {/* Review Form */}
        {showForm && (
          <div className="max-w-2xl mx-auto mb-12 animate-slide-up-elegant">
            <div className="glass-premium rounded-2xl p-8 border border-premium-gold/20">
              <h3 className="text-xl font-bold text-premium-white mb-6 flex items-center gap-2">
                <Heart className="w-6 h-6 text-premium-gold" />
                Deixe sua Avaliação Completa
              </h3>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-premium-white-soft">Seu Nome</Label>
                    <Input
                      value={newReview.name}
                      onChange={(e) => setNewReview((prev) => ({ ...prev, name: e.target.value }))}
                      className="bg-premium-gray-dark border-premium-gold/20 text-premium-white"
                      placeholder="Digite seu nome"
                    />
                  </div>

                  <div>
                    <Label className="text-premium-white-soft">Produto Comprado</Label>
                    <Input
                      value={newReview.product}
                      onChange={(e) => setNewReview((prev) => ({ ...prev, product: e.target.value }))}
                      className="bg-premium-gray-dark border-premium-gold/20 text-premium-white"
                      placeholder="Ex: Camisa do Real Madrid"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StarRating
                    rating={newReview.productRating}
                    onRatingChange={(rating) => setNewReview((prev) => ({ ...prev, productRating: rating }))}
                    label="Qualidade do Produto"
                  />

                  <StarRating
                    rating={newReview.serviceRating}
                    onRatingChange={(rating) => setNewReview((prev) => ({ ...prev, serviceRating: rating }))}
                    label="Atendimento"
                  />

                  <StarRating
                    rating={newReview.websiteRating}
                    onRatingChange={(rating) => setNewReview((prev) => ({ ...prev, websiteRating: rating }))}
                    label="Experiência do Site"
                  />
                </div>

                <div>
                  <Label className="text-premium-white-soft">Comentário</Label>
                  <Textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
                    className="bg-premium-gray-dark border-premium-gold/20 text-premium-white"
                    placeholder="Conte sua experiência detalhada com nossos produtos e serviços..."
                    rows={4}
                  />
                </div>

                <Button
                  onClick={handleSubmitReview}
                  className="w-full btn-premium bg-premium-gold hover:bg-premium-gold-light text-premium-black"
                  disabled={
                    !newReview.name ||
                    !newReview.productRating ||
                    !newReview.serviceRating ||
                    !newReview.websiteRating ||
                    !newReview.comment ||
                    !newReview.product
                  }
                >
                  <Send className="w-4 h-4 mr-2" />
                  Publicar Avaliação Completa
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Reviews List */}
        {reviews.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-premium-white mb-8 text-center">Avaliações Recentes</h3>
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <div
                  key={review.id}
                  className="glass-premium rounded-xl p-6 border border-premium-gold/20 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-premium-gold rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-premium-black" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-premium-white">{review.name}</h4>
                        <div className="flex items-center gap-2">
                          {review.verified && <span className="text-premium-green text-xs">✓ Compra Verificada</span>}
                          <span className="text-premium-white-soft text-xs">{review.product}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-premium-gray-medium">
                        {new Date(review.date).toLocaleDateString("pt-BR")}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-sm text-premium-white-soft mb-1">Produto</div>
                      <div className="flex justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "w-3 h-3",
                              i < review.productRating
                                ? "fill-premium-gold text-premium-gold"
                                : "text-premium-gray-medium",
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-premium-white-soft mb-1">Atendimento</div>
                      <div className="flex justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "w-3 h-3",
                              i < review.serviceRating
                                ? "fill-premium-gold text-premium-gold"
                                : "text-premium-gray-medium",
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-premium-white-soft mb-1">Site</div>
                      <div className="flex justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "w-3 h-3",
                              i < review.websiteRating
                                ? "fill-premium-gold text-premium-gold"
                                : "text-premium-gray-medium",
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-premium-white-soft mb-4 leading-relaxed">{review.comment}</p>

                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-premium-white-soft hover:text-premium-gold transition-colors text-sm">
                      <ThumbsUp className="w-4 h-4" />
                      <span>Útil</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
