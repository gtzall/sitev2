"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Trophy, Users, Calendar, MapPin } from 'lucide-react'

export function AboutUs() {
  const [activeTab, setActiveTab] = useState<'historia' | 'missao' | 'equipe'>('historia')
  
  return (
    <section className="py-16 bg-premium-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-premium-gold mb-4">Sobre a Sport AG</h2>
          <p className="text-premium-white-soft max-w-3xl mx-auto">
            Somos apaixonados por futebol e comprometidos em trazer as melhores camisas oficiais de times do mundo todo para os verdadeiros fãs do esporte.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left side - Image with player */}
          <motion.div 
            className="relative h-[500px] rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-radial from-premium-gold/20 to-premium-black/90 z-10" />
            
            <Image
              src="/images/new_promotional/cr7_united_front.jpeg"
              alt="Cristiano Ronaldo"
              fill
              className="object-cover object-center"
            />
            
            {/* Strategic overlay to hide watermarks */}
            <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-gradient-to-t from-premium-black to-transparent z-20" />
            <div className="absolute top-0 left-0 right-0 h-[20%] bg-gradient-to-b from-premium-black to-transparent z-20" />
            
            {/* Decorative elements */}
            <div className="absolute bottom-8 left-8 z-30 glass-premium p-4 rounded-xl border border-premium-gold/30">
              <div className="text-premium-gold font-bold text-xl mb-1">Qualidade Premium</div>
              <div className="text-premium-white-soft text-sm">Camisas oficiais com garantia de autenticidade</div>
            </div>
          </motion.div>
          
          {/* Right side - Content */}
          <div>
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-premium-gold mb-4">Nossa História</h3>
              <p className="text-premium-white-soft mb-4">
                Fundada em 2020, a Sport AG nasceu da paixão por futebol e da vontade de proporcionar aos torcedores brasileiros acesso às melhores camisas de times do mundo todo, com qualidade premium e preços justos.
              </p>
              <p className="text-premium-white-soft">
                Começamos como uma pequena loja online e hoje somos referência no mercado de camisas esportivas, atendendo clientes em todo o Brasil e com planos de expansão internacional.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-premium p-4 rounded-xl border border-premium-gold/20">
                <Trophy className="w-8 h-8 text-premium-gold mb-2" />
                <div className="text-xl font-bold text-premium-white">+50 Times</div>
                <div className="text-sm text-premium-white-soft">Variedade de clubes</div>
              </div>
              
              <div className="glass-premium p-4 rounded-xl border border-premium-gold/20">
                <Users className="w-8 h-8 text-premium-gold mb-2" />
                <div className="text-xl font-bold text-premium-white">+10.000</div>
                <div className="text-sm text-premium-white-soft">Clientes satisfeitos</div>
              </div>
              
              <div className="glass-premium p-4 rounded-xl border border-premium-gold/20">
                <Calendar className="w-8 h-8 text-premium-gold mb-2" />
                <div className="text-xl font-bold text-premium-white">3 Anos</div>
                <div className="text-sm text-premium-white-soft">De experiência</div>
              </div>
              
              <div className="glass-premium p-4 rounded-xl border border-premium-gold/20">
                <MapPin className="w-8 h-8 text-premium-gold mb-2" />
                <div className="text-xl font-bold text-premium-white">Brasil</div>
                <div className="text-sm text-premium-white-soft">Entrega nacional</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="mb-8">
          <div className="flex border-b border-premium-gold/20">
            <button
              onClick={() => setActiveTab('historia')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'historia' 
                  ? 'text-premium-gold border-b-2 border-premium-gold' 
                  : 'text-premium-white-soft hover:text-premium-white'
              }`}
            >
              Nossa História
            </button>
            <button
              onClick={() => setActiveTab('missao')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'missao' 
                  ? 'text-premium-gold border-b-2 border-premium-gold' 
                  : 'text-premium-white-soft hover:text-premium-white'
              }`}
            >
              Missão e Valores
            </button>
            <button
              onClick={() => setActiveTab('equipe')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'equipe' 
                  ? 'text-premium-gold border-b-2 border-premium-gold' 
                  : 'text-premium-white-soft hover:text-premium-white'
              }`}
            >
              Nossa Equipe
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div>
            {activeTab === 'historia' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-3xl font-bold text-premium-gold mb-4">De Fãs para Fãs</h3>
                <p className="text-premium-white-soft mb-4">
                  Nossa jornada começou quando um grupo de amigos apaixonados por futebol decidiu transformar sua paixão em negócio. Percebemos que havia uma demanda por camisas de times internacionais no Brasil, mas com preços acessíveis e garantia de qualidade.
                </p>
                <p className="text-premium-white-soft mb-4">
                  Em 2020, mesmo em meio à pandemia, lançamos nossa loja online com apenas 10 modelos de camisas. O sucesso foi imediato e, em poucos meses, já tínhamos expandido nosso catálogo para mais de 100 produtos.
                </p>
                <p className="text-premium-white-soft">
                  Hoje, a Sport AG é reconhecida pela qualidade dos produtos, atendimento personalizado e compromisso com a satisfação dos clientes. Continuamos crescendo, mas sem perder nossa essência: somos fãs atendendo fãs.
                </p>
              </motion.div>
            )}
            
            {activeTab === 'missao' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-3xl font-bold text-premium-gold mb-4">Nossa Missão</h3>
                <p className="text-premium-white-soft mb-6">
                  Proporcionar aos torcedores a oportunidade de expressar sua paixão pelo futebol através de produtos de alta qualidade, com preços justos e atendimento excepcional.
                </p>
                
                <h4 className="text-xl font-bold text-premium-gold mb-3">Nossos Valores</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-premium-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-premium-gold">1</span>
                    </div>
                    <div>
                      <span className="font-semibold text-premium-white">Autenticidade</span>
                      <p className="text-sm text-premium-white-soft">Comprometimento com a qualidade e originalidade dos produtos.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-premium-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-premium-gold">2</span>
                    </div>
                    <div>
                      <span className="font-semibold text-premium-white">Paixão</span>
                      <p className="text-sm text-premium-white-soft">Amor pelo futebol em tudo o que fazemos.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-premium-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-premium-gold">3</span>
                    </div>
                    <div>
                      <span className="font-semibold text-premium-white">Excelência</span>
                      <p className="text-sm text-premium-white-soft">Busca constante pela perfeição em produtos e serviços.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-premium-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-premium-gold">4</span>
                    </div>
                    <div>
                      <span className="font-semibold text-premium-white">Comunidade</span>
                      <p className="text-sm text-premium-white-soft">Valorização da conexão entre torcedores e times.</p>
                    </div>
                  </li>
                </ul>
              </motion.div>
            )}
            
            {activeTab === 'equipe' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-3xl font-bold text-premium-gold mb-4">Nossa Equipe</h3>
                <p className="text-premium-white-soft mb-6">
                  Somos uma equipe diversificada de profissionais apaixonados por futebol, unidos pelo objetivo de oferecer a melhor experiência aos nossos clientes.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-premium-gold/20 flex items-center justify-center">
                      <span className="text-2xl text-premium-gold">RM</span>
                    </div>
                    <div>
                      <h5 className="text-lg font-semibold text-premium-white">Ricardo Mendes</h5>
                      <p className="text-sm text-premium-white-soft">Fundador e CEO</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-premium-gold/20 flex items-center justify-center">
                      <span className="text-2xl text-premium-gold">AS</span>
                    </div>
                    <div>
                      <h5 className="text-lg font-semibold text-premium-white">Amanda Silva</h5>
                      <p className="text-sm text-premium-white-soft">Diretora de Marketing</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-premium-gold/20 flex items-center justify-center">
                      <span className="text-2xl text-premium-gold">LG</span>
                    </div>
                    <div>
                      <h5 className="text-lg font-semibold text-premium-white">Lucas Gomes</h5>
                      <p className="text-sm text-premium-white-soft">Gerente de Produtos</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Right side - Image with player */}
          <motion.div 
            className="relative h-[500px] rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-radial from-premium-gold/20 to-premium-black/90 z-10" />
            
            {activeTab === 'historia' && (
              <Image
                src="/images/new_promotional/mbappe_madrid.jpeg"
                alt="Mbappé"
                fill
                className="object-cover object-center"
              />
            )}
            
            {activeTab === 'missao' && (
              <Image
                src="/images/new_promotional/ronaldinho_brazil.jpeg"
                alt="Ronaldinho"
                fill
                className="object-cover object-center"
              />
            )}
            
            {activeTab === 'equipe' && (
              <Image
                src="/images/new_promotional/neymar_santos.jpeg"
                alt="Neymar"
                fill
                className="object-cover object-center"
              />
            )}
            
            {/* Strategic overlay to hide watermarks */}
            <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-gradient-to-t from-premium-black to-transparent z-20" />
            <div className="absolute top-0 left-0 right-0 h-[20%] bg-gradient-to-b from-premium-black to-transparent z-20" />
            
            {/* Decorative elements */}
            <div className="absolute top-8 right-8 z-30 glass-premium p-4 rounded-xl border border-premium-gold/30">
              {activeTab === 'historia' && (
                <>
                  <div className="text-premium-gold font-bold text-xl mb-1">Desde 2020</div>
                  <div className="text-premium-white-soft text-sm">Crescendo com paixão</div>
                </>
              )}
              
              {activeTab === 'missao' && (
                <>
                  <div className="text-premium-gold font-bold text-xl mb-1">Compromisso</div>
                  <div className="text-premium-white-soft text-sm">Com a excelência</div>
                </>
              )}
              
              {activeTab === 'equipe' && (
                <>
                  <div className="text-premium-gold font-bold text-xl mb-1">Nossa Equipe</div>
                  <div className="text-premium-white-soft text-sm">Apaixonada por futebol</div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
