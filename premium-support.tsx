"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { MessageCircle, X, Send, ExternalLink, Headphones, Clock, Star } from "lucide-react"
import { cn } from "../lib/utils"

interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
}

const predefinedResponses = {
  ola: "Olá! Bem-vindo à Jersey World! Como posso ajudá-lo hoje? 👋",
  olá: "Olá! Bem-vindo à Jersey World! Como posso ajudá-lo hoje? 👋",
  oi: "Oi! Como posso ajudá-lo? 😊",
  hello: "Olá! Bem-vindo à Jersey World! Como posso ajudá-lo hoje? 👋",
  hi: "Oi! Como posso ajudá-lo? 😊",
  preço: "Nossos preços variam de R$ 89,90 a R$ 299,90. Temos promoções especiais toda semana! 💰",
  preco: "Nossos preços variam de R$ 89,90 a R$ 299,90. Temos promoções especiais toda semana! 💰",
  price: "Nossos preços variam de R$ 89,90 a R$ 299,90. Temos promoções especiais toda semana! 💰",
  valor: "Nossos preços variam de R$ 89,90 a R$ 299,90. Temos promoções especiais toda semana! 💰",
  entrega: "Entregamos para todo o Brasil! Prazo de 3-7 dias úteis. Frete grátis acima de R$ 200! 🚚",
  delivery: "Entregamos para todo o Brasil! Prazo de 3-7 dias úteis. Frete grátis acima de R$ 200! 🚚",
  shipping: "Entregamos para todo o Brasil! Prazo de 3-7 dias úteis. Frete grátis acima de R$ 200! 🚚",
  frete: "Entregamos para todo o Brasil! Prazo de 3-7 dias úteis. Frete grátis acima de R$ 200! 🚚",
  envio: "Entregamos para todo o Brasil! Prazo de 3-7 dias úteis. Frete grátis acima de R$ 200! 🚚",
  tamanho: "Trabalhamos com tamanhos P, M, G, GG e XGG. Consulte nossa tabela de medidas! 📏",
  size: "Trabalhamos com tamanhos P, M, G, GG e XGG. Consulte nossa tabela de medidas! 📏",
  medida: "Trabalhamos com tamanhos P, M, G, GG e XGG. Consulte nossa tabela de medidas! 📏",
  pagamento: "Aceitamos PIX (10% desconto), cartão de crédito e débito! 💳",
  payment: "Aceitamos PIX (10% desconto), cartão de crédito e débito! 💳",
  pagar: "Aceitamos PIX (10% desconto), cartão de crédito e débito! 💳",
  pix: "PIX tem 10% de desconto! Chave: 11967311629 📱",
  troca: "Você tem 30 dias para trocar ou devolver. Produto deve estar sem uso e com etiquetas. 🔄",
  exchange: "Você tem 30 dias para trocar ou devolver. Produto deve estar sem uso e com etiquetas. 🔄",
  return: "Você tem 30 dias para trocar ou devolver. Produto deve estar sem uso e com etiquetas. 🔄",
  devolução: "Você tem 30 dias para trocar ou devolver. Produto deve estar sem uso e com etiquetas. 🔄",
  devolver: "Você tem 30 dias para trocar ou devolver. Produto deve estar sem uso e com etiquetas. 🔄",
  qualidade: "Todas nossas camisas são AAA+ com qualidade premium e licenciadas! ⭐",
  quality: "Todas nossas camisas são AAA+ com qualidade premium e licenciadas! ⭐",
  material: "Todas nossas camisas são AAA+ com qualidade premium e licenciadas! ⭐",
  whatsapp: "Vou te conectar com nosso WhatsApp para um atendimento mais personalizado! 📱",
  horario: "Atendemos de segunda a sexta das 9h às 18h, e sábados das 9h às 14h! 🕒",
  horário: "Atendemos de segunda a sexta das 9h às 18h, e sábados das 9h às 14h! 🕒",
  funcionamento: "Atendemos de segunda a sexta das 9h às 18h, e sábados das 9h às 14h! 🕒",
  desconto: "Temos 10% de desconto no PIX e promoções especiais toda semana! Use o cupom FIRST10 para 10% off! 🎉",
  promocao: "Temos 10% de desconto no PIX e promoções especiais toda semana! Use o cupom FIRST10 para 10% off! 🎉",
  promoção: "Temos 10% de desconto no PIX e promoções especiais toda semana! Use o cupom FIRST10 para 10% off! 🎉",
  cupom: "Use o cupom FIRST10 para 10% de desconto na primeira compra! 🎉",
  times: "Temos camisas de mais de 500 times do mundo todo! Brasileirão, Premier League, La Liga e muito mais! ⚽",
  clubes: "Temos camisas de mais de 500 times do mundo todo! Brasileirão, Premier League, La Liga e muito mais! ⚽",
  brasil:
    "Temos todas as principais camisas do Brasileirão: Flamengo, São Paulo, Corinthians, Palmeiras e muito mais! 🇧🇷",
  brasileirão:
    "Temos todas as principais camisas do Brasileirão: Flamengo, São Paulo, Corinthians, Palmeiras e muito mais! 🇧🇷",
  europa:
    "Temos camisas dos principais times europeus: Real Madrid, Barcelona, Manchester United, Liverpool e muito mais! 🇪🇺",
  internacional: "Temos camisas de times do mundo todo! Europa, América do Sul, América do Norte e Ásia! 🌍",
  personalizar:
    "Podemos personalizar sua camisa com nome e número! Entre em contato pelo WhatsApp para mais detalhes! ✨",
  personalização:
    "Podemos personalizar sua camisa com nome e número! Entre em contato pelo WhatsApp para mais detalhes! ✨",
  nome: "Podemos personalizar sua camisa com nome e número! Entre em contato pelo WhatsApp para mais detalhes! ✨",
  numero: "Podemos personalizar sua camisa com nome e número! Entre em contato pelo WhatsApp para mais detalhes! ✨",
  número: "Podemos personalizar sua camisa com nome e número! Entre em contato pelo WhatsApp para mais detalhes! ✨",
  default: "Entendi! Para um atendimento mais detalhado, que tal conversarmos pelo WhatsApp? 💬",
}

