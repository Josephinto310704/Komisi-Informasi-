import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Calendar, MapPin, Users, Info, ChevronRight, X, Clock, HelpCircle, FileText, RefreshCw, CheckCircle2 } from 'lucide-react';
import { JadwalSidang } from '../types';

interface ScheduleSectionProps {
  schedules: JadwalSidang[];
  searchQueryFromHero: string;
}

export default function ScheduleSection({ schedules, searchQueryFromHero }: ScheduleSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<string>('Semua');
  const [selectedDate, setSelectedDate] = useState<string>(''); // empty means All Dates
  const [statusFilter, setStatusFilter] = useState<string>('Semua');
  const [selectedSchedule, setSelectedSchedule] = useState<JadwalSidang | null>(null);

  // Sync search query when forwarded from the Hero element
  useEffect(() => {
    if (searchQueryFromHero) {
      setSearchTerm(searchQueryFromHero);
      // If there's an active search from hero, make sure we clear type filters or match intelligently
      // Usually, just let the text search filter the entire dataset.
    }
  }, [searchQueryFromHero]);

  // Handle resetting all filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setActiveTab('Semua');
    setSelectedDate('');
    setStatusFilter('Semua');
  };

  // Extract unique categories counts
  const categoriesCounts = useMemo(() => {
    const counts: Record<string, number> = { Semua: schedules.length };
    schedules.forEach(item => {
      counts[item.jenisSidang] = (counts[item.jenisSidang] || 0) + 1;
    });
    return counts;
  }, [schedules]);

  // Filter schedules based on terms, tabs, status and date
  const filteredSchedules = useMemo(() => {
    return schedules.filter(item => {
      // 1. Text Search matches Nomor Perkara, Para Pihak, Agenda, or Hakim
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = searchTerm === '' || 
        item.nomorPerkara.toLowerCase().includes(searchLower) ||
        item.paraPihak.toLowerCase().includes(searchLower) ||
        item.penggugat.toLowerCase().includes(searchLower) ||
        item.tergugat.toLowerCase().includes(searchLower) ||
        item.agenda.toLowerCase().includes(searchLower) ||
        item.majelisHakim.some(h => h.toLowerCase().includes(searchLower));

      // 2. Tab matches Jenis Sidang
      const matchesTab = activeTab === 'Semua' || item.jenisSidang === activeTab;

      // 3. Date matches
      const matchesDate = selectedDate === '' || item.tanggal === selectedDate;

      // 4. Status matches
      const matchesStatus = statusFilter === 'Semua' || item.status === statusFilter;

      return matchesSearch && matchesTab && matchesDate && matchesStatus;
    });
  }, [schedules, searchTerm, activeTab, selectedDate, statusFilter]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Sedang Berlangsung':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200 text-[11px] font-semibold flex items-center gap-1';
      case 'Akan Datang':
        return 'bg-amber-50 text-amber-800 border-amber-200 text-[11px] font-semibold flex items-center gap-1';
      case 'Selesai':
        return 'bg-slate-100 text-slate-700 border-slate-200 text-[11px] font-semibold flex items-center gap-1';
      default: // Ditunda
        return 'bg-red-50 text-red-800 border-red-200 text-[11px] font-semibold flex items-center gap-1';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'Sedang Berlangsung':
        return <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>;
      case 'Akan Datang':
        return <span className="h-2 w-2 rounded-full bg-amber-400"></span>;
      case 'Selesai':
        return <span className="h-2 w-2 rounded-full bg-slate-400"></span>;
      default:
        return <span className="h-2 w-2 rounded-full bg-red-500"></span>;
    }
  };

  const getSidangTypeBadge = (type: string) => {
    switch (type) {
      case 'Perdata':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Pidana':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Agama':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: // TUN
        return 'bg-sky-50 text-sky-700 border-sky-200';
    }
  };

  return (
    <section id="schedules" className="bg-white py-16 scroll-mt-12 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
            <Calendar className="h-3.5 w-3.5 text-blue-900" />
            <span>Sistem Informasi Penyelesaian Sengketa Informasi (SIPSI)</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight">
            Jadwal Persidangan Terbuka
          </h2>
          <p className="text-slate-500 text-sm mt-2 max-w-2xl mx-auto leading-relaxed">
            Gunakan fungsionalitas pencarian dinamis di bawah untuk memeriksa jadwal sidang harian berdasarkan nomor perkara, pihak berperkara, maupun majelis hakim yang memimpin.
          </p>
        </div>

        {/* Dynamic Filters UI Container: Stylized as a Bento Board */}
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 md:p-8 shadow-xs mb-8" id="schedule-filters-dashboard">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* 1. Live Text Search Bar (Col: 4) */}
            <div className="md:col-span-4 space-y-1.5">
              <label htmlFor="search-input" className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">Pencarian Terpadu</label>
              <div className="relative">
                <input
                  id="search-input"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nomor perkara, nama pihak, agenda..."
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-8 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 focus:outline-hidden transition-all"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                    title="Hapus kata kunci pencarian"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>

            {/* 2. Date Trigger Buttons (Col: 4) */}
            <div className="md:col-span-4 space-y-1.5">
              <label htmlFor="date-input" className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">Tanggal Sidang</label>
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-8 flex gap-1 bg-white p-1 rounded-xl border border-slate-300 h-11 items-center">
                  <button
                    onClick={() => setSelectedDate('')}
                    className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                      selectedDate === '' 
                        ? 'bg-blue-900 text-white' 
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Semua
                  </button>
                  <button
                    onClick={() => setSelectedDate('2026-05-25')}
                    className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                      selectedDate === '2026-05-25' 
                        ? 'bg-blue-900 text-white' 
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Hari Ini
                  </button>
                  <button
                    onClick={() => setSelectedDate('2026-05-26')}
                    className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                      selectedDate === '2026-05-26' 
                        ? 'bg-blue-900 text-white' 
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Besok
                  </button>
                </div>
                {/* Manual date input */}
                <input
                  id="date-input"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="col-span-4 rounded-xl border border-slate-300 bg-white px-2.5 text-xs text-slate-800 font-mono focus:border-blue-900 focus:outline-hidden"
                  title="Pilih tanggal sidang spesifik"
                />
              </div>
            </div>

            {/* 3. Status filter select (Col: 3) */}
            <div className="md:col-span-3 space-y-1.5">
              <label htmlFor="status-select" className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">Status Perkara</label>
              <select
                id="status-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3 text-xs text-slate-800 focus:border-blue-900 focus:outline-hidden h-11"
              >
                <option value="Semua">Semua Status Operasional</option>
                <option value="Akan Datang">Akan Datang</option>
                <option value="Sedang Berlangsung">Sedang Berlangsung</option>
                <option value="Selesai">Selesai</option>
                <option value="Ditunda">Ditunda</option>
              </select>
            </div>

            {/* 4. Reset Button (Col: 1) */}
            <div className="md:col-span-1 flex items-end">
              <button
                onClick={handleResetFilters}
                className="w-full flex h-11 items-center justify-center rounded-xl border border-slate-300 bg-white hover:bg-slate-100 hover:border-slate-400 text-slate-500 hover:text-slate-700 transition-colors"
                title="Reset seluruh filter pencarian"
                id="reset-schedules-btn"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>

          </div>

          {/* Tab Sub-Selector based on Case Jurisdictions */}
          <div className="mt-5 pt-4 border-t border-slate-200/60 flex flex-wrap gap-2 items-center">
            <span className="text-xs text-slate-500 font-semibold mr-1">Rumpun Sengketa:</span>
            <div className="flex flex-wrap gap-1">
              {['Semua', 'Perdata', 'Pidana', 'Agama', 'Tata Usaha Negara'].map((tab) => {
                const countKey = tab === 'Semua' ? 'Semua' : tab;
                const count = categoriesCounts[countKey] || 0;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                      activeTab === tab
                        ? 'bg-blue-900 text-white shadow-xs'
                        : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-950 border border-slate-200'
                    }`}
                    id={`jurisdiction-tab-${tab.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <span>{tab}</span>
                    <span className={`rounded-md px-2 py-0.5 text-[9px] font-mono leading-none ${activeTab === tab ? 'bg-blue-800 text-amber-300' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Schedules Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" id="schedules-deck">
          {filteredSchedules.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              key={item.id}
              className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 hover:border-blue-300 hover:shadow-md transition-all duration-300 cursor-pointer group hover:scale-[1.01] hover:-translate-y-0.5"
              onClick={() => setSelectedSchedule(item)}
            >
              <div>
                {/* Header detail */}
                <div className="flex items-center justify-between mb-3.5">
                  <span className={`inline-block rounded-lg border px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase ${getSidangTypeBadge(item.jenisSidang)}`}>
                    {item.jenisSidang}
                  </span>
                  
                  {/* Status Indicator */}
                  <span className={`rounded-lg border px-2.5 py-0.5 ${getStatusStyle(item.status)}`}>
                    {getStatusDot(item.status)}
                    <span>{item.status}</span>
                  </span>
                </div>

                {/* Case Number */}
                <h3 className="font-mono text-sm font-extrabold text-blue-950 group-hover:text-blue-700 transition-colors tracking-tight">
                  {item.nomorPerkara}
                </h3>

                {/* Litigants (Parties) */}
                <div className="mt-3.5 bg-blue-50/40 border border-blue-100/10 rounded-2xl p-4">
                  <span className="text-[9px] font-bold text-blue-800/60 uppercase tracking-widest block mb-1">PARTISIPAN PERKARA</span>
                  <p className="text-blue-950 text-xs font-bold line-clamp-1 group-hover:text-black">
                    {item.paraPihak}
                  </p>
                </div>

                {/* Event particulars */}
                <div className="mt-4 space-y-2.5 text-xs text-slate-600" id={`schedule-meta-${item.id}`}>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
                    <span className="font-semibold text-slate-700">{item.tanggal} • <span className="font-mono text-blue-900 font-bold">{item.jam}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                    <span className="truncate font-semibold text-slate-700">{item.ruang}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                    <p className="line-clamp-2 leading-relaxed text-slate-500">
                      <span className="font-bold text-slate-700">Agenda:</span> {item.agenda}
                    </p>
                  </div>
                </div>
              </div>

              {/* View button row */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600">
                <span className="text-slate-450 font-mono text-[9px] font-medium uppercase tracking-wider">SIPSI Verified</span>
                <span className="inline-flex items-center gap-1 text-blue-900 group-hover:text-blue-700 transition-colors font-bold">
                  <span>Saring Detail</span>
                  <ChevronRight className="h-4 w-4 transform group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty Search Layout */}
        {filteredSchedules.length === 0 && (
          <div className="py-16 text-center border border-dashed border-slate-300 rounded-2xl bg-slate-50/20 max-w-lg mx-auto flex flex-col items-center justify-center">
            <Users className="h-10 w-10 text-slate-300 mb-3" />
            <h3 className="font-display font-semibold text-slate-700 text-sm">Tidak Ada Jadwal Sidang</h3>
            <p className="text-slate-400 text-xs mt-1 px-6 leading-relaxed">
              Kami tidak dapat menemukan perkara yang cocok dengan kriteria pencarian "{searchTerm || 'filter tertentu'}" dalam yurisdiksi {activeTab}. Silakan periksa kembali ketikan Anda atau tekan tombol reset di atas.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
              id="empty-schedules-reset-btn"
            >
              Reset Parameter &amp; Perlihatkan Semua
            </button>
          </div>
        )}

      </div>

      {/* Expanded Schedule Details Drawer/Modal Overlay */}
      <AnimatePresence>
        {selectedSchedule && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSchedule(null)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs"
            ></motion.div>

            {/* Modal Body Container */}
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 15 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
              id="schedule-detail-modal"
            >
              {/* Close trigger */}
              <button
                onClick={() => setSelectedSchedule(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 rounded-lg p-1.5 hover:bg-slate-50 transition-colors"
                title="Tutup detail persidangan"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Header Jurisdictions & Status */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`rounded-md border px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase ${getSidangTypeBadge(selectedSchedule.jenisSidang)}`}>
                  {selectedSchedule.jenisSidang}
                </span>
                <span className={`rounded-md border px-2.5 py-0.5 ${getStatusStyle(selectedSchedule.status)}`}>
                  {getStatusDot(selectedSchedule.status)}
                  <span>{selectedSchedule.status}</span>
                </span>
                <span className="text-slate-400 text-xs font-mono ml-auto mr-4 hidden sm:inline">ID Perkara: {selectedSchedule.id}</span>
              </div>

              {/* Title Case Number */}
              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight leading-tight select-all">
                {selectedSchedule.nomorPerkara}
              </h3>

              {/* Active Parties Column */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-6">
                
                {/* Litigant side 1: Plaintiff / Proponent */}
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <span className="inline-block bg-slate-200 text-slate-800 text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider mb-2">
                    {selectedSchedule.jenisSidang === 'Pidana' ? 'Jaksa Penuntut Umum' : 'Penggugat / Pemohon'}
                  </span>
                  <p className="text-slate-900 text-xs font-bold leading-relaxed">
                    {selectedSchedule.penggugat}
                  </p>
                </div>

                {/* Litigant side 2: Defendant */}
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <span className="inline-block bg-slate-200 text-slate-800 text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider mb-2">
                    {selectedSchedule.jenisSidang === 'Pidana' ? 'Terdakwa' : 'Tergugat / Termohon'}
                  </span>
                  <p className="text-slate-900 text-xs font-bold leading-relaxed">
                    {selectedSchedule.tergugat}
                  </p>
                </div>

              </div>

              {/* Legal Particulars Desk (Dates, Rooms, Agendas) */}
              <div className="border-t border-b border-slate-100 py-5 space-y-4 text-xs sm:text-sm text-slate-700">
                
                {/* Row 1: Time and Locations */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-2.5">
                    <Clock className="h-4.5 w-4.5 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 font-semibold text-[10px] uppercase block">Tanggal &amp; Waktu Sidang</span>
                      <span className="font-semibold text-slate-900">{selectedSchedule.tanggal}</span>
                      <span className="text-slate-500 font-mono block mt-0.5">{selectedSchedule.jam}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <MapPin className="h-4.5 w-4.5 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 font-semibold text-[10px] uppercase block">Ruangan &amp; Gedung Sidang</span>
                      <span className="font-semibold text-slate-900">{selectedSchedule.ruang}</span>
                      <span className="text-slate-500 block mt-0.5 leading-tight">Komisi Informasi Provinsi Jambi</span>
                    </div>
                  </div>
                </div>

                {/* Row 2: Court Action Agenda */}
                <div className="flex items-start gap-2.5 pt-2">
                  <FileText className="h-4.5 w-4.5 text-slate-400 shrink-0 mt-0.5" />
                  <div className="flex-1 bg-amber-50/50 rounded-lg p-3 border border-amber-100">
                    <span className="text-amber-800 font-bold text-[10px] uppercase block mb-1">Materi / Agenda Persidangan</span>
                    <p className="font-medium text-slate-900 leading-relaxed text-xs sm:text-sm">
                      {selectedSchedule.agenda}
                    </p>
                  </div>
                </div>

                {/* Row 3: Panel of Judges (Majelis Komisioner) */}
                <div className="flex items-start gap-2.5 pt-2">
                  <span className="h-5 w-5 bg-blue-100 text-blue-800 flex items-center justify-center font-bold font-display rounded-md shrink-0 text-xs">K</span>
                  <div>
                    <span className="text-slate-400 font-semibold text-[10px] uppercase block mb-1.5">Susunan Majelis Komisioner &amp; Panitera Pengganti</span>
                    <div className="flex flex-col gap-1">
                      {selectedSchedule.majelisHakim.map((hakim, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2">
                          <span className={`inline-block h-1.5 w-1.5 rounded-full ${hIdx === 0 ? 'bg-blue-600' : 'bg-slate-300'}`}></span>
                          <span className={`${hIdx === 0 ? 'font-bold text-slate-900' : 'text-slate-700'} text-xs font-mono`}>
                            {hakim} {hIdx === 0 ? '(Ketua Majelis)' : '(Anggota Majelis)'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Informational footer on court rules */}
              <div className="mt-5 rounded-lg bg-slate-50 p-3.5 border border-slate-200 flex items-start gap-2.5 text-[11px] text-slate-500">
                <Info className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Para pengunjung sidang diwajibkan mematuhi Tata Tertib Persidangan. Tidak diperkenankan membawa senjata tajam, alat perekam visual tanpa izin ketua sidang, dan wajib menjaga keheningan selama jalannya sidang.
                </p>
              </div>

              {/* Action Close buttons */}
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between gap-3 flex-col sm:flex-row">
                <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Sinkronisasi Aktif SIPSI 2026: Terverifikasi
                </span>
                
                <button
                  onClick={() => setSelectedSchedule(null)}
                  className="w-full sm:w-auto px-5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  Selesai Meninjau
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
