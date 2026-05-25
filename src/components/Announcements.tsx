import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Megaphone, Calendar, FileText, ArrowRight, X, AlertOctagon, HelpCircle, Info } from 'lucide-react';
import { Pengumuman } from '../types';

interface AnnouncementsProps {
  announcements: Pengumuman[];
}

export default function Announcements({ announcements }: AnnouncementsProps) {
  const [selectedAnn, setSelectedAnn] = useState<Pengumuman | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('Semua');

  const categories = ['Semua', 'Penting', 'Prosedur', 'Layanan', 'Umum'];

  const filteredAnn = categoryFilter === 'Semua' 
    ? announcements 
    : announcements.filter(ann => ann.kategori === categoryFilter);

  const getKategoriColor = (kategori: string) => {
    switch (kategori) {
      case 'Penting':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Prosedur':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Layanan':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getKategoriIcon = (kategori: string) => {
    switch (kategori) {
      case 'Penting':
        return <AlertOctagon className="h-4 w-4 text-red-600" />;
      case 'Prosedur':
        return <FileText className="h-4 w-4 text-amber-600" />;
      case 'Layanan':
        return <HelpCircle className="h-4 w-4 text-emerald-600" />;
      default:
        return <Info className="h-4 w-4 text-slate-600" />;
    }
  };

  return (
    <section id="announcements" className="bg-slate-50 py-16 scroll-mt-12 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-blue-900 font-extrabold text-xs tracking-wider uppercase mb-2">
              <Megaphone className="h-4 w-4" />
              <span>Warta &amp; Maklumat Pengadilan</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 tracking-tight">
              Pengumuman &amp; Kebijakan Sidang
            </h2>
            <p className="text-slate-505 text-sm mt-1 max-w-xl">
              Berita resmi, penyesuaian regulasi administrasi, penundaan hari libur, dan panduan persidangan elektronik.
            </p>
          </div>

          {/* Action-Filter Buttons: Styled as a Bento bar */}
          <div className="flex flex-wrap gap-1.5 bg-slate-200/50 p-1.5 rounded-2xl border border-slate-200 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
                  categoryFilter === cat
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
                }`}
                id={`ann-filter-${cat.toLowerCase()}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Announcements grid view: Bento Cells */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="announcements-grid">
          {filteredAnn.map((ann, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              key={ann.id}
              className={`group flex flex-col justify-between rounded-3xl border p-5 sm:p-6 bg-white hover:shadow-md transition-all duration-300 relative hover:scale-[1.01] hover:-translate-y-0.5 ${
                ann.penting 
                  ? 'border-red-300 ring-4 ring-red-500/5' 
                  : 'border-slate-200 hover:border-blue-300'
              }`}
            >
              {/* Highlight ribbon for critical item */}
              {ann.penting && (
                <div className="absolute top-0 right-6 -translate-y-1/2 bg-red-650 text-white text-[9px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-lg shadow-xs">
                  Penting / Segera
                </div>
              )}

              <div>
                {/* Meta details */}
                <div className="flex items-center gap-2 mb-3.5">
                  <span className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-0.5 text-[11px] font-semibold ${getKategoriColor(ann.kategori)}`}>
                    {getKategoriIcon(ann.kategori)}
                    <span>{ann.kategori}</span>
                  </span>
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{ann.tanggal}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display font-extrabold text-base md:text-lg text-blue-950 group-hover:text-blue-700 transition-colors leading-snug">
                  {ann.judul}
                </h3>

                {/* Abstract Text Preview */}
                <p className="text-slate-500 text-xs mt-2.5 leading-relaxed">
                  {ann.ringkasan}
                </p>
              </div>

              {/* Read button */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block font-mono">ID: {ann.id}</span>
                <button
                  onClick={() => setSelectedAnn(ann)}
                  className="inline-flex items-center gap-1 text-xs font-extrabold text-blue-900 hover:text-blue-700 transition-colors"
                  id={`read-ann-${ann.id}`}
                >
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}

          {filteredAnn.length === 0 && (
            <div className="col-span-full py-12 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-dashed border-slate-300">
              <Megaphone className="h-10 w-10 text-slate-300 mb-2.5" />
              <h4 className="font-bold text-slate-700 text-sm">Tidak Ada Maklumat Ditemukan</h4>
              <p className="text-slate-400 text-xs">Pilih kategori lainnya untuk membaca pemberitahuan.</p>
            </div>
          )}
        </div>

      </div>

      {/* Reader Modal Overlay */}
      <AnimatePresence>
        {selectedAnn && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAnn(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs"
            ></motion.div>

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-2xl z-10 max-h-[85vh] overflow-y-auto text-slate-900"
              id="announcement-reader-modal"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedAnn(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 rounded-lg p-1.5 hover:bg-slate-50 transition-colors"
                title="Tutup lembar pengumuman"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Meta Headers */}
              <div className="flex items-center gap-2 mb-4">
                <span className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-0.5 text-[11px] font-semibold ${getKategoriColor(selectedAnn.kategori)}`}>
                  {getKategoriIcon(selectedAnn.kategori)}
                  <span>{selectedAnn.kategori}</span>
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Diterbitkan: {selectedAnn.tanggal}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display font-extrabold text-xl md:text-2xl text-blue-950 leading-tight pr-6">
                {selectedAnn.judul}
              </h3>

              {/* Secondary Lead box: Styled as high end gold bento block */}
              <div className="my-5 rounded-2xl bg-amber-50/40 border border-amber-250/20 border-l-4 border-l-amber-500 p-4">
                <span className="text-[10px] font-extrabold uppercase text-amber-800 tracking-wider block mb-1">Ikhtisar / Ringkasan</span>
                <p className="text-slate-700 text-xs leading-relaxed italic">
                  "{selectedAnn.ringkasan}"
                </p>
              </div>

              {/* Detailed Article Contents */}
              <div className="space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
                <h4 className="font-bold text-slate-900 uppercase tracking-wide text-xs">Uraian Pemberitahuan Resmi:</h4>
                <p>{selectedAnn.konten}</p>
                <p>Demikian pengumuman ini disampaikan untuk menjadi perhatian bagi para praktisi hukum, penasihet hukum, pihak berperkara, dan seluruh pengunjung sidang di wilayah hukum terkait.</p>
              </div>

              {/* Legal validation stamp signature */}
              <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-[11px] text-slate-400 font-mono">
                  Dokumen No: OFF-DS-{selectedAnn.id.toUpperCase()}-2026
                </div>
                <div className="text-right border border-blue-100/40 bg-blue-50/40 rounded-2xl p-4 sm:max-w-xs w-full sm:w-auto">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-blue-800 block">PANITERA SEKRETARIS</span>
                  <span className="font-display font-bold text-xs text-blue-950 block mt-1">Tim Humas &amp; TI SIPP</span>
                  <span className="text-[9px] text-emerald-600 flex items-center justify-end gap-1 font-semibold mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Digital Verified Stamp
                  </span>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
