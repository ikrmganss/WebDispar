import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ChevronDown, ArrowRight, ExternalLink, FileText, MapPin, Compass, ShieldAlert, Sparkles } from 'lucide-react';
import api from '../services/api';

const ORDER_OPTIONS_MAP = {
  ID: [
    { value: 'newest', label: 'Terbaru' },
    { value: 'oldest', label: 'Terlama' },
    { value: 'popular', label: 'Popular' },
    { value: 'alpha', label: 'Alfabetis' },
    { value: 'category', label: 'Kategori' },
  ],
  EN: [
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'popular', label: 'Popular' },
    { value: 'alpha', label: 'Alphabetical' },
    { value: 'category', label: 'Category' },
  ],
};

const AREA_OPTIONS_MAP = {
  ID: [
    { id: 'kategori', label: 'Kategori' },
    { id: 'kontak', label: 'Kontak' },
    { id: 'artikel', label: 'Artikel' },
    { id: 'pengumpan', label: 'Pengumpan Berita' },
    { id: 'tagar', label: 'Tagar' },
  ],
  EN: [
    { id: 'kategori', label: 'Category' },
    { id: 'kontak', label: 'Contact' },
    { id: 'artikel', label: 'Articles' },
    { id: 'pengumpan', label: 'News Feed' },
    { id: 'tagar', label: 'Tags' },
  ],
};

