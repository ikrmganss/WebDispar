import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { UI_STRINGS } from '../utils/translations';

const getSlides = (language = 'ID') => {
  const isEn = language === 'EN';
  return [
    {
      isDual: true,
      alt: isEn ? 'Department of Tourism Central Sulawesi - Featured Destinations' : 'Dinas Pariwisata Provinsi Sulawesi Tengah - Destinasi Wisata Unggulan',
      title: isEn ? 'Featured Destinations of Central Sulawesi' : 'Destinasi Wisata Unggulan Sulawesi Tengah',
      subtitle: isEn ? 'Charm of Megaliths, Selena Hill, Paisupok Lake, Lore Lindu, and Togean Islands' : 'Pesona Megalit, Bukit Selena, Danau Paisupok, Lore Lindu, dan Kepulauan Togean',
      link: '#',
    },
    {
      image: '/images/slider/slider-1-kantor-dispar.jpg',
      fallbackImage: '/slider/Slider.jpg',
      alt: isEn ? 'Office of the Department of Tourism Central Sulawesi' : 'Kantor Dinas Pariwisata Provinsi Sulawesi Tengah',
      title: isEn ? 'Department of Tourism Central Sulawesi Province' : 'Dinas Pariwisata Provinsi Sulawesi Tengah',
      subtitle: isEn ? 'Fostering Advanced, Competitive, and Sustainable Tourism' : 'Mewujudkan Pariwisata Sulteng yang Maju, Berdaya Saing, dan Berkelanjutan',
      link: '#',
    },
    {
      image: '/images/slider/slider2.jpg',
      fallbackImage: '/slider/Slider.jpg',
      alt: isEn ? 'PPID Public Information Transparency Commitment' : 'Komitmen Keterbukaan Informasi Publik PPID',
      title: isEn ? 'Public Information Openness Commitment' : 'Komitmen Keterbukaan Informasi Publik',
      subtitle: isEn ? 'Transparent, Accountable, and Trustworthy Services' : 'Layanan Transparan, Akuntabel, dan Terpercaya',
      link: '/ppid',
    },
    {
      image: '/images/slider/slider3.jpg',
      fallbackImage: '/slider/Slider.jpg',
      alt: isEn ? 'PPID Tourism Office Central Sulawesi' : 'PPID Dinas Pariwisata Sulawesi Tengah',
      title: isEn ? 'PPID Tourism Office Central Sulawesi' : 'PPID Dinas Pariwisata Sulteng',
      subtitle: isEn ? 'Access Documents, Regulations, and Public Information Services' : 'Akses Dokumen, Regulasi, dan Pelayanan Informasi Publik',
      link: '/ppid',
    },
    {
      image: '/images/slider/slider4.jpg',
      fallbackImage: '/slider/Slider.jpg',
      alt: isEn ? 'Key Performance Indicators 2026' : 'Indikator Kinerja Utama Dispar 2026',
      title: isEn ? 'Key Performance Indicators (IKU) 2026' : 'Indikator Kinerja Utama (IKU) 2026',
      subtitle: isEn ? 'Targets and Achievements of Tourism Development' : 'Target dan Capaian Pembangunan Kepariwisataan',
      link: '#',
    },
    {
      image: '/images/slider/slider5.jpg',
      fallbackImage: '/slider/Slider.jpg',
      alt: isEn ? 'Command Center Berani Samporoa' : 'Command Center Berani Samporoa',
      title: 'Command Center BERANI - SAMPOROA',
      subtitle: isEn ? 'Fast Response Hotline for Central Sulawesi Tourism' : 'Hotline Layanan Cepat Tanggap Pariwisata Sulteng',
      link: 'https://wa.me/08116662222',
      isExternal: true,
    },
    {
      image: '/images/slider/slider6.png',
      fallbackImage: '/slider/Slider.jpg',
      alt: isEn ? 'SP4N-LAPOR Public Service Complaints' : 'SP4N-LAPOR Pengaduan Pelayanan Publik',
      title: isEn ? 'SP4N-LAPOR Aspiration & Complaint Service' : 'Layanan Aspirasi & Pengaduan SP4N-LAPOR',
      subtitle: isEn ? 'Submit Your Aspirations and Complaints Online' : 'Sampaikan Aspirasi dan Laporan Anda Secara Online',
      link: 'https://www.lapor.go.id/instansi/pemerintah-provinsi-sulawesi-tengah',
      isExternal: true,
    },
    {
      image: '/images/slider/slider7.jpg',
      fallbackImage: '/images/slider/slider7.png',
      alt: isEn ? 'Anti-Corruption Tourism Campaign' : 'Kampanye Pariwisata Anti Korupsi',
      title: isEn ? 'Tourism with Integrity & Anti-Corruption' : 'Pariwisata Berintegritas & Anti Korupsi',
      subtitle: isEn ? 'Maintaining Clean and Dignified Governance' : 'Menjaga Tata Kelola Pemerintahan yang Bersih dan Berwibawa',
      link: '#',
    },
    {
      image: '/images/slider/slider8.jpg',
      fallbackImage: '/slider/Slider.jpg',
      alt: isEn ? 'Cekidot Correspondence Application' : 'Aplikasi Cekidot Persuratan Dispar',
      title: isEn ? 'Dispar Sulteng Cekidot Service' : 'Layanan Cekidot Dispar Sulteng',
      subtitle: isEn ? 'Digitalization of Correspondence and Agency Services' : 'Digitalisasi Persuratan dan Pelayanan Dinas',
      link: 'https://cekidot.dispar.my.id/kirim-surat',
      isExternal: true,
    },
  ];
};

