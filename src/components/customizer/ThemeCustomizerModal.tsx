import React, { useState } from 'react';
import {
  SlidersHorizontal,
  Palette,
  Store,
  X,
  Download,
  Upload,
  FileJson,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { THEME_PRESETS } from '../../data/defaultStoreConfig';

export const ThemeCustomizerModal: React.FC = () => {
  const {
    storeConfig,
    updateStoreConfig,
    resetStoreToPreset,
    exportStoreConfigJson,
    importStoreConfigJson,
    isCustomizerOpen,
    setIsCustomizerOpen,
  } = useStore();

  const [jsonInput, setJsonInput] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  if (!isCustomizerOpen) return null;

  const handlePaletteSelect = (preset: typeof THEME_PRESETS[0]) => {
    updateStoreConfig({
      primaryColor: preset.primary,
      accentColor: preset.accent,
    });
  };

  const handleExportJson = () => {
    const json = exportStoreConfigJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `store_profile_${storeConfig.slug || 'benchqc'}.json`;
    a.click();
  };

  const handleImportJson = () => {
    if (!jsonInput.trim()) return;
    const res = importStoreConfigJson(jsonInput);
    if (res.success) {
      setImportStatus('Configuration applied successfully!');
      setTimeout(() => setImportStatus(null), 3000);
    } else {
      setImportStatus(`Import error: ${res.error}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">White-Label Store Customizer</h3>
              <p className="text-xs text-slate-400">Brand settings, color palette & 1-click JSON export/import</p>
            </div>
          </div>
          <button
            onClick={() => setIsCustomizerOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          
          {/* Preset Switcher Quick Buttons */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-slate-200 block">Preloaded Shop Archetypes</span>
              <span className="text-[11px] text-slate-400">1-click switch between demo retailers</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => resetStoreToPreset('techdz')}
                className="px-3 py-1.5 rounded-xl bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 border border-emerald-500/30 font-semibold text-xs"
              >
                TechDZ (Algiers Centre)
              </button>
              <button
                type="button"
                onClick={() => resetStoreToPreset('elbiar')}
                className="px-3 py-1.5 rounded-xl bg-cyan-600/20 text-cyan-400 hover:bg-cyan-600/30 border border-cyan-500/30 font-semibold text-xs"
              >
                El-Biar Express (Algiers)
              </button>
            </div>
          </div>

          {/* Theme Palette Chooser */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-white flex items-center gap-2">
              <Palette className="w-4 h-4 text-emerald-400" />
              <span>Dynamic Accent Color Palette</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {THEME_PRESETS.map(preset => {
                const isSelected = storeConfig.primaryColor === preset.primary;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handlePaletteSelect(preset)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-white/60 bg-slate-800 ring-2 ring-emerald-400/30'
                        : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.primary }} />
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: preset.accent }} />
                    </div>
                    <div className="font-bold text-white text-[11px] truncate">{preset.name.split('(')[0]}</div>
                    <div className="text-[10px] text-slate-400">{preset.primary}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Store Profile Fields */}
          <div className="space-y-4 pt-2 border-t border-slate-800">
            <label className="text-xs font-bold text-white flex items-center gap-2">
              <Store className="w-4 h-4 text-cyan-400" />
              <span>Storefront Profile & Address Information</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Store Name</label>
                <input
                  type="text"
                  value={storeConfig.name}
                  onChange={e => updateStoreConfig({ name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Store Tagline</label>
                <input
                  type="text"
                  value={storeConfig.tagline}
                  onChange={e => updateStoreConfig({ tagline: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">WhatsApp Number (For wa.me links)</label>
                <input
                  type="text"
                  value={storeConfig.whatsapp}
                  onChange={e => updateStoreConfig({ whatsapp: e.target.value })}
                  placeholder="213550123456"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Display Phone Number</label>
                <input
                  type="text"
                  value={storeConfig.phoneDisplay}
                  onChange={e => updateStoreConfig({ phoneDisplay: e.target.value, phone: e.target.value })}
                  placeholder="+213 (0) 550 12 34 56"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Wilaya</label>
                <input
                  type="text"
                  value={storeConfig.wilaya}
                  onChange={e => updateStoreConfig({ wilaya: e.target.value })}
                  placeholder="Wilaya 16 - Alger"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Opening Hours</label>
                <input
                  type="text"
                  value={storeConfig.openingHours}
                  onChange={e => updateStoreConfig({ openingHours: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-semibold mb-1">Physical Street Address</label>
                <input
                  type="text"
                  value={storeConfig.address}
                  onChange={e => updateStoreConfig({ address: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Hardware Warranty (Days)</label>
                <input
                  type="number"
                  value={storeConfig.warrantyDays}
                  onChange={e => updateStoreConfig({ warrantyDays: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-emerald-400 font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Exchange Rate (DZD / USD)</label>
                <input
                  type="number"
                  value={storeConfig.exchangeRateDzdUsd}
                  onChange={e => updateStoreConfig({ exchangeRateDzdUsd: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* 1-Click JSON Export & Import */}
          <div className="space-y-3 pt-3 border-t border-slate-800">
            <label className="text-xs font-bold text-white flex items-center gap-2">
              <FileJson className="w-4 h-4 text-purple-400" />
              <span>1-Click Configuration JSON Export & Import</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Export */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-semibold text-slate-200">Export Current Profile</div>
                <p className="text-[11px] text-slate-400">
                  Save active theme, address, WhatsApp, and phone settings as portable JSON.
                </p>
                <button
                  type="button"
                  onClick={handleExportJson}
                  className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 font-bold border border-emerald-500/30 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download `store_profile_{storeConfig.slug}.json`</span>
                </button>
              </div>

              {/* Import */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-semibold text-slate-200">Import Profile JSON</div>
                <textarea
                  rows={2}
                  value={jsonInput}
                  onChange={e => setJsonInput(e.target.value)}
                  placeholder="Paste store_profile.json text here..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-[10px] font-mono text-slate-300 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={handleImportJson}
                  className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Apply Imported JSON</span>
                </button>
                {importStatus && (
                  <p className="text-[11px] text-emerald-400 font-semibold">{importStatus}</p>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex justify-end shrink-0">
          <button
            type="button"
            onClick={() => setIsCustomizerOpen(false)}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-glow-primary"
          >
            Save & Close Customizer
          </button>
        </div>

      </div>
    </div>
  );
};
