import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import BeritaCard from '../components/BeritaCard';
import api from '../services/api';

const Berita = () => {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    api.get(`/berita?page=${page}&limit=9`)
      .then((res) => {
        setBerita(res.data.data);
        setTotalPages(res.data.totalPages);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <>
      <Helmet>
        <title>Berita - Dinas Pariwisata Sulteng</title>
      </Helmet>

      <div className="bg-gradient-to-r from-[#0b192c] to-[#1e3a5f] py-16 lg:py-20">
        <div className="container-custom">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-white mb-2">Berita</h1>
          <p className="text-white/70">Informasi terkini seputar pariwisata Sulawesi Tengah</p>
        </div>
      </div>

      <section className="py-12 lg:py-16">
        <div className="container-custom">
          <div className="max-w-md mx-auto mb-10">
            <div className="relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari berita..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
              />
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => <div key={i} className="skeleton h-80 rounded-xl" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {berita.filter(b => b.judul.toLowerCase().includes(search.toLowerCase())).map((b, idx) => (
                <BeritaCard key={b.id} berita={b} index={idx} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-amber-50 disabled:opacity-50 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-10 h-10 rounded-lg font-semibold transition-colors ${page === i + 1 ? 'bg-amber-500 text-slate-950' : 'border border-gray-200 hover:bg-amber-50'}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-amber-50 disabled:opacity-50 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Berita;