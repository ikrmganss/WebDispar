import { Helmet } from 'react-helmet-async';
import { ArrowRight, Compass } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const VisiMisi = () => {
  const { language } = useLanguage();
  const isEn = language === 'EN';

  const visiId = 'Berani Mewujudkan Sulawesi Tengah sebagai Wilayah Pertanian dan Industri yang Maju dan Berkelanjutan 2025-2029.';
  const visiEn = 'Boldly Realizing Central Sulawesi as an Advanced and Sustainable Agricultural and Industrial Region 2025-2029.';

  const misiId = [
    'Mewujudkan masyarakat sehat, cerdas dan sejahtera melalui pemenuhan kebutuhan dasar dan penyediaan lapangan kerja.',
    'Mewujudkan masyarakat bahagia dan produktif melalui peningkatan ekonomi berbasis potensi unggulan daerah dan pemberdayaan ekonomi kerakyatan yang berkeadilan.',
    'Mewujudkan pembangunan infrastruktur berbasis lingkungan dan tata ruang yang berkelanjutan berorientasi pada konektivitas antar wilayah dan antar sektor.',
    'Meningkatkan tata kelola pemerintahan bersih, inovatif, kolaboratif serta keamanan daerah yang tangguh berlandaskan nilai religius dan kearifan lokal.',
  ];

  const misiEn = [
    'Realizing a healthy, smart, and prosperous community through fulfilling basic needs and generating job opportunities.',
    'Realizing a happy and productive society through regional leading potential economic growth and equitable grassroots economic empowerment.',
    'Realizing environmentally sustainable and spatial infrastructure development oriented toward inter-regional and inter-sectoral connectivity.',
    'Enhancing clean, innovative, and collaborative governance alongside resilient regional security grounded in religious values and local wisdom.',
  ];

  const visi = isEn ? visiEn : visiId;
  const misi = isEn ? misiEn : misiId;

  return (
    <>
      <Helmet>
        <title>{isEn ? 'Vision and Mission - Department of Tourism Central Sulawesi' : 'Visi dan Misi - Dinas Pariwisata Sulteng'}</title>
      </Helmet>

      <PageHeader
        badge={isEn ? "Institutional Profile" : "Profil Kelembagaan"}
        badgeIcon={Compass}
        title={isEn ? "Vision and Mission" : "Visi dan Misi"}
        subtitle={
          isEn
            ? "Strategic orientation and development commitment of the Department of Tourism of Central Sulawesi Province 2025-2029."
            : "Arah haluan dan komitmen pembangunan Dinas Pariwisata Provinsi Sulawesi Tengah periode 2025-2029."
        }
        breadcrumbs={[
          { label: isEn ? 'Profile' : 'Profil' },
          { label: isEn ? 'Vision and Mission' : 'Visi dan Misi' }
        ]}
      />

      <section className="py-16 lg:py-24 bg-white">
        <div className="container-custom max-w-5xl">
          {/* VISI */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-px bg-gold-400" />
              <h2 className="text-sm font-semibold text-navy-900 uppercase tracking-widest">
                {isEn ? 'Vision' : 'Visi'}
              </h2>
            </div>
            <blockquote className="border-l-4 border-gold-400 pl-6 lg:pl-8">
              <p className="text-2xl lg:text-3xl font-medium text-navy-900 leading-snug">
                "{visi}"
              </p>
            </blockquote>
          </motion.div>

          {/* MISI */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-12 h-px bg-gold-400" />
              <h2 className="text-sm font-semibold text-navy-900 uppercase tracking-widest">
                {isEn ? 'Mission' : 'Misi'}
              </h2>
            </div>
            <div className="space-y-6">
              {misi.map((item, idx) => (
                <div key={idx} className="flex gap-5 lg:gap-8 group">
                  <span className="flex-shrink-0 text-3xl lg:text-4xl font-bold text-gold-400 tabular-nums w-12">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <p className="text-base lg:text-lg text-gray-700 leading-relaxed pt-1 lg:pt-2 group-hover:text-navy-900 transition-colors">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tujuan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 p-8 lg:p-10 bg-gray-50 border-l-4 border-navy-900"
          >
            <div className="flex items-center gap-2 mb-3">
              <ArrowRight size={18} className="text-navy-900" />
              <h3 className="text-sm font-semibold text-navy-900 uppercase tracking-widest">
                {isEn ? 'Strategic Goal' : 'Tujuan Strategis'}
              </h3>
            </div>
            <p className="text-xl lg:text-2xl font-semibold text-navy-900 mb-4">
              {isEn
                ? 'Increasing the Gross Regional Domestic Product (GRDP) of the Leading Tourism and Creative Economy Sector'
                : 'Meningkatnya PDRB Sektor Unggulan Pariwisata dan Ekonomi Kreatif'}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {isEn
                ? 'This objective is established as a benchmark in planning, executing, and evaluating strategic programs and activities aimed at bolstering service quality, competitiveness, and regional economic contribution in tourism and creative economy.'
                : 'Tujuan ini ditetapkan sebagai pedoman dalam perencanaan, pelaksanaan, serta evaluasi berbagai program dan kegiatan yang bertujuan untuk meningkatkan kualitas layanan, daya saing, serta kontribusi pada sektor pariwisata dan ekonomi kreatif terhadap pembangunan daerah.'}
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default VisiMisi;
