import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FileText, Download, Clock, DollarSign, ArrowRight, Shield, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const StandarPelayanan = () => {
  const sopList = [
    'SOP Penetapan dan Pemutakhiran Daftar Informasi Publik',
    'SOP Pendokumentasian Informasi yang Dikecualikan',
    'SOP Pelayanan Informasi dan Dokumentasi Publik',
    'SOP Keberatan Informasi Publik',
    'SOP Fasilitasi Sengketa Informasi',
    'SOP Pengujian Konsekuensi Informasi Publik',
    'SOP Pendokumentasian dan Pengarsipan Daftar Informasi Publik',
  ];

  const mekanisme = [
    { label: 'Standar Pelayanan Pendaftaran HAKI', path: '/ppid/standar-pelayanan/haki' },
    { label: 'Mekanisme Pelayanan Informasi Publik', path: '/ppid/standar-pelayanan/mekanisme-pelayanan' },
    { label: 'Mekanisme Pengajuan Keberatan Informasi', path: '/ppid/standar-pelayanan/mekanisme-keberatan' },
    { label: 'Mekanisme Permohonan Penyelesaian Sengketa Informasi', path: '/ppid/standar-pelayanan/mekanisme-sengketa' },
    { label: 'Alur Mekanisme Penanganan Sengketa Informasi Publik', path: '/ppid/standar-pelayanan/alur-sengketa' },
    { label: 'Alur Adjudikasi Penyelesaian Sengketa Informasi', path: '/ppid/standar-pelayanan/alur-adjudikasi' },
  ];

  return (
    <>
      <Helmet><title>Standar Pelayanan Publik - PPID Dinas Pariwisata Sulteng</title></Helmet>

      <div className="bg-gradient-to-r from-navy-900 to-primary-800 py-16 lg:py-20">
        <div className="container-custom">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-white">Standar Pelayanan Publik</h1>
          <p className="text-white/70 mt-2">PPID Dinas Pariwisata Provinsi Sulawesi Tengah</p>
        </div>
      </div>

      <section className="py-12 lg:py-16">
        <div className="container-custom max-w-5xl space-y-8">
          {/* Mekanisme */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-8"
          >
            <h2 className="text-2xl font-bold text-navy-900 mb-6 flex items-center gap-3">
              <Shield size={24} className="text-primary-600" />
              Mekanisme Pelayanan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mekanisme.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.path}
                  className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-primary-50 border border-gray-100 hover:border-primary-300 transition-all group"
                >
                  <span className="text-sm font-medium text-navy-900 group-hover:text-primary-700">
                    {item.label}
                  </span>
                  <ArrowRight size={16} className="text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* SOP */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-8"
          >
            <h2 className="text-2xl font-bold text-navy-900 mb-6 flex items-center gap-3">
              <FileText size={24} className="text-gold-500" />
              SOP Pelayanan Informasi
            </h2>
            <div className="space-y-3">
              {sopList.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gold-50 transition-colors"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gold-400 text-navy-900 flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </span>
                  <span className="flex-1 text-sm text-gray-700">{item}</span>
                  <a
                    href={`/sop/${item.toLowerCase().replace(/\s+/g, '-')}.pdf`}
                    download
                    className="text-xs font-semibold text-primary-600 hover:underline flex items-center gap-1"
                  >
                    <Download size={12} /> PDF
                  </a>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Biaya & Waktu */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                <DollarSign size={26} className="text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">Biaya Pelayanan</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Pelayanan informasi publik <strong>tidak dikenakan biaya</strong> sesuai dengan ketentuan UU 14/2008 tentang Keterbukaan Informasi Publik.
              </p>
              <a href="/dokumen/biaya-pelayanan.pdf" download className="text-xs font-semibold text-primary-600 hover:underline">
                → Unduh Dokumen Biaya Pelayanan
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                <Clock size={26} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">Waktu Pelayanan</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Waktu pelayanan informasi publik sesuai dengan ketentuan yang berlaku, maksimal <strong>10 hari kerja</strong> untuk permohonan biasa dan <strong>3 hari kerja</strong> untuk permohonan yang mendesak.
              </p>
              <a href="/dokumen/waktu-pelayanan.pdf" download className="text-xs font-semibold text-primary-600 hover:underline">
                → Unduh Dokumen Waktu Pelayanan
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StandarPelayanan;