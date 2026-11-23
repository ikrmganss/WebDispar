import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PageHeader from '../../components/PageHeader';
import api from '../../services/api';
import {
  FileText, Download, ExternalLink, Search, Filter, Calendar,
  Users, Award, Wallet, Compass, ChevronRight, CheckCircle2,
  FolderOpen, ArrowRight, RefreshCw, AlertCircle
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'Semua Kategori', slug: '', icon: FolderOpen },
  { id: 'data-kepegawaian', label: 'Data Kepegawaian', slug: 'data-kepegawaian', icon: Users },
  { id: 'dokumen-sakip', label: 'Dokumen SAKIP', slug: 'dokumen-sakip', icon: Award },
  { id: 'laporan-keuangan-aset', label: 'Laporan Keuangan & Aset', slug: 'laporan-keuangan-aset', icon: Wallet },
  { id: 'laporan-kegiatan', label: 'Laporan Kegiatan', slug: 'laporan-kegiatan', icon: Compass },
];

const SUBCATEGORY_LABELS = {
  // Kepegawaian
  'struktur-organisasi': 'Struktur Organisasi',
  'daftar-pejabat': 'Daftar Pejabat',
  'duk': 'DUK',
  'lhkpn': 'LHKPN',
  'daftar-riwayat-hidup-asn': 'Daftar Riwayat Hidup ASN',
  'indeks-kepuasan-masyarakat': 'Indeks Kepuasan Masyarakat',
  'standar-pelayanan': 'Standar Pelayanan',
  'surat-keterangan-tanda-tangan-elektronik': 'SK Tanda Tangan Elektronik',
  'evaluasi-jabatan': 'Evaluasi Jabatan',
  'standar-operasional-prosedur-sop': 'SOP',
  'peta-jabatan': 'Peta Jabatan',
  'laporan-hasil-forum-konsultasi-publik-fkp': 'Laporan FKP',
  'agenda-pimpinan': 'Agenda Pimpinan',
  'penghargaan-tingkat-nasional': 'Penghargaan Nasional',
  'akreditas-layanan-publik': 'Akreditasi Layanan',
  'rekapitulasi-surat-menyurat': 'Rekap Surat Menyurat',
  // SAKIP
  'renja': 'RENJA',
  'rkpd': 'RKPD',
  'iku': 'IKU',
  'definisi-operasional': 'Definisi Operasional',
  'rka': 'RKA',
  'dpa': 'DPA',
  'rup': 'RUP',
  'program-dan-kegiatan': 'Program & Kegiatan',
  'renstra': 'RENSTRA',
  'lakip': 'LAKIP',
  'perjanjian-kinerja': 'Perjanjian Kinerja',
  'cascading-kinerja': 'Cascading Kinerja',
  'pohon-kinerja': 'Pohon Kinerja',
  'rencana-aksi': 'Rencana Aksi',
  'peta-proses-bisnis': 'Peta Proses Bisnis',
  'roadmap-reformasi-birokrasi': 'Roadmap RB',
  'lppd': 'LPPD',
  'pengadaan-barang-dan-jasa-opd-yang-diumumkan-oleh-lpse': 'Pengadaan LPSE',
  // Keuangan
  'laporan-realisasi-anggaran': 'Realisasi Anggaran (LRA)',
  'dokumen-pengadaan': 'Dokumen Pengadaan',
  'catatan-atas-laporan-keuangan-calk': 'CALK',
  'anggaran-kas': 'Anggaran Kas',
  'daftar-aset': 'Daftar Aset',
  'kua-ppas': 'KUA-PPAS',
  'dokumen-elektronik-keuangan': 'Dokumen Elektronik Keuangan',
  // Kegiatan
  'laporan-bidang-destinasi': 'Bidang Destinasi',
  'laporan-bidang-pemasaran': 'Bidang Pemasaran',
  'laporan-bidang-industri': 'Bidang Industri',
  'laporan-bidang-kelembagaan': 'Bidang Kelembagaan',
};

