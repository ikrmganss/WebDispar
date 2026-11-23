import { useState, useEffect } from 'react';
import { Palette, Check, RotateCcw, Save, AlertCircle, CheckCircle2, Sparkles, Calendar } from 'lucide-react';
import { AdminLayout } from './Dashboard';
import api from '../../services/api';
import { useTheme } from '../../context/ThemeContext';
import { SeasonalIcon } from '../../components/SeasonalIcon';

const PRESET_TEMAS = [
  // 0. KHUSUS HARI BESAR & PERAYAAN (DILENGKAPI IKON TEMATIK)
  {
    nama: 'Bulan Suci Ramadhan & Idul Fitri',
    kategori: 'Hari Besar',
    primary: '#064e3b',
    secondary: '#047857',
    accent: '#14532d',
    highlight: '#fbbf24',
    badge_icon: 'ketupat',
    seasonal_badge: 'Ramadhan & Idul Fitri'
  },
  {
    nama: 'HUT Kemerdekaan RI (Merah Putih)',
    kategori: 'Hari Besar',
    primary: '#b91c1c',
    secondary: '#dc2626',
    accent: '#991b1b',
    highlight: '#ffffff',
    badge_icon: 'kemerdekaan',
    seasonal_badge: 'Dirgahayu Republik Indonesia'
  },
  {
    nama: 'Hari Raya Natal & Tahun Baru',
    kategori: 'Hari Besar',
    primary: '#14532d',
    secondary: '#991b1b',
    accent: '#1e3a8a',
    highlight: '#facc15',
    badge_icon: 'natal',
    seasonal_badge: 'Merry Christmas & Happy New Year'
  },
  {
    nama: 'Tahun Baru Imlek (Hoki & Kemakmuran)',
    kategori: 'Hari Besar',
    primary: '#991b1b',
    secondary: '#b91c1c',
    accent: '#7f1d1d',
    highlight: '#fde047',
    badge_icon: 'imlek',
    seasonal_badge: 'Gong Xi Fa Cai'
  },
  {
    nama: 'Festival Budaya Bumi Megalit',
    kategori: 'Hari Besar',
    primary: '#334155',
    secondary: '#1e293b',
    accent: '#0f172a',
    highlight: '#38bdf8',
    badge_icon: 'megalit',
    seasonal_badge: 'Bumi Seribu Megalit Sulteng'
  },

  // 1. Biru & Ungu (Karakter Resmi & Elegan)
  {
    nama: 'Sulteng Biru Ungu (Default)',
    kategori: 'Resmi',
    primary: '#1F5BA6',
    secondary: '#383087',
    accent: '#5C2180',
    highlight: '#f59e0b',
    badge_icon: 'none',
    seasonal_badge: ''
  },
  {
    nama: 'Royal Deep Ocean (Biru Samudra)',
    kategori: 'Bahari',
    primary: '#0369a1',
    secondary: '#1e40af',
    accent: '#312e81',
    highlight: '#38bdf8',
    badge_icon: 'none',
    seasonal_badge: ''
  },
  {
    nama: 'Midnight Indigo (Biru Malam)',
    kategori: 'Elegan',
    primary: '#1e1b4b',
    secondary: '#2e1065',
    accent: '#3b0764',
    highlight: '#facc15',
    badge_icon: 'none',
    seasonal_badge: ''
  },
  {
    nama: 'Sky Sapphire (Biru Langit Terang)',
    kategori: 'Modern',
    primary: '#0284c7',
    secondary: '#2563eb',
    accent: '#4f46e5',
    highlight: '#fbbf24',
    badge_icon: 'none',
    seasonal_badge: ''
  },

  // 2. Hijau & Alam (Ekowisata & Hutan)
  {
    nama: 'Emerald Bahari (Hijau Laut Togean)',
    kategori: 'Alam',
    primary: '#047857',
    secondary: '#0f766e',
    accent: '#1e3a8a',
    highlight: '#fbbf24',
    badge_icon: 'none',
    seasonal_badge: ''
  },
  {
    nama: 'Lembah Lore Lindu (Hijau Hutan Tropis)',
    kategori: 'Alam',
    primary: '#14532d',
    secondary: '#166534',
    accent: '#064e3b',
    highlight: '#eab308',
    badge_icon: 'none',
    seasonal_badge: ''
  },
  {
    nama: 'Laguna Tosca (Tosca Segar)',
    kategori: 'Bahari',
    primary: '#0e7490',
    secondary: '#0891b2',
    accent: '#155e75',
    highlight: '#f59e0b',
    badge_icon: 'none',
    seasonal_badge: ''
  },
  {
    nama: 'Mint Oasis (Hijau Mint Fresh)',
    kategori: 'Modern',
    primary: '#0d9488',
    secondary: '#059669',
    accent: '#047857',
    highlight: '#fb923c',
    badge_icon: 'none',
    seasonal_badge: ''
  },

  // 3. Merah, Oranye & Matahari Terbenam (Kultural & Hangat)
  {
    nama: 'Sunset Megalit (Merah Maroon)',
    kategori: 'Kultural',
    primary: '#991b1b',
    secondary: '#831843',
    accent: '#4c1d95',
    highlight: '#f59e0b',
    badge_icon: 'none',
    seasonal_badge: ''
  },
  {
    nama: 'Crimson Velvet (Merah Delima)',
    kategori: 'Kultural',
    primary: '#be123c',
    secondary: '#9f1239',
    accent: '#4c0519',
    highlight: '#fde047',
    badge_icon: 'none',
    seasonal_badge: ''
  },
  {
    nama: 'Senja Teluk Palu (Amber & Oranye)',
    kategori: 'Hangat',
    primary: '#c2410c',
    secondary: '#b45309',
    accent: '#78350f',
    highlight: '#38bdf8',
    badge_icon: 'none',
    seasonal_badge: ''
  },
  {
    nama: 'Koral Pulau Sombori (Terakota Koral)',
    kategori: 'Hangat',
    primary: '#ea580c',
    secondary: '#c026d3',
    accent: '#701a75',
    highlight: '#fef08a',
    badge_icon: 'none',
    seasonal_badge: ''
  },

  // 4. Emas, Gelap & Monokrom Premium
  {
    nama: 'Golden Heritage (Emas Kemewahan)',
    kategori: 'Premium',
    primary: '#854d0e',
    secondary: '#713f12',
    accent: '#422006',
    highlight: '#facc15',
    badge_icon: 'none',
    seasonal_badge: ''
  },
  {
    nama: 'Dark Obsidian (Hitam Modern Charcoal)',
    kategori: 'Premium',
    primary: '#0f172a',
    secondary: '#1e293b',
    accent: '#334155',
    highlight: '#38bdf8',
    badge_icon: 'none',
    seasonal_badge: ''
  },
  {
    nama: 'Cyber Purple (Ungu Neon Futuristik)',
    kategori: 'Modern',
    primary: '#6b21a8',
    secondary: '#7e22ce',
    accent: '#9333ea',
    highlight: '#22d3ee',
    badge_icon: 'none',
    seasonal_badge: ''
  }
];

