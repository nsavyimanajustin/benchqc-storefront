import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/layout/Navbar';
import { HeroBanner } from './components/home/HeroBanner';
import { CatalogFilters } from './components/catalog/CatalogFilters';
import { LaptopCard } from './components/catalog/LaptopCard';
import { ProductDetailModal } from './components/modal/ProductDetailModal';
import { CertificateModal } from './components/modal/CertificateModal';
import { ReservationModal } from './components/modal/ReservationModal';
import { AdminModal } from './components/admin/AdminModal';
import { ThemeCustomizerModal } from './components/customizer/ThemeCustomizerModal';
import { Footer } from './components/layout/Footer';
import { Laptop, RotateCcw } from 'lucide-react';

const StorefrontContent: React.FC = () => {
  const {
    filteredLaptops,
    resetFilters,
    selectedLaptopForModal,
    setSelectedLaptopForModal,
    selectedLaptopForCert,
    setSelectedLaptopForCert,
    selectedLaptopForReservation,
    setSelectedLaptopForReservation,
    storeConfig,
  } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* 1. Header & Navigation */}
      <Navbar />

      {/* 2. Hero Trust Banner */}
      <HeroBanner />

      {/* 3. Main Catalog Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Advanced Filters */}
        <CatalogFilters />

        {/* Laptop Catalog Grid */}
        {filteredLaptops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLaptops.map(laptop => (
              <LaptopCard key={laptop.id} laptop={laptop} />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 px-4 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center mx-auto text-slate-400">
              <Laptop className="w-8 h-8 text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">No Certified Units Found</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                No laptops match your current filter combination. Try clearing some criteria or searching for another term.
              </p>
            </div>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-glow-primary"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </main>

      {/* 4. Footer */}
      <Footer />

      {/* 5. Modals Container */}
      <ProductDetailModal
        laptop={selectedLaptopForModal}
        onClose={() => setSelectedLaptopForModal(null)}
      />

      <CertificateModal
        laptop={selectedLaptopForCert}
        onClose={() => setSelectedLaptopForCert(null)}
      />

      <ReservationModal
        laptop={selectedLaptopForReservation}
        onClose={() => setSelectedLaptopForReservation(null)}
      />

      <AdminModal />

      <ThemeCustomizerModal />
    </div>
  );
};

export function App() {
  return (
    <StoreProvider>
      <StorefrontContent />
    </StoreProvider>
  );
}

export default App;
