import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Users, Download, Network, Award, FileText, CheckCircle2, RefreshCw } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import { motion } from 'framer-motion';
import api from '../../services/api';

// Pemetaan dokumen CV / profil PDF resmi pimpinan jika tersedia
const PDF_PROFIL_MAP = {
  '196808251994122006': '/images/ProfilPimpinan/01_-_kadis_diah.pdf',
  '198105012000122001': '/images/ProfilPimpinan/profil_nency_ainun.pdf',
  '197111212000122001': '/images/ProfilPimpinan/profil_hasna.pdf',
  '197811222009042001': '/images/ProfilPimpinan/profil_joyce.pdf',
  '198701212006041008': '/images/ProfilPimpinan/profil_ilham.pdf',
  '197108222005022002': '/images/ProfilPimpinan/profil_widyawati.pdf',
};

// Data default (fallback)
const DEFAULT_PEJABAT = [
  { nama: 'Dra. Diah Agustiningsih, M.Pd', nip: '196808251994122006', jabatan: 'Kepala Dinas', foto: 'kadis_diah.jpg', urutan: 1 },
  { nama: 'Nency Ainun, S.Stp., M.Si', nip: '198105012000122001', jabatan: 'Sekretaris Dinas', foto: 'nency-ainun.jpg', urutan: 2 },
  { nama: 'Rani Adelia, SE, MM', nip: '198505022011012006', jabatan: 'Kepala Sub. Bagian Keuangan dan Aset', foto: null, urutan: 3 },
  { nama: 'Achmad Khomaini, S.Kom', nip: '198106172005011016', jabatan: 'Kepala Sub. Bagian Kepegawaian dan Umum', foto: null, urutan: 4 },
  { nama: 'Hasna, S.Sos., M.Ap', nip: '197111212000122001', jabatan: 'Kepala Bidang Pengembangan Destinasi Pariwisata', foto: 'hasna.jpg', urutan: 5 },
  { nama: 'Joyce Sagita Novyanti, SE., MM', nip: '197811222009042001', jabatan: 'Kepala Bidang Pengembangan Pemasaran Pariwisata', foto: 'joyce.jpg', urutan: 6 },
  { nama: 'Ilham Arifin, SH', nip: '198701212006041008', jabatan: 'Kepala Bidang Pengembangan Ekonomi Kreatif, Pemanfaatan & Perlindungan HKI', foto: 'ilham.jpg', urutan: 7 },
  { nama: 'Widyawati, SS., M.Sc', nip: '197108222005022002', jabatan: 'Kepala Bidang Sumber Daya Pariwisata dan Ekonomi Kreatif', foto: 'widyawati.jpg', urutan: 8 },
  { nama: 'Mohammad Arif, S.Sos., M.Ap', nip: '198105122006041018', jabatan: 'Adyatama Kepariwisataan Ekonomi Kreatif Ahli Muda', foto: null, urutan: 9 },
  { nama: 'Wahyu Sukmawan, ST', nip: '197611022008011011', jabatan: 'Adyatama Kepariwisataan Ekonomi Kreatif Ahli Muda', foto: null, urutan: 10 },
  { nama: 'Yunita, S.Sos', nip: '197306102001122003', jabatan: 'Adyatama Kepariwisataan Ekonomi Kreatif Ahli Muda', foto: 'yunita.jpg', urutan: 11 },
  { nama: 'Vera Christine Lasewa, S.PAR', nip: '198808022015032002', jabatan: 'Adyatama Kepariwisataan dan Ekonomi Kreatif', foto: null, urutan: 12 },
  { nama: 'Satrisni Bisno, SE', nip: '197710251999032005', jabatan: 'Adyatama Kepariwisataan Ekonomi Kreatif Ahli Muda', foto: 'satrisni.jpg', urutan: 13 },
  { nama: 'Max William Baginda, S.Sos., M.Si', nip: '197305142000031003', jabatan: 'Adyatama Kepariwisataan Ekonomi Kreatif Ahli Muda', foto: 'Max.jpg', urutan: 14 },
  { nama: 'Gafriani Lasawedi, SS., M.Si', nip: '197209181998032008', jabatan: 'Adyatama Kepariwisataan Ekonomi Kreatif Ahli Muda', foto: 'gafriani.jpg', urutan: 15 },
  { nama: 'Husen, S.Kom', nip: '197908112010011007', jabatan: 'Adyatama Kepariwisataan Ekonomi Kreatif Ahli Muda', foto: 'husein.jpg', urutan: 16 },
];

