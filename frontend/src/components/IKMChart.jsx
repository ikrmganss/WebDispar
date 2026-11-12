import { useEffect, useState } from 'react';
import api from '../services/api';

const IKMGaugeChart = ({ nilai = 89.444 }) => {
  // Hitung sudut jarum berdasarkan nilai (0-100 → -180° to 0°)
  const pct = Math.min(Math.max(nilai / 100, 0), 1);
  const angle = -180 + pct * 180;
  const rad = (angle * Math.PI) / 180;
  const cx = 100, cy = 100, r = 72;
  const nx = cx + r * 0.75 * Math.cos(rad);
  const ny = cy + r * 0.75 * Math.sin(rad);

  return (
    <div className="relative flex flex-col items-center">
      <svg viewBox="0 0 200 110" className="w-56 h-auto">
        {/* Track */}
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#f1f5f9" strokeWidth="18" strokeLinecap="round" />
        {/* Zone merah */}
        <path d="M 20 100 A 80 80 0 0 1 60 38" fill="none" stroke="#fecaca" strokeWidth="18" strokeLinecap="round" />
        {/* Zone kuning */}
        <path d="M 60 38 A 80 80 0 0 1 140 38" fill="none" stroke="#fef08a" strokeWidth="18" strokeLinecap="round" />
        {/* Zone hijau */}
        <path d="M 140 38 A 80 80 0 0 1 180 100" fill="none" stroke="#bbf7d0" strokeWidth="18" strokeLinecap="round" />
        {/* Progress emerald */}
        <path d="M 20 100 A 80 80 0 0 1 165 58" fill="none" stroke="#10b981" strokeWidth="18" strokeLinecap="round" opacity="0.9" />
        {/* Jarum */}
        <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r="6" fill="#0f172a" />
        <circle cx={cx} cy={cy} r="3" fill="white" />
      </svg>

      {/* Nilai di tengah bawah gauge */}
      <div className="flex flex-col items-center -mt-2">
        <span className="text-5xl font-black text-slate-900 tracking-tight leading-none">{nilai}</span>
        <span className="mt-2 px-4 py-1 bg-emerald-500 rounded-full font-black text-[11px] text-white tracking-widest uppercase shadow-sm">
          SANGAT BAIK
        </span>
      </div>
    </div>
  );
};

const IKMChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/statistik/ikm').then((res) => setData(res.data)).catch(() => {});
  }, []);

  const nilai = data?.nilai ?? 89.444;
  const jumlah = data?.jumlah ?? 13;

  return (
    <article className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-slate-100">
        <span className="inline-flex items-center gap-1.5 text-emerald-600 font-extrabold text-[10px] tracking-widest uppercase mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          EVALUASI PELAYANAN
        </span>
        <h3 className="font-black text-slate-900 text-base leading-tight">
          Indeks Kepuasan Masyarakat
          <span className="text-amber-500"> (IKM)</span>
        </h3>
        <p className="text-slate-400 text-xs mt-0.5">Akumulasi survei mutu layanan publik</p>
      </div>

      {/* Gauge */}
      <div className="flex-1 flex items-center justify-center px-6 py-6">
        <IKMGaugeChart nilai={nilai} />
      </div>

      {/* Footer */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="text-xs font-black text-slate-900">Sangat Baik</p>
              <p className="text-[10px] text-slate-400">Predikat Layanan</p>
            </div>
          </div>
          <span className="text-2xl font-black text-emerald-600">{jumlah}</span>
        </div>
      </div>
    </article>
  );
};

export default IKMChart;
