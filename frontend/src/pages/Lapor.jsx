import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ExternalLink } from 'lucide-react';

const Lapor = () => {
  useEffect(() => {
    // Auto redirect ke lapor.go.id setelah 2 detik
    const timer = setTimeout(() => {
      window.location.href = 'https://www.lapor.go.id';
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet><title>LAPOR! - Dinas Pariwisata Sulteng</title></Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-900 to-primary-800 p-4 pt-20">
        <div className="text-center text-white max-w-md">
          <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur flex items-center justify-center mx-auto mb-6 animate-pulse">
            <ExternalLink size={36} className="text-gold-400" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Mengalihkan ke LAPOR!</h1>
          <p className="text-white/70 mb-6">
            Anda akan diarahkan ke situs resmi LAPOR! (Layanan Aspirasi dan Pengaduan Online Rakyat)
          </p>
          <a
            href="https://www.lapor.go.id"
            className="btn-primary inline-flex"
          >
            <ExternalLink size={18} /> Buka LAPOR! Sekarang
          </a>
          <p className="text-xs text-white/50 mt-6">
            Jika tidak dialihkan otomatis, klik tombol di atas.
          </p>
        </div>
      </div>
    </>
  );
};

export default Lapor;