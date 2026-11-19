import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

const StrukturOrganisasiPPID = () => {
  const boxes = [
    // Top
    { level: 0, title: 'Atasan PPID-P', subtitle: 'KEPALA DINAS PARIWISATA', color: 'bg-navy-900 text-white' },
    { level: 1, title: 'PPID-P', subtitle: 'SEKRETARIS DINAS PARIWISATA', color: 'bg-primary-700 text-white' },
    { level: 2, title: 'Sekretaris PPID-P', subtitle: 'KASUBAG KEPEGAWAIAN & UMUM DINAS PARIWISATA', color: 'bg-primary-600 text-white' },
  ];

  const bidang = [
    {
      title: 'BIDANG PENGELOLAAN INFORMASI',
      coordinator: 'Koordinator',
      members: [
        'Kepala Bidang Pengembangan Destinasi Pariwisata',
        'Kepala Bidang Pengembangan Ekonomi Kreatif, Pemanfaatan & Perlindungan Hak Kekayaan Intelektual',
        'Anggota',
        'Adyatama Kepariwisataan Ekonomi Kreatif Ahli Muda',
        'Staf Bidang Pengembangan Destinasi Pariwisata',
        'Staf Bidang Pengembangan Industri Pariwisata',
        'Staf Sub Bagian Kepegawaian dan Umum',
      ],
    },
    {
      title: 'BIDANG PELAYANAN INFORMASI',
      coordinator: 'Koordinator',
      members: [
        'Kepala Bidang Pengembangan Pemasaran Pariwisata',
        'Anggota',
        'Perencana Ahli Muda',
        'Adyatama Kepariwisataan Ekonomi Kreatif Ahli Muda',
        'Staf Bidang Pengembangan Pemasaran Pariwisata',
        'Staf Sub Bagian Program',
      ],
    },
    {
      title: 'BIDANG DOKUMENTASI DAN ARSIP',
      coordinator: 'Koordinator',
      members: [
        'Kepala Bidang Sumber Daya Pariwisata dan Ekonomi Kreatif',
        'Anggota',
        'Kepala Sub Bagian Keuangan dan Aset',
        'Adyatama Kepariwisataan Ekonomi Kreatif Ahli Muda',
        'Staf Bidang Pengembangan Kelembagaan Kepariwisataan',
        'Staf Sub Bagian Keuangan dan Aset',
      ],
    },
  ];

  return (
    <>
      <Helmet><title>Struktur Organisasi PPID - Dinas Pariwisata Sulteng</title></Helmet>

      <PageHeader
        badge="PPID Pelaksana Dinas Pariwisata Sulteng"
        badgeIcon={Users}
        title="Struktur Organisasi PPID"
        subtitle="Bagan Susunan dan Tim Pengelola Informasi dan Dokumentasi Dinas Pariwisata Provinsi Sulawesi Tengah"
        breadcrumbs={[
          { label: 'PPID', path: '/ppid/profil' },
          { label: 'Struktur Organisasi PPID' }
        ]}
      />

      <section className="py-12 lg:py-16">
        <div className="container-custom">
          <div className="card p-8 lg:p-12 bg-gradient-to-br from-gray-50 to-white overflow-x-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <h2 className="text-xl lg:text-2xl font-bold text-navy-900 mb-2">
                STRUKTUR ORGANISASI
              </h2>
              <h3 className="text-lg lg:text-xl font-bold text-primary-700 mb-1">
                PEJABAT PENGELOLA INFORMASI DAN DOKUMENTASI
              </h3>
              <h4 className="text-base lg:text-lg font-semibold text-navy-800">
                DINAS PARIWISATA PROVINSI SULAWESI TENGAH
              </h4>
            </div>

            {/* Top level boxes */}
            <div className="flex flex-col items-center space-y-4 mb-10">
              {boxes.map((box, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="flex flex-col items-center"
                >
                  <div className={`${box.color} px-6 py-3 rounded-xl shadow-lg min-w-[320px] max-w-md text-center`}>
                    <p className="text-xs font-medium opacity-90">{box.title}</p>
                    <p className="text-sm font-bold">{box.subtitle}</p>
                  </div>
                  {idx < boxes.length - 1 && (
                    <div className="w-0.5 h-6 bg-navy-900" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Connecting line to bidang */}
            <div className="relative mb-6">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-0.5 h-4 bg-navy-900" />
              <div className="mt-4 border-t-2 border-navy-900 w-2/3 mx-auto" />
              <div className="relative flex justify-between w-2/3 mx-auto">
                {bidang.map((_, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="w-0.5 h-4 bg-navy-900" />
                  </div>
                ))}
              </div>
            </div>

            {/* Bidang */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {bidang.map((b, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 + 0.3 }}
                  className="flex flex-col items-center"
                >
                  {/* Bidang title */}
                  <div className="w-full bg-gold-400 text-navy-900 text-center py-3 px-4 rounded-xl font-bold text-xs shadow-md">
                    {b.title}
                  </div>
                  {/* Coordinator */}
                  <div className="mt-3 w-full bg-white border-2 border-primary-600 text-primary-700 text-center py-2 px-3 rounded-full font-semibold text-xs shadow">
                    {b.coordinator}
                  </div>
                  {/* Members */}
                  <div className="mt-3 w-full space-y-2">
                    {b.members.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className={`text-center py-2 px-3 rounded-lg text-[11px] leading-snug ${
                          m === 'Anggota'
                            ? 'bg-navy-900 text-white font-bold'
                            : 'bg-primary-50 text-navy-800 border border-primary-200'
                        }`}
                      >
                        {m}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StrukturOrganisasiPPID;