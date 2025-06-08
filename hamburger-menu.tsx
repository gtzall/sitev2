"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import {
  Menu,
  X,
  ChevronRight,
  Trophy,
  Star,
  Zap,
  Globe,
  ShoppingBag,
  Heart,
  User,
  MapPin,
  MessageSquare,
  Info,
  FileText,
  Truck,
  Ruler,
  RefreshCw,
  Phone,
  Mail,
  Filter,
  CreditCard,
  Settings,
  Bell,
  Gift,
  Percent,
  Calendar,
  Award,
  TrendingUp,
  Search,
  Bookmark,
  Share2,
  Download,
  HelpCircle,
  Shield,
  Clock,
  Target,
  Sparkles,
} from "lucide-react"
import { cn } from "../lib/utils"

interface Category {
  id: string
  name: string
  icon: React.ElementType
  description: string
}

const categories: Category[] = [
  {
    id: "europe",
    name: "Europa Elite",
    icon: Trophy,
    description: "Premier League, La Liga, Serie A, Bundesliga",
  },
  {
    id: "south-america",
    name: "Paixão Sul-Americana",
    icon: Star,
    description: "Brasileirão, Libertadores, Primera División",
  },
  {
    id: "premium",
    name: "Coleção Premium",
    icon: Zap,
    description: "Edições limitadas e especiais",
  },
  {
    id: "new-releases",
    name: "Lançamentos",
    icon: Globe,
    description: "Temporada 2024/25 novidades",
  },
]

interface HamburgerMenuProps {
  onCategorySelect: (category: string) => void
}

