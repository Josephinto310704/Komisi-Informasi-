import { JadwalSidang, Pengumuman, Putusan } from './types';

export const MOCK_JADWAL: JadwalSidang[] = [
  {
    id: '1',
    nomorPerkara: '142/Pdt.G/2026/PN.Jkt.Pst',
    jenisSidang: 'Perdata',
    paraPihak: 'PT Maju Bersama vs PT Sentosa Abadi',
    penggugat: 'PT Maju Bersama (Kuasa Hukum: Budi Santoso, S.H.)',
    tergugat: 'PT Sentosa Abadi (Kuasa Hukum: Linda Wijaya, S.H.)',
    tanggal: '2026-05-25',
    jam: '09:00 - selesai',
    ruang: 'Ruang Kartika (Utama)',
    agenda: 'Pembuktian Dokumen Surat dari Penggugat',
    majelisHakim: ['Dr. H. Heru Pramono, S.H., M.H.', 'Amirudin, S.H., M.Hum.', 'Siti Rahma, S.H., M.H.'],
    status: 'Sedang Berlangsung'
  },
  {
    id: '2',
    nomorPerkara: '412/Pid.B/2026/PN.Jkt.Pst',
    jenisSidang: 'Pidana',
    paraPihak: 'Kejaksaan Negeri Jakarta Pusat vs Sugeng Riyadi',
    penggugat: 'Jaksa Penuntut Umum (Rian Hidayat, S.H.)',
    tergugat: 'Sugeng Riyadi (Terdakwa, Didampingi LBH Keadilan)',
    tanggal: '2026-05-25',
    jam: '10:30 - selesai',
    ruang: 'Ruang Cakra',
    agenda: 'Pemeriksaan Keterangan Saksi Ahli Pidana',
    majelisHakim: ['Sutrisno, S.H., M.H.', 'Fahmi Idris, S.H.', 'Ria Astuti, S.H., M.H.'],
    status: 'Akan Datang'
  },
  {
    id: '3',
    nomorPerkara: '891/Pdt.G/2026/PA.Jkt.Pst',
    jenisSidang: 'Agama',
    paraPihak: 'Ahmad Fauzi vs Siti Aminah',
    penggugat: 'Ahmad Fauzi',
    tergugat: 'Siti Aminah',
    tanggal: '2026-05-25',
    jam: '11:00 - selesai',
    ruang: 'Ruang Sidang III',
    agenda: 'Mediasi Lanjutan Antara Para Pihak',
    majelisHakim: ['Drs. H. Ahmad Yani, M.H.', 'Dra. Hj. Nurjanah, M.A.', 'H. Syamsul Bahri, S.H.'],
    status: 'Akan Datang'
  },
  {
    id: '4',
    nomorPerkara: '45/G/2026/PTUN.JKT',
    jenisSidang: 'Tata Usaha Negara',
    paraPihak: 'Yayasan Lingkungan Hijau vs Kepala Dinas Lingkungan Hidup DKI Jakarta',
    penggugat: 'Yayasan Lingkungan Hijau (Advokat: Faris Muhammad, S.H.)',
    tergugat: 'Kepala Dinas Lingkungan Hidup DKI Jakarta (Kuasa Hukum Pemprov)',
    tanggal: '2026-05-25',
    jam: '13:00 - selesai',
    ruang: 'Ruang Sidang Utama PTUN',
    agenda: 'Penyampaian Replik oleh Penggugat',
    majelisHakim: ['Muliyadi, S.H., M.H.', 'Aris Kelana, S.H.', 'Dewi Lestari, S.H., M.Hum.'],
    status: 'Akan Datang'
  },
  {
    id: '5',
    nomorPerkara: '115/Pid.Sus/2026/PN.Jkt.Pst',
    jenisSidang: 'Pidana',
    paraPihak: 'Kejaksaan Negeri Jakarta Pusat vs PT Global Tech (Pelanggaran ITE)',
    penggugat: 'Jaksa Penuntut Umum (Dian Lestari, S.H.)',
    tergugat: 'PT Global Tech (Direktur Utama Hendra, S.Kom.)',
    tanggal: '2026-05-26',
    jam: '09:30 - selesai',
    ruang: 'Ruang Kusuma Atmaja',
    agenda: 'Pembacaan Eksepsi / Tanggapan Terdakwa',
    majelisHakim: ['H. Hariadi, S.H., M.H.', 'Hj. Endang Sri, S.H.', 'Bambang S., S.H., M.Si.'],
    status: 'Akan Datang'
  },
  {
    id: '6',
    nomorPerkara: '201/Pdt.G/2026/PN.Jkt.Pst',
    jenisSidang: 'Perdata',
    paraPihak: 'Rudi Hartono vs Bank Pembangunan Negeri',
    penggugat: 'Rudi Hartono',
    tergugat: 'Bank Pembangunan Negeri Tbk.',
    tanggal: '2026-05-26',
    jam: '10:00 - selesai',
    ruang: 'Ruang Kartika (Utama)',
    agenda: 'Pembacaan Gugatan Penggugat',
    majelisHakim: ['Dr. H. Heru Pramono, S.H., M.H.', 'Amirudin, S.H., M.Hum.', 'Siti Rahma, S.H., M.H.'],
    status: 'Akan Datang'
  },
  {
    id: '7',
    nomorPerkara: '304/Pid.A/2026/PN.Jkt.Pst',
    jenisSidang: 'Pidana',
    paraPihak: 'Negara vs Randy Pratama (Pelanggaran Lalu Lintas Berat)',
    penggugat: 'JPU Jakarta Pusat',
    tergugat: 'Randy Pratama',
    tanggal: '2026-05-24',
    jam: '10:00 - 12:00',
    ruang: 'Ruang Cakra',
    agenda: 'Pembacaan Putusan Akhir',
    majelisHakim: ['Sutrisno, S.H., M.H.', 'Fahmi Idris, S.H.', 'Ria Astuti, S.H., M.H.'],
    status: 'Selesai'
  },
  {
    id: '8',
    nomorPerkara: '95/Pdt.P/2026/PN.Jkt.Pst',
    jenisSidang: 'Perdata',
    paraPihak: 'Permohonan Perubahan Nama Indah Permata',
    penggugat: 'Indah Permata (Pemohon)',
    tergugat: 'Nihil / Sifat Permohonan',
    tanggal: '2026-05-27',
    jam: '11:00 - selesai',
    ruang: 'Ruang Sidang Anak',
    agenda: 'Pemeriksaan Bukti Surat & Saksi Pemohon',
    majelisHakim: ['Wahyudi, S.H., M.H.'],
    status: 'Akan Datang'
  },
  {
    id: '9',
    nomorPerkara: '78/G/2026/PTUN.JKT',
    jenisSidang: 'Tata Usaha Negara',
    paraPihak: 'Drs. H. Mulyono vs Kepolisian Daerah Metro Jaya',
    penggugat: 'Drs. H. Mulyono',
    tergugat: 'Kepala Kepolisian Daerah Metro Jaya',
    tanggal: '2026-05-25',
    jam: '09:00 - selesai',
    ruang: 'Ruang Sidang Kartika PTUN',
    agenda: 'Sidang Pembacaan Putusan Sela',
    majelisHakim: ['Muliyadi, S.H., M.H.', 'Aris Kelana, S.H.', 'Dewi Lestari, S.H., M.Hum.'],
    status: 'Selesai'
  },
  {
    id: '10',
    nomorPerkara: '122/Pdt.G/2026/PN.Jkt.Pst',
    jenisSidang: 'Perdata',
    paraPihak: 'PT Cipta Karya vs CV Kayu Jati',
    penggugat: 'PT Cipta Karya',
    tergugat: 'CV Kayu Jati',
    tanggal: '2026-05-23',
    jam: '09:00 - selesai',
    ruang: 'Ruang Kartika (Utama)',
    agenda: 'Penyampaian Kesimpulan Para Pihak',
    majelisHakim: ['Rudi Hartoyo, S.H., M.H.', 'Herman, S.H.', 'Indriani, S.H.'],
    status: 'Selesai'
  }
];

