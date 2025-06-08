"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { X, Copy, Check } from "lucide-react"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  total: number
  items: any[]
}

export function CheckoutModal({ isOpen, onClose, total, items }: CheckoutModalProps) {
  const [step, setStep] = useState(1)
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  })
  const [copied, setCopied] = useState(false)

  const pixKey = "11963116629"
  const pixCode = `00020126580014BR.GOV.BCB.PIX0136${pixKey}5204000053039865802BR5925JERSEY WORLD LTDA6009SAO PAULO62070503***6304`

  const handleInputChange = (field: string, value: string) => {
    setCustomerData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhatsAppOrder = () => {
    const orderDetails = items
      .map((item) => `• ${item.team} (${item.quantity}x) - R$ ${(item.price * item.quantity).toFixed(2)}`)
      .join("\n")

    const message = `🏆 *PEDIDO JERSEY WORLD* 🏆

👤 *Cliente:* ${customerData.name}
📧 *Email:* ${customerData.email}
📱 *Telefone:* ${customerData.phone}

📍 *Endereço:*
${customerData.address}
${customerData.city} - ${customerData.zipCode}

🛒 *Itens:*
${orderDetails}

💰 *Total:* R$ ${total.toFixed(2)}

💳 *Pagamento:* PIX
🔑 *Chave PIX:* ${pixKey}

Aguardo confirmação do pagamento! 🙏`

    const whatsappUrl = `https://wa.me/5511963116629?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-modern-dark rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-modern-blue/20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-modern-blue/20">
          <h2 className="text-xl font-bold text-white">Finalizar Compra</h2>
          <button onClick={onClose} className="p-2 hover:bg-modern-gray-light rounded-lg transition-colors">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-4">
          {/* Step 1: Customer Info */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Dados Pessoais</h3>

              <div>
                <Label htmlFor="name" className="text-white">
                  Nome Completo
                </Label>
                <Input
                  id="name"
                  value={customerData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="bg-modern-gray-light border-modern-blue/20 text-white"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={customerData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-modern-gray-light border-modern-blue/20 text-white"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-white">
                  Telefone
                </Label>
                <Input
                  id="phone"
                  value={customerData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="bg-modern-gray-light border-modern-blue/20 text-white"
                />
              </div>

              <Button
                onClick={handleNextStep}
                className="w-full bg-modern-blue hover:bg-modern-blue-light"
                disabled={!customerData.name || !customerData.email || !customerData.phone}
              >
                Continuar
              </Button>
            </div>
          )}

          {/* Step 2: Address */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Endereço de Entrega</h3>

              <div>
                <Label htmlFor="address" className="text-white">
                  Endereço Completo
                </Label>
                <Input
                  id="address"
                  value={customerData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="bg-modern-gray-light border-modern-blue/20 text-white"
                />
              </div>

              <div>
                <Label htmlFor="city" className="text-white">
                  Cidade
                </Label>
                <Input
                  id="city"
                  value={customerData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="bg-modern-gray-light border-modern-blue/20 text-white"
                />
              </div>

              <div>
                <Label htmlFor="zipCode" className="text-white">
                  CEP
                </Label>
                <Input
                  id="zipCode"
                  value={customerData.zipCode}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                  className="bg-modern-gray-light border-modern-blue/20 text-white"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                  Voltar
                </Button>
                <Button
                  onClick={handleNextStep}
                  className="flex-1 bg-modern-blue hover:bg-modern-blue-light"
                  disabled={!customerData.address || !customerData.city || !customerData.zipCode}
                >
                  Continuar
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Pagamento PIX</h3>

              <div className="glass p-4 rounded-lg">
                <p className="text-white font-semibold mb-2">Chave PIX:</p>
                <div className="flex items-center gap-2 bg-modern-gray-light p-3 rounded-lg">
                  <code className="text-modern-blue-electric flex-1">{pixKey}</code>
                  <button onClick={handleCopyPix} className="p-2 hover:bg-modern-blue/20 rounded transition-colors">
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-white" />}
                  </button>
                </div>
              </div>

              <div className="glass p-4 rounded-lg">
                <p className="text-white font-semibold mb-2">Total a Pagar:</p>
                <p className="text-2xl font-bold text-modern-blue-electric">R$ {total.toFixed(2)}</p>
              </div>

              <div className="text-sm text-modern-gray-text">
                <p>• Após o pagamento, envie o comprovante via WhatsApp</p>
                <p>• Processamento em até 2 horas úteis</p>
                <p>• Entrega em 3-7 dias úteis</p>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => setStep(2)} variant="outline" className="flex-1">
                  Voltar
                </Button>
                <Button onClick={handleWhatsAppOrder} className="flex-1 bg-green-600 hover:bg-green-700">
                  Enviar Pedido
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
