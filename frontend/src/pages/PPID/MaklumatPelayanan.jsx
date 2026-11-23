import { Helmet } from 'react-helmet-async';
import { Shield, CheckCircle2, Download, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import PageHeader from '../../components/PageHeader';

const MaklumatPelayanan = () => {
  const pernyataan = [
    'Sanggup menyelenggarakan Pelayanan sesuai dengan Standar Pelayanan yang telah ditetapkan;',
    'Berkomitmen untuk memberikan pelayanan sesuai dengan kewajiban dan melakukan perbaikan secara terus menerus;',
    'Apabila dalam penyelenggaraan pelayanan kami tidak sesuai dengan Standar Pelayanan yang telah ditetapkan, kami siap memberikan kompensasi kepada Pemohon dan siap menerima sanksi sesuai peraturan perundang-undangan yang berlaku.',
  ];

  return (
    <>
      <Helmet><title>Maklumat Pelayanan - PPID Dinas Pariwisata Sulteng</title></Helmet>

      <PageHeader
        badge="PPID Pelaksana Dinas Pariwisata Sulteng"
        badgeIcon={Shield}
        title="Maklumat Pelayanan"
        subtitle="Maklumat dan Janji Layanan Keterbukaan Informasi Publik Dinas Pariwisata Provinsi Sulawesi Tengah"
        breadcrumbs={[
          { label: 'PPID', path: '/ppid/profil' },
          { label: 'Maklumat Pelayanan' }
        ]}
      />

      <section className="py-12 lg:py-16">
        <div className="container-custom max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-8 lg:p-12"
          >
            {/* Header */}
            <div className="text-center mb-8 pb-8 border-b border-gray-100">
              <div className="w-20 h-20 rounded-full bg-primary-600 flex items-center justify-center text-white mx-auto mb-4">
                <Shield size={36} />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-navy-900 mb-2">
                MAKLUMAT PELAYANAN
              </h2>
              <p className="text-gray-500">Dinas Pariwisata Provinsi Sulawesi Tengah</p>
            </div>

            {/* Content */}
            <div className="bg-gradient-to-br from-primary-50 to-white rounded-xl p-6 lg:p-8 border-l-4 border-gold-400 mb-8">
              <p className="text-lg font-semibold text-navy-900 mb-6 text-center">
                "Dengan ini, kami berjanji:"
              </p>
              <ol className="space-y-5">
                {pernyataan.map((p, idx) => (
                  <li key={idx} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </span>
                    <p className="text-gray-700 leading-relaxed pt-1">{p}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Signature */}
            <div className="text-right">
              <p className="text-gray-600 mb-2">Palu, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              <p className="text-gray-600 mb-8">Kepala Dinas Pariwisata Prov. Sulteng</p>
              <div className="inline-block border-t-2 border-navy-900 pt-2 min-w-[250px]">
                <p className="font-bold text-navy-900">Dra. DIAH AGUSTININGSIH, M.Pd</p>
                <p className="text-sm text-gray-500">NIP. 196808251994122006</p>
              </div>
            </div>

            {/* Download & Preview */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/dokumen/maklumat-pelayanan.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <FileText size={18} /> Lihat Dokumen (PDF)
              </a>
              <a
                href="/dokumen/maklumat-pelayanan.pdf"
                download="Maklumat_Pelayanan_Dinas_Pariwisata_Sulteng.pdf"
                className="btn-primary"
              >
                <Download size={18} /> Unduh Maklumat Pelayanan (PDF)
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default MaklumatPelayanan;