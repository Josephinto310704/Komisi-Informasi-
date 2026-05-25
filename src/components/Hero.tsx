import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Search, Gavel, Calendar, FileText, CheckCircle2, TrendingUp, AlertCircle } from 'lucide-react';

interface HeroProps {
  onSearchSubmit: (category: 'sidang' | 'putusan', query: string) => void;
  todaySchedulesCount: number;
  ongoingSchedulesCount: number;
  totalVerdictsCount: number;
}

export default function Hero({ onSearchSubmit, todaySchedulesCount, ongoingSchedulesCount, totalVerdictsCount }: HeroProps) {
  const [activeSearchTab, setActiveSearchTab] = useState<'sidang' | 'putusan'>('sidang');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearchSubmit(activeSearchTab, searchQuery);
  };

  const handleSuggestionClick = (query: string, tab: 'sidang' | 'putusan') => {
    setSearchQuery(query);
    setActiveSearchTab(tab);
    onSearchSubmit(tab, query);
  };

  return (
    <section className="relative overflow-hidden bg-slate-100 py-12 md:py-16 text-slate-900">
      {/* Decorative background grid patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-40"></div>

      {/* Hero Content Container */}
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        
        {/* Bento Grid layout container */}
        <div className="grid grid-cols-12 gap-4 sm:gap-6" id="hero-bento-grid">
          
          {/* Card 1: Main Welcome & Portal Title Case (Big Bento block - col-span-12 lg:col-span-7) */}
          <div className="col-span-12 lg:col-span-7 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white rounded-3xl p-5 min-[400px]:p-6 md:p-10 border border-blue-900 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[340px] sm:min-h-[380px]">
            {/* Ambient gold/blue light leak inside the card */}
            <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl"></div>
            
            <div className="space-y-4 sm:space-y-6 relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-bold tracking-wider text-amber-300 uppercase w-fit"
              >
                <Gavel className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>Transparansi &amp; Akuntabilitas Publik</span>
              </motion.div>

              <div className="space-y-3 sm:space-y-4">
                <motion.h2 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-display text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight leading-tight"
                >
                  Portal Keterbukaan Informasi <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-100 bg-clip-text text-transparent">Persidangan &amp; Putusan</span>
                </motion.h2>

                <motion.p 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-xl text-xs sm:text-sm text-slate-300 leading-relaxed font-normal"
                >
                  Pantau jadwal persidangan sengketa harian secara langsung, periksa berkas pengumuman resmi instansi, serta telusuri direktori putusan sengketa informasi dengan transparansi penuh dari Komisi Informasi Provinsi Jambi.
                </motion.p>
              </div>
            </div>

            {/* Custom bottom seal bar */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-2 items-center sm:justify-between text-center sm:text-left text-[9px] sm:text-[11px] text-slate-400 relative z-10 font-mono">
              <span className="tracking-wide">SISTEM INFORMASI PENYELESAIAN SENGKETA INFORMASI (SIPSI)</span>
              <span className="text-amber-400 font-bold shrink-0">KI PROVINSI JAMBI</span>
            </div>
          </div>

          {/* Card 2: Interactive Law Search Portal (Col-span-12 lg:col-span-5) */}
          <div className="col-span-12 lg:col-span-5 bg-white text-slate-900 rounded-3xl p-5 min-[400px]:p-6 md:p-8 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 gap-2">
                <h3 className="font-display font-bold text-base sm:text-lg text-slate-900">Mesin Pencari SIPSI</h3>
                <span className="text-[9px] sm:text-[10px] bg-blue-50 border border-blue-100 font-bold text-blue-700 px-2 py-0.5 rounded-md shrink-0">
                  Realtime Synchronized
                </span>
              </div>

              {/* Tab Selector */}
              <div className="grid grid-cols-2 gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200 mb-4 sm:mb-5">
                <button
                  type="button"
                  onClick={() => setActiveSearchTab('sidang')}
                  className={`flex items-center justify-center gap-1.5 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer min-h-[38px] ${
                    activeSearchTab === 'sidang'
                      ? 'bg-blue-900 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
                  }`}
                  id="tab-search-sidang"
                >
                  <Calendar className="h-3.5 w-3.5 shrink-0" />
                  <span>Jadwal Sidang</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSearchTab('putusan')}
                  className={`flex items-center justify-center gap-1.5 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer min-h-[38px] ${
                    activeSearchTab === 'putusan'
                      ? 'bg-blue-900 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
                  }`}
                  id="tab-search-putusan"
                >
                  <FileText className="h-3.5 w-3.5 shrink-0" />
                  <span>Dokumen Putusan</span>
                </button>
              </div>

              {/* Search Form */}
              <form onSubmit={handleSearchSubmit} className="space-y-3 sm:space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="hero-search-input" className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                    {activeSearchTab === 'sidang' ? 'Nomor Perkara, Penggugat, Tergugat, atau Hakim' : 'Nomor Perkara, Klasifikasi Hukum, atau Nama Pihak'}
                  </label>
                  <div className="relative">
                    <input
                      id="hero-search-input"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={
                        activeSearchTab === 'sidang'
                          ? 'Contoh: 142/Pdt.G atau Sugeng...'
                          : 'Contoh: PT Kreasi, Wanprestasi, dsb...'
                      }
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 py-3 pl-10 pr-4 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:border-blue-900 focus:bg-white focus:outline-hidden transition-all min-h-[44px]"
                    />
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-900 text-white py-3 sm:py-3.5 text-xs font-bold hover:bg-blue-800 active:scale-98 transition-all shadow-sm shadow-blue-900/10 min-h-[44px] cursor-pointer"
                  id="search-execute-btn"
                >
                  <Search className="h-4 w-4" />
                  <span>Cari Sekarang</span>
                </button>
              </form>
            </div>

            {/* Suggestions & Alerts */}
            <div className="mt-4 sm:mt-5 pt-4 border-t border-slate-100">
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-2">Populer:</span>
              <div className="flex flex-wrap gap-1.5">
                {activeSearchTab === 'sidang' ? (
                  <>
                    <button
                      onClick={() => handleSuggestionClick('142/Pdt.G', 'sidang')}
                      className="rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 px-2.5 py-1 text-[10px] sm:text-[11px] text-slate-600 hover:text-blue-900 transition-all font-mono cursor-pointer min-h-[32px]"
                    >
                      142/Pdt.G
                    </button>
                    <button
                      onClick={() => handleSuggestionClick('Kejaksaan', 'sidang')}
                      className="rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 px-2.5 py-1 text-[10px] sm:text-[11px] text-slate-600 hover:text-blue-900 transition-all cursor-pointer min-h-[32px]"
                    >
                      Kejaksaan
                    </button>
                    <button
                      onClick={() => handleSuggestionClick('Sugeng', 'sidang')}
                      className="rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 px-2.5 py-1 text-[10px] sm:text-[11px] text-slate-600 hover:text-blue-900 transition-all cursor-pointer min-h-[32px]"
                    >
                      Sugeng
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleSuggestionClick('Wanprestasi', 'putusan')}
                      className="rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 px-2.5 py-1 text-[10px] sm:text-[11px] text-slate-600 hover:text-blue-900 transition-all cursor-pointer min-h-[32px]"
                    >
                      Wanprestasi
                    </button>
                    <button
                      onClick={() => handleSuggestionClick('Hendrawan', 'putusan')}
                      className="rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 px-2.5 py-1 text-[10px] sm:text-[11px] text-slate-600 hover:text-blue-900 transition-all cursor-pointer min-h-[32px]"
                    >
                      Hendrawan
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Quick Statistics Banner as Sub-Bento Cards */}
          {/* Stat Block 1: Sidang Hari Ini */}
          <div className="col-span-6 sm:col-span-3 bg-white rounded-3xl p-3.5 min-[380px]:p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
            <span className="text-slate-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider block">Sidang Hari Ini</span>
            <div className="mt-2 text-left">
              <span className="font-display font-extrabold text-2xl sm:text-3xl text-blue-900 block leading-tight">{todaySchedulesCount}</span>
              <span className="text-[8px] min-[380px]:text-[10px] text-emerald-650 font-bold inline-flex items-center gap-1 mt-1 bg-emerald-50 border border-emerald-100 rounded-lg px-2 py-0.5 w-fit">
                <CheckCircle2 className="h-2.5 w-2.5 shrink-0" /> <span className="truncate">Sidang</span>
              </span>
            </div>
          </div>

          {/* Stat Block 2: Sedang Aktif */}
          <div className="col-span-6 sm:col-span-3 bg-emerald-50 rounded-3xl p-3.5 min-[380px]:p-5 border border-emerald-100 shadow-xs flex flex-col justify-between">
            <span className="text-emerald-700 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider block">Sedang Aktif</span>
            <div className="mt-2 text-left">
              <span className="font-display font-extrabold text-2xl sm:text-3xl text-emerald-600 block leading-tight">{ongoingSchedulesCount}</span>
              <span className="text-[8px] min-[380px]:text-[10px] text-slate-600 font-bold inline-flex items-center gap-1 sm:gap-1.5 mt-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span> <span className="truncate">Di Ruangan</span>
              </span>
            </div>
          </div>

          {/* Stat Block 3: Total Putusan */}
          <div className="col-span-6 sm:col-span-3 bg-white rounded-3xl p-3.5 min-[380px]:p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
            <span className="text-slate-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider block">Total Putusan</span>
            <div className="mt-2 text-left">
              <span className="font-display font-extrabold text-2xl sm:text-3xl text-blue-900 block leading-tight">{totalVerdictsCount}</span>
              <span className="text-[8px] min-[380px]:text-[10px] text-blue-600 font-bold inline-flex items-center gap-1 mt-1 bg-blue-50 border border-blue-100 rounded-lg px-2 py-0.5 w-fit">
                <span className="truncate">Inkracht</span>
              </span>
            </div>
          </div>

          {/* Stat Block 4: Rasio Selesai */}
          <div className="col-span-6 sm:col-span-3 bg-amber-50 rounded-3xl p-3.5 min-[380px]:p-5 border border-amber-100 shadow-xs flex flex-col justify-between">
            <span className="text-amber-800 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider block">Penyelesaian</span>
            <div className="mt-2 text-left">
              <span className="font-display font-extrabold text-2xl sm:text-3xl text-amber-600 block leading-tight">94.8%</span>
              <span className="text-[8px] min-[380px]:text-[10px] text-amber-700 font-bold inline-flex items-center gap-0.5 min-[300px]:gap-1 mt-1">
                <TrendingUp className="h-2.5 w-2.5 shrink-0" /> <span className="truncate">Selesai</span>
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
