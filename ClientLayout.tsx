"use client"

import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const handleFooterClick = (action: string) => {
    const event = new CustomEvent(action)
    window.dispatchEvent(event)
  }

  const handleWhatsAppContact = () => {
    const message = "Olá! Gostaria de mais informações sobre as camisas Jersey World."
    const whatsappUrl = `https://wa.me/5511967311629?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleEmailContact = () => {
    window.location.href = "mailto:ogustavo.ctt@gmail.com?subject=Contato Jersey World"
  }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.className} bg-premium-black text-premium-white antialiased`}>
        {children}

        {/* Premium Footer */}
        <footer className="bg-premium-black border-t border-premium-gold/20 py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-2xl font-black cinematic-text">JERSEY</h3>
                  <span className="bg-premium-gold text-premium-black px-2 py-1 rounded-full text-sm font-bold">
                    2025
                  </span>
                </div>
                <p className="text-premium-white-soft mb-6 max-w-md">
                  Sua loja premium de camisas autênticas de futebol com qualidade AAA+. Conectando você ao seu time do
                  coração através de produtos excepcionais.
                </p>
                <div className="flex items-center gap-3 text-premium-white-soft">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="font-semibold text-premium-white">Guarulhos, São Paulo</p>
                    <p className="text-sm">Atendendo todo o Brasil</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-premium-gold font-semibold mb-6">Atendimento</h4>
                <ul className="space-y-3 text-premium-white-soft">
                  <li
                    className="hover:text-premium-gold transition-colors cursor-pointer"
                    onClick={handleWhatsAppContact}
                  >
                    WhatsApp: +55 11 96731-1629
                  </li>
                  <li className="hover:text-premium-gold transition-colors cursor-pointer" onClick={handleEmailContact}>
                    Email: ogustavo.ctt@gmail.com
                  </li>
                  <li className="hover:text-premium-gold transition-colors cursor-pointer">Seg-Sex: 9h - 18h</li>
                  <li className="hover:text-premium-gold transition-colors cursor-pointer">Sáb: 9h - 14h</li>
                </ul>
              </div>

              <div>
                <h4 className="text-premium-gold font-semibold mb-6">Informações</h4>
                <ul className="space-y-3 text-premium-white-soft">
                  <li
                    className="hover:text-premium-gold transition-colors cursor-pointer"
                    onClick={() => scrollToSection("about-section")}
                  >
                    Sobre Nós
                  </li>
                  <li
                    className="hover:text-premium-gold transition-colors cursor-pointer"
                    onClick={() => handleFooterClick("openExchangePolicy")}
                  >
                    Política de Troca
                  </li>
                  <li
                    className="hover:text-premium-gold transition-colors cursor-pointer"
                    onClick={() => handleFooterClick("openShippingInfo")}
                  >
                    Envio e Entrega
                  </li>
                  <li
                    className="hover:text-premium-gold transition-colors cursor-pointer"
                    onClick={() => handleFooterClick("openSizeGuide")}
                  >
                    Guia de Tamanhos
                  </li>
                  <li
                    className="hover:text-premium-gold transition-colors cursor-pointer"
                    onClick={() => handleFooterClick("openTerms")}
                  >
                    Termos de Serviço
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-premium-gold/20 pt-8 text-center">
              <p className="text-premium-white-soft mb-2">&copy; 2025 Jersey. Todos os direitos reservados.</p>
              <p className="text-premium-gray-medium text-sm">
                Camisas Premium de Futebol • Qualidade AAA+ Garantida • Guarulhos, SP
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
