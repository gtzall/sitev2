"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, ChevronDown, Filter, X } from 'lucide-react'

interface FilterOption {
  id: string;
  label: string;
}

interface FilterGroup {
  id: string;
  name: string;
  options: FilterOption[];
}

interface FilterGroupProps {
  filters: FilterGroup[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (groupId: string, optionId: string) => void;
  onClearFilters: () => void;
}

export function FilterGroup({ filters, selectedFilters, onFilterChange, onClearFilters }: FilterGroupProps) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Check if any filters are selected
  const hasActiveFilters = Object.values(selectedFilters).some(group => group.length > 0);
  
  // Count total selected filters
  const selectedCount = Object.values(selectedFilters).reduce(
    (total, group) => total + group.length, 
    0
  );
  
  // Toggle filter group open/closed state
  const toggleGroup = (groupId: string) => {
    setOpenGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };
  
  // Check if screen is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  // Reset mobile filters panel when screen size changes
  useEffect(() => {
    if (!isMobile) {
      setMobileFiltersOpen(false);
    }
  }, [isMobile]);

  return (
    <div className="w-full">
      {/* Mobile Filter Button */}
      {isMobile && (
        <div className="mb-4">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="w-full flex items-center justify-between px-4 py-3 bg-premium-black border border-premium-gold/30 rounded-lg text-premium-white hover:border-premium-gold transition-all duration-300"
          >
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-premium-gold" />
              <span>Filtros</span>
              {selectedCount > 0 && (
                <span className="bg-premium-gold text-premium-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {selectedCount}
                </span>
              )}
            </div>
            <ChevronDown className="w-4 h-4 text-premium-gold" />
          </button>
        </div>
      )}
      
      {/* Desktop Filters */}
      <div className={`${isMobile ? 'hidden' : 'block'} space-y-6`}>
        {hasActiveFilters && (
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-premium-white-soft">
              {selectedCount} {selectedCount === 1 ? 'filtro selecionado' : 'filtros selecionados'}
            </div>
            <button
              onClick={onClearFilters}
              className="text-sm text-premium-gold hover:text-premium-gold-light transition-colors"
            >
              Limpar filtros
            </button>
          </div>
        )}
        
        {filters.map((group) => (
          <div key={group.id} className="border-b border-premium-gold/20 pb-4">
            <button
              onClick={() => toggleGroup(group.id)}
              className="flex items-center justify-between w-full py-2 text-left"
            >
              <h3 className="text-premium-gold font-medium">{group.name}</h3>
              <ChevronDown 
                className={`w-4 h-4 text-premium-gold transition-transform ${
                  openGroups[group.id] ? 'rotate-180' : ''
                }`} 
              />
            </button>
            
            {(openGroups[group.id] || !isMobile) && (
              <div className="mt-2 space-y-2">
                {group.options.map((option) => {
                  const isSelected = selectedFilters[group.id]?.includes(option.id);
                  
                  return (
                    <button
                      key={option.id}
                      onClick={() => onFilterChange(group.id, option.id)}
                      className={`flex items-center gap-3 w-full py-2 px-2 rounded-md transition-colors ${
                        isSelected 
                          ? 'bg-premium-gold/10 text-premium-white' 
                          : 'text-premium-white-soft hover:text-premium-white hover:bg-premium-gold/5'
                      }`}
                    >
                      <div 
                        className={`w-4 h-4 rounded border flex items-center justify-center ${
                          isSelected 
                            ? 'bg-premium-gold border-premium-gold' 
                            : 'border-premium-white-soft'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-premium-black" />}
                      </div>
                      <span className="text-sm">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Mobile Filters Panel */}
      {isMobile && mobileFiltersOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setMobileFiltersOpen(false)}
          />
          
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 max-h-[80vh] bg-premium-black border-t border-premium-gold/30 rounded-t-2xl z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-premium-gold/20">
              <h2 className="text-lg font-semibold text-premium-gold">Filtros</h2>
              <div className="flex items-center gap-4">
                {hasActiveFilters && (
                  <button
                    onClick={onClearFilters}
                    className="text-sm text-premium-gold"
                  >
                    Limpar
                  </button>
                )}
                <button 
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-premium-gold/10"
                >
                  <X className="w-5 h-5 text-premium-white" />
                </button>
              </div>
            </div>
            
            <div className="p-4 overflow-y-auto max-h-[calc(80vh-64px)]">
              <div className="space-y-6">
                {filters.map((group) => (
                  <div key={group.id} className="border-b border-premium-gold/20 pb-4">
                    <button
                      onClick={() => toggleGroup(group.id)}
                      className="flex items-center justify-between w-full py-2 text-left"
                    >
                      <h3 className="text-premium-gold font-medium">{group.name}</h3>
                      <ChevronDown 
                        className={`w-4 h-4 text-premium-gold transition-transform ${
                          openGroups[group.id] ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    
                    {openGroups[group.id] && (
                      <div className="mt-2 space-y-2">
                        {group.options.map((option) => {
                          const isSelected = selectedFilters[group.id]?.includes(option.id);
                          
                          return (
                            <button
                              key={option.id}
                              onClick={() => onFilterChange(group.id, option.id)}
                              className={`flex items-center gap-3 w-full py-2 px-2 rounded-md transition-colors ${
                                isSelected 
                                  ? 'bg-premium-gold/10 text-premium-white' 
                                  : 'text-premium-white-soft hover:text-premium-white hover:bg-premium-gold/5'
                              }`}
                            >
                              <div 
                                className={`w-4 h-4 rounded border flex items-center justify-center ${
                                  isSelected 
                                    ? 'bg-premium-gold border-premium-gold' 
                                    : 'border-premium-white-soft'
                                }`}
                              >
                                {isSelected && <Check className="w-3 h-3 text-premium-black" />}
                              </div>
                              <span className="text-sm">{option.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 border-t border-premium-gold/20">
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full bg-premium-gold hover:bg-premium-gold-light text-premium-black font-semibold py-3 rounded-lg transition-colors"
              >
                Aplicar Filtros ({selectedCount})
              </button>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}

// Example usage:
export function ProductFilters() {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    categories: [],
    teams: [],
    sizes: [],
    prices: []
  });
  
  const filterGroups: FilterGroup[] = [
    {
      id: 'categories',
      name: 'Categorias',
      options: [
        { id: 'europeias', label: 'Europeias' },
        { id: 'brasileiras', label: 'Brasileiras' },
        { id: 'retros', label: 'Retrôs' },
        { id: 'selecoes', label: 'Seleções' }
      ]
    },
    {
      id: 'teams',
      name: 'Times',
      options: [
        { id: 'real_madrid', label: 'Real Madrid' },
        { id: 'barcelona', label: 'Barcelona' },
        { id: 'manchester_united', label: 'Manchester United' },
        { id: 'liverpool', label: 'Liverpool' },
        { id: 'flamengo', label: 'Flamengo' },
        { id: 'corinthians', label: 'Corinthians' },
        { id: 'brasil', label: 'Brasil' },
        { id: 'argentina', label: 'Argentina' }
      ]
    },
    {
      id: 'sizes',
      name: 'Tamanhos',
      options: [
        { id: 'p', label: 'P' },
        { id: 'm', label: 'M' },
        { id: 'g', label: 'G' },
        { id: 'gg', label: 'GG' }
      ]
    },
    {
      id: 'prices',
      name: 'Faixa de Preço',
      options: [
        { id: 'under_100', label: 'Até R$ 100' },
        { id: '100_200', label: 'R$ 100 - R$ 200' },
        { id: '200_300', label: 'R$ 200 - R$ 300' },
        { id: 'over_300', label: 'Acima de R$ 300' }
      ]
    }
  ];
  
  const handleFilterChange = (groupId: string, optionId: string) => {
    setSelectedFilters(prev => {
      const groupFilters = [...(prev[groupId] || [])];
      
      if (groupFilters.includes(optionId)) {
        // Remove filter if already selected
        return {
          ...prev,
          [groupId]: groupFilters.filter(id => id !== optionId)
        };
      } else {
        // Add filter if not selected
        return {
          ...prev,
          [groupId]: [...groupFilters, optionId]
        };
      }
    });
  };
  
  const clearAllFilters = () => {
    setSelectedFilters({
      categories: [],
      teams: [],
      sizes: [],
      prices: []
    });
  };
  
  return (
    <FilterGroup 
      filters={filterGroups}
      selectedFilters={selectedFilters}
      onFilterChange={handleFilterChange}
      onClearFilters={clearAllFilters}
    />
  );
}