export const MOCK_PENGUMUMAN: Pengumuman[] = [
  {
    id: 'n1',
    judul: 'Penyesuaian Prosedur dan Alur Persidangan Tatap Muka Selama Semester II 2026',
    ringkasan: 'Mengacu pada SK KMA No. 84/2026, seluruh persidangan pidana diimbau memanfaatkan e-Court untuk penyerahan berkas awal guna memangkas antrean fisik.',
    konten: 'Dalam rangka meningkatkan transparansi, kenyamanan, dan ketertiban di lingkungan pengadilan, Mahkamah Agung mengeluarkan instruksi penyesuaian tata tertib ruang sidang. Akses pengunjung ke area steril ruang sidang dibatasi maksimal 20 orang per ruangan. Seluruh penasihat hukum diwajibkan mendaftarkan akun e-Court aktif serta menyerahkan dokumen administrasi, replik, dan duplik secara digital paling lambat H-1 pukul 16:00 WIB melalui portal resmi Mahkamah Agung Republik Indonesia.',
    tanggal: '2026-05-24',
    kategori: 'Penting',
    penting: true
  },
  {
    id: 'n2',
    judul: 'Panduan e-Court Pengadilan: Pendaftaran Gugatan dan Pembayaran Biaya Perkara',
    ringkasan: 'Panduan teknis langkah-demi-langkah bagi masyarakat umum dan praktisi hukum dalam mengajukan perkara perdata atau TUN secara online.',
    konten: 'Layanan e-Court Pengadilan terus diperbarui untuk memberikan efisiensi pendaftaran perkara (e-Filing), taksiran panjar biaya perkara secara elektronik (e-Payment), pemanggilan sidang secara elektronik (e-Summons), dan persidangan elektronik secara hybrid (e-Litigation). Pastikan Anda telah melakukan verifikasi Kartu Tanda Anggota (KTA) bagi Advokat, atau menggunakan KTP/NIK tervalidasi Dukcapil bagi pendaftar Perseorangan Non-Advokat sebelum melakukan transaksi.',
    tanggal: '2026-05-20',
    kategori: 'Prosedur',
    penting: false
  },
  {
    id: 'n3',
    judul: 'Layanan Mobil Konsultasi & Pos Bantuan Hukum (Posbakum) Keliling Gratis',
    ringkasan: 'Posbakum kini hadir mendekat ke beberapa kelurahan di Jakarta Pusat setiap hari Rabu untuk memberikan bantuan hukum gratis.',
    konten: 'Untuk memastikan hak atas keadilan (access to justice) dapat dijangkau oleh seluruh kalangan masyarakat, khususnya masyarakat kurang mampu secara ekonomi, Pos Bantuan Hukum (Posbakum) meluncurkan armada mobil layanan hukum keliling gratis. Layanan mencakup konsultasi hukum umum, pembuatan dokumen surat gugatan/permohonan secara mandiri (self-help desk), serta pendampingan awal perkara pidana dan perdata.',
    tanggal: '2026-05-18',
    kategori: 'Layanan',
    penting: false
  },
  {
    id: 'n4',
    judul: 'Pemberitahuan Penundaan Sidang Terkait Cuti Bersama Nasional Mei 2026',
    ringkasan: 'Seluruh sidang yang dijadwalkan pada hari libur resmi nasional ditiadakan dan dijadwalkan ulang otomatis oleh sistem SIPP.',
    konten: 'Berkoordinasi dengan Pengadilan Tinggi dan Surat Edaran Bersama Kementerian, kami memberitahukan bahwa seluruh kegiatan operasional persidangan ditiadakan selama hari libur nasional. Penundaan jadwal sidang perdata maupun pidana akan diperbarui secara otomatis pada sistem aplikasi SIPP pengadilan dan dikirimkan konversinya via email penasihat hukum masing-masing. Silakan periksa kolom pencarian jadwal pada website ini untuk perubahan kepastian tanggal sidang Anda.',
    tanggal: '2026-05-15',
    kategori: 'Umum',
    penting: true
  }
];

