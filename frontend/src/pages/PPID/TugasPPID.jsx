import { Helmet } from 'react-helmet-async';
import { FileText, Shield, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import PageHeader from '../../components/PageHeader';

const TugasPPID = () => {
  const tugasPPIDProvinsi = [
    'Mengoordinasikan dan mengonsolidasikan pengumpulan bahan Informasi dan Dokumentasi dari PPID pada Perangkat Daerah;',
    'Menyimpan, mendokumentasikan, menyediakan dan memberi pelayanan Informasi kepada publik;',
    'Melakukan klarifikasi terhadap verifikasi bahan Informasi Publik yang dilakukan oleh PPID pada Perangkat Daerah;',
    'Melakukan pemutakhiran Informasi dan Dokumentasi;',
    'Menyediakan Informasi dan Dokumentasi untuk diakses oleh pemohon Informasi Publik;',
    'Melaksanakan inventarisasi dan melakukan uji konsekuensi atas Informasi yang dikecualikan;',
    'Melakukan evaluasi terhadap kinerja PPID pada Perangkat Daerah;',
    'Melakukan koordinasi dan konsultasi ke Kementerian Komunikasi dan Informatika dan Komisi Informasi serta lembaga lainnya yang berhubungan dengan keterbukaan Informasi;',
    'Membuat laporan pelayanan informasi; dan',
    'Melaksanakan tugas lainnya yang diperintahkan oleh Atasan PPID.',
  ];

  const tugasPPIDPerangkatDaerah = [
    'Memberikan layanan Informasi kepada publik;',
    'Menyimpan, mendokumentasikan, menyediakan dan memberi pelayanan Informasi kepada publik;',
    'Membantu PPID Provinsi di dalam melaksanakan tugasnya;',
    'Melakukan verifikasi bahan Informasi Publik;',
    'Melakukan pemutakhiran informasi dan Dokumentasi;',
    'Menyediakan Informasi dan Dokumentasi untuk diakses oleh pemohon Informasi Publik;',
    'Melakukan inventarisasi Informasi yang dikecualikan untuk selanjutnya dilakukan uji konsekuensi;',
    'Membuat laporan pelayanan Informasi; dan',
    'Melaksanakan tugas lainnya yang diperintahkan oleh Atasan PPID.',
  ];

  const tanggungJawab = [
    {
      title: 'PPID Provinsi',
      desc: 'Bertanggung jawab mengoordinasikan penyimpanan, pendokumentasian, penyediaan layanan dan pengumuman seluruh Informasi Publik di Perangkat Daerah yang dapat diakses oleh publik sesuai dengan ketentuan peraturan perundang-undangan.',
    },
    {
      title: 'PPID pada Perangkat Daerah',
      desc: 'Bertanggung jawab di bidang layanan Informasi Publik yang meliputi proses penyimpanan, pendokumentasian, penyediaan pelayanan dan pengumuman Informasi yang dapat diakses oleh publik sesuai dengan ketentuan peraturan perundang-undangan.',
    },
  ];

  return (
    <>
      <Helmet><title>Tugas PPID - Dinas Pariwisata Sulteng</title></Helmet>

      <PageHeader
        badge="PPID Pelaksana Dinas Pariwisata Sulteng"
        badgeIcon={FileText}
        title="Tugas PPID dan PPID Pelaksana"
        subtitle="Rincian Tugas Pokok, Fungsi, dan Tanggung Jawab Pengelola Informasi dan Dokumentasi sesuai Regulasi KIP"
        breadcrumbs={[
          { label: 'PPID', path: '/ppid/profil' },
          { label: 'Tugas PPID' }
        ]}
      />

      <section className="py-12 lg:py-16">
        <div className="container-custom max-w-5xl space-y-8">
          {/* Tugas PPID Provinsi */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-8"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-primary-600 flex items-center justify-center text-white">
                <FileText size={24} />
              </div>
              <h2 className="text-xl lg:text-2xl font-bold text-navy-900">PPID Provinsi</h2>
            </div>
            <ol className="space-y-3">
              {tugasPPIDProvinsi.map((item, idx) => (
                <li key={idx} className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-xs">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700 text-sm leading-relaxed pt-0.5">{item}</span>
                </li>
              ))}
            </ol>
          </motion.div>

          {/* Tugas PPID Perangkat Daerah */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-8"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-gold-400 flex items-center justify-center text-navy-900">
                <FileText size={24} />
              </div>
              <h2 className="text-xl lg:text-2xl font-bold text-navy-900">PPID pada Perangkat Daerah</h2>
            </div>
            <ol className="space-y-3">
              {tugasPPIDPerangkatDaerah.map((item, idx) => (
                <li key={idx} className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold-100 text-gold-700 flex items-center justify-center font-bold text-xs">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700 text-sm leading-relaxed pt-0.5">{item}</span>
                </li>
              ))}
            </ol>
          </motion.div>

          {/* Tanggung Jawab */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-8 bg-gradient-to-br from-primary-50 to-white"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-primary-200">
              <div className="w-12 h-12 rounded-xl bg-navy-900 flex items-center justify-center text-white">
                <Shield size={24} />
              </div>
              <h2 className="text-xl lg:text-2xl font-bold text-navy-900">Tanggung Jawab</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {tanggungJawab.map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl p-5 border border-primary-100">
                  <h3 className="font-bold text-primary-700 mb-2 flex items-center gap-2">
                    <CheckCircle2 size={16} /> {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default TugasPPID;