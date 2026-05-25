import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Send, Landmark, ShieldAlert, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function ContactFooter() {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubject, setFormSubject] = useState('Informasi Umum');
  const [formMessage, setFormMessage] = useState('');
  
  // Submission simulated status states
  const [submitState, setSubmitState] = useState<'idle' | 'kirim' | 'sukses'>('idle');
  const [complaintTicket, setComplaintTicket] = useState('');

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;

    setSubmitState('kirim');
    
    // Simulate API database submission delay
    setTimeout(() => {
      // Generate a realistic court case/ticket reference
      const randomTicket = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;
      setComplaintTicket(randomTicket);
      setSubmitState('sukses');

      // Clear form input fields
      setFormName('');
      setFormEmail('');
      setFormMessage('');
    }, 1500);
  };

  return (
    <footer id="contact" className="bg-slate-955 border-t border-slate-900 text-slate-300 pt-16 pb-8 scroll-mt-12">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        
        {/* Main Footer Layout Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 pb-12 border-b border-slate-900" id="footer-details-grid">
          
          {/* Col 1: Court Identity & General Office particulars (Col: 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-900 text-white shadow-md">
                <Landmark className="h-5.5 w-5.5" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-white text-base tracking-wide uppercase">REPUBLIK INDONESIA</h3>
                <p className="text-blue-400 text-xs font-bold tracking-wider uppercase">Komisi Informasi Provinsi Jambi</p>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              Situs integrasi data persidangan sengketa ini dikelola di bawah kendali SIPSI Komisi Informasi Provinsi Jambi, guna memberikan transparansi optimal atas penyelesaian sengketa informasi publik demi memperkuat tata kelola pemerintahan yang terbuka dan akuntabel sesuai UU KIP.
            </p>

            {/* Geographical & Telephony list group */}
            <div className="space-y-3.5 text-xs">
              
              <div className="flex items-start gap-3">
                <MapPin className="h-4.5 w-4.5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-bold block mb-0.5">Alamat Kantor Utama</span>
                  <p className="text-slate-400 leading-relaxed">
                    Jl. Rd. Pamuk No.37, Kel. Kasang, Kec. Jambi Timur, Kota Jambi, Provinsi Jambi 36141
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-4.5 w-4.5 text-blue-400 shrink-0" />
                <div>
                  <span className="text-white font-bold block mb-0.5">Hubungi Kami (Telepon &amp; Fax)</span>
                  <p className="text-slate-400 font-mono">
                    (0741) 306-1544 / komisi.informasi@jambiprov.go.id
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-4.5 w-4.5 text-blue-400 shrink-0" />
                <div>
                  <span className="text-white font-bold block mb-0.5">Surat Elektronik (Email Resmi)</span>
                  <p className="text-slate-400 font-mono">
                    sekretariat@ki.jambiprov.go.id
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-4.5 w-4.5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-bold block mb-0.5">Jam Kerja Pelayanan Publik Terpadu Satu Pintu (PTSP)</span>
                  <p className="text-slate-400 leading-relaxed">
                    Senin - Kamis : 08:00 - 16:30 WIB <span className="text-slate-500">•</span> Jumat : 08:00 - 17:00 WIB
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Col 2: High-Quality Interactive Inquiry / Complaint Form (Col: 7) */}
          <div className="lg:col-span-7 bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-8" id="footer-complaint-section">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4.5">
              <div>
                <h4 className="font-display font-extrabold text-white text-base">Kotak Saran &amp; Pengaduan Layanan</h4>
                <p className="text-xs text-slate-500 mt-0.5">Laporkan keluhan, gangguan sarana, demi pembenahan pelayanan peradilan berkelanjutan.</p>
              </div>
              <span className="bg-red-950/70 text-red-400 text-[10px] font-bold border border-red-900/40 px-2.5 py-1 rounded-lg flex items-center gap-1 self-start sm:self-auto uppercase tracking-wider">
                <ShieldAlert className="h-3.5 w-3.5" /> Pos Anti-Gratifikasi
              </span>
            </div>

            {submitState === 'sukses' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-950/30 border border-emerald-800/80 rounded-2xl p-6 text-center text-emerald-300 space-y-4"
              >
                <div className="mx-auto h-11 w-11 rounded-full bg-emerald-900/50 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div className="space-y-1.5">
                  <h5 className="font-display font-extrabold text-base text-white">Saran &amp; Aspirasi Berhasil Dikirim</h5>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
                    Terima kasih atas kepedulian Anda. Laporan Anda telah dicatat di Unit Pengaduan SIPSI Komisi Informasi Provinsi Jambi.
                  </p>
                </div>
                {/* Simulated Complaint Tracking number */}
                <div className="bg-slate-950 border border-emerald-850 rounded-2xl p-4 inline-block font-mono text-xs text-center">
                  <span className="text-[10px] text-emerald-400 block font-bold uppercase tracking-widest mb-1">KODE REGISTRASI TIKET</span>
                  <span className="text-white font-extrabold select-all tracking-wider font-mono">{complaintTicket}</span>
                </div>
                <div>
                  <button
                    onClick={() => setSubmitState('idle')}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all animate-pulse"
                  >
                    Kirim Pesan Lainnya
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3.5 text-xs">
                
                {/* Row inputs: name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label htmlFor="comp-name" className="text-slate-400 font-bold block">Nama Lengkap Pengirim</label>
                    <input
                      id="comp-name"
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Ketik nama Anda sesuai KTP"
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 py-3 px-4 text-slate-200 placeholder-slate-600 focus:border-blue-900 focus:outline-hidden focus:ring-1 focus:ring-blue-900"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="comp-email" className="text-slate-400 font-bold block">Email Aktif / Pembaharuan Balasan</label>
                    <input
                      id="comp-email"
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="alamat@contohemail.com"
                      className="w-full rounded-xl bg-slate-955 border border-slate-800 py-3 px-4 text-slate-200 placeholder-slate-600 focus:border-blue-900 focus:outline-hidden focus:ring-1 focus:ring-blue-900"
                    />
                  </div>
                </div>

                {/* Subyek Select */}
                <div className="space-y-1.5">
                  <label htmlFor="comp-subject" className="text-slate-400 font-bold block">Subjek / Klasifikasi Aspirasi Laporan</label>
                  <select
                    id="comp-subject"
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    className="w-full rounded-xl bg-slate-955 border border-slate-800 py-3 px-4 text-slate-305 focus:border-blue-900 focus:outline-hidden h-11 focus:ring-1 focus:ring-blue-900"
                  >
                    <option value="Informasi Umum">Informasi &amp; Penjadwalan Sidang Sengketa (Pertanyaan)</option>
                    <option value="Antrean Sidang">Antrean Pelayanan Sekretariat / Ruang Sidang Sengketa</option>
                    <option value="Pengaduan Sarana">Masalah Kebersihan &amp; Kelengkapan Sarana Publik</option>
                    <option value="Integritas Petugas">Laporan Gratifikasi / Pelanggaran Etika Petugas</option>
                  </select>
                </div>

                {/* Message Body */}
                <div className="space-y-1.5">
                  <label htmlFor="comp-msg" className="text-slate-400 font-bold block">Uraian Detail Keluhan / Saran Keberatan</label>
                  <textarea
                    id="comp-msg"
                    required
                    rows={3}
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Tuliskan pengaduan Anda secara mendalam beserta nomor perkara (bila ada) demi mempermudah tim tindak lanjut..."
                    className="w-full rounded-xl bg-slate-955 border border-slate-800 py-3 px-4 text-slate-200 placeholder-slate-600 focus:border-blue-900 focus:outline-hidden resize-none leading-relaxed focus:ring-1 focus:ring-blue-900"
                  ></textarea>
                </div>

                {/* Action submit */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[10px] text-slate-500">
                  <span className="flex items-center gap-1.5 leading-relaxed">
                    <ShieldAlert className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                    <span>Laporan dilindungi UU KIP &amp; Undang-Undang Perlindungan Data Pribadi.</span>
                  </span>
                  
                  <button
                    type="submit"
                    disabled={submitState === 'kirim'}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold px-6 py-3 text-xs disabled:opacity-50 tracking-wider transition-all cursor-pointer shadow-md"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>{submitState === 'kirim' ? 'Mengirim Aspirasi...' : 'Kirim Aspirasi'}</span>
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>

        {/* Outer Legal Trademark / Safety Disclaimer Bottom Row */}
        <div className="pt-8 text-center sm:text-left flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 leading-relaxed font-sans" id="footer-bottom-info">
          <div>
            <p>© 2026 Komisi Informasi Provinsi Jambi. Seluruh Hak Cipta Dilindungi Undang-Undang.</p>
            <p className="mt-0.5">SIPSI Portal V1.2.0 • Mengutamakan Keterbukaan Informasi Publik &amp; Kepastian Hukum.</p>
          </div>
          
          <div className="flex flex-wrap gap-4 text-[11px] justify-center sm:justify-start font-medium text-slate-400">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-blue-400 transition-colors">Kebijakan Privasi</a>
            <span>•</span>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-blue-400 transition-colors">Syarat Penggunaan SIPSI</a>
            <span>•</span>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-blue-400 transition-colors">Peta Situs</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
