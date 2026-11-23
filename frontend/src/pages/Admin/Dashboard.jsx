import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Images, LayoutDashboard, MapPin, Newspaper } from 'lucide-react';
import api from '../../services/api';
import { ADMIN_MENU } from './AdminLayout';
import { GlassCard } from './AdminShared';

const Dashboard = () => {
  const [stats, setStats] = useState({ berita: 0, dtw: 0, desa: 0, slider: 0 });

  useEffect(() => {
    Promise.all([
      api.get('/berita?limit=1').catch(() => ({ data: { total: 0 } })),
      api.get('/info-pariwisata/dtw').catch(() => ({ data: [] })),
      api.get('/info-pariwisata/desa-wisata').catch(() => ({ data: [] })),
      api.get('/slider/all').catch(() => ({ data: [] })),
    ]).then(([b, d, dw, sl]) => {
      setStats({
        berita: b.data.total || 0,
        dtw: d.data.length || 0,
        desa: dw.data.length || 0,
        slider: sl.data.length || 0,
      });
    });
  }, []);

  const cards = [
    { label: 'Total Berita', value: stats.berita, icon: Newspaper, color: 'bg-[#1F5BA6]', path: '/admin/berita' },
    { label: 'Slider Aktif', value: stats.slider, icon: Images, color: 'bg-amber-400', path: '/admin/slider' },
    { label: 'Daya Tarik Wisata', value: stats.dtw, icon: MapPin, color: 'bg-emerald-500', path: '/admin/dtw' },
    { label: 'Desa Wisata', value: stats.desa, icon: MapPin, color: 'bg-[#5C2180]', path: '/admin/desa-wisata' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-[#0b192c]">Dashboard</h1>
        <p className="text-sm text-slate-500">Selamat datang di panel admin Dinas Pariwisata Sulteng</p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, idx) => (
          <Link key={idx} to={card.path}>
            <GlassCard className="group p-6 transition-all hover:-translate-y-0.5 hover:shadow-xl">
              <div
                className={`mb-4 flex h-11 w-11 ${card.color} items-center justify-center rounded-xl text-white shadow-md transition-transform group-hover:scale-110`}
              >
                <card.icon className="h-5 w-5" />
              </div>
              <p className="font-display text-3xl font-extrabold text-[#0b192c]">{card.value}</p>
              <p className="mt-1 text-sm font-medium text-slate-500">{card.label}</p>
            </GlassCard>
          </Link>
        ))}
      </div>

      <GlassCard className="p-6">
        <h2 className="mb-4 font-display font-bold text-[#0b192c]">Akses Cepat</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {ADMIN_MENU.slice(1).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 rounded-xl border border-white/70 bg-white/60 p-4 text-sm font-semibold text-slate-700 backdrop-blur-md transition-all hover:border-amber-400 hover:bg-amber-50/80"
            >
              <item.icon className="h-4 w-4 shrink-0 text-amber-500" />
              {item.label}
            </Link>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default Dashboard;
