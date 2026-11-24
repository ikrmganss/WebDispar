import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const BackToTop = ({ language = 'ID' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const isEn = language === 'EN';

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isEn ? 'Back to top' : 'Kembali ke atas'}
          title={isEn ? 'Back to top' : 'Kembali ke atas'}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white bg-gradient-to-tr from-[#1F5BA6] to-[#5C2180] border border-white/25 shadow-xl shadow-purple-950/40 hover:border-amber-400 transition-colors group cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:-translate-y-0.5 transition-transform duration-200" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
