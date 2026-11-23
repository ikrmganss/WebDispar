import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BookOpen, Download, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import PageHeader from '../../components/PageHeader';
import { useLanguage } from '../../context/LanguageContext';

const OFFICIAL_MAJALAH = [
  {
    judul: 'Majalah Pesona Sulawesi Tengah Edisi I - 2019',
    cover: '/images/MAJALAH_PESONA_Edisi_I_001.jpg',
    file_pdf: 'https://drive.google.com/file/d/1BH5D9htVorzZskUNze_oOToALnh60Q--/view?usp=sharing',
    baca_link: 'https://drive.google.com/file/d/1BH5D9htVorzZskUNze_oOToALnh60Q--/preview'
  },
  {
    judul: 'Majalah Pesona Sulawesi Tengah Edisi II - 2021',
    cover: '/images/MAJALAH_PESONA_Edisi_II_2021_001.jpg',
    file_pdf: 'https://drive.google.com/file/d/1MrIDSlwSyPWU3gR-h3VM2HhJk4EBrj8L/view?usp=sharing',
    baca_link: 'https://drive.google.com/file/d/1MrIDSlwSyPWU3gR-h3VM2HhJk4EBrj8L/preview'
  },
  {
    judul: 'Booklet Pesona Kuliner Sulawesi Tengah',
    cover: '/images/seribumegalit/Booklet_Pesona_Kuliner_-_page_1_001.jpg',
    file_pdf: 'https://drive.google.com/file/d/1hgWI1J6RfyS0PljRM6pNQ1D4NO7QDZSN/view?usp=sharing',
    baca_link: 'https://anyflip.com/hwsca/xoqq/'
  },
  {
    judul: 'Booklet Negeri Seribu Megalit',
    cover: '/images/seribumegalit/Booklet_megalit_2023_fix_001.jpg',
    file_pdf: 'https://drive.google.com/file/d/1Qxi2nxgq18p52nIS3cqcRbHqDAwbK7V1/view?pli=1',
    baca_link: 'https://drive.google.com/file/d/1Qxi2nxgq18p52nIS3cqcRbHqDAwbK7V1/preview'
  },
];

const Majalah = () => {
  const { language } = useLanguage();
  const isEn = language === 'EN';
  const [majalah, setMajalah] = useState(OFFICIAL_MAJALAH);

  useEffect(() => {
    api.get('/profil/majalah')
      .then((res) => {
        if (res.data?.length && res.data[0].file_pdf) {
          setMajalah(res.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <Helmet>
        <title>{isEn ? 'Magazines & Publications - Tourism Office Central Sulawesi' : 'Majalah & Publikasi - Dinas Pariwisata Sulteng'}</title>
      </Helmet>

      <PageHeader
        badge={isEn ? "Publications & Literature" : "Publikasi & Literasi"}
        badgeIcon={BookOpen}
        title={isEn ? "Magazines & Publications" : "Majalah & Publikasi"}
        subtitle={
          isEn
            ? "Collection of official magazines and promotional tourism booklets of Central Sulawesi"
            : "Koleksi majalah resmi dan booklet promosi pariwisata Sulawesi Tengah"
        }
        breadcrumbs={[
          { label: isEn ? 'Profile' : 'Profil', path: '/profil' },
          { label: isEn ? 'Magazines & Publications' : 'Majalah & Publikasi' }
        ]}
      />

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
                className="card overflow-hidden group hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                    <img
                      src={m.cover || '/slider/Slider.jpg'}
                      alt={m.judul}
                      onError={(e) => { e.currentTarget.src = '/slider/Slider.jpg'; }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-xs text-white font-medium flex items-center gap-1">
                        <BookOpen size={14} /> {isEn ? 'Official Publication' : 'Publikasi Resmi'}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-navy-900 text-sm line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors">
                      {m.judul}
                    </h3>
                  </div>
                </div>
                <div className="p-4 pt-0 flex gap-2">
                  {m.baca_link && (
                    <a
                      href={m.baca_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 btn-outline text-xs py-2 justify-center inline-flex items-center gap-1.5"
                    >
                      <Eye size={14} /> {isEn ? 'Read' : 'Baca'}
                    </a>
                  )}
                  {m.file_pdf && (
                    <a
                      href={m.file_pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 btn-primary text-xs py-2 justify-center inline-flex items-center gap-1.5"
                    >
                      <Download size={14} /> {isEn ? 'Download' : 'Unduh'}
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Majalah;
