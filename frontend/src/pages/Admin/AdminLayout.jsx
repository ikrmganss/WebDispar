import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  FileText,
  Images,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu as MenuIcon,
  Newspaper,
  User,
} from 'lucide-react';

export const ADMIN_MENU = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Slider', path: '/admin/slider', icon: Images },
  { label: 'Berita', path: '/admin/berita', icon: Newspaper },
  { label: 'Daya Tarik Wisata', path: '/admin/dtw', icon: MapPin },
  { label: 'Desa Wisata', path: '/admin/desa-wisata', icon: MapPin },
  { label: 'PPID', path: '/admin/ppid', icon: FileText },
];

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user') || 'null');
  } catch {
    return null;
  }
};

/**
 * Layout bersama semua halaman admin (kecuali Login).
 * Navbar atas berupa 3 chip kaca melayang terpisah:
 * logo di kiri, pil "Menu" di tengah yang melebar saat kursor
 * didekatkan (atau diketuk di layar sentuh), dan chip pengguna
 * + logout di kanan.
 */
const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user] = useState(getStoredUser);

  // Tutup pil menu setiap kali pindah halaman, dan saat tombol Escape ditekan.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  const userName = user?.nama || user?.username || user?.name || 'Admin';

  return (
    <div className="relative min-h-screen">
      {/* Latar: foto asli Dinas + gradasi lembut */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <img
          src="/backgrond/bg1.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#e9eff6]/80 via-[#f4f6fa]/85 to-[#ece6f4]/90" />
      </div>

      {/* Navbar: 3 chip kaca terpisah */}
      <header className="sticky top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 sm:flex-nowrap sm:gap-3">
          {/* Chip kiri: logo */}
          <Link
            to="/admin/dashboard"
            className="flex shrink-0 items-center gap-2.5 rounded-full border border-white/10 bg-[#0b192c]/85 py-1.5 pl-2 pr-4 text-white shadow-lg shadow-[#0b192c]/20 backdrop-blur-md"
          >
            <img
              src="/dinas pariwisata-COLOR WHITE.png"
              alt="Logo Dinas Pariwisata"
              className="h-8 w-auto"
            />
            <span className="leading-tight">
              <span className="block font-display text-sm font-bold">Admin Panel</span>
              <span className="block text-[9px] font-bold tracking-widest text-amber-400">
                DINAS PARIWISATA SULTENG
              </span>
            </span>
          </Link>

          {/* Chip tengah: pil Menu yang melebar */}
          <div
            className="order-3 mx-auto flex w-full justify-center sm:order-none sm:w-auto sm:flex-1"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <nav
              aria-label="Menu admin"
              style={{ maxWidth: menuOpen ? 'min(94vw, 780px)' : 132 }}
              className="flex flex-wrap items-center justify-center gap-1 overflow-hidden rounded-full border border-white/60 bg-white/70 p-1.5 shadow-lg shadow-[#0b192c]/10 backdrop-blur-md transition-all duration-500 ease-in-out"
            >
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-expanded={menuOpen}
                className="flex shrink-0 items-center gap-2 rounded-full bg-[#0b192c] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-slate-800"
              >
                <MenuIcon className="h-4 w-4" />
                Menu
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${menuOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {menuOpen &&
                ADMIN_MENU.map((item) => {
                  const active = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-semibold transition-all ${
                        active
                          ? 'bg-amber-400 text-[#0b192c] shadow-md shadow-amber-400/40'
                          : 'text-slate-700 hover:bg-white/80 hover:text-[#0b192c]'
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
            </nav>
          </div>

          {/* Chip kanan: pengguna + logout */}
          <div className="flex shrink-0 items-center gap-2 rounded-full border border-white/60 bg-white/70 py-1.5 pl-1.5 pr-1.5 shadow-lg shadow-[#0b192c]/10 backdrop-blur-md">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0b192c] text-white">
              <User className="h-4 w-4" />
            </span>
            <span className="hidden max-w-28 truncate text-sm font-bold text-[#0b192c] md:block">
              {userName}
            </span>
            <button
              onClick={handleLogout}
              title="Keluar"
              className="flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-2 text-sm font-bold text-red-600 transition-colors hover:bg-red-500/20"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden lg:inline">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Konten halaman */}
      <main className="mx-auto w-full max-w-6xl px-3 pb-16 pt-6 sm:px-5">{children}</main>
    </div>
  );
};

export default AdminLayout;
