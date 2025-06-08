"use client"

import { Button } from "../components/ui/button"
import { X, FileText, Shield, CreditCard, Truck } from "lucide-react"

interface TermsOfServiceModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TermsOfServiceModal({ isOpen, onClose }: TermsOfServiceModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-premium-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-premium rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-premium-gold/20 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-premium-gold/20">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-premium-gold" />
            <h2 className="text-2xl font-bold text-premium-white">Termos de Serviço</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-premium-gold/10 rounded-lg transition-colors duration-300">
            <X className="w-6 h-6 text-premium-white" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Introduction */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-premium-white mb-4">Jersey World - Termos de Serviço</h3>
            <p className="text-premium-white-soft">
              Ao utilizar nossos serviços, você concorda com os seguintes termos e condições.
            </p>
          </div>

          {/* Key Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-premium-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-premium-white" />
              </div>
              <h4 className="font-semibold text-premium-white mb-2">Privacidade</h4>
              <p className="text-premium-white-soft text-sm">Seus dados são protegidos</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-premium-green rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-premium-white" />
              </div>
              <h4 className="font-semibold text-premium-white mb-2">Pagamentos</h4>
              <p className="text-premium-white-soft text-sm">Transações seguras</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-premium-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-premium-black" />
              </div>
              <h4 className="font-semibold text-premium-white mb-2">Entrega</h4>
              <p className="text-premium-white-soft text-sm">Prazos garantidos</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-premium-red rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-premium-white" />
              </div>
              <h4 className="font-semibold text-premium-white mb-2">Qualidade</h4>
              <p className="text-premium-white-soft text-sm">Produtos AAA+</p>
            </div>
          </div>

          {/* Detailed Terms */}
          <div className="space-y-6">
            {/* Company Info */}
            <div className="glass-premium p-6 rounded-xl border border-premium-gold/20">
              <h3 className="text-xl font-bold text-premium-white mb-4">1. Informações da Empresa</h3>
              <div className="space-y-2 text-premium-white-soft">
                <p>
                  <strong>Razão Social:</strong> Jersey World LTDA
                </p>
                <p>
                  <strong>Localização:</strong> Guarulhos, São Paulo, Brasil
                </p>
                <p>
                  <strong>Contato:</strong> +55 11 96731-1629
                </p>
                <p>
                  <strong>Email:</strong> ogustavo.ctt@gmail.com
                </p>
                <p>
                  <strong>Horário de Atendimento:</strong> Segunda a Sexta: 9h às 18h | Sábado: 9h às 14h
                </p>
              </div>
            </div>

            {/* Products and Quality */}
            <div className="glass-premium p-6 rounded-xl border border-premium-gold/20">
              <h3 className="text-xl font-bold text-premium-white mb-4">2. Produtos e Qualidade</h3>
              <div className="space-y-3 text-premium-white-soft">
                <p>• Todas as camisas são de qualidade AAA+ com materiais premium</p>
                <p>• Designs autênticos baseados nos modelos oficiais</p>
                <p>• Garantia de qualidade por 30 dias</p>
                <p>• Produtos sujeitos à disponibilidade em estoque</p>
                <p>• Cores podem variar ligeiramente devido à configuração do monitor</p>
              </div>
            </div>

            {/* Payment Terms */}
            <div className="glass-premium p-6 rounded-xl border border-premium-gold/20">
              <h3 className="text-xl font-bold text-premium-white mb-4">3. Condições de Pagamento</h3>
              <div className="space-y-3 text-premium-white-soft">
                <p>
                  • <strong>PIX:</strong> Pagamento instantâneo com 10% de desconto
                </p>
                <p>
                  • <strong>Cartão:</strong> Processamento via WhatsApp com nossa equipe
                </p>
                <p>• Preços válidos apenas durante a sessão de compra</p>
                <p>• Promoções podem ter condições específicas</p>
                <p>• Não aceitamos pagamento na entrega</p>
              </div>
            </div>

            {/* Shipping and Delivery */}
            <div className="glass-premium p-6 rounded-xl border border-premium-gold/20">
              <h3 className="text-xl font-bold text-premium-white mb-4">4. Envio e Entrega</h3>
              <div className="space-y-3 text-premium-white-soft">
                <p>
                  • <strong>Prazo:</strong> 3 a 7 dias úteis para todo o Brasil
                </p>
                <p>
                  • <strong>Frete Grátis:</strong> Compras acima de R$ 200,00
                </p>
                <p>
                  • <strong>Processamento:</strong> Até 2 horas após confirmação do pagamento
                </p>
                <p>
                  • <strong>Rastreamento:</strong> Código enviado via WhatsApp
                </p>
                <p>
                  • <strong>Responsabilidade:</strong> Até a entrega pelos Correios
                </p>
                <p>• Endereço incorreto pode gerar custos adicionais</p>
              </div>
            </div>

            {/* Privacy and Data */}
            <div className="glass-premium p-6 rounded-xl border border-premium-gold/20">
              <h3 className="text-xl font-bold text-premium-white mb-4">5. Privacidade e Dados</h3>
              <div className="space-y-3 text-premium-white-soft">
                <p>• Coletamos apenas dados necessários para o pedido</p>
                <p>• Informações não são compartilhadas com terceiros</p>
                <p>• Dados de pagamento processados com segurança</p>
                <p>• Você pode solicitar exclusão dos seus dados</p>
                <p>• Comunicação via WhatsApp para atualizações do pedido</p>
              </div>
            </div>

            {/* Limitations */}
            <div className="glass-premium p-6 rounded-xl border border-premium-gold/20">
              <h3 className="text-xl font-bold text-premium-white mb-4">6. Limitações e Responsabilidades</h3>
              <div className="space-y-3 text-premium-white-soft">
                <p>• Não nos responsabilizamos por atrasos dos Correios</p>
                <p>• Produtos sujeitos à disponibilidade</p>
                <p>• Preços podem sofrer alterações sem aviso prévio</p>
                <p>• Uso inadequado do produto anula a garantia</p>
                <p>• Disputas resolvidas preferencialmente via acordo</p>
              </div>
            </div>

            {/* Changes to Terms */}
            <div className="glass-premium p-6 rounded-xl border border-premium-gold/20">
              <h3 className="text-xl font-bold text-premium-white mb-4">7. Alterações nos Termos</h3>
              <div className="space-y-3 text-premium-white-soft">
                <p>• Reservamos o direito de alterar estes termos</p>
                <p>• Mudanças serão comunicadas via site e WhatsApp</p>
                <p>• Uso continuado implica aceitação das alterações</p>
                <p>• Versão mais recente sempre disponível no site</p>
              </div>
            </div>
          </div>

          {/* Contact for Questions */}
          <div className="bg-premium-blue/10 border border-premium-blue/20 p-6 rounded-xl">
            <h3 className="text-lg font-bold text-premium-white mb-4">Dúvidas sobre os Termos?</h3>
            <p className="text-premium-white-soft mb-4">
              Entre em contato conosco para esclarecimentos sobre qualquer item destes termos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => {
                  const message = "Olá! Tenho dúvidas sobre os Termos de Serviço da Jersey World."
                  const whatsappUrl = `https://wa.me/5511967311629?text=${encodeURIComponent(message)}`
                  window.open(whatsappUrl, "_blank")
                }}
                className="bg-premium-green hover:bg-premium-green/80 text-premium-white"
              >
                WhatsApp
              </Button>
              <Button
                onClick={() => {
                  window.location.href = "mailto:ogustavo.ctt@gmail.com?subject=Dúvidas sobre Termos de Serviço"
                }}
                variant="outline"
                className="border-premium-blue text-premium-blue hover:bg-premium-blue/10"
              >
                Email
              </Button>
            </div>
          </div>

          <div className="text-center">
            <p className="text-premium-white-soft text-sm mb-4">Última atualização: Janeiro de 2025</p>
            <Button
              onClick={onClose}
              className="btn-premium bg-premium-gold hover:bg-premium-gold-light text-premium-black px-8 py-3"
            >
              Li e Concordo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
