import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ChevronLeft, ChevronRight, CalendarIcon, Play,
  Globe, Building2, TrendingUp,
} from 'lucide-react';
import Hero from '../components/Hero';
import IKMChart from '../components/IKMChart';
import api from '../services/api';

const IMAGES = {
  news1: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
  news2: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=800&q=80',
  news3: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80',
  vGrid1: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
  vGrid2: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=400&q=80',
  vGrid3: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80',
  vGrid4: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80',
  videoDesa: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
};

// --- Latest News Section ---
const LatestNewsSection = ({ berita, loading }) => {
  const fallbackNews = [
    { image: IMAGES.news1, tag: 'PEMERINTAHAN', tagColor: 'bg-[#0b192c]', title: 'Kadis Pariwisata Sulteng Pimpin Rapat Koordinasi Pengembangan Destinasi', date: '17 Agustus 2024' },
    { image: IMAGES.news2, tag: 'KEMERDEKAAN', tagColor: 'bg-red-600', title: 'Semangat Kemerdekaan Menggelora di Sektor Pariwisata Sulteng', date: '17 Agustus 2024' },
    { image: IMAGES.news3, tag: 'DESTINASI BAHARI', tagColor: 'bg-blue-600', title: 'Pesona Bahari Sulawesi Tengah Menarik Wisatawan Mancanegara', date: '17 Agustus 2024' },
  ];

  const newsItems = berita.length > 0
    ? berita.slice(0, 3).map((b) => ({
        image: b.foto ? `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}/uploads/${b.foto}` : IMAGES.news1,
        tag: b.kategori || 'BERITA',
        tagColor: 'bg-[#0b192c]',
        title: b.judul,
        date: new Date(b.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        slug: b.slug,
      }))
    : fallbackNews;

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 flex flex-col gap-6 w-full">
      <div className="flex items-end justify-between border-b border-slate-200/80 pb-4">
        <div>
          <div className="flex items-center gap-1.5 text-amber-600 font-extrabold text-[11px] tracking-wider uppercase mb-0.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>WARTA PARIWISATA DAERAH</span>
          </div>
          <h2 className="font-black text-slate-900 text-2xl md:text-3xl tracking-tight">Berita Terbaru</h2>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/berita" className="text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors">
            Lihat Semua →
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => <div key={i} className="h-72 bg-slate-100 rounded-2xl animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.map((news, idx) => (
            <article key={idx} className="flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className={`absolute top-3 left-3 px-2.5 py-1 text-white font-bold text-[10px] tracking-wider rounded-md ${news.tagColor}`}>
                  {news.tag}
                </span>
              </div>
              <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                {news.slug ? (
                  <Link to={`/berita/${news.slug}`}>
                    <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-amber-600 transition-colors">{news.title}</h3>
                  </Link>
                ) : (
                  <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-amber-600 transition-colors">{news.title}</h3>
                )}
                <div className="flex items-center gap-2 pt-3 border-t border-slate-100 text-slate-400 text-xs font-semibold">
                  <CalendarIcon className="w-3.5 h-3.5 text-amber-500" />
                  <span>{news.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

// --- Agenda & IKM Section ---
const PublicServiceAgendaSection = ({ events }) => {
  const [selectedDay, setSelectedDay] = useState('12');

  const calendarGrid = [
    { val: '25', mute: true }, { val: '26', mute: true }, { val: '27', mute: true }, { val: '28', mute: true }, { val: '29', mute: true }, { val: '30', mute: true }, { val: '31', mute: true },
    { val: '1' }, { val: '2' }, { val: '3' }, { val: '4', hl: true }, { val: '5' }, { val: '6' }, { val: '7', hl: true },
    { val: '8' }, { val: '9' }, { val: '10' }, { val: '11' }, { val: '12', active: true }, { val: '13', hl: true }, { val: '14' },
    { val: '15' }, { val: '16' }, { val: '17' }, { val: '18' }, { val: '19' }, { val: '20' }, { val: '21' },
    { val: '22' }, { val: '23' }, { val: '24', hl: true }, { val: '25' }, { val: '26' }, { val: '27' }, { val: '28' },
    { val: '29' }, { val: '30', hl: true }, { val: '31' }, { val: '1', mute: true }, { val: '2', mute: true }, { val: '3', mute: true }, { val: '4', mute: true },
  ];

  const selectedEvent = events.find((ev) => {
    const d = new Date(ev.tanggal);
    return String(d.getDate()) === selectedDay;
  });

  return (
    <section className="w-full bg-slate-100/70 border-y border-slate-200 py-12 flex justify-center">
      <div className="max-w-7xl w-full px-4 md:px-8 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-amber-600 font-extrabold text-[11px] tracking-wider uppercase block">PELAYANAN &amp; KEGIATAN</span>
            <h2 className="font-black text-slate-900 text-2xl md:text-3xl tracking-tight">Agenda Kegiatan &amp; Kepuasan Publik</h2>
          </div>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 rounded-full border border-slate-200 text-slate-500 bg-white flex items-center justify-center hover:bg-slate-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-7 h-7 rounded-full border border-slate-200 text-slate-500 bg-white flex items-center justify-center hover:bg-slate-50">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Calendar */}
          <article className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <button className="text-slate-400 hover:text-slate-700"><ChevronLeft className="w-4 h-4" /></button>
              <h3 className="font-extrabold text-slate-900 text-base">September 2024</h3>
              <button className="text-slate-400 hover:text-slate-700"><ChevronRight className="w-4 h-4" /></button>
            </div>

            <div className="grid grid-cols-7 text-center font-bold text-slate-400 text-xs">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <div key={d} className="py-1">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs">
              {calendarGrid.map((item, idx) => {
                const isSelected = selectedDay === item.val && !item.mute;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => !item.mute && setSelectedDay(item.val)}
                    className={`h-8 flex items-center justify-center rounded-lg transition-all ${
                      item.mute ? 'text-slate-300'
                        : item.active || isSelected ? 'bg-[#0b192c] text-white font-extrabold shadow'
                        : item.hl ? 'bg-amber-100 text-slate-900'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {item.val}
                  </button>
                );
              })}
            </div>

            <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border border-amber-200/60 text-xs">
              <span className="w-2 h-2 rounded-full bg-amber-500 mt-1 shrink-0" />
              <div className="flex flex-col text-slate-800">
                <strong className="font-bold">Agenda Terjadwal ({selectedDay} September):</strong>
                <p className="text-slate-600 font-medium">
                  {selectedEvent ? selectedEvent.judul : 'Togiani Bekatakan Sulawesi Tengah / Botiruat Rerisaah Sulawesi'}
                </p>
              </div>
            </div>
          </article>

          {/* IKM */}
          <div className="lg:col-span-5">
            <IKMChart />
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Statistics & Videos Section ---
const TourismStatisticsAndVideosSection = ({ stats }) => {
  const domestic = stats?.domestic ?? 56348;
  const international = stats?.international ?? 1887;

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-14 flex flex-col gap-6 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Statistik */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div>
            <span className="text-amber-600 font-extrabold text-[11px] tracking-wider uppercase block">DATA BERKALA</span>
            <h2 className="font-black text-slate-900 text-2xl tracking-tight">Statistik Wisatawan</h2>
            <p className="text-slate-400 text-xs">Estimasi kunjungan wisatawan tahun berjalan</p>
          </div>

          <div className="flex-1 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-sm">Wisata Status</h3>
              <span className="text-slate-400 text-xs">Periode 2024</span>
            </div>

            {/* Domestic */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center text-slate-700">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-black text-slate-900 text-xl">{domestic.toLocaleString('id-ID')}</div>
                  <div className="text-slate-400 text-xs font-semibold">Domestic</div>
                </div>
              </div>
              <div className="flex items-end gap-1 h-8">
                <div className="w-2 h-4 bg-amber-400 rounded-t" />
                <div className="w-2 h-8 bg-blue-900 rounded-t" />
                <div className="w-2 h-6 bg-amber-500 rounded-t" />
              </div>
            </div>

            {/* International */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-black text-slate-900 text-xl">{international.toLocaleString('id-ID')}</div>
                  <div className="text-slate-400 text-xs font-semibold">International</div>
                </div>
              </div>
              <div className="flex items-end gap-1 h-8">
                <div className="w-2 h-3 bg-emerald-400 rounded-t" />
                <div className="w-2 h-5 bg-amber-500 rounded-t" />
                <div className="w-2 h-8 bg-[#0b192c] rounded-t" />
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-400 text-[11px] justify-center pt-1">
              <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
              <span>Sumber: Sistem Informasi Kepariwisataan Sulawesi Tengah</span>
            </div>
          </div>
        </div>

        {/* Right: Video */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-amber-600 font-extrabold text-[11px] tracking-wider uppercase block">DOKUMENTASI VISUAL</span>
              <h2 className="font-black text-slate-900 text-2xl tracking-tight">Video Pariwisata &amp; Desa Wisata</h2>
              <p className="text-slate-400 text-xs">Sinematik keajaiban alam, ragam tradisi, dan daya tarik desa wisata</p>
            </div>
            <span className="px-3 py-1 bg-amber-100 text-amber-700 font-bold text-xs rounded-full border border-amber-200">
              Galeri Video
            </span>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Video Card 1 */}
            <article className="flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm group">
              <div className="relative aspect-video bg-slate-950 overflow-hidden">
                <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
                  <img src={IMAGES.vGrid1} alt="" className="w-full h-full object-cover" />
                  <img src={IMAGES.vGrid2} alt="" className="w-full h-full object-cover" />
                  <img src={IMAGES.vGrid3} alt="" className="w-full h-full object-cover" />
                  <img src={IMAGES.vGrid4} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-black/40" />
                <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#0b192c] text-white font-bold text-[9px] uppercase rounded">
                  PARIWISATA SULTENG
                </span>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 bg-red-600 hover:scale-110 transition-transform rounded-xl flex items-center justify-center text-white shadow-lg">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </a>
              </div>
              <div className="p-4 flex flex-col justify-between flex-1 gap-2">
                <h3 className="font-bold text-slate-900 text-xs leading-snug">Video Pariwisata: Pesona Bahari &amp; Budaya Sulteng</h3>
                <p className="text-slate-400 text-[11px] line-clamp-2">
                  Eksplorasi keindahan bawah laut Kepulauan Togean, Danau Poso, serta cagar budaya megalitikum.
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                  <span className="font-semibold text-slate-700">Profil Daerah</span>
                  <span className="px-1 bg-red-600 text-white font-bold rounded text-[9px]">HD</span>
                </div>
              </div>
            </article>

            {/* Video Card 2 */}
            <article className="flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm group">
              <div className="relative aspect-video bg-slate-950 overflow-hidden">
                <img src={IMAGES.videoDesa} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40" />
                <span className="absolute top-3 left-3 px-2 py-0.5 bg-emerald-700 text-white font-bold text-[9px] uppercase rounded">
                  DESA WISATA
                </span>
                <Link to="/info-pariwisata/destinasi/desa-wisata" className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 bg-red-600 hover:scale-110 transition-transform rounded-xl flex items-center justify-center text-white shadow-lg">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </Link>
              </div>
              <div className="p-4 flex flex-col justify-between flex-1 gap-2">
                <h3 className="font-bold text-slate-900 text-xs leading-snug">Video Desa Wisata: Eksotisme &amp; Kearifan Lokal Sulteng</h3>
                <p className="text-slate-400 text-[11px] line-clamp-2">
                  Menyingkap daya tarik desa wisata percontohan, kehangatan tradisi lokal, kuliner khas, dan agrowisata.
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                  <span className="font-semibold text-slate-700">Jelajah Desa</span>
                  <span className="px-1 bg-red-600 text-white font-bold rounded text-[9px]">HD</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Home Page ---
const Home = () => {
  const [berita, setBerita] = useState([]);
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/berita?limit=6'),
      api.get('/info-pariwisata/kalender-event'),
      api.get('/statistik/wisatawan').catch(() => ({ data: null })),
    ]).then(([beritaRes, eventRes, statsRes]) => {
      setBerita(beritaRes.data.data || []);
      setEvents(eventRes.data?.slice(0, 10) || []);
      setStats(statsRes.data);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>Dinas Pariwisata Provinsi Sulawesi Tengah - Website Resmi</title>
        <meta name="description" content="Website resmi Dinas Pariwisata Provinsi Sulawesi Tengah. Informasi destinasi wisata, berita, PPID, dan layanan publik." />
      </Helmet>

      <Hero />
      <LatestNewsSection berita={berita} loading={loading} />
      <PublicServiceAgendaSection events={events} />
      <TourismStatisticsAndVideosSection stats={stats} />
    </>
  );
};

export default Home;
