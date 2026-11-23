import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../../services/api';
import PageHeader from '../../../components/PageHeader';
import { useLanguage } from '../../../context/LanguageContext';

const kabupatenList = [
  'Kota Palu', 'Kabupaten Donggala', 'Kabupaten Sigi', 'Kabupaten Parigi Moutong',
  'Kabupaten Poso', 'Kabupaten Morowali', 'Kabupaten Morowali Utara', 'Kabupaten Tojo Una-Una',
  'Kabupaten Banggai', 'Kabupaten Banggai Kepulauan', 'Kabupaten Banggai Laut', 'Kabupaten Tolitoli', 'Kabupaten Buol'
];

const getDescriptionPreview = (html) => {
  if (!html) return '';

  const document = new DOMParser().parseFromString(html, 'text/html');
  document.querySelectorAll('script, style, img, iframe, video, audio, svg').forEach((element) => element.remove());
  return document.body.textContent.replace(/\s+/g, ' ').trim();
};

const DestinationCard = ({ item, index, isEn }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const image = typeof item.gambar === 'string' ? item.gambar.trim() : '';
  const imageSrc = image
    ? (image.startsWith('http') || image.startsWith('/') ? image : `/uploads/${image}`)
    : '';
  const description = getDescriptionPreview(item.deskripsi);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="card group flex h-[400px] flex-col"
    >
      <div className="relative h-48 shrink-0 overflow-hidden bg-slate-100">
        {imageSrc && !imageFailed ? (
          <img
            src={imageSrc}
            alt={item.judul || 'Daya tarik wisata'}
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-slate-400">
            <MapPin size={32} aria-hidden="true" />
            <span className="text-sm">{isEn ? 'Photo not available' : 'Foto belum tersedia'}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="line-clamp-2 text-base font-bold text-navy-900 transition-colors group-hover:text-primary-600">
            {item.judul}
          </h3>
          <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-gray-500">
            {description || (isEn ? 'No description available for this destination.' : 'Deskripsi belum tersedia untuk destinasi ini.')}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-400">
          <span className="inline-flex items-center gap-1">
            <MapPin size={12} className="text-primary-600" />
            <span className="truncate">{item.kabupaten || '-'}</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const DayaTarikWisata = () => {
  const { language } = useLanguage();
  const isEn = language === 'EN';

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState('Kota Palu');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(`/info-pariwisata/daya-tarik-wisata?kabupaten=${selected}`)
      .then((res) => setData(res.data || []))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, [selected]);

  return (
    <>
      <Helmet>
        <title>{isEn ? 'Tourist Attractions - Tourism Info' : 'Daya Tarik Wisata - Info Pariwisata'}</title>
      </Helmet>
      <PageHeader
        badge={isEn ? "Featured Destinations & Tourism" : "Destinasi & Wisata Unggulan"}
        badgeIcon={Compass}
        title={isEn ? "Tourist Attractions" : "Daya Tarik Wisata"}
        subtitle={
          isEn
            ? "Explore natural wonders, cultural heritage, and maritime charm across 13 regencies & cities of Central Sulawesi"
            : "Jelajahi keindahan alam, budaya, dan pesona wisata bahari di 13 kabupaten & kota Sulawesi Tengah"
        }
        breadcrumbs={[
          { label: isEn ? 'Tourism Info' : 'Info Pariwisata', path: '/info-pariwisata/destinasi/daya-tarik-wisata' },
          { label: isEn ? 'Destinations' : 'Destinasi' },
          { label: isEn ? 'Tourist Attractions' : 'Daya Tarik Wisata' }
        ]}
      />
      <section className="py-12 lg:py-16">
        <div className="container-custom">
          {/* Filter Kabupaten */}
          <div className="flex flex-wrap gap-2 mb-10">
            {kabupatenList.map((kab) => (
              <button
                key={kab}
                onClick={() => setSelected(kab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selected === kab ? 'bg-primary-600 text-white shadow-lg' : 'bg-white text-navy-700 border border-gray-200 hover:border-primary-400'}`}
              >
                {kab}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <div key={i} className="skeleton h-72 rounded-xl" />)}
            </div>
          ) : data.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <MapPin size={48} className="mx-auto mb-4 opacity-30" />
              <p>{isEn ? `No destination data available for ${selected}` : `Belum ada data destinasi untuk ${selected}`}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((item, idx) => (
                <DestinationCard key={item.id} item={item} index={idx} isEn={isEn} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default DayaTarikWisata;
