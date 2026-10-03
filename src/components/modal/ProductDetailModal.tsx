import React, { useState } from 'react';
import {
  ShieldCheck,
  Cpu,
  HardDrive,
  Monitor,
  BatteryCharging,
  Flame,
  X,
  MessageCircle,
  CalendarCheck,
  Award,
  CheckCircle2,
  FileText,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from 'lucide-react';
import { RetailerLaptop } from '../../types';
import { useStore } from '../../context/StoreContext';

interface ProductDetailModalProps {
  laptop: RetailerLaptop | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ laptop, onClose }) => {
  const {
    storeConfig,
    formatPrice,
    setSelectedLaptopForCert,
    setSelectedLaptopForReservation,
    trackWhatsAppClick,
    trackCertView,
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'specs' | 'audit' | 'location'>('specs');
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!laptop) return null;

  const priceFormatted = formatPrice(laptop.priceDzd, true);
  const { specs, audit } = laptop;

  const handleWhatsApp = () => {
    trackWhatsAppClick(laptop.id, laptop.title);
    const text = encodeURIComponent(
      `Hello ${storeConfig.name}, I am reviewing the BenchQC audit for ${laptop.title} (SKU: ${laptop.sku}, Grade: ${laptop.grade}, Price: ${laptop.priceDzd.toLocaleString()} DZD). I'd like to ask a technical question.`
    );
    window.open(`https://wa.me/${storeConfig.whatsapp}?text=${text}`, '_blank');
  };

  const handleOpenCertificate = () => {
    trackCertView(laptop.id, laptop.title);
    setSelectedLaptopForCert(laptop);
  };

  const handleOpenReservation = () => {
    setSelectedLaptopForReservation(laptop);
  };

  const getScoreColor = (score: number) => {
    if (score >= 95) return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
    if (score >= 90) return 'text-teal-400 bg-teal-500/20 border-teal-500/30';
    if (score >= 80) return 'text-cyan-400 bg-cyan-500/20 border-cyan-500/30';
    return 'text-amber-400 bg-amber-500/20 border-amber-500/30';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95">
        
        {/* Sticky Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-lg text-xs font-black tracking-wider bg-emerald-500 text-slate-950 font-mono">
              {laptop.grade}
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white leading-none">
                {laptop.title}
              </h2>
              <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                <span className="font-medium text-emerald-400">{laptop.brand}</span>
                <span>•</span>
                <span className="font-mono">{laptop.sku}</span>
                <span>•</span>
                <span className="text-slate-300">Serial: <strong className="font-mono text-slate-200">{laptop.serialNumber}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenCertificate}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Official Lab Certificate</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Top Section: Multi-Angle Gallery & Quick Purchase Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Gallery (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              <div className="relative aspect-[16/10] rounded-2xl bg-slate-950 overflow-hidden border border-slate-800 group">
                <img
                  src={laptop.images[activeImageIndex] || laptop.images[0]}
                  alt={laptop.title}
                  className="w-full h-full object-cover object-center"
                />

                {/* Lightbox trigger */}
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="absolute top-3 right-3 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Expand Full Screen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                {/* Navigation Chevrons */}
                {laptop.images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setActiveImageIndex(prev => (prev - 1 + laptop.images.length) % laptop.images.length)
                      }
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white flex items-center justify-center border border-slate-700"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActiveImageIndex(prev => (prev + 1) % laptop.images.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white flex items-center justify-center border border-slate-700"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Bottom photo badge */}
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-sm text-[11px] text-slate-300 border border-slate-800 font-mono">
                  Angle {activeImageIndex + 1} of {laptop.images.length}
                </div>
              </div>

              {/* Thumbnails row */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {laptop.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-emerald-500 shadow-glow-primary scale-105'
                        : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Price, Warranty & Action Card (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4 rounded-2xl bg-slate-950/90 border border-slate-800 p-5">
              <div className="space-y-4">
                {/* Price Display */}
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Certified Price</div>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 mt-0.5">
                    {priceFormatted.primaryText}
                  </div>
                  {priceFormatted.secondaryText && (
                    <div className="text-xs font-mono text-slate-400 mt-0.5">
                      {priceFormatted.secondaryText} · Exchange Rate ~{storeConfig.exchangeRateDzdUsd} DZD/USD
                    </div>
                  )}
                </div>

                {/* Score & Inspection Badge */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">BenchQC Certified</div>
                      <div className="text-[11px] text-slate-400">{audit.inspectorName.split('(')[0]}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-black font-mono text-emerald-400">{audit.overallScore}/100</div>
                    <div className="text-[9px] uppercase tracking-wider text-slate-400">Total Score</div>
                  </div>
                </div>

                {/* Condition & Warranty bullet points */}
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>{storeConfig.warrantyDays}-Day Hardware Warranty</strong> by {storeConfig.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Physical Walk-in Bench:</strong> Test with your own software before purchase</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>58 Wilayas Insured Express:</strong> Payment on delivery available</span>
                  </div>
                </div>

                {/* Condition Notes */}
                {laptop.conditionNotes && (
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300">
                    <span className="font-semibold text-slate-200">Inspector Condition Remarks: </span>
                    {laptop.conditionNotes}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-3 border-t border-slate-800">
                {laptop.status === 'available' ? (
                  <button
                    onClick={handleOpenReservation}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-glow-primary flex items-center justify-center gap-2"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    <span>Reserve for 24h Bench Inspection (Free)</span>
                  </button>
                ) : (
                  <div className="w-full py-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold text-center">
                    Currently on 24h Customer Hold
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleWhatsApp}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp Inquiry</span>
                  </button>

                  <button
                    onClick={handleOpenCertificate}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Certificate</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Tab Navigation: Specs vs Audit Telemetry vs Store Map */}
          <div className="border-b border-slate-800 flex items-center gap-4">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'specs'
                  ? 'text-emerald-400 border-emerald-400'
                  : 'text-slate-400 border-transparent hover:text-slate-200'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Full Hardware Spec Matrix</span>
            </button>

            <button
              onClick={() => setActiveTab('audit')}
              className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'audit'
                  ? 'text-emerald-400 border-emerald-400'
                  : 'text-slate-400 border-transparent hover:text-slate-200'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>5-Dimension BenchQC Scorecard</span>
            </button>

            <button
              onClick={() => setActiveTab('location')}
              className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'location'
                  ? 'text-emerald-400 border-emerald-400'
                  : 'text-slate-400 border-transparent hover:text-slate-200'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Walk-In Store & Maps</span>
            </button>
          </div>

          {/* TAB 1: Hardware Specs Matrix */}
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in">
              {/* CPU & Memory */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>Processor & RAM Architecture</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Processor Model:</span>
                    <span className="text-white font-medium text-right">{specs.cpu.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cores / Threads:</span>
                    <span className="text-slate-200 font-mono">{specs.cpu.cores} Cores / {specs.cpu.threads} Threads</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Clock Frequency:</span>
                    <span className="text-slate-200 font-mono">{specs.cpu.baseClockGhz} GHz Base → {specs.cpu.boostClockGhz} GHz Boost</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">RAM Installed:</span>
                    <span className="text-emerald-400 font-mono font-bold">{specs.ram.sizeGb} GB {specs.ram.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">RAM Speed / Upgradeable:</span>
                    <span className="text-slate-200">{specs.ram.speedMhz} MHz {specs.ram.upgradeable ? '(Upgradeable)' : '(Soldered)'}</span>
                  </div>
                </div>
              </div>

              {/* Storage & GPU */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800">
                  <HardDrive className="w-4 h-4 text-purple-400" />
                  <span>Storage & Dedicated Graphics</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Primary Storage:</span>
                    <span className="text-white font-medium">{specs.storage.sizeGb} GB {specs.storage.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">SMART Health Remaining:</span>
                    <span className="text-emerald-400 font-mono font-bold">{specs.storage.smartHealthPct}% (TBW: {specs.storage.tbwTb || 15} TB)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Read Throughput:</span>
                    <span className="text-slate-200 font-mono">Up to {specs.storage.readSpeedMbps || 3500} MB/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">GPU Model:</span>
                    <span className="text-amber-400 font-medium text-right">{specs.gpu.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">VRAM Allocation:</span>
                    <span className="text-slate-200 font-mono">{specs.gpu.dedicatedVramGb > 0 ? `${specs.gpu.dedicatedVramGb}GB Dedicated VRAM` : 'Shared System VRAM'}</span>
                  </div>
                </div>
              </div>

              {/* Display & Battery */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800">
                  <Monitor className="w-4 h-4 text-amber-400" />
                  <span>Display & Visual Panel</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Screen Diagonal & Res:</span>
                    <span className="text-white font-medium">{specs.display.sizeInches}" {specs.display.resolution}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Panel Type & Brightness:</span>
                    <span className="text-slate-200">{specs.display.panelType} ({specs.display.nits} nits)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Refresh Rate:</span>
                    <span className="text-emerald-400 font-mono font-bold">{specs.display.refreshRateHz} Hz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Touchscreen:</span>
                    <span className="text-slate-200">{specs.display.isTouch ? 'Yes (Multi-Touch)' : 'Non-Touch Anti-Glare'}</span>
                  </div>
                </div>
              </div>

              {/* Ports, OS & Battery Health */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800">
                  <BatteryCharging className="w-4 h-4 text-emerald-400" />
                  <span>Battery, OS & Connectivity</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Battery Health & Cycles:</span>
                    <span className="text-emerald-400 font-mono font-bold">{specs.battery.healthPct}% · {specs.battery.cycleCount} Cycles</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Capacity Retention:</span>
                    <span className="text-slate-200 font-mono">{specs.battery.currentCapacityWh} Wh / {specs.battery.originalCapacityWh} Wh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Operating System:</span>
                    <span className="text-slate-200">{specs.os}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Weight:</span>
                    <span className="text-slate-200 font-mono">{specs.weightKg} kg</span>
                  </div>
                  <div className="pt-1">
                    <span className="text-slate-400 block mb-1">Available I/O Ports:</span>
                    <div className="flex flex-wrap gap-1">
                      {specs.ports.map((p, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 5-Dimension BenchQC Scorecard */}
          {activeTab === 'audit' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-black text-xl font-mono">
                    {audit.overallScore}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      BenchQC Hardware Certified Scorecard: {audit.certifiedGrade}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Audit Ref: <strong className="font-mono text-emerald-400">{audit.auditId}</strong> · Date: {audit.auditDate}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleOpenCertificate}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-glow-primary flex items-center gap-1.5"
                >
                  <FileText className="w-4 h-4" />
                  <span>Open Printable Lab Certificate</span>
                </button>
              </div>

              {/* 5 Dimensions Meter Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {/* 1. Battery Retention */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <BatteryCharging className="w-4 h-4 text-emerald-400" />
                      <span>Battery Wear & Life</span>
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${getScoreColor(audit.batteryHealthScore)}`}>
                      {audit.batteryHealthScore}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${audit.batteryHealthScore}%` }} />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Retention: {specs.battery.healthPct}% ({specs.battery.cycleCount} charge cycles). Tested under active video loop.
                  </p>
                </div>

                {/* 2. Display Matrix */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <Monitor className="w-4 h-4 text-cyan-400" />
                      <span>Display & Hinge Integrity</span>
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${getScoreColor(audit.displayIntegrityScore)}`}>
                      {audit.displayIntegrityScore}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                    <div className="bg-cyan-500 h-2 rounded-full" style={{ width: `${audit.displayIntegrityScore}%` }} />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    0 Dead Pixels, 0 pressure spots. Hinge tension torque within factory OEM spec.
                  </p>
                </div>

                {/* 3. Keyboard & Trackpad */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-purple-400" />
                      <span>Keyboard & Input Matrix</span>
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${getScoreColor(audit.keyboardTrackpadScore)}`}>
                      {audit.keyboardTrackpadScore}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${audit.keyboardTrackpadScore}%` }} />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    100% key switches registered with even travel. Multi-touch gestures & clicks responsive.
                  </p>
                </div>

                {/* 4. NVMe SMART Life */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <HardDrive className="w-4 h-4 text-emerald-400" />
                      <span>Storage SMART Health</span>
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${getScoreColor(audit.storageSmartScore)}`}>
                      {audit.storageSmartScore}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${audit.storageSmartScore}%` }} />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    0 Bad sectors, 0 reallocated sectors. {specs.storage.smartHealthPct}% remaining life reported by controller.
                  </p>
                </div>

                {/* 5. Thermal Stress Stability */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 sm:col-span-2 lg:col-span-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-amber-400" />
                      <span>Thermal Stress & Peak Temp Under 100% Load</span>
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${getScoreColor(audit.thermalStabilityScore)}`}>
                      {audit.thermalStabilityScore}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${audit.thermalStabilityScore}%` }} />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Peak CPU load temp: <strong className="text-white font-mono">{audit.peakStressTempC}°C</strong>. Thermal throttling: {audit.throttlingDetected ? 'Detected' : 'None (Sustained all boost clocks)'}.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Walk-In Location & Maps */}
          {activeTab === 'location' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-3 text-xs">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>In-Store Bench Inspection Counter</span>
                  </div>
                  <p className="text-slate-300">
                    Come visit <strong className="text-white">{storeConfig.name}</strong> to test this {laptop.title} on our high-speed testing bench. Bring your own flash drive or software project.
                  </p>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                    <div className="font-semibold text-white">{storeConfig.address}</div>
                    <div className="text-slate-400">{storeConfig.wilaya}</div>
                    <div className="text-emerald-400">{storeConfig.openingHours}</div>
                    <div className="text-slate-300">Phone: {storeConfig.phoneDisplay}</div>
                  </div>
                </div>

                {/* Embedded Map iframe or Google Maps button */}
                <div className="h-52 rounded-xl overflow-hidden border border-slate-800 bg-slate-900 relative flex items-center justify-center">
                  <iframe
                    title="Store Google Map"
                    src={storeConfig.mapsEmbedUrl}
                    className="w-full h-full border-0 filter grayscale invert contrast-125"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Full-screen Lightbox */}
      {lightboxOpen && (
        <div
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <img
            src={laptop.images[activeImageIndex] || laptop.images[0]}
            alt={laptop.title}
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
