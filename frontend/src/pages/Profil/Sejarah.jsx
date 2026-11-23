import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from '../../components/PageHeader';
import { Landmark } from 'lucide-react';
import api from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';

const Sejarah = () => {
  const { language } = useLanguage();
  const isEn = language === 'EN';
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/profil/sejarah').then((res) => setData(res.data[0])).catch(() => {});
  }, []);

  return (
    <>
      <Helmet>
        <title>{isEn ? 'History - Department of Tourism Central Sulawesi' : 'Sejarah - Dinas Pariwisata Sulteng'}</title>
      </Helmet>
      <PageHeader
        badge={isEn ? "Institutional Profile" : "Profil Kelembagaan"}
        badgeIcon={Landmark}
        title={isEn ? "Brief History" : "Sejarah Singkat"}
        subtitle={
          isEn
            ? "Historical milestones and the journey of the Department of Tourism of Central Sulawesi Province in advancing regional tourism."
            : "Lintas sejarah pembentukan dan perjalanan Dinas Pariwisata Provinsi Sulawesi Tengah dalam memajukan kepariwisataan daerah."
        }
        breadcrumbs={[
          { label: isEn ? 'Profile' : 'Profil', path: '/profil' },
          { label: isEn ? 'History' : 'Sejarah' }
        ]}
      />
      <section className="py-12 lg:py-16">
        <div className="container-custom max-w-4xl">
          {data ? (
            <div
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: data.konten }}
            />
          ) : (
            <div className="skeleton h-96 w-full rounded-2xl" />
          )}
        </div>
      </section>
    </>
  );
};

export default Sejarah;
