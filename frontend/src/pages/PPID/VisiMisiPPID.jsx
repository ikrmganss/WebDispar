import { Helmet } from 'react-helmet-async';
import { Target, Flag } from 'lucide-react';
import { motion } from 'framer-motion';
import PageHeader from '../../components/PageHeader';

const VisiMisiPPID = () => {
  const visi = 'Terwujudnya Pelayanan Informasi Publik Yang Transparan dan Akuntabel Untuk Memenuhi Hak Pemohon Informasi Sesuai Dengan Ketentuan Peraturan Perundang-Undangan.';

  const misi = [
    'Meningkatkan Pengelolaan dan Pelayanan Informasi Yang Berkualitas.',
    'Membangun dan Mengembangkan Sistem Penyediaan dan Layanan Informasi.',
    'Meningkatkan Kompetensi Sumber Daya Manusia.',
  ];

  return (
    <>
      <Helmet><title>Visi dan Misi PPID - Dinas Pariwisata Sulteng</title></Helmet>

      <PageHeader
        badge="PPID Pelaksana Dinas Pariwisata Sulteng"
        badgeIcon={Target}
        title="Visi dan Misi PPID"
        subtitle="Komitmen Transparansi, Akuntabilitas, dan Pelayanan Informasi Publik Berkualitas"
        breadcrumbs={[
          { label: 'PPID', path: '/ppid/profil' },
          { label: 'Visi & Misi PPID' }
        ]}
      />

      <section className="py-12 lg:py-16">
        <div className="container-custom max-w-4xl">
          {/* Visi */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-8 lg:p-10 bg-gradient-to-br from-primary-600 to-navy-800 text-white mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gold-400 flex items-center justify-center text-navy-900">
                <Target size={24} />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold">VISI</h2>
            </div>
            <p className="text-lg lg:text-xl leading-relaxed italic">"{visi}"</p>
          </motion.div>

          {/* Misi */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-8 lg:p-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gold-400 flex items-center justify-center text-navy-900">
                <Flag size={24} />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-navy-900">MISI</h2>
            </div>
            <ol className="space-y-4">
              {misi.map((item, idx) => (
                <li key={idx} className="flex gap-4 p-4 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </span>
                  <p className="text-gray-700 leading-relaxed pt-1">{item}</p>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default VisiMisiPPID;