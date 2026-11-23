import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Palette, Download, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import PageHeader from '../../components/PageHeader';
import { useLanguage } from '../../context/LanguageContext';

const SUBSEKTOR = [
  'Kuliner', 'Kriya', 'Musik', 'Fesyen', 'Film', 'Animasi & Video',
  'Aplikasi & Game', 'Desain Produk', 'Desain Interior', 'Desain Komunikasi Visual',
  'Arsitektur', 'Seni Pertunjukan', 'Seni Rupa', 'Penerbitan',
  'Periklanan', 'Televisi & Radio', 'Fotografi',
];

const SUBSEKTOR_EN = [
  'Culinary', 'Crafts', 'Music', 'Fashion', 'Film', 'Animation & Video',
  'Apps & Games', 'Product Design', 'Interior Design', 'Visual Communication Design',
  'Architecture', 'Performing Arts', 'Fine Arts', 'Publishing',
  'Advertising', 'Television & Radio', 'Photography',
];

const EkonomiKreatif = () => {
  const { language } = useLanguage();
  const isEn = language === 'EN';
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/info-pariwisata/ekonomi-kreatif')
      .then((res) => setData(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const colors = ['from-blue-500 to-blue-700', 'from-purple-500 to-purple-700', 'from-gold-500 to-orange-700', 'from-green-500 to-teal-700', 'from-pink-500 to-rose-700'];

  return (
    <>
      <Helmet>
        <title>{isEn ? 'Creative Economy - Central Sulawesi Tourism' : 'Ekonomi Kreatif - Info Pariwisata Sulawesi Tengah'}</title>
      </Helmet>

      <PageHeader
        badge="Inovasi & Karya Kreatif Lokal"
        badgeIcon={Sparkles}
        title="Ekonomi Kreatif"
        subtitle="Mendorong pertumbuhan 17 subsektor dan pemberdayaan pelaku ekonomi kreatif di Sulawesi Tengah"
        breadcrumbs={[
          { label: 'Info Pariwisata', path: '/info-pariwisata/destinasi/daya-tarik-wisata' },
          { label: 'Ekonomi Kreatif' }
        ]}
      />

      <section className="py-12 lg:py-16">
        <div className="container-custom">
          {/* 17 Subsektor */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card p-8 mb-10">
            <h2 className="text-2xl font-bold text-navy-900 mb-2">
              {isEn ? '17 Creative Economy Subsectors' : '17 Subsektor Ekonomi Kreatif'}
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              {isEn ? 'Creative industry subsectors fostered in Central Sulawesi' : 'Sektor-sektor kreatif yang dikembangkan di Sulawesi Tengah'}
            </p>
            <div className="flex flex-wrap gap-2">
              {(isEn ? SUBSEKTOR_EN : SUBSEKTOR).map((s, idx) => (
                <span key={idx} className="px-4 py-2 bg-primary-50 text-primary-700 text-sm font-medium rounded-full border border-primary-200 hover:bg-primary-100 transition-colors">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Data dari API */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-navy-900 mb-2 flex items-center gap-2">
              <Sparkles size={24} className="text-gold-500" />
              {isEn ? 'Creative Economy Directories & Data' : 'Data Pelaku Ekonomi Kreatif'}
            </h2>
            <p className="text-gray-500 text-sm">{isEn ? 'Available directories and reports for download' : 'Data yang tersedia untuk diunduh'}</p>
          </div>

          {loading ? (
            <div className="skeleton h-40 w-full rounded-xl" />
          ) : data.length === 0 ? (
            <div className="card p-6 flex items-center gap-5">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold-500 to-orange-700 flex items-center justify-center text-white flex-shrink-0">
                <Palette size={26} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-navy-900 mb-1">
                  {isEn ? 'Central Sulawesi Creative Economy Directory' : 'Data Pelaku Ekonomi Kreatif Sulawesi Tengah'}
                </h3>
                <p className="text-xs text-gray-500">
                  {isEn ? 'Complete registry of creative industry practitioners by subsector' : 'Data lengkap pelaku ekonomi kreatif per subsektor'}
                </p>
              </div>
              <a href="/dokumen/ekraf-sulteng.pdf" download className="flex-shrink-0 btn-primary text-sm inline-flex items-center gap-1.5">
                <Download size={16} /> {isEn ? 'Download' : 'Unduh'}
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.map((item, idx) => (
                <motion.div
                  key={item.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="card p-5 flex items-center gap-4"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[idx % colors.length]} flex items-center justify-center text-white flex-shrink-0`}>
                    <Palette size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-navy-900 text-sm mb-1 line-clamp-2">{item.judul}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2">{item.deskripsi}</p>
                  </div>
                  {item.file && (
                    <a
                      href={item.file.startsWith('http') || item.file.startsWith('/') ? item.file : `/uploads/${item.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary-600 hover:bg-primary-700 text-white transition-colors"
                      title={isEn ? "Download / Open Document" : "Unduh / Buka Direktori"}
                    >
                      <Download size={16} />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default EkonomiKreatif;
