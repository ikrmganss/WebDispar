import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../services/api';
import { getImageSrc } from '../utils/imageHelper';

const SLIDES = [
  {
    isDual: true,
    alt: 'Dinas Pariwisata Provinsi Sulawesi Tengah - Destinasi Wisata Unggulan',
    title: 'Destinasi Wisata Unggulan Sulawesi Tengah',
    subtitle: 'Pesona Megalit, Bukit Selena, Danau Paisupok, Lore Lindu, dan Kepulauan Togean',
    link: '#',
  },
  {
    image: '/images/slider/slider-1-kantor-dispar.jpg',
    fallbackImage: '/slider/Slider.jpg',
    alt: 'Kantor Dinas Pariwisata Provinsi Sulawesi Tengah',
    title: 'Dinas Pariwisata Provinsi Sulawesi Tengah',
    subtitle: 'Mewujudkan Pariwisata Sulteng yang Maju, Berdaya Saing, dan Berkelanjutan',
    link: '#',
  },
  {
    image: '/images/slider/slider2.jpg',
    fallbackImage: '/slider/Slider.jpg',
    alt: 'Komitmen Keterbukaan Informasi Publik PPID',
    title: 'Komitmen Keterbukaan Informasi Publik',
    subtitle: 'Layanan Transparan, Akuntabel, dan Terpercaya',
    link: '/ppid',
  },
  {
    image: '/images/slider/slider3.jpg',
    fallbackImage: '/slider/Slider.jpg',
    alt: 'PPID Dinas Pariwisata Sulawesi Tengah',
    title: 'PPID Dinas Pariwisata Sulteng',
    subtitle: 'Akses Dokumen, Regulasi, dan Pelayanan Informasi Publik',
    link: '/ppid',
  },
  {
    image: '/images/slider/slider4.jpg',
    fallbackImage: '/slider/Slider.jpg',
    alt: 'Indikator Kinerja Utama Dispar 2026',
    title: 'Indikator Kinerja Utama (IKU) 2026',
    subtitle: 'Target dan Capaian Pembangunan Kepariwisataan',
    link: '#',
  },
  {
    image: '/images/slider/slider5.jpg',
    fallbackImage: '/slider/Slider.jpg',
    alt: 'Command Center Berani Samporoa',
    title: 'Command Center BERANI - SAMPOROA',
    subtitle: 'Hotline Layanan Cepat Tanggap Pariwisata Sulteng',
    link: 'https://wa.me/08116662222',
    isExternal: true,
  },
  {
    image: '/images/slider/slider6.png',
    fallbackImage: '/slider/Slider.jpg',
    alt: 'SP4N-LAPOR Pengaduan Pelayanan Publik',
    title: 'Layanan Aspirasi & Pengaduan SP4N-LAPOR',
    subtitle: 'Sampaikan Aspirasi dan Laporan Anda Secara Online',
    link: 'https://www.lapor.go.id/instansi/pemerintah-provinsi-sulawesi-tengah',
    isExternal: true,
  },
  {
    image: '/images/slider/slider7.jpg',
    fallbackImage: '/images/slider/slider7.png',
    alt: 'Kampanye Pariwisata Anti Korupsi',
    title: 'Pariwisata Berintegritas & Anti Korupsi',
    subtitle: 'Menjaga Tata Kelola Pemerintahan yang Bersih dan Berwibawa',
    link: '#',
  },
  {
    image: '/images/slider/slider8.jpg',
    fallbackImage: '/slider/Slider.jpg',
    alt: 'Aplikasi Cekidot Persuratan Dispar',
    title: 'Layanan Cekidot Dispar Sulteng',
    subtitle: 'Digitalisasi Persuratan dan Pelayanan Dinas',
    link: 'https://cekidot.dispar.my.id/kirim-surat',
    isExternal: true,
  },
];

const AUTOPLAY_INTERVAL = 5000;
const DUAL_SLIDE_DURATION = 11000;
const SUB_SCENE_INTERVAL = 5500;

