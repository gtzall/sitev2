"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { X, Minus, Plus, ShoppingBag, CreditCard } from "lucide-react"
import Image from "next/image"

interface CartItem {
  id: number
  team: string
  league: string
  price: number
  image: string
  quantity: number
  size: string
}

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemoveItem: (id: number) => void
  onCheckout: () => void
}

export function CartSidebar({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onCheckout }: CartSidebarProps) {
  const [couponCode, setCouponCode] = useState("")

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 200 ? 0 : 15
  const total = subtotal + shipping

  const handleQuantityChange = (id: number, change: number) => {
    const item = items.find((item) => item.id === id)
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change)
      onUpdateQuantity(id, newQuantity)
    }
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-modern-dark border-l border-modern-blue/20 z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-modern-blue/20">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-modern-blue-electric" />
              <h2 className="text-lg font-bold text-white">Carrinho ({items.length})</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-modern-gray-light rounded-lg transition-colors">
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-modern-gray-text mx-auto mb-4" />
                <p className="text-modern-gray-text">Seu carrinho está vazio</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="glass rounded-lg p-4">
                    <div className="flex gap-3">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <Image src={item.image || "/placeholder.svg"} alt={item.team} fill className="object-cover" />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-sm">{item.team}</h3>
                        <p className="text-modern-gray-text text-xs">{item.league}</p>
                        <p className="text-modern-blue-electric text-sm">Tamanho: {item.size}</p>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleQuantityChange(item.id, -1)}
                              className="w-6 h-6 rounded-full bg-modern-gray-light flex items-center justify-center hover:bg-modern-blue transition-colors"
                            >
                              <Minus className="w-3 h-3 text-white" />
                            </button>
                            <span className="text-white text-sm w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, 1)}
                              className="w-6 h-6 rounded-full bg-modern-gray-light flex items-center justify-center hover:bg-modern-blue transition-colors"
                            >
                              <Plus className="w-3 h-3 text-white" />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="text-modern-blue-electric font-semibold">
                              R$ {(item.price * item.quantity).toFixed(2)}
                            </p>
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="text-red-400 text-xs hover:text-red-300"
                            >
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
            <div className="border-t border-modern-blue/20 p-4 space-y-4">
              {/* Coupon */}
              <div className="flex gap-2">
                <Input
                  placeholder="Código de desconto"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="bg-modern-gray-light border-modern-blue/20 text-white"
                />
                <Button variant="outline" size="sm">
                  Aplicar
                </Button>
              </div>

              {/* Summary */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-modern-gray-text">
                  <span>Subtotal:</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-modern-gray-text">
                  <span>Frete:</span>
                  <span>{shipping === 0 ? "Grátis" : `R$ ${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-base border-t border-modern-blue/20 pt-2">
                  <span>Total:</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={onCheckout}
                className="w-full bg-modern-blue hover:bg-modern-blue-light text-white"
                size="lg"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Finalizar Compra
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