const AUTOPLAY_INTERVAL = 5000;
const DUAL_SLIDE_DURATION = 11000;
const SUB_SCENE_INTERVAL = 5500;

// Per-letter sweep animation without any bounding boxes or div highlights
const LetterSweep = ({ text, baseColor, highlightColor, glowColor, delayOffset = 0, className = '' }) => {
  return (
    <span className={`inline-block select-none whitespace-nowrap ${className}`}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          animate={{
            color: [baseColor, highlightColor, baseColor],
            textShadow: [
              '0 2px 4px rgba(0,0,0,0.95), 0 4px 12px rgba(0,0,0,0.85)',
              `0 0 16px ${glowColor}, 0 2px 6px rgba(0,0,0,0.95)`,
              '0 2px 4px rgba(0,0,0,0.95), 0 4px 12px rgba(0,0,0,0.85)',
            ],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 1.0,
            repeat: Infinity,
            repeatDelay: 3.0,
            delay: delayOffset + i * 0.05,
            ease: 'easeInOut',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};

const Hero = ({ language: propLanguage }) => {
  const { language: contextLanguage } = useLanguage();
  const language = propLanguage || contextLanguage || 'ID';
  const slides = getSlides(language);
  const strings = UI_STRINGS[language] || UI_STRINGS.ID;

  const [current, setCurrent] = useState(0);
  const [subImageIdx, setSubImageIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => setCurrent((prev) => (prev + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length), [slides.length]);

  // Continuous video-like cycling between Adegan 1 (Megalit) and Adegan 2 (Lore Lindu) on Slide 0
  useEffect(() => {
    if (current !== 0) {
      setSubImageIdx(0);
      return;
    }

    const subTimer = setInterval(() => {
      setSubImageIdx((prev) => (prev === 0 ? 1 : 0));
    }, SUB_SCENE_INTERVAL);

    return () => clearInterval(subTimer);
  }, [current]);

  // Carousel Autoplay management for advancing slides
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;

    const duration = current === 0 ? DUAL_SLIDE_DURATION : AUTOPLAY_INTERVAL;

    const slideTimer = setTimeout(() => {
      next();
    }, duration);

    return () => clearTimeout(slideTimer);
  }, [current, isPaused, next, slides.length]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [next, prev]);

  const slide = slides[current] ?? slides[0];
  const activeDuration = current === 0 ? DUAL_SLIDE_DURATION : AUTOPLAY_INTERVAL;

  return (
    <section
      aria-label="Hero Banner"
      className="relative w-full aspect-[12/5] min-h-[240px] sm:min-h-[290px] md:min-h-[360px] max-h-[800px] bg-slate-950 overflow-hidden flex items-center justify-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slide 0: Unified Dual-Destination Video-like Experience */}
      {current === 0 ? (
        <div className="absolute inset-0 overflow-hidden bg-slate-950">
          {/* Scene 1 (TAMPIL PERTAMA): Patung Megalit Poso, Bukit Selena Palu, & Danau Paisupok Banggai */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
            initial={false}
            animate={{
              opacity: subImageIdx === 0 ? 1 : 0,
              scale: subImageIdx === 0 ? 1.05 : 1.0,
            }}
            transition={{
              opacity: { duration: 1.4, ease: 'easeInOut' },
              scale: { duration: 6, ease: 'easeOut' },
            }}
          >
            <img
              src="/images/slider/hero-banner-destinasi-2.jpg?v=4kultra"
              alt="Destinasi Wisata Sulawesi Tengah - Patung Megalit Poso, Bukit Selena Palu, Danau Paisupok Banggai"
              className="w-full h-full object-cover object-center"
              style={{ imageRendering: 'high-quality', transform: 'translateZ(0)' }}
              loading="eager"
            />
          </motion.div>

          {/* Scene 2 (TAMPIL KEDUA): Taman Nasional Lore Lindu, Air Terjun Saluopa Poso, & Kepulauan Tojo Una-Una */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
            initial={false}
            animate={{
              opacity: subImageIdx === 1 ? 1 : 0,
              scale: subImageIdx === 1 ? 1.0 : 1.05,
            }}
            transition={{
              opacity: { duration: 1.4, ease: 'easeInOut' },
              scale: { duration: 6, ease: 'easeOut' },
            }}
          >
            <img
              src="/images/slider/hero-banner-destinasi-1.jpg?v=4kultra"
              alt="Destinasi Wisata Sulawesi Tengah - Taman Nasional Lore Lindu, Air Terjun Saluopa, Kepulauan Tojo Una-Una"
              className="w-full h-full object-cover object-center"
              style={{ imageRendering: 'high-quality', transform: 'translateZ(0)' }}
              loading="eager"
            />
          </motion.div>

          {/* Animated Welcome Text Overlay - Centered Vertically on Left (Zero Boxes, Pure Letter-by-Letter Sweep) */}
          <div className="absolute left-5 sm:left-10 md:left-14 lg:left-20 xl:left-24 top-1/2 -translate-y-1/2 z-20 max-w-[95%] sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl text-left pointer-events-none flex flex-col gap-1 sm:gap-1.5 md:gap-2">
            
            {/* Line 1: Selamat Datang di Website Resmi */}
            <div className="whitespace-nowrap">
              <LetterSweep
                text={strings.welcomeLine1}
                baseColor="#FFFFFF"
                highlightColor="#E0F2FE"
                glowColor="rgba(255, 255, 255, 0.95)"
                delayOffset={0}
                className="italic font-medium tracking-wide text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl"
              />
            </div>

            {/* Line 2: DINAS PARIWISATA (Golden Yellow Sweep per-huruf) */}
            <div className="whitespace-nowrap">
              <LetterSweep
                text={strings.welcomeLine2}
                baseColor="#F6C843"
                highlightColor="#FFFBEB"
                glowColor="rgba(254, 240, 138, 0.95)"
                delayOffset={0.5}
                className="font-black tracking-tight text-lg sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl leading-none"
              />
            </div>

            {/* Line 3: PROVINSI SULAWESI TENGAH */}
            <div className="whitespace-nowrap">
              <LetterSweep
                text={strings.welcomeLine3}
                baseColor="#FFFFFF"
                highlightColor="#E2E8F0"
                glowColor="rgba(255, 255, 255, 0.95)"
                delayOffset={1.2}
                className="font-extrabold uppercase tracking-wider text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl leading-tight"
              />
            </div>

          </div>
        </div>
      ) : (
        /* Slides 1..8: Standard Slides */
        <AnimatePresence mode="sync">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            {slide.link && slide.link !== '#' ? (
              <a
                href={slide.link}
                target={slide.isExternal ? '_blank' : '_self'}
                rel={slide.isExternal ? 'noopener noreferrer' : undefined}
                className="block w-full h-full cursor-pointer"
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                  onError={(e) => {
                    const fallback = slide.fallbackImage || '/slider/Slider.jpg';
                    if (!e.currentTarget.src.endsWith(fallback)) {
                      e.currentTarget.src = fallback;
                    }
                  }}
                />
              </a>
            ) : (
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover object-center"
                loading="eager"
                onError={(e) => {
                  const fallback = slide.fallbackImage || '/slider/Slider.jpg';
                  if (!e.currentTarget.src.endsWith(fallback)) {
                    e.currentTarget.src = fallback;
                  }
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Glass Navigation Arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="group z-20 absolute left-3 md:left-6 w-9 h-9 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white bg-gradient-to-br from-white/25 to-white/5 hover:from-white/35 hover:to-white/10 border border-white/30 backdrop-blur-xl backdrop-saturate-150 shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.4)] hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 drop-shadow-md transition-transform duration-300 group-hover:-translate-x-0.5" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="group z-20 absolute right-3 md:right-6 w-9 h-9 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white bg-gradient-to-br from-white/25 to-white/5 hover:from-white/35 hover:to-white/10 border border-white/30 backdrop-blur-xl backdrop-saturate-150 shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.4)] hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 drop-shadow-md transition-transform duration-300 group-hover:translate-x-0.5" />
      </button>

      {/* Slide Indicators (Dots) */}
      <div className="z-20 absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/15">
        {slides.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Slide ${idx + 1}: ${s.title}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === current ? 'w-6 bg-amber-400' : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      {!isPaused && (
        <motion.div
          key={`progress-${current}`}
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: activeDuration / 1000, ease: 'linear' }}
          className="absolute bottom-0 left-0 h-1 bg-amber-400 z-20"
        />
      )}
    </section>
  );
};

export default Hero;
