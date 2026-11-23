import { useEffect, useState } from 'react';
import api from '../services/api';
import { Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { UI_STRINGS } from '../utils/translations';

const IKMGaugeChart = ({ nilai = 89.444, strings }) => {
  // Hitung persentase 0..100
  const pct = Math.min(Math.max(nilai / 100, 0), 1);
  const angle = -180 + pct * 180;
  const rad = (angle * Math.PI) / 180;
  const cx = 100, cy = 95, r = 68;
  const nx = cx + r * 0.72 * Math.cos(rad);
  const ny = cy + r * 0.72 * Math.sin(rad);

  return (
    <div className="relative flex flex-col items-center w-full">
      <svg viewBox="0 0 200 115" className="w-48 h-auto overflow-visible">
        {/* Background Arc */}
        <path
          d="M 25 95 A 75 75 0 0 1 175 95"
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {/* Active Arc (Green Emerald) */}
        <path
          d="M 25 95 A 75 75 0 0 1 162 55"
          fill="none"
          stroke="#10B981"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {/* Needle Needle Line */}
        <line
          x1={cx}
          y1={cy}
          x2={nx}
          y2={ny}
          stroke="#0F172A"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r="6" fill="#0F172A" />
        <circle cx={cx} cy={cy} r="2.5" fill="#FFFFFF" />
      </svg>

      {/* Nilai dan Predikat */}
      <div className="flex flex-col items-center -mt-3 gap-1.5">
        <span className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
          {nilai}
        </span>
        <span className="px-3 py-0.5 rounded-full bg-[#D1FAE5] text-[#047857] text-[10px] font-extrabold tracking-wider uppercase">
          {strings?.excellent || 'SANGAT BAIK'}
        </span>
      </div>
    </div>
  );
};

const IKMChart = () => {
  const { language } = useLanguage();
  const strings = UI_STRINGS[language] || UI_STRINGS.ID;
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/statistik/ikm').then((res) => setData(res.data)).catch(() => {});
  }, []);

  const nilai = data?.nilai ?? 89.444;

  return (
    <article className="w-full bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5 flex flex-col justify-between items-center text-center h-full">
      {/* Header */}
      <div className="w-full flex flex-col items-center gap-1">
        <span className="text-[10px] font-bold text-[#059669] tracking-wider uppercase">
          {strings?.serviceEval || 'EVALUASI PELAYANAN'}
        </span>
        <h3 className="font-extrabold text-[#1E293B] text-base leading-tight">
          {strings?.ikmTitle || 'Indeks Kepuasan Masyarakat (IKM)'}
        </h3>
        <p className="text-slate-400 text-[11px] leading-tight max-w-[240px]">
          {strings?.ikmDesc || 'Akumulasi survei mutu layanan publik Dinas Pariwisata'}
        </p>
      </div>

      {/* Gauge Visualization */}
      <div className="my-2 w-full flex justify-center">
        <IKMGaugeChart nilai={nilai} strings={strings} />
      </div>

      {/* CTA Button Badge */}
      <div className="w-full pt-2">
        <div className="w-full py-2 px-3 rounded-lg bg-[#F1F5F9] flex items-center justify-center gap-2 text-slate-700 text-xs font-bold">
          <span>{strings?.veryGood || 'Sangat Baik'}</span>
          <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white">
            <Check className="w-2.5 h-2.5 stroke-[3]" />
          </div>
        </div>
      </div>
    </article>
  );
};

export default IKMChart;
