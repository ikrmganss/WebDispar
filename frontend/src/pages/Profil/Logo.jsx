import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Download, Image as ImageIcon, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const LOGO_ITEMS = [
  { label: 'Logo Full Color', desc: 'Logo utama dengan warna lengkap', file: '/logo/logo-full-color.png', bg: 'bg-white' },
  { label: 'Logo Berwarna - Putih', desc: 'Logo dengan latar putih', file: '/logo/logo-putih.png', bg: 'bg-gray-100' },
  { label: 'Logo Putih Transparan', desc: 'Untuk background gelap', file: '/logo/logo-white.png', bg: 'bg-navy-800' },
  { label: 'Logo Monokrom', desc: 'Versi hitam putih', file: '/logo/logo-monokrom.png', bg: 'bg-gray-100' },
  { label: 'Logo Horizontal', desc: 'Logo dengan tulisan di samping', file: '/logo/logo-horizontal.png', bg: 'bg-white' },
  { label: 'Logo Vertikal', desc: 'Logo dengan tulisan di bawah', file: '/logo/logo-vertikal.png', bg: 'bg-white' },
];

const Logo = () => {
  const [activeTab, setActiveTab] = useState('logo');

  return (
    <>
      <Helmet><title>Logo - Dinas Pariwisata Sulteng</title></Helmet>

      <div className="bg-gradient-to-r from-navy-900 to-primary-800 py-16 lg:py-20">
        <div className="container-custom">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-white">Logo & Identitas</h1>
          <p className="text-white/70 mt-2">Unduh logo resmi Dinas Pariwisata Provinsi Sulawesi Tengah</p>
        </div>
      </div>

      <section className="py-12 lg:py-16">
        <div className="container-custom">
          {/* Tabs */}
          <div className="flex gap-2 mb-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('logo')}
              className={`px-5 py-3 font-semibold transition-colors border-b-2 -mb-px ${
                activeTab === 'logo'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-navy-900'
              }`}
            >
              <ImageIcon size={18} className="inline mr-2" />
              Logo
            </button>
            <button
              onClick={() => setActiveTab('panduan')}
              className={`px-5 py-3 font-semibold transition-colors border-b-2 -mb-px ${
                activeTab === 'panduan'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-navy-900'
              }`}
            >
              <FileText size={18} className="inline mr-2" />
              Panduan Logo
            </button>
          </div>

          {activeTab === 'logo' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {LOGO_ITEMS.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="card overflow-hidden"
                >
                  <div className={`${item.bg} aspect-square flex items-center justify-center p-8 border-b border-gray-100`}>
                    <img
                      src={item.file}
                      alt={item.label}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<span class="text-gray-400 text-sm">Preview Logo</span>';
                      }}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-navy-900 mb-1">{item.label}</h3>
                    <p className="text-xs text-gray-500 mb-4">{item.desc}</p>
                    <a
                      href={item.file}
                      download
                      className="w-full inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                      <Download size={14} /> Unduh PNG
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'panduan' && (
            <div className="card p-8 text-center">
              <FileText size={64} className="text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-navy-900 mb-2">Panduan Penggunaan Logo</h3>
              <p className="text-gray-500 mb-6">
                Panduan lengkap penggunaan logo Dinas Pariwisata Provinsi Sulawesi Tengah
              </p>
              <a
                href="/logo/panduan-logo.pdf"
                download
                className="btn-primary"
              >
                <Download size={18} /> Unduh Panduan Logo (PDF)
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Logo;