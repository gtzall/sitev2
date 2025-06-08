"use client"

import { Button } from "../components/ui/button"
import { X, RefreshCw, Clock, CheckCircle, AlertCircle } from "lucide-react"

interface ExchangePolicyModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ExchangePolicyModal({ isOpen, onClose }: ExchangePolicyModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-premium-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-premium rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-premium-gold/20 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-premium-gold/20">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-6 h-6 text-premium-gold" />
            <h2 className="text-2xl font-bold text-premium-white">Política de Troca e Devolução</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-premium-gold/10 rounded-lg transition-colors duration-300">
            <X className="w-6 h-6 text-premium-white" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Overview */}
          <div className="text-center">
            <div className="w-20 h-20 bg-premium-gold rounded-full flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="w-10 h-10 text-premium-black" />
            </div>
            <h3 className="text-2xl font-bold text-premium-white mb-2">30 Dias para Trocar ou Devolver</h3>
            <p className="text-premium-white-soft">Sua satisfação é nossa prioridade</p>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-premium-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-premium-white" />
              </div>
              <h4 className="font-semibold text-premium-white mb-2">1. Prazo</h4>
              <p className="text-premium-white-soft text-sm">30 dias corridos a partir do recebimento</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-premium-green rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-premium-white" />
              </div>
              <h4 className="font-semibold text-premium-white mb-2">2. Condições</h4>
              <p className="text-premium-white-soft text-sm">Produto sem uso e com etiquetas originais</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-premium-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-8 h-8 text-premium-black" />
              </div>
              <h4 className="font-semibold text-premium-white mb-2">3. Processo</h4>
              <p className="text-premium-white-soft text-sm">Contato via WhatsApp para iniciar</p>
            </div>
          </div>

          {/* Detailed Conditions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* What's Accepted */}
            <div className="glass-premium p-6 rounded-xl border border-premium-green/20">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-premium-green" />
                <h3 className="text-xl font-bold text-premium-white">Aceito para Troca/Devolução</h3>
              </div>
              <ul className="space-y-3 text-premium-white-soft">
                <li className="flex items-start gap-2">
                  <span className="text-premium-green">✓</span>
                  Produto sem uso e sem lavagem
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-premium-green">✓</span>
                  Etiquetas originais preservadas
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-premium-green">✓</span>
                  Embalagem original (quando possível)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-premium-green">✓</span>
                  Defeito de fabricação
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-premium-green">✓</span>
                  Produto diferente do pedido
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-premium-green">✓</span>
                  Tamanho incorreto
                </li>
              </ul>
            </div>

            {/* What's Not Accepted */}
            <div className="glass-premium p-6 rounded-xl border border-premium-red/20">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-premium-red" />
                <h3 className="text-xl font-bold text-premium-white">Não Aceito</h3>
              </div>
              <ul className="space-y-3 text-premium-white-soft">
                <li className="flex items-start gap-2">
                  <span className="text-premium-red">✗</span>
                  Produto usado ou lavado
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-premium-red">✗</span>
                  Etiquetas removidas ou danificadas
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-premium-red">✗</span>
                  Produtos personalizados
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-premium-red">✗</span>
                  Danos causados pelo cliente
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-premium-red">✗</span>
                  Prazo de 30 dias expirado
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-premium-red">✗</span>
                  Produtos em promoção especial*
                </li>
              </ul>
            </div>
          </div>

          {/* How to Process */}
          <div className="glass-premium p-6 rounded-xl border border-premium-gold/20">
            <h3 className="text-xl font-bold text-premium-white mb-4">Como Solicitar Troca/Devolução</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-premium-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-premium-black text-xs font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-premium-white">Entre em Contato</h4>
                  <p className="text-premium-white-soft text-sm">
                    Envie mensagem para nosso WhatsApp: +55 11 96731-1629
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-premium-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-premium-black text-xs font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-premium-white">Informe os Dados</h4>
                  <p className="text-premium-white-soft text-sm">
                    Número do pedido, motivo da troca/devolução e fotos do produto
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-premium-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-premium-black text-xs font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-premium-white">Aguarde Aprovação</h4>
                  <p className="text-premium-white-soft text-sm">Analisaremos sua solicitação em até 24 horas úteis</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-premium-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-premium-black text-xs font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-semibold text-premium-white">Envio do Produto</h4>
                  <p className="text-premium-white-soft text-sm">Envie o produto para o endereço que forneceremos</p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-premium-blue/10 border border-premium-blue/20 p-6 rounded-xl">
            <h3 className="text-lg font-bold text-premium-white mb-4">Informações Importantes</h3>
            <div className="space-y-2 text-premium-white-soft text-sm">
              <p>• O frete de devolução é por conta do cliente, exceto em casos de defeito ou erro nosso</p>
              <p>• Reembolsos são processados em até 7 dias úteis após recebermos o produto</p>
              <p>• Trocas por outros produtos dependem de disponibilidade em estoque</p>
              <p>• *Produtos em liquidação podem ter condições especiais de troca</p>
              <p>• Mantenha sempre o comprovante de compra</p>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={onClose}
              className="btn-premium bg-premium-gold hover:bg-premium-gold-light text-premium-black px-8 py-3"
            >
              Entendi a Política
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
