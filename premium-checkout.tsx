"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { X, Copy, Check, CreditCard, Smartphone } from "lucide-react"
import { cn } from "../lib/utils"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  total: number
  items: any[]
}

export function PremiumCheckout({ isOpen, onClose, total, items }: CheckoutModalProps) {
  const [step, setStep] = useState(1)
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    state: "",
  })
  const [copied, setCopied] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix")

  const pixKey = "11967311629"
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

    const message = `🏆 *JERSEY WORLD - NOVO PEDIDO* 🏆

👤 *Dados do Cliente:*
Nome: ${customerData.name}
Email: ${customerData.email}
Telefone: ${customerData.phone}

📍 *Endereço de Entrega:*
${customerData.address}
${customerData.city}, ${customerData.state}
CEP: ${customerData.zipCode}

🛒 *Itens do Pedido:*
${orderDetails}

💰 *Valor Total:* R$ ${total.toFixed(2)}

💳 *Método de Pagamento:* ${paymentMethod === "pix" ? "PIX" : "CARTÃO"}
${paymentMethod === "pix" ? `🔑 *Chave PIX:* ${pixKey}` : ""}

Por favor, confirme o pagamento e processamento! 🙏

---
Jersey World - Camisas Premium de Futebol
Qualidade AAA+ Garantida`

    const whatsappUrl = `https://wa.me/5511967311629?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-premium-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-premium rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-premium-gold/20">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-premium-gold/20">
          <h2 className="text-2xl font-bold text-premium-white">Finalizar Compra</h2>
          <button onClick={onClose} className="p-2 hover:bg-premium-gold/10 rounded-lg transition-colors duration-300">
            <X className="w-6 h-6 text-premium-white" />
          </button>
        </div>

        <div className="p-6">
          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300",
                    step >= stepNumber
                      ? "bg-premium-gold text-premium-black"
                      : "bg-premium-gray-dark text-premium-white-soft",
                  )}
                >
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={cn(
                      "w-16 h-0.5 mx-2 transition-all duration-300",
                      step > stepNumber ? "bg-premium-gold" : "bg-premium-gray-dark",
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-6 animate-slide-up-elegant">
              <h3 className="text-xl font-semibold text-premium-white mb-6">Informações Pessoais</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-premium-white-soft mb-2 block">
                    Nome Completo *
                  </Label>
                  <Input
                    id="name"
                    value={customerData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="bg-premium-gray-dark border-premium-gold/20 text-premium-white"
                    placeholder="Digite seu nome completo"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-premium-white-soft mb-2 block">
                    Telefone *
                  </Label>
                  <Input
                    id="phone"
                    value={customerData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="bg-premium-gray-dark border-premium-gold/20 text-premium-white"
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-premium-white-soft mb-2 block">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={customerData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-premium-gray-dark border-premium-gold/20 text-premium-white"
                  placeholder="seu@email.com"
                />
              </div>

              <Button
                onClick={handleNextStep}
                className="w-full btn-premium bg-premium-gold hover:bg-premium-gold-light text-premium-black font-semibold py-3 rounded-xl"
                disabled={!customerData.name || !customerData.email || !customerData.phone}
              >
                Continuar para Entrega
              </Button>
            </div>
          )}

          {/* Step 2: Shipping Address */}
          {step === 2 && (
            <div className="space-y-6 animate-slide-up-elegant">
              <h3 className="text-xl font-semibold text-premium-white mb-6">Endereço de Entrega</h3>

              <div>
                <Label htmlFor="address" className="text-premium-white-soft mb-2 block">
                  Endereço Completo *
                </Label>
                <Input
                  id="address"
                  value={customerData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="bg-premium-gray-dark border-premium-gold/20 text-premium-white"
                  placeholder="Rua, número e complemento"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city" className="text-premium-white-soft mb-2 block">
                    Cidade *
                  </Label>
                  <Input
                    id="city"
                    value={customerData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="bg-premium-gray-dark border-premium-gold/20 text-premium-white"
                    placeholder="Nome da cidade"
                  />
                </div>

                <div>
                  <Label htmlFor="state" className="text-premium-white-soft mb-2 block">
                    Estado *
                  </Label>
                  <Input
                    id="state"
                    value={customerData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    className="bg-premium-gray-dark border-premium-gold/20 text-premium-white"
                    placeholder="UF"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="zipCode" className="text-premium-white-soft mb-2 block">
                  CEP *
                </Label>
                <Input
                  id="zipCode"
                  value={customerData.zipCode}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                  className="bg-premium-gray-dark border-premium-gold/20 text-premium-white"
                  placeholder="00000-000"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 border-premium-gold/20 text-premium-white hover:bg-premium-gold/10"
                >
                  Voltar
                </Button>
                <Button
                  onClick={handleNextStep}
                  className="flex-1 btn-premium bg-premium-gold hover:bg-premium-gold-light text-premium-black font-semibold py-3 rounded-xl"
                  disabled={!customerData.address || !customerData.city || !customerData.state || !customerData.zipCode}
                >
                  Continuar para Pagamento
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="space-y-6 animate-slide-up-elegant">
              <h3 className="text-xl font-semibold text-premium-white mb-6">Método de Pagamento</h3>

              {/* Payment Method Selection */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setPaymentMethod("pix")}
                  className={cn(
                    "p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2",
                    paymentMethod === "pix"
                      ? "border-premium-gold bg-premium-gold/10"
                      : "border-premium-gray-dark hover:border-premium-gold/50",
                  )}
                >
                  <Smartphone className="w-8 h-8 text-premium-gold" />
                  <span className="text-premium-white font-semibold">PIX</span>
                  <span className="text-premium-green text-xs">10% OFF</span>
                </button>

                <button
                  onClick={() => setPaymentMethod("card")}
                  className={cn(
                    "p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2",
                    paymentMethod === "card"
                      ? "border-premium-gold bg-premium-gold/10"
                      : "border-premium-gray-dark hover:border-premium-gold/50",
                  )}
                >
                  <CreditCard className="w-8 h-8 text-premium-gold" />
                  <span className="text-premium-white font-semibold">Cartão</span>
                  <span className="text-premium-white-soft text-xs">Crédito/Débito</span>
                </button>
              </div>

              {/* PIX Payment Details */}
              {paymentMethod === "pix" && (
                <div className="space-y-4">
                  <div className="glass-premium p-6 rounded-xl border border-premium-gold/20">
                    <h4 className="text-premium-gold font-semibold mb-4">Detalhes do Pagamento PIX</h4>

                    <div className="space-y-3">
                      <div>
                        <p className="text-premium-white-soft text-sm mb-2">Chave PIX:</p>
                        <div className="flex items-center gap-3 bg-premium-gray-dark p-3 rounded-lg">
                          <code className="text-premium-gold flex-1 font-mono">{pixKey}</code>
                          <button
                            onClick={handleCopyPix}
                            className="p-2 hover:bg-premium-gold/20 rounded transition-colors"
                          >
                            {copied ? (
                              <Check className="w-4 h-4 text-premium-green" />
                            ) : (
                              <Copy className="w-4 h-4 text-premium-white" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="bg-premium-green/10 border border-premium-green/20 p-4 rounded-lg">
                        <p className="text-premium-green text-sm">✓ 10% de desconto aplicado no pagamento PIX</p>
                      </div>
                    </div>
                  </div>

                  <div className="glass-premium p-6 rounded-xl border border-premium-gold/20">
                    <h4 className="text-premium-gold font-semibold mb-2">Valor Total</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-premium-white-soft">
                        <span>Subtotal:</span>
                        <span>R$ {total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-premium-green">
                        <span>Desconto PIX (10%):</span>
                        <span>-R$ {(total * 0.1).toFixed(2)}</span>
                      </div>
                      <div className="border-t border-premium-gold/20 pt-2">
                        <div className="flex justify-between text-premium-gold font-bold text-xl">
                          <span>Total Final:</span>
                          <span>R$ {(total * 0.9).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Card Payment Details */}
              {paymentMethod === "card" && (
                <div className="glass-premium p-6 rounded-xl border border-premium-gold/20">
                  <h4 className="text-premium-gold font-semibold mb-4">Pagamento com Cartão</h4>
                  <p className="text-premium-white-soft text-sm mb-4">
                    Pagamentos com cartão serão processados com segurança através do nosso suporte WhatsApp.
                  </p>
                  <div className="bg-premium-blue/10 border border-premium-blue/20 p-4 rounded-lg">
                    <p className="text-premium-blue text-sm">
                      ℹ️ Nossa equipe entrará em contato para processar o pagamento com cartão de forma segura
                    </p>
                  </div>
                </div>
              )}

              {/* Order Instructions */}
              <div className="bg-premium-gray-dark/50 p-4 rounded-xl">
                <h5 className="text-premium-white font-semibold mb-2">Próximos Passos:</h5>
                <ul className="text-premium-white-soft text-sm space-y-1">
                  <li>• Complete o pagamento usando o método acima</li>
                  <li>• Envie o comprovante via WhatsApp</li>
                  <li>• Processamento do pedido em até 2 horas úteis</li>
                  <li>• Entrega em 3-7 dias úteis</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setStep(2)}
                  variant="outline"
                  className="flex-1 border-premium-gold/20 text-premium-white hover:bg-premium-gold/10"
                >
                  Voltar
                </Button>
                <Button
                  onClick={handleWhatsAppOrder}
                  className="flex-1 btn-premium bg-premium-green hover:bg-premium-green/80 text-premium-white font-semibold py-3 rounded-xl"
                >
                  Finalizar Pedido
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
