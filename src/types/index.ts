export type QualityGrade = 'Grade A+' | 'Grade A' | 'Grade B';
export type LaptopStatus = 'available' | 'reserved' | 'sold';
export type Currency = 'DZD' | 'USD';

export interface HardwareSpecs {
  cpu: {
    model: string;
    cores: number;
    threads: number;
    baseClockGhz: number;
    boostClockGhz: number;
    architecture?: 'Intel Core' | 'AMD Ryzen' | 'Apple Silicon';
  };
  ram: {
    sizeGb: number;
    type: string; // e.g. DDR4, DDR5, LPDDR5, Unified
    speedMhz: number;
    upgradeable?: boolean;
  };
  storage: {
    sizeGb: number;
    type: string; // e.g. NVMe PCIe 4.0, NVMe PCIe 3.0, Apple SSD
    smartHealthPct: number;
    tbwTb?: number;
    readSpeedMbps?: number;
  };
  gpu: {
    model: string;
    dedicatedVramGb: number; // 0 for integrated
    isDedicated: boolean;
  };
  display: {
    sizeInches: number;
    resolution: string; // e.g. "1920x1080 (FHD)", "3456x2160 (3.5K OLED)"
    refreshRateHz: number;
    panelType: string; // IPS, OLED, Liquid Retina XDR, TN
    nits: number;
    isTouch?: boolean;
  };
  battery: {
    healthPct: number;
    cycleCount: number;
    originalCapacityWh: number;
    currentCapacityWh: number;
    estimatedRuntimeHours?: number;
  };
  weightKg: number;
  os: string;
  ports: string[];
}

export interface BenchQCAuditScorecard {
  auditId: string;
  auditDate: string;
  certifiedGrade: QualityGrade;
  overallScore: number; // 0-100
  batteryHealthScore: number; // 0-100
  displayIntegrityScore: number; // 0-100
  keyboardTrackpadScore: number; // 0-100
  storageSmartScore: number; // 0-100
  thermalStabilityScore: number; // 0-100
  peakStressTempC: number;
  throttlingDetected: boolean;
  deadPixelCount: number;
  hingeFlexPass: boolean;
  inspectorName: string;
  officialVerificationUrl: string;
  certificatePdfUrl?: string;
  notes?: string;
}

export interface RetailerLaptop {
  id: string;
  title: string;
  brand: string;
  model: string;
  serialNumber: string;
  sku: string;
  category: 'Ultrabook' | 'Workstation' | 'Gaming' | 'Business' | 'Budget';
  intendedUseTags: string[]; // e.g. 'Software Dev', 'Architecture/CAD', 'Gaming', 'Student/Budget', 'Video Editing'
  conditionNotes: string;
  grade: QualityGrade;
  specs: HardwareSpecs;
  audit: BenchQCAuditScorecard;
  priceDzd: number;
  priceUsd: number;
  images: string[];
  status: LaptopStatus;
  featured: boolean;
  dateAdded: string;
}

export interface StoreProfile {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string; // numeric format for wa.me/
  wilaya: string;
  wilayaCode: number;
  address: string;
  mapsEmbedUrl: string;
  openingHours: string;
  rating: number;
  reviewCount: number;
  verifiedPartnerTier: 'Tier-1 Certified Partner' | 'Tier-2 Premier Partner' | 'Master Lab Hub';
  logoUrl?: string;
  heroBannerType: 'modern-gradient' | 'cyber-dark' | 'emerald-minimal' | 'glass-tech';
  primaryColor: string; // Hex e.g. #10B981
  accentColor: string; // Hex e.g. #F59E0B
  currencyPrimary: 'DZD';
  currencySecondary: 'USD';
  exchangeRateDzdUsd: number; // e.g. 140 DZD per 1 USD official / street parity
  warrantyDays: number; // e.g. 30, 60, 90
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    telegram?: string;
    tiktok?: string;
  };
}

export interface ReservationInquiry {
  id: string;
  ticketCode: string;
  laptopId: string;
  laptopTitle: string;
  laptopPriceDzd: number;
  customerName: string;
  customerPhone: string;
  customerWilaya: string;
  reservationDate: string;
  expiresAt: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'inspected';
  inspectionSlot: string;
  notes?: string;
}

export interface StoreAnalytics {
  whatsappClicks: number;
  reservationsCount: number;
  certificatesViewed: number;
  totalInventoryValueDzd: number;
  accruedAuditFeesDzd: number;
  conversionLogs: {
    id: string;
    type: 'whatsapp_click' | 'reservation' | 'cert_view' | 'phone_call';
    timestamp: string;
    itemTitle?: string;
    itemId?: string;
  }[];
}

export interface CatalogFilterState {
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
  cpuArchitecture: string; // 'all' | 'Intel Core' | 'AMD Ryzen' | 'Apple Silicon'
  minRamGb: number;
  gpuType: string; // 'all' | 'dedicated' | 'integrated'
  grades: QualityGrade[];
  intendedUse: string; // 'all' or specific tag
  brand: string; // 'all' or brand name
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'score-desc' | 'battery-desc' | 'newest';
}

export interface ThemePreset {
  name: string;
  id: string;
  primary: string;
  accent: string;
  bgGradient: string;
}