const AdminTema = () => {
  const { theme, updateThemeState } = useTheme();
  const [form, setForm] = useState({
    nama_tema: theme.nama_tema || 'Sulteng Biru Ungu',
    primary_color: theme.primary_color || '#1F5BA6',
    secondary_color: theme.secondary_color || '#383087',
    accent_color: theme.accent_color || '#5C2180',
    highlight_color: theme.highlight_color || '#f59e0b',
    badge_icon: theme.badge_icon || 'none',
    seasonal_badge: theme.seasonal_badge || ''
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (theme) {
      setForm({
        nama_tema: theme.nama_tema || 'Sulteng Biru Ungu',
        primary_color: theme.primary_color || '#1F5BA6',
        secondary_color: theme.secondary_color || '#383087',
        accent_color: theme.accent_color || '#5C2180',
        highlight_color: theme.highlight_color || '#f59e0b',
        badge_icon: theme.badge_icon || 'none',
        seasonal_badge: theme.seasonal_badge || ''
      });
    }
  }, [theme]);

  const handleApplyPreset = (preset) => {
    const updated = {
      nama_tema: preset.nama,
      primary_color: preset.primary,
      secondary_color: preset.secondary,
      accent_color: preset.accent,
      highlight_color: preset.highlight,
      badge_icon: preset.badge_icon || 'none',
      seasonal_badge: preset.seasonal_badge || ''
    };
    setForm(updated);
    updateThemeState(updated);
  };

  const handleColorChange = (key, val) => {
    const updated = { ...form, [key]: val, nama_tema: 'Tema Kustom' };
    setForm(updated);
    updateThemeState(updated);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const res = await api.put('/tema', form);
      updateThemeState(res.data.data);
      setSuccess('Tema website berhasil disimpan ke database!');
      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menyimpan tema');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm('Kembalikan tema ke setelan bawaan (Default)?')) return;
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const res = await api.post('/tema/reset');
      setForm(res.data.data);
      updateThemeState(res.data.data);
      setSuccess('Tema berhasil dikembalikan ke setelan awal!');
      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      setError('Gagal mereset tema');
    } finally {
      setSaving(false);
    }
  };

  const gradientPreview = `linear-gradient(to right, ${form.primary_color}, ${form.secondary_color}, ${form.accent_color})`;

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Palette className="w-6 h-6 text-amber-500" /> Pengaturan Tema Website
            </h1>
            <p className="text-slate-500 text-sm">
              Kustomisasi warna gradien utama, navbar, tombol aksen, dan identitas visual portal
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Reset Bawaan
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 text-xs font-extrabold transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <Save className="w-4 h-4" /> {saving ? 'Menyimpan...' : 'Simpan Tema'}
            </button>
          </div>
        </div>

        {/* Notifikasi */}
        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="flex items-center gap-2 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Live Preview Box */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-black text-slate-900 text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" /> Pratinjau Langsung (Live Preview)
            </h2>
            <span className="text-xs font-bold text-slate-500 px-3 py-1 bg-slate-100 rounded-full">
              {form.nama_tema}
            </span>
          </div>

          {/* Dummy Navbar Banner Preview */}
          <div
            className="rounded-2xl p-6 text-white shadow-md transition-all duration-300 relative overflow-hidden"
            style={{ background: gradientPreview }}
          >
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="h-10 px-2 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
                  <img src="/dinas pariwisata-COLOR WHITE.png" alt="Logo" className="h-8 w-auto object-contain" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-black text-base leading-tight">Dinas Pariwisata</p>
                    {form.badge_icon && form.badge_icon !== 'none' && (
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/25 border border-white/30 text-[10px] font-bold text-amber-300">
                        <SeasonalIcon type={form.badge_icon} className="w-3.5 h-3.5" />
                        <span>{form.seasonal_badge}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: form.highlight_color }}>
                    PROVINSI SULAWESI TENGAH
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 p-1 rounded-full bg-white/15 border border-white/20 text-xs font-bold">
                <span className="px-3 py-1 rounded-full text-slate-950 font-black shadow-sm" style={{ backgroundColor: form.highlight_color }}>
                  Beranda
                </span>
                <span className="px-3 py-1 text-white/90">Profil</span>
                <span className="px-3 py-1 text-white/90">Destinasi</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
              <div>
                <h3 className="text-xl font-black">Eksplorasi Keindahan Sulawesi Tengah</h3>
                <p className="text-xs text-white/80 mt-0.5">Warna tema ini langsung diterapkan di portal publik dan admin.</p>
              </div>
              <button
                className="px-4 py-2 rounded-xl font-bold text-xs text-slate-950 shadow-sm transition-transform active:scale-95"
                style={{ backgroundColor: form.highlight_color }}
              >
                Jelajahi Sekarang
              </button>
            </div>
          </div>
        </div>

        {/* Preset Palet Warna */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="font-black text-slate-900 text-base mb-1">Pilihan Palet Tema Siap Pakai</h2>
          <p className="text-xs text-slate-500 mb-6">Pilih kombinasi warna harmoni yang telah dirancang untuk identitas daerah</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRESET_TEMAS.map((preset, idx) => {
              const isSelected = form.primary_color === preset.primary && form.accent_color === preset.accent;
              return (
                <div
                  key={idx}
                  onClick={() => handleApplyPreset(preset)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer group hover:shadow-md ${
                    isSelected ? 'border-amber-400 bg-amber-50/20 ring-2 ring-amber-400/30' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div
                    className="h-14 rounded-xl mb-3 shadow-inner flex items-center justify-between px-3 relative overflow-hidden"
                    style={{ background: `linear-gradient(to right, ${preset.primary}, ${preset.secondary}, ${preset.accent})` }}
                  >
                    {preset.badge_icon && preset.badge_icon !== 'none' ? (
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/25 backdrop-blur-sm border border-white/30 text-[10px] font-bold text-white shadow-sm">
                        <SeasonalIcon type={preset.badge_icon} className="w-3.5 h-3.5" />
                        <span className="text-[10px]">{preset.seasonal_badge}</span>
                      </div>
                    ) : <span />}
                    <span
                      className="w-4 h-4 rounded-full border border-white/60 shadow-sm shrink-0"
                      style={{ backgroundColor: preset.highlight }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                          {preset.kategori || 'Tema'}
                        </span>
                        <p className="font-bold text-slate-900 text-xs truncate max-w-[150px]">{preset.nama}</p>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1 text-[10px] text-slate-500 font-mono">
                        <span>{preset.primary}</span> • <span>{preset.accent}</span>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Kustomisasi Manual Picker */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="font-black text-slate-900 text-base mb-1">Kustomisasi Kode Warna Hex Manual</h2>
          <p className="text-xs text-slate-500 mb-6">Sesuaikan setiap perhentian warna secara spesifik sesuai kebutuhan</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Primary */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Warna Primer (Kiri)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={form.primary_color}
                  onChange={(e) => handleColorChange('primary_color', e.target.value)}
                  className="w-12 h-12 rounded-xl cursor-pointer border border-slate-200 p-1"
                />
                <input
                  type="text"
                  value={form.primary_color}
                  onChange={(e) => handleColorChange('primary_color', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold uppercase focus:ring-2 focus:ring-[#1F5BA6] outline-none"
                />
              </div>
            </div>

            {/* 2. Secondary */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Warna Sekunder (Tengah)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={form.secondary_color}
                  onChange={(e) => handleColorChange('secondary_color', e.target.value)}
                  className="w-12 h-12 rounded-xl cursor-pointer border border-slate-200 p-1"
                />
                <input
                  type="text"
                  value={form.secondary_color}
                  onChange={(e) => handleColorChange('secondary_color', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold uppercase focus:ring-2 focus:ring-[#1F5BA6] outline-none"
                />
              </div>
            </div>

            {/* 3. Accent */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Warna Tersier (Kanan)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={form.accent_color}
                  onChange={(e) => handleColorChange('accent_color', e.target.value)}
                  className="w-12 h-12 rounded-xl cursor-pointer border border-slate-200 p-1"
                />
                <input
                  type="text"
                  value={form.accent_color}
                  onChange={(e) => handleColorChange('accent_color', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold uppercase focus:ring-2 focus:ring-[#1F5BA6] outline-none"
                />
              </div>
            </div>

            {/* 4. Highlight */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Warna Aksen / Tombol
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={form.highlight_color}
                  onChange={(e) => handleColorChange('highlight_color', e.target.value)}
                  className="w-12 h-12 rounded-xl cursor-pointer border border-slate-200 p-1"
                />
                <input
                  type="text"
                  value={form.highlight_color}
                  onChange={(e) => handleColorChange('highlight_color', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold uppercase focus:ring-2 focus:ring-[#1F5BA6] outline-none"
                />
              </div>
            </div>
          </div>

          {/* Ikon & Badge Hari Besar Manual */}
          <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Ikon Tematik Khusus
              </label>
              <select
                value={form.badge_icon}
                onChange={(e) => {
                  const val = e.target.value;
                  const defaultLabelMap = {
                    ketupat: 'Ramadhan & Idul Fitri',
                    kemerdekaan: 'Dirgahayu RI',
                    natal: 'Natal & Tahun Baru',
                    imlek: 'Gong Xi Fa Cai',
                    megalit: 'Bumi Seribu Megalit',
                    none: ''
                  };
                  setForm({
                    ...form,
                    badge_icon: val,
                    seasonal_badge: val !== 'none' ? (form.seasonal_badge || defaultLabelMap[val]) : ''
                  });
                  updateThemeState({
                    ...form,
                    badge_icon: val,
                    seasonal_badge: val !== 'none' ? (form.seasonal_badge || defaultLabelMap[val]) : ''
                  });
                }}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50 focus:ring-2 focus:ring-[#1F5BA6] outline-none"
              >
                <option value="none">Tanpa Ikon Khusus (Standar)</option>
                <option value="ketupat">🕌 Belah Ketupat (Ramadhan & Idul Fitri)</option>
                <option value="kemerdekaan">🇮🇩 Bendera Merah Putih (HUT Kemerdekaan RI)</option>
                <option value="natal">🎄 Pohon Cemara (Hari Raya Natal & Tahun Baru)</option>
                <option value="imlek">🏮 Lampion Hoki (Tahun Baru Imlek)</option>
                <option value="megalit">🗿 Patung Megalit (Khas Sulawesi Tengah)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Label Ucapan Hari Besar
              </label>
              <input
                type="text"
                placeholder="Contoh: Marhaban Ya Ramadhan"
                value={form.seasonal_badge}
                disabled={form.badge_icon === 'none'}
                onChange={(e) => {
                  setForm({ ...form, seasonal_badge: e.target.value });
                  updateThemeState({ ...form, seasonal_badge: e.target.value });
                }}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50 disabled:opacity-40 focus:ring-2 focus:ring-[#1F5BA6] outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminTema;