export function HamburgerMenu({ onCategorySelect }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<
    "main" | "categories" | "account" | "info" | "shop" | "services" | "community" | "settings"
  >("main")

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById("hamburger-menu")
      if (menu && !menu.contains(event.target as Node) && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const handleCategoryClick = (categoryId: string) => {
    onCategorySelect(categoryId)
    setIsOpen(false)
  }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  const handleModalOpen = (modalType: string) => {
    const event = new CustomEvent(modalType)
    window.dispatchEvent(event)
    setIsOpen(false)
  }

  const handleContact = (type: "whatsapp" | "email") => {
    if (type === "whatsapp") {
      const message = "Olá! Gostaria de mais informações sobre as camisas Sports AG."
      const whatsappUrl = `https://wa.me/5511967311629?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, "_blank")
    } else {
      window.location.href = "mailto:ogustavo.ctt@gmail.com?subject=Contato Sports AG"
    }
    setIsOpen(false)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Sports AG - Camisas Premium",
        text: "Confira as melhores camisas de futebol do mundo!",
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      // Aqui você poderia mostrar uma notificação de "Link copiado!"
    }
    setIsOpen(false)
  }

  return (
    <>
      {/* Compact Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 glass-premium rounded-lg hover:bg-premium-gold/10 transition-all duration-300 group"
      >
        <Menu className="w-5 h-5 text-premium-white group-hover:text-premium-gold transition-colors" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-premium-black/80 backdrop-blur-sm z-50 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menu Panel */}
      <div
        id="hamburger-menu"
        className={cn(
          "fixed top-0 left-0 h-full w-full max-w-sm glass-premium border-r border-premium-gold/20 z-50 transform transition-all duration-500 ease-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-premium-gold/20">
            <h2 className="text-2xl font-black cinematic-text tracking-wider text-premium-gold">SPORTS AG</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-premium-gold/10 rounded-lg transition-colors duration-300"
            >
              <X className="w-6 h-6 text-premium-white" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto border-b border-premium-gold/20 scrollbar-hide">
            {[
              { id: "main", label: "Início", icon: Globe },
              { id: "shop", label: "Loja", icon: ShoppingBag },
              { id: "categories", label: "Categorias", icon: Filter },
              { id: "account", label: "Conta", icon: User },
              { id: "services", label: "Serviços", icon: Sparkles },
              { id: "community", label: "Comunidade", icon: MessageSquare },
              { id: "settings", label: "Config", icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id as any)}
                  className={cn(
                    "flex flex-col items-center gap-1 py-3 px-4 min-w-fit transition-all duration-300",
                    activeSection === tab.id
                      ? "text-premium-gold border-b-2 border-premium-gold"
                      : "text-premium-white-soft hover:text-premium-white",
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeSection === "main" && (
              <div className="space-y-6 animate-slide-up-elegant">
                {/* Quick Actions */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-premium-white mb-4">Ações Rápidas</h3>

                  <button
                    onClick={() => scrollToSection("products-section")}
                    className="w-full flex items-center gap-3 p-4 glass-premium rounded-xl border border-premium-gold/20 hover:border-premium-gold/40 transition-all duration-300 text-left"
                  >
                    <ShoppingBag className="w-5 h-5 text-premium-gold" />
                    <div>
                      <div className="font-semibold text-premium-white">Comprar Camisas</div>
                      <div className="text-sm text-premium-white-soft">Ver toda coleção</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-premium-gold ml-auto" />
                  </button>

                  <button
                    onClick={() => scrollToSection("world-map-section")}
                    className="w-full flex items-center gap-3 p-4 glass-premium rounded-xl border border-premium-gold/20 hover:border-premium-gold/40 transition-all duration-300 text-left"
                  >
                    <MapPin className="w-5 h-5 text-premium-gold" />
                    <div>
                      <div className="font-semibold text-premium-white">Explorar Regiões</div>
                      <div className="text-sm text-premium-white-soft">Bandeiras 3D interativas</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-premium-gold ml-auto" />
                  </button>

                  <button
                    onClick={() => scrollToSection("about-section")}
                    className="w-full flex items-center gap-3 p-4 glass-premium rounded-xl border border-premium-gold/20 hover:border-premium-gold/40 transition-all duration-300 text-left"
                  >
                    <Info className="w-5 h-5 text-premium-gold" />
                    <div>
                      <div className="font-semibold text-premium-white">Sobre Nós</div>
                      <div className="text-sm text-premium-white-soft">Nossa história</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-premium-gold ml-auto" />
                  </button>
                </div>

                {/* Navigation Sections */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-premium-white mb-4">Navegação</h3>

                  <button
                    onClick={() => scrollToSection("reviews-section")}
                    className="w-full flex items-center gap-3 p-3 text-premium-white-soft hover:text-premium-gold transition-colors duration-300"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>Avaliações</span>
                  </button>

                  <button
                    onClick={() => handleContact("whatsapp")}
                    className="w-full flex items-center gap-3 p-3 text-premium-white-soft hover:text-premium-gold transition-colors duration-300"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Suporte WhatsApp</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="w-full flex items-center gap-3 p-3 text-premium-white-soft hover:text-premium-gold transition-colors duration-300"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>Compartilhar Site</span>
                  </button>
                </div>
              </div>
            )}

            {activeSection === "shop" && (
              <div className="space-y-6 animate-slide-up-elegant">
                <h3 className="text-xl font-semibold text-premium-white mb-4">Loja</h3>

                <div className="space-y-3">
                  <button
                    onClick={() => scrollToSection("products-section")}
                    className="w-full flex items-center gap-3 p-4 glass-premium rounded-xl border border-premium-gold/20 hover:border-premium-gold/40 transition-all duration-300 text-left"
                  >
                    <ShoppingBag className="w-5 h-5 text-premium-gold" />
                    <div>
                      <div className="font-semibold text-premium-white">Todas as Camisas</div>
                      <div className="text-sm text-premium-white-soft">Catálogo completo</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleCategoryClick("new-releases")}
                    className="w-full flex items-center gap-3 p-4 glass-premium rounded-xl border border-premium-gold/20 hover:border-premium-gold/40 transition-all duration-300 text-left"
                  >
                    <Sparkles className="w-5 h-5 text-premium-gold" />
                    <div>
                      <div className="font-semibold text-premium-white">Lançamentos</div>
                      <div className="text-sm text-premium-white-soft">Novidades 2024/25</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleCategoryClick("premium")}
                    className="w-full flex items-center gap-3 p-4 glass-premium rounded-xl border border-premium-gold/20 hover:border-premium-gold/40 transition-all duration-300 text-left"
                  >
                    <Award className="w-5 h-5 text-premium-gold" />
                    <div>
                      <div className="font-semibold text-premium-white">Coleção Premium</div>
                      <div className="text-sm text-premium-white-soft">Edições limitadas</div>
                    </div>
                  </button>

                  <div className="w-full flex items-center gap-3 p-4 glass-premium rounded-xl border border-premium-gold/20 text-left">
                    <TrendingUp className="w-5 h-5 text-premium-gold" />
                    <div>
                      <div className="font-semibold text-premium-white">Mais Vendidas</div>
                      <div className="text-sm text-premium-white-soft">Top 10 do mês</div>
                    </div>
                  </div>

                  <div className="w-full flex items-center gap-3 p-4 glass-premium rounded-xl border border-premium-gold/20 text-left">
                    <Percent className="w-5 h-5 text-premium-gold" />
                    <div>
                      <div className="font-semibold text-premium-white">Promoções</div>
                      <div className="text-sm text-premium-white-soft">Ofertas especiais</div>
                    </div>
                  </div>

                  <div className="w-full flex items-center gap-3 p-4 glass-premium rounded-xl border border-premium-gold/20 text-left">
                    <Gift className="w-5 h-5 text-premium-gold" />
                    <div>
                      <div className="font-semibold text-premium-white">Kits Especiais</div>
                      <div className="text-sm text-premium-white-soft">Combos exclusivos</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "categories" && (
              <div className="space-y-6 animate-slide-up-elegant">
                <h3 className="text-xl font-semibold text-premium-white mb-4">Categorias</h3>

                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <div
                      key={category.id}
                      className="glass-premium rounded-xl p-4 border border-premium-gold/20 hover:border-premium-gold/40 transition-all duration-300 cursor-pointer"
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-premium-gold/10 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-premium-gold" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-premium-white">{category.name}</h4>
                          <p className="text-sm text-premium-white-soft">{category.description}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-premium-gold" />
                      </div>
                    </div>
                  )
                })}

                <div className="space-y-3 pt-4">
                  <h4 className="font-semibold text-premium-white">Filtros Avançados</h4>
                  <div className="flex items-center gap-3 text-premium-white-soft hover:text-premium-gold transition-colors duration-300 cursor-pointer">
                    <Search className="w-5 h-5" />
                    <span>Busca Avançada</span>
                  </div>
                  <div className="flex items-center gap-3 text-premium-white-soft hover:text-premium-gold transition-colors duration-300 cursor-pointer">
                    <Target className="w-5 h-5" />
                    <span>Por Time</span>
                  </div>
                  <div className="flex items-center gap-3 text-premium-white-soft hover:text-premium-gold transition-colors duration-300 cursor-pointer">
                    <Calendar className="w-5 h-5" />
                    <span>Por Temporada</span>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "account" && (
              <div className="animate-slide-up-elegant">
                <h3 className="text-xl font-semibold text-premium-white mb-6">Minha Conta</h3>

                <div className="space-y-4 mb-8">
                  <div className="glass-premium rounded-xl p-4 border border-premium-gold/20">
                    <h4 className="font-semibold text-premium-white mb-4">Entrar ou Cadastrar</h4>
                    <p className="text-sm text-premium-white-soft mb-4">
                      Acesse sua conta para gerenciar pedidos e favoritos
                    </p>
                    <Button className="w-full btn-premium bg-premium-gold hover:bg-premium-gold-light text-premium-black mb-2">
                      Entrar
                    </Button>
                    <Button className="w-full btn-premium bg-transparent border border-premium-gold text-premium-gold hover:bg-premium-gold/10">
                      Criar Conta
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-premium-white mb-2">Área do Cliente</h4>
                  <div className="flex items-center gap-3 text-premium-white-soft hover:text-premium-gold transition-colors duration-300 cursor-pointer">
                    <ShoppingBag className="w-5 h-5" />
                    <span>Meus Pedidos</span>
                  </div>
                  <div className="flex items-center gap-3 text-premium-white-soft hover:text-premium-gold transition-colors duration-300 cursor-pointer">
                    <Heart className="w-5 h-5" />
                    <span>Lista de Desejos</span>
                  </div>
                  <div className="flex items-center gap-3 text-premium-white-soft hover:text-premium-gold transition-colors duration-300 cursor-pointer">
                    <Bookmark className="w-5 h-5" />
                    <span>Favoritos</span>
                  </div>
                  <div className="flex items-center gap-3 text-premium-white-soft hover:text-premium-gold transition-colors duration-300 cursor-pointer">
                    <User className="w-5 h-5" />
                    <span>Dados Pessoais</span>
                  </div>
                  <div className="flex items-center gap-3 text-premium-white-soft hover:text-premium-gold transition-colors duration-300 cursor-pointer">
                    <CreditCard className="w-5 h-5" />
                    <span>Formas de Pagamento</span>
                  </div>
                  <div className="flex items-center gap-3 text-premium-white-soft hover:text-premium-gold transition-colors duration-300 cursor-pointer">
                    <Clock className="w-5 h-5" />
                    <span>Histórico de Compras</span>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "services" && (
              <div className="animate-slide-up-elegant">
                <h3 className="text-xl font-semibold text-premium-white mb-6">Serviços</h3>

                <div className="space-y-3">
                  <button
                    onClick={() => handleModalOpen("openShippingInfo")}
                    className="w-full flex items-center gap-3 p-4 glass-premium rounded-xl border border-premium-gold/20 hover:border-premium-gold/40 transition-all duration-300 text-left"
                  >
                    <Truck className="w-5 h-5 text-premium-gold" />
                    <div>
                      <div className="font-semibold text-premium-white">Envio e Entrega</div>
                      <div className="text-sm text-premium-white-soft">Informações de frete</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleModalOpen("openSizeGuide")}
                    className="w-full flex items-center gap-3 p-4 glass-premium rounded-xl border border-premium-gold/20 hover:border-premium-gold/40 transition-all duration-300 text-left"
                  >
                    <Ruler className="w-5 h-5 text-premium-gold" />
                    <div>
                      <div className="font-semibold text-premium-white">Guia de Tamanhos</div>
                      <div className="text-sm text-premium-white-soft">Encontre seu tamanho</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleModalOpen("openExchangePolicy")}
                    className="w-full flex items-center gap-3 p-4 glass-premium rounded-xl border border-premium-gold/20 hover:border-premium-gold/40 transition-all duration-300 text-left"
                  >
                    <RefreshCw className="w-5 h-5 text-premium-gold" />
                    <div>
                      <div className="font-semibold text-premium-white">Política de Troca</div>
                      <div className="text-sm text-premium-white-soft">Trocas e devoluções</div>
                    </div>
                  </button>

                  <div className="w-full flex items-center gap-3 p-4 glass-premium rounded-xl border border-premium-gold/20 text-left">
                    <Shield className="w-5 h-5 text-premium-gold" />
                    <div>
                      <div className="font-semibold text-premium-white">Garantia de Qualidade</div>
                      <div className="text-sm text-premium-white-soft">Produtos autênticos</div>
                    </div>
                  </div>

                  <div className="w-full flex items-center gap-3 p-4 glass-premium rounded-xl border border-premium-gold/20 text-left">
                    <Download className="w-5 h-5 text-premium-gold" />
                    <div>
                      <div className="font-semibold text-premium-white">App Mobile</div>
                      <div className="text-sm text-premium-white-soft">Em breve</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "community" && (
              <div className="animate-slide-up-elegant">
                <h3 className="text-xl font-semibold text-premium-white mb-6">Comunidade</h3>

                <div className="space-y-3">
                  <button
                    onClick={() => scrollToSection("reviews-section")}
                    className="w-full flex items-center gap-3 p-4 glass-premium rounded-xl border border-premium-gold/20 hover:border-premium-gold/40 transition-all duration-300 text-left"
                  >
                    <MessageSquare className="w-5 h-5 text-premium-gold" />
                    <div>
                      <div className="font-semibold text-premium-white">Avaliações</div>
                      <div className="text-sm text-premium-white-soft">Compartilhe sua experiência</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleContact("whatsapp")}
                    className="w-full flex items-center gap-3 p-4 glass-premium rounded-xl border border-premium-gold/20 hover:border-premium-gold/40 transition-all duration-300 text-left"
                  >
                    <Phone className="w-5 h-5 text-premium-gold" />
                    <div>
                      <div className="font-semibold text-premium-white">Grupo WhatsApp</div>
                      <div className="text-sm text-premium-white-soft">Comunidade de fãs</div>
                    </div>
                  </button>

                  <button
                    onClick={handleShare}
                    className="w-full flex items-center gap-3 p-4 glass-premium rounded-xl border border-premium-gold/20 hover:border-premium-gold/40 transition-all duration-300 text-left"
                  >
                    <Share2 className="w-5 h-5 text-premium-gold" />
                    <div>
                      <div className="font-semibold text-premium-white">Compartilhar</div>
                      <div className="text-sm text-premium-white-soft">Indique para amigos</div>
                    </div>
                  </button>

                  <div className="w-full flex items-center gap-3 p-4 glass-premium rounded-xl border border-premium-gold/20 text-left">
                    <Bell className="w-5 h-5 text-premium-gold" />
                    <div>
                      <div className="font-semibold text-premium-white">Newsletter</div>
                      <div className="text-sm text-premium-white-soft">Novidades e promoções</div>
                    </div>
                  </div>

                  <div className="w-full flex items-center gap-3 p-4 glass-premium rounded-xl border border-premium-gold/20 text-left">
                    <Award className="w-5 h-5 text-premium-gold" />
                    <div>
                      <div className="font-semibold text-premium-white">Programa de Fidelidade</div>
                      <div className="text-sm text-premium-white-soft">Em breve</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "settings" && (
              <div className="animate-slide-up-elegant">
                <h3 className="text-xl font-semibold text-premium-white mb-6">Configurações</h3>

                <div className="space-y-3">
                  <button
                    onClick={() => handleModalOpen("openTerms")}
                    className="w-full flex items-center gap-3 p-3 text-premium-white-soft hover:text-premium-gold transition-colors duration-300"
                  >
                    <FileText className="w-5 h-5" />
                    <span>Termos de Serviço</span>
                  </button>

                  <button
                    onClick={() => handleContact("email")}
                    className="w-full flex items-center gap-3 p-3 text-premium-white-soft hover:text-premium-gold transition-colors duration-300"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Contato por Email</span>
                  </button>

                  <div className="w-full flex items-center gap-3 p-3 text-premium-white-soft">
                    <HelpCircle className="w-5 h-5" />
                    <span>Central de Ajuda</span>
                  </div>

                  <div className="w-full flex items-center gap-3 p-3 text-premium-white-soft">
                    <Shield className="w-5 h-5" />
                    <span>Política de Privacidade</span>
                  </div>

                  <div className="w-full flex items-center gap-3 p-3 text-premium-white-soft">
                    <Bell className="w-5 h-5" />
                    <span>Notificações</span>
                  </div>

                  <div className="pt-4 border-t border-premium-gold/20">
                    <div className="text-center text-premium-white-soft text-sm">
                      <p>Sports AG</p>
                      <p>Versão 1.0.0</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
