import { useEffect, useState } from 'react';
import api from '../services/api';
import { Users, Calendar, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const StatistikPengunjung = () => {
  const { language } = useLanguage();
  const isEn = language === 'EN';

  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/statistik/pengunjung').then((res) => setStats(res.data)).catch(() => {});
  }, []);

  const items = [
    { label: isEn ? 'Today' : 'Hari Ini', value: stats?.today || 0, icon: Users, color: 'text-blue-500' },
    { label: isEn ? 'Yesterday' : 'Kemarin', value: stats?.yesterday || 0, icon: Calendar, color: 'text-green-500' },
    { label: isEn ? 'This Week' : 'Minggu Ini', value: stats?.thisWeek || 0, icon: TrendingUp, color: 'text-purple-500' },
    { label: isEn ? 'This Month' : 'Bulan Ini', value: stats?.thisMonth || 0, icon: TrendingUp, color: 'text-orange-500' },
    { label: isEn ? 'Total Visits' : 'Total Kunjungan', value: stats?.allDays || 0, icon: Users, color: 'text-red-500' },
  ];

  return (
    <div className="card p-6">
      <h3 className="font-bold text-navy-900 mb-4 flex items-center gap-2">
        <Users size={20} className="text-primary-600" />
        {isEn ? 'Visitor Statistics' : 'Statistik Pengunjung'}
      </h3>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
            <span className="flex items-center gap-2 text-sm text-gray-600">
              <item.icon size={16} className={item.color} />
              {item.label}
            </span>
            <span className="font-bold text-navy-900">{item.value.toLocaleString(isEn ? 'en-US' : 'id-ID')}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-400">IP: {stats?.ip || '-'}</p>
        <p className="text-xs text-gray-400">{new Date().toLocaleString(isEn ? 'en-US' : 'id-ID')}</p>
      </div>
    </div>
  );
};

export default StatistikPengunjung;
