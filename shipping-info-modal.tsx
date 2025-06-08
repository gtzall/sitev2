"use client"

import { Button } from "../components/ui/button"
import { X, Package, MapPin, Clock, CheckCircle, Truck, CreditCard } from "lucide-react"

interface ShippingInfoModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ShippingInfoModal({ isOpen, onClose }: ShippingInfoModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-premium-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-premium rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-premium-gold/20 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-premium-gold/20">
          <h2 className="text-2xl font-bold text-premium-white">Envio e Entrega</h2>
          <button onClick={onClose} className="p-2 hover:bg-premium-gold/10 rounded-lg transition-colors duration-300">
            <X className="w-6 h-6 text-premium-white" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Process Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-premium-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-premium-black" />
              </div>
              <h3 className="font-semibold text-premium-white mb-2">1. Pagamento</h3>
              <p className="text-premium-white-soft text-sm">PIX via QR Code ou código gerado automaticamente</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-premium-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-premium-white" />
              </div>
              <h3 className="font-semibold text-premium-white mb-2">2. Confirmação</h3>
              <p className="text-premium-white-soft text-sm">Verificação do pagamento em até 2 horas</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-premium-green rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-premium-white" />
              </div>
              <h3 className="font-semibold text-premium-white mb-2">3. Preparação</h3>
              <p className="text-premium-white-soft text-sm">Embalagem cuidadosa e postagem</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-premium-red rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-premium-white" />
              </div>
              <h3 className="font-semibold text-premium-white mb-2">4. Entrega</h3>
              <p className="text-premium-white-soft text-sm">Recebimento em casa ou local marcado</p>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Process */}
            <div className="glass-premium p-6 rounded-xl border border-premium-gold/20">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="w-6 h-6 text-premium-gold" />
                <h3 className="text-xl font-bold text-premium-white">Processo de Pagamento</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-premium-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-premium-black text-xs font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-premium-white">Escolha PIX</h4>
                    <p className="text-premium-white-soft text-sm">Selecione PIX como forma de pagamento no checkout</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-premium-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-premium-black text-xs font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-premium-white">QR Code Automático</h4>
                    <p className="text-premium-white-soft text-sm">
                      Sistema gera QR Code ou código PIX automaticamente
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-premium-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-premium-black text-xs font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-premium-white">Pagamento Instantâneo</h4>
                    <p className="text-premium-white-soft text-sm">
                      Escaneie o QR Code ou copie o código no seu app bancário
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Options */}
            <div className="glass-premium p-6 rounded-xl border border-premium-gold/20">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-premium-gold" />
                <h3 className="text-xl font-bold text-premium-white">Opções de Entrega</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-premium-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-premium-white text-xs font-bold">🏠</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-premium-white">Entrega Residencial</h4>
                    <p className="text-premium-white-soft text-sm">
                      Receba diretamente em sua casa no horário comercial
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-premium-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-premium-white text-xs font-bold">📍</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-premium-white">Local Marcado</h4>
                    <p className="text-premium-white-soft text-sm">Combine um local específico para recebimento</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-premium-red rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-premium-white text-xs font-bold">🏢</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-premium-white">Entrega Comercial</h4>
                    <p className="text-premium-white-soft text-sm">Receba em seu local de trabalho</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="glass-premium p-6 rounded-xl border border-premium-gold/20">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-premium-gold" />
              <h3 className="text-xl font-bold text-premium-white">Cronograma de Entrega</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-premium-gold rounded-full flex items-center justify-center">
                  <span className="text-premium-black font-bold">0h</span>
                </div>
                <div>
                  <h4 className="font-semibold text-premium-white">Pagamento Confirmado</h4>
                  <p className="text-premium-white-soft text-sm">PIX processado automaticamente</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-premium-blue rounded-full flex items-center justify-center">
                  <span className="text-premium-white font-bold">2h</span>
                </div>
                <div>
                  <h4 className="font-semibold text-premium-white">Pedido Processado</h4>
                  <p className="text-premium-white-soft text-sm">Verificação e preparação do produto</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-premium-green rounded-full flex items-center justify-center">
                  <span className="text-premium-white font-bold">24h</span>
                </div>
                <div>
                  <h4 className="font-semibold text-premium-white">Produto Postado</h4>
                  <p className="text-premium-white-soft text-sm">Envio pelos Correios com código de rastreamento</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-premium-red rounded-full flex items-center justify-center">
                  <span className="text-premium-white font-bold">3-7d</span>
                </div>
                <div>
                  <h4 className="font-semibold text-premium-white">Entrega Realizada</h4>
                  <p className="text-premium-white-soft text-sm">Produto entregue no local escolhido</p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="glass-premium p-6 rounded-xl border border-premium-gold/20 bg-premium-blue/5">
            <h3 className="text-lg font-bold text-premium-white mb-4">Informações Importantes</h3>
            <div className="space-y-3 text-premium-white-soft">
              <p className="flex items-start gap-2">
                <span className="text-premium-gold">•</span>
                Frete grátis para compras acima de R$ 200,00
              </p>
              <p className="flex items-start gap-2">
                <span className="text-premium-gold">•</span>
                Código de rastreamento enviado via WhatsApp
              </p>
              <p className="flex items-start gap-2">
                <span className="text-premium-gold">•</span>
                Entrega em dias úteis, de segunda a sexta-feira
              </p>
              <p className="flex items-start gap-2">
                <span className="text-premium-gold">•</span>
                Embalagem discreta e segura para proteção do produto
              </p>
              <p className="flex items-start gap-2">
                <span className="text-premium-gold">•</span>
                Suporte via WhatsApp durante todo o processo
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={onClose}
              className="btn-premium bg-premium-gold hover:bg-premium-gold-light text-premium-black px-8 py-3"
            >
              Entendi
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
