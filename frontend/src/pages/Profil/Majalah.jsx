import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BookOpen, Download, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../services/api';

const DEFAULT_MAJALAH = [
  { judul: 'Majalah Pesona Sulawesi Tengah Edisi I - 2019', file_pdf: '/majalah/pesona-edisi-1-2019.pdf' },
  { judul: 'Majalah Pesona Sulawesi Tengah Edisi II - 2021', file_pdf: '/majalah/pesona-edisi-2-2021.pdf' },
  { judul: 'Pesona Kuliner Sulawesi Tengah', file_pdf: '/majalah/pesona-kuliner.pdf' },
  { judul: 'Negeri Seribu Megalit', file_pdf: '/majalah/negeri-seribu-megalit.pdf' },
];

const Majalah = () => {
  const [majalah, setMajalah] = useState(DEFAULT_MAJALAH);

  useEffect(() => {
    api.get('/profil/majalah')
      .then((res) => { if (res.data?.length) setMajalah(res.data); })
      .catch(() => {});
  }, []);

  const coverColors = [
    'from-blue-600 to-navy-900',
    'from-purple-600 to-pink-700',
    'from-gold-500 to-orange-700',
    'from-green-600 to-teal-800',
  ];

  return (
    <>
      <Helmet><title>Majalah - Dinas Pariwisata Sulteng</title></Helmet>

      <div className="bg-gradient-to-r from-navy-900 to-primary-800 py-16 lg:py-20">
        <div className="container-custom">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-white">Majalah</h1>
          <p className="text-white/70 mt-2">Publikasi resmi Dinas Pariwisata Provinsi Sulawesi Tengah</p>
        </div>
      </div>

      <section className="py-12 lg:py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {majalah.map((m, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="card group overflow-hidden"
              >
                {/* Cover */}
                <div className={`aspect-[3/4] bg-gradient-to-br ${coverColors[idx % coverColors.length]} p-6 flex flex-col justify-between text-white relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/20" />
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white/10" />
                  </div>
                  <BookOpen size={32} className="text-gold-300 relative" />
                  <div className="relative">
                    <p className="text-xs uppercase tracking-wider text-gold-300 mb-2">Majalah Pariwisata</p>
                    <h3 className="font-bold text-lg leading-tight">{m.judul}</h3>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 flex items-center justify-between gap-2">
                  <a
                    href={m.file_pdf || m.file || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold py-2 px-3 rounded-lg transition-colors"
                  >
                    <Eye size={14} /> Baca
                  </a>
                  <a
                    href={m.file_pdf || m.file || '#'}
                    download
                    className="inline-flex items-center justify-center gap-1.5 border border-primary-600 text-primary-600 hover:bg-primary-50 text-sm font-semibold py-2 px-3 rounded-lg transition-colors"
                  >
                    <Download size={14} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {majalah.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <BookOpen size={48} className="mx-auto mb-4 opacity-30" />
              <p>Belum ada majalah tersedia</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Majalah;