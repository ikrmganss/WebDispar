import React, { useState, useEffect } from 'react';
import { Mail, Clock, ShieldCheck } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { SeasonalIcon } from './SeasonalIcon';

export const Topbar = () => {
  const { theme } = useTheme();
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
      const day = days[now.getDay()];
      const date = now.getDate();
      const month = months[now.getMonth()];
      const year = now.getFullYear();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      setTime(`${day}, ${date} ${month} ${year} • ${hh}.${mm} WITA`);
    };
    update();
    const t = setInterval(update, 60000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="w-full text-white text-xs py-1.5 px-4 lg:px-8 flex justify-center items-center z-30 border-b border-white/10 transition-colors duration-300"
      style={{ background: 'var(--theme-gradient, linear-gradient(to right, #1F5BA6, #5C2180))' }}
    >
      <div className="max-w-7xl w-full flex items-center justify-between gap-2">
        {/* Left: Status Badge & Slogan */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {theme.badge_icon && theme.badge_icon !== 'none' ? (
            <div
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/20 border border-white/30 text-[10px] font-bold text-white shadow-sm backdrop-blur-sm shrink-0 max-w-[150px] sm:max-w-[240px]"
              title={theme.seasonal_badge || 'Edisi Khusus Hari Besar'}
            >
              <SeasonalIcon type={theme.badge_icon} className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate hidden sm:inline">{theme.seasonal_badge || 'Edisi Khusus'}</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-bold text-emerald-400 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Portal Resmi
            </div>
          )}
          <span className="hidden md:inline text-xs text-slate-300 font-normal truncate">
            Pemerintah Provinsi Sulawesi Tengah • <span className="text-amber-400 font-semibold">Bumi Seribu Megalit</span>
          </span>
        </div>

        {/* Right: Clock WITA & Email */}
        <div className="flex items-center gap-4 text-[11px]">
          {time && (
            <div className="hidden md:inline-flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{time}</span>
            </div>
          )}

          <div className="hidden md:block w-px h-3 bg-white/15" />

          <div className="inline-flex items-center gap-1.5 text-slate-300">
            <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <a
              href="mailto:dispar@sultengprov.go.id"
              className="hover:text-amber-300 transition-colors"
            >
              dispar@sultengprov.go.id
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
