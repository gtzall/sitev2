
"use client"

import { useState, useEffect } from "react"
import { StadiumLoading } from "../components/stadium-loading"
import { PremiumHero } from "../components/premium-hero"
import { InteractiveWorldMap } from "../components/interactive-world-map"
import { CategoryCard } from "../components/category-card"
import { PromoBanner } from "../components/promo-banner"
import { HamburgerMenu } from "../components/hamburger-menu"
import { PremiumJerseyCard } from "../components/premium-jersey-card"
import { ProductDetailModal } from "../components/product-detail-modal"
import { ModernCheckout } from "../components/modern-checkout"
import { PremiumCart } from "../components/premium-cart"
import { IntelligentSupport } from "../components/intelligent-support"
import { PremiumSupport } from "../components/premium-support"
import { PublicReviews } from "../components/public-reviews"
import { AboutUs } from "../components/about-us"
import { ShippingInfoModal } from "../components/shipping-info-modal"
import { SizeGuideModal } from "../components/size-guide-modal"
import { ExchangePolicyModal } from "../components/exchange-policy-modal"
import { TermsOfServiceModal } from "../components/terms-of-service-modal"
import { Logo } from "../components/logo"
import { Button } from "../components/ui/button"
import { ShoppingCart, Filter, Grid, List } from "lucide-react"
import { motion } from "framer-motion"
import { Navbar } from "../components/navbar"
import { FloatingFlags3D } from "../components/floating-flags-3d"
import { InteractiveGlobe3D } from "../components/interactive-globe-3d"
import { JerseyViewer3D } from "../components/jersey-viewer-3d"
import { VirtualFittingRoom } from "../components/virtual-fitting-room"
import { HistoricalJerseyTimeline } from "../components/historical-jersey-timeline"

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export default function Home() {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [cartItems, setCartItems] = useState<any[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
  const [isShippingInfoOpen, setIsShippingInfoOpen] = useState(false)
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false)
  const [isExchangePolicyOpen, setIsExchangePolicyOpen] = useState(false)
  const [isTermsOpen, setIsTermsOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const jerseys = [
    {
      id: 1,
      team: "Real Madrid",
      league: "La Liga",
      price: 199.9,
      originalPrice: 279.9,
      images: [
        "/images/jerseys/jersey_blue_stripes.jpg",
        "/placeholder.svg?height=500&width=500&text=Real+Madrid+Away+2024",
        "/placeholder.svg?height=500&width=500&text=Real+Madrid+Third+2024",
      ],
      country: "Espanha",
      category: "europe",
      region: "europe",
      isNew: true,
      modelUrl: "/models/jerseys/real_madrid_home.glb"
    },
    {
      id: 2,
      team: "Barcelona",
      league: "La Liga",
      price: 199.9,
      originalPrice: 269.9,
      images: [
        "/placeholder.svg?height=500&width=500&text=Barcelona+Home+2024",
        "/placeholder.svg?height=500&width=500&text=Barcelona+Away+2024",
        "/placeholder.svg?height=500&width=500&text=Barcelona+Third+2024",
      ],
      country: "Espanha",
      category: "europe",
      region: "europe",
      modelUrl: "/models/jerseys/barcelona_home.glb"
    },
    {
      id: 3,
      team: "Manchester United",
      league: "Premier League",
      price: 189.9,
      originalPrice: 249.9,
      images: [
        "/placeholder.svg?height=500&width=500&text=Man+United+Home+2024",
        "/placeholder.svg?height=500&width=500&text=Man+United+Away+2024",
        "/placeholder.svg?height=500&width=500&text=Man+United+Third+2024",
      ],
      country: "Inglaterra",
      category: "europe",
      region: "europe",
      modelUrl: "/models/jerseys/manutd_home.glb"
    },
    {
      id: 4,
      team: "Liverpool",
      league: "Premier League",
      price: 189.9,
      images: [
        "/placeholder.svg?height=500&width=500&text=Liverpool+Home+2024",
        "/placeholder.svg?height=500&width=500&text=Liverpool+Away+2024",
      ],
      country: "Inglaterra",
      category: "europe",
      region: "europe",
      isNew: true,
      modelUrl: "/models/jerseys/liverpool_home.glb"
    },
    {
      id: 5,
      team: "PSG",
      league: "Ligue 1",
      price: 179.9,
      originalPrice: 229.9,
      images: [
        "/placeholder.svg?height=500&width=500&text=PSG+Home+2024",
        "/placeholder.svg?height=500&width=500&text=PSG+Away+2024",
      ],
      country: "França",
      category: "premium",
      region: "europe",
      modelUrl: "/models/jerseys/psg_home.glb"
    },
    {
      id: 6,
      team: "Flamengo",
      league: "Brasileirão",
      price: 159.9,
      originalPrice: 199.9,
      images: [
        "/placeholder.svg?height=500&width=500&text=Flamengo+Home+2024",
        "/placeholder.svg?height=500&width=500&text=Flamengo+Away+2024",
      ],
      country: "Brasil",
      category: "south-america",
      region: "south-america",
      isNew: true,
      modelUrl: "/models/jerseys/flamengo_home.glb"
    },
    {
      id: 7,
      team: "São Paulo",
      league: "Brasileirão",
      price: 149.9,
      images: [
        "/placeholder.svg?height=500&width=500&text=Sao+Paulo+Home+2024",
        "/placeholder.svg?height=500&width=500&text=Sao+Paulo+Away+2024",
      ],
      country: "Brasil",
      category: "south-america",
      region: "south-america",
      modelUrl: "/models/jerseys/sao_paulo_home.glb"
    },
    {
      id: 8,
      team: "Argentina (Messi)",
      league: "Seleção",
      price: 219.9,
      images: [
        "/images/jerseys/jersey_argentina_messi.jpg",
        "/placeholder.svg?height=500&width=500&text=Argentina+Away+2024",
      ],
      country: "Argentina",
      category: "national",
      region: "south-america",
      isNew: true,
      modelUrl: "/models/jerseys/argentina_2022.glb"
    },
  ]

  useEffect(() => {
    const handleOpenShippingInfo = () => setIsShippingInfoOpen(true)
    const handleOpenSizeGuide = () => setIsSizeGuideOpen(true)
    const handleOpenExchangePolicy = () => setIsExchangePolicyOpen(true)
    const handleOpenTerms = () => setIsTermsOpen(true)

    if (typeof window !== "undefined") {
      window.addEventListener("openShippingInfo", handleOpenShippingInfo)
      window.addEventListener("openSizeGuide", handleOpenSizeGuide)
      window.addEventListener("openExchangePolicy", handleOpenExchangePolicy)
      window.addEventListener("openTerms", handleOpenTerms)

      return () => {
        window.removeEventListener("openShippingInfo", handleOpenShippingInfo)
        window.removeEventListener("openSizeGuide", handleOpenSizeGuide)
        window.removeEventListener("openExchangePolicy", handleOpenExchangePolicy)
        window.removeEventListener("openTerms", handleOpenTerms)
      }
    }
  }, [])

  const filteredJerseys = jerseys.filter((jersey) => {
    if (selectedCategory && jersey.category !== selectedCategory) return false
    if (selectedRegion && jersey.region !== selectedRegion) return false
    return true
  })

  const handleTeamSelect = (team: string) => {
    setSelectedTeam(team)
    const product = jerseys.find((jersey) => jersey.team === team)
    if (product) {
      setSelectedProduct(product)
      setIsProductDetailOpen(true)
    }
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    const productSection = document.getElementById("products-section")
    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region)
    const productSection = document.getElementById("products-section")
    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleAddToCart = (jersey: any) => {
    const existingItem = cartItems.find((item) => item.id === jersey.id)

    if (existingItem) {
      setCartItems((prev) =>
        prev.map((item) => (item.id === jersey.id ? { ...item, quantity: item.quantity + 1 } : item)),
      )
    } else {
      setCartItems((prev) => [...prev, { ...jersey, quantity: 1, size: jersey.selectedSize || "M" }])
    }

    setIsCartOpen(true)
  }

  const handleBuyNow = (jersey: any) => {
    setSelectedProduct(jersey)
    setIsCheckoutOpen(true)
    setIsProductDetailOpen(false)
  }

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const handleCheckout = () => {
    setIsCartOpen(false)
    setIsCheckoutOpen(true)
  }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <main className="min-h-screen bg-premium-black dark:bg-premium-black">
      <StadiumLoading />
      <Navbar />
      <PremiumHero />

      <motion.section
        id="world-map-section"
        className="py-20 bg-premium-black dark:bg-premium-black"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-premium-white dark:text-premium-white mb-6 cinematic-text">
              Explore o Mundo do Futebol
            </h2>
            <p className="text-premium-white-soft dark:text-premium-white-soft text-lg max-w-2xl mx-auto">
              Navegue pelo mapa 3D interativo e descubra times de todas as regiões.
            </p>
          </div>
          <InteractiveWorldMap /> 
        </div>
      </motion.section>

      <motion.section
        id="globe-section"
        className="py-20 bg-gradient-to-b from-premium-black via-blue-900/10 to-premium-black dark:bg-gradient-to-b dark:from-premium-black dark:via-blue-900/10 dark:to-premium-black"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-premium-white dark:text-premium-white mb-6 cinematic-text">
              Visão Global Interativa
            </h2>
            <p className="text-premium-white-soft dark:text-premium-white-soft text-lg max-w-2xl mx-auto">
              Gire o globo, explore países e veja detalhes com o ciclo dia/noite.
            </p>
          </div>
          <InteractiveGlobe3D />
        </div>
      </motion.section>

      <motion.section
        id="flags-section"
        className="py-20 bg-premium-black-light dark:bg-premium-black-light"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-premium-white dark:text-premium-white mb-6 cinematic-text">
              Navegue pelas Regiões
            </h2>
            <p className="text-premium-white-soft dark:text-premium-white-soft text-lg max-w-2xl mx-auto">
              Interaja com as bandeiras 3D flutuantes para descobrir informações e times.
            </p>
          </div>
          <FloatingFlags3D onRegionSelect={handleRegionSelect} selectedRegion={selectedRegion} />
        </div>
      </motion.section>

      <motion.section
        className="py-16 bg-premium-black dark:bg-premium-black"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-premium-white dark:text-premium-white mb-10 text-center cinematic-text">Navegue por Categorias</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Europeus", imageUrl: "/images/compositions/europeias_card.png", category: "europe" },
              { title: "Brasileiras", imageUrl: "/images/compositions/brasileiras_card.png", category: "south-america" },
              { title: "Retrôs", imageUrl: "/images/compositions/retros_card.png", category: "retro" },
              { title: "Seleções", imageUrl: "/images/compositions/selecoes_card.png", category: "national" },
            ].map((cat, index) => (
              <CategoryCard
                key={index}
                title={cat.title}
                imageUrl={cat.imageUrl}
                onClick={() => handleCategorySelect(cat.category)}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        id="timeline-section"
        className="py-20 bg-premium-black dark:bg-premium-black"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <HistoricalJerseyTimeline />
        </div>
      </motion.section>

      <motion.section
        id="products-section"
        className="py-20 bg-premium-black-light dark:bg-premium-black-light"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-12">
            <div className="text-center lg:text-left mb-8 lg:mb-0">
              <h2 className="text-3xl md:text-5xl font-bold text-premium-white dark:text-premium-white mb-4 cinematic-text">Coleção Premium</h2>
              <p className="text-premium-white-soft dark:text-premium-white-soft text-lg max-w-2xl">
                Camisas de qualidade AAA+ com designs autênticos e materiais premium
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="border-premium-gold/20 text-premium-white dark:text-premium-white hover:bg-premium-gold/10"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>

              <div className="flex border border-premium-gold/20 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 transition-all duration-300 ${
                    viewMode === "grid"
                      ? "bg-premium-gold text-premium-black dark:bg-premium-gold dark:text-premium-black"
                      : "text-premium-white-soft dark:text-premium-white-soft hover:text-premium-white hover:bg-premium-gold/10"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 transition-all duration-300 ${
                    viewMode === "list"
                      ? "bg-premium-gold text-premium-black dark:bg-premium-gold dark:text-premium-black"
                      : "text-premium-white-soft dark:text-premium-white-soft hover:text-premium-white hover:bg-premium-gold/10"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {selectedProduct && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <JerseyViewer3D jerseyModelUrl={selectedProduct.modelUrl || "/models/jersey_placeholder.glb"} />
              <VirtualFittingRoom jerseyModelUrl={selectedProduct.modelUrl || "/models/jersey_placeholder.glb"} />
            </div>
          )}

          <div
            className={`grid gap-8 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1 md:grid-cols-2"
            }`}
          >
            {filteredJerseys.map((jersey, index) => (
              <div key={jersey.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <PremiumJerseyCard {...jersey} onSelect={handleTeamSelect} onAddToCart={handleAddToCart} />
              </div>
            ))}
          </div>

          {filteredJerseys.length === 0 && (
            <div className="text-center py-16">
              <p className="text-premium-white-soft dark:text-premium-white-soft text-xl">Nenhuma camisa encontrada para esta seleção.</p>
              <Button
                onClick={() => {
                  setSelectedCategory(null)
                  setSelectedRegion(null)
                }}
                className="mt-4 btn-premium bg-premium-gold hover:bg-premium-gold-light text-premium-black dark:bg-premium-gold dark:hover:bg-premium-gold-light dark:text-premium-black"
              >
                Ver Todas as Camisas
              </Button>
            </div>
          )}
        </div>
      </motion.section>

      <motion.div
        className="container mx-auto px-4 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <PromoBanner
          title="PAGUE 2 LEVE 3"
          description="Aproveite nossa oferta especial e leve 3 camisas pelo preço de 2!"
          imageUrl="/images/compositions/promo_banner.png"
          buttonText="Ver Ofertas"
          onClick={() => {}}
        />
      </motion.div>

      <motion.section
        id="about-us-section"
        className="py-20 bg-premium-black dark:bg-premium-black"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <AboutUs />
        </div>
      </motion.section>

      <motion.section
        id="reviews-section"
        className="py-20 bg-premium-black-light dark:bg-premium-black-light"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <PublicReviews />
        </div>
      </motion.section>

      <motion.section
        id="support-section"
        className="py-20 bg-premium-black dark:bg-premium-black"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <PremiumSupport />
        </div>
      </motion.section>

      <ProductDetailModal
        isOpen={isProductDetailOpen}
        onClose={() => setIsProductDetailOpen(false)}
        product={selectedProduct}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />
      <PremiumCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
      <ModernCheckout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
      />
      <ShippingInfoModal isOpen={isShippingInfoOpen} onClose={() => setIsShippingInfoOpen(false)} />
      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
      <ExchangePolicyModal isOpen={isExchangePolicyOpen} onClose={() => setIsExchangePolicyOpen(false)} />
      <TermsOfServiceModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />

    </main>
  )
}

