import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Target, Shield, Compass, CheckCircle2,
  Eye, ExternalLink, FileText,
  MapPin, Sparkles, Users, Award, Download,
  ChevronDown, ChevronUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import PageHeader from '../../components/PageHeader';
import api from '../../services/api';

const Tupoksi = () => {
  const [dbData, setDbData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dua berkas resmi otentik yang berbeda untuk masing-masing regulasi
  const pdfPergub57 = '/documents/regulasi/Pergub_Sulteng_No_57_Tahun_2022_Tupoksi.pdf';
  const pdfPergub6 = '/documents/regulasi/Pergub_Sulteng_No_6_Tahun_2024.pdf';

  const [activePreviewPdf, setActivePreviewPdf] = useState(pdfPergub6);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    api.get('/profil/tupoksi')
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setDbData(res.data[0]);
        }
      })
      .catch((err) => {
        console.warn('Menggunakan fallback data lokal Tupoksi:', err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const bidangList = [
    {
      title: 'Bidang Pengembangan Destinasi Pariwisata',
      desc: 'Bertanggung jawab atas perencanaan tata ruang kawasan wisata, pembangunan infrastruktur pendukung, serta sinkronisasi daya tarik wisata unggulan daerah.',
      icon: MapPin,
      badge: 'Fisik & Kawasan',
      color: 'from-blue-600 to-cyan-600',
      border: 'border-blue-200',
      lightBg: 'bg-blue-50/60',
      textColor: 'text-blue-900',
    },
    {
      title: 'Bidang Pengembangan Pemasaran Pariwisata',
      desc: 'Berfokus pada analisis pasar, promosi melalui berbagai kanal media, penyelenggaraan event (kalender wisata), serta penguatan kerja sama antarlembaga dan kemitraan pariwisata baik skala nasional maupun internasional.',
      icon: Sparkles,
      badge: 'Promosi & Kemitraan',
      color: 'from-amber-500 to-orange-600',
      border: 'border-amber-200',
      lightBg: 'bg-amber-50/60',
      textColor: 'text-amber-900',
    },
    {
      title: 'Bidang Pengembangan Ekonomi Kreatif, Pemanfaatan & Perlindungan HKI',
      desc: 'Bertugas memfasilitasi 17 subsektor ekraf, mulai dari inkubasi bisnis hingga perlindungan hukum terhadap karya intelektual pelaku kreatif lokal.',
      icon: Shield,
      badge: 'HKI & Inkubasi',
      color: 'from-purple-600 to-indigo-600',
      border: 'border-purple-200',
      lightBg: 'bg-purple-50/60',
      textColor: 'text-purple-900',
    },
    {
      title: 'Bidang Pengembangan Sumber Daya Pariwisata & Ekonomi Kreatif',
      desc: 'Mengemban mandat untuk meningkatkan kapasitas SDM melalui pelatihan standarisasi, sertifikasi profesi, serta penguatan tata kelola kelembagaan masyarakat seperti Kelompok Sadar Wisata (Pokdarwis).',
      icon: Users,
      badge: 'SDM & Pokdarwis',
      color: 'from-emerald-600 to-teal-600',
      border: 'border-emerald-200',
      lightBg: 'bg-emerald-50/60',
      textColor: 'text-emerald-900',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Tugas Pokok dan Fungsi - Dinas Pariwisata Provinsi Sulawesi Tengah</title>
        <meta
          name="description"
          content="Tugas Pokok dan Fungsi Dinas Pariwisata Provinsi Sulawesi Tengah berdasarkan Pergub No. 57 Tahun 2022 jo Pergub No. 6 Tahun 2024."
        />
      </Helmet>

      <PageHeader
        badge="Kedudukan & Kewenangan"
        badgeIcon={Compass}
        title="Tugas Pokok dan Fungsi"
        subtitle="Dinas Pariwisata Provinsi Sulawesi Tengah berdasarkan regulasi tata kelola pemerintahan terbaru"
        breadcrumbs={[
          { label: 'Profil', path: '/profil/sejarah' },
          { label: 'Tugas Pokok & Fungsi' },
        ]}
      />

      <section className="py-12 lg:py-16 bg-slate-50/60 min-h-screen">
        <div className="container-custom max-w-5xl space-y-8">
          
          {/* Section 1: Landasan Hukum & Tugas Pokok Utama */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-7 sm:p-10 border border-slate-200 shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-100/40 via-blue-50/20 to-transparent rounded-bl-full pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-amber-400 text-xs font-bold tracking-wide uppercase">
                <Target className="w-3.5 h-3.5" />
                <span>Tugas Pokok Daerah</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug tracking-tight">
                Tugas Pokok & Landasan Yuridis
              </h2>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed text-justify">
                Berdasarkan{' '}
                <a
                  href={pdfPergub57}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-blue-600 hover:text-blue-800 underline decoration-blue-300 hover:decoration-blue-600 transition-all inline-flex items-center gap-1"
                >
                  Peraturan Gubernur Sulawesi Tengah Nomor 57 Tahun 2022
                  <FileText className="w-3.5 h-3.5 inline" />
                </a>{' '}
                yang telah dimutakhirkan dengan{' '}
                <a
                  href={pdfPergub6}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-amber-600 hover:text-amber-800 underline decoration-amber-300 hover:decoration-amber-600 transition-all inline-flex items-center gap-1"
                >
                  Peraturan Gubernur Nomor 6 Tahun 2024
                  <FileText className="w-3.5 h-3.5 inline" />
                </a>
                , Dinas Pariwisata Provinsi Sulawesi Tengah memiliki tugas pokok untuk{' '}
                <strong className="text-slate-900 bg-amber-50 px-1 py-0.5 rounded">
                  membantu Gubernur dalam melaksanakan urusan pemerintahan di bidang pariwisata dan ekonomi kreatif yang menjadi kewenangan daerah
                </strong>.
              </p>

              {/* Dua Dokumen Regulasi Asli (Masing-Masing File Berbeda & Otentik) */}
              <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Dokumen 1: Pergub No. 57 Tahun 2022 */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/80 hover:bg-slate-50 transition-colors flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                        Pergub Induk (Tupoksi Dispar)
                      </span>
                      <span className="text-xs text-slate-500 font-medium">9 Hlm (3.5 MB)</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm leading-snug">
                      Pergub Sulteng No. 57 Tahun 2022
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Kedudukan, Struktur Organisasi &amp; Rincian Tugas Pokok Jabatan Struktural Dispar (Pasal 404 - 410).
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                    <a
                      href={pdfPergub57}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors shadow-xs"
                    >
                      <FileText className="w-3.5 h-3.5 text-amber-400" />
                      <span>Buka File</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                    <a
                      href={pdfPergub57}
                      download="Pergub_Sulteng_No_57_Tahun_2022_Tupoksi.pdf"
                      title="Unduh Salinan PDF"
                      className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors shadow-xs"
                    >
                      <Download className="w-4 h-4 text-slate-700" />
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setActivePreviewPdf(pdfPergub57);
                        setShowPreview(true);
                      }}
                      title="Pratinjau di Halaman"
                      className="px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-blue-600 border border-slate-200 font-semibold text-xs transition-colors shadow-xs cursor-pointer inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Pratinjau</span>
                    </button>
                  </div>
                </div>

                {/* Dokumen 2: Pergub No. 6 Tahun 2024 */}
                <div className="p-5 rounded-2xl border border-amber-200 bg-amber-50/50 hover:bg-amber-50/70 transition-colors flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-200/80 text-amber-800">
                        Pergub Pemutakhiran (Naskah Lengkap)
                      </span>
                      <span className="text-xs text-amber-800/80 font-medium">59 Hlm (670 KB)</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm leading-snug">
                      Pergub Sulteng No. 6 Tahun 2024
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Naskah Asli Perubahan Pergub No. 57 Tahun 2022 (Berita Daerah Provinsi Sulawesi Tengah No. 907).
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-amber-200">
                    <a
                      href={pdfPergub6}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs transition-all shadow-xs"
                    >
                      <FileText className="w-3.5 h-3.5 text-white" />
                      <span>Buka File Asli</span>
                      <ExternalLink className="w-3 h-3 text-amber-200" />
                    </a>
                    <a
                      href={pdfPergub6}
                      download="Pergub_Sulteng_No_6_Tahun_2024.pdf"
                      title="Unduh Salinan PDF"
                      className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-amber-200 transition-colors shadow-xs"
                    >
                      <Download className="w-4 h-4 text-slate-700" />
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setActivePreviewPdf(pdfPergub6);
                        setShowPreview(true);
                      }}
                      title="Pratinjau di Halaman"
                      className="px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-amber-700 border border-amber-200 font-semibold text-xs transition-colors shadow-xs cursor-pointer inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Pratinjau</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Pratinjau PDF Interaktif Langsung di Halaman (Bebas Ketergantungan Eksternal) */}
              {showPreview && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 pt-5 border-t border-slate-200 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-medium bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-slate-500 font-semibold">Tampilkan Dokumen:</span>
                      <button
                        type="button"
                        onClick={() => setActivePreviewPdf(pdfPergub6)}
                        className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                          activePreviewPdf === pdfPergub6
                            ? 'bg-amber-500 text-white shadow-xs'
                            : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        Pergub No. 6 Tahun 2024 (59 Hlm)
                      </button>
                      <button
                        type="button"
                        onClick={() => setActivePreviewPdf(pdfPergub57)}
                        className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                          activePreviewPdf === pdfPergub57
                            ? 'bg-slate-900 text-white shadow-xs'
                            : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        Pergub No. 57 Tahun 2022 (9 Hlm)
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href={activePreviewPdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-1"
                      >
                        Buka Layar Penuh
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => setShowPreview(false)}
                        className="px-2 py-1 rounded-lg text-slate-500 hover:text-rose-600 font-bold cursor-pointer"
                      >
                        ✕ Tutup
                      </button>
                    </div>
                  </div>

                  <div className="w-full h-[650px] rounded-2xl overflow-hidden border border-slate-300 bg-slate-100 shadow-inner">
                    <iframe
                      src={`${activePreviewPdf}#toolbar=1`}
                      title="Pratinjau Dokumen Resmi"
                      className="w-full h-full"
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Section 2: Fungsi Utama & Peran Lokomotif */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] rounded-3xl p-7 sm:p-10 text-white shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold tracking-wide uppercase">
                <Award className="w-3.5 h-3.5" />
                <span>Fungsi &amp; Peran Strategis</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Lokomotif Penggerak Potensi Daerah
              </h2>

              <p className="text-slate-200 text-base sm:text-lg leading-relaxed text-justify">
                Fungsi utamanya mencakup <strong className="text-amber-300 font-semibold">perumusan kebijakan teknis</strong>,{' '}
                <strong className="text-amber-300 font-semibold">pelaksanaan koordinasi</strong>, serta{' '}
                <strong className="text-amber-300 font-semibold">pembinaan dan pengawasan kebijakan</strong> di sektor pariwisata.
                Dinas ini berperan sebagai lokomotif penggerak potensi daerah melalui pengelolaan destinasi, strategi pemasaran yang efektif,
                serta penguatan ekosistem ekonomi kreatif guna meningkatkan kesejahteraan masyarakat dan pendapatan asli daerah (PAD).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-700/60">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-amber-400 font-bold text-sm mb-1">Perumusan Kebijakan</div>
                  <p className="text-xs text-slate-300">Merumuskan arah teknis kepariwisataan &amp; ekonomi kreatif Sulteng.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-amber-400 font-bold text-sm mb-1">Koordinasi &amp; Kemitraan</div>
                  <p className="text-xs text-slate-300">Menyinergikan lintas pemangku kepentingan, kab/kota, dan swasta.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-amber-400 font-bold text-sm mb-1">Pembinaan &amp; Pengawasan</div>
                  <p className="text-xs text-slate-300">Menjamin standar mutu destinasi, promosi, dan perlindungan HKI.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section 3: Rincian Tugas Empat Bidang Spesifik */}
          <div>
            <div className="mb-6 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-wide uppercase border border-blue-200">
                <Users className="w-3.5 h-3.5" />
                <span>Tata Kelola Terukur</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Rincian Tugas Empat Bidang Spesifik
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
                Struktur organisasi terbaru membagi rincian tugas ke dalam empat bidang spesifik untuk memastikan tata kelola yang fokus, profesional, dan terukur:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bidangList.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`bg-white rounded-3xl p-7 border ${item.border} shadow-sm hover:shadow-md transition-all flex flex-col justify-between group`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-md shadow-slate-200 group-hover:scale-105 transition-transform`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${item.lightBg} ${item.textColor} border border-current/20`}>
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-slate-900 leading-snug group-hover:text-amber-600 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed text-justify">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Mandat Peraturan Gubernur</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Section 4: Prinsip Pengelolaan Komprehensif (Penutup Resmi) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-amber-50/80 rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white flex-shrink-0 shadow-sm mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h4 className="text-base font-bold text-amber-950">
                Pengelolaan Terpadu &amp; Komprehensif
              </h4>
              <p className="text-sm text-amber-900/90 leading-relaxed text-justify">
                Pembagian ini memastikan bahwa setiap aspek—mulai dari <strong>fisik destinasi</strong>, <strong>promosi</strong>, <strong>perlindungan karya</strong>, hingga <strong>kualitas manusianya</strong>—terkelola secara komprehensif guna mewujudkan pariwisata Sulawesi Tengah yang maju, lestari, dan berdaya saing global.
              </p>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default Tupoksi;
