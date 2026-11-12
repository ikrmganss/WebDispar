import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../../services/api';

const COLORS = ['#0ea5e9', '#facc15', '#10b981', '#f97316', '#8b5cf6', '#ec4899'];

const StatistikKunjungan = () => {
  const [data, setData] = useState([]);
  const [tahun, setTahun] = useState(new Date().getFullYear().toString());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/info-pariwisata/statistik-kunjungan?tahun=${tahun}`)
      .then((res) => setData(res.data || []))
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

  return (
    <>
      <Helmet><title>Statistik Kunjungan Wisatawan - Info Pariwisata Sulawesi Tengah</title></Helmet>

      <div className="bg-gradient-to-r from-navy-900 to-primary-800 py-16 lg:py-20">
        <div className="container-custom">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-white">Statistik Kunjungan Wisatawan</h1>
          <p className="text-white/70 mt-2">Data kunjungan wisatawan Provinsi Sulawesi Tengah</p>
        </div>
      </div>

      <section className="py-12 lg:py-16">
        <div className="container-custom">
          {/* Filter Tahun */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="text-sm font-medium text-gray-600">Pilih Tahun:</span>
            {['2022', '2023', '2024', '2025', '2026'].map((y) => (
              <button
                key={y}
                onClick={() => setTahun(y)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  tahun === y ? 'bg-primary-600 text-white shadow-lg' : 'bg-white text-navy-700 border border-gray-200 hover:border-primary-400'
                }`}
              >
                {y}
              </button>
            ))}
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Users size={26} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Wisatawan Domestik</p>
                  <p className="text-2xl font-bold text-navy-900">{totalDomestik.toLocaleString('id-ID')}</p>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gold-100 flex items-center justify-center">
                  <Users size={26} className="text-gold-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Wisatawan Mancanegara</p>
                  <p className="text-2xl font-bold text-navy-900">{totalMancanegara.toLocaleString('id-ID')}</p>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-6 bg-gradient-to-br from-primary-600 to-navy-800 text-white">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                  <TrendingUp size={26} className="text-gold-300" />
                </div>
                <div>
                  <p className="text-xs text-white/70">Total Kunjungan</p>
                  <p className="text-2xl font-bold">{total.toLocaleString('id-ID')}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {loading ? (
            <div className="skeleton h-96 w-full rounded-xl" />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Bar Chart */}
              <div className="lg:col-span-2 card p-6">
                <h3 className="font-bold text-navy-900 mb-4">Jumlah Kunjungan per Bulan ({tahun})</h3>
                <div className="h-80">
                  <ResponsiveContainer>
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="bulan" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip contentStyle={{ borderRadius: 8 }} />
                      <Legend />
                      <Bar dataKey="domestik" name="Domestik" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="mancanegara" name="Mancanegara" fill="#facc15" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Pie Chart */}
              <div className="card p-6">
                <h3 className="font-bold text-navy-900 mb-4">Proporsi Kunjungan</h3>
                <div className="h-80">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                        {pieData.map((_, idx) => (
                          <Cell key={idx} fill={COLORS[idx]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Download */}
          <div className="mt-8 text-center">
            <a href="/dokumen/statistik-kunjungan.pdf" download className="btn-outline">
              <Download size={18} /> Unduh Data Lengkap (PDF)
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default StatistikKunjungan;