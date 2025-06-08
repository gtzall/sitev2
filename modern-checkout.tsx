"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { X, Copy, Check, CreditCard, Smartphone, QrCode, MapPin, User, Package } from "lucide-react"
import { cn } from "../lib/utils"
import Image from "next/image"

interface ModernCheckoutProps {
  isOpen: boolean
  onClose: () => void
  product: any
  onComplete: () => void
}

export function ModernCheckout({ isOpen, onClose, product, onComplete }: ModernCheckoutProps) {
  const [step, setStep] = useState(1)
  const [selectedSize, setSelectedSize] = useState("")
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    state: "",
  })
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix")
  const [pixGenerated, setPixGenerated] = useState(false)
  const [copied, setCopied] = useState(false)

  const sizes = ["P", "M", "G", "GG", "XGG"]
  const pixKey = "11967311629"
  const pixValue = product?.price || 199.9
  const pixCode = `00020126580014BR.GOV.BCB.PIX0136${pixKey}540${pixValue.toFixed(2).replace(".", "")}5802BR5925JERSEY WORLD LTDA6009SAO PAULO62070503***6304`

  const handleInputChange = (field: string, value: string) => {
    setCustomerData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNextStep = () => {
    if (step < 4) setStep(step + 1)
  }

  const handleGeneratePix = () => {
    setPixGenerated(true)
  }

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhatsAppOrder = () => {
    const message = `🏆 *JERSEY WORLD - NOVO PEDIDO* 🏆

👤 *Cliente:* ${customerData.name}
📧 *Email:* ${customerData.email}
📱 *Telefone:* ${customerData.phone}

📦 *Produto:* ${product?.team || "Camisa Premium"}
📏 *Tamanho:* ${selectedSize}
💰 *Valor:* R$ ${pixValue.toFixed(2)}

📍 *Endereço:*
${customerData.address}
${customerData.city}, ${customerData.state}
CEP: ${customerData.zipCode}

💳 *Pagamento:* ${paymentMethod === "pix" ? "PIX" : "Cartão"}
${paymentMethod === "pix" ? `🔑 *Chave PIX:* ${pixKey}` : ""}

✅ Pagamento realizado via PIX
Aguardo confirmação e envio! 🙏

---
Jersey World - Camisas Premium
Qualidade AAA+ Garantida`

    const whatsappUrl = `https://wa.me/5511967311629?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
    onComplete()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-premium-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-premium rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-premium-gold/20">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-premium-gold/20">
          <h2 className="text-2xl font-bold text-premium-white">Checkout Premium</h2>
          <button onClick={onClose} className="p-2 hover:bg-premium-gold/10 rounded-lg transition-colors duration-300">
            <X className="w-6 h-6 text-premium-white" />
          </button>
        </div>

        <div className="p-6">
          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300",
                    step >= stepNumber
                      ? "bg-premium-gold text-premium-black"
                      : "bg-premium-gray-dark text-premium-white-soft",
                  )}
                >
                  {stepNumber === 1 && <Package className="w-5 h-5" />}
                  {stepNumber === 2 && <User className="w-5 h-5" />}
                  {stepNumber === 3 && <MapPin className="w-5 h-5" />}
                  {stepNumber === 4 && <CreditCard className="w-5 h-5" />}
                </div>
                {stepNumber < 4 && (
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

          {/* Step 1: Product & Size */}
          {step === 1 && (
            <div className="space-y-6 animate-slide-up-elegant">
              <h3 className="text-xl font-semibold text-premium-white mb-6">Produto e Tamanho</h3>

              {/* Product Info */}
              <div className="glass-premium p-4 rounded-xl border border-premium-gold/20">
                <div className="flex gap-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                    <Image
                      src={product?.images?.[0] || "/placeholder.svg"}
                      alt={product?.team || "Produto"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-premium-white">{product?.team || "Camisa Premium"}</h4>
                    <p className="text-premium-white-soft text-sm">{product?.league || "Liga Premium"}</p>
                    <p className="text-premium-gold font-bold text-lg">R$ {pixValue.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <Label className="text-premium-white-soft mb-4 block">Selecione o Tamanho *</Label>
                <div className="grid grid-cols-5 gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "p-3 rounded-lg border-2 transition-all duration-300 font-semibold",
                        selectedSize === size
                          ? "border-premium-gold bg-premium-gold/10 text-premium-gold"
                          : "border-premium-gray-dark text-premium-white-soft hover:border-premium-gold/50 hover:text-premium-white",
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleNextStep}
                className="w-full btn-premium bg-premium-gold hover:bg-premium-gold-light text-premium-black font-semibold py-3 rounded-xl"
                disabled={!selectedSize}
              >
                Continuar
              </Button>
            </div>
          )}

          {/* Step 2: Personal Info */}
          {step === 2 && (
            <div className="space-y-6 animate-slide-up-elegant">
              <h3 className="text-xl font-semibold text-premium-white mb-6">Dados Pessoais</h3>

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
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-premium-white-soft mb-2 block">
                    WhatsApp *
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
                  disabled={!customerData.name || !customerData.email || !customerData.phone}
                >
                  Continuar
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Address */}
          {step === 3 && (
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city" className="text-premium-white-soft mb-2 block">
                    Cidade *
                  </Label>
                  <Input
                    id="city"
                    value={customerData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="bg-premium-gray-dark border-premium-gold/20 text-premium-white"
                    placeholder="Cidade"
                  />
                </div>

                <div>
                  <Label htmlFor="state" className="text-premium-white-soft mb-2 block">
                    Estado *
                  </Label>
                  <Select onValueChange={(value) => handleInputChange("state", value)}>
                    <SelectTrigger className="bg-premium-gray-dark border-premium-gold/20 text-premium-white">
                      <SelectValue placeholder="UF" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SP">São Paulo</SelectItem>
                      <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                      <SelectItem value="MG">Minas Gerais</SelectItem>
                      <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                      <SelectItem value="PR">Paraná</SelectItem>
                      <SelectItem value="SC">Santa Catarina</SelectItem>
                      <SelectItem value="BA">Bahia</SelectItem>
                      <SelectItem value="GO">Goiás</SelectItem>
                      <SelectItem value="PE">Pernambuco</SelectItem>
                      <SelectItem value="CE">Ceará</SelectItem>
                    </SelectContent>
                  </Select>
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
                  onClick={handleNextStep}
                  className="flex-1 btn-premium bg-premium-gold hover:bg-premium-gold-light text-premium-black font-semibold py-3 rounded-xl"
                  disabled={!customerData.address || !customerData.city || !customerData.state || !customerData.zipCode}
                >
                  Continuar
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Payment */}
          {step === 4 && (
            <div className="space-y-6 animate-slide-up-elegant">
              <h3 className="text-xl font-semibold text-premium-white mb-6">Pagamento</h3>

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
                  <span className="text-premium-green text-xs">Instantâneo</span>
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

              {/* PIX Payment */}
              {paymentMethod === "pix" && (
                <div className="space-y-4">
                  {!pixGenerated ? (
                    <div className="text-center">
                      <Button
                        onClick={handleGeneratePix}
                        className="btn-premium bg-premium-gold hover:bg-premium-gold-light text-premium-black font-semibold px-8 py-3 rounded-xl"
                      >
                        <QrCode className="w-5 h-5 mr-2" />
                        Gerar QR Code PIX
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* QR Code Simulation */}
                      <div className="glass-premium p-6 rounded-xl border border-premium-gold/20 text-center">
                        <div className="w-48 h-48 mx-auto bg-white rounded-lg flex items-center justify-center mb-4">
                          <QrCode className="w-32 h-32 text-premium-black" />
                        </div>
                        <p className="text-premium-white-soft text-sm mb-4">Escaneie o QR Code com seu app do banco</p>
                        <p className="text-premium-gold font-bold text-xl">R$ {pixValue.toFixed(2)}</p>
                      </div>

                      {/* PIX Key */}
                      <div className="glass-premium p-4 rounded-xl border border-premium-gold/20">
                        <p className="text-premium-white-soft text-sm mb-2">Ou use a chave PIX:</p>
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

                      <Button
                        onClick={handleWhatsAppOrder}
                        className="w-full btn-premium bg-premium-green hover:bg-premium-green/80 text-premium-white font-semibold py-3 rounded-xl"
                      >
                        Confirmar Pagamento no WhatsApp
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Card Payment */}
              {paymentMethod === "card" && (
                <div className="glass-premium p-6 rounded-xl border border-premium-gold/20">
                  <h4 className="text-premium-gold font-semibold mb-4">Pagamento com Cartão</h4>
                  <p className="text-premium-white-soft text-sm mb-4">
                    Para pagamentos com cartão, nossa equipe entrará em contato via WhatsApp para processar com
                    segurança.
                  </p>
                  <Button
                    onClick={handleWhatsAppOrder}
                    className="w-full btn-premium bg-premium-blue hover:bg-premium-blue/80 text-premium-white font-semibold py-3 rounded-xl"
                  >
                    Continuar com Cartão
                  </Button>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={() => setStep(3)}
                  variant="outline"
                  className="flex-1 border-premium-gold/20 text-premium-white hover:bg-premium-gold/10"
                >
                  Voltar
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
