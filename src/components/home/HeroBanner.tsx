import React from 'react';
import {
  ShieldCheck,
  Cpu,
  BatteryCharging,
  Truck,
  Sparkles,
  CheckCircle2,
  Award,
  BadgeCheck,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const HeroBanner: React.FC = () => {
  const { storeConfig, laptops, filterState, setFilterState } = useStore();

  const totalCertifiedCount = laptops.length;
  const availableCount = laptops.filter(l => l.status === 'available').length;
  
  // Calculate average battery health
  const avgBattery = Math.round(
    laptops.reduce((acc, curr) => acc + curr.specs.battery.healthPct, 0) / (laptops.length || 1)
  );

  // Calculate average QC score
  const avgScore = Math.round(
    laptops.reduce((acc, curr) => acc + curr.audit.overallScore, 0) / (laptops.length || 1)
  );

  const quickFilterTags = [
    { label: 'All Laptops', tag: 'all' },
    { label: 'Software Dev', tag: 'Software Dev' },
    { label: 'Architecture / CAD', tag: 'Architecture/CAD' },
    { label: 'Gaming & 3D', tag: 'Gaming' },
    { label: 'Student / Budget', tag: 'Student/Budget' },
    { label: 'Grade A+ Only', grade: 'Grade A+' },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#0F172A] via-[#0B0F17] to-[#0B0F17] border-b border-slate-800/80 pt-8 pb-10">
      {/* Decorative ambient grid & glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400">
              <BadgeCheck className="w-4 h-4 text-emerald-400" />
              <span>Algerian Certified Hardware Engine · Verified Second-Hand</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Second-Hand Laptops, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
                100% Lab BenchQC Tested
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Zero guesswork. Every machine at <strong className="text-white">{storeConfig.name}</strong> undergoes a rigorous 5-dimension hardware stress test — battery cycle check, NVMe SMART wear, thermals under sustained load, display matrix, and keyboard actuation.
            </p>

            {/* Trust Proposition Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">{storeConfig.warrantyDays}-Day Lab Warranty</h4>
                  <p className="text-[11px] text-slate-400">Hardware replacement & bench support</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <Truck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">58 Wilayas Delivery</h4>
                  <p className="text-[11px] text-slate-400">Or walk-in bench test in {storeConfig.wilaya.split('-')[1]?.trim() || 'Algiers'}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <Award className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">24h Free Bench Hold</h4>
                  <p className="text-[11px] text-slate-400">Inspect physically before paying a dinar</p>
                </div>
              </div>
            </div>

            {/* Quick Filter Tag Buttons */}
            <div className="pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Popular categories:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickFilterTags.map((item, idx) => {
                  const isActive = item.tag
                    ? filterState.intendedUse === item.tag
                    : item.grade
                    ? filterState.grades.includes(item.grade as any)
                    : false;

                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        if (item.tag) {
                          setFilterState(prev => ({
                            ...prev,
                            intendedUse: item.tag === 'all' ? 'all' : item.tag,
                            grades: item.tag === 'all' ? [] : prev.grades,
                          }));
                        } else if (item.grade) {
                          setFilterState(prev => ({
                            ...prev,
                            grades: prev.grades.includes(item.grade as any) ? [] : [item.grade as any],
                          }));
                        }
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-emerald-500 text-slate-950 font-bold shadow-glow-primary'
                          : 'bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-slate-600 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Live Certification Stats Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-200">BenchQC Lab Metrics</h3>
                    <p className="text-[10px] text-slate-400">Live Hardware Telemetry</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse">
                  ● REAL-TIME
                </span>
              </div>

              {/* Metric grid */}
              <div className="grid grid-cols-2 gap-4 py-5">
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    <span>In-Stock Ready</span>
                  </div>
                  <div className="text-2xl font-black text-white font-mono">
                    {availableCount} <span className="text-xs text-slate-400 font-sans font-normal">/ {totalCertifiedCount} units</span>
                  </div>
                  <p className="text-[10px] text-emerald-400 mt-1 font-medium">100% Tested & Packaged</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                    <BatteryCharging className="w-4 h-4 text-emerald-400" />
                    <span>Avg Battery Health</span>
                  </div>
                  <div className="text-2xl font-black text-white font-mono">
                    {avgBattery}%
                  </div>
                  <p className="text-[10px] text-emerald-400 mt-1 font-medium">Lab Threshold ≥ 85%</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>Average QC Score</span>
                  </div>
                  <div className="text-2xl font-black text-amber-300 font-mono">
                    {avgScore}<span className="text-xs text-slate-400 font-sans font-normal">/100</span>
                  </div>
                  <p className="text-[10px] text-amber-400/90 mt-1 font-medium">Grade A+ & Grade A standard</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Partner Tier</span>
                  </div>
                  <div className="text-sm font-bold text-white truncate mt-1">
                    {storeConfig.verifiedPartnerTier.split(' ')[0]}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Verified Hardware Partner</p>
                </div>
              </div>

              {/* Physical Walk-In Banner */}
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="text-slate-200">
                    Walk-in address: <strong className="text-emerald-300">{storeConfig.address.split(',')[0]}</strong>
                  </span>
                </div>
                <a
                  href={storeConfig.mapsEmbedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold underline text-[11px]"
                >
                  Map →
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
