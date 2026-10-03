import React from 'react';
import {
  LayoutDashboard,
  Package,
  TrendingUp,
  X,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { InventoryStudio } from './InventoryStudio';
import { MonetizationTracker } from './MonetizationTracker';

export const AdminModal: React.FC = () => {
  const { isAdminOpen, setIsAdminOpen, adminTab, setAdminTab, storeConfig } = useStore();

  if (!isAdminOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800 gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white">
                  Retailer Self-Service Management Portal
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {storeConfig.name}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Manage stock, photo uploads, BenchQC audit ingestion, and partner ledger
              </p>
            </div>
          </div>

          {/* Tab buttons */}
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setAdminTab('inventory')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  adminTab === 'inventory'
                    ? 'bg-emerald-600 text-white shadow-glow-primary'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Package className="w-3.5 h-3.5" />
                <span>Inventory Studio</span>
              </button>

              <button
                type="button"
                onClick={() => setAdminTab('monetization')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  adminTab === 'monetization'
                    ? 'bg-emerald-600 text-white shadow-glow-primary'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Monetization & Ledger</span>
              </button>
            </div>

            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {adminTab === 'inventory' ? <InventoryStudio /> : <MonetizationTracker />}
        </div>

      </div>
    </div>
  );
};
