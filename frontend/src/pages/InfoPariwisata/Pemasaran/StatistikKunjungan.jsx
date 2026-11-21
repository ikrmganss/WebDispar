import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Download, Award, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../../services/api';
import PageHeader from '../../../components/PageHeader';

const monthOrder = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

// Ringkasan Resmi Analisis Kinerja dari Dokumen Resmi Dispar Sulteng
const YEAR_INSIGHTS = {
  '2025': {
    target: '9.000.000 Wisnus & 25.000 Wisman',
    capaianPersen: '129,65%',
    statusCapaian: 'Melampaui Target (129,65%)',
    puncak: 'Bulan April (1.149.632) & Desember (1.139.471)',
    terendah: 'Bulan Maret (861.494)',
    topWisman: 'Kabupaten Tojo Una-Una (8.596 Kunjungan - Togean)',
    topWisnus: 'Kota Palu (3.526.182 Kunjungan)',
    pertumbuhanWisnus: '+26,60% Wisnus vs 2024 (Rilis BPS Sulteng)',
    pertumbuhanWisman: '+17,49% Wisman vs 2024 (Realisasi 112,66% Target Wisman)',
    sumber: 'Rekapitulasi Kunjungan Wisatawan 2025 (Disahkan Dispar Sulteng, 03 Feb 2026)'
  },
  '2024': {
    target: '5.509.000 Kunjungan',
    capaianPersen: '167,58%',
    statusCapaian: 'Melampaui Target (167,58%)',
    puncak: 'Bulan April (1.034.986) & Desember (979.540)',
    terendah: 'Bulan Agustus (535.974)',
    topWisman: 'Kabupaten Poso (8.304 Kunjungan)',
    topWisnus: 'Kota Palu (2.223.043 Kunjungan)',
    pertumbuhanWisnus: '+79,32% Kunjungan Wisnus (c-to-c vs 2023)',
    pertumbuhanWisman: '+186,01% Kunjungan Wisman (c-to-c vs 2023)',
    sumber: 'Dokumen Analisis Kunjungan Wisatawan 2024 (Rilis BPS & Dispar Sulteng, Feb 2025)'
  },
  '2023': {
    target: '4.500.000 Kunjungan',
    capaianPersen: '114,41%',
    statusCapaian: 'Melampaui Target (114,41%)',
    puncak: 'Bulan Mei (716.311 Kunjungan)',
    terendah: 'Bulan November (56.107 Kunjungan)',
    topWisman: 'Kabupaten Tojo Una-Una (4.205 Kunjungan)',
    topWisnus: 'Kabupaten Morowali (1.338.061 Kunjungan)',
    pertumbuhanWisnus: '+289,9% Total Kunjungan vs 2022',
    pertumbuhanWisman: '+155,5% Kunjungan Wisman vs 2022',
    sumber: 'Dokumen Analisis Data Kunjungan Wisatawan Tahun 2023 Dispar Sulteng'
  },
  '2022': {
    target: '1.200.000 Kunjungan',
    capaianPersen: '110,10%',
    statusCapaian: 'Melampaui Target',
    puncak: 'Bulan Desember (148.525) & Mei (145.990)',
    terendah: 'Bulan Februari (79.365)',
    topWisman: 'Kabupaten Poso & Tojo Una-Una',
    topWisnus: 'Kabupaten Poso (287.100 Kunjungan)',
    pertumbuhanWisnus: 'Titik Balik Kebangkitan Pariwisata Pasca Pandemi',
    pertumbuhanWisman: 'Peningkatan Pintu Masuk Wisatawan Asing',
    sumber: 'Dokumen Analisis Kunjungan Wisatawan Tahun 2022 Dispar Sulteng'
  }
};

