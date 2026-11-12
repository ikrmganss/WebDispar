import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FileText, Users, Target, Shield, ArrowRight, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfilPPID = () => {
  const subMenu = [
    { label: 'Struktur Organisasi PPID', path: '/ppid/profil/struktur-organisasi', icon: Users },
    { label: 'Visi dan Misi PPID', path: '/ppid/profil/visi-misi', icon: Target },
    { label: 'Maklumat Pelayanan Informasi Publik', path: '/ppid/profil/maklumat-pelayanan', icon: Shield },
    { label: 'Tugas PPID dan PPID Pelaksana', path: '/ppid/profil/tugas-ppid', icon: FileText },
    { label: 'Dokumen Publik', path: '/ppid/daftar-informasi-publik', icon: FileText },
    { label: 'Laporan Tahunan PPID', path: '/ppid/laporan-tahunan', icon: FileText },
    { label: 'Surat Keputusan', path: '/ppid/surat-keputusan', icon: FileText },
    { label: 'Standar Pelayanan Publik', path: '/ppid/standar-pelayanan', icon: Shield },
  ];

  return (
    <>
      <Helmet><title>Profil PPID - Dinas Pariwisata Sulteng</title></Helmet>

      <div className="bg-gradient-to-r from-navy-900 to-primary-800 py-16 lg:py-20">
        <div className="container-custom">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-white">Profil PPID</h1>
          <p className="text-white/70 mt-2">
            Pejabat Pengelola Informasi dan Dokumentasi Dinas Pariwisata Provinsi Sulawesi Tengah
          </p>
        </div>
      </div>

      <section className="py-12 lg:py-16">
        <div className="container-custom">
          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-8 lg:p-10 mb-10 bg-gradient-to-br from-primary-50 to-white border-l-4 border-primary-600"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-600 flex items-center justify-center text-white flex-shrink-0">
                <Info size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-navy-900 mb-3">Apa itu PPID?</h2>
                <p className="text-gray-700 leading-relaxed">
                  PPID (Pejabat Pengelola Informasi dan Dokumentasi) adalah pejabat yang bertanggung jawab
                  di bidang penyimpanan, pendokumentasian, penyediaan, dan/atau pelayanan informasi di badan publik.
                  PPID Dinas Pariwisata Provinsi Sulawesi Tengah berkomitmen memberikan pelayanan informasi publik
                  yang transparan, akuntabel, dan sesuai dengan ketentuan peraturan perundang-undangan.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Sub Menu Grid */}
          <h2 className="text-2xl font-bold text-navy-900 mb-6">Menu Profil PPID</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {subMenu.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link
                  to={item.path}
                  className="card p-6 flex items-center gap-4 group hover:bg-primary-50 transition-colors h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-600 group-hover:bg-gold-400 group-hover:text-navy-900 flex items-center justify-center text-white transition-colors flex-shrink-0">
                    <item.icon size={22} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-navy-900 group-hover:text-primary-700 transition-colors text-sm">
                      {item.label}
                    </p>
                  </div>
                  <ArrowRight size={18} className="text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfilPPID;