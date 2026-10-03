import React, { useState } from 'react';
import {
  PackagePlus,
  Layers,
  DollarSign,
  ShieldCheck,
  Search,
  Trash2,
  CheckCircle2,
  FileJson,
  Upload,
  Share2,
  RotateCcw,
  Tag,
  Image as ImageIcon,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { RetailerLaptop, QualityGrade, LaptopStatus, HardwareSpecs, BenchQCAuditScorecard } from '../../types';
import { SAMPLE_BENCHQC_AUDIT_JSON } from '../../data/defaultStoreConfig';

export const InventoryStudio: React.FC = () => {
  const {
    laptops,
    addLaptop,
    updateLaptop,
    deleteLaptop,
    resetInventoryToDefault,
    storeConfig,
    formatPrice,
    reservations,
  } = useStore();

  const [searchFilter, setSearchFilter] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [auditJsonInput, setAuditJsonInput] = useState('');
  const [copiedShareId, setCopiedShareId] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('Lenovo');
  const [model, setModel] = useState('');
  const [sku, setSku] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [category, setCategory] = useState<RetailerLaptop['category']>('Business');
  const [grade, setGrade] = useState<QualityGrade>('Grade A+');
  const [priceDzd, setPriceDzd] = useState<number>(85000);
  const [conditionNotes, setConditionNotes] = useState('Laboratory bench tested. 100% functional.');
  const [intendedTags, setIntendedTags] = useState('Software Dev, Business');
  
  // Images
  const [imageUrls, setImageUrls] = useState<string[]>([
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
  ]);
  const [customImageUrl, setCustomImageUrl] = useState('');

  // Specs
  const [cpuModel, setCpuModel] = useState('Intel Core i7-1260P');
  const [ramGb, setRamGb] = useState(16);
  const [storageGb, setStorageGb] = useState(512);
  const [gpuModel, setGpuModel] = useState('Intel Iris Xe');
  const [displayRes, setDisplayRes] = useState('1920x1200 FHD+ IPS');
  const [batteryHealthPct, setBatteryHealthPct] = useState(94);
  const [batteryCycles, setBatteryCycles] = useState(62);
  const [overallScore, setOverallScore] = useState(95);

  // Summary metrics
  const totalUnits = laptops.length;
  const totalValueDzd = laptops.reduce((acc, l) => acc + l.priceDzd, 0);
  const reservedUnits = laptops.filter(l => l.status === 'reserved').length;
  const avgQcScore = Math.round(
    laptops.reduce((acc, l) => acc + l.audit.overallScore, 0) / (laptops.length || 1)
  );

  // Quick Preset Handlers
  const applyPreset = (presetName: string) => {
    switch (presetName) {
      case 'ThinkPad':
        setTitle('Lenovo ThinkPad X1 Carbon Gen 10');
        setBrand('Lenovo');
        setModel('ThinkPad X1 Carbon Gen 10');
        setSku('LNV-X1C10-I7-16-512');
        setSerialNumber(`X1C-${Math.floor(100000 + Math.random() * 900000)}`);
        setCategory('Business');
        setGrade('Grade A+');
        setPriceDzd(135000);
        setCpuModel('Intel Core i7-1260P (12 Cores, 16 Threads)');
        setRamGb(16);
        setStorageGb(512);
        setGpuModel('Intel Iris Xe Graphics');
        setDisplayRes('14.0" 2.8K OLED (2880x1800) 90Hz');
        setBatteryHealthPct(95);
        setBatteryCycles(48);
        setOverallScore(96);
        setIntendedTags('Software Dev, Business, Executive');
        break;
      case 'MacBook':
        setTitle('Apple MacBook Air 13" M2 Midnight');
        setBrand('Apple');
        setModel('MacBook Air M2 2022');
        setSku('APPL-MBA-M2-8-256');
        setSerialNumber(`C02${Math.floor(1000000 + Math.random() * 9000000)}`);
        setCategory('Ultrabook');
        setGrade('Grade A+');
        setPriceDzd(145000);
        setCpuModel('Apple M2 (8-Core CPU, 8-Core GPU)');
        setRamGb(8);
        setStorageGb(256);
        setGpuModel('Apple 8-Core Integrated GPU');
        setDisplayRes('13.6" Liquid Retina 500 nits');
        setBatteryHealthPct(97);
        setBatteryCycles(32);
        setOverallScore(98);
        setIntendedTags('Student/Budget, Software Dev, Creative');
        break;
      case 'Legion':
        setTitle('Lenovo Legion 5 15ACH6 (RTX 3060 130W)');
        setBrand('Lenovo');
        setModel('Legion 5 15ACH6 Phantom Blue');
        setSku('LNV-LEG5-R7-16-RTX3060');
        setSerialNumber(`LEG-${Math.floor(100000 + Math.random() * 900000)}`);
        setCategory('Gaming');
        setGrade('Grade A');
        setPriceDzd(128000);
        setCpuModel('AMD Ryzen 7 5800H (8 Cores, 16 Threads)');
        setRamGb(16);
        setStorageGb(512);
        setGpuModel('NVIDIA GeForce RTX 3060 6GB GDDR6 (130W)');
        setDisplayRes('15.6" FHD IPS 165Hz 100% sRGB');
        setBatteryHealthPct(89);
        setBatteryCycles(120);
        setOverallScore(92);
        setIntendedTags('Gaming, 3D Rendering, Video Editing');
        break;
      case 'Dell XPS':
        setTitle('Dell XPS 13 Plus 9320 (Touch 3.5K)');
        setBrand('Dell');
        setModel('XPS 13 Plus 9320 Graphite');
        setSku('DELL-XPS13P-I7-16');
        setSerialNumber(`8MK${Math.floor(1000 + Math.random() * 9000)}`);
        setCategory('Workstation');
        setGrade('Grade A+');
        setPriceDzd(175000);
        setCpuModel('Intel Core i7-1280P (14 Cores, 20 Threads)');
        setRamGb(16);
        setStorageGb(1000);
        setGpuModel('Intel Iris Xe Graphics');
        setDisplayRes('13.4" 3.5K OLED Touch');
        setBatteryHealthPct(93);
        setBatteryCycles(65);
        setOverallScore(95);
        setIntendedTags('Software Dev, Executive, Creative');
        break;
      default:
        break;
    }
  };

  // Audit JSON ingestion parser
  const handleIngestAuditJson = () => {
    try {
      const data = JSON.parse(auditJsonInput);
      if (data.overallScore) setOverallScore(Number(data.overallScore));
      if (data.certifiedGrade) setGrade(data.certifiedGrade);
      if (data.batteryHealthScore) setBatteryHealthPct(Number(data.batteryHealthScore));
      if (data.hardwareReport) {
        if (data.hardwareReport.brand) setBrand(data.hardwareReport.brand);
        if (data.hardwareReport.model) {
          setModel(data.hardwareReport.model);
          setTitle(`${data.hardwareReport.brand} ${data.hardwareReport.model}`);
        }
        if (data.hardwareReport.cpu) setCpuModel(data.hardwareReport.cpu);
        if (data.hardwareReport.ramGb) setRamGb(Number(data.hardwareReport.ramGb));
        if (data.hardwareReport.storageGb) setStorageGb(Number(data.hardwareReport.storageGb));
        if (data.hardwareReport.display) setDisplayRes(data.hardwareReport.display);
        if (data.hardwareReport.batteryHealthPct) setBatteryHealthPct(Number(data.hardwareReport.batteryHealthPct));
        if (data.hardwareReport.notes) setConditionNotes(data.hardwareReport.notes);
      }
      alert('BenchQC Audit JSON parsed successfully! Form fields updated.');
    } catch (e) {
      alert('Failed to parse JSON. Please verify the format.');
    }
  };

  // Add Photo URL
  const handleAddImageUrl = () => {
    if (customImageUrl.trim()) {
      setImageUrls(prev => [...prev, customImageUrl.trim()]);
      setCustomImageUrl('');
    }
  };

  // Handle Photo File Upload (Simulated data URI)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImageUrls(prev => [reader.result as string, ...prev]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Create new Laptop Submit
  const handleCreateLaptop = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `BQC-LPT-${Math.floor(100 + Math.random() * 900)}`;

    const newSpecs: HardwareSpecs = {
      cpu: {
        model: cpuModel,
        cores: 8,
        threads: 16,
        baseClockGhz: 2.4,
        boostClockGhz: 4.6,
      },
      ram: {
        sizeGb: ramGb,
        type: 'DDR4 / DDR5',
        speedMhz: 3200,
        upgradeable: true,
      },
      storage: {
        sizeGb: storageGb,
        type: 'M.2 NVMe SSD',
        smartHealthPct: 98,
        tbwTb: 18.5,
        readSpeedMbps: 3500,
      },
      gpu: {
        model: gpuModel,
        dedicatedVramGb: gpuModel.includes('RTX') ? 6 : 0,
        isDedicated: gpuModel.includes('RTX') || gpuModel.includes('GTX'),
      },
      display: {
        sizeInches: 14.0,
        resolution: displayRes,
        refreshRateHz: 60,
        panelType: 'IPS Anti-Glare',
        nits: 350,
      },
      battery: {
        healthPct: batteryHealthPct,
        cycleCount: batteryCycles,
        originalCapacityWh: 54,
        currentCapacityWh: Math.round((54 * batteryHealthPct) / 100),
      },
      weightKg: 1.4,
      os: 'Windows 11 Pro 64-bit Genuine',
      ports: ['2x Thunderbolt / USB-C', '2x USB 3.2 Gen 1', '1x HDMI', '1x Audio Jack'],
    };

    const newAudit: BenchQCAuditScorecard = {
      auditId: `BQC-AUD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      auditDate: new Date().toISOString().split('T')[0],
      certifiedGrade: grade,
      overallScore: overallScore,
      batteryHealthScore: batteryHealthPct,
      displayIntegrityScore: 97,
      keyboardTrackpadScore: 96,
      storageSmartScore: 98,
      thermalStabilityScore: 92,
      peakStressTempC: 74,
      throttlingDetected: false,
      deadPixelCount: 0,
      hingeFlexPass: true,
      inspectorName: 'Amine K. (BenchQC Senior Hardware Auditor)',
      officialVerificationUrl: `https://benchqc.com/verify/audit`,
    };

    const newLaptop: RetailerLaptop = {
      id: newId,
      title: title || `${brand} ${model}`,
      brand,
      model: model || title,
      serialNumber: serialNumber || `SN-${Math.floor(100000 + Math.random() * 900000)}`,
      sku: sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      category,
      intendedUseTags: intendedTags.split(',').map(t => t.trim()),
      conditionNotes,
      grade,
      specs: newSpecs,
      audit: newAudit,
      priceDzd,
      priceUsd: Math.round(priceDzd / storeConfig.exchangeRateDzdUsd),
      images: imageUrls.length > 0 ? imageUrls : ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80'],
      status: 'available',
      featured: false,
      dateAdded: new Date().toISOString().split('T')[0],
    };

    addLaptop(newLaptop);
    setShowAddForm(false);
    alert(`Successfully added ${newLaptop.title} to certified inventory!`);
  };

  // WhatsApp Marketing Broadcast copy
  const handleCopyMarketingPost = (laptop: RetailerLaptop) => {
    const text = `🔥 [${storeConfig.name}] BENCHQC CERTIFIED ARRIVAL 🔥\n\n💻 ${laptop.title} (${laptop.grade} Certified · Score ${laptop.audit.overallScore}/100)\n⚡ CPU: ${laptop.specs.cpu.model}\n💾 RAM: ${laptop.specs.ram.sizeGb}GB | Storage: ${laptop.specs.storage.sizeGb}GB NVMe SSD\n🔋 Battery Health: ${laptop.specs.battery.healthPct}% (${laptop.specs.battery.cycleCount} Cycles)\n🛡️ ${storeConfig.warrantyDays}-Day Hardware Warranty\n\n💰 Price: ${laptop.priceDzd.toLocaleString()} DZD\n📍 In-Store Bench Test: ${storeConfig.address}\n📲 WhatsApp to reserve: https://wa.me/${storeConfig.whatsapp}`;
    navigator.clipboard.writeText(text);
    setCopiedShareId(laptop.id);
    setTimeout(() => setCopiedShareId(null), 2500);
  };

  // Filtered inventory for management table
  const inventoryList = laptops.filter(l => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      l.title.toLowerCase().includes(q) ||
      l.sku.toLowerCase().includes(q) ||
      l.serialNumber.toLowerCase().includes(q) ||
      l.brand.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      
      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Total Units</span>
            <Layers className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{totalUnits} Units</div>
          <p className="text-[11px] text-emerald-400 mt-1">{totalUnits - reservedUnits} Active / {reservedUnits} Reserved</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Total Inventory Value</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            {totalValueDzd.toLocaleString()} <span className="text-xs text-slate-400">DZD</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">~${Math.round(totalValueDzd / storeConfig.exchangeRateDzdUsd).toLocaleString()} USD</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>24H Hold Reservations</span>
            <Tag className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-300 font-mono">
            {reservations.length} Holds
          </div>
          <p className="text-[11px] text-amber-400/90 mt-1">Physical walk-in queue</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Avg Lab QC Score</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {avgQcScore}<span className="text-xs text-slate-400 font-normal">/100</span>
          </div>
          <p className="text-[11px] text-emerald-400 mt-1">High Standard Grade A Quality</p>
        </div>
      </div>

      {/* Action Bar: Quick Add Button & Search */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-glow-primary"
          >
            <PackagePlus className="w-4 h-4" />
            <span>{showAddForm ? 'Close Studio Form' : 'Quick-Add Certified Laptop'}</span>
          </button>

          <button
            onClick={resetInventoryToDefault}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold transition-colors"
            title="Reload realistic 6 default certified models"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Default Demo Stock</span>
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchFilter}
            onChange={e => setSearchFilter(e.target.value)}
            placeholder="Filter inventory table..."
            className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Accordion Quick-Add Laptop Studio Form */}
      {showAddForm && (
        <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 shadow-2xl space-y-6 animate-in fade-in">
          
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <PackagePlus className="w-5 h-5 text-emerald-400" />
                <span>Quick-Add Laptop Studio & Audit Ingestion</span>
              </h3>
              <p className="text-xs text-slate-400">
                Populate from 1-click model presets or ingest BenchQC JSON audit payloads.
              </p>
            </div>

            {/* Presets row */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] text-slate-400 font-semibold mr-1">Presets:</span>
              {['ThinkPad', 'MacBook', 'Legion', 'Dell XPS'].map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => applyPreset(p)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Optional JSON Ingestion Payload box */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <FileJson className="w-4 h-4 text-amber-400" />
                <span>Ingest BenchQC Audit Report (`benchqc_audit.json` / Diagnostic Payload)</span>
              </label>
              <button
                type="button"
                onClick={() => setAuditJsonInput(JSON.stringify(SAMPLE_BENCHQC_AUDIT_JSON, null, 2))}
                className="text-[11px] text-emerald-400 hover:underline font-semibold"
              >
                Paste Sample Audit JSON
              </button>
            </div>
            <div className="flex gap-2">
              <textarea
                rows={2}
                value={auditJsonInput}
                onChange={e => setAuditJsonInput(e.target.value)}
                placeholder='Paste audit JSON e.g. {"auditId": "BQC-999", "overallScore": 97, "hardwareReport": {...}}'
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs font-mono text-slate-300 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={handleIngestAuditJson}
                className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl self-center shrink-0"
              >
                Ingest
              </button>
            </div>
          </div>

          {/* Main Add Laptop Form */}
          <form onSubmit={handleCreateLaptop} className="space-y-4">
            
            {/* Identity & Pricing */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-semibold mb-1">Laptop Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Lenovo ThinkPad T14 Gen 3 (i7-1265U / 16GB)"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Price in DZD (Auto USD)
                </label>
                <input
                  type="number"
                  required
                  value={priceDzd}
                  onChange={e => setPriceDzd(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-emerald-400 font-mono font-bold focus:outline-none focus:border-emerald-500"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  ~${Math.round(priceDzd / storeConfig.exchangeRateDzdUsd)} USD (Rate: {storeConfig.exchangeRateDzdUsd})
                </span>
              </div>
            </div>

            {/* Brand, SKU, Serial, Category, Grade */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Brand</label>
                <select
                  value={brand}
                  onChange={e => setBrand(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Lenovo">Lenovo</option>
                  <option value="Dell">Dell</option>
                  <option value="HP">HP</option>
                  <option value="Apple">Apple</option>
                  <option value="Asus">Asus</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">SKU / Code</label>
                <input
                  type="text"
                  value={sku}
                  onChange={e => setSku(e.target.value)}
                  placeholder="TP-T14-01"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-slate-200 font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Serial Number</label>
                <input
                  type="text"
                  value={serialNumber}
                  onChange={e => setSerialNumber(e.target.value)}
                  placeholder="PF-8921"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-slate-200 font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Business">Business</option>
                  <option value="Workstation">Workstation</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Ultrabook">Ultrabook</option>
                  <option value="Budget">Budget</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Quality Grade</label>
                <select
                  value={grade}
                  onChange={e => setGrade(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-emerald-400 font-bold focus:outline-none focus:border-emerald-500"
                >
                  <option value="Grade A+">Grade A+</option>
                  <option value="Grade A">Grade A</option>
                  <option value="Grade B">Grade B</option>
                </select>
              </div>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">CPU Model</label>
                <input
                  type="text"
                  value={cpuModel}
                  onChange={e => setCpuModel(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">RAM (GB)</label>
                <input
                  type="number"
                  value={ramGb}
                  onChange={e => setRamGb(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Storage (GB)</label>
                <input
                  type="number"
                  value={storageGb}
                  onChange={e => setStorageGb(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Battery Health (%)</label>
                <input
                  type="number"
                  value={batteryHealthPct}
                  onChange={e => setBatteryHealthPct(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-emerald-400 font-mono font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Photo Uploader / Presets */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-emerald-400" />
                <span>Multi-Angle Photos & Smartphone Uploader</span>
              </label>

              <div className="flex flex-wrap items-center gap-3">
                <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700">
                  <Upload className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Upload Local File</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>

                <div className="flex-1 flex gap-1 min-w-[200px]">
                  <input
                    type="url"
                    value={customImageUrl}
                    onChange={e => setCustomImageUrl(e.target.value)}
                    placeholder="Or paste Unsplash / direct photo URL..."
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-slate-200"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="px-2.5 py-1 bg-slate-800 text-slate-200 text-xs rounded-lg font-semibold"
                  >
                    Add URL
                  </button>
                </div>
              </div>

              {/* Thumbnails preview */}
              <div className="flex items-center gap-2 overflow-x-auto pt-2">
                {imageUrls.map((url, idx) => (
                  <div key={idx} className="relative w-16 h-12 rounded-lg overflow-hidden border border-slate-700 shrink-0">
                    <img src={url} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setImageUrls(imageUrls.filter((_, i) => i !== idx))}
                      className="absolute top-0 right-0 bg-red-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-bl"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Condition Notes & Tags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Inspector Notes</label>
                <input
                  type="text"
                  value={conditionNotes}
                  onChange={e => setConditionNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Use Tags (Comma Separated)</label>
                <input
                  type="text"
                  value={intendedTags}
                  onChange={e => setIntendedTags(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-glow-primary flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Publish Certified Laptop to Storefront</span>
            </button>
          </form>

        </div>
      )}

      {/* Inventory Stock Management Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Storefront Active Stock Management</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {inventoryList.length} items listed
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Hardware Unit</th>
                <th className="px-3 py-3">Grade & Score</th>
                <th className="px-3 py-3">Key Specs</th>
                <th className="px-3 py-3">Price (DZD)</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {inventoryList.map(laptop => (
                <tr key={laptop.id} className="hover:bg-slate-800/40 transition-colors">
                  {/* Photo & Title */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={laptop.images[0]}
                        alt={laptop.title}
                        className="w-12 h-9 rounded-lg object-cover bg-slate-950 border border-slate-700 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-white max-w-[200px] truncate">{laptop.title}</div>
                        <div className="text-[10px] font-mono text-slate-400">
                          {laptop.sku} · {laptop.serialNumber}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Grade & Score */}
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {laptop.grade}
                      </span>
                      <span className="font-mono font-bold text-slate-200">
                        {laptop.audit.overallScore}/100
                      </span>
                    </div>
                  </td>

                  {/* Specs */}
                  <td className="px-3 py-3 text-slate-300">
                    <div>{laptop.specs.cpu.model.split('(')[0]}</div>
                    <div className="text-[10px] text-slate-400">
                      {laptop.specs.ram.sizeGb}GB RAM · {laptop.specs.storage.sizeGb}GB SSD · {laptop.specs.battery.healthPct}% Batt
                    </div>
                  </td>

                  {/* Inline Price edit */}
                  <td className="px-3 py-3">
                    <input
                      type="number"
                      value={laptop.priceDzd}
                      onChange={e => updateLaptop(laptop.id, { priceDzd: Number(e.target.value) })}
                      className="w-24 bg-slate-950 border border-slate-700 rounded px-2 py-1 font-mono font-bold text-emerald-400 text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </td>

                  {/* Status Toggle */}
                  <td className="px-3 py-3">
                    <select
                      value={laptop.status}
                      onChange={e => updateLaptop(laptop.id, { status: e.target.value as LaptopStatus })}
                      className={`px-2 py-1 rounded text-xs font-semibold focus:outline-none ${
                        laptop.status === 'available'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : laptop.status === 'reserved'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-red-500/20 text-red-300 border border-red-500/30'
                      }`}
                    >
                      <option value="available" className="bg-slate-900 text-slate-200">Available</option>
                      <option value="reserved" className="bg-slate-900 text-slate-200">24h Reserved</option>
                      <option value="sold" className="bg-slate-900 text-slate-200">Sold</option>
                    </select>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleCopyMarketingPost(laptop)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                        title="Copy WhatsApp Marketing Broadcast Text"
                      >
                        {copiedShareId === laptop.id ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Share2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        onClick={() => deleteLaptop(laptop.id)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-900/40 text-slate-400 hover:text-red-400 border border-slate-700 transition-colors"
                        title="Delete unit from catalog"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
