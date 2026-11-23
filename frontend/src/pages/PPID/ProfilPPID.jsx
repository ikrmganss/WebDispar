import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FileText, Users, Target, Shield, ArrowRight, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import PageHeader from '../../components/PageHeader';
import { useLanguage } from '../../context/LanguageContext';

const ProfilPPID = () => {
  const { language } = useLanguage();
  const isEn = language === 'EN';

  const subMenu = [
    { label: isEn ? 'PPID Organizational Structure' : 'Struktur Organisasi PPID', path: '/ppid/profil/struktur-organisasi', icon: Users },
    { label: isEn ? 'PPID Vision and Mission' : 'Visi dan Misi PPID', path: '/ppid/profil/visi-misi', icon: Target },
    { label: isEn ? 'Public Information Service Notice' : 'Maklumat Pelayanan Informasi Publik', path: '/ppid/profil/maklumat-pelayanan', icon: Shield },
    { label: isEn ? 'PPID & Executive Duties' : 'Tugas PPID dan PPID Pelaksana', path: '/ppid/profil/tugas-ppid', icon: FileText },
    { label: isEn ? 'Public Documents' : 'Dokumen Publik', path: '/ppid/daftar-informasi-publik', icon: FileText },
    { label: isEn ? 'PPID Annual Report' : 'Laporan Tahunan PPID', path: '/ppid/laporan-tahunan', icon: FileText },
    { label: isEn ? 'Decrees & Decisions' : 'Surat Keputusan', path: '/ppid/surat-keputusan', icon: FileText },
    { label: isEn ? 'Public Service Standards' : 'Standar Pelayanan Publik', path: '/ppid/standar-pelayanan', icon: Shield },
  ];

  return (
    <>
      <Helmet>
        <title>{isEn ? 'PPID Profile - Central Sulawesi Tourism' : 'Profil PPID - Dinas Pariwisata Sulteng'}</title>
      </Helmet>

      <PageHeader
        badge="PPID Pelaksana Dinas Pariwisata Sulteng"
        title="Profil PPID"
        subtitle="Pejabat Pengelola Informasi dan Dokumentasi Dinas Pariwisata Provinsi Sulawesi Tengah"
        breadcrumbs={[
          { label: 'PPID', path: '/ppid/profil' },
          { label: 'Profil PPID' }
        ]}
      />

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
                <h2 className="text-2xl font-bold text-navy-900 mb-3">{isEn ? 'What is PPID?' : 'Apa itu PPID?'}</h2>
                <p className="text-gray-700 leading-relaxed">
                  {isEn
                    ? 'PPID (Information Management and Documentation Officer) is an official responsible for storing, documenting, providing, and servicing public information within government bodies. The PPID of Central Sulawesi Tourism Department is committed to providing transparent, accountable public information in accordance with prevailing laws and regulations.'
                    : 'PPID (Pejabat Pengelola Informasi dan Dokumentasi) adalah pejabat yang bertanggung jawab di bidang penyimpanan, pendokumentasian, penyediaan, dan/atau pelayanan informasi di badan publik. PPID Dinas Pariwisata Provinsi Sulawesi Tengah berkomitmen memberikan pelayanan informasi publik yang transparan, akuntabel, dan sesuai dengan ketentuan peraturan perundang-undangan.'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Sub Menu Grid */}
          <h2 className="text-2xl font-bold text-navy-900 mb-6">{isEn ? 'PPID Profile Menu' : 'Menu Profil PPID'}</h2>
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
