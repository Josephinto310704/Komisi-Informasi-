import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Download, Search, RefreshCw, Layers, ShieldCheck, CheckCircle2, Clock, X, AlertTriangle, Cpu } from 'lucide-react';
import { Putusan } from '../types';

interface VerdictSectionProps {
  verdicts: Putusan[];
  searchQueryFromHero: string;
}

export default function VerdictSection({ verdicts, searchQueryFromHero }: VerdictSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('Semua');
  
  // Interactive PDF Download States
  const [downloadingVerdict, setDownloadingVerdict] = useState<Putusan | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadStep, setDownloadStep] = useState<'menyiapkan' | 'mengunduh' | 'selesai'>('menyiapkan');

  // Trigger simulated download sequence
  const triggerDownload = (verdict: Putusan) => {
    setDownloadingVerdict(verdict);
    setDownloadProgress(0);
    setDownloadStep('menyiapkan');

    // Step 1: Pre-preparing document (0.8s)
    setTimeout(() => {
      setDownloadStep('mengunduh');
      
      // Step 2: Incremental loading (progress bar)
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 15) + 10;
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(interval);
          setDownloadStep('selesai');
        }
        setDownloadProgress(currentProgress);
      }, 300);

    }, 800);
  };

  const handleReset = () => {
    setSearchTerm('');
    setClassFilter('Semua');
  };

  // Extract unique classifications
  const classifications = useMemo(() => {
    const list = new Set<string>();
    verdicts.forEach(item => {
      // split by '/' or just take clean categories
      const cleanClass = item.klasifikasi.split('/')[0].trim();
      list.add(cleanClass);
    });
    return ['Semua', ...Array.from(list)];
  }, [verdicts]);

  // Sync search from Hero
  useMemo(() => {
    if (searchQueryFromHero) {
      setSearchTerm(searchQueryFromHero);
    }
  }, [searchQueryFromHero]);

  // Filter verdicts
  const filteredVerdicts = useMemo(() => {
    return verdicts.filter(item => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = searchTerm === '' ||
        item.nomorPerkara.toLowerCase().includes(searchLower) ||
        item.paraPihak.toLowerCase().includes(searchLower) ||
        item.klasifikasi.toLowerCase().includes(searchLower) ||
        item.amarPutusan.toLowerCase().includes(searchLower);

      const matchesClass = classFilter === 'Semua' || item.klasifikasi.includes(classFilter);

      return matchesSearch && matchesClass;
    });
  }, [verdicts, searchTerm, classFilter]);

  const getStatusBadgeStyle = (status: string) => {
    if (status.includes('Inkracht')) {
      return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    } else if (status.includes('Banding')) {
      return 'bg-amber-50 text-amber-800 border-amber-200';
    } else {
      return 'bg-blue-50 text-blue-800 border-blue-200';
    }
  };

  return (
    <section id="verdicts" className="bg-slate-50 py-16 scroll-mt-12 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-1.5 text-blue-900 font-extrabold text-xs tracking-wider uppercase mb-2">
              <FileText className="h-4 w-4 text-blue-900" />
              <span>Direktori Putusan Terpublikasi</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 tracking-tight">
              Akses &amp; Direktori Hasil Putusan
            </h2>
            <p className="text-slate-500 text-sm mt-1 max-w-xl">
              Salinan putusan resmi berkekuatan hukum tetap (Inkracht Van Gewijsde) yang diunggah secara berkala demi menjamin integrasi hukum publik.
            </p>
          </div>

          {/* Quick search input as a Bento panel child */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto" id="verdict-controls">
            <div className="relative shrink-0 sm:w-64">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari nomor, pihak, atau amar..."
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3.5 pl-9 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 focus:outline-hidden"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            </div>

            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white py-2.5 px-3 text-xs text-slate-700 focus:border-blue-900 focus:outline-hidden h-11"
            >
              <option value="Semua">Semua Klasifikasi Sengketa</option>
              {classifications.filter(c => c !== 'Semua').map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>

            <button
              onClick={handleReset}
              className="py-2.5 px-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors shrink-0 h-11 flex items-center justify-center"
              title="Reset Filter"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Verdict Cards Grid: Styled as Bento Cells */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="verdicts-list-container">
          {filteredVerdicts.map((item, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              key={item.id}
              className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 md:p-8 hover:border-blue-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:scale-[1.01] hover:-translate-y-0.5"
            >
              <div>
                {/* Header info */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-slate-800">
                    <FileText className="h-4 w-4 text-blue-900 shrink-0" />
                    <span className="select-all text-blue-950 font-bold">{item.nomorPerkara}</span>
                  </div>

                  <span className={`rounded-lg border px-2.5 py-0.5 text-[10px] font-bold ${getStatusBadgeStyle(item.statusPutusan)}`}>
                    {item.statusPutusan}
                  </span>
                </div>

                {/* Subtitle / Classification */}
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Kategori Klasifikasi Perkara</span>
                <h3 className="font-display font-extrabold text-base text-blue-950 mt-0.5">
                  {item.klasifikasi}
                </h3>

                {/* Parties Involved */}
                <div className="mt-3.5 text-xs text-slate-600 py-2.5 border-t border-b border-slate-100 flex justify-between items-center gap-2">
                  <span className="line-clamp-1"><strong>Para Pihak:</strong> {item.paraPihak}</span>
                  <span className="text-slate-400 font-mono text-[10px] shrink-0 font-medium whitespace-nowrap">Diputus: {item.tanggalPutusan}</span>
                </div>

                {/* Amar Putusan Context Panel */}
                <div className="mt-4 bg-amber-50/40 rounded-2xl p-4 border border-amber-100/30">
                  <span className="text-[9px] font-extrabold uppercase text-amber-800 tracking-widest block mb-1">Amar Putusan Resmi</span>
                  <p className="text-slate-700 text-xs leading-relaxed italic line-clamp-3 hover:line-clamp-none transition-all duration-300 cursor-help" title="Klik untuk rentangkan teks">
                    "{item.amarPutusan}"
                  </p>
                </div>
              </div>

              {/* Action Downloads Panel */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-[11px] text-slate-400 font-mono">
                  <span>Ukuran: <strong>{item.fileSize}</strong></span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline">Diunduh: <strong>{item.unduhCount}x</strong></span>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => triggerDownload(item)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white px-5 py-2.5 text-xs font-bold shadow-xs transition-colors"
                    id={`download-putusan-${item.id}`}
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download Salinan Putusan</span>
                  </button>
                </div>
              </div>

            </motion.div>
          ))}

          {filteredVerdicts.length === 0 && (
            <div className="col-span-full py-16 text-center border border-dashed border-slate-300 rounded-3xl bg-white max-w-lg mx-auto flex flex-col items-center justify-center">
              <FileText className="h-10 w-10 text-slate-300 mb-3" />
              <h3 className="font-display font-semibold text-slate-700 text-sm">Putusan Tidak Ditemukan</h3>
              <p className="text-slate-400 text-xs mt-1 px-6 leading-relaxed">
                Kami tidak dapat mengidentifikasi putusan yang sesuai dengan filter "{searchTerm || 'selected criteria'}" dalam direktori. Silakan ketik nama pihak atau gunakan kosa kata klasifikasi sengketa lainnya.
              </p>
              <button
                onClick={handleReset}
                className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-semibold hover:bg-blue-800 transition-colors"
                id="empty-verdicts-reset-btn"
              >
                Tampilkan Semua Putusan
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Simulated Document Downloader Modal - Styled with high contrast professional scheme */}
      <AnimatePresence>
        {downloadingVerdict && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (downloadStep === 'selesai') setDownloadingVerdict(null);
              }}
              className="absolute inset-0 bg-slate-950/65 backdrop-blur-xs"
            ></motion.div>

            {/* Modal Body Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl text-slate-900 z-10 text-center"
              id="simulated-download-modal"
            >
              {downloadStep !== 'menyiapkan' && downloadStep !== 'mengunduh' && (
                <button
                  onClick={() => setDownloadingVerdict(null)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 rounded-lg p-1.5 transition-colors"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              )}

              {/* Header Icon */}
              <div className="mx-auto h-12 w-12 rounded-full bg-blue-50 border border-blue-105/30 flex items-center justify-center text-blue-900 mb-4">
                <Cpu className="h-5.5 w-5.5 animate-spin-slow" />
              </div>

              {/* Text Information depending on loading stages */}
              {downloadStep === 'menyiapkan' && (
                <div className="space-y-2 py-4">
                  <h4 className="font-display font-extrabold text-base text-slate-900">Memverifikasi Hash Dokumen</h4>
                  <p className="text-xs text-slate-505 leading-relaxed max-w-xs mx-auto">
                    Menghubungkan ke repositori Salinan Putusan Komisi Informasi Provinsi Jambi secara aman via SIPSI SSL.
                  </p>
                  <div className="flex justify-center items-center gap-1.5 text-[10px] text-blue-800 font-bold font-mono pt-2">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Enkripsi SSL SHA-256 Valid</span>
                  </div>
                </div>
              )}

              {downloadStep === 'mengunduh' && (
                <div className="space-y-4 py-3">
                  <div>
                    <h4 className="font-display font-extrabold text-base text-slate-900">Mengunduh Dokumen Putusan</h4>
                    <p className="text-xs text-slate-500 font-mono mt-1 select-all truncate">{downloadingVerdict.nomorPerkara.replace(/\//g, '_')}.pdf</p>
                  </div>

                  {/* Progress bar visual container */}
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
                    <div 
                      className="bg-blue-900 h-full rounded-full transition-all duration-300" 
                      style={{ width: `${downloadProgress}%` }}
                    ></div>
                  </div>

                  <span className="text-xs text-blue-900 font-mono block font-bold">{downloadProgress}% dari {downloadingVerdict.fileSize} selesai</span>
                </div>
              )}

              {downloadStep === 'selesai' && (
                <div className="space-y-4 py-2">
                  <div className="mx-auto h-12 w-12 rounded-full bg-emerald-50 border border-emerald-500/20 flex items-center justify-center text-emerald-650 mb-2">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-emerald-650 text-base">Salinan Putusan Berhasil Diunduh</h4>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      Dokumen resmi bertanda tangan digital tersimpan di penyimpanan lokal komputer Anda.
                    </p>
                  </div>

                  {/* Document footprint summary */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-1 text-[11px] font-mono text-slate-650">
                    <div><span className="text-slate-400">File:</span> <span className="text-slate-900 font-bold font-sans">{downloadingVerdict.nomorPerkara.replace(/\//g, '_')}_PUTUSAN_AKHIR.pdf</span></div>
                    <div><span className="text-slate-400">Ukuran:</span> <span className="text-slate-900 font-bold">{downloadingVerdict.fileSize}</span></div>
                    <div><span className="text-slate-400">SHA256:</span> <span className="text-blue-900 select-all font-mono font-bold">0ff899a22...e812541a</span></div>
                  </div>

                  <button
                    onClick={() => setDownloadingVerdict(null)}
                    className="w-full mt-2 bg-blue-900 text-white py-2.5 rounded-xl text-xs font-bold hover:bg-blue-800 transition-colors"
                  >
                    Tutup Lembar Unduhan
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
