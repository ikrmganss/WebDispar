import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, CheckCircle, Clock } from 'lucide-react';
import api from '../services/api';

const RencanaTerbit = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/rencana-terbit')
      .then((res) => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet><title>Rencana Terbit - Dinas Pariwisata Sulteng</title></Helmet>
      <div className="bg-gradient-to-r from-navy-900 to-primary-800 py-16 lg:py-20">
        <div className="container-custom">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-white">Rencana Terbit</h1>
          <p className="text-white/70 mt-2">Jadwal rilis data dan informasi publik</p>
        </div>
      </div>
      <section className="py-12 lg:py-16">
        <div className="container-custom max-w-4xl">
          {loading ? (
            <div className="skeleton h-64 w-full" />
          ) : (
            <div className="card overflow-hidden">
              <table className="w-full">
                <thead className="bg-navy-900 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">NO</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">JUDUL</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">JADWAL RILIS</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, idx) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm">{idx + 1}</td>
                      <td className="px-6 py-4 text-sm font-medium text-navy-900">{item.judul}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-2">
                        <Calendar size={14} /> {new Date(item.jadwal_rilis).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${item.status === 'Rilis' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {item.status === 'Rilis' ? <CheckCircle size={12} /> : <Clock size={12} />}
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default RencanaTerbit;