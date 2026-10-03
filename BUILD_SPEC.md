# Task Specification: BenchQC Storefront Engine (`benchqc-storefront`)

Location: `/home/hz/.gemini/antigravity/scratch/benchqc-storefront`

## Goal
Build a complete, production-ready, beautiful, and fully-functional MVP for **"BenchQC Storefront Engine"** (`benchqc-storefront`). A turn-key customizable e-commerce and inventory portal template designed for Algerian and international second-hand laptop shops (e.g. Algiers, Oran, Constantine, etc.).

## Tech Stack
- Vite + React + TypeScript
- Tailwind CSS (Deep Charcoal `#0B0F17`, Slate Navy `#1E293B`, Tech Emerald `#10B981`, Accent Amber `#F59E0B`, Border Slate `#334155`, etc.) with CSS variables for dynamic accent theming.
- Lucide React icons (`lucide-react`)
- LocalStorage persistence for store configuration, inventory, reservations, and analytics.

## Required Features & Architecture:

### 1. Types & Data Architecture (`src/types/index.ts`)
- `StoreProfile`: id, name, slug, tagline, phone, whatsapp, wilaya, address, mapsEmbedUrl, openingHours, rating, verifiedPartnerTier, logoUrl, heroBannerType, primaryColor, accentColor, currencyPrimary ('DZD'), currencySecondary ('USD'), exchangeRateDzdUsd, warrantyDays, socialLinks.
- `HardwareSpecs`: cpu (model, cores, threads, baseClockGhz, boostClockGhz), ram (sizeGb, type, speedMhz), storage (sizeGb, type, smartHealthPct, tbwTb), gpu (model, dedicatedVramGb), display (sizeInches, resolution, refreshRateHz, panelType, nits), battery (healthPct, cycleCount, originalCapacityWh, currentCapacityWh), weightKg, os, ports (list of string).
- `BenchQCAuditScorecard`: auditId, auditDate, certifiedGrade ('Grade A+', 'Grade A', 'Grade B'), overallScore (0-100), batteryHealthScore, displayIntegrityScore, keyboardTrackpadScore, storageSmartScore, thermalStabilityScore, peakStressTempC, throttlingDetected (boolean), deadPixelCount, hingeFlexPass (boolean), inspectorName, officialVerificationUrl, certificatePdfUrl.
- `RetailerLaptop`: id, title, brand, model, serialNumber, sku, category, intendedUseTags: string[], conditionNotes: string, grade: 'Grade A+' | 'Grade A' | 'Grade B', specs: HardwareSpecs, audit: BenchQCAuditScorecard, priceDzd: number, priceUsd: number, images: string[], status: 'available' | 'reserved' | 'sold', featured: boolean, dateAdded: string.
- `ReservationInquiry`: id, laptopId, laptopTitle, customerName, customerPhone, customerWilaya, reservationDate, expiresAt, status: 'pending' | 'confirmed' | 'cancelled' | 'inspected', inspectionSlot: string, notes?: string.
- `StoreAnalytics`: whatsappClicks: number, reservationsCount: number, certificatesViewed: number, totalInventoryValueDzd: number, accruedAuditFeesDzd: number.

### 2. Default Config & Mock Data (`src/data/defaultStoreConfig.ts`)
- Pre-populated realistic shops:
  - Primary: "TechDZ IT Hub - Algiers" (Didouche Mourad, Alger Centre, Wilaya 16 - Alger, Phone: +213 550 12 34 56, WhatsApp: 213550123456).
  - Alternate preset: "El-Biar Laptop Express" (Place Kennedy, El Biar, Alger).
