import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ShieldAlert, FileText, Download, ExternalLink, Lock, CheckCircle2, ChevronDown, ChevronRight, Eye } from 'lucide-react';

const InformasiDikecualikan = () => {
  const [activeTab, setActiveTab] = useState('ringkasan');

  const skDocument = {
    title: 'SK Penetapan Klasifikasi Informasi Publik Yang Dikecualikan',
    instansi: 'Dinas Pariwisata Provinsi Sulawesi Tengah',
    file: '/images/PPID/SK_Data_Informasi_Publik_Yang_Dikecualikan.pdf',
    keterangan: 'Surat Keputusan Resmi Kepala Dinas Pariwisata Daerah Provinsi Sulawesi Tengah tentang Penetapan Klasifikasi Daftar Informasi Publik yang Dikecualikan berdasarkan hasil Uji Konsekuensi (Consequential Harm Test).',
  };

  const klasifikasiList = [
    {
      kategori: 'Perlindungan Data Pribadi (Pasal 17 huruf g UU KIP)',
      alasan: 'Dapat mengungkapkan rahasia pribadi seseorang dan melanggar hak-hak pribadi ASN/masyarakat.',
      items: [
        'Riwayat kesehatan, catatan medis pribadi, dan data rekam medik pegawai.',
        'Nomor rekening bank pribadi, kondisi finansial personal, dan data keluarga pegawai di luar kewajiban LHKPN.',
        'Identitas lengkap pelapor (whistleblower) tindak pidana korupsi atau pelanggaran disiplin.',
      ],
    },
    {
      kategori: 'Keamanan Sistem Informasi & Siber (Pasal 17 huruf c & e UU KIP)',
      alasan: 'Dapat membahayakan keamanan infrastruktur teknologi informasi, database pemerintah, dan jaringan komunikasi.',
      items: [
        'Kredensial login, kata sandi, token autentikasi, dan kunci enkripsi server/CMS Dispar.',
        'Diagram topologi jaringan privat, celah keamanan (vulnerability audit), dan konfigurasi firewall dinas.',
        'Kode sumber tertutup (proprietary source code) aplikasi internal dinas.',
      ],
    },
    {
      kategori: 'Proses Pengadaan Barang & Jasa (Sebelum Pengumuman Resmi)',
      alasan: 'Dapat menciptakan persaingan usaha tidak sehat dan merugikan keuangan daerah/negara.',
      items: [
        'Harga Perkiraan Sendiri (HPS) dan rincian estimasi biaya sebelum dokumen lelang resmi dibuka di LPSE.',
        'Dokumen penawaran dari para peserta lelang tender sebelum tahap evaluasi selesai.',
      ],
    },
    {
      kategori: 'Pengawasan Internal & Penegakan Hukum (Pasal 17 huruf a UU KIP)',
      alasan: 'Dapat menghambat proses penyelidikan, penyidikan, atau pemeriksaan audit yang sedang berlangsung.',
      items: [
        'Laporan Hasil Audit/Pemeriksaan Inspektorat yang masih berstatus rahasia sebelum finalisasi.',
        'Keterangan saksi dan berkas penanganan sengketa hukum dinas yang masih berjalan di pengadilan.',
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Informasi Yang Dikecualikan - PPID Dinas Pariwisata Provinsi Sulawesi Tengah</title>
        <meta
          name="description"
          content="Daftar Informasi Publik Yang Dikecualikan PPID Pelaksana Dinas Pariwisata Provinsi Sulawesi Tengah sesuai UU No. 14 Tahun 2008."
        />
      </Helmet>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-navy-900 via-primary-900 to-navy-950 py-16 lg:py-20 text-white">
        <div className="container-custom">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-medium text-amber-300 mb-4">
            <Lock size={14} />
            <span>PPID Pelaksana Dispar Sulteng</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight">
            Informasi Yang Dikecualikan
          </h1>
          <p className="text-white/80 mt-3 max-w-2xl text-base lg:text-lg">
            Informasi publik yang bersifat rahasia dan tidak dapat diakses publik berdasarkan hasil Uji Konsekuensi sebagaimana diatur dalam Pasal 17 UU No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik.
          </p>
        </div>
      </div>

      <div className="bg-gray-50/60 py-12 lg:py-16">
        <div className="container-custom max-w-5xl space-y-10">

          {/* Kartu Dokumen SK Resmi (Data Asli Web Dispar) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                  <ShieldAlert size={26} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-800">
                      Surat Keputusan Resmi
                    </span>
                    <span className="text-xs text-gray-400">PDF • 1.3 MB • 4 Halaman</span>
                  </div>
                  <h2 className="text-xl font-bold text-navy-900">
                    {skDocument.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {skDocument.instansi}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={skDocument.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-navy-800 hover:bg-gray-50 text-sm font-medium transition-colors"
                >
                  <Eye size={16} />
                  <span>Lihat SK Asli</span>
                </a>
                <a
                  href={skDocument.file}
                  download="SK_Data_Informasi_Publik_Yang_Dikecualikan.pdf"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium shadow-sm transition-colors"
                >
                  <Download size={16} />
                  <span>Unduh Dokumen SK</span>
                </a>
              </div>
            </div>

            <p className="text-sm text-gray-600 mt-4 leading-relaxed">
              {skDocument.keterangan}
            </p>
          </div>

          {/* Ringkasan Klasifikasi Informasi Dikecualikan */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="text-primary-600" size={24} />
              <h2 className="text-xl font-bold text-navy-900">
                Klasifikasi Informasi yang Dikecualikan
              </h2>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-8">
              Pengecualian informasi publik di lingkungan Dinas Pariwisata Daerah Provinsi Sulawesi Tengah dilakukan secara ketat dan terbatas melalui proses <strong>Uji Konsekuensi (Consequential Harm Test)</strong> dan <strong>Uji Kepentingan Publik (Public Interest Test)</strong>. Berikut adalah rincian klasifikasinya:
            </p>

            <div className="space-y-6">
              {klasifikasiList.map((kat, idx) => (
                <div key={idx} className="rounded-xl border border-gray-100 bg-gray-50/70 p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="w-6 h-6 rounded-full bg-navy-900 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-navy-900 text-base">
                        {kat.kategori}
                      </h3>
                      <p className="text-xs text-amber-700 mt-0.5 font-medium">
                        Dasar Uji Konsekuensi: {kat.alasan}
                      </p>
                    </div>
                  </div>

                  <ul className="ml-9 space-y-2 text-xs lg:text-sm text-gray-600">
                    {kat.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-gray-500">
                Masyarakat berhak mengajukan keberatan apabila permohonan informasi ditolak atas dasar informasi dikecualikan.
              </div>
              <a
                href="/ppid/layanan-publik/form-keberatan"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors"
              >
                Form Pengajuan Keberatan
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default InformasiDikecualikan;
