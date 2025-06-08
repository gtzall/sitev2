"use client"

import { Button } from "../components/ui/button"
import { X, Ruler } from "lucide-react"

interface SizeGuideModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  if (!isOpen) return null

  const sizeChart = [
    { size: "P", chest: "88-92cm", length: "68cm", shoulder: "42cm" },
    { size: "M", chest: "96-100cm", length: "70cm", shoulder: "44cm" },
    { size: "G", chest: "104-108cm", length: "72cm", shoulder: "46cm" },
    { size: "GG", chest: "112-116cm", length: "74cm", shoulder: "48cm" },
    { size: "XGG", chest: "120-124cm", length: "76cm", shoulder: "50cm" },
  ]

  return (
    <div className="fixed inset-0 bg-premium-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-premium rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-premium-gold/20 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-premium-gold/20">
          <div className="flex items-center gap-3">
            <Ruler className="w-6 h-6 text-premium-gold" />
            <h2 className="text-2xl font-bold text-premium-white">Guia de Tamanhos</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-premium-gold/10 rounded-lg transition-colors duration-300">
            <X className="w-6 h-6 text-premium-white" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Size Chart Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-premium-gold/20">
                  <th className="text-left py-3 px-4 text-premium-gold font-semibold">Tamanho</th>
                  <th className="text-left py-3 px-4 text-premium-gold font-semibold">Peito</th>
                  <th className="text-left py-3 px-4 text-premium-gold font-semibold">Comprimento</th>
                  <th className="text-left py-3 px-4 text-premium-gold font-semibold">Ombro</th>
                </tr>
              </thead>
              <tbody>
                {sizeChart.map((item) => (
                  <tr key={item.size} className="border-b border-premium-gray-dark/30">
                    <td className="py-3 px-4 text-premium-white font-semibold">{item.size}</td>
                    <td className="py-3 px-4 text-premium-white-soft">{item.chest}</td>
                    <td className="py-3 px-4 text-premium-white-soft">{item.length}</td>
                    <td className="py-3 px-4 text-premium-white-soft">{item.shoulder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* How to Measure */}
          <div className="glass-premium p-6 rounded-xl border border-premium-gold/20">
            <h3 className="text-lg font-bold text-premium-white mb-4">Como Medir</h3>
            <div className="space-y-3 text-premium-white-soft">
              <p className="flex items-start gap-2">
                <span className="text-premium-gold">•</span>
                <strong>Peito:</strong> Meça ao redor da parte mais larga do peito
              </p>
              <p className="flex items-start gap-2">
                <span className="text-premium-gold">•</span>
                <strong>Comprimento:</strong> Do ombro até a barra da camisa
              </p>
              <p className="flex items-start gap-2">
                <span className="text-premium-gold">•</span>
                <strong>Ombro:</strong> De uma extremidade do ombro à outra
              </p>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-premium-blue/10 border border-premium-blue/20 p-4 rounded-lg">
            <h4 className="text-premium-blue font-semibold mb-2">💡 Dicas Importantes</h4>
            <ul className="text-premium-white-soft text-sm space-y-1">
              <li>• Use uma fita métrica flexível</li>
              <li>• Meça sobre roupas leves</li>
              <li>• Em caso de dúvida, escolha o tamanho maior</li>
              <li>• Entre em contato conosco para ajuda personalizada</li>
            </ul>
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
