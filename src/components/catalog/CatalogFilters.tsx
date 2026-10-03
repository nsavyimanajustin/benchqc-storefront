import React from 'react';
import {
  RotateCcw,
  Cpu,
  Layers,
  Monitor,
  Award,
  Tag,
  ArrowUpDown,
  Filter,
  X,
  Laptop,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { QualityGrade } from '../../types';

export const CatalogFilters: React.FC = () => {
  const { filterState, setFilterState, resetFilters, filteredLaptops, laptops } = useStore();

  const handleGradeToggle = (grade: QualityGrade) => {
    setFilterState(prev => {
      const exists = prev.grades.includes(grade);
      if (exists) {
        return { ...prev, grades: prev.grades.filter(g => g !== grade) };
      } else {
        return { ...prev, grades: [...prev.grades, grade] };
      }
    });
  };

  // Determine active filter count for badge
  const activeFiltersCount =
    (filterState.searchQuery ? 1 : 0) +
    (filterState.minPrice > 0 || filterState.maxPrice < 300000 ? 1 : 0) +
    (filterState.cpuArchitecture !== 'all' ? 1 : 0) +
    (filterState.minRamGb > 0 ? 1 : 0) +
    (filterState.gpuType !== 'all' ? 1 : 0) +
    filterState.grades.length +
    (filterState.intendedUse !== 'all' ? 1 : 0) +
    (filterState.brand !== 'all' ? 1 : 0);

  const intendedUseOptions = [
    'Software Dev',
    'Architecture/CAD',
    'Gaming',
    'Student/Budget',
    'Video Editing',
    'Business',
    'Office',
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl mb-6">
      {/* Top Filter Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <Filter className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-white">Hardware Catalog Filters</h2>
              {activeFiltersCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-slate-950 font-mono">
                  {activeFiltersCount} ACTIVE
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">
              Showing <strong className="text-emerald-400 font-mono">{filteredLaptops.length}</strong> of{' '}
              <span className="text-slate-300 font-mono">{laptops.length}</span> BenchQC certified laptops
            </p>
          </div>
        </div>

        {/* Sort & Reset Actions */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-slate-400" />
            <select
              value={filterState.sortBy}
              onChange={e => setFilterState(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-emerald-500"
            >
              <option value="featured">Featured / Top Score</option>
              <option value="price-asc">Price: Low to High (DZD)</option>
              <option value="price-desc">Price: High to Low (DZD)</option>
              <option value="score-desc">BenchQC Score: Highest First</option>
              <option value="battery-desc">Battery Health: Highest First</option>
              <option value="newest">Recently Certified</option>
            </select>
          </div>

          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Controls Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        {/* 1. Quality Grade Checkboxes */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>Certified Grade</span>
          </label>
          <div className="flex items-center gap-2">
            {(['Grade A+', 'Grade A', 'Grade B'] as QualityGrade[]).map(grade => {
              const selected = filterState.grades.includes(grade);
              return (
                <button
                  key={grade}
                  onClick={() => handleGradeToggle(grade)}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                    selected
                      ? grade === 'Grade A+'
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                        : grade === 'Grade A'
                        ? 'bg-teal-500 text-slate-950 border-teal-400 font-bold'
                        : 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {grade}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. CPU Architecture */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Processor Family</span>
          </label>
          <select
            value={filterState.cpuArchitecture}
            onChange={e => setFilterState(prev => ({ ...prev, cpuArchitecture: e.target.value }))}
            className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Processor Architectures</option>
            <option value="Intel Core">Intel Core (i5 / i7 / vPro)</option>
            <option value="AMD Ryzen">AMD Ryzen (Ryzen 5 / 7)</option>
            <option value="Apple Silicon">Apple Silicon (M1 / M2 / M3)</option>
          </select>
        </div>

        {/* 3. RAM & GPU */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span>Min RAM</span>
            </label>
            <select
              value={filterState.minRamGb}
              onChange={e => setFilterState(prev => ({ ...prev, minRamGb: Number(e.target.value) }))}
              className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-emerald-500"
            >
              <option value={0}>Any RAM</option>
              <option value={8}>8GB+</option>
              <option value={16}>16GB+</option>
              <option value={32}>32GB+</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
              <Monitor className="w-3.5 h-3.5 text-amber-400" />
              <span>GPU Type</span>
            </label>
            <select
              value={filterState.gpuType}
              onChange={e => setFilterState(prev => ({ ...prev, gpuType: e.target.value }))}
              className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Graphics</option>
              <option value="dedicated">Dedicated (RTX/GTX)</option>
              <option value="integrated">Integrated (Iris/M1)</option>
            </select>
          </div>
        </div>

        {/* 4. Brand & Use Category */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
              <Laptop className="w-3.5 h-3.5 text-emerald-400" />
              <span>Brand</span>
            </label>
            <select
              value={filterState.brand}
              onChange={e => setFilterState(prev => ({ ...prev, brand: e.target.value }))}
              className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Brands</option>
              <option value="Lenovo">Lenovo</option>
              <option value="Dell">Dell</option>
              <option value="HP">HP</option>
              <option value="Apple">Apple</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-teal-400" />
              <span>Workload</span>
            </label>
            <select
              value={filterState.intendedUse}
              onChange={e => setFilterState(prev => ({ ...prev, intendedUse: e.target.value }))}
              className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Workloads</option>
              {intendedUseOptions.map(u => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Price Slider Bar */}
      <div className="mt-4 pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-80 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Budget Limit:</span>
            <span className="font-mono text-emerald-400 font-bold">
              {filterState.maxPrice >= 300000 ? 'Any Price (Max 300k DZD)' : `${filterState.maxPrice.toLocaleString()} DZD`}
            </span>
          </div>
          <input
            type="range"
            min="40000"
            max="300000"
            step="5000"
            value={filterState.maxPrice}
            onChange={e => setFilterState(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
            className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-950 rounded-lg"
          />
        </div>

        {/* Active Filter Chips */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {filterState.searchQuery && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] bg-slate-800 text-slate-300 border border-slate-700">
                "{filterState.searchQuery}"
                <button onClick={() => setFilterState(p => ({ ...p, searchQuery: '' }))} className="hover:text-red-400">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filterState.grades.map(g => (
              <span
                key={g}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold"
              >
                {g}
                <button onClick={() => handleGradeToggle(g)} className="hover:text-red-400">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {filterState.cpuArchitecture !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {filterState.cpuArchitecture}
                <button onClick={() => setFilterState(p => ({ ...p, cpuArchitecture: 'all' }))} className="hover:text-red-400">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filterState.minRamGb > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {filterState.minRamGb}GB+ RAM
                <button onClick={() => setFilterState(p => ({ ...p, minRamGb: 0 }))} className="hover:text-red-400">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filterState.intendedUse !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {filterState.intendedUse}
                <button onClick={() => setFilterState(p => ({ ...p, intendedUse: 'all' }))} className="hover:text-red-400">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
