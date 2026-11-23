import { Helmet } from 'react-helmet-async';
import { Calendar } from 'lucide-react';
import KalenderEventComponent from '../../../components/KalenderEvent';
import PageHeader from '../../../components/PageHeader';

const KalenderEvent = () => {
  return (
    <>
      <Helmet><title>Kalender Event Pariwisata - Info Pariwisata Sulawesi Tengah</title></Helmet>

      <PageHeader
        badge="Karisma Event Sulawesi Tengah"
        badgeIcon={Calendar}
        title="Kalender Event Pariwisata"
        subtitle="Jadwal event, festival seni budaya, dan atraksi pariwisata sepanjang tahun di Sulawesi Tengah"
        breadcrumbs={[
          { label: 'Info Pariwisata', path: '/info-pariwisata/destinasi/daya-tarik-wisata' },
          { label: 'Pemasaran' },
          { label: 'Kalender Event' }
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