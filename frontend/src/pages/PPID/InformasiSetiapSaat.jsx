import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, Download, ExternalLink, ShieldCheck, Clock, CheckCircle } from 'lucide-react';

const InformasiSetiapSaat = () => {
  const skDocument = {
    title: 'SK Penetapan Daftar Informasi Publik (Setiap Saat)',
    instansi: 'Dinas Pariwisata Provinsi Sulawesi Tengah',
    file: '/images/InfoSetiapSaat/Sk_Daftar_Informasi.pdf',
    keterangan: 'Surat Keputusan Kepala Dinas Pariwisata Daerah Provinsi Sulawesi Tengah mengenai penetapan daftar informasi publik yang wajib tersedia setiap saat.',
  };

  const daftarInformasi = [
    {
      kategori: 'Informasi Regulasi & Kebijakan',
      items: [
        'Daftar rancangan dan peraturan perundang-undangan di bidang kepariwisataan.',
        'Keputusan Kepala Dinas Pariwisata dan petunjuk teknis pelaksanaan program kerja.',
        'Standar Operasional Prosedur (SOP) pelayanan publik bidang pariwisata.',
      ],
    },
    {
      kategori: 'Informasi Organisasi & Kelembagaan',
      items: [
        'Profil lengkap pimpinan dan struktur kelembagaan organisasi dinas.',
        'Tugas pokok, fungsi, dan wewenang masing-masing bidang/seksi dinas pariwisata.',
        'Rencana Strategis (Renstra) dan Rencana Kinerja Tahunan (Renja).',
      ],
    },
    {
      kategori: 'Informasi Kinerja & Pelayanan',
      items: [
        'Laporan Akuntabilitas Kinerja Instansi Pemerintah (LAKIP / SAKIP).',
        'Pedoman dan prosedur permohonan informasi serta pengajuan keberatan informasi.',
        'Data statistik kunjungan wisatawan dan kalender event pariwisata daerah.',
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Informasi Setiap Saat - PPID Dinas Pariwisata Provinsi Sulawesi Tengah</title>
        <meta
          name="description"
          content="Daftar Informasi Publik yang Wajib Tersedia Setiap Saat pada PPID Pelaksana Dinas Pariwisata Provinsi Sulawesi Tengah."
        />
      </Helmet>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-navy-900 via-primary-900 to-navy-950 py-16 lg:py-20 text-white">
        <div className="container-custom">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-medium text-amber-300 mb-4">
            <Clock size={14} />
            <span>PPID Pelaksana Dispar Sulteng</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight">
            Informasi Setiap Saat
          </h1>
          <p className="text-white/80 mt-3 max-w-2xl text-base lg:text-lg">
            Informasi publik yang wajib disediakan oleh Badan Publik dan siap tersedia setiap saat ketika terdapat permohonan dari masyarakat sesuai amanat UU No. 14 Tahun 2008.
          </p>
        </div>
      </div>

      <div className="bg-gray-50/60 py-12 lg:py-16">
        <div className="container-custom max-w-5xl space-y-10">

          {/* Dokumen SK Utama (Sesuai Data Asli Web Dispar) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                  <FileText size={26} />
                </div>
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 mb-1">
                    Dokumen Resmi
                  </span>
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
                  <ExternalLink size={16} />
                  <span>Buka Dokumen</span>
                </a>
                <a
                  href={skDocument.file}
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium shadow-sm transition-colors"
                >
                  <Download size={16} />
                  <span>Unduh SK (PDF)</span>
                </a>
              </div>
            </div>

            <p className="text-sm text-gray-600 mt-4 leading-relaxed">
              {skDocument.keterangan}
            </p>
          </div>

          {/* Penjelasan Ketentuan UU KIP */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="text-primary-600" size={24} />
              <h2 className="text-xl font-bold text-navy-900">
                Cakupan Informasi yang Wajib Disediakan Setiap Saat
              </h2>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-8">
              Berdasarkan Pasal 11 Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan Informasi Publik, Badan Publik wajib menyediakan Informasi Publik setiap saat yang meliputi daftar seluruh informasi publik yang berada di bawah penguasaannya, keputusan badan publik beserta pertimbangannya, seluruh kebijakan yang ada beserta dokumen pendukungnya, serta rencana kerja proyek dan anggaran dinas.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {daftarInformasi.map((group, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-5 border border-gray-100 flex flex-col">
                  <h3 className="font-bold text-navy-900 text-base mb-3 pb-2 border-b border-gray-200/60">
                    {group.kategori}
                  </h3>
                  <ul className="space-y-2.5 text-xs lg:text-sm text-gray-600 flex-1">
                    {group.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2">
                        <CheckCircle size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-gray-500">
                Membutuhkan informasi publik lainnya yang belum tersedia di portal web?
              </div>
              <a
                href="/ppid/layanan-publik/form-permohonan"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors"
              >
                Isi Formulir Permohonan Informasi
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default InformasiSetiapSaat;
