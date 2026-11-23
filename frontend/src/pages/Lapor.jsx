import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Lapor = () => {
  const { language } = useLanguage();
  const isEn = language === 'EN';

  useEffect(() => {
    // Auto redirect ke lapor.go.id setelah 2 detik
    const timer = setTimeout(() => {
      window.location.href = 'https://www.lapor.go.id';
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>{isEn ? 'LAPOR! - Public Service Complaints' : 'LAPOR! - Dinas Pariwisata Sulteng'}</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-900 to-primary-800 p-4 pt-20">
        <div className="text-center text-white max-w-md">
          <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur flex items-center justify-center mx-auto mb-6 animate-pulse">
            <ExternalLink size={36} className="text-gold-400" />
          </div>
          <h1 className="text-3xl font-bold mb-3">
            {isEn ? 'Redirecting to LAPOR!' : 'Mengalihkan ke LAPOR!'}
          </h1>
          <p className="text-white/70 mb-6">
            {isEn
              ? 'You will be redirected to the official LAPOR! platform (People Online Aspirations and Complaints Service)'
              : 'Anda akan diarahkan ke situs resmi LAPOR! (Layanan Aspirasi dan Pengaduan Online Rakyat)'}
          </p>
          <a
            href="https://www.lapor.go.id"
            className="btn-primary inline-flex"
          >
            <ExternalLink size={18} /> {isEn ? 'Open LAPOR! Now' : 'Buka LAPOR! Sekarang'}
          </a>
          <p className="text-xs text-white/50 mt-6">
            {isEn ? 'If not redirected automatically, please click the button above.' : 'Jika tidak dialihkan otomatis, klik tombol di atas.'}
          </p>
        </div>
      </div>
    </>
  );
};

export default Lapor;
