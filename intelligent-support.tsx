"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { MessageCircle, X, ExternalLink, HelpCircle, Package, Truck, CreditCard, Ruler } from "lucide-react"
import { cn } from "../lib/utils"

interface SupportOption {
  id: string
  title: string
  icon: React.ElementType
  description: string
  questions: string[]
  whatsappMessage: string
}

const supportOptions: SupportOption[] = [
  {
    id: "quality",
    title: "Qualidade e Originalidade",
    icon: Package,
    description: "Dúvidas sobre a qualidade AAA+ e autenticidade",
    questions: [
      "As camisas são originais?",
      "Qual a diferença entre AAA+ e original?",
      "Vocês têm certificado de qualidade?",
      "O material é igual ao original?",
    ],
    whatsappMessage: "Olá! Gostaria de saber mais sobre a qualidade e originalidade das camisas Jersey World.",
  },
  {
    id: "delivery",
    title: "Entrega e Frete",
    icon: Truck,
    description: "Informações sobre prazo, frete e rastreamento",
    questions: [
      "Qual o prazo de entrega?",
      "Como funciona o frete grátis?",
      "Vocês entregam em todo Brasil?",
      "Como rastrear meu pedido?",
    ],
    whatsappMessage: "Olá! Preciso de informações sobre entrega e frete para minha região.",
  },
  {
    id: "payment",
    title: "Pagamento e PIX",
    icon: CreditCard,
    description: "Formas de pagamento, PIX e parcelamento",
    questions: [
      "Como funciona o desconto PIX?",
      "Posso parcelar no cartão?",
      "O pagamento é seguro?",
      "Quando é debitado o valor?",
    ],
    whatsappMessage: "Olá! Gostaria de esclarecer dúvidas sobre formas de pagamento e desconto PIX.",
  },
  {
    id: "sizes",
    title: "Tamanhos e Medidas",
    icon: Ruler,
    description: "Tabela de tamanhos e como escolher o ideal",
    questions: [
      "Como escolher o tamanho certo?",
      "Vocês têm tabela de medidas?",
      "Posso trocar se não servir?",
      "Qual tamanho corresponde ao M?",
    ],
    whatsappMessage: "Olá! Preciso de ajuda para escolher o tamanho ideal da camisa.",
  },
]

export function IntelligentSupport() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<SupportOption | null>(null)
  const [showQuestions, setShowQuestions] = useState(false)

  const handleOptionSelect = (option: SupportOption) => {
    setSelectedOption(option)
    setShowQuestions(true)
  }

  const handleQuestionSelect = (question: string) => {
    const message = `${selectedOption?.whatsappMessage}\n\nPergunta específica: ${question}`
    const whatsappUrl = `https://wa.me/5511967311629?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
    setIsOpen(false)
  }

  const handleDirectWhatsApp = () => {
    const message =
      selectedOption?.whatsappMessage || "Olá! Gostaria de mais informações sobre as camisas Jersey World."
    const whatsappUrl = `https://wa.me/5511967311629?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
    setIsOpen(false)
  }

  const resetFlow = () => {
    setSelectedOption(null)
    setShowQuestions(false)
  }

  return (
    <>
      {/* Support Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 left-6 z-40 p-4 rounded-full shadow-2xl transition-all duration-500 transform",
          isOpen
            ? "bg-premium-red hover:bg-premium-red/80 rotate-180"
            : "bg-premium-blue hover:bg-premium-blue-light animate-glow-pulse hover:scale-110",
        )}
      >
        {isOpen ? <X className="w-6 h-6 text-premium-white" /> : <HelpCircle className="w-6 h-6 text-premium-white" />}
      </button>

      {/* Support Panel */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-40 w-80 md:w-96 glass-premium rounded-2xl shadow-2xl border border-premium-gold/20 animate-slide-up-elegant">
          {/* Header */}
          <div className="bg-premium-blue text-premium-white p-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold">Suporte Inteligente</h3>
                <p className="text-sm opacity-90">Como podemos ajudar?</p>
              </div>
              {selectedOption && (
                <button onClick={resetFlow} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  ←
                </button>
              )}
            </div>
          </div>

          <div className="p-4">
            {!selectedOption ? (
              /* Main Options */
              <div className="space-y-3 animate-fade-in-up">
                <p className="text-premium-white-soft text-sm text-center mb-4">
                  Selecione o assunto para respostas rápidas:
                </p>

                {supportOptions.map((option) => {
                  const Icon = option.icon
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleOptionSelect(option)}
                      className="w-full glass-premium rounded-xl p-4 border border-premium-gold/20 hover:border-premium-gold/40 transition-all duration-300 text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-premium-blue/20 flex items-center justify-center group-hover:bg-premium-blue/30 transition-colors">
                          <Icon className="w-5 h-5 text-premium-blue" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-premium-white group-hover:text-premium-gold transition-colors">
                            {option.title}
                          </h4>
                          <p className="text-premium-white-soft text-xs">{option.description}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}

                <div className="pt-4 border-t border-premium-gold/20">
                  <Button
                    onClick={handleDirectWhatsApp}
                    className="w-full bg-premium-green hover:bg-premium-green/80 text-premium-white"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Falar Direto no WhatsApp
                  </Button>
                </div>
              </div>
            ) : (
              /* Selected Option Questions */
              <div className="space-y-3 animate-fade-in-up">
                <div className="flex items-center gap-3 mb-4">
                  <selectedOption.icon className="w-6 h-6 text-premium-gold" />
                  <h4 className="font-semibold text-premium-white">{selectedOption.title}</h4>
                </div>

                <p className="text-premium-white-soft text-sm mb-4">
                  Escolha uma pergunta específica ou fale direto conosco:
                </p>

                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {selectedOption.questions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuestionSelect(question)}
                      className="w-full text-left p-3 bg-premium-gold/10 hover:bg-premium-gold/20 rounded-lg text-premium-white text-sm transition-all duration-300 border border-premium-gold/20 hover:border-premium-gold/40"
                    >
                      {question}
                    </button>
                  ))}
                </div>

                <div className="pt-4 space-y-2">
                  <Button
                    onClick={handleDirectWhatsApp}
                    className="w-full bg-premium-green hover:bg-premium-green/80 text-premium-white"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Continuar no WhatsApp
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