// Stylized "DINAS PARIWISATA" with dynamic light sweep (animasi cahaya anggun & modern)
// Bebas kotak transparan (zero bounding box artifacts) & kualitas ultra HD (jernih)
const StylizedDinasPariwisata = () => {
  return (
    <div className="relative inline-block select-none pointer-events-none">
      {/* Base Stylized Golden Yellow Typography (Kuning Keemasan Gambar 1 + Tipografi Khas Gambar 2, HD 4K) */}
      <img
        src="/images/dinas-pariwisata-yellow.png?v=4kultra2"
        alt="Dinas Pariwisata"
        className="h-7 sm:h-10 md:h-14 lg:h-16 xl:h-20 max-w-full w-auto object-contain block drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)] drop-shadow-[0_0_20px_rgba(246,193,44,0.3)]"
        style={{ imageRendering: 'high-quality', transform: 'translateZ(0)' }}
        draggable={false}
      />

      {/* Animasi Cahaya: Berkilau Anggun & Modern melintasi huruf tanpa kotak latar (clip-path beam) */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none"
        initial={{
          clipPath: 'polygon(-35% 0%, -10% 0%, -20% 100%, -45% 100%)',
          opacity: 0,
        }}
        animate={{
          clipPath: [
            'polygon(-35% 0%, -10% 0%, -20% 100%, -45% 100%)',
            'polygon(35% 0%, 65% 0%, 55% 100%, 25% 100%)',
            'polygon(115% 0%, 145% 0%, 135% 100%, 105% 100%)',
          ],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          repeatDelay: 3.2,
          times: [0, 0.5, 1],
          ease: [0.25, 0.1, 0.25, 1.0],
        }}
      >
        <img
          src="/images/dinas-pariwisata-shine-hd.png?v=4kultra2"
          alt=""
          className="w-full h-full object-contain block filter drop-shadow-[0_0_12px_rgba(255,255,255,0.95)] drop-shadow-[0_0_24px_rgba(254,240,138,0.7)]"
          style={{ imageRendering: 'high-quality', transform: 'translateZ(0)' }}
          draggable={false}
        />
      </motion.div>
    </div>
  );
};

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

const Hero = () => {
  const [slides, setSlides] = useState(SLIDES);
  const [current, setCurrent] = useState(0);
  const [subImageIdx, setSubImageIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => setCurrent((prev) => (prev + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    let mounted = true;
    api.get('/slider')
      .then(({ data }) => {
        if (!mounted || !Array.isArray(data)) return;
        const active = data.filter((item) => item.gambar).map((item) => ({
          image: getImageSrc(item.gambar),
          fallbackImage: '/slider/Slider.jpg',
          alt: item.judul || 'Banner pariwisata Sulawesi Tengah',
          title: item.judul || 'Banner pariwisata Sulawesi Tengah',
        }));
        if (active.length) {
          setCurrent(0);
          setSlides(active);
        }
      })
      .catch(() => {});
    return () => { mounted = false; };
  }, []);

  // Continuous video-like cycling between Adegan 1 (Megalit) and Adegan 2 (Lore Lindu) on Slide 0
  useEffect(() => {
    if (!slides[current]?.isDual) {
      setSubImageIdx(0);
      return;
    }

    const subTimer = setInterval(() => {
      setSubImageIdx((prev) => (prev === 0 ? 1 : 0));
    }, SUB_SCENE_INTERVAL);

    return () => clearInterval(subTimer);
  }, [current, slides]);

  // Carousel Autoplay management for advancing slides
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;

    const duration = slides[current]?.isDual ? DUAL_SLIDE_DURATION : AUTOPLAY_INTERVAL;

    const slideTimer = setTimeout(() => {
      next();
    }, duration);

    return () => clearTimeout(slideTimer);
  }, [current, isPaused, next, slides]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [next, prev]);

  const slide = slides[current] ?? slides[0];
  const activeDuration = slide.isDual ? DUAL_SLIDE_DURATION : AUTOPLAY_INTERVAL;

  return (
    <section
      aria-label="Hero Banner"
      className="relative w-full aspect-[12/5] min-h-[240px] sm:min-h-[290px] md:min-h-[360px] max-h-[800px] bg-slate-950 overflow-hidden flex items-center justify-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slide 0: Unified Dual-Destination Video-like Experience */}
      {slide.isDual ? (
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
            
            {/* Line 1: Selamat Datang di Website Resmi (Emas/Kuning Italic Serif Gambar 2) */}
            <div className="whitespace-nowrap">
              <LetterSweep
                text="Selamat Datang di Website Resmi"
                baseColor="#F6C843"
                highlightColor="#FFFBEB"
                glowColor="rgba(254, 240, 138, 0.95)"
                delayOffset={0}
                className="italic font-serif font-medium tracking-wide text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl"
              />
            </div>

            {/* Line 2: DINAS PARIWISATA (Tipografi Khusus Gambar 2 + Warna Kuning Gambar 1 + Animasi Cahaya) */}
            <div className="whitespace-nowrap my-0.5 sm:my-1">
              <StylizedDinasPariwisata />
            </div>

            {/* Line 3: PROVINSI SULAWESI TENGAH */}
            <div className="whitespace-nowrap">
              <LetterSweep
                text="PROVINSI SULAWESI TENGAH"
                baseColor="#FFFFFF"
                highlightColor="#F8FAFC"
                glowColor="rgba(255, 255, 255, 0.95)"
                delayOffset={1.0}
                className="font-extrabold uppercase tracking-[0.16em] sm:tracking-[0.22em] text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl leading-tight"
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
