import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  { image: '/slider/Slider.jpg', alt: 'Pemandangan Sulawesi Tengah' },
];

const AUTOPLAY_INTERVAL = 5000;

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => setCurrent((prev) => (prev + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (isPaused || SLIDES.length <= 1) return;
    const timer = setInterval(next, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [next, prev]);

  const slide = SLIDES[current] ?? SLIDES[0];
  if (!slide) return <div className="w-full aspect-[12/5] max-h-[800px] bg-slate-950" />;

  return (
    <section
      aria-label="Featured content"
      className="relative w-full aspect-[12/5] max-h-[800px] bg-slate-950 overflow-hidden flex items-center justify-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.alt}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </motion.div>
      </AnimatePresence>





      {/* Arrows (glassmorphism) */}
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


      {/* Progress bar */}
      {!isPaused && (
        <motion.div
          key={`progress-${current}`}
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: AUTOPLAY_INTERVAL / 1000, ease: 'linear' }}
          className="absolute bottom-0 left-0 h-1 bg-amber-400 z-20"
        />
      )}
    </section>
  );
};

export default Hero;
