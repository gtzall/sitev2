"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { MessageCircle, X, Send, ExternalLink } from "lucide-react"
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
  preço: "Nossos preços variam de R$ 89,90 a R$ 299,90. Temos promoções especiais toda semana! 💰",
  preco: "Nossos preços variam de R$ 89,90 a R$ 299,90. Temos promoções especiais toda semana! 💰",
  entrega: "Entregamos para todo o Brasil! Prazo de 3-7 dias úteis. Frete grátis acima de R$ 200! 🚚",
  tamanho: "Trabalhamos com tamanhos P, M, G, GG e XGG. Consulte nossa tabela de medidas! 📏",
  pagamento: "Aceitamos PIX (10% desconto), cartão de crédito e débito! 💳",
  pix: "PIX tem 10% de desconto! Chave: 11963116629 📱",
  troca: "Você tem 30 dias para trocar ou devolver. Produto deve estar sem uso e com etiquetas. 🔄",
  qualidade: "Todas nossas camisas são AAA+ com qualidade premium e licenciadas! ⭐",
  whatsapp: "Vou te conectar com nosso WhatsApp para um atendimento mais personalizado! 📱",
  default: "Entendi! Para um atendimento mais detalhado, que tal conversarmos pelo WhatsApp? 💬",
}

export function SupportChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Olá! Sou o assistente da Jersey World. Como posso ajudá-lo? 🏆",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    setTimeout(() => {
      const lowerInput = inputValue.toLowerCase()
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
    }, 1000)

    setInputValue("")
  }

  const handleWhatsAppRedirect = () => {
    const message = "Olá! Vim do site Jersey World e gostaria de mais informações sobre as camisas."
    const whatsappUrl = `https://wa.me/5511963116629?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-lg transition-all duration-300",
          isOpen ? "bg-red-600 hover:bg-red-700" : "bg-modern-blue hover:bg-modern-blue-light animate-glow",
        )}
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 h-96 glass rounded-xl shadow-xl flex flex-col animate-slide-up border border-modern-blue/20">
          <div className="bg-modern-blue text-white p-4 rounded-t-xl">
            <h3 className="font-bold">Suporte Jersey World</h3>
            <p className="text-sm opacity-90">Online agora • Resposta rápida</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={cn("flex", message.isUser ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[80%] p-3 rounded-lg text-sm",
                    message.isUser ? "bg-modern-blue text-white" : "bg-modern-gray-light text-white",
                  )}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-modern-blue/20">
            <div className="flex gap-2 mb-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-modern-gray-light border-modern-blue/20 text-white"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} size="sm" className="bg-modern-blue hover:bg-modern-blue-light">
                <Send className="w-4 h-4" />
              </Button>
            </div>

            <Button
              onClick={handleWhatsAppRedirect}
              className="w-full bg-green-600 hover:bg-green-700 text-white text-sm"
              size="sm"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Continuar no WhatsApp
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
