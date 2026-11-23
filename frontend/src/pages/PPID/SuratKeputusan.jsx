import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, Download, ExternalLink, ShieldCheck } from 'lucide-react';
import api from '../../services/api';
import PageHeader from '../../components/PageHeader';

const KATEGORI_CONFIG = [
  {
    kategori: 'SK Penetapan Daftar Informasi Publik (DIP)',
    matcher: (j) => /Daftar Informasi Publik|DIP/i.test(j)
  },
  {
    kategori: 'SK Penetapan Klasifikasi Informasi Dikecualikan',
    matcher: (j) => /Dikecualikan/i.test(j)
  },
  {
    kategori: 'SK Pembentukan PPID Pelaksana',
    matcher: (j) => /PPID/i.test(j) && !/Pertimbangan|Pengaduan|Dikecualikan|Daftar/i.test(j)
  },
  {
    kategori: 'SK Penunjukan Petugas Layanan Informasi Publik',
    matcher: (j) => /Petugas Layanan/i.test(j)
  },
  {
    kategori: 'SK Pengelola Media Sosial / Website Resmi',
    matcher: (j) => /Media Sosial|Kehumasan|Medsos/i.test(j)
  },
  {
    kategori: 'SK Tim Pertimbangan & Pengaduan (SP4N LAPOR)',
    matcher: (j) => /Pertimbangan|Pengaduan|SP4N/i.test(j)
  },
];

const TAHUN = ['2021', '2022', '2023', '2024', '2025', '2026'];

const SuratKeputusan = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/ppid/sk')
      .then((res) => setData(res.data || []))
      .catch((err) => console.warn('Gagal memuat SK PPID:', err))
      .finally(() => setLoading(false));
  }, []);

  // Group by kategori configuration
  const grouped = KATEGORI_CONFIG.map((cfg) => ({
    kategori: cfg.kategori,
    items: TAHUN.map((thn) => {
      const found = data.find((d) => cfg.matcher(d.judul || '') && String(d.tahun) === thn);
      return { tahun: thn, file: found?.file, judul: found?.judul };
    }),
  }));

  const resolveFileUrl = (file) => {
    if (!file) return '#';
    if (file.startsWith('http') || file.startsWith('/')) return file;
    return `/uploads/${file}`;
  };

  return (
    <>
      <Helmet><title>Surat Keputusan - PPID Dinas Pariwisata Sulteng</title></Helmet>

      <PageHeader
        badge="Regulasi & Ketetapan Hukum"
        badgeIcon={ShieldCheck}
        title="Surat Keputusan"
        subtitle="Surat Keputusan Kepala Dinas dan Ketetapan Resmi Layanan Informasi Publik Dinas Pariwisata Provinsi Sulawesi Tengah"
        breadcrumbs={[
          { label: 'PPID', path: '/ppid/profil' },
          { label: 'Surat Keputusan' }
        ]}
      />

      <section className="py-12 lg:py-16">
        <div className="container-custom">
          {/* Info Card */}
          <div className="card p-5 mb-8 bg-purple-50/60 border border-purple-200/80 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0">
              <FileText size={20} />
            </div>
            <div className="text-sm text-purple-950">
              <h4 className="font-bold text-sm mb-0.5">Dokumentasi Surat Keputusan Resmi PPID</h4>
              <p className="text-purple-800 text-xs sm:text-sm leading-relaxed">
                Tabel di bawah ini memuat arsip Surat Keputusan Kepala Dinas Pariwisata Provinsi Sulawesi Tengah dari tahun 2021 hingga 2026. Seluruh berkas PDF tersimpan secara lokal dan dapat langsung dibuka atau diunduh.
              </p>
            </div>
          </div>

          <div className="card overflow-hidden overflow-x-auto shadow-sm border border-slate-200">
            <table className="w-full min-w-[900px] border-collapse">
              <thead className="bg-navy-900 text-white">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider w-80">JENIS SK</th>
                  {TAHUN.map((thn) => (
                    <th key={thn} className="px-3 py-4 text-center text-xs font-bold uppercase tracking-wider">{thn}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {grouped.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                      {row.kategori}
                    </td>
                    {row.items.map((item, iIdx) => {
                      const fileUrl = resolveFileUrl(item.file);
                      return (
                        <td key={iIdx} className="px-2 py-4 text-center align-middle">
                          {item.file ? (
                            <div className="inline-flex items-center gap-1.5 justify-center">
                              <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={`Buka ${item.judul || 'Dokumen SK'}`}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 text-xs font-bold transition-colors border border-primary-200"
                              >
                                <ExternalLink size={12} />
                                <span>Lihat</span>
                              </a>
                              <a
                                href={fileUrl}
                                download
                                title={`Unduh PDF ${item.judul || 'Dokumen SK'}`}
                                className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                              >
                                <Download size={13} />
                              </a>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-300 font-semibold">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default SuratKeputusan;
