import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight, Search } from 'lucide-react';

const KABUPATEN_LIST = [
  'Kota Palu', 'Kabupaten Donggala', 'Kabupaten Sigi', 'Kabupaten Parigi Moutong',
  'Kabupaten Poso', 'Kabupaten Morowali', 'Kabupaten Morowali Utara', 'Kabupaten Tojo Una-Una',
  'Kabupaten Banggai', 'Kabupaten Banggai Kepulauan', 'Kabupaten Banggai Laut',
  'Kabupaten Tolitoli', 'Kabupaten Buol',
];

const slugify = (str) =>
  str.toLowerCase().replace(/kabupaten |kota /g, '').replace(/\s+/g, '-');

const MENUS = [
  { label: 'Home', path: '/' },
  { label: 'Berita', path: '/berita' },
  {
    label: 'Profil',
    children: [
      { label: 'Sejarah', path: '/profil/sejarah' },
      { label: 'Visi dan Misi', path: '/profil/visi-misi' },
      { label: 'Profil Pimpinan', path: '/profil/profil-pimpinan' },
      { label: 'Tupoksi', path: '/profil/tupoksi' },
      { label: 'Majalah', path: '/profil/majalah' },
      { label: 'Logo', path: '/profil/logo' },
      { label: 'Hubungi Kami', path: '/profil/hubungi-kami' },
    ],
  },
  {
    label: 'Informasi Publik',
    children: [
      {
        label: 'PPID',
        children: [
          {
            label: 'Profil',
            children: [
              { label: 'Struktur Organisasi PPID', path: '/ppid/struktur-organisasi' },
              { label: 'Visi dan Misi', path: '/ppid/visi-misi' },
              { label: 'Maklumat Pelayanan Informasi Publik', path: '/ppid/maklumat-pelayanan' },
              { label: 'Tugas PPID dan PPID Pelaksana', path: '/ppid/tugas-ppid' },
            ],
          },
          { label: 'Dokumen Publik', path: '/ppid/profil/dokumen-publik' },
          { label: 'Laporan Tahunan PPID', path: '/ppid/profil/laporan-tahunan' },
          {
            label: 'Layanan Publik',
            children: [
              { label: 'Form Permohonan Informasi', path: '/ppid/layanan-publik/form-permohonan' },
              { label: 'Form Pengajuan Keberatan', path: '/ppid/layanan-publik/form-keberatan' },
              { label: 'Prosedur Pengaduan', path: '/ppid/layanan-publik/prosedur-pengaduan' },
              { label: 'Survey Penilaian Layanan Informasi Publik', path: '/ppid/layanan-publik/survey-kepuasan' },
              { label: 'Regulasi Layanan Publik', path: '/ppid/layanan-publik/regulasi' },
            ],
          },
          { label: 'Surat Keputusan', path: '/ppid/profil/surat-keputusan' },
          { label: 'Standar Pelayanan Publik', path: '/ppid/profil/standar-pelayanan' },
        ],
      },
      { label: 'Informasi Setiap Saat', path: '/ppid/informasi-setiap-saat' },
      { label: 'Informasi Serta Merta', path: '/ppid/informasi-serta-merta' },
      { label: 'Informasi Dikecualikan', path: '/ppid/informasi-dikecualikan' },
      { label: 'Layanan Aduan Masyarakat', path: 'https://www.lapor.go.id', external: true },
      { label: 'Regulasi', path: '/ppid/regulasi' },
    ],
  },
  {
    label: 'Info Pariwisata',
    children: [
      {
        label: 'Destinasi Pariwisata',
        children: [
          {
            label: 'Daya Tarik Wisata',
            inlineChildren: true,
            children: KABUPATEN_LIST.map((kab) => ({
              label: kab,
              path: `/info-pariwisata/destinasi/daya-tarik-wisata/${slugify(kab)}`,
            })),
          },
          {
            label: 'Desa Wisata',
            inlineChildren: true,
            children: KABUPATEN_LIST.map((kab) => ({
              label: kab,
              path: `/info-pariwisata/destinasi/desa-wisata/${slugify(kab)}`,
            })),
          },
        ],
      },
      {
        label: 'Pemasaran Pariwisata',
        children: [
          { label: 'Paket Wisata', path: '/info-pariwisata/pemasaran/paket-wisata' },
          { label: 'Kalender Event', path: '/info-pariwisata/pemasaran/kalender-event' },
          { label: 'Data Hunian Hotel', path: '/info-pariwisata/pemasaran/data-hunian' },
          { label: 'Statistik Kunjungan', path: '/info-pariwisata/pemasaran/statistik-kunjungan' },
        ],
      },
      { label: 'Ekonomi Kreatif', path: '/info-pariwisata/ekonomi-kreatif' },
      { label: 'Sumber Daya Pariwisata', path: '/info-pariwisata/sumber-daya' },
    ],
  },
  { label: 'Rencana Terbit', path: '/rencana-terbit' },
  { label: 'Lapor', path: 'https://www.lapor.go.id', external: true },
];