- Pre-populated rich inventory of at least 6 diverse certified laptops:
  1. Lenovo ThinkPad T14 Gen 3 (Intel Core i7-1265U, 16GB DDR4, 512GB NVMe SMART 99%, Iris Xe, 14" FHD IPS 400 nits, Battery 94% / 68 cycles, Grade A+, 96,000 DZD / ~$690 USD, Tags: Software Dev, Business).
  2. Dell XPS 15 9520 (Intel Core i7-12700H 14-core, 32GB DDR5, 1TB NVMe SMART 98%, RTX 3050 Ti 4GB, 15.6" 3.5K OLED Touch 400 nits, Battery 89% / 142 cycles, Grade A, 185,000 DZD / ~$1,320 USD, Tags: Architecture/CAD, Video Editing).
  3. HP EliteBook 840 G8 (Intel Core i5-1145G7, 16GB RAM, 256GB NVMe SMART 95%, Iris Xe, 14" FHD 1000 nits SureView, Battery 91% / 110 cycles, Grade A, 74,000 DZD / ~$530 USD, Tags: Student/Budget, Office).
  4. Apple MacBook Pro 14" M1 Pro (8-Core CPU, 14-Core GPU, 16GB Unified RAM, 512GB SSD 100% SMART, 14.2" Liquid Retina XDR 120Hz ProMotion, Battery 96% / 54 cycles, Grade A+, 225,000 DZD / ~$1,600 USD, Tags: Software Dev, Creative).
  5. Lenovo Legion 5 Pro (AMD Ryzen 7 5800H, 32GB DDR4, 1TB NVMe, RTX 3070 8GB 140W, 16" QHD 165Hz 500 nits, Battery 86% / 210 cycles, Grade A, 168,000 DZD / ~$1,200 USD, Tags: Gaming, 3D Rendering).
  6. Dell Latitude 5420 (Intel Core i5-1135G7, 8GB DDR4, 256GB NVMe, Iris Xe, 14" FHD, Battery 88% / 180 cycles, Grade B, 52,000 DZD / ~$370 USD, Tags: Student/Budget, Daily Tasks).
- High quality Unsplash laptop hardware photos covering multiple angles (lid, keyboard, ports, screen, bottom).

### 3. Storefront UI Modules
- **Navbar & Store Identity:**
  - Shop Logo, Shop Name, "BenchQC Partner Network Tier-1" verified shield, "Open Now · Closes 19:00" live badge.
  - Search input with instant filtering.
  - Header shortcuts: Call Phone, Direct WhatsApp button with greeting, Wilaya/Address indicator with Google Maps trigger, Currency Switcher (DZD / USD with dynamic recalculation), and "Retailer Portal / Admin" switcher button.
- **Hero & Trust Proposition Banner:**
  - Highlighting shop's reputation, "30-Day Physical Hardware Bench Warranty", "100% BenchQC Lab Tested", active certified count, average battery health metric.
  - Wilaya delivery / in-store pickup badges ("Walk-in Bench Inspection Ready").
- **Catalog & Advanced Filtering:**
  - Filters: Keyword, Price Range Slider, Processor Architecture (Intel Core, AMD Ryzen, Apple Silicon), RAM capacity, Dedicated GPU vs Integrated, Quality Grade (Grade A+, Grade A, Grade B), Intended Use Tags (Architecture/CAD, Software Dev, Gaming, Student/Budget).
  - Sort by: Price (Low to High, High to Low), Score (Highest first), Battery Health, Newest.
  - Active filter chips with 1-click clear.
- **Laptop Card (`LaptopCard.tsx`):**
  - High-res photo gallery thumbnail hover / switcher.
  - Quality Grade badge (A+, A, B) with distinctive color coding.
  - BenchQC Verification Seal with overall score (e.g. `96/100`) and battery summary (`94% Health · 68 Cycles`).
  - Dual price display (e.g. `96,000 DZD` primary bold, `~$690 USD` secondary).
  - Quick specs strip: CPU, RAM, SSD, GPU, Screen.
  - Action buttons: "Inspect Scorecard & Details" modal trigger, and "Inquire on WhatsApp" with formatted text:
    `"Hello [Shop Name], I am interested in the certified [Laptop Title] (Ref: [Laptop ID], Price: [DZD Price] DZD). Is it still available for bench inspection?"`
- **Product Detail & Virtual Bench Inspection Modal (`ProductDetailModal.tsx`):**
  - Multi-angle gallery with thumbnails, full-screen zoom lightbox.
  - Full Hardware Specification Matrix (CPU, RAM type/speed, NVMe SMART health, GPU, Display panel, Ports, Weight).
  - Embedded BenchQC Hardware Audit Scorecard:
    - 5 QC Dimensions with radial/progress bars: Battery wear & cycle count, Display dead pixels & hinge flex, Keyboard actuation & trackpad, Storage SMART & TBW, Thermal stability (peak temp & throttle).
    - Certificate Print / View modal preview simulating an authentic BenchQC Certificate with QR code.
  - "Reserve for Physical Bench Inspection (24h Free Hold)" flow:
    - Modal form capturing Name, Phone, Wilaya, Preferred pickup time slot.
    - Generates reservation ticket code (e.g. `BQC-RES-8821`).
    - Dispatches simulated Telegram/WhatsApp alert notification and updates inventory state.
  - Interactive Google Maps direction card for store walk-in.

### 4. Retailer Self-Service Management Portal (`src/components/admin/InventoryStudio.tsx`)
- **Dashboard Summary:**
  - Total Active Units, Total Value (DZD), Reserved Units, Average Lab QC Score.
- **Quick-Add Laptop Studio:**
  - Multi-step or accordion form:
    1. Smartphone photo uploader (drag & drop / file input with instant thumbnail preview + photo URL presets).
    2. Model & Spec Presets (One-click fill for ThinkPad, XPS, EliteBook, MacBook, Legion, Latitude).
    3. BenchQC Audit Ingestion: Input Audit ID or drag-and-drop / paste `benchqc_audit.json` to auto-fill specs, scores, battery health, and grade!
    4. Price in DZD (auto-calculates USD based on configured exchange rate), condition notes, and status.
- **Inventory Stock Management Table:**
  - Search and filter inventory.
  - Inline status toggle (`Available`, `Reserved`, `Sold`).
  - Inline price editor and delete button.
  - Quick WhatsApp lead generator for marketing.

### 5. White-Label Customization Engine (`src/components/customizer/ThemeCustomizerModal.tsx`)
- Shop Profile Editor: Store Name, Tagline, Phone, WhatsApp number, Wilaya, Street Address, Opening hours, Google Maps Embed URL.
- Visual Branding:
  - Theme accent palette selector:
    - Tech Emerald (`#10B981`)
    - Tech Cyan (`#06B6D4`)
    - Royal Blue (`#3B82F6`)
    - Amber Gold (`#F59E0B`)
    - Crimson Red (`#EF4444`)
  - Banner style selection.
- 1-Click Config JSON Export & Import:
  - Export `store_profile_<slug>.json` button.
  - Import JSON file or paste JSON to instantly restyle the entire storefront for another shop!
- Reset to Default preset button (TechDZ Algiers or El-Biar Express).

### 6. BenchQC Partner Monetization Tracker (`src/components/admin/MonetizationTracker.tsx`)
- Metrics: WhatsApp inquiries logged, Bench inspection reservations, Audit certificates opened.
- Commission / Audit fee calculation:
  - e.g. 1,500 DZD per certified audit or 1.5% reservation conversion token.
  - Transparent balance sheet showing accrued earnings and partner tier status.

### 7. Clean State Management & Persistence (`src/context/StoreContext.tsx`)
- Central React Context managing:
  - `storeConfig` (with localStorage sync)
  - `laptops` (with localStorage sync, fallback to default mock)
  - `reservations` (with localStorage sync)
  - `analytics` (with localStorage sync)
  - `activeCurrency` ('DZD' | 'USD')
  - `selectedLaptopForModal` (for detail/audit view)
  - `isCustomizerOpen`, `isAdminOpen`

## Verification Instructions
1. Run `npm install` and verify dependencies.
2. Ensure `npm run build` passes with 0 TypeScript / lint / bundle errors.
3. Verify that the UI renders smoothly, responsive on mobile & desktop, with rich styling, zero broken image links, and full reactivity.
