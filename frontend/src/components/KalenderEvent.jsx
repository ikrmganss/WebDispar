import { useEffect, useState } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';
import { useLanguage } from '../context/LanguageContext';

const KalenderEvent = ({ limit = 6, showTitle = true }) => {
  const { language } = useLanguage();
  const isEn = language === 'EN';

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/info-pariwisata/kalender-event')
      .then((res) => setEvents((res.data || []).slice(0, limit)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [limit]);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString(isEn ? 'en-US' : 'id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="skeleton h-40 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div>
      {showTitle && (
        <div className="mb-6">
          <h2 className="section-title">{isEn ? 'Event Calendar' : 'Kalender Event'}</h2>
          <p className="section-subtitle">{isEn ? 'Central Sulawesi tourism agenda' : 'Agenda pariwisata Sulawesi Tengah'}</p>
        </div>
      )}
      {events.length === 0 ? (
        <div className="text-center py-12 text-gray-400 card">
          <Calendar size={48} className="mx-auto mb-4 opacity-30" />
          <p>{isEn ? 'No scheduled events yet' : 'Belum ada event terjadwal'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((ev, idx) => (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="card p-5 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {ev.gambar && (
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-gray-100">
                    <img
                      src={ev.gambar.startsWith('http') || ev.gambar.startsWith('/') ? ev.gambar : `/uploads/${ev.gambar}`}
                      alt={ev.judul}
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 mb-2">
                  <Calendar size={13} />
                  <span>{formatDate(ev.tanggal)}</span>
                </div>
                <h3 className="font-bold text-navy-900 text-base mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                  {ev.judul}
                </h3>
                {ev.deskripsi && (
                  <p className="text-xs text-gray-500 line-clamp-3 mb-4 leading-relaxed">
                    {ev.deskripsi}
                  </p>
                )}
              </div>
              {ev.lokasi && (
                <div className="pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs text-gray-500">
                  <MapPin size={13} className="text-primary-600 flex-shrink-0" />
                  <span className="truncate">{ev.lokasi}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default KalenderEvent;
