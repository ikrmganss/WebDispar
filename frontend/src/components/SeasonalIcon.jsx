import React from 'react';

export const SeasonalIcon = ({ type, className = "w-4 h-4", inline = false }) => {
  switch (type) {
    case 'ramadhan':
    case 'ketupat':
      // Ketupat Ikon Anyaman Tradisional
      return (
        <span className={`inline-flex items-center justify-center shrink-0 ${className}`} title="Selamat Idul Fitri / Ramadhan">
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full drop-shadow-sm">
            {/* Anyaman Dasar Ketupat (Diamond Belah Ketupat) */}
            <path
              d="M24 4 L44 24 L24 44 L4 24 Z"
              fill="#22c55e"
              stroke="#15803d"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Tekstur Garis-Garis Anyaman Kuning Keemasan */}
            <path d="M14 14 L34 34" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
            <path d="M34 14 L14 34" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
            <path d="M24 4 L24 44" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="3 2" />
            <path d="M4 24 L44 24" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="3 2" />
            <path d="M19 9 L39 29" stroke="#facc15" strokeWidth="1.5" />
            <path d="M9 19 L29 39" stroke="#facc15" strokeWidth="1.5" />
            <path d="M29 9 L9 29" stroke="#fef08a" strokeWidth="1.5" />
            <path d="M39 19 L19 39" stroke="#fef08a" strokeWidth="1.5" />
            {/* Pita/Pangkal Daun Kelapa */}
            <path d="M24 44 Q28 48 29 52" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
            <path d="M24 44 Q20 48 19 52" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      );

    case 'kemerdekaan':
    case 'bendera':
      // Bendera Merah Putih Berkibar
      return (
        <span className={`inline-flex items-center justify-center shrink-0 ${className}`} title="HUT RI - Dirgahayu Republik Indonesia">
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full drop-shadow-sm">
            {/* Tiang Bendera */}
            <rect x="6" y="4" width="3" height="40" rx="1.5" fill="#94a3b8" />
            <circle cx="7.5" cy="4" r="2.5" fill="#f59e0b" />
            {/* Bagian Merah */}
            <path
              d="M9 7 C18 4, 27 10, 42 7 L42 18 C27 21, 18 15, 9 18 Z"
              fill="#ef4444"
              stroke="#b91c1c"
              strokeWidth="0.8"
            />
            {/* Bagian Putih */}
            <path
              d="M9 18 C18 15, 27 21, 42 18 L42 29 C27 32, 18 26, 9 29 Z"
              fill="#ffffff"
              stroke="#e2e8f0"
              strokeWidth="0.8"
            />
          </svg>
        </span>
      );

    case 'natal':
    case 'cemara':
      // Pohon Cemara Natal & Bintang
      return (
        <span className={`inline-flex items-center justify-center shrink-0 ${className}`} title="Selamat Hari Natal & Tahun Baru">
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full drop-shadow-sm">
            <polygon points="24,4 27,12 35,12 29,17 31,25 24,20 17,25 19,17 13,12 21,12" fill="#fbbf24" />
            <polygon points="24,14 34,24 28,24 37,33 29,33 40,42 8,42 19,33 11,33 20,24 14,24" fill="#15803d" stroke="#166534" strokeWidth="1" />
            <rect x="21" y="42" width="6" height="5" fill="#78350f" />
            <circle cx="20" cy="28" r="2" fill="#ef4444" />
            <circle cx="28" cy="36" r="2" fill="#38bdf8" />
            <circle cx="26" cy="22" r="1.5" fill="#facc15" />
          </svg>
        </span>
      );

    case 'imlek':
    case 'lampion':
      // Lampion Merah Keemasan
      return (
        <span className={`inline-flex items-center justify-center shrink-0 ${className}`} title="Selamat Tahun Baru Imlek">
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full drop-shadow-sm">
            <line x1="24" y1="2" x2="24" y2="10" stroke="#f59e0b" strokeWidth="2" />
            <rect x="18" y="10" width="12" height="4" rx="1" fill="#f59e0b" />
            <ellipse cx="24" cy="25" rx="15" ry="12" fill="#dc2626" stroke="#991b1b" strokeWidth="1" />
            <ellipse cx="24" cy="25" rx="8" ry="12" fill="none" stroke="#facc15" strokeWidth="1.2" />
            <line x1="24" y1="13" x2="24" y2="37" stroke="#facc15" strokeWidth="1.5" />
            <rect x="18" y="36" width="12" height="4" rx="1" fill="#f59e0b" />
            <line x1="24" y1="40" x2="24" y2="47" stroke="#dc2626" strokeWidth="2.5" />
          </svg>
        </span>
      );

    case 'megalit':
      // Patung Megalit Khas Sulteng
      return (
        <span className={`inline-flex items-center justify-center shrink-0 ${className}`} title="Bumi Seribu Megalit Sulteng">
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full drop-shadow-sm">
            <ellipse cx="24" cy="18" rx="11" ry="13" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
            <circle cx="20" cy="16" r="2.5" fill="#334155" />
            <circle cx="28" cy="16" r="2.5" fill="#334155" />
            <rect x="23" y="18" width="2" height="6" fill="#475569" />
            <path d="M19 26 Q24 29 29 26" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
            <path d="M15 30 L13 46 L35 46 L33 30 Z" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
          </svg>
        </span>
      );

    default:
      return null;
  }
};
