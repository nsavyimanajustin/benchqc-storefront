import React, { useState } from 'react';
import {
  ShieldCheck,
  Cpu,
  Layers,
  HardDrive,
  Monitor,
  BatteryCharging,
  MessageCircle,
  CalendarCheck,
  Sparkles,
  Flame,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { RetailerLaptop } from '../../types';
import { useStore } from '../../context/StoreContext';

interface LaptopCardProps {
  laptop: RetailerLaptop;
}

export const LaptopCard: React.FC<LaptopCardProps> = ({ laptop }) => {
  const {
    storeConfig,
    formatPrice,
    setSelectedLaptopForModal,
    setSelectedLaptopForReservation,
    trackWhatsAppClick,
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const priceFormatted = formatPrice(laptop.priceDzd, true);

  const handleWhatsAppInquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackWhatsAppClick(laptop.id, laptop.title);
    const text = encodeURIComponent(
      `Hello ${storeConfig.name}, I am interested in the certified ${laptop.title} (Ref: ${laptop.id}, Price: ${laptop.priceDzd.toLocaleString()} DZD). Is it still available for bench inspection?`
    );
    window.open(`https://wa.me/${storeConfig.whatsapp}?text=${text}`, '_blank');
  };

  const handleReserveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedLaptopForReservation(laptop);
  };

  // Grade color theme
  const getGradeBadge = (grade: string) => {
    switch (grade) {
      case 'Grade A+':
        return 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-emerald-500/20';
      case 'Grade A':
        return 'bg-teal-500 text-slate-950 border-teal-400 shadow-teal-500/20';
      case 'Grade B':
      default:
        return 'bg-amber-500 text-slate-950 border-amber-400 shadow-amber-500/20';
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex(prev => (prev + 1) % laptop.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex(prev => (prev - 1 + laptop.images.length) % laptop.images.length);
  };

  const currentImage = laptop.images[activeImageIndex] || 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80';

  return (
    <div
      onClick={() => setSelectedLaptopForModal(laptop)}
      className="group relative rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 flex flex-col overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-emerald-950/40 cursor-pointer"
    >
      {/* Photo Stage & Overlay Badges */}
      <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
        <img
          src={imageError ? 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80' : currentImage}
          alt={laptop.title}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Ambient Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

        {/* Top Badges Row */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {/* Grade Badge */}
          <span className={`px-2.5 py-1 rounded-lg text-xs font-black tracking-wider border shadow-md ${getGradeBadge(laptop.grade)}`}>
            {laptop.grade}
          </span>

          {/* Status Badge */}
          {laptop.status === 'reserved' ? (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/90 text-slate-950 font-mono">
              24H HOLD
            </span>
          ) : laptop.status === 'sold' ? (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-600 text-white font-mono">
              SOLD OUT
            </span>
          ) : laptop.featured ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-600/90 text-white shadow-sm">
              <Sparkles className="w-3 h-3" />
              HOT PICK
            </span>
          ) : null}
        </div>

        {/* Image Carousel Controls if multiple images */}
        {laptop.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-slate-700"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-slate-700"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-slate-950/60 backdrop-blur-sm px-2 py-0.5 rounded-full">
              {laptop.images.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    activeImageIndex === idx ? 'bg-emerald-400 w-3' : 'bg-slate-500'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* BenchQC Overall Score Seal Overlay (Bottom Right of Photo) */}
        <div className="absolute bottom-2.5 right-3 flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md border border-emerald-500/40 rounded-lg px-2 py-1 shadow-md">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <div className="leading-none text-right">
            <div className="text-xs font-mono font-black text-emerald-400">
              {laptop.audit.overallScore}<span className="text-[9px] text-slate-400 font-normal">/100</span>
            </div>
            <div className="text-[8px] uppercase tracking-wider text-slate-400 font-medium">Lab Score</div>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        {/* Title and Category */}
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="font-medium text-emerald-400">{laptop.brand}</span>
            <span className="font-mono text-slate-500">{laptop.sku}</span>
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
            {laptop.title}
          </h3>
        </div>

        {/* BenchQC Telemetry Summary Bar */}
        <div className="grid grid-cols-2 gap-2 p-2 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-300">
            <BatteryCharging className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">
              <strong className="text-white font-mono">{laptop.specs.battery.healthPct}%</strong> ({laptop.specs.battery.cycleCount} cyc)
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">
              Peak <strong className="text-white font-mono">{laptop.audit.peakStressTempC}°C</strong> (No Throttle)
            </span>
          </div>
        </div>

        {/* Quick Hardware Spec Grid */}
        <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[11px] text-slate-300 pt-1 border-t border-slate-800/60">
          <div className="flex items-center gap-1.5 truncate">
            <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">{laptop.specs.cpu.model.split('(')[0]}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Layers className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <span>{laptop.specs.ram.sizeGb}GB {laptop.specs.ram.type.split(' ')[0]}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <HardDrive className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{laptop.specs.storage.sizeGb}GB SSD <span className="text-[10px] text-emerald-400">({laptop.specs.storage.smartHealthPct}%)</span></span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Monitor className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{laptop.specs.display.sizeInches}" {laptop.specs.display.resolution.split(' ')[0]}</span>
          </div>
        </div>

        {/* Intended Use Tags */}
        <div className="flex flex-wrap gap-1">
          {laptop.intendedUseTags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 border border-slate-700/60"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Price & Primary CTA */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-base sm:text-lg font-black font-mono text-emerald-400 leading-tight">
              {priceFormatted.primaryText}
            </div>
            {priceFormatted.secondaryText && (
              <div className="text-[11px] font-mono text-slate-400">
                {priceFormatted.secondaryText}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleWhatsAppInquiry}
              className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors shadow-sm"
              title="Quick WhatsApp Inquiry"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-500/20" />
            </button>

            {laptop.status === 'available' ? (
              <button
                onClick={handleReserveClick}
                className="px-2.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center gap-1 shadow-glow-primary"
                title="Hold for 24h Walk-in Inspection"
              >
                <CalendarCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Hold 24h</span>
              </button>
            ) : (
              <button
                onClick={() => setSelectedLaptopForModal(laptop)}
                className="px-2.5 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
              >
                Inspect
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