const SearchModal = ({ isOpen, onClose, language = 'ID' }) => {
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const inputRef = useRef(null);

  const langKey = language?.toUpperCase() === 'EN' ? 'EN' : 'ID';
  const orderOptions = ORDER_OPTIONS_MAP[langKey] || ORDER_OPTIONS_MAP.ID;
  const areaOptions = AREA_OPTIONS_MAP[langKey] || AREA_OPTIONS_MAP.ID;

  // Form states matching images
  const [query, setQuery] = useState('');
  const [matchType, setMatchType] = useState('all'); // 'all' (Semua kata) | 'any' (Salah satu kata) | 'exact' (Frase yang tepat)
  const [order, setOrder] = useState('newest'); // 'newest' | 'oldest' | 'popular' | 'alpha' | 'category'
  const [isOrderDropdownOpen, setIsOrderDropdownOpen] = useState(false);
  const [selectedAreas, setSelectedAreas] = useState({
    kategori: true,
    kontak: true,
    artikel: true,
    pengumpan: true,
    tagar: true,
  });

  // Results state
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setIsOrderDropdownOpen(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Handle secret admin shortcut
  const trimmedLower = query.trim().toLowerCase();
  const isAdminTrigger = ['dispar26', 'dispar 26'].includes(trimmedLower);

  const handleAreaToggle = (areaId) => {
    setSelectedAreas((prev) => ({
      ...prev,
      [areaId]: !prev[areaId],
    }));
  };

  const executeSearch = async (e) => {
    e?.preventDefault();
    const q = query.trim();
    if (!q) return;

    if (isAdminTrigger) {
      onClose();
      navigate('/portal-internal-dispar/login');
      return;
    }

    setIsLoading(true);
    setHasSearched(true);
    setIsOrderDropdownOpen(false);

    try {
      const activeAreas = Object.keys(selectedAreas).filter((k) => selectedAreas[k]);
      const res = await api.get('/search', {
        params: {
          q,
          match: matchType,
          order,
          areas: activeAreas.join(','),
        },
      });

      if (res.data) {
        setResults(res.data.results || []);
        setTotalResults(res.data.total || 0);
      }
    } catch (err) {
      console.error('Search failed:', err);
      setResults([]);
      setTotalResults(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResultClick = (url) => {
    onClose();
    if (url.startsWith('http')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      navigate(url);
    }
  };

  if (!isOpen) return null;

  const currentOrderLabel = orderOptions.find((o) => o.value === order)?.label || orderOptions[0].label;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200 text-slate-800"
      >
        {/* Header with Title and Close Button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/90">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#1F5BA6]/15 via-[#383087]/15 to-[#5C2180]/15 border border-[#1F5BA6]/25 flex items-center justify-center text-[#1F5BA6] shadow-xs">
              <Search className="w-4 h-4 text-[#1F5BA6]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-tight">
                {langKey === 'EN' ? 'Official Portal Search' : 'Pencarian Portal Resmi'}
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                {langKey === 'EN'
                  ? 'Department of Tourism Central Sulawesi Province'
                  : 'Dinas Pariwisata Provinsi Sulawesi Tengah'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="w-8 h-8 rounded-full bg-slate-200/60 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 flex flex-col gap-6">
          <form onSubmit={executeSearch} className="flex flex-col gap-5">
            {/* 1. Baris Input & Tombol CARI */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={langKey === 'EN' ? 'Type search keywords...' : 'Kata kunci pencarian...'}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-900 placeholder-slate-400 text-sm font-semibold pl-4 pr-10 py-3 rounded-xl border border-slate-300 focus:border-[#1F5BA6] outline-none focus:ring-4 focus:ring-[#1F5BA6]/15 transition-all shadow-inner"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('');
                      inputRef.current?.focus();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-[#1F5BA6] via-[#383087] to-[#5C2180] hover:opacity-95 active:scale-98 text-white font-bold text-xs sm:text-sm px-7 py-3 rounded-xl flex items-center justify-center gap-2 tracking-wider uppercase transition-all shadow-md shadow-purple-900/20 cursor-pointer shrink-0"
              >
                <Search className="w-4 h-4 text-amber-300" />
                <span>{langKey === 'EN' ? 'SEARCH' : 'CARI'}</span>
              </button>
            </div>

            {/* Admin Shortcut Banner If Triggered */}
            {isAdminTrigger && (
              <div
                onClick={executeSearch}
                className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-300 text-amber-900 cursor-pointer hover:bg-amber-100 transition-all shadow-sm group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-slate-950 font-black shadow-sm">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-tight">Kode Akses Admin Terdeteksi</p>
                    <p className="text-[11px] text-amber-800">Tekan Enter atau klik CARI untuk membuka Login CMS</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-amber-700 group-hover:translate-x-1 transition-transform" />
              </div>
            )}

            {/* 2. Bagian: Pencarian untuk */}
            <div className="flex flex-col gap-2.5">
              <span className="text-slate-700 font-bold text-sm tracking-tight">
                {langKey === 'EN' ? 'Search for:' : 'Pencarian untuk:'}
              </span>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm text-slate-700">
                <label className="inline-flex items-center gap-2 cursor-pointer select-none hover:text-[#1F5BA6] transition-colors">
                  <input
                    type="radio"
                    name="matchType"
                    value="all"
                    checked={matchType === 'all'}
                    onChange={() => setMatchType('all')}
                    className="w-4 h-4 text-[#1F5BA6] focus:ring-[#1F5BA6] cursor-pointer accent-[#1F5BA6]"
                  />
                  <span>{langKey === 'EN' ? 'All words' : 'Semua kata'}</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer select-none hover:text-[#1F5BA6] transition-colors">
                  <input
                    type="radio"
                    name="matchType"
                    value="any"
                    checked={matchType === 'any'}
                    onChange={() => setMatchType('any')}
                    className="w-4 h-4 text-[#1F5BA6] focus:ring-[#1F5BA6] cursor-pointer accent-[#1F5BA6]"
                  />
                  <span>{langKey === 'EN' ? 'Any word' : 'Salah satu kata'}</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer select-none hover:text-[#1F5BA6] transition-colors">
                  <input
                    type="radio"
                    name="matchType"
                    value="exact"
                    checked={matchType === 'exact'}
                    onChange={() => setMatchType('exact')}
                    className="w-4 h-4 text-[#1F5BA6] focus:ring-[#1F5BA6] cursor-pointer accent-[#1F5BA6]"
                  />
                  <span>{langKey === 'EN' ? 'Exact phrase' : 'Frase yang tepat'}</span>
                </label>
              </div>
            </div>

            {/* 3. Bagian: Urutan */}
            <div className="flex flex-col gap-2">
              <span className="text-slate-700 font-bold text-sm tracking-tight">
                {langKey === 'EN' ? 'Ordering:' : 'Urutan:'}
              </span>
              <div className="relative inline-block w-48 sm:w-56">
                <button
                  type="button"
                  onClick={() => setIsOrderDropdownOpen((prev) => !prev)}
                  className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center justify-between border border-slate-300 hover:border-slate-400 transition-colors cursor-pointer shadow-xs"
                >
                  <span>{currentOrderLabel}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isOrderDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isOrderDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1.5 w-full bg-white border border-slate-200 rounded-xl shadow-xl z-20 overflow-hidden py-1 divide-y divide-slate-100 animate-in fade-in zoom-in-95 duration-150">
                    {orderOptions.map((opt) => {
                      const isSelected = order === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                            setOrder(opt.value);
                            setIsOrderDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-purple-50 text-[#5C2180] font-bold'
                              : 'text-slate-700 hover:bg-slate-50 hover:text-[#1F5BA6]'
                          }`}
                        >
                          <span>{opt.label}</span>
                          {isSelected && <span className="text-[#5C2180] text-xs font-bold">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* 4. Bagian: Cari hanya: */}
            <div className="flex flex-col gap-2.5">
              <span className="text-slate-700 font-bold text-sm tracking-tight">
                {langKey === 'EN' ? 'Search only:' : 'Cari hanya:'}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-sm text-slate-700">
                {areaOptions.map((area) => (
                  <label key={area.id} className="inline-flex items-center gap-2 cursor-pointer select-none hover:text-[#1F5BA6] transition-colors">
                    <input
                      type="checkbox"
                      checked={!!selectedAreas[area.id]}
                      onChange={() => handleAreaToggle(area.id)}
                      className="w-4 h-4 rounded text-[#1F5BA6] focus:ring-[#1F5BA6] cursor-pointer accent-[#1F5BA6]"
                    />
                    <span>{area.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </form>

          {/* 5. Hasil Pencarian */}
          {hasSearched && (
            <div className="border-t border-slate-200 pt-5 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                <span>
                  {isLoading
                    ? langKey === 'EN'
                      ? 'Searching...'
                      : 'Sedang mencari...'
                    : langKey === 'EN'
                    ? `Found ${totalResults} results for "${query}"`
                    : `Ditemukan ${totalResults} hasil untuk "${query}"`}
                </span>
                {totalResults > 0 && !isLoading && (
                  <span className="text-[11px] text-slate-400">
                    {langKey === 'EN' ? 'Click item to open page' : 'Klik item untuk membuka halaman'}
                  </span>
                )}
              </div>

              {isLoading ? (
                <div className="flex flex-col gap-2 py-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse bg-slate-100 rounded-xl p-4 flex flex-col gap-2">
                      <div className="h-4 bg-slate-200 rounded w-3/4" />
                      <div className="h-3 bg-slate-200 rounded w-full" />
                    </div>
                  ))}
                </div>
              ) : results.length === 0 ? (
                <div className="py-8 text-center text-slate-400 flex flex-col items-center gap-2">
                  <Search className="w-8 h-8 opacity-30" />
                  <p className="text-sm font-medium">
                    {langKey === 'EN'
                      ? 'No results matched the specified keyword.'
                      : 'Tidak ada hasil yang cocok dengan kata kunci tersebut.'}
                  </p>
                  <p className="text-xs text-slate-500">
                    {langKey === 'EN'
                      ? 'Try different keywords or select the "Any word" option.'
                      : 'Coba ganti kata kunci atau pilih opsi "Salah satu kata".'}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-2.5 max-h-80 overflow-y-auto pr-1">
                  {results.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleResultClick(item.url)}
                      className="group p-3.5 rounded-xl border border-slate-200 hover:border-[#1F5BA6]/50 hover:bg-slate-50/80 transition-all cursor-pointer flex flex-col gap-1.5 shadow-xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${item.badgeColor || 'bg-slate-100 text-slate-700 border-slate-300'}`}>
                          {item.category}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {item.date}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#1F5BA6] transition-colors flex items-center justify-between gap-2">
                        <span>{item.title}</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#1F5BA6] shrink-0" />
                      </h4>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {item.snippet}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>
            {langKey === 'EN' ? (
              <>Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-[10px] font-mono shadow-xs">ESC</kbd> to close</>
            ) : (
              <>Tekan <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-[10px] font-mono shadow-xs">ESC</kbd> untuk menutup</>
            )}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900 font-bold hover:underline cursor-pointer"
          >
            {langKey === 'EN' ? 'Close' : 'Tutup'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
