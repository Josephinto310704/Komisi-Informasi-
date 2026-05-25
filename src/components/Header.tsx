import { useState, useEffect } from 'react';
import { Landmark, Scale, Clock, Bell, FileText, Search } from 'lucide-react';

interface HeaderProps {
  onSearchFocus: (type: 'sidang' | 'putusan') => void;
  activeSchedulesCount: number;
  newVerdictsCount: number;
}

export default function Header({ onSearchFocus, activeSchedulesCount, newVerdictsCount }: HeaderProps) {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      // Calculate GMT +7 (WIB) or just display beautiful local time
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      };
      // Format to Indonesian locale
      setTimeStr(now.toLocaleDateString('id-ID', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
      {/* Top micro bar for announcement and clock */}
      <div className="bg-blue-950 px-4 py-2.5 text-xs text-blue-100 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-400" id="live-indicator"></span>
            <span className="font-semibold">Portal Resmi Komisi Informasi Provinsi Jambi • Transparansi Informasi Publik</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 bg-blue-900/50 px-3 py-1 rounded-sm text-blue-200">
              <Clock className="h-3.5 w-3.5 text-amber-400" />
              <span className="font-mono">{timeStr || 'Memuat waktu...'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        {/* Brand Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="flex cursor-pointer items-center gap-3 transition-opacity hover:opacity-90"
          id="brand-logo"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-900 border border-blue-800 text-amber-300 shadow-sm">
            <Landmark className="h-5.5 w-5.5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-display text-base font-bold tracking-tight text-slate-900 md:text-lg">KOMISI INFORMASI</span>
              <span className="rounded-md bg-amber-50 border border-amber-200 px-1.5 py-0.5 text-[9px] font-bold text-amber-800">KI</span>
            </div>
            <h1 className="font-display text-xs font-semibold tracking-wider text-slate-500 uppercase leading-none mt-1">
              Provinsi Jambi • Portal Sengketa &amp; Putusan
            </h1>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 text-sm font-semibold text-slate-600 lg:flex" id="desktop-nav">
          <button 
            onClick={() => scrollToSection('schedules')} 
            className="rounded-xl px-3.5 py-2 hover:bg-slate-50 hover:text-blue-900 transition-colors"
          >
            Jadwal Sidang
          </button>
          <button 
            onClick={() => scrollToSection('announcements')} 
            className="rounded-xl px-3.5 py-2 hover:bg-slate-50 hover:text-blue-900 transition-colors"
          >
            Pengumuman
          </button>
          <button 
            onClick={() => scrollToSection('verdicts')} 
            className="rounded-xl px-3.5 py-2 hover:bg-slate-50 hover:text-blue-900 transition-colors"
          >
            Direktori Putusan
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="rounded-xl px-3.5 py-2 hover:bg-slate-50 hover:text-blue-900 transition-colors"
          >
            Kontak &amp; Pengaduan
          </button>
        </nav>

        {/* Interactive Badges & Shortcut CTA */}
        <div className="flex items-center gap-2.5">
          {/* Quick search shortcuts */}
          <button
            onClick={() => onSearchFocus('sidang')}
            className="hidden items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-105 sm:flex"
            title="Cari nomor perkara siding"
            id="shortcut-schedules"
          >
            <Search className="h-3 w-3 text-blue-600" />
            <span>Cari Sidang</span>
            <span className="rounded bg-slate-200 px-1 py-0.5 text-[9px] font-mono font-bold text-slate-500">{activeSchedulesCount}</span>
          </button>

          <button
            onClick={() => onSearchFocus('putusan')}
            className="hidden items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-105 sm:flex"
            title="Cari nomor putusan hukuman"
            id="shortcut-verdicts"
          >
            <FileText className="h-3 w-3 text-blue-600" />
            <span>Cari Putusan</span>
            <span className="rounded bg-slate-200 px-1 py-0.5 text-[9px] font-mono font-bold text-slate-500">{newVerdictsCount}</span>
          </button>

          {/* Scale brand identifier badge */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700 border border-amber-200 animate-pulse" title="Keadilan Terjamin">
            <Scale className="h-5 w-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
