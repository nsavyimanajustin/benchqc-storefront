import React from 'react';
import {
  ShieldCheck,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Footer: React.FC = () => {
  const { storeConfig, setIsAdminOpen, setIsCustomizerOpen, trackWhatsAppClick, trackPhoneCall } = useStore();

  const handleWhatsApp = () => {
    trackWhatsAppClick();
    window.open(`https://wa.me/${storeConfig.whatsapp}`, '_blank');
  };

  const handlePhone = () => {
    trackPhoneCall();
    window.location.href = `tel:${storeConfig.phone}`;
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Col 1: Store & Lab Partner Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold">
                BQC
              </div>
              <span className="font-bold text-white text-sm">{storeConfig.name}</span>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              {storeConfig.tagline}. All second-hand hardware is physically authenticated and stress-tested with full BenchQC 5-dimension diagnostic audit.
            </p>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{storeConfig.verifiedPartnerTier}</span>
            </div>
          </div>

          {/* Col 2: In-Store Walk-in & Inspection */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Physical Testing Bench
            </h4>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{storeConfig.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{storeConfig.openingHours}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <button onClick={handlePhone} className="hover:text-emerald-300 transition-colors">
                  {storeConfig.phoneDisplay}
                </button>
              </div>
            </div>
          </div>

          {/* Col 3: BenchQC Guarantee Standards */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Verification Standards
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{storeConfig.warrantyDays}-Day Hardware Replacement Warranty</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Battery Retention &gt; 85% Guaranteed</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Thermal Throttling Loop Check</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>24h Free In-Store Hold &amp; Inspection</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Retailer Portal & Tools */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Retailer Engine
            </h4>
            <div className="space-y-2">
              <button
                onClick={() => setIsAdminOpen(true)}
                className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-left font-semibold text-slate-200 transition-colors flex items-center justify-between text-[11px]"
              >
                <span>Retailer Inventory Studio</span>
                <span>→</span>
              </button>
              <button
                onClick={() => setIsCustomizerOpen(true)}
                className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-left font-semibold text-amber-300 transition-colors flex items-center justify-between text-[11px]"
              >
                <span>White-Label Customizer</span>
                <span>→</span>
              </button>
              <button
                onClick={handleWhatsApp}
                className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors flex items-center justify-center gap-1.5 text-[11px]"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white/20" />
                <span>Direct WhatsApp Hotline</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} {storeConfig.name}. Powered by <strong className="text-emerald-400">BenchQC Storefront Engine</strong>.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Algiers · Oran · Constantine · 58 Wilayas</span>
            <span>•</span>
            <span className="text-emerald-400 font-mono">v1.0.0 Stable MVP</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
