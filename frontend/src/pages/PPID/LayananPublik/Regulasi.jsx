import { useEffect, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import {
  FileText,
  Download,
  Shield,
  Eye,
  Search,
  BookOpen,
  Scale,
  Award,
  Calendar,
  X,
  ExternalLink,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../../services/api';
import PageHeader from '../../../components/PageHeader';

const DEFAULT_REGULASI_UMUM = [
  {
    id: 1,
    judul: 'PERATURAN MENTERI PARIWISATA DAN EKONOMI KREATIF/ KEPALA BADAN PARIWISATA DAN EKONOMI KREATIF REPUBLIK INDONESIA NOMOR 14 TAHUN 2021',
    file: '/images/Regulasi/PERMENPAR_NO_14_2021.pdf',
    kategori: 'umum',
    tipe: 'Permenparekraf',
    tahun: '2021',
  },
  {
    id: 2,
    judul: 'KEPUTUSAN MENTERI DALAM NEGERI NOMOR 050-3708 TAHUN 2020',
    file: '/images/Regulasi/KEPMENDAGRI_NO_050-3708_2020.pdf',
    kategori: 'umum',
    tipe: 'Kepmendagri',
    tahun: '2020',
  },
  {
    id: 3,
    judul: 'PERATURAN MENTERI PENDAYAGUNAAN APARATUR NEGARA DAN REFORMASI BIROKRASI REPUBLIK INDONESIA NOMOR 11 TAHUN 2021',
    file: '/images/Regulasi/PERMENPANRB_NO_11_2021.pdf',
    kategori: 'umum',
    tipe: 'PermenPANRB',
    tahun: '2021',
  },
  {
    id: 4,
    judul: 'PERATURAN MENTERI PARIWISATA REPUBLIK INDONESIA NOMOR 21 TAHUN 2016',
    file: '/images/Regulasi/PERMENPAR_NO_21_2016.pdf',
    kategori: 'umum',
    tipe: 'Permenpar',
    tahun: '2016',
  },
  {
    id: 5,
    judul: 'PERMENDAGRI NOMOR 90 TAHUN 2019 TENTANG KLASIFIKASI, KODEFIKASI DAN NOMENKLATUR PERENCANAAN PEMBANGUNAN DAERAH',
    file: '/images/Regulasi/PERMENDAGRI_NO_90_2019.pdf',
    kategori: 'umum',
    tipe: 'Permendagri',
    tahun: '2019',
  },
  {
    id: 6,
    judul: 'PERDA TOLITOLI NOMOR 7 TAHUN 2016 TENTANG RIPPARKAB',
    file: '/images/Regulasi/PERDA_TOLITOLI_NO_7_2016.pdf',
    kategori: 'umum',
    tipe: 'Perda Kab. Tolitoli',
    tahun: '2016',
  },
  {
    id: 7,
    judul: 'PERDA MOROWALI UTARA NOMOR 6 TAHUN 2017 TENTANG RIPPARKAB',
    file: '/images/Regulasi/PERDA_MOROWALI_UTARA_NO_6_2017.pdf',
    kategori: 'umum',
    tipe: 'Perda Kab. Morut',
    tahun: '2017',
  },
  {
    id: 8,
    judul: 'PERDA TOJO UNA-UNA NOMOR 7 TAHUN 2013 TENTANG RIPPARKAB',
    file: '/images/Regulasi/PERDA_TOJO_UNA_UNA_NO_7_2013.pdf',
    kategori: 'umum',
    tipe: 'Perda Kab. Touna',
    tahun: '2013',
  },
  {
    id: 9,
    judul: 'PERDA SIGI NOMOR 18 TAHUN 2014 TENTANG RIPPARKAB',
    file: '/images/Regulasi/PERDA_SIGI_NO_18_2014.pdf',
    kategori: 'umum',
    tipe: 'Perda Kab. Sigi',
    tahun: '2014',
  },
  {
    id: 10,
    judul: 'PERDA NOMOR 5 TAHUN 2019 TENTANG RENCANA INDUK PEMBANGUNAN KEPARIWISATAAN PROVINSI SULAWESI TENGAH TAHUN 2019-2034',
    file: '/images/Regulasi/PERDA_SULTENG_NO_5_2019.pdf',
    kategori: 'umum',
    tipe: 'Perda Prov. Sulteng',
    tahun: '2019',
  },
  {
    id: 11,
    judul: 'LIST RIPPARDA SULAWESI TENGAH',
    file: '/images/Regulasi/LIST_RIPPARDA.pdf',
    kategori: 'umum',
    tipe: 'Dokumen Ripparda',
    tahun: '2022',
  },
];

const DEFAULT_PEDOMAN = [
  {
    id: 12,
    judul: 'PENGELOLAAN ORGANISASI (PERGUB 36/2020)',
    file: '/images/Regulasi/PERGUB_36_2020.pdf',
    kategori: 'pedoman',
    tipe: 'Pergub Sulteng',
    tahun: '2020',
  },
  {
    id: 13,
    judul: 'PENGELOLAAN ADMINISTRASI (PERGUB 24/2020)',
    file: '/images/Regulasi/PERGUB_24_2020.pdf',
    kategori: 'pedoman',
    tipe: 'Pergub Sulteng',
    tahun: '2020',
  },
  {
    id: 14,
    judul: 'PENGELOLAAN KEPEGAWAIAN (PERGUB 9/2021 TTG MANAJEMEN TALENTA PEGAWAI NEGERI SIPIL)',
    file: '/images/Regulasi/PERGUB-NO-9-TAHUN-2021.pdf',
    kategori: 'pedoman',
    tipe: 'Pergub Sulteng',
    tahun: '2021',
  },
  {
    id: 15,
    judul: 'PENGELOLAAN KEUANGAN (PERGUB 7/2020)',
    file: '/images/Regulasi/Pergub_7_2020.pdf',
    kategori: 'pedoman',
    tipe: 'Pergub Sulteng',
    tahun: '2020',
  },
];

const DEFAULT_LAYANAN = [
  {
    id: 16,
    judul: 'PERATURAN GUBERNUR TENTANG SISTEM INFORMASI DAN DOKUMENTASI PEMDA (PERGUB 12/2021)',
    file: '/images/Regulasi/PERGUB_12_2021-tentang-Sistem-Informasi-dan-Dokumentasi-1.pdf',
    kategori: 'layanan',
    tipe: 'Pergub Sulteng',
    tahun: '2021',
  },
  {
    id: 17,
    judul: 'KEPUTUSAN GUBERNUR TENTANG PPID PROVINSI SULAWESI TENGAH',
    file: '/images/Regulasi/SK-PPID-PROV.pdf',
    kategori: 'layanan',
    tipe: 'SK Gubernur',
    tahun: '2021',
  },
  {
    id: 18,
    judul: 'KEPUTUSAN GUBERNUR TENTANG TIM PERTIMBANGAN PPID',
    file: '/images/Regulasi/SK-PPID-PERTIMBANGAN.pdf',
    kategori: 'layanan',
    tipe: 'SK Gubernur',
    tahun: '2021',
  },
  {
    id: 19,
    judul: 'KEPUTUSAN PPID TENTANG DAFTAR INFORMASI PUBLIK UTAMA SULTENG',
    file: '/images/Regulasi/SK-DIP-UTAMA-SULTENG.pdf',
    kategori: 'layanan',
    tipe: 'SK PPID Utama',
    tahun: '2021',
  },
  {
    id: 20,
    judul: 'KEPUTUSAN PPID TENTANG INFORMASI DIKECUALIKAN',
    file: '/images/Regulasi/KP-DIKECUALIKAN-PPID-PROV.pdf',
    kategori: 'layanan',
    tipe: 'SK PPID Utama',
    tahun: '2021',
  },
  {
    id: 21,
    judul: 'UU 14 TAHUN 2008 TENTANG KETERBUKAAN INFORMASI PUBLIK',
    file: '/images/Regulasi/uu14-2008_keterbukaan_informasi_publik.pdf',
    kategori: 'layanan',
    tipe: 'Undang-Undang RI',
    tahun: '2008',
  },
  {
    id: 22,
    judul: 'PP 61 TAHUN 2010 TENTANG PELAKSANAAN UU 14/2008',
    file: '/images/Regulasi/Nomor_61_Tahun_2010.pdf',
    kategori: 'layanan',
    tipe: 'Peraturan Pemerintah RI',
    tahun: '2010',
  },
  {
    id: 23,
    judul: 'PERKI 1 TAHUN 2021 TENTANG STANDAR LAYANAN INFORMASI PUBLIK',
    file: '/images/Regulasi/PerKIP-1-FINAL-2021.pdf',
    kategori: 'layanan',
    tipe: 'Peraturan Komisi Informasi',
    tahun: '2021',
  },
  {
    id: 24,
    judul: 'PERKI 1 TAHUN 2018 TENTANG STANDAR LAYANAN INFORMASI PUBLIK DESA',
    file: '/images/Regulasi/PERKI_SLIP_DESA_FINAL.pdf',
    kategori: 'layanan',
    tipe: 'Peraturan Komisi Informasi',
    tahun: '2018',
  },
];

const ALL_DEFAULTS = [
  ...DEFAULT_REGULASI_UMUM,
  ...DEFAULT_PEDOMAN,
  ...DEFAULT_LAYANAN,
];

const Regulasi = () => {
  const location = useLocation();
  const isDirectRegulasiRoute = location.pathname === '/ppid/regulasi';

  const [data, setData] = useState(ALL_DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(isDirectRegulasiRoute ? 'umum' : 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    api
      .get('/ppid/regulasi')
      .then((res) => {
        if (res.data?.length) {
          setData(res.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const getDocHref = (file) => {
    if (!file) return '#';
    if (file.startsWith('http://') || file.startsWith('https://')) return file;
    if (file.startsWith('/')) return file;
    return `/uploads/${file}`;
  };

  const getCategoryBadge = (kat) => {
    switch (kat) {
      case 'umum':
        return { text: 'Regulasi Kepariwisataan', bg: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'pedoman':
        return { text: 'Pedoman Pengelolaan', bg: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'layanan':
        return { text: 'Regulasi PPID', bg: 'bg-purple-50 text-purple-700 border-purple-200' };
      default:
        return { text: 'Dokumen Resmi', bg: 'bg-gray-50 text-gray-700 border-gray-200' };
    }
  };

  const filteredItems = useMemo(() => {
    return data.filter((item) => {
      const matchTab = activeTab === 'all' || item.kategori === activeTab;
      const matchSearch =
        !searchQuery ||
        item.judul?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.kategori?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTab && matchSearch;
    });
  }, [data, activeTab, searchQuery]);

  const counts = useMemo(() => {
    return {
      all: data.length,
      umum: data.filter((d) => d.kategori === 'umum').length,
      pedoman: data.filter((d) => d.kategori === 'pedoman').length,
      layanan: data.filter((d) => d.kategori === 'layanan').length,
    };
  }, [data]);

  const isPdf = (filePath) => {
    return filePath && filePath.toLowerCase().endsWith('.pdf');
  };

  return (
    <>
      <Helmet>
        <title>Regulasi & Dasar Hukum - Dinas Pariwisata Provinsi Sulawesi Tengah</title>
        <meta
          name="description"
          content="Kumpulan regulasi kepariwisataan, RIPPARDA, peraturan daerah, peraturan gubernur, dan dasar hukum keterbukaan informasi publik Dinas Pariwisata Sulawesi Tengah."
        />
      </Helmet>

      <PageHeader
        badge="Dasar Hukum & Regulasi Resmi"
        badgeIcon={Scale}
        title={isDirectRegulasiRoute ? 'Regulasi Kepariwisataan & Daerah' : 'Regulasi & Dasar Hukum'}
        subtitle="Kumpulan peraturan perundang-undangan kepariwisataan, RIPPARDA, pedoman tata kelola, dan regulasi layanan keterbukaan informasi publik"
        breadcrumbs={
          isDirectRegulasiRoute
            ? [
                { label: 'Informasi Publik' },
                { label: 'Regulasi' },
              ]
            : [
                { label: 'PPID', path: '/ppid/profil' },
                { label: 'Layanan Publik' },
                { label: 'Regulasi' },
              ]
        }
      />

      <section className="py-10 lg:py-14 bg-slate-50 min-h-screen">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          {/* Top Control Bar: Search & Quick Filters */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 lg:p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari regulasi, RIPPARDA, Pergub, SK..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                  >
                    Hapus
                  </button>
                )}
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>Seluruh Dokumen Tersedia Lokal (100% PDF Valid)</span>
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 mt-5 pt-5 border-t border-slate-100">
              <span className="text-xs font-semibold text-slate-500 mr-2 flex items-center gap-1.5">
                <Filter size={14} /> Kategori:
              </span>
              {[
                { id: 'all', label: 'Semua Regulasi', count: counts.all },
                { id: 'umum', label: 'Regulasi Kepariwisataan', count: counts.umum },
                { id: 'pedoman', label: 'Pedoman Pengelolaan', count: counts.pedoman },
                { id: 'layanan', label: 'Layanan Publik (PPID)', count: counts.layanan },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-purple-700 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                      activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-white text-slate-600 shadow-2xs'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-4 px-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Menampilkan {filteredItems.length} Dokumen Regulasi
            </p>
          </div>

          {/* Document Cards Grid */}
          {filteredItems.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <FileText size={48} className="mx-auto text-slate-300 mb-3" />
              <h3 className="text-base font-bold text-slate-800">Tidak ada regulasi yang cocok</h3>
              <p className="text-xs text-slate-500 mt-1">Coba sesuaikan kata kunci pencarian atau ganti kategori.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredItems.map((item, idx) => {
                const badge = getCategoryBadge(item.kategori);
                const fileHref = getDocHref(item.file);
                const isItemPdf = isPdf(item.file);

                return (
                  <motion.div
                    key={item.id || idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: Math.min(idx * 0.04, 0.4) }}
                    className="bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-purple-200 transition-all flex flex-col h-full overflow-hidden group"
                  >
                    <div className="p-5 flex-1 flex flex-col">
                      {/* Card Top: Badges */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${badge.bg}`}>
                          {badge.text}
                        </span>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          {isItemPdf ? 'PDF DOKUMEN' : 'DOKUMEN FOTO'}
                        </span>
                      </div>

                      {/* Card Title */}
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-purple-700 transition-colors leading-snug line-clamp-3 mb-4">
                        {item.judul}
                      </h3>

                      {/* Card Meta / Location */}
                      <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                        <span className="inline-flex items-center gap-1">
                          <FileText size={13} className="text-purple-600" />
                          <span className="truncate max-w-[170px]">
                            {item.file ? item.file.split('/').pop() : 'Berkas Resmi'}
                          </span>
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                          Lokal 100%
                        </span>
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="px-5 py-3 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-2">
                      {/* Preview Button */}
                      <button
                        onClick={() => setSelectedFile(item)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-purple-700 transition-colors py-1 px-2 rounded-md hover:bg-white"
                        title="Lihat Pratinjau Dokumen"
                      >
                        <Eye size={14} />
                        <span>Pratinjau</span>
                      </button>

                      {/* Download Button */}
                      <a
                        href={fileHref}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 transition-all py-1.5 px-3 rounded-lg shadow-2xs hover:shadow"
                        title="Unduh Berkas Asli Langsung"
                      >
                        <Download size={13} />
                        <span>Ambil File</span>
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Modal Preview Dokumen */}
      <AnimatePresence>
        {selectedFile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200"
            >
              {/* Modal Header */}
              <div className="p-4 px-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex-1 min-w-0 pr-4">
                  <span className="inline-block text-[10px] font-bold tracking-wider uppercase text-purple-700 mb-0.5">
                    Pratinjau Dokumen Regulasi
                  </span>
                  <h3 className="text-sm md:text-base font-bold text-slate-900 truncate">
                    {selectedFile.judul}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={getDocHref(selectedFile.file)}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 px-3 py-1.5 rounded-lg transition"
                  >
                    <Download size={14} /> Unduh Berkas
                  </a>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Modal Viewer Body */}
              <div className="flex-1 min-h-[550px] p-2 bg-slate-100 relative">
                <iframe
                  src={`${getDocHref(selectedFile.file)}#toolbar=1`}
                  title={selectedFile.judul}
                  className="w-full h-full rounded-lg border border-slate-200"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Regulasi;
