import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Eye, EyeOff, Lock, X, AlertCircle, KeyRound } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  currentToastMsg: (msg: string) => void;
}

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess, currentToastMsg }: AdminLoginModalProps) {
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitActive, setIsSubmitActive] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPasscode('');
      setErrorMsg(null);
      setIsShaking(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsShaking(false);

    const configuredPasscode = (import.meta as any).env.VITE_ADMIN_PASSCODE || 'jambi2026';

    if (!passcode.trim()) {
      setErrorMsg('Kode sandi tidak boleh kosong');
      setIsShaking(true);
      return;
    }

    if (passcode.trim() === configuredPasscode) {
      currentToastMsg('🔓 Akses Diterima. Selamat datang di Portal Admin SIPSI Jambi!');
      onLoginSuccess();
      onClose();
    } else {
      setErrorMsg('Kode sandi admin tidak sah. Silakan coba lagi!');
      setIsShaking(true);
      // Trigger short shake visual timeout helper
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Semi-transparent dark blur backdrop sheet */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
        id="login-modal-backdrop"
      />

      {/* Main interactive Login Card container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          y: 0,
          x: isShaking ? [0, -8, 8, -6, 6, -3, 3, 0] : 0
        }}
        transition={{
          duration: isShaking ? 0.4 : 0.25,
          type: isShaking ? 'linear' : 'spring',
          stiffness: 300,
          damping: 25
        }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-slate-250 bg-white shadow-2xl"
        id="login-modal-card"
      >
        {/* Top Header branding strap */}
        <div className="bg-gradient-to-r from-blue-950 to-blue-900 px-6 py-6 text-white relative">
          <div className="absolute top-0 right-0 h-28 w-28 rounded-full bg-amber-500/10 blur-2xl"></div>
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-blue-100 transition-colors cursor-pointer min-h-[36px] min-w-[36px]"
            title="Batal"
            id="login-close-btn"
          >
            <X className="h-4.5 w-4.5" />
          </button>

          <div className="flex items-center gap-3 relative z-10">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-slate-950 border border-amber-400 font-bold shadow-md">
              <KeyRound className="h-5.5 w-5.5" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold tracking-tight">Verifikasi Administrator</h3>
              <p className="text-[10px] text-slate-300 font-mono tracking-wider mt-0.5">SIPSI Jambi • Secure Gate</p>
            </div>
          </div>
        </div>

        {/* Content & Validation Form block */}
        <form onSubmit={handleLoginSubmit} className="p-6 space-y-5">
          <div className="space-y-2">
            <div className="rounded-xl bg-amber-50 border border-amber-150 p-3.5 text-amber-900 text-xs leading-relaxed">
              <p className="font-semibold flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-amber-700" />
                <span>Pembatasan Otoritas Akses</span>
              </p>
              <p className="mt-1 text-slate-600 font-normal">
                Panel ini dikunci secara aman dari umum. Masukkan Kode Sandi Admin utama Komisi Informasi Provinsi Jambi untuk mengaktifkan pengaturan.
              </p>
            </div>
          </div>

          <div className="space-y-1.5 focus-within:text-blue-950">
            <label htmlFor="admin-passcode-field" className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
              Kode Akses Utama Admin
            </label>
            <div className="relative">
              <input
                id="admin-passcode-field"
                type={showPassword ? 'text' : 'password'}
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (errorMsg) setErrorMsg(null);
                }}
                placeholder="Masukkan kode sandi adm..."
                autoFocus
                className="w-full rounded-xl bg-slate-50 border border-slate-200 py-3 pl-10 pr-10 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:border-blue-900 focus:bg-white focus:outline-hidden transition-all min-h-[44px]"
              />
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer min-h-[36px]"
                title={showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Validation Error messaging */}
          {errorMsg && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-100 p-3 text-xs text-red-800"
            >
              <AlertCircle className="h-4.5 w-4.5 shrink-0 text-red-600 mt-0.5" />
              <span className="font-medium leading-relaxed">{errorMsg}</span>
            </motion.div>
          )}

          {/* Footer controls for Dialog */}
          <div className="pt-2 flex gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-250 bg-white hover:bg-slate-50 py-3 text-xs font-bold text-slate-700 active:scale-98 transition-all min-h-[44px] cursor-pointer"
            >
              Kembali (Batal)
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-blue-900 hover:bg-blue-850 text-white font-bold py-3 text-xs active:scale-98 transition-all shadow-sm shadow-blue-900/10 min-h-[44px] cursor-pointer"
              id="login-submit-btn"
            >
              Buka Kunci Akses
            </button>
          </div>
        </form>

        {/* Dynamic note explaining default password */}
        <div className="bg-slate-50 border-t border-slate-100 px-6 py-4.5 text-center">
          <p className="text-[10px] text-slate-400 leading-normal">
            Catatan: Kode sandi bawaan adalah <code className="font-mono bg-slate-205 border border-slate-250 rounded-sm px-1 py-0.5 text-slate-700 font-bold">jambi2026</code>. 
            Anda dapat menyesuaikannya melalui pengaturan file kunci lingkungan <code className="font-mono text-slate-500 font-bold">VITE_ADMIN_PASSCODE</code>.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
