import React, { useState } from 'react';
import {
  CalendarCheck,
  ShieldCheck,
  X,
  MapPin,
  Clock,
  CheckCircle2,
  Copy,
  MessageCircle,
} from 'lucide-react';
import { RetailerLaptop, ReservationInquiry } from '../../types';
import { useStore } from '../../context/StoreContext';

interface ReservationModalProps {
  laptop: RetailerLaptop | null;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ laptop, onClose }) => {
  const { storeConfig, createReservation, trackWhatsAppClick } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerWilaya, setCustomerWilaya] = useState(storeConfig.wilaya);
  const [inspectionSlot, setInspectionSlot] = useState('Today 16:30 - 18:00');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdReservation, setCreatedReservation] = useState<ReservationInquiry | null>(null);
  const [copied, setCopied] = useState(false);

  if (!laptop) return null;

  const algerianWilayas = [
    'Wilaya 16 - Alger',
    'Wilaya 09 - Blida',
    'Wilaya 31 - Oran',
    'Wilaya 25 - Constantine',
    'Wilaya 15 - Tizi Ouzou',
    'Wilaya 19 - Sétif',
    'Wilaya 23 - Annaba',
    'Wilaya 35 - Boumerdès',
    'Wilaya 06 - Béjaïa',
    'Wilaya 13 - Tlemcen',
    'Other Wilaya (Courier Dispatch)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    const res = createReservation({
      laptopId: laptop.id,
      laptopTitle: laptop.title,
      laptopPriceDzd: laptop.priceDzd,
      customerName,
      customerPhone,
      customerWilaya,
      inspectionSlot,
      notes,
    });

    setCreatedReservation(res);
    setIsSubmitted(true);
  };

  const handleCopyTicket = () => {
    if (createdReservation) {
      navigator.clipboard.writeText(createdReservation.ticketCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsAppSendTicket = () => {
    if (!createdReservation) return;
    trackWhatsAppClick(laptop.id, laptop.title);
    const text = encodeURIComponent(
      `Hello ${storeConfig.name}, I have just booked a 24H Free Bench Inspection Hold for "${laptop.title}".\n\nTicket Code: ${createdReservation.ticketCode}\nCustomer: ${createdReservation.customerName} (${createdReservation.customerPhone})\nPickup Slot: ${createdReservation.inspectionSlot}\nWilaya: ${createdReservation.customerWilaya}\n\nPlease confirm availability for my visit!`
    );
    window.open(`https://wa.me/${storeConfig.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CalendarCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">24h Free Bench Inspection Hold</h3>
              <p className="text-[11px] text-slate-400">Lock unit without upfront payment</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Device Summary Box */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                    {laptop.grade} · {laptop.audit.overallScore}/100 SCORE
                  </span>
                  <div className="text-sm font-bold text-white mt-0.5">{laptop.title}</div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">
                    {laptop.priceDzd.toLocaleString()} DZD ({laptop.sku})
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                    24h Hold
                  </span>
                </div>
              </div>

              {/* Form Inputs */}
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Your Full Name <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    placeholder="e.g. Sofiane Mansouri"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      Phone Number (WhatsApp) <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={e => setCustomerPhone(e.target.value)}
                      placeholder="0550 12 34 56"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      Your Wilaya <span className="text-emerald-400">*</span>
                    </label>
                    <select
                      value={customerWilaya}
                      onChange={e => setCustomerWilaya(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                    >
                      {algerianWilayas.map(w => (
                        <option key={w} value={w}>
                          {w}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Preferred In-Store Inspection Slot
                  </label>
                  <select
                    value={inspectionSlot}
                    onChange={e => setInspectionSlot(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Today 16:30 - 18:00">Today (Late Afternoon: 16:30 - 18:00)</option>
                    <option value="Tomorrow Morning (10:00 - 12:30)">Tomorrow Morning (10:00 - 12:30)</option>
                    <option value="Tomorrow Afternoon (14:30 - 17:00)">Tomorrow Afternoon (14:30 - 17:00)</option>
                    <option value="Within 24h Walk-in Flexible">Within 24 Hours (Flexible walk-in)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Specific Bench Test Request (Optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="e.g. Want to test battery drain under Linux or run Blender"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Free Guarantee Notice */}
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-slate-300 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong>No Upfront Payment Required:</strong> We will hold this exact unit ({laptop.serialNumber}) for 24 hours at <span className="text-emerald-300">{storeConfig.address}</span>. Test hands-on before purchase.
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-glow-primary flex items-center justify-center gap-2"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Confirm 24h Bench Hold Ticket</span>
              </button>
            </form>
          ) : (
            /* Success State */
            <div className="space-y-5 text-center py-2">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 mx-auto flex items-center justify-center text-emerald-400 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-lg font-black text-white">Reservation Confirmed!</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Your hardware bench test slot has been locked for 24 hours.
                </p>
              </div>

              {/* Ticket Code Callout */}
              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 max-w-sm mx-auto">
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Your Ticket Pass</div>
                <div className="text-2xl font-mono font-black text-emerald-400 my-1 tracking-wider">
                  {createdReservation?.ticketCode}
                </div>
                <button
                  onClick={handleCopyTicket}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700"
                >
                  <Copy className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Ticket Code'}</span>
                </button>
              </div>

              {/* Store Walk-In Details */}
              <div className="text-xs text-left p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5 text-slate-300">
                <div className="flex items-center gap-1.5 text-slate-200 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{storeConfig.name}</span>
                </div>
                <div className="text-[11px] text-slate-400 pl-5">
                  {storeConfig.address}
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 pl-5 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Slot: {createdReservation?.inspectionSlot}</span>
                </div>
              </div>

              {/* WhatsApp notification dispatch */}
              <div className="space-y-2">
                <button
                  onClick={handleWhatsAppSendTicket}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-glow-primary"
                >
                  <MessageCircle className="w-4 h-4 fill-white/20" />
                  <span>Send Reservation to Store WhatsApp</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  Close & Continue Browsing
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
