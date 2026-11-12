import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Newspaper, MapPin, FileText, LogOut, LayoutDashboard, Images, ChevronRight } from 'lucide-react';
import api from '../../services/api';

const MENU = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Slider', path: '/admin/slider', icon: Images },
  { label: 'Berita', path: '/admin/berita', icon: Newspaper },
  { label: 'Daya Tarik Wisata', path: '/admin/dtw', icon: MapPin },
  { label: 'Desa Wisata', path: '/admin/desa-wisata', icon: MapPin },
  { label: 'PPID', path: '/admin/ppid', icon: FileText },
];

export const AdminLayout = ({ children }) => {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/admin/login';
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-[#0b192c] text-white flex flex-col z-30">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <img src="/dinas pariwisata-COLOR WHITE.png" alt="Logo" className="h-9 w-auto" />
            <div>
              <p className="font-black text-white text-sm leading-tight">Admin Panel</p>
              <p className="text-amber-400 text-[10px] font-bold tracking-wider">DINAS PARIWISATA</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {MENU.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-3">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </span>
                {active && <ChevronRight className="w-3.5 h-3.5" />}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-slate-800">
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-64 flex-1 p-8 min-h-screen">
        {children}
      </main>
    </div>
  );
};

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
    { label: 'Total Berita', value: stats.berita, icon: Newspaper, color: 'bg-blue-500', path: '/admin/berita' },
    { label: 'Slider Aktif', value: stats.slider, icon: Images, color: 'bg-amber-500', path: '/admin/slider' },
    { label: 'Daya Tarik Wisata', value: stats.dtw, icon: MapPin, color: 'bg-emerald-500', path: '/admin/dtw' },
    { label: 'Desa Wisata', value: stats.desa, icon: MapPin, color: 'bg-purple-500', path: '/admin/desa-wisata' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Dashboard</h1>
          <p className="text-slate-400 text-sm">Selamat datang di panel admin Dinas Pariwisata Sulteng</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card, idx) => (
            <Link key={idx} to={card.path}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow group">
              <div className={`w-11 h-11 ${card.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                <card.icon className="w-5 h-5" />
              </div>
              <p className="text-3xl font-black text-slate-900">{card.value}</p>
              <p className="text-sm text-slate-500 font-medium mt-1">{card.label}</p>
            </Link>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="font-bold text-slate-900 mb-4">Akses Cepat</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {MENU.slice(1).map((item) => (
              <Link key={item.path} to={item.path}
                className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50 transition-all text-sm font-semibold text-slate-700">
                <item.icon className="w-4 h-4 text-amber-500" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
