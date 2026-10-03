import React, { useState } from 'react';
import {
  ShieldCheck,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  SlidersHorizontal,
  LayoutDashboard,
  Search,
  ExternalLink,
  ChevronDown,
  RefreshCw,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Navbar: React.FC = () => {
  const {
    storeConfig,
    activeCurrency,
    toggleCurrency,
    filterState,
    setFilterState,
    setIsAdminOpen,
    setIsCustomizerOpen,
    trackWhatsAppClick,
    trackPhoneCall,
  } = useStore();

  const [showAddressDropdown, setShowAddressDropdown] = useState(false);

  const handleWhatsAppGeneralInquiry = () => {
    trackWhatsAppClick();
    const text = encodeURIComponent(
      `Hello ${storeConfig.name}, I am browsing your BenchQC certified laptop catalog. Could you provide information on current walk-in stock at your ${storeConfig.wilaya} branch?`
    );
    window.open(`https://wa.me/${storeConfig.whatsapp}?text=${text}`, '_blank');
  };

  const handlePhoneCall = () => {
    trackPhoneCall();
    window.location.href = `tel:${storeConfig.phone}`;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B0F17]/95 backdrop-blur-md border-b border-slate-800 shadow-xl transition-colors">
      {/* Top Banner: Verification Bar & Opening Hours */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-950 border-b border-emerald-900/30 px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              {storeConfig.verifiedPartnerTier}
            </span>
            <span className="hidden sm:inline-block text-slate-600">|</span>
            <span className="inline-flex items-center gap-1 text-slate-300 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Open Now · {storeConfig.openingHours.split('·')[0]}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              {storeConfig.wilaya}
            </span>
            <button
              onClick={() => setIsCustomizerOpen(true)}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700 text-amber-300 border border-amber-500/30 transition-colors text-[11px] font-medium"
              title="Customize Shop Name, Colors, Currency & Profile"
            >
              <SlidersHorizontal className="w-3 h-3 text-amber-400" />
              <span>Theme & White-Label</span>
            </button>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-colors text-[11px] font-semibold"
            >
              <LayoutDashboard className="w-3 h-3 text-emerald-400" />
              <span>Retailer Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          {/* Logo & Store Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 to-slate-800 border border-emerald-500/40 p-1 flex items-center justify-center shadow-glow-primary">
              <div className="w-full h-full rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-lg font-mono">
                BQC
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-tight leading-none hover:text-emerald-400 transition-colors cursor-pointer">
                  {storeConfig.name}
                </h1>
                <span className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                  Lab Certified
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate max-w-[200px] sm:max-w-xs mt-0.5">
                {storeConfig.tagline}
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={filterState.searchQuery}
                onChange={e => setFilterState(prev => ({ ...prev, searchQuery: e.target.value }))}
                placeholder="Search ThinkPad, RTX 3070, Core i7, OLED, M1 Pro..."
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-lg pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-inner"
              />
              {filterState.searchQuery && (
                <button
                  onClick={() => setFilterState(prev => ({ ...prev, searchQuery: '' }))}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs px-1"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Currency Switcher */}
            <button
              onClick={toggleCurrency}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-500 text-xs font-mono font-semibold text-slate-200 flex items-center gap-1.5 transition-all shadow-sm"
              title={`Switch currency (Current: ${activeCurrency})`}
            >
              <RefreshCw className="w-3 h-3 text-emerald-400" />
              <span className={activeCurrency === 'DZD' ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                DZD
              </span>
              <span className="text-slate-600">/</span>
              <span className={activeCurrency === 'USD' ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                USD
              </span>
            </button>

            {/* Address / Google Maps Trigger */}
            <div className="relative">
              <button
                onClick={() => setShowAddressDropdown(!showAddressDropdown)}
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700 hover:border-slate-500 text-xs text-slate-300 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden xl:inline">{storeConfig.wilaya}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showAddressDropdown && (
                <div className="absolute right-0 mt-2 w-72 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-3 text-xs z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-start justify-between gap-2 mb-2 pb-2 border-b border-slate-800">
                    <div>
                      <p className="font-semibold text-slate-100">{storeConfig.name}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{storeConfig.address}</p>
                    </div>
                    <button
                      onClick={() => setShowAddressDropdown(false)}
                      className="text-slate-500 hover:text-slate-300"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="space-y-1.5 text-[11px] text-slate-300 mb-3">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{storeConfig.openingHours}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{storeConfig.phoneDisplay}</span>
                    </div>
                  </div>
                  <a
                    href={storeConfig.mapsEmbedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            {/* Direct Phone Call Button */}
            <button
              onClick={handlePhoneCall}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors"
              title="Call Store Front Desk"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{storeConfig.phoneDisplay}</span>
            </button>

            {/* Direct WhatsApp Inquiry Button */}
            <button
              onClick={handleWhatsAppGeneralInquiry}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-glow-primary hover:shadow-emerald-500/30"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span className="hidden sm:inline">WhatsApp Inquiries</span>
              <span className="sm:hidden">WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-2.5 md:hidden">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={filterState.searchQuery}
              onChange={e => setFilterState(prev => ({ ...prev, searchQuery: e.target.value }))}
              placeholder="Search laptops, specs, tags..."
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
