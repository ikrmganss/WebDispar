import { Helmet } from 'react-helmet-async';
import { Calendar } from 'lucide-react';
import KalenderEventComponent from '../../../components/KalenderEvent';
import PageHeader from '../../../components/PageHeader';
import { useLanguage } from '../../../context/LanguageContext';

const KalenderEvent = () => {
  const { language } = useLanguage();
  const isEn = language === 'EN';

  return (
    <>
      <Helmet>
        <title>{isEn ? 'Tourism Event Calendar - Central Sulawesi Tourism' : 'Kalender Event Pariwisata - Info Pariwisata Sulawesi Tengah'}</title>
      </Helmet>

      <PageHeader
        badge={isEn ? "Central Sulawesi Event Charisma" : "Karisma Event Sulawesi Tengah"}
        badgeIcon={Calendar}
        title={isEn ? "Tourism Event Calendar" : "Kalender Event Pariwisata"}
        subtitle={
          isEn
            ? "Schedule of events, cultural art festivals, and tourism attractions throughout the year in Central Sulawesi"
            : "Jadwal event, festival seni budaya, dan atraksi pariwisata sepanjang tahun di Sulawesi Tengah"
        }
        breadcrumbs={[
          { label: isEn ? 'Tourism Info' : 'Info Pariwisata', path: '/info-pariwisata/destinasi/daya-tarik-wisata' },
          { label: isEn ? 'Marketing' : 'Pemasaran' },
          { label: isEn ? 'Event Calendar' : 'Kalender Event' }
        ]}
      />

      <section className="py-12 lg:py-16">
        <div className="container-custom">
          <KalenderEventComponent limit={99} showTitle={false} />
        </div>
      </section>
    </>
  );
};

export default KalenderEvent;
