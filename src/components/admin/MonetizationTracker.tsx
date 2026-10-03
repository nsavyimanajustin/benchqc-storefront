import React from 'react';
import {
  DollarSign,
  MessageCircle,
  CalendarCheck,
  FileText,
  ShieldCheck,
  Download,
  Clock,
  Zap,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const MonetizationTracker: React.FC = () => {
  const { analytics, storeConfig, laptops, reservations } = useStore();

  const auditFeePerUnitDzd = 1500; // 1,500 DZD per certified bench test
  const totalAuditFees = laptops.length * auditFeePerUnitDzd;
  const gmvDzd = laptops.reduce((sum, l) => sum + l.priceDzd, 0);

  const handleExportStatement = () => {
    const report = {
      store: storeConfig.name,
      wilaya: storeConfig.wilaya,
      dateGenerated: new Date().toISOString(),
      partnerTier: storeConfig.verifiedPartnerTier,
      metrics: {
        totalInventoryValueDzd: gmvDzd,
        totalCertifiedUnits: laptops.length,
        whatsappInquiriesLogged: analytics.whatsappClicks,
        benchHoldsReserved: analytics.reservationsCount,
        auditCertificatesViewed: analytics.certificatesViewed,
        accruedAuditLabFeesDzd: totalAuditFees,
      },
      auditLedger: laptops.map(l => ({
        sku: l.sku,
        title: l.title,
        grade: l.grade,
        score: l.audit.overallScore,
        priceDzd: l.priceDzd,
        feeDzd: auditFeePerUnitDzd,
        auditDate: l.audit.auditDate,
      })),
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `benchqc_partner_statement_${storeConfig.slug}.json`;
    a.click();
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Partner Tier & Accrued Token Overview */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-slate-950 border border-emerald-500/40 relative overflow-hidden shadow-2xl">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">BenchQC Partner Revenue & Trust Ledger</h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-500 text-slate-950 font-mono">
                  {storeConfig.verifiedPartnerTier}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Transparent accounting for certified hardware diagnostics and lead conversions.
              </p>
            </div>
          </div>

          <button
            onClick={handleExportStatement}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition-all shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>Export Statement (JSON)</span>
          </button>
        </div>
      </div>

      {/* 4 Financial & Lead Velocity KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>WhatsApp Leads Logged</span>
            <MessageCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{analytics.whatsappClicks}</div>
          <p className="text-[11px] text-emerald-400 mt-1">High-intent buyer inquiries</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>24h Bench Hold Bookings</span>
            <CalendarCheck className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-300 font-mono">{analytics.reservationsCount}</div>
          <p className="text-[11px] text-amber-400 mt-1">Physical store walk-ins</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Lab Certificates Viewed</span>
            <FileText className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-cyan-300 font-mono">{analytics.certificatesViewed}</div>
          <p className="text-[11px] text-cyan-400 mt-1">Verified audit inspections</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Accrued Lab Diagnostics</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            {totalAuditFees.toLocaleString()} <span className="text-xs text-slate-400">DZD</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">1,500 DZD per certified unit</p>
        </div>
      </div>

      {/* Conversion Event Ledger & Active Reservations Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Real-time Telemetry Stream */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Real-Time Lead & Conversion Activity Log</span>
            </h4>
            <span className="text-[10px] font-mono font-bold text-emerald-400">● LIVE DISPATCH</span>
          </div>

          <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1 text-xs">
            {analytics.conversionLogs.map(log => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  {log.type === 'whatsapp_click' ? (
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <MessageCircle className="w-3.5 h-3.5" />
                    </div>
                  ) : log.type === 'reservation' ? (
                    <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                      <CalendarCheck className="w-3.5 h-3.5" />
                    </div>
                  ) : log.type === 'cert_view' ? (
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div>
                    <div className="font-semibold text-slate-200">
                      {log.type === 'whatsapp_click'
                        ? 'WhatsApp Lead Generated'
                        : log.type === 'reservation'
                        ? '24h In-Store Inspection Hold Booked'
                        : log.type === 'cert_view'
                        ? 'Audit Certificate Inspected'
                        : 'Phone Hotline Call'}
                    </div>
                    {log.itemTitle && (
                      <div className="text-[11px] text-slate-400 truncate max-w-xs">{log.itemTitle}</div>
                    )}
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1 shrink-0">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 24h Bench Reservation Queue */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-emerald-400" />
              <span>In-Store Bench Inspection Queue</span>
            </h4>
            <span className="text-xs text-slate-400 font-mono">
              {reservations.length} active holds
            </span>
          </div>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-1 text-xs">
            {reservations.map(res => (
              <div
                key={res.id}
                className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-emerald-400 text-xs">
                    {res.ticketCode}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      res.status === 'confirmed'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : res.status === 'pending'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {res.status.toUpperCase()}
                  </span>
                </div>

                <div>
                  <div className="font-bold text-white">{res.laptopTitle}</div>
                  <div className="text-[11px] text-slate-400">
                    Customer: <strong className="text-slate-200">{res.customerName}</strong> ({res.customerPhone}) · {res.customerWilaya}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Slot: <strong className="text-slate-300">{res.inspectionSlot}</strong>
                  </div>
                </div>

                {res.notes && (
                  <div className="text-[11px] text-slate-400 italic bg-slate-900/60 p-1.5 rounded">
                    "{res.notes}"
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
