import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Hotel, Download, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../../services/api';

const DataHunian = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/info-pariwisata/data-hunian')
      .then((res) => setData(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet><title>Data Hunian Hotel - Info Pariwisata Sulawesi Tengah</title></Helmet>

      <div className="bg-gradient-to-r from-navy-900 to-primary-800 py-16 lg:py-20">
        <div className="container-custom">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-white">Data Hunian Hotel</h1>
          <p className="text-white/70 mt-2">Informasi akomodasi dan hunian wisata di Sulawesi Tengah</p>
        </div>
      </div>

      <section className="py-12 lg:py-16">
        <div className="container-custom max-w-4xl">
          {loading ? (
            <div className="space-y-4">{[...Array(4)].map((_, i) => <div key={i} className="skeleton h-24 rounded-xl" />)}</div>
          ) : data.length === 0 ? (
            <div className="text-center py-20 text-gray-400 card">
              <Hotel size={48} className="mx-auto mb-4 opacity-30" />
              <p>Belum ada data hunian tersedia</p>
              <p className="text-xs mt-2">Data akan diperbarui secara berkala</p>
            </div>
          ) : (
            <div className="space-y-4">
              {data.map((item, idx) => (
                <motion.div
                  key={item.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="card p-6 flex items-center gap-5"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary-600 flex items-center justify-center text-white flex-shrink-0">
                    <Hotel size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-navy-900 mb-1">{item.judul}</h3>
                    <p className="text-xs text-gray-500">{item.deskripsi}</p>
                  </div>
                  {item.file && (
                    <a
                      href={`/uploads/${item.file}`}
                      download
                      className="flex-shrink-0 btn-outline text-sm"
                    >
                      <Download size={16} /> Unduh
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {/* Info tambahan */}
          <div className="mt-10 card p-6 bg-blue-50 border-l-4 border-primary-600">
            <div className="flex items-start gap-3">
              <FileText size={20} className="text-primary-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700">
                <p className="font-semibold mb-1">Catatan:</p>
                <p>Data hunian hotel bersumber dari Dinas Pariwisata Provinsi Sulawesi Tengah dan diperbarui secara berkala.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DataHunian;