import { useEffect, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  FileText,
  Download,
  Eye,
  Search,
  Scale,
  X,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../../services/api';
import PageHeader from '../../../components/PageHeader';

// 11 DOKUMEN REGULASI RESMI PERSIS SESUAI SITUS ASLI DISPAR SULTENG
// (https://pariwisata.sultengprov.go.id/informasi-publik/regulasi.html)
const OFFICIAL_REGULASI = [
  {
    id: 1,
    judul: 'PERATURAN MENTERI PARIWISATA DAN EKONOMI KREATIF/ KEPALA BADAN PARIWISATA DAN EKONOMI KREATIF REPUBLIK INDONESIA NOMOR 14 TAHUN 2021',
    file: '/images/Regulasi/PERMENPAR_NO_14_2021.pdf',
    tipe: 'Permenparekraf',
    nomor: 'Nomor 14 Tahun 2021',
  },
  {
    id: 2,
    judul: 'KEPUTUSAN MENTERI DALAM NEGERI NOMOR 050-3708 TAHUN 2020',
    file: '/images/Regulasi/KEPMENDAGRI_NO_050-3708_2020.pdf',
    tipe: 'Kepmendagri',
    nomor: 'Nomor 050-3708 Tahun 2020',
  },
  {
    id: 3,
    judul: 'PERATURAN MENTERI PENDAYAGUNAAN APARATUR NEGARA DAN REFORMASI BIROKRASI REPUBLIK INDONESIA NOMOR 11 TAHUN 2021',
    file: '/images/Regulasi/PERMENPANRB_NO_11_2021.pdf',
    tipe: 'PermenPANRB',
    nomor: 'Nomor 11 Tahun 2021',
  },
  {
    id: 4,
    judul: 'PERATURAN MENTERI PARIWISATA REPUBLIK INDONESIA NOMOR 21 TAHUN 2016',
    file: '/images/Regulasi/PERMENPAR_NO_21_2016.pdf',
    tipe: 'Permenpar',
    nomor: 'Nomor 21 Tahun 2016',
  },
  {
    id: 5,
    judul: 'PERMENDAGRI NOMOR 90 TAHUN 2019',
    file: '/images/Regulasi/PERMENDAGRI_NO_90_2019.pdf',
    tipe: 'Permendagri',
    nomor: 'Nomor 90 Tahun 2019',
  },
  {
    id: 6,
    judul: 'LIST RIPPARDA',
    file: '/images/Regulasi/LIST_RIPPARDA.pdf',
    tipe: 'Dokumen RIPPARDA',
    nomor: 'RIPPARDA Sulteng',
  },
  {
    id: 7,
    judul: 'PERDA NOMOR 5 TAHUN 2019',
    file: '/images/Regulasi/PERDA_SULTENG_NO_5_2019.pdf',
    tipe: 'Perda Provinsi',
    nomor: 'Nomor 5 Tahun 2019',
  },
  {
    id: 8,
    judul: 'PERDA SIGI NOMOR 18 TAHUN 2014',
    file: '/images/Regulasi/PERDA_SIGI_NO_18_2014.pdf',
    tipe: 'Perda Kabupaten',
    nomor: 'Nomor 18 Tahun 2014',
  },
  {
    id: 9,
    judul: 'PERDA TOJO UNA-UNA NOMOR 7 TAHUN 2013',
    file: '/images/Regulasi/PERDA_TOJO_UNA_UNA_NO_7_2013.pdf',
    tipe: 'Perda Kabupaten',
    nomor: 'Nomor 7 Tahun 2013',
  },
  {
    id: 10,
    judul: 'PERDA MOROWALI UTARA NOMOR 6 TAHUN 2017',
    file: '/images/Regulasi/PERDA_MOROWALI_UTARA_NO_6_2017.pdf',
    tipe: 'Perda Kabupaten',
    nomor: 'Nomor 6 Tahun 2017',
  },
  {
    id: 11,
    judul: 'PERDA TOLITOLI NOMOR 7 Tahun 2016',
    file: '/images/Regulasi/PERDA_TOLITOLI_NO_7_2016.pdf',
    tipe: 'Perda Kabupaten',
    nomor: 'Nomor 7 Tahun 2016',
  },
];

const Regulasi = () => {
  const [data, setData] = useState(OFFICIAL_REGULASI);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [pageSize, setPageSize] = useState(10); // default persis web asli: 10 per halaman
  const [currentPage, setCurrentPage] = useState(1);

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

  const filteredItems = useMemo(() => {
    return data.filter((item) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.judul?.toLowerCase().includes(q) ||
        (item.tipe && item.tipe.toLowerCase().includes(q)) ||
        (item.nomor && item.nomor.toLowerCase().includes(q))
      );
    });
  }, [data, searchQuery]);

  // Reset page when search or pageSize changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, pageSize]);

  const totalPages = pageSize === 'all' ? 1 : Math.ceil(filteredItems.length / pageSize);
  const paginatedItems = useMemo(() => {
    if (pageSize === 'all') return filteredItems;
    const start = (currentPage - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, currentPage, pageSize]);

  return (
    <>
      <Helmet>
        <title>Regulasi - Dinas Pariwisata Provinsi Sulawesi Tengah</title>
        <meta
          name="description"
          content="Kumpulan 11 regulasi resmi, peraturan daerah (RIPPARDA), peraturan menteri, dan keputusan menteri bidang kepariwisataan Dinas Pariwisata Provinsi Sulawesi Tengah."
        />
      </Helmet>

      {/* Header Banner Konsisten Sesuai Desain Standar */}
      <PageHeader
        badge="Regulasi & Dasar Hukum Resmi"
        badgeIcon={Scale}
        title="Regulasi"
        subtitle="Kumpulan peraturan perundang-undangan dan rencana induk pembangunan kepariwisataan (RIPPARDA) Provinsi Sulawesi Tengah"
        breadcrumbs={[
          { label: 'Informasi Publik' },
          { label: 'Regulasi' },
        ]}
      />

      <section className="py-10 lg:py-14 bg-slate-50 min-h-screen">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">

          {/* Top Control Bar: Search & Page Limit Filter (Persis Web Asli) */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 lg:p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari regulasi, RIPPARDA, Permen, Perda..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-semibold"
                  >
                    Hapus
                  </button>
                )}
              </div>

              {/* Status Indicator & Tampilkan Limit Selector */}
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span>11 Dokumen Resmi Lokal (100% PDF Valid)</span>
                </div>

                <div className="flex items-center gap-2 text-slate-600 font-medium border-l border-slate-200 pl-4">
                  <span>Tampilkan:</span>
                  {[5, 10, 'all'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setPageSize(size)}
                      className={`px-2.5 py-1 rounded-md text-xs font-bold transition ${
                        pageSize === size
                          ? 'bg-purple-700 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {size === 'all' ? 'Semua' : size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Document List (Tampilan Elegan & Bersih Sesuai Standar Web Asli) */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
            <div className="p-4 px-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span>Judul Dokumen Regulasi ({filteredItems.length} Dokumen)</span>
              <span>Aksi Berkas</span>
            </div>

            {paginatedItems.length === 0 ? (
              <div className="p-12 text-center">
                <FileText size={48} className="mx-auto text-slate-300 mb-3" />
                <h3 className="text-base font-bold text-slate-800">Tidak ada regulasi yang cocok</h3>
                <p className="text-xs text-slate-500 mt-1">Coba sesuaikan kata kunci pencarian Anda.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {paginatedItems.map((item, idx) => {
                  const globalIdx = pageSize === 'all' ? idx + 1 : (currentPage - 1) * pageSize + idx + 1;
                  const fileHref = getDocHref(item.file);
                  const fileName = item.file ? item.file.split('/').pop() : 'Berkas.pdf';

                  return (
                    <div
                      key={item.id || idx}
                      className="p-4 md:p-5 hover:bg-purple-50/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                    >
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        {/* Number Indicator */}
                        <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center flex-shrink-0 group-hover:bg-purple-700 group-hover:text-white transition-colors">
                          {globalIdx}
                        </div>

                        {/* Title & Badge */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-bold text-slate-900 group-hover:text-purple-700 transition-colors leading-snug">
                            {item.judul}
                          </h3>
                          <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                            <span className="font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">
                              PDF DOKUMEN
                            </span>
                            <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                              Lokal 100%
                            </span>
                            <span className="truncate max-w-[200px] text-slate-400">
                              {fileName}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons: Pratinjau & Ambil File */}
                      <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
                        <button
                          onClick={() => setSelectedFile(item)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-purple-700 bg-slate-100 hover:bg-purple-100/60 py-2 px-3 rounded-lg transition"
                          title="Pratinjau Dokumen PDF Langsung"
                        >
                          <Eye size={14} />
                          <span>Pratinjau</span>
                        </button>

                        <a
                          href={fileHref}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 py-2 px-3.5 rounded-lg shadow-sm hover:shadow transition"
                          title="Unduh Berkas PDF Asli"
                        >
                          <Download size={14} />
                          <span>Ambil File</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Pagination (Persis Web Asli: Halaman 1 dari 2) */}
          {totalPages > 1 && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500 font-medium">
                Halaman {currentPage} dari {totalPages} ({filteredItems.length} Dokumen Regulasi)
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Awal
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition ${
                      currentPage === page
                        ? 'bg-purple-700 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <ChevronRight size={16} />
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Akhir
                </button>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Modal Preview Dokumen PDF */}
      <AnimatePresence>
        {selectedFile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[92vh] max-h-[92vh] flex flex-col overflow-hidden border border-slate-200"
            >
              {/* Modal Header */}
              <div className="p-4 px-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex-1 min-w-0 pr-4">
                  <span className="inline-block text-[10px] font-bold tracking-wider uppercase text-purple-700 mb-0.5">
                    Pratinjau Dokumen Regulasi Resmi
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
              <div className="flex-1 min-h-0 p-2 bg-slate-100 relative">
                <iframe
                  src={`${getDocHref(selectedFile.file)}#toolbar=1&view=FitH`}
                  title={selectedFile.judul}
                  className="block w-full h-full rounded-lg border border-slate-200 bg-white"
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
