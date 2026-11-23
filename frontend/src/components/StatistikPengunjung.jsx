import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  RefreshCw,
  BarChart3,
  ChevronUp
} from 'lucide-react';
import api from '../services/api';

const DEFAULT_STATS = {
  today: 0,
  yesterday: 0,
  thisWeek: 0,
  lastWeek: 0,
  thisMonth: 0,
  lastMonth: 0,
  allDays: 0,
  ip: '127.0.0.1'
};

const StatistikPengunjung = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [isLoading, setIsLoading] = useState(false);
  const popupRef = useRef(null);

  // Ambil statistik real-time dari backend
  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/statistik/pengunjung');
      if (res.data) {
        setStats({
          today: Number(res.data.today || 0),
          yesterday: Number(res.data.yesterday || 0),
          thisWeek: Number(res.data.thisWeek || 0),
          lastWeek: Number(res.data.lastWeek || 0),
          thisMonth: Number(res.data.thisMonth || 0),
          lastMonth: Number(res.data.lastMonth || 0),
          allDays: Number(res.data.allDays || 0),
          ip: res.data.ip || '127.0.0.1'
        });
      }
    } catch {
      // Jika offline, tetap tampilkan 0
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Tutup popup jika mengklik di luar area card
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        const toggleBtn = document.getElementById('floating-stats-toggle-btn');
        if (toggleBtn && toggleBtn.contains(e.target)) return;
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop overlay untuk perangkat layar kecil */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-slate-950/30 backdrop-blur-xs z-40 sm:hidden"
          />
        )}
      </AnimatePresence>

      {/* Floating Container di Pojok Kiri Bawah */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start select-none">
        {/* Popup Card Statistik (Sesuai Desain Acuan) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={popupRef}
              initial={{ opacity: 0, scale: 0.94, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 14 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="mb-3 w-[370px] sm:w-[440px] max-w-[calc(100vw-2.5rem)] bg-[#EEF9F3] text-[#0A3828] rounded-3xl p-6 sm:p-7 shadow-2xl shadow-emerald-950/25 border border-[#CDEEDF] overflow-hidden"
            >
              {/* Header: Title, Subtitle, & Actions */}
              <div className="flex items-start justify-between gap-3 mb-5">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0A3828] tracking-tight leading-tight">
                    Small space. Clear numbers.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3E6858] mt-1 font-medium">
                    A compact view of your website visitors
                  </p>
                </div>

                <div className="flex items-center gap-1 -mt-1 -mr-1">
                  {/* Refresh Button */}
                  <button
                    onClick={fetchStats}
                    disabled={isLoading}
                    title="Perbarui data"
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#3E6858] hover:text-[#0A3828] hover:bg-[#DDF2E7] transition-all cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                  </button>

                  {/* Close Button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    title="Tutup"
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#3E6858] hover:text-[#0A3828] hover:bg-[#DDF2E7] transition-all cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Baris 1: Total Visitors & Today's Visitors */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 pt-1">
                <div>
                  <span className="block text-[11px] sm:text-xs font-bold text-[#144734] uppercase tracking-wider">
                    TOTAL VISITORS
                  </span>
                  <span className="block text-2xl sm:text-3xl font-extrabold text-[#0A3828] mt-1 tracking-tight font-sans">
                    {stats.allDays.toLocaleString('en-US')}
                  </span>
                </div>

                <div>
                  <span className="block text-[11px] sm:text-xs font-bold text-[#144734] uppercase tracking-wider">
                    TODAY'S VISITORS
                  </span>
                  <span className="block text-2xl sm:text-3xl font-extrabold text-[#0A3828] mt-1 tracking-tight font-sans">
                    {stats.today.toLocaleString('en-US')}
                  </span>
                </div>
              </div>

              {/* Horizontal Divider Line */}
              <div className="border-t border-[#C3E8D7] my-4 sm:my-5" />

              {/* Baris 2: This Week's Visitors & This Month's Visitors */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                <div>
                  <span className="block text-[11px] sm:text-xs font-bold text-[#144734] uppercase tracking-wider">
                    THIS WEEK'S VISITORS
                  </span>
                  <span className="block text-2xl sm:text-3xl font-extrabold text-[#0A3828] mt-1 tracking-tight font-sans">
                    {stats.thisWeek.toLocaleString('en-US')}
                  </span>
                </div>

                <div>
                  <span className="block text-[11px] sm:text-xs font-bold text-[#144734] uppercase tracking-wider">
                    THIS MONTH'S VISITORS
                  </span>
                  <span className="block text-2xl sm:text-3xl font-extrabold text-[#0A3828] mt-1 tracking-tight font-sans">
                    {stats.thisMonth.toLocaleString('en-US')}
                  </span>
                </div>
              </div>

              {/* Footer info: IP & Live status */}
              <div className="mt-5 pt-3 border-t border-[#CDEEDF] flex items-center justify-between text-[11px] text-[#4A7463]">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Your IP: <span className="font-mono text-[#0A3828] font-semibold">{stats.ip}</span>
                </span>
                <span className="text-[10px] text-[#55806F] font-medium">
                  Live Counter
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Button Trigger (Pojok Kiri Bawah) */}
        <motion.button
          id="floating-stats-toggle-btn"
          onClick={() => setIsOpen((prev) => !prev)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Statistik Pengunjung"
          className="group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-[#0A3828] text-white shadow-xl shadow-emerald-950/25 border border-[#CDEEDF]/40 hover:bg-[#114734] hover:border-[#CDEEDF] transition-all cursor-pointer"
        >
          {/* Icon dengan Indikator Aktif */}
          <div className="relative">
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
              <BarChart3 className="w-3.5 h-3.5 text-emerald-300 group-hover:rotate-6 transition-transform" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0A3828] animate-pulse" />
          </div>

          {/* Label Text */}
          <div className="flex flex-col text-left pr-1">
            <span className="text-[11px] font-bold text-white tracking-wide leading-tight group-hover:text-emerald-200 transition-colors">
              Statistik Web
            </span>
            <span className="text-[9px] text-emerald-200/80 font-mono">
              {stats.allDays.toLocaleString('en-US')} Visitors
            </span>
          </div>

          {/* Toggle Indicator Arrow */}
          <div className="text-white/60 group-hover:text-white transition-colors">
            <ChevronUp
              className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-300' : ''}`}
            />
          </div>
        </motion.button>
      </div>
    </>
  );
};

export default StatistikPengunjung;
