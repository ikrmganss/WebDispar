import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Newspaper, MapPin, FileText, LogOut, LayoutDashboard, Images, Globe, Compass, ShieldCheck, Palette } from 'lucide-react';
import api from '../../services/api';

const MENU = [
  { label: 'Dashboard', path: '/portal-internal-dispar/dashboard', icon: LayoutDashboard },
  { label: 'Slider Hero', path: '/portal-internal-dispar/slider', icon: Images },
  { label: 'Berita & Artikel', path: '/portal-internal-dispar/berita', icon: Newspaper },
  { label: 'Daya Tarik Wisata', path: '/portal-internal-dispar/dtw', icon: MapPin },
  { label: 'Desa Wisata', path: '/portal-internal-dispar/desa-wisata', icon: Compass },
  { label: 'Dokumen PPID', path: '/portal-internal-dispar/ppid', icon: FileText },
  { label: 'Warna Tema', path: '/portal-internal-dispar/tema', icon: Palette },
];

export const AdminLayout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/portal-internal-dispar/login';
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/portal-internal-dispar/login';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* 1. Top Sub-Bar (Topbar Mini) */}
      <div className="w-full bg-[#162744] text-white/80 text-[11px] py-1.5 px-4 sm:px-8 border-b border-white/10 flex items-center justify-between z-30">
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-bold text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Portal Terautentikasi
          </div>
          <span className="hidden sm:inline text-white/60">•</span>
          <span className="hidden sm:inline text-white/70">
            Pemerintah Provinsi Sulawesi Tengah • <span className="text-amber-400 font-semibold">Bumi Seribu Megalit</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-1.5 font-bold text-amber-300 hover:text-amber-200 transition-colors"
          >
            <Globe className="w-3.5 h-3.5" /> Buka Web Publik
          </Link>
          <div className="w-px h-3 bg-white/20" />
          <div className="flex items-center gap-2 text-white/90">
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#1F5BA6] to-[#5C2180] flex items-center justify-center text-[10px] font-bold text-white">
              A
            </div>
            <span className="font-semibold text-xs hidden md:inline">Administrator</span>
          </div>
        </div>
      </div>

      {/* 2. Main Top Navbar (Gradien Khas Halaman Utama) */}
      <header
        className="sticky top-0 z-40 w-full text-white shadow-md border-b border-white/10 transition-colors duration-300"
        style={{ background: 'var(--theme-gradient, linear-gradient(to right, #1F5BA6, #383087, #5C2180))' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand & Logo */}
          <Link to="/portal-internal-dispar/dashboard" className="flex items-center gap-3 shrink-0">
            <div className="h-11 px-2 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center shadow-sm">
              <img
                src="/dinas pariwisata-COLOR WHITE.png"
                alt="Logo Dinas Pariwisata"
                className="h-9 w-auto object-contain drop-shadow"
                onError={(e) => { e.currentTarget.src = '/images/dinas_pariwisata-COLOR_BLACK.png'; }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg md:text-xl tracking-tight leading-tight text-white">
                  Admin Panel
                </span>
                <span className="px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-extrabold uppercase">
                  CMS
                </span>
              </div>
              <p className="text-amber-400 text-[10px] md:text-xs font-bold tracking-wider uppercase leading-tight">
                DINAS PARIWISATA SULTENG
              </p>
            </div>
          </Link>

          {/* Desktop Nav in Glassy Pill (Persis Navbar Utama) */}
          <nav className="hidden lg:inline-flex items-center gap-1 p-1.5 rounded-full border border-white/20 bg-white/15 backdrop-blur-md shadow-inner">
            {MENU.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all inline-flex items-center gap-2 ${
                    active
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-red-200 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 transition-all active:scale-95 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Horizontal Scroll */}
        <div className="lg:hidden border-t border-white/10 px-4 py-2 flex items-center gap-1 overflow-x-auto scrollbar-none">
          {MENU.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap inline-flex items-center gap-1.5 ${
                  active
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-white/80 hover:bg-white/15'
                }`}
              >
                <item.icon className="w-3 h-3" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </header>

      {/* Main Content Area (Full Width Centered) */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8">
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
    { label: 'Total Berita', value: stats.berita, icon: Newspaper, color: 'bg-gradient-to-br from-[#1F5BA6] to-[#0369a1]', path: '/portal-internal-dispar/berita' },
    { label: 'Slider Hero Aktif', value: stats.slider, icon: Images, color: 'bg-gradient-to-br from-[#eab308] to-[#ca8a04]', path: '/portal-internal-dispar/slider' },
    { label: 'Daya Tarik Wisata', value: stats.dtw, icon: MapPin, color: 'bg-gradient-to-br from-[#059669] to-[#047857]', path: '/portal-internal-dispar/dtw' },
    { label: 'Desa Wisata', value: stats.desa, icon: Compass, color: 'bg-gradient-to-br from-[#5C2180] to-[#7c3aed]', path: '/portal-internal-dispar/desa-wisata' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Banner Selamat Datang Bergaya Hero Halaman Utama */}
        <div
          className="relative overflow-hidden rounded-3xl p-8 text-white shadow-lg border border-white/10 transition-colors duration-300"
          style={{ background: 'var(--theme-gradient, linear-gradient(to right, #1F5BA6, #383087, #5C2180))' }}
        >
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-xs font-bold text-amber-300 border border-white/20 mb-3">
              <ShieldCheck className="w-3.5 h-3.5" /> Pusat Kontrol Manajemen Data
            </div>
            <h1 className="text-3xl font-black tracking-tight mb-2">Selamat Datang di Panel Admin Dispar</h1>
            <p className="text-white/80 text-sm leading-relaxed">
              Kelola informasi destinasi wisata, pengumuman berita berkala, promosi event daerah, dan transparansi layanan PPID Provinsi Sulawesi Tengah dalam satu wadah terpadu.
            </p>
          </div>
          <div className="absolute -right-8 -bottom-10 opacity-15 pointer-events-none">
            <img src="/dinas pariwisata-COLOR WHITE.png" alt="Emblem" className="w-80 h-auto object-contain" />
          </div>
        </div>

        {/* Grid Kartu Statistik */}
        <div>
          <h2 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
            Ringkasan Konten Portal
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cards.map((card, idx) => (
              <Link
                key={idx}
                to={card.path}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 hover:shadow-md hover:-translate-y-0.5 transition-all group"
              >
                <div className={`w-12 h-12 ${card.color} rounded-2xl flex items-center justify-center text-white mb-4 shadow-sm group-hover:scale-105 transition-transform`}>
                  <card.icon className="w-6 h-6" />
                </div>
                <p className="text-3xl font-black text-slate-900">{card.value}</p>
                <p className="text-xs text-slate-500 font-bold mt-1 uppercase tracking-wider">{card.label}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Akses Cepat */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6">
          <h2 className="font-black text-slate-900 text-base mb-4">Navigasi Akses Cepat Modul</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {MENU.slice(1).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-[#1F5BA6] hover:bg-sky-50/50 transition-all text-sm font-bold text-slate-700 hover:text-[#1F5BA6]"
              >
                <div className="w-8 h-8 rounded-lg bg-sky-100 text-[#1F5BA6] flex items-center justify-center shrink-0">
                  <item.icon className="w-4 h-4" />
                </div>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