const LogoSymbol = () => (
  <img src="/dinas pariwisata-COLOR WHITE.png" alt="Logo Dinas Pariwisata" className="h-10 w-auto" />
);

// Dropdown panel styles
const panelStyle = (extra = {}, small = false) => ({
  position: 'absolute',
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: 12,
  boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
  zIndex: 9999,
  minWidth: small ? 180 : 220,
  ...extra,
});

const itemBase = (active, small = false) => ({
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  width: '100%', padding: small ? '7px 13px' : '10px 16px',
  fontSize: small ? 12 : 13, cursor: 'pointer',
  color: active ? '#d97706' : '#334155',
  background: active ? '#fef3c7' : 'transparent',
  border: 'none', textAlign: 'left',
  fontWeight: active ? 700 : 500,
});

const SubPanel = ({ items, onClose, small = false, subLeft = false }) => {
  const [openIdx, setOpenIdx] = useState(null);
  const pos = subLeft ? { top: 0, right: '100%', left: 'auto' } : { top: 0, left: '100%' };
  return (
    <div style={panelStyle(pos, small)}>
      {items.map((item, idx) => {
        const hasSub = Array.isArray(item.children) && item.children.length > 0;
        if (hasSub && item.inlineChildren) return (
          <div key={idx}>
            <button onClick={() => setOpenIdx(openIdx === idx ? null : idx)} style={itemBase(openIdx === idx, small)}>
              <span style={{ flex: 1 }}>{item.label}</span>
              <ChevronDown size={11} style={{ opacity: 0.5, flexShrink: 0, transition: 'transform 0.2s', transform: openIdx === idx ? 'rotate(180deg)' : 'none' }} />
            </button>
            {openIdx === idx && (
              <div style={{ borderTop: '1px solid #f1f5f9' }}>
                {item.children.map((child, cidx) => (
                  <Link key={cidx} to={child.path} onClick={onClose}
                    style={{ display: 'block', padding: '6px 13px 6px 22px', fontSize: 11, color: '#64748b', textDecoration: 'none' }}>
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
        if (hasSub) return (
          <div key={idx} style={{ position: 'relative' }}>
            <button onClick={() => setOpenIdx(openIdx === idx ? null : idx)} style={itemBase(openIdx === idx, small)}>
              <span style={{ flex: 1 }}>{item.label}</span>
              <ChevronRight size={11} style={{ opacity: 0.5, flexShrink: 0 }} />
            </button>
            {openIdx === idx && <SubPanel items={item.children} onClose={onClose} small subLeft={subLeft} />}
          </div>
        );
        if (item.external) return (
          <a key={idx} href={item.path} target="_blank" rel="noopener noreferrer" onClick={onClose}
            style={{ display: 'block', padding: small ? '7px 13px' : '10px 16px', fontSize: small ? 12 : 13, color: '#334155', textDecoration: 'none' }}>
            {item.label}
          </a>
        );
        return (
          <Link key={idx} to={item.path} onClick={onClose}
            style={{ display: 'block', padding: small ? '7px 13px' : '10px 16px', fontSize: small ? 12 : 13, color: '#334155', textDecoration: 'none' }}>
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};

const DropdownPanel = ({ items, onClose }) => {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div style={panelStyle({ top: '100%', left: 0 }, true)}>
      {items.map((item, idx) => {
        const hasSub = Array.isArray(item.children) && item.children.length > 0;
        if (hasSub) return (
          <div key={idx} style={{ position: 'relative' }}>
            <button onClick={() => setOpenIdx(openIdx === idx ? null : idx)} style={itemBase(openIdx === idx, true)}>
              <span style={{ flex: 1 }}>{item.label}</span>
              <ChevronRight size={11} style={{ opacity: 0.5, flexShrink: 0 }} />
            </button>
            {openIdx === idx && <SubPanel items={item.children} onClose={onClose} small />}
          </div>
        );
        if (item.external) return (
          <a key={idx} href={item.path} target="_blank" rel="noopener noreferrer" onClick={onClose}
            style={{ display: 'block', padding: '7px 13px', fontSize: 12, color: '#334155', textDecoration: 'none' }}>
            {item.label}
          </a>
        );
        return (
          <Link key={idx} to={item.path} onClick={onClose}
            style={{ display: 'block', padding: '7px 13px', fontSize: 12, color: '#334155', textDecoration: 'none' }}>
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};

const MobileMenu = ({ items, level = 0, openKeys, toggleKey, parentKey = '', onClose }) => (
  <>
    {items.map((item, idx) => {
      const key = `${parentKey}-${idx}`;
      const hasChildren = Array.isArray(item.children) && item.children.length > 0;
      const isOpen = !!openKeys[key];
      if (hasChildren) return (
        <div key={key} style={{ paddingLeft: level * 12 }}>
          <button onClick={() => toggleKey(key)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '10px 16px', fontSize: 13, color: '#334155', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
            <span>{item.label}</span>
            <ChevronDown size={13} style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'none', flexShrink: 0 }} />
          </button>
          {isOpen && <MobileMenu items={item.children} level={level + 1} openKeys={openKeys} toggleKey={toggleKey} parentKey={key} onClose={onClose} />}
        </div>
      );
      if (item.external) return (
        <a key={key} href={item.path} target="_blank" rel="noopener noreferrer" onClick={onClose}
          style={{ display: 'block', padding: '9px 16px', paddingLeft: level * 12 + 16, fontSize: 13, color: '#64748b', textDecoration: 'none' }}>
          {item.label}
        </a>
      );
      return (
        <Link key={key} to={item.path} onClick={onClose}
          style={{ display: 'block', padding: '9px 16px', paddingLeft: level * 12 + 16, fontSize: 13, color: '#64748b', textDecoration: 'none' }}>
          {item.label}
        </Link>
      );
    })}
  </>
);

const Navbar = ({ onSearchClick, language, setLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpenKeys, setMobileOpenKeys] = useState({});
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);
  const isHome = location.pathname === '/';
  const light = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveMenu(null);
    setMobileOpenKeys({});
    setScrolled(window.scrollY > 80);
  }, [location]);

  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setActiveMenu(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggleMobileKey = (key) =>
    setMobileOpenKeys((prev) => ({ ...prev, [key]: !prev[key] }));

  const closeAll = () => { setActiveMenu(null); setIsOpen(false); };

  const isActive = (menu) => {
    if (menu.path) return location.pathname === menu.path;
    return false;
  };

  return (
    <>
      <header ref={navRef} className={`fixed top-0 left-0 right-0 z-40 w-full flex justify-center transition-all duration-300 ${
        scrolled ? 'bg-white/30 backdrop-blur-md border-b border-white/40 shadow-md' : 'bg-transparent'
      }`}>
        <div className="flex max-w-7xl h-20 items-center justify-between px-4 md:px-8 w-full">
          {/* Logo */}
          <Link to="/" onClick={closeAll} className="inline-flex items-center gap-3">
            <LogoSymbol />
            <div className="flex flex-col">
              <span className={`font-black text-lg md:text-xl tracking-tight leading-tight ${light ? 'text-white' : 'text-slate-900'}`}>Dinas Pariwisata</span>
              <span className="font-bold text-amber-400 text-[10px] md:text-xs tracking-wider uppercase">PROVINSI SULAWESI TENGAH</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className={`hidden lg:inline-flex items-center gap-1 p-1 rounded-full border shadow-inner transition-all duration-300 ${
            scrolled ? 'bg-white/20 border-white/30 backdrop-blur-sm' : 'bg-white/10 border-white/20 backdrop-blur-sm'
          }`}>
            {MENUS.map((menu, idx) => {
              const active = isActive(menu);
              if (menu.children) return (
                <div key={idx} style={{ position: 'relative' }}>
                  <button
                    type="button"
                    onClick={() => setActiveMenu(activeMenu === idx ? null : idx)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all inline-flex items-center gap-1 ${
                      activeMenu === idx ? 'bg-amber-500 text-slate-950 shadow-sm' : light ? 'text-white hover:bg-white/20' : 'text-slate-700 hover:bg-white/20'
                    }`}
                  >
                    {menu.label}
                    <ChevronDown size={11} style={{ transition: 'transform 0.2s', transform: activeMenu === idx ? 'rotate(180deg)' : 'none' }} />
                  </button>
                  {activeMenu === idx && <DropdownPanel items={menu.children} onClose={closeAll} />}
                </div>
              );
              return (
                <Link key={idx} to={menu.path}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    active ? 'bg-amber-500 text-slate-950 shadow-sm' : light ? 'text-white hover:bg-white/20' : 'text-slate-700 hover:bg-white/20'
                  }`}
                >
                  {menu.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="inline-flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <Search className={`w-4 h-4 ${light ? 'text-white' : 'text-slate-700'}`} />
            </button>
            <div className={`hidden md:inline-flex items-center gap-1 rounded-full px-1 py-0.5 border transition-all duration-300 ${
              scrolled ? 'bg-white/20 border-white/30 backdrop-blur-sm' : 'bg-white/10 border-white/20 backdrop-blur-sm'
            }`}>
              {['ID', 'EN'].map((lang, i) => (
                <span key={lang} className="inline-flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setLanguage(lang)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                      language === lang ? 'bg-amber-500 text-slate-900 shadow-sm' : light ? 'text-white/80 hover:text-white' : 'text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    {lang}
                  </button>
                  {i === 0 && <span className="text-slate-400 text-[10px]">/</span>}
                </span>
              ))}
            </div>
            <button onClick={() => setIsOpen(!isOpen)} className={`lg:hidden p-2 ${light ? 'text-white' : 'text-slate-700'}`}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-lg max-h-[80vh] overflow-y-auto">
            <div className="px-4 py-3 flex flex-col gap-1">
              {MENUS.map((menu, idx) => {
                const key = `top-${idx}`;
                const isMenuOpen = !!mobileOpenKeys[key];
                if (menu.children) return (
                  <div key={key}>
                    <button onClick={() => toggleMobileKey(key)}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '10px 16px', fontSize: 14, fontWeight: 600, color: '#0f172a', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                      {menu.label}
                      <ChevronDown size={16} style={{ transition: 'transform 0.2s', transform: isMenuOpen ? 'rotate(180deg)' : 'none', flexShrink: 0 }} />
                    </button>
                    {isMenuOpen && (
                      <MobileMenu items={menu.children} level={1} openKeys={mobileOpenKeys} toggleKey={toggleMobileKey} parentKey={key} onClose={closeAll} />
                    )}
                  </div>
                );
                return (
                  <Link key={key} to={menu.path} onClick={closeAll}
                    style={{ display: 'block', padding: '10px 16px', fontSize: 14, fontWeight: 600, color: '#0f172a', textDecoration: 'none' }}>
                    {menu.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-5 shadow-2xl border border-slate-200 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Cari Portal Wisata</h3>
              <button onClick={() => setIsSearchOpen(false)} className="text-slate-400 font-bold text-lg leading-none">✕</button>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                placeholder="Cari berita, agenda, atau destinasi..."
                className="w-full pl-9 pr-4 py-2.5 bg-slate-100 rounded-xl text-xs outline-none focus:ring-2 focus:ring-amber-500"
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setIsSearchOpen(false)} className="px-4 py-2 bg-slate-200 text-slate-800 text-xs font-bold rounded-xl">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