export const MOCK_PUTUSAN: Putusan[] = [
  {
    id: 'p1',
    nomorPerkara: '112/Pdt.G/2026/PN.Jkt.Pst',
    klasifikasi: 'Wanprestasi Kedinasan / Hak Cipta',
    paraPihak: 'CV Kreasi Nusantara vs PT Digital Global Mandiri',
    tanggalPutusan: '2026-05-22',
    amarPutusan: 'Mengabulkan gugatan Penggugat untuk sebagian; Menyatakan Tergugat telah melakukan wanprestasi atas perjanjian pemakaian lisensi perangkat lunak; Menghukum Tergugat untuk membayar ganti kerugian materiil sebesar Rp550.000.000,00 secara tunai; Menolak gugatan Penggugat selain dan selebihnya.',
    statusPutusan: 'Kekuatan Hukum Tetap (Inkracht)',
    fileSize: '2.4 MB',
    unduhCount: 142
  },
  {
    id: 'p2',
    nomorPerkara: '243/Pid.B/2026/PN.Jkt.Pst',
    klasifikasi: 'Penipuan dan Penggelapan Kontrak Konstruksi',
    paraPihak: 'Negara (JPU) vs Hendrawan Tanudjaja',
    tanggalPutusan: '2026-05-19',
    amarPutusan: 'Menyatakan Terdakwa Hendrawan Tanudjaja terbukti secara sah dan meyakinkan bersalah melakukan tindak pidana penipuan sebagaimana dakwaan kesatu; Menjatuhkan pidana kepada Terdakwa dengan pidana penjara selama 2 (dua) tahun dan 6 (enam) bulan; Menetapkan masa penahanan yang telah dijalani dikurangkan seluruhnya dari pidana yang dijatuhkan; Menetapkan Terdakwa tetap berada dalam tahanan.',
    statusPutusan: 'Banding Diajukan (Tergugat)',
    fileSize: '1.8 MB',
    unduhCount: 89
  },
  {
    id: 'p3',
    nomorPerkara: '411/Pdt.G/2025/PN.Jkt.Pst',
    klasifikasi: 'Sengketa Kepemilikan Lahan Waris',
    paraPihak: 'Rina Herawati dkk vs Suherman Jaelani',
    tanggalPutusan: '2026-05-12',
    amarPutusan: 'Menyatakan tanah sengketa seluas 450 m2 di Menteng adalah sah milik para Penggugat selaku ahli waris sah; Menyatakan sertifikat tanah baru atas nama Tergugat batal demi hukum; Menghukum Tergugat untuk mengosongkan tanah milik para Penggugat dan menyerahkannya tanpa syarat.',
    statusPutusan: 'Kasasi Diajukan',
    fileSize: '4.1 MB',
    unduhCount: 312
  },
  {
    id: 'p4',
    nomorPerkara: '23/G/2026/PTUN.JKT',
    klasifikasi: 'Sengketa Tata Usaha Negara / Perizinan Usaha',
    paraPihak: 'Persatuan Pedagang Kaki Lima Menteng vs Kepala Satpol PP DKI',
    tanggalPutusan: '2026-05-08',
    amarPutusan: 'Menolak gugatan Penggugat untuk seluruhnya; Menghukum Penggugat untuk membayar seluruh biaya perkara sebesar Rp345.000,00. Hakim menyatakan Surat Keputusan Penertiban Satpol PP telah sesuai dengan Peraturan Daerah Penertiban Umum.',
    statusPutusan: 'Kekuatan Hukum Tetap (Inkracht)',
    fileSize: '1.2 MB',
    unduhCount: 205
  },
  {
    id: 'p5',
    nomorPerkara: '517/Pdt.G/2026/PA.Jkt.Pst',
    klasifikasi: 'Sengketa Pembagian Harta Bersama (Gono-gini)',
    paraPihak: 'Farida Astuti vs Lukman Hakim',
    tanggalPutusan: '2026-05-05',
    amarPutusan: 'Menetapkan harta bersama berupa 1 unit rumah di Cempaka Putih dan 1 unit mobil dibagi dua secara merata (50:50) antara Penggugat dan Tergugat; Memerintahkan penjualan lelang lelang melalui Kantor Lelang Negara apabila pembagian fisik tidak dapat dicapai, hasil bersih dibagi rata.',
    statusPutusan: 'Kekuatan Hukum Tetap (Inkracht)',
    fileSize: '3.3 MB',
    unduhCount: 76
  }
];
