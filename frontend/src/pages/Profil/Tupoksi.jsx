import { Helmet } from 'react-helmet-async';
import { CheckCircle2, Briefcase, Target, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import PageHeader from '../../components/PageHeader';
import { useLanguage } from '../../context/LanguageContext';

const Tupoksi = () => {
  const { language } = useLanguage();
  const isEn = language === 'EN';

  const tugasPokokId =
    'Membantu Gubernur dalam melaksanakan urusan pemerintahan di bidang pariwisata dan ekonomi kreatif yang menjadi kewenangan daerah.';
  const tugasPokokEn =
    'Assisting the Governor in implementing governmental affairs in the tourism and creative economy sectors within the authority of the regional government.';

  const fungsiId = [
    'Perumusan kebijakan teknis di bidang pariwisata dan ekonomi kreatif.',
    'Pelaksanaan koordinasi, pembinaan, dan pengawasan kebijakan di sektor pariwisata.',
    'Pengelolaan destinasi pariwisata dan pengembangan daya tarik wisata unggulan.',
    'Perumusan strategi pemasaran pariwisata dan penguatan ekosistem ekonomi kreatif.',
    'Peningkatan kesejahteraan masyarakat dan pendapatan asli daerah melalui sektor pariwisata.',
  ];

  const fungsiEn = [
    'Formulation of technical policies in tourism and creative economy.',
    'Implementation of policy coordination, guidance, and supervision in the tourism sector.',
    'Management of tourism destinations and development of premier tourist attractions.',
    'Formulation of tourism marketing strategies and strengthening the creative economy ecosystem.',
    'Enhancement of public welfare and regional locally-generated revenue through the tourism sector.',
  ];

  const bidang = [
    {
      title: isEn ? 'Tourism Destination Development Division' : 'Bidang Pengembangan Destinasi Pariwisata',
      desc: isEn
        ? 'Responsible for tourism spatial planning, supporting infrastructure development, and synchronizing featured tourist attractions.'
        : 'Bertanggung jawab atas perencanaan tata ruang kawasan wisata, pembangunan infrastruktur pendukung, serta sinkronisasi daya tarik wisata unggulan.',
      icon: Target,
      color: 'from-blue-500 to-blue-700',
    },
    {
      title: isEn ? 'Tourism Marketing Development Division' : 'Bidang Pengembangan Pemasaran Pariwisata',
      desc: isEn
        ? 'Focuses on market analysis, multi-channel promotion, event organization (tourism calendar), and strengthening institutional partnerships.'
        : 'Berfokus pada analisis pasar, promosi melalui berbagai kanal media, penyelenggaraan event (kalender wisata), serta penguatan kerja sama antarlembaga dan kemitraan pariwisata.',
      icon: Briefcase,
      color: 'from-purple-500 to-purple-700',
    },
    {
      title: isEn ? 'Creative Economy, Utilization & IPR Division' : 'Bidang Pengembangan Ekonomi Kreatif, Pemanfaatan & Perlindungan HKI',
      desc: isEn
        ? 'Facilitates 17 creative economy subsectors, from business incubation to legal intellectual property protection for local creatives.'
        : 'Memfasilitasi 17 subsektor ekraf, mulai dari inkubasi bisnis hingga perlindungan hukum terhadap karya intelektual pelaku kreatif lokal.',
      icon: Shield,
      color: 'from-gold-500 to-gold-700',
    },
    {
      title: isEn ? 'Tourism & Creative Economy Resources Division' : 'Bidang Pengembangan Sumber Daya Pariwisata & Ekonomi Kreatif',
      desc: isEn
        ? 'Elevates human capital capacity via standardization training, professional certification, and institutional community governance like Pokdarwis.'
        : 'Meningkatkan kapasitas SDM melalui pelatihan standarisasi, sertifikasi profesi, serta penguatan tata kelola kelembagaan masyarakat seperti Pokdarwis.',
      icon: CheckCircle2,
      color: 'from-green-500 to-green-700',
    },
  ];

  return (
    <>
      <Helmet>
        <title>{isEn ? 'Duties and Functions - Tourism Office Central Sulawesi' : 'Tugas Pokok dan Fungsi - Dinas Pariwisata Sulteng'}</title>
      </Helmet>

      <PageHeader
        badge={isEn ? "Authority & Status" : "Kedudukan & Kewenangan"}
        title={isEn ? "Duties and Functions" : "Tugas Pokok dan Fungsi"}
        subtitle={
          isEn
            ? "Based on Central Sulawesi Governor Regulation Number 57 of 2022 as amended by Governor Regulation Number 6 of 2024"
            : "Berdasarkan Peraturan Gubernur Sulawesi Tengah Nomor 57 Tahun 2022 yang dimutakhirkan dengan Peraturan Gubernur Nomor 6 Tahun 2024"
        }
        breadcrumbs={[
          { label: isEn ? 'Profile' : 'Profil', path: '/profil' },
          { label: isEn ? 'Duties and Functions' : 'Tugas Pokok & Fungsi' }
        ]}
      />

      <section className="py-12 lg:py-16">
        <div className="container-custom max-w-5xl">
          {/* Tugas Pokok */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-8 lg:p-10 bg-gradient-to-br from-primary-600 to-navy-800 text-white mb-8"
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gold-400 flex items-center justify-center text-navy-900">
                <Target size={20} />
              </div>
              {isEn ? 'Main Duties' : 'Tugas Pokok'}
            </h2>
            <p className="text-lg leading-relaxed">{isEn ? tugasPokokEn : tugasPokokId}</p>
          </motion.div>

          {/* Fungsi */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-8 lg:p-10 mb-8"
          >
            <h2 className="text-2xl font-bold text-navy-900 mb-6">{isEn ? 'Key Functions' : 'Fungsi Utama'}</h2>
            <ul className="space-y-3">
              {(isEn ? fungsiEn : fungsiId).map((f, idx) => (
                <li key={idx} className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <CheckCircle2 size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Rincian Bidang */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-navy-900 mb-2">
              {isEn ? 'Field Breakdown & Responsibility' : 'Rincian Tugas per Bidang'}
            </h2>
            <p className="text-gray-500 text-sm">
              {isEn ? 'Four dedicated divisions for focused and accountable governance' : 'Empat bidang spesifik untuk tata kelola yang fokus dan terukur'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bidang.map((b, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="card p-6 hover:shadow-lg transition-shadow"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${b.color} flex items-center justify-center text-white mb-4`}>
                  <b.icon size={26} />
                </div>
                <h3 className="font-bold text-navy-900 mb-2">{b.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Tupoksi;
