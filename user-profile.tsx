"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, Settings, Bell, CreditCard, Heart, ShoppingBag, LogOut, 
  Moon, Sun, ChevronRight, Check, X, Shield, Star, Gift
} from 'lucide-react'
import { useTheme } from 'next-themes'

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isPremium: boolean;
  joinDate: string;
  orders: number;
  favorites: number;
}

interface Notification {
  id: string;
  type: 'order' | 'promo' | 'system' | 'restock';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export function UserProfilePanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'notifications' | 'premium'>('profile');
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'order',
      title: 'Pedido Confirmado',
      message: 'Seu pedido #12345 foi confirmado e está sendo processado.',
      date: '2025-06-05T14:30:00',
      read: false
    },
    {
      id: '2',
      type: 'promo',
      title: 'Promoção Especial',
      message: 'Compre 2 camisas e leve 3! Oferta válida por tempo limitado.',
      date: '2025-06-04T10:15:00',
      read: true
    },
    {
      id: '3',
      type: 'restock',
      title: 'Produto Disponível',
      message: 'A camisa do Real Madrid que você estava interessado está disponível novamente.',
      date: '2025-06-03T18:45:00',
      read: false
    },
    {
      id: '4',
      type: 'system',
      title: 'Atualização de Sistema',
      message: 'Nosso site foi atualizado com novos recursos. Confira as novidades!',
      date: '2025-06-02T09:20:00',
      read: true
    }
  ]);
  
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: 'user123',
    name: 'João Silva',
    email: 'joao.silva@exemplo.com',
    avatar: '/images/avatar-placeholder.png',
    isPremium: false,
    joinDate: '2024-01-15',
    orders: 5,
    favorites: 12
  });
  
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      orders: true,
      promotions: false,
      system: true
    },
    privacy: {
      shareData: false,
      saveHistory: true
    },
    display: {
      darkMode: theme === 'dark',
      highContrast: false,
      animations: true
    }
  });
  
  // Update theme when settings change
  useEffect(() => {
    if (settings.display.darkMode) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, [settings.display.darkMode, setTheme]);
  
  const toggleSetting = (category: string, setting: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting]
      }
    }));
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };
  
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  const deleteNotification = (id: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
  };
  
  const upgradeToPremium = () => {
    setUserProfile(prev => ({
      ...prev,
      isPremium: true
    }));
    setActiveTab('profile');
  };
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', { 
      day: 'numeric', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit' 
    }).format(date);
  };
  
  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'order': return <ShoppingBag className="w-5 h-5 text-blue-500" />;
      case 'promo': return <Gift className="w-5 h-5 text-green-500" />;
      case 'system': return <Settings className="w-5 h-5 text-purple-500" />;
      case 'restock': return <Bell className="w-5 h-5 text-amber-500" />;
      default: return <Bell className="w-5 h-5 text-premium-gold" />;
    }
  };

  return (
    <>
      {/* Profile Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="relative flex items-center justify-center w-10 h-10 rounded-full bg-premium-black border border-premium-gold/30 hover:border-premium-gold transition-all duration-300"
        aria-label="Perfil do usuário"
      >
        <User className="w-5 h-5 text-premium-gold" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-premium-red text-white text-xs font-bold">
            {unreadCount}
          </span>
        )}
      </button>
      
      {/* Profile Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-gradient-to-br from-premium-black via-premium-black-light to-premium-black border-l border-premium-gold/30 shadow-2xl z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-premium-gold/20">
                <h2 className="text-xl font-bold text-premium-gold">Minha Conta</h2>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-premium-gold/10 transition-colors"
                >
                  <X className="w-5 h-5 text-premium-white" />
                </button>
              </div>
              
              {/* Tabs */}
              <div className="flex border-b border-premium-gold/20">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex-1 py-4 text-center transition-colors ${
                    activeTab === 'profile' 
                      ? 'text-premium-gold border-b-2 border-premium-gold' 
                      : 'text-premium-white-soft hover:text-premium-white'
                  }`}
                >
                  Perfil
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`flex-1 py-4 text-center transition-colors relative ${
                    activeTab === 'notifications' 
                      ? 'text-premium-gold border-b-2 border-premium-gold' 
                      : 'text-premium-white-soft hover:text-premium-white'
                  }`}
                >
                  Notificações
                  {unreadCount > 0 && (
                    <span className="absolute top-3 right-1/4 w-5 h-5 flex items-center justify-center rounded-full bg-premium-red text-white text-xs font-bold">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex-1 py-4 text-center transition-colors ${
                    activeTab === 'settings' 
                      ? 'text-premium-gold border-b-2 border-premium-gold' 
                      : 'text-premium-white-soft hover:text-premium-white'
                  }`}
                >
                  Configurações
                </button>
                <button
                  onClick={() => setActiveTab('premium')}
                  className={`flex-1 py-4 text-center transition-colors ${
                    activeTab === 'premium' 
                      ? 'text-premium-gold border-b-2 border-premium-gold' 
                      : 'text-premium-white-soft hover:text-premium-white'
                  }`}
                >
                  Premium
                </button>
              </div>
              
              {/* Content */}
              <div className="p-6 overflow-y-auto h-[calc(100%-132px)]">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-premium-gold/20 flex items-center justify-center overflow-hidden border-2 border-premium-gold">
                          {userProfile.avatar ? (
                            <img 
                              src={userProfile.avatar} 
                              alt={userProfile.name} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-10 h-10 text-premium-gold" />
                          )}
                        </div>
                        {userProfile.isPremium && (
                          <div className="absolute -top-1 -right-1 bg-premium-gold text-premium-black text-xs font-bold px-2 py-0.5 rounded-full">
                            PREMIUM
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-premium-white">{userProfile.name}</h3>
                        <p className="text-premium-white-soft">{userProfile.email}</p>
                        <p className="text-xs text-premium-white-soft mt-1">
                          Membro desde {new Date(userProfile.joinDate).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-premium-black/50 border border-premium-gold/20 rounded-xl p-4 text-center">
                        <ShoppingBag className="w-6 h-6 text-premium-gold mx-auto mb-2" />
                        <div className="text-2xl font-bold text-premium-white">{userProfile.orders}</div>
                        <div className="text-sm text-premium-white-soft">Pedidos</div>
                      </div>
                      <div className="bg-premium-black/50 border border-premium-gold/20 rounded-xl p-4 text-center">
                        <Heart className="w-6 h-6 text-premium-gold mx-auto mb-2" />
                        <div className="text-2xl font-bold text-premium-white">{userProfile.favorites}</div>
                        <div className="text-sm text-premium-white-soft">Favoritos</div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-premium-gold mb-4">Ações Rápidas</h4>
                      
                      <button className="w-full flex items-center justify-between p-4 bg-premium-black/50 border border-premium-gold/20 rounded-xl hover:bg-premium-gold/10 transition-colors">
                        <div className="flex items-center gap-3">
                          <ShoppingBag className="w-5 h-5 text-premium-gold" />
                          <span className="text-premium-white">Meus Pedidos</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-premium-white-soft" />
                      </button>
                      
                      <button className="w-full flex items-center justify-between p-4 bg-premium-black/50 border border-premium-gold/20 rounded-xl hover:bg-premium-gold/10 transition-colors">
                        <div className="flex items-center gap-3">
                          <Heart className="w-5 h-5 text-premium-gold" />
                          <span className="text-premium-white">Meus Favoritos</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-premium-white-soft" />
                      </button>
                      
                      <button className="w-full flex items-center justify-between p-4 bg-premium-black/50 border border-premium-gold/20 rounded-xl hover:bg-premium-gold/10 transition-colors">
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5 text-premium-gold" />
                          <span className="text-premium-white">Métodos de Pagamento</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-premium-white-soft" />
                      </button>
                      
                      {!userProfile.isPremium && (
                        <button 
                          onClick={() => setActiveTab('premium')}
                          className="w-full flex items-center justify-between p-4 bg-premium-gold/20 border border-premium-gold rounded-xl hover:bg-premium-gold/30 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Star className="w-5 h-5 text-premium-gold" />
                            <span className="text-premium-gold font-semibold">Upgrade para Premium</span>
                          </div>
                          <ChevronRight className="w-5 h-5 text-premium-gold" />
                        </button>
                      )}
                      
                      <button className="w-full flex items-center justify-between p-4 bg-premium-black/50 border border-premium-gold/20 rounded-xl hover:bg-premium-red/10 transition-colors mt-8">
                        <div className="flex items-center gap-3">
                          <LogOut className="w-5 h-5 text-premium-red" />
                          <span className="text-premium-red">Sair</span>
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )}
                
                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-premium-gold">Notificações</h3>
                      {notifications.length > 0 && (
                        <button 
                          onClick={markAllAsRead}
                          className="text-sm text-premium-gold hover:text-premium-gold-light transition-colors"
                        >
                          Marcar todas como lidas
                        </button>
                      )}
                    </div>
                    
                    {notifications.length === 0 ? (
                      <div className="text-center py-12">
                        <Bell className="w-12 h-12 text-premium-white-soft mx-auto mb-4 opacity-50" />
                        <p className="text-premium-white-soft">Você não tem notificações</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {notifications.map(notification => (
                          <div 
                            key={notification.id}
                            className={`relative p-4 rounded-xl border transition-all ${
                              notification.read 
                                ? 'bg-premium-black/30 border-premium-gold/10' 
                                : 'bg-premium-gold/5 border-premium-gold/30'
                            }`}
                          >
                            <div className="flex gap-3">
                              <div className="mt-1">
                                {getNotificationIcon(notification.type)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between">
                                  <h4 className={`font-semibold ${notification.read ? 'text-premium-white' : 'text-premium-gold'}`}>
                                    {notification.title}
                                  </h4>
                                  <span className="text-xs text-premium-white-soft">
                                    {formatDate(notification.date)}
                                  </span>
                                </div>
                                <p className="text-sm text-premium-white-soft mt-1">
                                  {notification.message}
                                </p>
                              </div>
                            </div>
                            
                            {!notification.read && (
                              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-premium-gold"></div>
                            )}
                            
                            <div className="flex justify-end mt-3 gap-2">
                              {!notification.read && (
                                <button 
                                  onClick={() => markAsRead(notification.id)}
                                  className="text-xs text-premium-gold hover:text-premium-gold-light transition-colors"
                                >
                                  Marcar como lida
                                </button>
                              )}
                              <button 
                                onClick={() => deleteNotification(notification.id)}
                                className="text-xs text-premium-red hover:text-premium-red/80 transition-colors"
                              >
                                Excluir
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
                
                {/* Settings Tab */}
                {activeTab === 'settings' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-premium-gold mb-4">Notificações</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-premium-white font-medium">E-mails</h4>
                            <p className="text-sm text-premium-white-soft">Receber e-mails sobre pedidos e promoções</p>
                          </div>
                          <button 
                            onClick={() => toggleSetting('notifications', 'email')}
                            className={`w-12 h-6 rounded-full relative transition-colors ${
                              settings.notifications.email ? 'bg-premium-gold' : 'bg-premium-white-soft/30'
                            }`}
                          >
                            <span 
                              className={`absolute top-1 w-4 h-4 rounded-full transition-transform ${
                                settings.notifications.email 
                                  ? 'bg-premium-black translate-x-7' 
                                  : 'bg-premium-white translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-premium-white font-medium">Status de Pedidos</h4>
                            <p className="text-sm text-premium-white-soft">Notificações sobre atualizações de pedidos</p>
                          </div>
                          <button 
                            onClick={() => toggleSetting('notifications', 'orders')}
                            className={`w-12 h-6 rounded-full relative transition-colors ${
                              settings.notifications.orders ? 'bg-premium-gold' : 'bg-premium-white-soft/30'
                            }`}
                          >
                            <span 
                              className={`absolute top-1 w-4 h-4 rounded-full transition-transform ${
                                settings.notifications.orders 
                                  ? 'bg-premium-black translate-x-7' 
                                  : 'bg-premium-white translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-premium-white font-medium">Promoções</h4>
                            <p className="text-sm text-premium-white-soft">Notificações sobre ofertas e descontos</p>
                          </div>
                          <button 
                            onClick={() => toggleSetting('notifications', 'promotions')}
                            className={`w-12 h-6 rounded-full relative transition-colors ${
                              settings.notifications.promotions ? 'bg-premium-gold' : 'bg-premium-white-soft/30'
                            }`}
                          >
                            <span 
                              className={`absolute top-1 w-4 h-4 rounded-full transition-transform ${
                                settings.notifications.promotions 
                                  ? 'bg-premium-black translate-x-7' 
                                  : 'bg-premium-white translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-premium-gold mb-4">Privacidade</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-premium-white font-medium">Compartilhar Dados</h4>
                            <p className="text-sm text-premium-white-soft">Compartilhar dados para melhorar experiência</p>
                          </div>
                          <button 
                            onClick={() => toggleSetting('privacy', 'shareData')}
                            className={`w-12 h-6 rounded-full relative transition-colors ${
                              settings.privacy.shareData ? 'bg-premium-gold' : 'bg-premium-white-soft/30'
                            }`}
                          >
                            <span 
                              className={`absolute top-1 w-4 h-4 rounded-full transition-transform ${
                                settings.privacy.shareData 
                                  ? 'bg-premium-black translate-x-7' 
                                  : 'bg-premium-white translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-premium-white font-medium">Histórico de Navegação</h4>
                            <p className="text-sm text-premium-white-soft">Salvar histórico para recomendações</p>
                          </div>
                          <button 
                            onClick={() => toggleSetting('privacy', 'saveHistory')}
                            className={`w-12 h-6 rounded-full relative transition-colors ${
                              settings.privacy.saveHistory ? 'bg-premium-gold' : 'bg-premium-white-soft/30'
                            }`}
                          >
                            <span 
                              className={`absolute top-1 w-4 h-4 rounded-full transition-transform ${
                                settings.privacy.saveHistory 
                                  ? 'bg-premium-black translate-x-7' 
                                  : 'bg-premium-white translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-premium-gold mb-4">Exibição</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-premium-white font-medium">Modo Escuro</h4>
                            <p className="text-sm text-premium-white-soft">Alternar entre tema claro e escuro</p>
                          </div>
                          <button 
                            onClick={() => toggleSetting('display', 'darkMode')}
                            className={`w-12 h-6 rounded-full relative transition-colors ${
                              settings.display.darkMode ? 'bg-premium-gold' : 'bg-premium-white-soft/30'
                            }`}
                          >
                            <span 
                              className={`absolute top-1 w-4 h-4 rounded-full transition-transform ${
                                settings.display.darkMode 
                                  ? 'bg-premium-black translate-x-7' 
                                  : 'bg-premium-white translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-premium-white font-medium">Alto Contraste</h4>
                            <p className="text-sm text-premium-white-soft">Melhorar visibilidade e acessibilidade</p>
                          </div>
                          <button 
                            onClick={() => toggleSetting('display', 'highContrast')}
                            className={`w-12 h-6 rounded-full relative transition-colors ${
                              settings.display.highContrast ? 'bg-premium-gold' : 'bg-premium-white-soft/30'
                            }`}
                          >
                            <span 
                              className={`absolute top-1 w-4 h-4 rounded-full transition-transform ${
                                settings.display.highContrast 
                                  ? 'bg-premium-black translate-x-7' 
                                  : 'bg-premium-white translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-premium-white font-medium">Animações</h4>
                            <p className="text-sm text-premium-white-soft">Habilitar animações e transições</p>
                          </div>
                          <button 
                            onClick={() => toggleSetting('display', 'animations')}
                            className={`w-12 h-6 rounded-full relative transition-colors ${
                              settings.display.animations ? 'bg-premium-gold' : 'bg-premium-white-soft/30'
                            }`}
                          >
                            <span 
                              className={`absolute top-1 w-4 h-4 rounded-full transition-transform ${
                                settings.display.animations 
                                  ? 'bg-premium-black translate-x-7' 
                                  : 'bg-premium-white translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Premium Tab */}
                {activeTab === 'premium' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {userProfile.isPremium ? (
                      <div className="text-center">
                        <div className="w-20 h-20 rounded-full bg-premium-gold flex items-center justify-center mx-auto mb-4">
                          <Star className="w-10 h-10 text-premium-black" />
                        </div>
                        <h3 className="text-xl font-bold text-premium-gold mb-2">Você é um membro Premium!</h3>
                        <p className="text-premium-white-soft mb-6">Aproveite todos os benefícios exclusivos.</p>
                        
                        <div className="bg-premium-gold/10 border border-premium-gold rounded-xl p-6 mb-8">
                          <h4 className="text-lg font-semibold text-premium-gold mb-4">Seus Benefícios Premium</h4>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <Check className="w-5 h-5 text-premium-gold" />
                              <span className="text-premium-white">Frete Grátis em todos os pedidos</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Check className="w-5 h-5 text-premium-gold" />
                              <span className="text-premium-white">Acesso antecipado a novos lançamentos</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Check className="w-5 h-5 text-premium-gold" />
                              <span className="text-premium-white">Descontos exclusivos de 15%</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Check className="w-5 h-5 text-premium-gold" />
                              <span className="text-premium-white">Suporte prioritário 24/7</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Check className="w-5 h-5 text-premium-gold" />
                              <span className="text-premium-white">Personalização de camisas</span>
                            </div>
                          </div>
                        </div>
                        
                        <button className="w-full bg-premium-gold hover:bg-premium-gold-light text-premium-black font-semibold py-3 px-6 rounded-xl transition-all duration-300">
                          Gerenciar Assinatura
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="text-center mb-8">
                          <div className="w-20 h-20 rounded-full bg-premium-gold/20 flex items-center justify-center mx-auto mb-4">
                            <Star className="w-10 h-10 text-premium-gold" />
                          </div>
                          <h3 className="text-xl font-bold text-premium-gold mb-2">Torne-se Premium</h3>
                          <p className="text-premium-white-soft">Desbloqueie benefícios exclusivos e eleve sua experiência.</p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-premium-black via-premium-black-light to-premium-black border border-premium-gold/30 rounded-xl p-6 mb-8">
                          <h4 className="text-lg font-semibold text-premium-gold mb-4">Benefícios Premium</h4>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <Check className="w-5 h-5 text-premium-gold" />
                              <span className="text-premium-white">Frete Grátis em todos os pedidos</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Check className="w-5 h-5 text-premium-gold" />
                              <span className="text-premium-white">Acesso antecipado a novos lançamentos</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Check className="w-5 h-5 text-premium-gold" />
                              <span className="text-premium-white">Descontos exclusivos de 15%</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Check className="w-5 h-5 text-premium-gold" />
                              <span className="text-premium-white">Suporte prioritário 24/7</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Check className="w-5 h-5 text-premium-gold" />
                              <span className="text-premium-white">Personalização de camisas</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-premium-gold/10 border border-premium-gold rounded-xl p-6 mb-8">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold text-premium-gold">Assinatura Premium</h4>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-premium-gold">R$ 29,90<span className="text-sm font-normal">/mês</span></div>
                              <div className="text-xs text-premium-white-soft">Cancele a qualquer momento</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-premium-white-soft mb-6">
                            <Shield className="w-4 h-4 text-premium-gold" />
                            <span>Pagamento seguro e criptografado</span>
                          </div>
                          <button 
                            onClick={upgradeToPremium}
                            className="w-full bg-premium-gold hover:bg-premium-gold-light text-premium-black font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                          >
                            Tornar-se Premium
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // After mounting, we can safely show the UI
  useEffect(() => setMounted(true), []);
  
  if (!mounted) return null;
  
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative flex items-center justify-center w-10 h-10 rounded-full bg-premium-black border border-premium-gold/30 hover:border-premium-gold transition-all duration-300"
      aria-label="Alternar tema"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-premium-gold" />
      ) : (
        <Moon className="w-5 h-5 text-premium-gold" />
      )}
    </button>
  );
}