const StatistikKunjungan = () => {
  const [data, setData] = useState([]);
  const [availableYears, setAvailableYears] = useState(['2025', '2024', '2023', '2022']);
  const [tahun, setTahun] = useState('2025'); // Tahun terbaru dengan data rilis resmi BPS & Dispar
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('both'); // 'both' | 'domestik' | 'mancanegara'

  useEffect(() => {
    // Ambil daftar tahun resmi yang tersedia di database
    api.get('/info-pariwisata/statistik-kunjungan/tahun')
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setAvailableYears(res.data);
          if (!res.data.includes(tahun)) {
            setTahun(res.data[0]);
          }
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    api.get(`/info-pariwisata/statistik-kunjungan?tahun=${tahun}`)
      .then((res) => {
        const sorted = (res.data || []).sort(
          (a, b) => monthOrder.indexOf(a.bulan) - monthOrder.indexOf(b.bulan)
        );
        setData(sorted);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [tahun]);

  const totalDomestik = data.reduce((sum, d) => sum + (d.domestik || 0), 0);
  const totalMancanegara = data.reduce((sum, d) => sum + (d.mancanegara || 0), 0);
  const total = totalDomestik + totalMancanegara;

  const pieData = [
    { name: 'Domestik', value: totalDomestik },
    { name: 'Mancanegara', value: totalMancanegara },
  ];

  const currentInsight = YEAR_INSIGHTS[tahun] || null;

  return (
    <>
      <Helmet><title>Statistik Kunjungan Wisatawan - Info Pariwisata Sulawesi Tengah</title></Helmet>

      <PageHeader
        badge="Data Analitik Resmi Dispar Sulteng"
        badgeIcon={TrendingUp}
        title="Statistik Kunjungan Wisatawan"
        subtitle="Data komparatif pergerakan wisatawan nusantara dan mancanegara bersumber dari rilis resmi BPS & Dinas Pariwisata Provinsi Sulawesi Tengah"
        breadcrumbs={[
          { label: 'Info Pariwisata', path: '/info-pariwisata/destinasi/daya-tarik-wisata' },
          { label: 'Pemasaran' },
          { label: 'Statistik Kunjungan' }
        ]}
      />

      <section className="py-12 lg:py-16">
        <div className="container-custom">
          {/* Filter Tahun Resmi (Hanya Tahun Berdokumen Riil) */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-navy-900">Pilih Tahun Analisis:</span>
              <div className="flex items-center gap-2">
                {availableYears.map((y) => (
                  <button
                    key={y}
                    onClick={() => setTahun(y)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      tahun === y ? 'bg-primary-600 text-white shadow-lg scale-105' : 'bg-white text-navy-700 border border-gray-200 hover:border-primary-400'
                    }`}
                  >
                    Tahun {y}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-200">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>Data Diverifikasi Sesuai Dokumen Laporan Resmi Dispar</span>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6 border-l-4 border-l-blue-500">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Users size={26} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Wisatawan Nusantara (Domestik)</p>
                  <p className="text-2xl font-extrabold text-navy-900">{totalDomestik.toLocaleString('id-ID')}</p>
                  <p className="text-[11px] text-blue-600 font-semibold mt-0.5">
                    {total > 0 ? ((totalDomestik / total) * 100).toFixed(2) : 0}% dari total
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-6 border-l-4 border-l-amber-500">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Users size={26} className="text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Wisatawan Mancanegara (Wisman)</p>
                  <p className="text-2xl font-extrabold text-navy-900">{totalMancanegara.toLocaleString('id-ID')}</p>
                  <p className="text-[11px] text-amber-600 font-semibold mt-0.5">
                    {total > 0 ? ((totalMancanegara / total) * 100).toFixed(2) : 0}% dari total
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-6 bg-gradient-to-br from-primary-600 to-navy-800 text-white shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                  <TrendingUp size={26} className="text-gold-300" />
                </div>
                <div>
                  <p className="text-xs text-white/70 font-medium">Total Realisasi Kunjungan ({tahun})</p>
                  <p className="text-2xl font-extrabold">{total.toLocaleString('id-ID')}</p>
                  <p className="text-[11px] text-emerald-300 font-semibold mt-0.5">
                    Perjalanan Resmi Terekam
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Kartu Analisis Resmi Berdasarkan PDF Tahun Terpilih */}
          {currentInsight && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10 bg-gradient-to-r from-amber-50/70 via-sky-50/50 to-white rounded-2xl border border-amber-200/80 p-6 shadow-xs"
            >
              <div className="flex items-center gap-2 mb-3">
                <Award className="text-amber-600 w-5 h-5" />
                <h3 className="font-extrabold text-navy-900 text-base">
                  Sorotan Analisis Kinerja Kunjungan Wisatawan Tahun {tahun}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-2xs">
                  <span className="text-gray-400 block mb-1">Target Kinerja Dispar</span>
                  <p className="font-bold text-navy-900 text-sm">{currentInsight.target}</p>
                  <span className="text-[11px] text-emerald-600 font-semibold mt-1 inline-block">
                    Capaian: {currentInsight.statusCapaian}
                  </span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-2xs">
                  <span className="text-gray-400 block mb-1">Periode Puncak &amp; Terendah</span>
                  <p className="font-bold text-navy-900 text-xs">Tertinggi: {currentInsight.puncak}</p>
                  <p className="text-[11px] text-rose-500 mt-1">Terendah: {currentInsight.terendah}</p>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-2xs">
                  <span className="text-gray-400 block mb-1">Destinasi Utama Wisman</span>
                  <p className="font-bold text-amber-700 text-xs">{currentInsight.topWisman}</p>
                  <span className="text-[10px] text-gray-500 mt-1 block">Tujuan Nusantara: {currentInsight.topWisnus}</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-2xs">
                  <span className="text-gray-400 block mb-1">Tren Pertumbuhan</span>
                  <p className="font-bold text-emerald-700 text-xs">{currentInsight.pertumbuhanWisnus}</p>
                  <p className="text-[10px] text-blue-600 mt-1">{currentInsight.pertumbuhanWisman}</p>
                </div>
              </div>
            </motion.div>
          )}

          {loading ? (
            <div className="skeleton h-96 w-full rounded-xl" />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Bar Chart */}
              <div className="lg:col-span-2 card p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div>
                    <h3 className="font-bold text-navy-900 text-lg">Jumlah Kunjungan per Bulan ({tahun})</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Perbandingan kunjungan wisatawan Nusantara dan Mancanegara</p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                    <button
                      onClick={() => setViewMode('both')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        viewMode === 'both' ? 'bg-white text-navy-900 shadow-sm' : 'text-gray-600 hover:text-navy-900'
                      }`}
                    >
                      Keduanya (Dual Skala)
                    </button>
                    <button
                      onClick={() => setViewMode('domestik')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        viewMode === 'domestik' ? 'bg-sky-500 text-white shadow-sm' : 'text-gray-600 hover:text-navy-900'
                      }`}
                    >
                      Domestik
                    </button>
                    <button
                      onClick={() => setViewMode('mancanegara')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        viewMode === 'mancanegara' ? 'bg-amber-500 text-white shadow-sm' : 'text-gray-600 hover:text-navy-900'
                      }`}
                    >
                      Mancanegara
                    </button>
                  </div>
                </div>

                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 10, right: viewMode === 'both' ? 20 : 10, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="bulan" tick={{ fontSize: 11, fill: '#64748b' }} />
                      
                      {/* Sumbu Y Kiri untuk Domestik */}
                      {(viewMode === 'both' || viewMode === 'domestik') && (
                        <YAxis
                          yAxisId="left"
                          orientation="left"
                          stroke="#0284c7"
                          tick={{ fontSize: 11, fill: '#0284c7' }}
                          tickFormatter={(val) => (val >= 1000 ? `${(val / 1000).toLocaleString('id-ID')}k` : val)}
                        />
                      )}

                      {/* Sumbu Y Kanan Khusus Mancanegara agar Bar Kuning Jelas & Proporsional */}
                      {(viewMode === 'both' || viewMode === 'mancanegara') && (
                        <YAxis
                          yAxisId="right"
                          orientation={viewMode === 'mancanegara' ? 'left' : 'right'}
                          stroke="#d97706"
                          tick={{ fontSize: 11, fill: '#d97706' }}
                          tickFormatter={(val) => val.toLocaleString('id-ID')}
                        />
                      )}

                      <Tooltip
                        contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' }}
                        formatter={(value, name) => [
                          `${Number(value).toLocaleString('id-ID')} Orang`,
                          name
                        ]}
                      />
                      <Legend
                        verticalAlign="bottom"
                        wrapperStyle={{ paddingTop: 12 }}
                      />

                      {(viewMode === 'both' || viewMode === 'domestik') && (
                        <Bar
                          yAxisId="left"
                          dataKey="domestik"
                          name={viewMode === 'both' ? 'Domestik (Skala Kiri)' : 'Wisatawan Domestik'}
                          fill="#0ea5e9"
                          radius={[4, 4, 0, 0]}
                        />
                      )}

                      {(viewMode === 'both' || viewMode === 'mancanegara') && (
                        <Bar
                          yAxisId="right"
                          dataKey="mancanegara"
                          name={viewMode === 'both' ? 'Mancanegara (Skala Kanan)' : 'Wisatawan Mancanegara'}
                          fill="#f59e0b"
                          radius={[4, 4, 0, 0]}
                        />
                      )}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Pie Chart */}
              <div className="card p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-navy-900 text-lg mb-1">Proporsi Kunjungan</h3>
                  <p className="text-xs text-gray-500 mb-4">Perbandingan total tahun {tahun}</p>
                </div>
                
                <div className="h-64 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={90}
                        minAngle={20}
                        paddingAngle={4}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                      >
                        <Cell fill="#0ea5e9" stroke="#fff" strokeWidth={2} />
                        <Cell fill="#f59e0b" stroke="#fff" strokeWidth={2} />
                      </Pie>
                      <Tooltip
                        formatter={(val) => `${Number(val).toLocaleString('id-ID')} Orang`}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Legend & Detail Badges */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100">
                  <div className="bg-sky-50 rounded-xl p-2.5 text-center border border-sky-100">
                    <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-sky-700 mb-0.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" />
                      Domestik
                    </div>
                    <p className="text-sm font-bold text-navy-900">{totalDomestik.toLocaleString('id-ID')}</p>
                    <p className="text-[10px] text-sky-600 font-medium">
                      {total > 0 ? ((totalDomestik / total) * 100).toFixed(2) : 0}%
                    </p>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-2.5 text-center border border-amber-100">
                    <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-amber-700 mb-0.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                      Mancanegara
                    </div>
                    <p className="text-sm font-bold text-navy-900">{totalMancanegara.toLocaleString('id-ID')}</p>
                    <p className="text-[10px] text-amber-600 font-medium">
                      {total > 0 ? ((totalMancanegara / total) * 100).toFixed(2) : 0}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tabel Rekapitulasi Data Bulanan */}
          {!loading && data.length > 0 && (
            <div className="card p-6 mt-10 overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-navy-900 text-lg">
                    Tabel Rekapitulasi Kunjungan Wisatawan Bulanan ({tahun})
                  </h3>
                  <p className="text-xs text-gray-500">
                    Rincian pergerakan wisatawan per bulan dalam angka riil
                  </p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
                  12 Bulan
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-y border-slate-200 text-slate-700 font-bold">
                      <th className="py-3 px-4">Bulan</th>
                      <th className="py-3 px-4 text-right">Nusantara (Domestik)</th>
                      <th className="py-3 px-4 text-right">Mancanegara (Wisman)</th>
                      <th className="py-3 px-4 text-right">Total Perjalanan</th>
                      <th className="py-3 px-4 text-right">Pangsa (%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.map((row, idx) => {
                      const rowTotal = (row.domestik || 0) + (row.mancanegara || 0);
                      const share = total > 0 ? ((rowTotal / total) * 100).toFixed(2) : '0';
                      return (
                        <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-2.5 px-4 font-semibold text-navy-900">{row.bulan}</td>
                          <td className="py-2.5 px-4 text-right text-blue-700 font-medium">
                            {Number(row.domestik || 0).toLocaleString('id-ID')}
                          </td>
                          <td className="py-2.5 px-4 text-right text-amber-700 font-medium">
                            {Number(row.mancanegara || 0).toLocaleString('id-ID')}
                          </td>
                          <td className="py-2.5 px-4 text-right font-bold text-navy-900">
                            {rowTotal.toLocaleString('id-ID')}
                          </td>
                          <td className="py-2.5 px-4 text-right text-slate-500">{share}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="bg-slate-100/80 border-t-2 border-slate-300 font-bold text-navy-900">
                      <td className="py-3 px-4">Total Realisasi Tahun {tahun}</td>
                      <td className="py-3 px-4 text-right text-blue-800">
                        {totalDomestik.toLocaleString('id-ID')}
                      </td>
                      <td className="py-3 px-4 text-right text-amber-800">
                        {totalMancanegara.toLocaleString('id-ID')}
                      </td>
                      <td className="py-3 px-4 text-right text-navy-950 font-extrabold">
                        {total.toLocaleString('id-ID')}
                      </td>
                      <td className="py-3 px-4 text-right">100.00%</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

          {/* Dokumen Laporan Kunjungan Resmi */}
          <div className="mt-12">
            <h3 className="font-bold text-navy-900 text-xl mb-4 flex items-center gap-2">
              <Download className="text-primary-600" size={22} />
              Arsip &amp; Laporan Analisis Kunjungan Wisatawan (Resmi)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { tahun: '2025', judul: 'Rekapitulasi Kunjungan Wisatawan Tahun 2025', url: '/images/Wisatawan/Rekap_Kunjungan_Wisatawan_Thn_2025_edit.pdf' },
                { tahun: '2024', judul: 'Analisis Kunjungan Wisatawan Tahun 2024', url: '/images/Wisatawan/ANALISIS_KUNJUNGAN_WISATAWAN_2024.pdf' },
                { tahun: '2023', judul: 'Analisis Kunjungan Wisatawan Tahun 2023', url: '/images/Wisatawan/ANALISIS_DATA_KUNJUNGAN_WISATAWAN_TAHUN_2023_1.pdf' },
                { tahun: '2022', judul: 'Analisis Kunjungan Wisatawan Tahun 2022', url: '/images/Wisatawan/ANALISIS_KUNJUNGAN_WISATAWAN_TAHUN_2022.pdf' },
              ].map((doc, i) => (
                <a
                  key={i}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card p-4 flex items-center justify-between hover:border-primary-500 hover:shadow-md transition-all group"
                >
                  <div>
                    <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2.5 py-0.5 rounded-full inline-block mb-1">
                      Tahun {doc.tahun}
                    </span>
                    <h4 className="text-sm font-semibold text-navy-900 group-hover:text-primary-600 transition-colors line-clamp-1">
                      {doc.judul}
                    </h4>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-primary-600 group-hover:text-white transition-all">
                    <Download size={14} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StatistikKunjungan;