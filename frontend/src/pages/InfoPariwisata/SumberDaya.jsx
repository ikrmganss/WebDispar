import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Users, Award, Download, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import PageHeader from '../../components/PageHeader';
import { useLanguage } from '../../context/LanguageContext';

const DEFAULT_ITEMS_ID = [
  {
    judul: 'Laporan Tenaga Kerja Pariwisata & Ekonomi Kreatif',
    deskripsi: 'Data tenaga kerja di sektor pariwisata dan ekonomi kreatif Sulawesi Tengah',
    icon: Users,
    color: 'from-blue-500 to-blue-700',
    file: '/dokumen/laporan-tenaga-kerja.pdf',
  },
  {
    judul: 'Data Pelatihan dan Sertifikasi Kompetensi Pariwisata & Ekonomi Kreatif',
    deskripsi: 'Data pelatihan dan sertifikasi kompetensi SDM pariwisata & ekraf',
    icon: Award,
    color: 'from-gold-500 to-orange-700',
    file: '/dokumen/data-pelatihan-sertifikasi.pdf',
  },
];

const DEFAULT_ITEMS_EN = [
  {
    judul: 'Tourism & Creative Economy Workforce Report',
    deskripsi: 'Employment and labor data in the tourism and creative sectors of Central Sulawesi',
    icon: Users,
    color: 'from-blue-500 to-blue-700',
    file: '/dokumen/laporan-tenaga-kerja.pdf',
  },
  {
    judul: 'Training & Competency Certification Data in Tourism & Creative Industries',
    deskripsi: 'Data on vocational training and competency certificates for tourism & creative human resources',
    icon: Award,
    color: 'from-gold-500 to-orange-700',
    file: '/dokumen/data-pelatihan-sertifikasi.pdf',
  },
];

const SumberDaya = () => {
  const { language } = useLanguage();
  const isEn = language === 'EN';
  const [items, setItems] = useState(isEn ? DEFAULT_ITEMS_EN : DEFAULT_ITEMS_ID);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/info-pariwisata/sumber-daya')
      .then((res) => {
        if (res.data?.length) {
          setItems(
            res.data.map((item, idx) => ({
              judul: item.judul,
              deskripsi: item.deskripsi || '',
              icon: idx === 0 ? Users : Award,
              color: idx === 0 ? 'from-blue-500 to-blue-700' : 'from-gold-500 to-orange-700',
              file: item.file ? (item.file.startsWith('http') || item.file.startsWith('/') ? item.file : `/uploads/${item.file}`) : null,
            }))
          );
        } else {
          setItems(isEn ? DEFAULT_ITEMS_EN : DEFAULT_ITEMS_ID);
        }
      })
      .catch(() => {
        setItems(isEn ? DEFAULT_ITEMS_EN : DEFAULT_ITEMS_ID);
      })
      .finally(() => setLoading(false));
  }, [isEn]);

  return (
    <>
      <Helmet>
        <title>{isEn ? 'Tourism & Creative Economy Resources - Central Sulawesi Tourism' : 'Sumber Daya Pariwisata & Ekonomi Kreatif - Dinas Pariwisata Sulteng'}</title>
      </Helmet>

      <PageHeader
        badge="Pengembangan Kapasitas & SDM"
        badgeIcon={Users}
        title="Sumber Daya Pariwisata & Ekonomi Kreatif"
        subtitle="Data ketenagakerjaan, sertifikasi kompetensi, dan peningkatan kapasitas SDM pariwisata & ekonomi kreatif"
        breadcrumbs={[
          { label: 'Info Pariwisata', path: '/info-pariwisata/destinasi/daya-tarik-wisata' },
          { label: 'Sumber Daya' }
        ]}
      />

      <section className="py-12 lg:py-16">
        <div className="container-custom max-w-4xl">
          {loading ? (
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => <div key={i} className="skeleton h-32 rounded-xl" />)}
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="card p-6 flex flex-col md:flex-row items-start md:items-center gap-5"
                >
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white flex-shrink-0`}>
                    <item.icon size={28} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-navy-900 mb-1">{item.judul}</h3>
                    <p className="text-sm text-gray-500">{item.deskripsi}</p>
                  </div>
                  <a
                    href={item.file || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={item.file && !item.file.startsWith('http')}
                    className="flex-shrink-0 btn-primary text-sm inline-flex items-center gap-2"
                  >
                    <Download size={16} /> {isEn ? 'Download / View' : 'Unduh / Lihat'}
                  </a>
                </motion.div>
              ))}
            </div>
          )}

          {/* Info */}
          <div className="mt-10 card p-6 bg-blue-50 border-l-4 border-primary-600">
            <div className="flex items-start gap-3">
              <FileText size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700">
                <p className="font-semibold mb-1">{isEn ? 'About This Data:' : 'Tentang Data Ini:'}</p>
                <p>
                  {isEn
                    ? 'Tourism and creative economy resource data covers employment statistics, competency training, skill certifications, and human resource development programs across Central Sulawesi Province.'
                    : 'Data sumber daya pariwisata dan ekonomi kreatif mencakup informasi tenaga kerja, pelatihan, sertifikasi kompetensi, serta data pendukung lainnya yang berkaitan dengan pengembangan SDM di sektor pariwisata dan ekonomi kreatif Provinsi Sulawesi Tengah.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SumberDaya;
