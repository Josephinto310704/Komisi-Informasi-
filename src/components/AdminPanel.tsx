import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Upload, 
  FileText, 
  Calendar, 
  Megaphone, 
  Clock, 
  User, 
  Scale, 
  X, 
  Check, 
  AlertTriangle, 
  FileUp,
  Download
} from 'lucide-react';
import { JadwalSidang, Pengumuman, Putusan } from '../types';

interface AdminPanelProps {
  schedules: JadwalSidang[];
  announcements: Pengumuman[];
  verdicts: Putusan[];
  onAddSchedule: (schedule: JadwalSidang) => void;
  onAddAnnouncement: (announcement: Pengumuman) => void;
  onAddVerdict: (verdict: Putusan) => void;
  onDeleteSchedule: (id: string) => void;
  onDeleteAnnouncement: (id: string) => void;
  onDeleteVerdict: (id: string) => void;
  onClose: () => void;
}

export default function AdminPanel({
  schedules,
  announcements,
  verdicts,
  onAddSchedule,
  onAddAnnouncement,
  onAddVerdict,
  onDeleteSchedule,
  onDeleteAnnouncement,
  onDeleteVerdict,
  onClose
}: AdminPanelProps) {
  const [activeSubTab, setActiveSubTab] = useState<'schedules' | 'announcements' | 'verdicts'>('schedules');

  // Success Feedbacks
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // --- Schedule Form States ---
  const [schNoPerkara, setSchNoPerkara] = useState('');
  const [schJenis, setSchJenis] = useState<'Perdata' | 'Pidana' | 'Agama' | 'Tata Usaha Negara'>('Perdata');
  const [schParaPihak, setSchParaPihak] = useState('');
  const [schPenggugat, setSchPenggugat] = useState('');
  const [schTergugat, setSchTergugat] = useState('');
  const [schTanggal, setSchTanggal] = useState('2026-05-25');
  const [schJam, setSchJam] = useState('10:00 - selesai');
  const [schRuang, setSchRuang] = useState('Ruang Sidang Utama Jambi');
  const [schAgenda, setSchAgenda] = useState('Pemeriksaan Berkas Gugatan & Alat Bukti');
  const [schMajelis, setSchMajelis] = useState('Dr. H. Mulyadiningrat, S.H., M.H., Ahmad Sanusi, M.Si., Drs. Fauzan, M.H.');
  const [schStatus, setSchStatus] = useState<'Akan Datang' | 'Sedang Berlangsung' | 'Selesai' | 'Ditunda'>('Akan Datang');

  // --- Announcement Form States ---
  const [annJudul, setAnnJudul] = useState('');
  const [annRingkasan, setAnnRingkasan] = useState('');
  const [annKonten, setAnnKonten] = useState('');
  const [annKategori, setAnnKategori] = useState<'Penting' | 'Prosedur' | 'Layanan' | 'Umum'>('Umum');
  const [annPenting, setAnnPenting] = useState(false);

  // --- Verdict / Putusan Form States ---
  const [verNoPerkara, setVerNoPerkara] = useState('');
  const [verKlasifikasi, setVerKlasifikasi] = useState('Sengketa Informasi Publik');
  const [verParaPihak, setVerParaPihak] = useState('');
  const [verTanggal, setVerTanggal] = useState('2026-05-25');
  const [verAmar, setVerAmar] = useState('');
  const [verStatus, setVerStatus] = useState('Kekuatan Hukum Tetap (Inkracht)');
  const [uploadedFile, setUploadedFile] = useState<{ name: string; sizeStr: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // --- Forms Submit Responders ---
  const handleAddScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schNoPerkara || !schParaPihak || !schPenggugat || !schTergugat) {
      triggerToast('⚠️ Harap isi semua field utama jadwal sidang!');
      return;
    }

    const judges = schMajelis.split(',').map(name => name.trim()).filter(Boolean);

    const newSchedule: JadwalSidang = {
      id: 'sch-' + Date.now(),
      nomorPerkara: schNoPerkara,
      jenisSidang: schJenis,
      paraPihak: schParaPihak,
      penggugat: schPenggugat,
      tergugat: schTergugat,
      tanggal: schTanggal,
      jam: schJam,
      ruang: schRuang,
      agenda: schAgenda,
      majelisHakim: judges.length > 0 ? judges : ['Majelis Komisioner'],
      status: schStatus
    };

    onAddSchedule(newSchedule);
    triggerToast('✅ Jadwal sidang baru berhasil ditambahkan!');
    
    // Reset inputs
    setSchNoPerkara('');
    setSchParaPihak('');
    setSchPenggugat('');
    setSchTergugat('');
    setSchAgenda('Pemeriksaan Berkas Gugatan & Alat Bukti');
  };

  const handleAddAnnouncementSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annJudul || !annRingkasan || !annKonten) {
      triggerToast('⚠️ Harap isi semua field utama pengumuman!');
      return;
    }

    const newAnnouncement: Pengumuman = {
      id: 'ann-' + Date.now(),
      judul: annJudul,
      ringkasan: annRingkasan,
      konten: annKonten,
      tanggal: new Date().toISOString().split('T')[0],
      kategori: annKategori,
      penting: annPenting
    };

    onAddAnnouncement(newAnnouncement);
    triggerToast('✅ Pengumuman/Kebijakan baru berhasil dipush!');

    // Reset inputs
    setAnnJudul('');
    setAnnRingkasan('');
    setAnnKonten('');
    setAnnPenting(false);
  };

  const handleAddVerdictSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verNoPerkara || !verParaPihak || !verAmar) {
      triggerToast('⚠️ Harap isi semua field utama putusan!');
      return;
    }

    // Default file if none uploaded
    const fileName = uploadedFile ? uploadedFile.name : `salinan-putusan-${verNoPerkara.replace(/\//g, '-')}.pdf`;
    const fileSizeStr = uploadedFile ? uploadedFile.sizeStr : '1.8 MB';

    const newVerdict: Putusan = {
      id: 'ver-' + Date.now(),
      nomorPerkara: verNoPerkara,
      klasifikasi: verKlasifikasi,
      paraPihak: verParaPihak,
      tanggalPutusan: verTanggal,
      amarPutusan: verAmar,
      statusPutusan: verStatus,
      fileSize: fileSizeStr,
      unduhCount: 0
    };

    onAddVerdict(newVerdict);
    triggerToast('✅ File putusan beserta metadata berhasil diunggah!');

    // Reset inputs
    setVerNoPerkara('');
    setVerParaPihak('');
    setVerAmar('');
    setUploadedFile(null);
  };

  // --- Real Drag & Drop Handlers ---
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      const sizeInMB = file.size / (1024 * 1024);
      setUploadedFile({
        name: file.name,
        sizeStr: sizeInMB < 0.1 ? `${(file.size / 1024).toFixed(1)} KB` : `${sizeInMB.toFixed(1)} MB`
      });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const sizeInMB = file.size / (1024 * 1024);
      setUploadedFile({
        name: file.name,
        sizeStr: sizeInMB < 0.1 ? `${(file.size / 1024).toFixed(1)} KB` : `${sizeInMB.toFixed(1)} MB`
      });
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl relative">
      {/* Toast Notifier inside panel */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 left-4 right-4 z-50 bg-blue-950 text-white p-3.5 rounded-2xl text-xs font-bold shadow-xl border border-blue-900 flex items-center justify-between"
          >
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="text-white hover:text-amber-400 p-0.5">
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Panel */}
      <div className="bg-slate-950 text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-900/50 text-blue-400 flex items-center justify-center border border-blue-500/20">
            <ShieldCheck className="h-5.5 w-5.5" />
          </div>
          <div>
            <h2 className="font-display font-black text-lg tracking-tight">KONTROL ADMINISTRATOR SENGKETA</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
              Komisi Informasi Provinsi Jambi • Update &amp; Unggah Putusan
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="self-end sm:self-auto px-4 py-2 bg-slate-905 hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1"
        >
          <X className="h-4 w-4" />
          <span>Selesai Edit</span>
        </button>
      </div>

      {/* Panel Navigtion Tabs */}
      <div className="bg-slate-50 border-b border-slate-205 py-3 px-3 sm:px-6 flex flex-wrap sm:flex-nowrap lg:flex-wrap gap-1.5 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveSubTab('schedules')}
          className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-bold transition-all flex items-center gap-1 sm:gap-1.5 shrink-0 min-h-[38px] cursor-pointer ${
            activeSubTab === 'schedules'
              ? 'bg-blue-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
          }`}
        >
          <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
          <span>Jadwal Sidang</span>
          <span className="bg-slate-900/10 text-slate-700 rounded-md px-1 py-0.5 text-[8px] sm:text-[9px] font-mono leading-none">
            {schedules.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('announcements')}
          className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-bold transition-all flex items-center gap-1 sm:gap-1.5 shrink-0 min-h-[38px] cursor-pointer ${
            activeSubTab === 'announcements'
              ? 'bg-blue-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
          }`}
        >
          <Megaphone className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
          <span>Pengumuman</span>
          <span className="bg-slate-900/10 text-slate-700 rounded-md px-1 py-0.5 text-[8px] sm:text-[9px] font-mono leading-none">
            {announcements.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('verdicts')}
          className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-bold transition-all flex items-center gap-1 sm:gap-1.5 shrink-0 min-h-[38px] cursor-pointer ${
            activeSubTab === 'verdicts'
              ? 'bg-blue-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
          }`}
        >
          <Upload className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
          <span>Buka Upload Putusan</span>
          <span className="bg-slate-900/10 text-slate-700 rounded-md px-1 py-0.5 text-[8px] sm:text-[9px] font-mono leading-none">
            {verdicts.length}
          </span>
        </button>
      </div>

      {/* Main Form Fields and List Management */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8">
        
        {/* Left Hand: Fill Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. SCHEDULES FORM */}
          {activeSubTab === 'schedules' && (
            <form onSubmit={handleAddScheduleSubmit} className="space-y-4">
              <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4 mb-4">
                <h3 className="font-display font-extrabold text-sm text-slate-900 flex items-center gap-1.5 mb-1.5">
                  <Plus className="h-4 w-4 text-blue-900" /> Tambah Jadwal Sidang Baru
                </h3>
                <p className="text-xs text-slate-500">
                  Agenda sidang penyelesaian sengketa informasi (PSI) akan tersinkronisasi otomatis ke list luar.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Nomor Register Perkara</label>
                  <input
                    type="text"
                    required
                    value={schNoPerkara}
                    onChange={(e) => setSchNoPerkara(e.target.value)}
                    placeholder="Contoh: 004/REG-PSI/2026"
                    className="w-full text-xs rounded-xl bg-slate-50 border border-slate-205 py-2.5 px-3 focus:outline-hidden focus:border-blue-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Rumpun Sengketa</label>
                  <select
                    value={schJenis}
                    onChange={(e) => setSchJenis(e.target.value as any)}
                    className="w-full text-xs rounded-xl bg-slate-50 border border-slate-205 py-2.5 px-3 focus:outline-hidden focus:border-blue-900 h-10"
                  >
                    <option value="Perdata">Perdata (Sengketa Informasi Instansi)</option>
                    <option value="Pidana">Pidana (Hal Kriminal / Terkait)</option>
                    <option value="Agama">Agama</option>
                    <option value="Tata Usaha Negara">Tata Usaha Negara (TUN / Tata Negara)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Pihak Pemohon vs Termohon (Nama Singkat)</label>
                <input
                  type="text"
                  required
                  value={schParaPihak}
                  onChange={(e) => setSchParaPihak(e.target.value)}
                  placeholder="Contoh: LSM Jambi Mandiri vs Dinas Pendidikan Provinsi Jambi"
                  className="w-full text-xs rounded-xl bg-slate-50 border border-slate-205 py-2.5 px-3 focus:outline-hidden focus:border-blue-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Detail Pemohon (Kuasa Hukum)</label>
                  <input
                    type="text"
                    required
                    value={schPenggugat}
                    onChange={(e) => setSchPenggugat(e.target.value)}
                    placeholder="Contoh: LSM Jambi Mandiri (Kuasa: Farhan, S.H.)"
                    className="w-full text-xs rounded-xl bg-slate-50 border border-slate-205 py-2.5 px-3 focus:outline-hidden focus:border-blue-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Detail Termohon</label>
                  <input
                    type="text"
                    required
                    value={schTergugat}
                    onChange={(e) => setSchTergugat(e.target.value)}
                    placeholder="Contoh: Atasan PPID Dinas Perhubungan Kab. Batanghari"
                    className="w-full text-xs rounded-xl bg-slate-50 border border-slate-205 py-2.5 px-3 focus:outline-hidden focus:border-blue-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Tanggal Sidang</label>
                  <input
                    type="date"
                    required
                    value={schTanggal}
                    onChange={(e) => setSchTanggal(e.target.value)}
                    className="w-full text-xs rounded-xl bg-slate-50 border border-slate-205 py-2.5 px-3 focus:outline-hidden focus:border-blue-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Waktu / Jam</label>
                  <input
                    type="text"
                    required
                    value={schJam}
                    onChange={(e) => setSchJam(e.target.value)}
                    placeholder="Contoh: 09:30 - selesai"
                    className="w-full text-xs rounded-xl bg-slate-50 border border-slate-205 py-2.5 px-3 focus:outline-hidden focus:border-blue-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Ruangan Sidang</label>
                  <input
                    type="text"
                    required
                    value={schRuang}
                    onChange={(e) => setSchRuang(e.target.value)}
                    className="w-full text-xs rounded-xl bg-slate-50 border border-slate-205 py-2.5 px-3 focus:outline-hidden focus:border-blue-900"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Agenda Sidang Utama</label>
                <input
                  type="text"
                  required
                  value={schAgenda}
                  onChange={(e) => setSchAgenda(e.target.value)}
                  placeholder="Contoh: Mediasi Lanjutan / Pembacaan Laporan Akhir"
                  className="w-full text-xs rounded-xl bg-slate-50 border border-slate-205 py-2.5 px-3 focus:outline-hidden focus:border-blue-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Majelis Komisioner (Pisahkan dengan koma)</label>
                <input
                  type="text"
                  required
                  value={schMajelis}
                  onChange={(e) => setSchMajelis(e.target.value)}
                  placeholder="Ketua Majelis, Anggota Majelis 1, Anggota Majelis 2, Panitera"
                  className="w-full text-xs rounded-xl bg-slate-50 border border-slate-205 py-2.5 px-3 focus:outline-hidden focus:border-blue-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Status Awal</label>
                <select
                  value={schStatus}
                  onChange={(e) => setSchStatus(e.target.value as any)}
                  className="w-full text-xs rounded-xl bg-slate-50 border border-slate-205 py-2.5 px-3 focus:outline-hidden focus:border-blue-900 h-10"
                >
                  <option value="Akan Datang">Akan Datang (Belum Berlangsung)</option>
                  <option value="Sedang Berlangsung">Sedang Berlangsung (Live)</option>
                  <option value="Selesai">Selesai (Keputusan Diketok)</option>
                  <option value="Ditunda">Ditunda (Rescheduled)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs transition-all shadow-md mt-4 cursor-pointer"
              >
                Push Jadwal Sidang Baru
              </button>
            </form>
          )}

          {/* 2. ANNOUNCEMENTS FORM */}
          {activeSubTab === 'announcements' && (
            <form onSubmit={handleAddAnnouncementSubmit} className="space-y-4">
              <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4 mb-4">
                <h3 className="font-display font-extrabold text-sm text-slate-900 flex items-center gap-1.5 mb-1.5">
                  <Plus className="h-4 w-4 text-blue-900" /> Push Informasi / Pengumuman Terbaru
                </h3>
                <p className="text-xs text-slate-500">
                  Push maklumat, panduan e-registrasi, libur persidangan, atau artikel resmi regulasi.
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Judul Pemberitahuan</label>
                <input
                  type="text"
                  required
                  value={annJudul}
                  onChange={(e) => setAnnJudul(e.target.value)}
                  placeholder="Tulis judul maklumat resmi..."
                  className="w-full text-xs rounded-xl bg-slate-50 border border-slate-205 py-2.5 px-3 focus:outline-hidden focus:border-blue-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Ringkasan Pendek (1 kalimat)</label>
                <input
                  type="text"
                  required
                  value={annRingkasan}
                  onChange={(e) => setAnnRingkasan(e.target.value)}
                  placeholder="Contoh: Terkait cuti bersama nasional, ditiadakan sementara sejak hari Rabu s/d Jumat..."
                  className="w-full text-xs rounded-xl bg-slate-50 border border-slate-205 py-2.5 px-3 focus:outline-hidden focus:border-blue-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Klasifikasi / Kategori</label>
                <select
                  value={annKategori}
                  onChange={(e) => setAnnKategori(e.target.value as any)}
                  className="w-full text-xs rounded-xl bg-slate-50 border border-slate-205 py-2.5 px-3 focus:outline-hidden focus:border-blue-900 h-10"
                >
                  <option value="Umum">Umum (Warta / Berita Umum)</option>
                  <option value="Penting">Penting (Maklumat Mendesak)</option>
                  <option value="Prosedur">Prosedur (Panduan Hukum Acara)</option>
                  <option value="Layanan">Layanan (Sosialisasi Pelayanan)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Isi Dokumen Pengumuman Lengkap</label>
                <textarea
                  required
                  rows={6}
                  value={annKonten}
                  onChange={(e) => setAnnKonten(e.target.value)}
                  placeholder="Ketik isi pengumuman secara mendetail di sini..."
                  className="w-full text-xs rounded-xl bg-slate-50 border border-slate-205 py-2.5 px-3 focus:outline-hidden focus:border-blue-900 resize-none font-sans leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-2 py-1">
                <input
                  type="checkbox"
                  id="ann-important-check"
                  checked={annPenting}
                  onChange={(e) => setAnnPenting(e.target.checked)}
                  className="h-4 w-4 rounded-md border-slate-300 text-blue-900 focus:ring-blue-900"
                />
                <label htmlFor="ann-important-check" className="text-xs font-bold text-slate-700 select-none">
                  Tandai sebagai Penting / Urgent (Akan mendapat border khusus warna merah di antarmuka depan)
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs transition-all shadow-md mt-4 cursor-pointer"
              >
                Push Warta Pengumuman Terbaru
              </button>
            </form>
          )}

          {/* 3. VERDICTS FORM (PUTUSAN - UPLOAD FILE) */}
          {activeSubTab === 'verdicts' && (
            <form onSubmit={handleAddVerdictSubmit} className="space-y-4">
              <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4 mb-2">
                <h3 className="font-display font-extrabold text-sm text-slate-900 flex items-center gap-1.5 mb-1.5">
                  <FileUp className="h-4 w-4 text-blue-900" /> Unggah Salinan &amp; Metadata Putusan
                </h3>
                <p className="text-xs text-slate-500">
                  Unggah file PDF putusan resmi untuk dimasukkan ke direktori putusan publik tervalidasi.
                </p>
              </div>

              {/* DRAG AND DROP FILE UPLOAD AREA */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Unggah File PDF Resmi</label>
                
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-3xl p-6 text-center cursor-pointer transition-all ${
                    isDragging 
                      ? 'border-blue-600 bg-blue-50/50' 
                      : uploadedFile 
                        ? 'border-emerald-300 bg-emerald-50/10' 
                        : 'border-slate-300 hover:border-blue-900 hover:bg-slate-50'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  {uploadedFile ? (
                    <div className="space-y-2">
                      <div className="mx-auto h-12 w-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                        <Check className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 font-mono truncate max-w-sm mx-auto">{uploadedFile.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase font-mono mt-0.5">Ukuran: {uploadedFile.sizeStr}</p>
                      </div>
                      <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-[9px] font-bold uppercase tracking-wider">
                        SIAP DI-PUBLISH
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="mx-auto h-12 w-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center">
                        <Upload className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-700">Tarik &amp; letakkan salinan Putusan PDF atau klik di sini</p>
                        <p className="text-[10px] text-slate-400 mt-1">Hanya mendukung format salinan resmi (.pdf) maksimal 10MB</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Nomor Perkara Putusan</label>
                  <input
                    type="text"
                    required
                    value={verNoPerkara}
                    onChange={(e) => setVerNoPerkara(e.target.value)}
                    placeholder="Contoh: 003/REG-PSI/2026"
                    className="w-full text-xs rounded-xl bg-slate-50 border border-slate-205 py-2.5 px-3 focus:outline-hidden focus:border-blue-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Uraian Klasifikasi Sengketa</label>
                  <input
                    type="text"
                    required
                    value={verKlasifikasi}
                    onChange={(e) => setVerKlasifikasi(e.target.value)}
                    placeholder="Contoh: Sengketa Akses Dokumen Publik APBD"
                    className="w-full text-xs rounded-xl bg-slate-50 border border-slate-205 py-2.5 px-3 focus:outline-hidden focus:border-blue-900"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Pihak Berperkara (Nama Singkat)</label>
                <input
                  type="text"
                  required
                  value={verParaPihak}
                  onChange={(e) => setVerParaPihak(e.target.value)}
                  placeholder="Contoh: Koalisi Masyarakat Peduli vs Sekretariat Daerah Jambi"
                  className="w-full text-xs rounded-xl bg-slate-50 border border-slate-205 py-2.5 px-3 focus:outline-hidden focus:border-blue-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Tanggal Ketetapan Putusan</label>
                  <input
                    type="date"
                    required
                    value={verTanggal}
                    onChange={(e) => setVerTanggal(e.target.value)}
                    className="w-full text-xs rounded-xl bg-slate-50 border border-slate-205 py-2.5 px-3 focus:outline-hidden focus:border-blue-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Status Kekuatan Hukum</label>
                  <select
                    value={verStatus}
                    onChange={(e) => setVerStatus(e.target.value)}
                    className="w-full text-xs rounded-xl bg-slate-50 border border-slate-205 py-2.5 px-3 focus:outline-hidden focus:border-blue-900 h-10"
                  >
                    <option value="Kekuatan Hukum Tetap (Inkracht)">Kekuatan Hukum Tetap (Inkracht)</option>
                    <option value="Banding Diajukan (Tergugat)">Banding Diajukan (PPID)</option>
                    <option value="Banding Diajukan (Penggugat)">Banding Diajukan (Pemohon)</option>
                    <option value="Kasasi Diajukan">Kasasi Diajukan</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Amar Putusan (Ringkasan Diktum)</label>
                <textarea
                  required
                  rows={4}
                  value={verAmar}
                  onChange={(e) => setVerAmar(e.target.value)}
                  placeholder="Contoh: Mengabulkan permohonan keberatan Pemohon informasi untuk seluruhnya; Menyatakan dokumen RKA tahun anggaran 2025 adalah dokumen terbuka..."
                  className="w-full text-xs rounded-xl bg-slate-50 border border-slate-205 py-2.5 px-3 focus:outline-hidden focus:border-blue-900 resize-none font-sans leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs transition-all shadow-md mt-4 cursor-pointer"
              >
                Upload &amp; Publikasi Putusan Baru
              </button>
            </form>
          )}

        </div>

        {/* Right Hand: Manage & Active items list (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 md:p-6 h-[720px] flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <h4 className="font-display font-extrabold text-sm text-slate-900 uppercase">Daftar Item Aktif di Sistem</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Kelola atau Hapus Secara Instan</p>
              </div>

              {/* 1. SCHEDULE LIST */}
              {activeSubTab === 'schedules' && (
                <div className="space-y-3 overflow-y-auto max-h-[580px] pr-1" id="admin-schedule-list flex-1">
                  {schedules.map((item) => (
                    <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-3.5 flex items-start justify-between gap-2.5 hover:border-slate-300 hover:shadow-xs transition-all">
                      <div className="space-y-1 overflow-hidden">
                        <span className="text-[8.5px] font-bold bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded-sm border border-amber-250/20 font-mono">
                          {item.id}
                        </span>
                        <h5 className="font-semibold text-xs text-blue-950 truncate max-w-[210px]">{item.paraPihak}</h5>
                        <p className="font-mono text-[10px] text-slate-500 leading-none">{item.nomorPerkara}</p>
                        <p className="text-[10px] text-slate-400 font-sans mt-1">Tanggal: {item.tanggal}</p>
                      </div>
                      <button
                        onClick={() => onDeleteSchedule(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-xl transition-all self-center"
                        title="Hapus Jadwal"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  ))}

                  {schedules.length === 0 && (
                    <div className="text-center py-12 text-slate-400">
                      <Calendar className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                      <p className="text-xs">Belum ada jadwal sidang terdaftar.</p>
                    </div>
                  )}
                </div>
              )}

              {/* 2. ANNOUNCEMENTS LIST */}
              {activeSubTab === 'announcements' && (
                <div className="space-y-3 overflow-y-auto max-h-[580px] pr-1" id="admin-announcement-list flex-1">
                  {announcements.map((item) => (
                    <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-3.5 flex items-start justify-between gap-2.5 hover:border-slate-300 hover:shadow-xs transition-all">
                      <div className="space-y-1 overflow-hidden">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-md border ${
                            item.penting ? 'bg-red-50 text-red-700 border-red-200' : 'bg-slate-50 text-slate-600 border-slate-200'
                          }`}>
                            {item.kategori}
                          </span>
                          <span className="text-[9px] text-slate-400 font-mono">{item.tanggal}</span>
                        </div>
                        <h5 className="font-semibold text-xs text-blue-950 truncate max-w-[210px] mt-1">{item.judul}</h5>
                        <p className="text-[10px] text-slate-400 max-w-[210px] truncate">{item.ringkasan}</p>
                      </div>
                      <button
                        onClick={() => onDeleteAnnouncement(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-xl transition-all self-center"
                        title="Hapus Pengumuman"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  ))}

                  {announcements.length === 0 && (
                    <div className="text-center py-12 text-slate-400">
                      <Megaphone className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                      <p className="text-xs">Belum ada pengumuman terdaftar.</p>
                    </div>
                  )}
                </div>
              )}

              {/* 3. VERDICTS LIST */}
              {activeSubTab === 'verdicts' && (
                <div className="space-y-3 overflow-y-auto max-h-[580px] pr-1" id="admin-verdict-list flex-1">
                  {verdicts.map((item) => (
                    <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-3.5 flex items-start justify-between gap-2.5 hover:border-slate-300 hover:shadow-xs transition-all">
                      <div className="space-y-1 overflow-hidden">
                        <span className="text-[8.5px] font-bold bg-blue-50 text-blue-800 px-1.5 py-0.5 rounded-sm border border-blue-200 font-mono">
                          {item.fileSize}
                        </span>
                        <h5 className="font-semibold text-xs text-blue-950 truncate max-w-[210px]">{item.paraPihak}</h5>
                        <p className="font-mono text-[9px] text-slate-400 leading-none">{item.nomorPerkara}</p>
                        <p className="text-[10px] text-slate-500 font-sans italic truncate max-w-[210px]">{item.klasifikasi}</p>
                      </div>
                      <button
                        onClick={() => onDeleteVerdict(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-xl transition-all self-center"
                        title="Hapus Putusan"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  ))}

                  {verdicts.length === 0 && (
                    <div className="text-center py-12 text-slate-400">
                      <FileText className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                      <p className="text-xs">Belum ada file putusan terdaftar.</p>
                    </div>
                  )}
                </div>
              )}

            </div>

            <div className="pt-4 border-t border-slate-200 text-[10px] text-slate-400 leading-relaxed font-mono">
              Sistem Penyelesaian Sengketa Informasi Publik (SIPSI) Jambi. Mengedepankan transparansi terpadu.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
