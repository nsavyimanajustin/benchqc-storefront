import React from 'react';
import {
  ShieldCheck,
  Award,
  Printer,
  X,
  BatteryCharging,
  HardDrive,
  Monitor,
  Flame,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { RetailerLaptop } from '../../types';
import { useStore } from '../../context/StoreContext';

interface CertificateModalProps {
  laptop: RetailerLaptop | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ laptop, onClose }) => {
  const { storeConfig } = useStore();

  if (!laptop) return null;

  const { audit, specs } = laptop;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95">
        
        {/* Modal Action Header (No-Print) */}
        <div className="no-print flex items-center justify-between px-5 py-3.5 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>BenchQC Official Hardware Certificate Preview</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-glow-primary"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Sheet */}
        <div id="printable-certificate" className="p-6 sm:p-10 bg-[#0B0F17] text-slate-100 relative">
          
          {/* Decorative Watermark & Border */}
          <div className="border-2 border-emerald-500/40 rounded-xl p-6 sm:p-8 relative bg-gradient-to-b from-slate-900/90 to-slate-950/90">
            
            {/* Top Lab Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center">
                  <ShieldCheck className="w-7 h-7 text-emerald-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-black tracking-tight text-white font-mono">
                      BENCH<span className="text-emerald-400">QC</span> LABS
                    </h2>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      OFFICIAL CERTIFICATE
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">Independent Second-Hand Hardware Verification Standard</p>
                </div>
              </div>

              {/* Certificate Number & Date */}
              <div className="text-right text-xs">
                <div className="font-mono text-emerald-400 font-bold text-sm">
                  CERT: {audit.auditId}
                </div>
                <div className="text-slate-400 text-[11px] mt-0.5">
                  Inspection Date: <strong className="text-slate-200">{audit.auditDate}</strong>
                </div>
                <div className="text-slate-400 text-[11px]">
                  Partner Lab: <strong className="text-slate-200">{storeConfig.name}</strong>
                </div>
              </div>
            </div>

            {/* Device Identity Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-5 border-b border-slate-800">
              <div className="sm:col-span-2">
                <div className="text-xs text-slate-400">Hardware Unit Under Test</div>
                <div className="text-lg font-bold text-white mt-0.5">{laptop.title}</div>
                <div className="text-xs text-slate-400 font-mono mt-1">
                  Serial: <span className="text-slate-200">{laptop.serialNumber}</span> · SKU: <span className="text-slate-200">{laptop.sku}</span>
                </div>
              </div>

              {/* Overall Certified Grade Badge */}
              <div className="flex flex-col items-center sm:items-end justify-center">
                <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-center">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Certified Quality</div>
                  <div className="text-2xl font-black text-emerald-400 font-mono leading-none my-1">
                    {audit.certifiedGrade}
                  </div>
                  <div className="text-xs font-mono font-bold text-white">
                    {audit.overallScore} / 100 PTS
                  </div>
                </div>
              </div>
            </div>

            {/* 5-Dimension Audit Scorecard Breakdown */}
            <div className="py-5 border-b border-slate-800">
              <div className="text-xs font-bold text-slate-300 mb-3 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>5-Dimension Stress & Diagnostics Telemetry</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. Battery */}
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <BatteryCharging className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="font-semibold text-white">Battery Retention & Cycles</div>
                      <div className="text-[11px] text-slate-400">
                        {specs.battery.healthPct}% Health · {specs.battery.cycleCount} Cycles ({specs.battery.currentCapacityWh} / {specs.battery.originalCapacityWh} Wh)
                      </div>
                    </div>
                  </div>
                  <div className="font-mono font-bold text-emerald-400 text-sm">
                    {audit.batteryHealthScore}%
                  </div>
                </div>

                {/* 2. Display Matrix */}
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-cyan-400" />
                    <div>
                      <div className="font-semibold text-white">Display & Hinge Integrity</div>
                      <div className="text-[11px] text-slate-400">
                        {audit.deadPixelCount} Dead Pixels · Hinge Flex Pass ({specs.display.panelType})
                      </div>
                    </div>
                  </div>
                  <div className="font-mono font-bold text-cyan-400 text-sm">
                    {audit.displayIntegrityScore}%
                  </div>
                </div>

                {/* 3. Storage SMART */}
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-purple-400" />
                    <div>
                      <div className="font-semibold text-white">NVMe SSD SMART Health</div>
                      <div className="text-[11px] text-slate-400">
                        {specs.storage.smartHealthPct}% Life · {specs.storage.tbwTb || 15} TBW ({specs.storage.type.split(' ')[0]})
                      </div>
                    </div>
                  </div>
                  <div className="font-mono font-bold text-purple-400 text-sm">
                    {audit.storageSmartScore}%
                  </div>
                </div>

                {/* 4. Thermal Stability */}
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="font-semibold text-white">Thermal & Sustained Load</div>
                      <div className="text-[11px] text-slate-400">
                        Peak {audit.peakStressTempC}°C · Throttle: {audit.throttlingDetected ? 'Detected' : 'None (Passed)'}
                      </div>
                    </div>
                  </div>
                  <div className="font-mono font-bold text-amber-400 text-sm">
                    {audit.thermalStabilityScore}%
                  </div>
                </div>
              </div>
            </div>

            {/* Inspector Sign-off & Verification Code */}
            <div className="pt-5 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Certified by: <strong className="text-white">{audit.inspectorName}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Tamper-Proof Hash: <code className="font-mono text-slate-300">{laptop.id}-QC-{audit.overallScore}X9</code></span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Includes {storeConfig.warrantyDays}-day bench hardware guarantee issued by {storeConfig.name}.
                </div>
              </div>

              {/* QR Code Simulation */}
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="w-14 h-14 bg-white p-1 rounded-lg flex flex-col justify-between">
                  <div className="grid grid-cols-3 gap-0.5 w-full h-full">
                    <div className="bg-black rounded-sm" />
                    <div className="bg-black rounded-sm" />
                    <div className="bg-black rounded-sm" />
                    <div className="bg-black rounded-sm" />
                    <div className="bg-emerald-600 rounded-sm" />
                    <div className="bg-black rounded-sm" />
                    <div className="bg-black rounded-sm" />
                    <div className="bg-black rounded-sm" />
                    <div className="bg-black rounded-sm" />
                  </div>
                </div>
                <div className="text-left text-[10px]">
                  <div className="font-bold text-slate-200">Scan to Verify</div>
                  <div className="text-slate-400 font-mono text-[9px] mt-0.5">benchqc.com/verify</div>
                  <div className="text-emerald-400 font-bold text-[9px] mt-0.5">AUTHENTIC SEAL</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
