import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, CheckCircle, Clock } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import api from '../services/api';
import { useLanguage } from '../context/LanguageContext';

const RencanaTerbit = () => {
  const { language } = useLanguage();
  const isEn = language === 'EN';
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
      <Helmet><title>{isEn ? 'Publication Plan - Central Sulawesi Tourism Department' : 'Rencana Terbit - Dinas Pariwisata Sulteng'}</title></Helmet>
      <PageHeader
        badge="Keterbukaan Informasi Publik"
        badgeIcon={Clock}
        title="Rencana Terbit"
        subtitle="Jadwal rilis resmi data statistik, publikasi berkala, dan informasi publik Dinas Pariwisata Sulawesi Tengah."
        breadcrumbs={[{ label: 'Rencana Terbit' }]}
      />
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
                    <th className="px-6 py-4 text-left text-sm font-semibold">{isEn ? 'TITLE' : 'JUDUL'}</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">{isEn ? 'RELEASE SCHEDULE' : 'JADWAL RILIS'}</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, idx) => {
                    const isReleased = item.status === 'Rilis' || item.status === 'Released';
                    const displayStatus = isEn
                      ? (isReleased ? 'Released' : 'Scheduled')
                      : item.status;

                    return (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm">{idx + 1}</td>
                        <td className="px-6 py-4 text-sm font-medium text-navy-900">{item.judul}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-2">
                          <Calendar size={14} /> {new Date(item.jadwal_rilis).toLocaleDateString(isEn ? 'en-US' : 'id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${isReleased ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {isReleased ? <CheckCircle size={12} /> : <Clock size={12} />}
                            {displayStatus}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
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
