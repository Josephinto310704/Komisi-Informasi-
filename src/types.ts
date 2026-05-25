export interface JadwalSidang {
  id: string;
  nomorPerkara: string;
  jenisSidang: 'Perdata' | 'Pidana' | 'Agama' | 'Tata Usaha Negara';
  paraPihak: string;
  penggugat: string;
  tergugat: string;
  tanggal: string; // YYYY-MM-DD
  jam: string;
  ruang: string;
  agenda: string;
  majelisHakim: string[];
  status: 'Akan Datang' | 'Sedang Berlangsung' | 'Selesai' | 'Ditunda';
}

export interface Pengumuman {
  id: string;
  judul: string;
  ringkasan: string;
  konten: string;
  tanggal: string;
  kategori: 'Penting' | 'Prosedur' | 'Layanan' | 'Umum';
  penting: boolean;
}

export interface Putusan {
  id: string;
  nomorPerkara: string;
  klasifikasi: string;
  paraPihak: string;
  tanggalPutusan: string;
  amarPutusan: string; // Ringkasan Amar Putusan
  statusPutusan: string; // "Kekuatan Hukum Tetap (Inkracht)" atau "Banding" atau "Kasasi"
  fileSize: string;
  unduhCount: number;
}