const ProfilPimpinan = ({ language = 'ID' }) => {
  const [pejabat, setPejabat] = useState(DEFAULT_PEJABAT);
  const [loading, setLoading] = useState(true);
  const [isLiveFromDb, setIsLiveFromDb] = useState(false);

  const fetchPejabat = () => {
    setLoading(true);
    api.get('/profil/pejabat')
      .then((res) => {
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setPejabat(res.data);
          setIsLiveFromDb(true);
        }
      })
      .catch((err) => {
        console.warn('Gagal memuat dari API /profil/pejabat, mencoba /profil/pejabat/all...', err);
        return api.get('/profil/pejabat/all').then((res) => {
          if (res.data && Array.isArray(res.data) && res.data.length > 0) {
            setPejabat(res.data);
            setIsLiveFromDb(true);
          }
        });
      })
      .catch((err) => {
        console.error('Tetap menggunakan data bawaan:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPejabat();
  }, []);

  const getInitials = (nama) =>
    nama.split(' ').filter(w => /^[A-Z]/.test(w)).slice(0, 2).map(w => w[0]).join('');

  const getPhotoUrl = (foto) => {
    if (!foto) return null;
    if (foto.startsWith('http') || foto.startsWith('/')) return foto;
    return `/uploads/${foto}`;
  };

  return (
    <>
      <Helmet><title>{language === 'EN' ? 'Leadership Profile - Department of Tourism of Central Sulawesi' : 'Profil Pimpinan - Dinas Pariwisata Sulteng'}</title></Helmet>

      <PageHeader
        badge={language === 'EN' ? "Department Leadership Profile" : "Profil Pimpinan Dinas"}
        title={language === 'EN' ? "Leadership Profile" : "Profil Pimpinan"}
        subtitle={language === 'EN' ? "Leadership Structure and Structural Officials of the Department of Tourism of Central Sulawesi Province" : "Struktur Kepemimpinan dan Pejabat Struktural Dinas Pariwisata Provinsi Sulawesi Tengah"}
        breadcrumbs={[
          { label: language === 'EN' ? 'Profile' : 'Profil', path: '/profil' },
          { label: language === 'EN' ? 'Leadership Profile' : 'Profil Pimpinan' }
        ]}
      />

      <section className="py-12 lg:py-16">
        <div className="container-custom">
          {/* Header Actions & Live Database Status */}
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-3">
              <a
                href="/images/2026/Struktur_Organisasi_dan_Tugas_Fungsi_Dinas_Pariwisata.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center gap-2"
              >
                <Network size={18} /> {language === 'EN' ? 'View Organizational Structure' : 'Lihat Struktur Organisasi'}
              </a>
              <a
                href="/images/Kepegawaian/DUK_UPDATE_JANUARI_2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Download size={18} /> {language === 'EN' ? 'Download DUK (Update 2025)' : 'Unduh DUK (Update 2025)'}
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full">
              {loading ? (
                <span className="inline-flex items-center gap-1.5 text-blue-600">
                  <RefreshCw size={14} className="animate-spin" /> {language === 'EN' ? 'Loading database...' : 'Memuat data database...'}
                </span>
              ) : isLiveFromDb ? (
                <span className="inline-flex items-center gap-1.5 text-emerald-700 font-medium">
                  <CheckCircle2 size={14} className="text-emerald-600" /> {language === 'EN' ? 'Directly Connected to Database' : 'Terhubung Langsung ke Database'} ({pejabat.length} {language === 'EN' ? 'Officials' : 'Pejabat'})
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-gray-600">
                  {language === 'EN' ? 'Standard Mode' : 'Mode Standar'} ({pejabat.length} {language === 'EN' ? 'Officials' : 'Pejabat'})
                </span>
              )}
            </div>
          </div>

          {/* Grid Pejabat */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pejabat.map((p, idx) => {
              const photoUrl = getPhotoUrl(p.foto);
              const pdfUrl = p.nip ? PDF_PROFIL_MAP[p.nip] : null;

              return (
                <motion.div
                  key={p.id || p.nip || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.04 }}
                  className="card p-5 text-center group hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      {photoUrl ? (
                        <img
                          src={photoUrl}
                          alt={p.nama}
                          onError={(e) => {
                            if (!e.currentTarget.dataset.fallbackTried && p.foto) {
                              e.currentTarget.dataset.fallbackTried = 'true';
                              e.currentTarget.src = `/images/ProfilPimpinan/${p.foto}`;
                              return;
                            }
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.parentElement?.querySelector('.initials-fallback');
                            if (fallback) fallback.style.display = 'flex';
                          }}
                          className="w-full h-full object-cover rounded-full border-4 border-gold-400 group-hover:scale-105 transition-transform shadow-md"
                        />
                      ) : null}
                      <div
                        className="initials-fallback w-full h-full rounded-full bg-gradient-to-br from-primary-600 to-navy-800 border-4 border-gold-400 flex items-center justify-center text-white font-bold text-2xl group-hover:scale-105 transition-transform shadow-md"
                        style={{ display: photoUrl ? 'none' : 'flex' }}
                      >
                        {getInitials(p.nama)}
                      </div>
                    </div>
                    <h3 className="font-bold text-navy-900 text-sm mb-1 line-clamp-2">{p.nama}</h3>
                    <p className="text-xs text-gray-500 mb-2">NIP. {p.nip || '-'}</p>
                    <p className="text-xs font-semibold text-primary-600 bg-primary-50 rounded-full px-3 py-1 inline-block">
                      {p.jabatan}
                    </p>
                  </div>

                  {pdfUrl && (
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-primary-600 hover:text-primary-800 font-medium hover:underline"
                      >
                        <FileText size={14} /> Lihat Profil Resmi (PDF)
                      </a>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Note */}
          <div className="mt-10 p-4 bg-blue-50 border-l-4 border-primary-600 rounded-lg text-sm text-gray-700">
            <p className="flex items-start gap-2">
              <Users size={18} className="text-primary-600 flex-shrink-0 mt-0.5" />
              <span>
                {language === 'EN' ? 'The officials above are directly integrated from the database system of the Department of Tourism of Central Sulawesi Province.' : 'Data pejabat di atas terintegrasi secara langsung dari database sistem Dinas Pariwisata Provinsi Sulawesi Tengah.'}
                {language === 'EN' ? 'For more information, please contact' : 'Untuk informasi lebih lanjut, silakan hubungi'} <a href="mailto:dispar@sultengprov.go.id" className="text-primary-600 underline">dispar@sultengprov.go.id</a>.
              </span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfilPimpinan;