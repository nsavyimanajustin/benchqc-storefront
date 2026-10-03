# Architecture & State Lifecycle

This document describes the component architecture and data lifecycle of **BenchQC Storefront Engine**.

---

## 1. High-Level Architecture

```
[ Local Storage / Config Import ]
               │
               ▼
      [ StoreContext ]  <─── [ Theme Engine (CSS Variables) ]
       │            │
       ▼            ▼
[ Storefront ]   [ Admin Portal ]
 - Navbar         - Intake Studio (Photo drag & drop + audit ingest)
 - Hero Banner    - Inventory Management (Available / Reserved / Sold)
 - Catalog Grid   - Partner Monetization & Inquiry Ledger
 - Detail Modal
 - Cert Modal
 - Reservation
```

---

## 2. StoreContext Architecture

All state is orchestrated via `StoreContext.tsx`:
- `storeConfig`: Contains the store brand profile, theme colors, Wilaya location, WhatsApp number, and inventory list.
- `currency`: Active display currency (`DZD` or `USD`), with real-time conversion against `exchangeRateDzdUsd`.
- `filters`: Search keyword, price range, RAM, CPU brand, dedicated GPU, quality grade, and intended use tags.
- `reservations`: Tracks customer inspection reservations with 24-hour expiration timers.
- `inquiryLedger`: Logs WhatsApp customer click-throughs and generated inquiries for partner fee auditing.

---

## 3. Theming & Customization Engine

Theme colors (`primaryColor`, `accentColor`) are dynamically injected into document root CSS variables:
```css
:root {
  --color-primary: #10B981;
  --color-accent: #F59E0B;
}
```
This enables white-label retailer instances to rebrand the entire visual aesthetic (Emerald, Cyan, Indigo, Amber, Ruby) instantly without recompiling the bundle.
