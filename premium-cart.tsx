"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { X, Minus, Plus, ShoppingBag, CreditCard, Trash2 } from "lucide-react"
import Image from "next/image"
import { cn } from "../lib/utils"

interface CartItem {
  id: number
  team: string
  league: string
  price: number
  image: string
  quantity: number
  size: string
}

interface PremiumCartProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemoveItem: (id: number) => void
  onCheckout: () => void
}

export function PremiumCart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onCheckout }: PremiumCartProps) {
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 200 ? 0 : 15
  const discount = appliedCoupon === "FIRST10" ? subtotal * 0.1 : 0
  const total = subtotal + shipping - discount

  const handleQuantityChange = (id: number, change: number) => {
    const item = items.find((item) => item.id === id)
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change)
      onUpdateQuantity(id, newQuantity)
    }
  }

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "FIRST10") {
      setAppliedCoupon("FIRST10")
      setCouponCode("")
    }
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-premium-black/70 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-lg glass-premium border-l border-premium-gold/20 z-50 transform transition-all duration-500 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-premium-gold/20">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-premium-gold" />
              <h2 className="text-xl font-bold text-premium-white">Carrinho</h2>
              <span className="bg-premium-gold text-premium-black text-sm px-2 py-1 rounded-full font-semibold">
                {items.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-premium-gold/10 rounded-lg transition-colors duration-300"
            >
              <X className="w-6 h-6 text-premium-white" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="w-20 h-20 text-premium-gray-medium mx-auto mb-6" />
                <p className="text-premium-white-soft text-lg mb-2">Seu carrinho está vazio</p>
                <p className="text-premium-gray-medium">Adicione algumas camisas premium para começar</p>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="glass-premium rounded-xl p-4 border border-premium-gold/10">
                    <div className="flex gap-4">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                        <Image src={item.image || "/placeholder.svg"} alt={item.team} fill className="object-cover" />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-premium-white mb-1">{item.team}</h3>
                        <p className="text-premium-white-soft text-sm mb-1">{item.league}</p>
                        <p className="text-premium-gold text-sm mb-3">Tamanho: {item.size}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleQuantityChange(item.id, -1)}
                              className="w-8 h-8 rounded-full bg-premium-gray-dark flex items-center justify-center hover:bg-premium-gold hover:text-premium-black transition-all duration-300"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-premium-white font-semibold w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, 1)}
                              className="w-8 h-8 rounded-full bg-premium-gray-dark flex items-center justify-center hover:bg-premium-gold hover:text-premium-black transition-all duration-300"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="text-premium-gold font-bold text-lg">
                              R$ {(item.price * item.quantity).toFixed(2)}
                            </p>
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="text-premium-red hover:text-premium-red/80 text-sm flex items-center gap-1 mt-1"
                            >
                              <Trash2 className="w-3 h-3" />
                              Remover
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-premium-gold/20 p-6 space-y-6">
              {/* Coupon */}
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Código de desconto"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="bg-premium-gray-dark border-premium-gold/20 text-premium-white placeholder:text-premium-gray-medium"
                  />
                  <Button
                    onClick={handleApplyCoupon}
                    variant="outline"
                    className="border-premium-gold text-premium-gold hover:bg-premium-gold hover:text-premium-black"
                  >
                    Aplicar
                  </Button>
                </div>
                {appliedCoupon && <div className="text-premium-green text-sm">✓ Desconto aplicado: FIRST10 (-10%)</div>}
              </div>

              {/* Summary */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-premium-white-soft">
                  <span>Subtotal:</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-premium-white-soft">
                  <span>Frete:</span>
                  <span>{shipping === 0 ? "Grátis" : `R$ ${shipping.toFixed(2)}`}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-premium-green">
                    <span>Desconto:</span>
                    <span>-R$ {discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-premium-white font-bold text-lg border-t border-premium-gold/20 pt-3">
                  <span>Total:</span>
                  <span className="text-premium-gold">R$ {total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={onCheckout}
                className="w-full btn-premium bg-premium-gold hover:bg-premium-gold-light text-premium-black font-semibold py-4 text-lg rounded-xl"
                size="lg"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Finalizar Compra
              </Button>

              <p className="text-premium-gray-medium text-xs text-center">
                Pagamento seguro • Frete grátis acima de R$ 200
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
