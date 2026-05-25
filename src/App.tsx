import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowDown, HelpCircle, CheckCircle2, ShieldCheck, BookmarkCheck } from 'lucide-react';

import Header from './components/Header';
import Hero from './components/Hero';
import Announcements from './components/Announcements';
import ScheduleSection from './components/ScheduleSection';
import VerdictSection from './components/VerdictSection';
import ContactFooter from './components/ContactFooter';
import AdminPanel from './components/AdminPanel';
import AdminLoginModal from './components/AdminLoginModal';

import { MOCK_JADWAL, MOCK_PENGUMUMAN, MOCK_PUTUSAN } from './data';
import { JadwalSidang, Pengumuman, Putusan } from './types';

export default function App() {
  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    const savedSession = localStorage.getItem('sipsi_admin_auth');
    return savedSession === 'true';
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [searchQueryFromHero, setSearchQueryFromHero] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Live state syncing with LocalStorage
  const [schedules, setSchedules] = useState<JadwalSidang[]>(() => {
    const saved = localStorage.getItem('sipsi_schedules');
    return saved ? JSON.parse(saved) : MOCK_JADWAL;
  });

  const [announcements, setAnnouncements] = useState<Pengumuman[]>(() => {
    const saved = localStorage.getItem('sipsi_announcements');
    return saved ? JSON.parse(saved) : MOCK_PENGUMUMAN;
  });

  const [verdicts, setVerdicts] = useState<Putusan[]>(() => {
    const saved = localStorage.getItem('sipsi_verdicts');
    return saved ? JSON.parse(saved) : MOCK_PUTUSAN;
  });

  // Action methods with storage syncing
  const handleAddSchedule = (sch: JadwalSidang) => {
    const updated = [sch, ...schedules];
    setSchedules(updated);
    localStorage.setItem('sipsi_schedules', JSON.stringify(updated));
  };

  const handleAddAnnouncement = (ann: Pengumuman) => {
    const updated = [ann, ...announcements];
    setAnnouncements(updated);
    localStorage.setItem('sipsi_announcements', JSON.stringify(updated));
  };

  const handleAddVerdict = (ver: Putusan) => {
    const updated = [ver, ...verdicts];
    setVerdicts(updated);
    localStorage.setItem('sipsi_verdicts', JSON.stringify(updated));
  };

  const handleDeleteSchedule = (id: string) => {
    const updated = schedules.filter(s => s.id !== id);
    setSchedules(updated);
    localStorage.setItem('sipsi_schedules', JSON.stringify(updated));
  };

  const handleDeleteAnnouncement = (id: string) => {
    const updated = announcements.filter(a => a.id !== id);
    setAnnouncements(updated);
    localStorage.setItem('sipsi_announcements', JSON.stringify(updated));
  };

  const handleDeleteVerdict = (id: string) => {
    const updated = verdicts.filter(v => v.id !== id);
    setVerdicts(updated);
    localStorage.setItem('sipsi_verdicts', JSON.stringify(updated));
  };

  // Compute stats
  const activeSchedulesCount = schedules.filter(s => s.status !== 'Selesai').length;
  const newVerdictsCount = verdicts.length;
  const todaySchedulesCount = schedules.filter(s => s.tanggal === '2026-05-25').length;
  const ongoingSchedulesCount = schedules.filter(s => s.status === 'Sedang Berlangsung').length;

  const handleHeroSearchSubmit = (category: 'sidang' | 'putusan', query: string) => {
    setSearchQueryFromHero(query);
    
    // Trigger smooth scroll to target section
    const targetId = category === 'sidang' ? 'schedules' : 'verdicts';
    const element = document.getElementById(targetId);
    
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Show temporary custom flash toast to user
      const categoryLabel = category === 'sidang' ? 'Jadwal Sidang' : 'Direktori Putusan';
      setToastMessage(`Menyaring ${categoryLabel} dengan kata kunci: "${query}"`);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const handleHeaderSearchFocus = (type: 'sidang' | 'putusan') => {
    const targetId = type === 'sidang' ? 'schedules' : 'verdicts';
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Highlight the search input
      const inputId = type === 'sidang' ? 'search-input' : 'verdict-controls';
      const inputEl = document.getElementById(inputId) || document.querySelector(`#${targetId} input`);
      if (inputEl) {
        (inputEl as HTMLInputElement).focus();
      }
    }
  };

  const handleToggleAdminMode = () => {
    if (isAdminMode) {
      setIsAdminMode(false);
      localStorage.removeItem('sipsi_admin_auth');
      setToastMessage('🔒 Mode Admin ditutup dan dikunci kembali.');
      setTimeout(() => setToastMessage(null), 3000);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdminMode(true);
    localStorage.setItem('sipsi_admin_auth', 'true');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased selection:bg-gold-200 selection:text-slate-900">
      
      {/* Top sticky bar and main hero modules */}
      <Header 
        onSearchFocus={handleHeaderSearchFocus} 
        activeSchedulesCount={activeSchedulesCount}
        newVerdictsCount={newVerdictsCount}
        isAdminMode={isAdminMode}
        onToggleAdminMode={handleToggleAdminMode}
      />

      {/* Admin Passcode Gate Validation overlay */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <AdminLoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
            onLoginSuccess={handleLoginSuccess}
            currentToastMsg={(msg) => {
              setToastMessage(msg);
              setTimeout(() => setToastMessage(null), 4000);
            }}
          />
        )}
      </AnimatePresence>

      <main>
        {/* Dynamic hero block with search portal */}
        <Hero 
          onSearchSubmit={handleHeroSearchSubmit}
          todaySchedulesCount={todaySchedulesCount}
          ongoingSchedulesCount={ongoingSchedulesCount}
          totalVerdictsCount={newVerdictsCount}
        />

        {/* Real-time Administrator Command Centre */}
        <AnimatePresence>
          {isAdminMode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98, height: 0 }}
              animate={{ opacity: 1, scale: 1, height: 'auto' }}
              exit={{ opacity: 0, scale: 0.98, height: 0 }}
              className="overflow-hidden mx-auto max-w-7xl px-4 md:px-8 my-8"
              id="admin-panel-container"
            >
              <AdminPanel
                schedules={schedules}
                announcements={announcements}
                verdicts={verdicts}
                onAddSchedule={handleAddSchedule}
                onAddAnnouncement={handleAddAnnouncement}
                onAddVerdict={handleAddVerdict}
                onDeleteSchedule={handleDeleteSchedule}
                onDeleteAnnouncement={handleDeleteAnnouncement}
                onDeleteVerdict={handleDeleteVerdict}
                onClose={handleToggleAdminMode}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic floating alert toast notifier */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 50, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 20, x: '-50%' }}
              className="fixed bottom-6 left-1/2 z-50 flex items-center gap-2.5 rounded-full bg-slate-900 px-5 py-3 text-xs font-semibold text-white shadow-xl border border-slate-800"
              id="global-toast-message"
            >
              <BookmarkCheck className="h-4.5 w-4.5 text-gold-400 shrink-0" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 1. SCHEDULES PERSIDANGAN SECTION */}
        <div className="relative">
          <ScheduleSection 
            schedules={schedules} 
            searchQueryFromHero={searchQueryFromHero}
          />
        </div>

        {/* 2. ANNOUNCEMENTS / PENGUMUMAN SECTION */}
        <div className="border-t border-b border-slate-200">
          <Announcements 
            announcements={announcements}
          />
        </div>

        {/* 3. VERDICTS / PUTUSAN SECTION */}
        <div>
          <VerdictSection 
            verdicts={verdicts}
            searchQueryFromHero={searchQueryFromHero}
          />
        </div>

        {/* 4. GUIDELINES QUICK BANNER */}
        <section className="bg-slate-900 text-white border-t border-slate-850 py-12">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 border border-slate-800 p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
              <div className="space-y-3 max-w-2xl text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 text-blue-400 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Sistem Keterbukaan Informasi Publik Jambi</span>
                </div>
                <h3 className="font-display font-bold text-xl md:text-2xl tracking-tight text-white leading-tight">
                  Tingkatkan Kesadaran dan Kepatuhan Informasi Publik
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Semua pengajuan permohonan penyelesaian sengketa informasi (PSI) terfasilitasi secara aman melalui SIPSI demi penegakan keterbukaan informasi yang adil, transparan, dan akuntabel di instansi pemerintah Provinsi Jambi.
                </p>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <a
                  href="https://ki.jambiprov.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 text-xs font-bold transition-all shadow-md"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Kunjungi Portal Resmi KI Jambi</span>
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Main Footer contact block */}
      <ContactFooter />

    </div>
  );
}
