import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const Topbar = ({ language, setLanguage }) => {
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
      setTime(`${day}, ${date} ${month} ${year}, ${hh}.${mm} WITA`);
    };
    update();
    const t = setInterval(update, 60000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="w-full bg-[#0b192c] border-b border-slate-800 text-slate-300 text-xs py-2 px-4 md:px-8 flex justify-center items-center z-50">
      <div className="flex max-w-7xl w-full items-center justify-between gap-2">
        <div className="inline-flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#10b98133] rounded border border-[#10b9814c]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-emerald-400 text-[10px] tracking-wide">Portal Resmi</span>
          </div>
          <span className="text-slate-400 text-xs truncate hidden sm:inline">
            Pemerintah Provinsi Sulawesi Tengah • Bumi Seribu Megalit
          </span>
        </div>

        <div className="inline-flex items-center gap-4">
          <div className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-300 text-xs font-normal">{time}</span>
          </div>
          <div className="w-px h-3 bg-slate-700" />
          <div className="inline-flex items-center gap-1">
            {['ID', 'EN'].map((item, i) => (
              <span key={item} className="inline-flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setLanguage(item)}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                    language === item ? 'bg-white/10 text-amber-400' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {item}
                </button>
                {i === 0 && <span className="text-slate-600 text-[10px]">/</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
