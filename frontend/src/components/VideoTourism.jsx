import { Youtube, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const VideoTourism = ({ videoId = 'voGg26hCInU', title }) => {
  const { language } = useLanguage();
  const isEn = language === 'EN';

  const defaultTitle = isEn
    ? 'Central Sulawesi Tourism Video'
    : 'Video Pariwisata Sulawesi Tengah';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="card p-5"
    >
      <h3 className="font-bold text-navy-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
        <Youtube size={20} className="text-red-500" />
        {isEn ? 'Tourism Video' : 'Video Pariwisata'}
      </h3>
      <div className="relative aspect-video rounded-lg overflow-hidden bg-navy-900 shadow-lg">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title || defaultTitle}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <p className="text-sm text-gray-500 mt-4 line-clamp-2">
        {isEn
          ? 'Official Channel of the Department of Tourism of Central Sulawesi Province. Explore the natural beauty & culture of Central Sulawesi.'
          : 'Official Channel Dinas Pariwisata Provinsi Sulawesi Tengah. Jelajahi keindahan alam & budaya Sulawesi Tengah.'}
      </p>
      <a
        href="https://www.youtube.com/@dinaspariwisatasulteng"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-2 text-primary-600 text-sm font-semibold hover:gap-3 transition-all"
      >
        {isEn ? 'Watch on YouTube' : 'Tonton di YouTube'} <ArrowRight size={14} />
      </a>
    </motion.div>
  );
};

export default VideoTourism;
