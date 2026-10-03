import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  RetailerLaptop,
  StoreProfile,
  ReservationInquiry,
  StoreAnalytics,
  Currency,
  CatalogFilterState,
} from '../types';
import {
  DEFAULT_STORE_PROFILE,
  ALTERNATE_STORE_PROFILE,
  INITIAL_LAPTOPS,
} from '../data/defaultStoreConfig';

interface StoreContextType {
  // Store Profile & Theme
  storeConfig: StoreProfile;
  updateStoreConfig: (updates: Partial<StoreProfile>) => void;
  resetStoreToPreset: (presetId: 'techdz' | 'elbiar') => void;
  exportStoreConfigJson: () => string;
  importStoreConfigJson: (jsonString: string) => { success: boolean; error?: string };

  // Inventory
  laptops: RetailerLaptop[];
  addLaptop: (laptop: RetailerLaptop) => void;
  updateLaptop: (id: string, updates: Partial<RetailerLaptop>) => void;
  deleteLaptop: (id: string) => void;
  resetInventoryToDefault: () => void;

  // Currency
  activeCurrency: Currency;
  setActiveCurrency: (c: Currency) => void;
  toggleCurrency: () => void;
  formatPrice: (priceDzd: number, showDual?: boolean) => { primaryText: string; secondaryText?: string; convertedAmount: number };

  // Filters & Catalog Search
  filterState: CatalogFilterState;
  setFilterState: React.Dispatch<React.SetStateAction<CatalogFilterState>>;
  resetFilters: () => void;
  filteredLaptops: RetailerLaptop[];

  // Modal States
  selectedLaptopForModal: RetailerLaptop | null;
  setSelectedLaptopForModal: (laptop: RetailerLaptop | null) => void;
  selectedLaptopForCert: RetailerLaptop | null;
  setSelectedLaptopForCert: (laptop: RetailerLaptop | null) => void;
  selectedLaptopForReservation: RetailerLaptop | null;
  setSelectedLaptopForReservation: (laptop: RetailerLaptop | null) => void;

  isCustomizerOpen: boolean;
  setIsCustomizerOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  adminTab: 'inventory' | 'monetization';
  setAdminTab: (tab: 'inventory' | 'monetization') => void;

  // Reservations
  reservations: ReservationInquiry[];
  createReservation: (data: {
    laptopId: string;
    laptopTitle: string;
    laptopPriceDzd: number;
    customerName: string;
    customerPhone: string;
    customerWilaya: string;
    inspectionSlot: string;
    notes?: string;
  }) => ReservationInquiry;
  updateReservationStatus: (id: string, status: ReservationInquiry['status']) => void;

  // Analytics & Monetization
  analytics: StoreAnalytics;
  trackWhatsAppClick: (laptopId?: string, laptopTitle?: string) => void;
  trackCertView: (laptopId?: string, laptopTitle?: string) => void;
  trackPhoneCall: (laptopId?: string) => void;
}

const STORAGE_KEYS = {
  STORE_CONFIG: 'benchqc_store_config_v1',
  LAPTOPS: 'benchqc_laptops_v1',
  RESERVATIONS: 'benchqc_reservations_v1',
  ANALYTICS: 'benchqc_analytics_v1',
  CURRENCY: 'benchqc_active_currency_v1',
};

const initialFilters: CatalogFilterState = {
  searchQuery: '',
  minPrice: 0,
  maxPrice: 300000,
  cpuArchitecture: 'all',
  minRamGb: 0,
  gpuType: 'all',
  grades: [],
  intendedUse: 'all',
  brand: 'all',
  sortBy: 'featured',
};