const InformasiSecaraBerkala = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters from URL or state
  const currentKategori = searchParams.get('kategori') || '';
  const currentSub = searchParams.get('sub') || '';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTahun, setSelectedTahun] = useState('');

  // Fetch items from API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const res = await api.get('/ppid/berkala');
        setItems(res.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Set category in URL
  const handleCategoryChange = (slug) => {
    const newParams = new URLSearchParams(searchParams);
    if (slug) {
      newParams.set('kategori', slug);
    } else {
      newParams.delete('kategori');
    }
    newParams.delete('sub');
    setSearchParams(newParams);
  };

  // Set subcategory in URL
  const handleSubChange = (sub) => {
    const newParams = new URLSearchParams(searchParams);
    if (sub) {
      newParams.set('sub', sub);
    } else {
      newParams.delete('sub');
    }
    setSearchParams(newParams);
  };

  // Available years from dataset
  const availableYears = useMemo(() => {
    const years = new Set();
    items.forEach((item) => {
      if (item.tahun) years.add(String(item.tahun));
    });
    return Array.from(years).sort((a, b) => b.localeCompare(a));
  }, [items]);

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Filter by category
      if (currentKategori) {
        if (item.kategori_slug !== currentKategori && item.kategori_slug !== 'informasi-berkala') {
          return false;
        }
      }
      // Filter by subcategory
      if (currentSub) {
        const itemSub = (item.subkategori || '').toLowerCase();
        const itemJudul = (item.judul || '').toLowerCase();
        const targetSub = currentSub.toLowerCase();
        const targetReadable = (SUBCATEGORY_LABELS[currentSub] || currentSub.replace(/-/g, ' ')).toLowerCase();

        const matchSub = itemSub === targetSub;
        const matchJudul = itemJudul.includes(targetSub.replace(/-/g, ' ')) || itemJudul.includes(targetReadable);
        if (!matchSub && !matchJudul) return false;
      }
      // Filter by year
      if (selectedTahun && String(item.tahun) !== String(selectedTahun)) {
        return false;
      }
      // Filter by search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const judul = (item.judul || '').toLowerCase();
        const kat = (item.kategori_nama || '').toLowerCase();
        const sub = (item.subkategori || '').toLowerCase();
        if (!judul.includes(q) && !kat.includes(q) && !sub.includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [items, currentKategori, currentSub, selectedTahun, searchQuery]);

  return (
    <>
      <Helmet>
        <title>Informasi Secara Berkala - PPID Dinas Pariwisata Sulawesi Tengah</title>
        <meta
          name="description"
          content="Kumpulan Dokumen Resmi dan Informasi Publik Secara Berkala Dinas Pariwisata Provinsi Sulawesi Tengah: Data Kepegawaian, Dokumen SAKIP, Laporan Keuangan, dan Laporan Kegiatan."
        />
      </Helmet>

      {/* Header Banner */}
      <PageHeader
        badge="PPID Pelaksana Dinas Pariwisata Sulteng"
        badgeIcon={CheckCircle2}
        title="Informasi Secara Berkala"
        subtitle="Informasi yang wajib diperbaharui dan diumumkan secara teratur sekurang-kurangnya setiap 6 bulan sekali kepada masyarakat sesuai amanat Undang-Undang No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik."
        breadcrumbs={[
          { label: 'Informasi Publik' },
          { label: 'Informasi Secara Berkala' },
        ]}
      />

      {/* Main Content Area */}
      <div className="bg-slate-50 min-h-screen py-10 lg:py-14">
        <div className="container mx-auto max-w-7xl px-4 space-y-8">

          {/* Category Tabs */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-2 lg:p-3 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = (cat.slug === '' && !currentKategori) || currentKategori === cat.slug;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-purple-700 text-white shadow-md shadow-purple-700/20'
                      : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50'
                  }`}
                >
                  <Icon size={16} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Filter Bar: Search, Year, Subcategory */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 space-y-4">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Search Box */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Cari judul dokumen, nama arsip, SAKIP, LHKPN, LRA..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl text-xs md:text-sm border border-slate-200 outline-none focus:ring-2 focus:ring-purple-600 transition-all text-slate-800"
                />
              </div>

              {/* Year Select & Reset */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs">
                  <Calendar size={14} className="text-slate-500" />
                  <span className="text-slate-600 font-semibold">Tahun:</span>
                  <select
                    value={selectedTahun}
                    onChange={(e) => setSelectedTahun(e.target.value)}
                    className="bg-transparent text-slate-800 font-bold outline-none cursor-pointer"
                  >
                    <option value="">Semua</option>
                    {availableYears.map((yr) => (
                      <option key={yr} value={yr}>{yr}</option>
                    ))}
                  </select>
                </div>

                {(currentSub || searchQuery || selectedTahun) && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedTahun('');
                      handleSubChange('');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  >
                    <RefreshCw size={12} />
                    <span>Reset Filter</span>
                  </button>
                )}
              </div>
            </div>

            {/* Active Filters Tag Pills */}
            {currentSub && (
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100 flex-wrap">
                <span className="text-xs text-slate-500 font-medium">Subkategori Terpilih:</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                  <span>{SUBCATEGORY_LABELS[currentSub] || currentSub.replace(/-/g, ' ')}</span>
                  <button
                    onClick={() => handleSubChange('')}
                    className="hover:text-amber-950 font-bold ml-1"
                    title="Hapus filter subkategori"
                  >
                    ✕
                  </button>
                </span>
              </div>
            )}
          </div>

          {/* Document Count Info */}
          <div className="flex items-center justify-between px-1">
            <span className="text-xs md:text-sm font-bold text-slate-600">
              Menampilkan <span className="text-purple-700 font-extrabold">{filteredItems.length}</span> dokumen resmi
            </span>
          </div>

          {/* Loading / Error States */}
          {loading && (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm flex flex-col items-center justify-center gap-3">
              <RefreshCw className="w-8 h-8 text-purple-600 animate-spin" />
              <p className="text-slate-600 font-semibold text-sm">Memuat data dokumen resmi...</p>
            </div>
          )}

          {error && !loading && (
            <div className="bg-red-50 rounded-2xl p-6 border border-red-200 text-red-700 flex items-center gap-3">
              <AlertCircle size={20} />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Documents Grid */}
          {!loading && !error && filteredItems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredItems.map((item) => {
                const rawLink = item.file || item.link || '#';
                const docLink = rawLink.startsWith('http') || rawLink.startsWith('/') ? rawLink : `/uploads/${rawLink}`;
                const isExternal = docLink.startsWith('http');
                const isDrive = docLink.includes('drive.google.com') || docLink.includes('tinyurl.com');

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between p-5 group hover:border-purple-300"
                  >
                    <div>
                      {/* Card Header Tags */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                          {item.kategori_nama || 'Informasi Publik'}
                        </span>
                        {item.tahun && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                            <Calendar size={11} />
                            <span>{item.tahun}</span>
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-sm md:text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors leading-snug line-clamp-3 mb-2">
                        {item.judul}
                      </h3>

                      {/* Subcategory Label if present */}
                      {item.subkategori && (
                        <span className="inline-block text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded mb-3">
                          {SUBCATEGORY_LABELS[item.subkategori] || item.subkategori}
                        </span>
                      )}
                    </div>

                    {/* Card Actions */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 mt-4">
                      <a
                        href={docLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-purple-300 text-slate-700 hover:text-purple-700 text-xs font-semibold hover:bg-purple-50 transition-all flex-1 justify-center"
                      >
                        <ExternalLink size={13} />
                        <span>{isDrive ? 'Buka Link' : 'Lihat'}</span>
                      </a>
                      <a
                        href={docLink}
                        download={!isExternal}
                        target={isExternal ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold transition-all shadow-sm flex-1 justify-center"
                      >
                        <Download size={13} />
                        <span>Unduh PDF</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredItems.length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <FileText size={28} />
              </div>
              <h3 className="text-base font-bold text-slate-800">Tidak ada dokumen yang ditemukan</h3>
              <p className="text-xs md:text-sm text-slate-500 max-w-md mx-auto">
                Silakan coba ubah kata kunci pencarian, pilih tahun lain, atau kembali ke semua kategori.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTahun('');
                  handleCategoryChange('');
                  handleSubChange('');
                }}
                className="mt-2 px-4 py-2 bg-purple-700 text-white text-xs font-bold rounded-xl hover:bg-purple-800 transition-colors inline-flex items-center gap-1.5"
              >
                <RefreshCw size={12} />
                <span>Reset Semua Filter</span>
              </button>
            </div>
          )}

          {/* Footer Information Box */}
          <div className="bg-gradient-to-r from-purple-900 to-indigo-950 text-white rounded-2xl p-6 lg:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white">Butuh Informasi Publik Lainnya?</h4>
                <p className="text-xs md:text-sm text-purple-200 max-w-2xl leading-relaxed">
                  Jika dokumen atau informasi yang Anda butuhkan belum tersedia di halaman ini, Anda dapat mengajukan permohonan informasi secara resmi melalui formulir permohonan PPID online.
                </p>
              </div>
              <Link
                to="/ppid/layanan-publik/form-permohonan"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs md:text-sm font-bold shadow-md transition-all shrink-0"
              >
                <span>Ajukan Permohonan Informasi</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default InformasiSecaraBerkala;
