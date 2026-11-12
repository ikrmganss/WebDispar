import { Helmet } from 'react-helmet-async';
import { Target, Flag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const VisiMisi = () => {
  const visi = 'Berani Mewujudkan Sulawesi Tengah sebagai Wilayah Pertanian dan Industri yang Maju dan Berkelanjutan 2025-2029.';

  const misi = [
    'Mewujudkan masyarakat sehat, cerdas dan sejahtera melalui pemenuhan kebutuhan dasar dan penyediaan lapangan kerja.',
    'Mewujudkan masyarakat bahagia dan produktif melalui peningkatan ekonomi berbasis potensi unggulan daerah dan pemberdayaan ekonomi kerakyatan yang berkeadilan.',
    'Mewujudkan pembangunan infrastruktur berbasis lingkungan dan tata ruang yang berkelanjutan berorientasi pada konektivitas antar wilayah dan antar sektor.',
    'Meningkatkan tata kelola pemerintahan bersih, inovatif, kolaboratif serta keamanan daerah yang tangguh berlandaskan nilai religius dan kearifan lokal.',
  ];

  return (
    <>
      <Helmet>
        <title>Visi dan Misi - Dinas Pariwisata Sulteng</title>
      </Helmet>

      <div className="bg-navy-900 pt-32 pb-20 lg:pt-40 lg:pb-24">
        <div className="container-custom">
          <p className="text-gold-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Profil
          </p>
          <h1 className="text-4xl lg:text-6xl font-bold text-white tracking-tight">
            Visi dan Misi
          </h1>
          <p className="text-white/60 mt-3 text-lg max-w-2xl">
            Arah pembangunan Dinas Pariwisata Provinsi Sulawesi Tengah periode 2025-2029
          </p>
        </div>
      </div>

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
                Visi
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
                Misi
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
                Tujuan Strategis
              </h3>
            </div>
            <p className="text-xl lg:text-2xl font-semibold text-navy-900 mb-4">
              Meningkatnya PDRB Sektor Unggulan Pariwisata dan Ekonomi Kreatif
            </p>
            <p className="text-gray-600 leading-relaxed">
              Tujuan ini ditetapkan sebagai pedoman dalam perencanaan, pelaksanaan, serta
              evaluasi berbagai program dan kegiatan yang bertujuan untuk meningkatkan kualitas
              layanan, daya saing, serta kontribusi pada sektor pariwisata dan ekonomi kreatif
              terhadap pembangunan daerah.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default VisiMisi;