const initialAnalytics: StoreAnalytics = {
  whatsappClicks: 14,
  reservationsCount: 6,
  certificatesViewed: 38,
  totalInventoryValueDzd: 0,
  accruedAuditFeesDzd: 9000,
  conversionLogs: [
    {
      id: 'log-1',
      type: 'whatsapp_click',
      timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
      itemTitle: 'Lenovo ThinkPad T14 Gen 3',
      itemId: 'BQC-LPT-101',
    },
    {
      id: 'log-2',
      type: 'reservation',
      timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
      itemTitle: 'Apple MacBook Pro 14" M1 Pro',
      itemId: 'BQC-LPT-104',
    },
    {
      id: 'log-3',
      type: 'cert_view',
      timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
      itemTitle: 'Dell XPS 15 9520 (OLED 3.5K)',
      itemId: 'BQC-LPT-102',
    }
  ],
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Store Config State
  const [storeConfig, setStoreConfig] = useState<StoreProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STORE_CONFIG);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_STORE_PROFILE;
  });

  // 2. Laptops Inventory State
  const [laptops, setLaptops] = useState<RetailerLaptop[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LAPTOPS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_LAPTOPS;
  });

  // 3. Reservations State
  const [reservations, setReservations] = useState<ReservationInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'res-init-1',
        ticketCode: 'BQC-RES-8821',
        laptopId: 'BQC-LPT-101',
        laptopTitle: 'Lenovo ThinkPad T14 Gen 3',
        laptopPriceDzd: 96000,
        customerName: 'Yacine Brahimi',
        customerPhone: '+213 551 22 33 44',
        customerWilaya: 'Wilaya 16 - Alger',
        reservationDate: new Date(Date.now() - 86400000).toISOString(),
        expiresAt: new Date(Date.now() + 86400000).toISOString(),
        status: 'confirmed',
        inspectionSlot: 'Tomorrow 14:00 - 15:00',
        notes: 'Requested dual OS boot verification during bench test.',
      },
      {
        id: 'res-init-2',
        ticketCode: 'BQC-RES-4912',
        laptopId: 'BQC-LPT-104',
        laptopTitle: 'Apple MacBook Pro 14" M1 Pro',
        laptopPriceDzd: 225000,
        customerName: 'Nadia Merad',
        customerPhone: '+213 770 99 88 77',
        customerWilaya: 'Wilaya 09 - Blida',
        reservationDate: new Date(Date.now() - 3600000 * 5).toISOString(),
        expiresAt: new Date(Date.now() + 3600000 * 19).toISOString(),
        status: 'pending',
        inspectionSlot: 'Today 17:30 - 18:30',
        notes: 'Needs battery cycle inspection in presence of lab auditor.',
      }
    ];
  });

  // 4. Analytics State
  const [analytics, setAnalytics] = useState<StoreAnalytics>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialAnalytics;
  });

  // 5. Active Currency
  const [activeCurrency, setActiveCurrency] = useState<Currency>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENCY);
      if (saved === 'USD' || saved === 'DZD') return saved;
    } catch {
      // ignore
    }
    return 'DZD';
  });

  // 6. Filter State
  const [filterState, setFilterState] = useState<CatalogFilterState>(initialFilters);

  // 7. Modals
  const [selectedLaptopForModal, setSelectedLaptopForModal] = useState<RetailerLaptop | null>(null);
  const [selectedLaptopForCert, setSelectedLaptopForCert] = useState<RetailerLaptop | null>(null);
  const [selectedLaptopForReservation, setSelectedLaptopForReservation] = useState<RetailerLaptop | null>(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [adminTab, setAdminTab] = useState<'inventory' | 'monetization'>('inventory');

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STORE_CONFIG, JSON.stringify(storeConfig));
    // Apply dynamic CSS variables for colors
    const root = document.documentElement;
    root.style.setProperty('--color-primary', storeConfig.primaryColor);
    root.style.setProperty('--color-accent', storeConfig.accentColor);
    
    // Calculate hover / glow variants
    root.style.setProperty('--color-primary-glow', `${storeConfig.primaryColor}40`);
    root.style.setProperty('--color-accent-glow', `${storeConfig.accentColor}40`);
  }, [storeConfig]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LAPTOPS, JSON.stringify(laptops));
  }, [laptops]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(analytics));
  }, [analytics]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENCY, activeCurrency);
  }, [activeCurrency]);

  // Dynamic calculations
  const toggleCurrency = () => {
    setActiveCurrency(prev => (prev === 'DZD' ? 'USD' : 'DZD'));
  };

  const formatPrice = (priceDzd: number, showDual: boolean = true) => {
    const rate = storeConfig.exchangeRateDzdUsd || 140;
    const usdAmount = Math.round(priceDzd / rate);

    if (activeCurrency === 'DZD') {
      const primaryText = `${priceDzd.toLocaleString('en-US')} DZD`;
      const secondaryText = showDual ? `~$${usdAmount.toLocaleString('en-US')} USD` : undefined;
      return { primaryText, secondaryText, convertedAmount: priceDzd };
    } else {
      const primaryText = `$${usdAmount.toLocaleString('en-US')} USD`;
      const secondaryText = showDual ? `~${priceDzd.toLocaleString('en-US')} DZD` : undefined;
      return { primaryText, secondaryText, convertedAmount: usdAmount };
    }
  };

  const updateStoreConfig = (updates: Partial<StoreProfile>) => {
    setStoreConfig(prev => ({ ...prev, ...updates }));
  };

  const resetStoreToPreset = (presetId: 'techdz' | 'elbiar') => {
    if (presetId === 'techdz') {
      setStoreConfig(DEFAULT_STORE_PROFILE);
    } else {
      setStoreConfig(ALTERNATE_STORE_PROFILE);
    }
  };

  const exportStoreConfigJson = () => {
    return JSON.stringify(storeConfig, null, 2);
  };

  const importStoreConfigJson = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed.name || !parsed.primaryColor) {
        return { success: false, error: 'Invalid config format: missing store name or colors.' };
      }
      setStoreConfig(parsed);
      return { success: true };
    } catch (err: unknown) {
      return { success: false, error: (err as Error).message || 'Invalid JSON' };
    }
  };

  const addLaptop = (laptop: RetailerLaptop) => {
    setLaptops(prev => [laptop, ...prev]);
    // Recalculate audit fees for shop analytics (+1500 DZD lab token)
    setAnalytics(prev => ({
      ...prev,
      accruedAuditFeesDzd: prev.accruedAuditFeesDzd + 1500,
    }));
  };

  const updateLaptop = (id: string, updates: Partial<RetailerLaptop>) => {
    setLaptops(prev => prev.map(item => (item.id === id ? { ...item, ...updates } : item)));
  };

  const deleteLaptop = (id: string) => {
    setLaptops(prev => prev.filter(item => item.id !== id));
  };

  const resetInventoryToDefault = () => {
    setLaptops(INITIAL_LAPTOPS);
  };

  const resetFilters = () => {
    setFilterState(initialFilters);
  };

  const createReservation = (data: {
    laptopId: string;
    laptopTitle: string;
    laptopPriceDzd: number;
    customerName: string;
    customerPhone: string;
    customerWilaya: string;
    inspectionSlot: string;
    notes?: string;
  }): ReservationInquiry => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newReservation: ReservationInquiry = {
      id: `res-${Date.now()}`,
      ticketCode: `BQC-RES-${randomNum}`,
      ...data,
      reservationDate: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 3600000).toISOString(),
      status: 'pending',
    };

    setReservations(prev => [newReservation, ...prev]);
    // Also mark laptop as reserved
    updateLaptop(data.laptopId, { status: 'reserved' });

    // Track analytics
    setAnalytics(prev => ({
      ...prev,
      reservationsCount: prev.reservationsCount + 1,
      conversionLogs: [
        {
          id: `log-${Date.now()}`,
          type: 'reservation',
          timestamp: new Date().toISOString(),
          itemTitle: data.laptopTitle,
          itemId: data.laptopId,
        },
        ...prev.conversionLogs,
      ],
    }));

    return newReservation;
  };

  const updateReservationStatus = (id: string, status: ReservationInquiry['status']) => {
    setReservations(prev =>
      prev.map(r => {
        if (r.id === id) {
          // If cancelled, make laptop available again
          if (status === 'cancelled') {
            updateLaptop(r.laptopId, { status: 'available' });
          } else if (status === 'inspected') {
            updateLaptop(r.laptopId, { status: 'sold' });
          }
          return { ...r, status };
        }
        return r;
      })
    );
  };

  const trackWhatsAppClick = (laptopId?: string, laptopTitle?: string) => {
    setAnalytics(prev => ({
      ...prev,
      whatsappClicks: prev.whatsappClicks + 1,
      conversionLogs: [
        {
          id: `log-${Date.now()}`,
          type: 'whatsapp_click',
          timestamp: new Date().toISOString(),
          itemTitle: laptopTitle,
          itemId: laptopId,
        },
        ...prev.conversionLogs,
      ],
    }));
  };

  const trackCertView = (laptopId?: string, laptopTitle?: string) => {
    setAnalytics(prev => ({
      ...prev,
      certificatesViewed: prev.certificatesViewed + 1,
      conversionLogs: [
        {
          id: `log-${Date.now()}`,
          type: 'cert_view',
          timestamp: new Date().toISOString(),
          itemTitle: laptopTitle,
          itemId: laptopId,
        },
        ...prev.conversionLogs,
      ],
    }));
  };

  const trackPhoneCall = (laptopId?: string) => {
    setAnalytics(prev => ({
      ...prev,
      conversionLogs: [
        {
          id: `log-${Date.now()}`,
          type: 'phone_call',
          timestamp: new Date().toISOString(),
          itemId: laptopId,
        },
        ...prev.conversionLogs,
      ],
    }));
  };

  // Filtered laptops computation
  const filteredLaptops = laptops.filter(laptop => {
    // 1. Search Query (Title, Model, Brand, CPU, GPU, SKU)
    if (filterState.searchQuery.trim()) {
      const q = filterState.searchQuery.toLowerCase();
      const match =
        laptop.title.toLowerCase().includes(q) ||
        laptop.brand.toLowerCase().includes(q) ||
        laptop.model.toLowerCase().includes(q) ||
        laptop.sku.toLowerCase().includes(q) ||
        laptop.specs.cpu.model.toLowerCase().includes(q) ||
        laptop.specs.gpu.model.toLowerCase().includes(q) ||
        laptop.intendedUseTags.some(tag => tag.toLowerCase().includes(q));
      if (!match) return false;
    }

    // 2. Price Range
    if (filterState.minPrice > 0 && laptop.priceDzd < filterState.minPrice) return false;
    if (filterState.maxPrice < 300000 && laptop.priceDzd > filterState.maxPrice) return false;

    // 3. CPU Architecture
    if (filterState.cpuArchitecture !== 'all') {
      if (filterState.cpuArchitecture === 'Intel Core') {
        if (!laptop.specs.cpu.model.includes('Intel') && laptop.specs.cpu.architecture !== 'Intel Core') return false;
      } else if (filterState.cpuArchitecture === 'AMD Ryzen') {
        if (!laptop.specs.cpu.model.includes('AMD') && !laptop.specs.cpu.model.includes('Ryzen') && laptop.specs.cpu.architecture !== 'AMD Ryzen') return false;
      } else if (filterState.cpuArchitecture === 'Apple Silicon') {
        if (!laptop.specs.cpu.model.includes('Apple') && !laptop.specs.cpu.model.includes('M1') && !laptop.specs.cpu.model.includes('M2') && !laptop.specs.cpu.model.includes('M3') && laptop.specs.cpu.architecture !== 'Apple Silicon') return false;
      }
    }

    // 4. Min RAM
    if (filterState.minRamGb > 0 && laptop.specs.ram.sizeGb < filterState.minRamGb) return false;

    // 5. GPU Type
    if (filterState.gpuType === 'dedicated' && !laptop.specs.gpu.isDedicated) return false;
    if (filterState.gpuType === 'integrated' && laptop.specs.gpu.isDedicated) return false;

    // 6. Quality Grades
    if (filterState.grades.length > 0 && !filterState.grades.includes(laptop.grade)) return false;

    // 7. Intended Use
    if (filterState.intendedUse !== 'all' && !laptop.intendedUseTags.includes(filterState.intendedUse)) return false;

    // 8. Brand
    if (filterState.brand !== 'all' && laptop.brand.toLowerCase() !== filterState.brand.toLowerCase()) return false;

    return true;
  }).sort((a, b) => {
    switch (filterState.sortBy) {
      case 'price-asc':
        return a.priceDzd - b.priceDzd;
      case 'price-desc':
        return b.priceDzd - a.priceDzd;
      case 'score-desc':
        return b.audit.overallScore - a.audit.overallScore;
      case 'battery-desc':
        return b.specs.battery.healthPct - a.specs.battery.healthPct;
      case 'newest':
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      case 'featured':
      default:
        if (a.featured === b.featured) return b.audit.overallScore - a.audit.overallScore;
        return a.featured ? -1 : 1;
    }
  });

  return (
    <StoreContext.Provider
      value={{
        storeConfig,
        updateStoreConfig,
        resetStoreToPreset,
        exportStoreConfigJson,
        importStoreConfigJson,
        laptops,
        addLaptop,
        updateLaptop,
        deleteLaptop,
        resetInventoryToDefault,
        activeCurrency,
        setActiveCurrency,
        toggleCurrency,
        formatPrice,
        filterState,
        setFilterState,
        resetFilters,
        filteredLaptops,
        selectedLaptopForModal,
        setSelectedLaptopForModal,
        selectedLaptopForCert,
        setSelectedLaptopForCert,
        selectedLaptopForReservation,
        setSelectedLaptopForReservation,
        isCustomizerOpen,
        setIsCustomizerOpen,
        isAdminOpen,
        setIsAdminOpen,
        adminTab,
        setAdminTab,
        reservations,
        createReservation,
        updateReservationStatus,
        analytics,
        trackWhatsAppClick,
        trackCertView,
        trackPhoneCall,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
