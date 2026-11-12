import { Helmet } from 'react-helmet-async';
import KalenderEventComponent from '../../../components/KalenderEvent';

const KalenderEvent = () => {
  return (
    <>
      <Helmet><title>Kalender Event Pariwisata - Info Pariwisata Sulawesi Tengah</title></Helmet>

      <div className="bg-gradient-to-r from-navy-900 to-primary-800 py-16 lg:py-20">
        <div className="container-custom">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-white">Kalender Event Pariwisata</h1>
          <p className="text-white/70 mt-2">Jadwal event dan festival pariwisata sepanjang tahun</p>
        </div>
      </div>

      <section className="py-12 lg:py-16">
        <div className="container-custom">
          <KalenderEventComponent limit={99} showTitle={false} />
        </div>
      </section>
    </>
  );
};

export default KalenderEvent;