const quickQuestions = [
  "Qual o prazo de entrega?",
  "Como funciona o pagamento PIX?",
  "Vocês têm camisas do meu time?",
  "Qual a política de troca?",
  "Como personalizar a camisa?",
  "Quais tamanhos disponíveis?",
]

export function PremiumSupport() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Olá! Sou o assistente da Jersey World. Como posso ajudá-lo hoje? 🏆",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showQuickQuestions, setShowQuickQuestions] = useState(true)

  const handleSendMessage = (message?: string) => {
    const messageText = message || inputValue
    if (!messageText.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)
    setShowQuickQuestions(false)

    setTimeout(() => {
      const lowerInput = messageText.toLowerCase()
      let response = predefinedResponses.default

      for (const [keyword, reply] of Object.entries(predefinedResponses)) {
        if (lowerInput.includes(keyword)) {
          response = reply
          break
        }
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: response,
        isUser: false,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)

    setInputValue("")
  }

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question)
  }

  const handleWhatsAppRedirect = () => {
    const message = "Olá! Vim do site Jersey World e gostaria de mais informações sobre as camisas."
    const whatsappUrl = `https://wa.me/5511967311629?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <>
      {/* Support Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-2xl transition-all duration-500 transform",
          isOpen
            ? "bg-premium-red hover:bg-premium-red/80 rotate-180"
            : "bg-premium-gold hover:bg-premium-gold-light animate-glow-pulse hover:scale-110",
        )}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-premium-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-premium-black" />
        )}
      </button>

      {/* Support Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 md:w-96 h-[600px] glass-premium rounded-2xl shadow-2xl flex flex-col animate-slide-up-elegant border border-premium-gold/20">
          {/* Header */}
          <div className="bg-premium-gold text-premium-black p-4 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-premium-black rounded-full flex items-center justify-center">
                <Headphones className="w-5 h-5 text-premium-gold" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold">Suporte Jersey World</h3>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-premium-green rounded-full animate-pulse"></div>
                  <span>Online agora • Resposta rápida</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-premium-black" />
                <span className="text-sm font-semibold">4.9</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn("flex animate-scale-in", message.isUser ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[80%] p-3 rounded-2xl text-sm shadow-lg",
                    message.isUser
                      ? "bg-premium-gold text-premium-black rounded-br-sm"
                      : "bg-premium-gray-dark text-premium-white rounded-bl-sm border border-premium-gold/20",
                  )}
                >
                  {message.text}
                  <div
                    className={cn(
                      "text-xs mt-1 opacity-70",
                      message.isUser ? "text-premium-black/70" : "text-premium-white-soft",
                    )}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            ))}

            {/* Quick Questions */}
            {showQuickQuestions && (
              <div className="space-y-2 animate-scale-in">
                <p className="text-premium-white-soft text-sm text-center">Perguntas frequentes:</p>
                <div className="grid grid-cols-1 gap-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="text-left p-2 bg-premium-gold/10 hover:bg-premium-gold/20 rounded-lg text-premium-white text-sm transition-all duration-300 border border-premium-gold/20"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-scale-in">
                <div className="bg-premium-gray-dark text-premium-white p-3 rounded-2xl rounded-bl-sm border border-premium-gold/20">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-premium-gold rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-premium-gold rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-premium-gold rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-premium-gold/20">
            <div className="flex gap-2 mb-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-premium-gray-dark border-premium-gold/20 text-premium-white placeholder:text-premium-gray-medium rounded-xl"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button
                onClick={() => handleSendMessage()}
                size="sm"
                className="btn-premium bg-premium-gold hover:bg-premium-gold-light text-premium-black px-4 rounded-xl"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            <Button
              onClick={handleWhatsAppRedirect}
              className="w-full bg-premium-green hover:bg-premium-green/80 text-premium-white text-sm py-2 rounded-xl transition-all duration-300"
              size="sm"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Continuar no WhatsApp
            </Button>

            <div className="flex items-center justify-center gap-2 mt-2 text-xs text-premium-gray-medium">
              <Clock className="w-3 h-3" />
              <span>Geralmente responde em minutos</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
