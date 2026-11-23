import { useState, useEffect, useRef } from 'react';
import { ImagePlus, Trash2, ToggleLeft, ToggleRight, Upload, AlertCircle } from 'lucide-react';
import { AdminLayout } from './Dashboard';
import api from '../../services/api';
import { getImageSrc } from '../../utils/imageHelper';

const BASE_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

const AdminSlider = () => {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({ judul: '', urutan: 1 });
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const fileRef = useRef();

  const fetchSliders = () => {
    setLoading(true);
    api.get('/slider/all')
      .then((res) => setSliders(res.data || []))
      .catch(() => setError('Gagal memuat data slider'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchSliders(); }, []);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) { setError('Pilih gambar terlebih dahulu'); return; }
    setUploading(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('gambar', file);
      fd.append('judul', form.judul);
      fd.append('urutan', form.urutan);
      await api.post('/slider', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setSuccess('Slider berhasil ditambahkan');
      setForm({ judul: '', urutan: 1 });
      setFile(null);
      setPreview(null);
      if (fileRef.current) fileRef.current.value = '';
      fetchSliders();
      setTimeout(() => setSuccess(''), 3000);
    } catch {
      setError('Gagal menambahkan slider');
    } finally {
      setUploading(false);
    }
  };

  const handleToggle = async (id, aktif) => {
    try {
      await api.patch(`/slider/${id}/toggle`, { aktif: aktif === 1 ? 0 : 1 });
      fetchSliders();
    } catch {
      setError('Gagal mengubah status slider');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin hapus slider ini?')) return;
    try {
      await api.delete(`/slider/${id}`);
      setSuccess('Slider berhasil dihapus');
      fetchSliders();
      setTimeout(() => setSuccess(''), 3000);
    } catch {
      setError('Gagal menghapus slider');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Kelola Slider</h1>
          <p className="text-slate-400 text-sm">Tambah, hapus, dan atur tampilan slider hero</p>
        </div>
        <span className="px-3 py-1 bg-amber-100 text-amber-700 font-bold text-xs rounded-full border border-amber-200">
          {sliders.filter(s => s.aktif === 1).length} Aktif
        </span>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" /> {error}
          <button onClick={() => setError('')} className="ml-auto font-bold">✕</button>
        </div>
      )}
      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm font-semibold">
          ✓ {success}
        </div>
      )}

      {/* Form Tambah */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
          <ImagePlus className="w-5 h-5 text-amber-500" /> Tambah Slider Baru
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700">Judul / Keterangan</label>
              <input
                type="text"
                placeholder="Contoh: Pantai Togean Sulteng"
                value={form.judul}
                onChange={(e) => setForm({ ...form, judul: e.target.value })}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-amber-400 bg-slate-50"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700">Urutan Tampil</label>
              <input
                type="number"
                min="1"
                value={form.urutan}
                onChange={(e) => setForm({ ...form, urutan: e.target.value })}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-amber-400 bg-slate-50"
              />
            </div>
          </div>

          {/* Upload Area */}
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-slate-300 hover:border-amber-400 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors bg-slate-50 hover:bg-amber-50"
          >
            {preview ? (
              <img src={preview} alt="Preview" className="max-h-48 rounded-xl object-cover shadow" />
            ) : (
              <>
                <Upload className="w-8 h-8 text-slate-400" />
                <p className="text-sm text-slate-500 font-medium">Klik untuk pilih gambar</p>
                <p className="text-xs text-slate-400">JPG, PNG — Maks 5MB</p>
              </>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/jpg"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="self-end flex items-center gap-2 px-6 py-2.5 bg-[#0b192c] hover:bg-slate-800 text-white rounded-xl font-bold text-sm transition-all disabled:opacity-60"
          >
            {uploading ? 'Mengupload...' : <><ImagePlus className="w-4 h-4" /> Tambah Slider</>}
          </button>
        </form>
      </div>

      {/* Daftar Slider */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-900 text-base">Daftar Slider ({sliders.length})</h2>
        </div>

        {loading ? (
          <div className="p-8 flex flex-col gap-3">
            {[...Array(3)].map((_, i) => <div key={i} className="h-20 bg-slate-100 rounded-xl animate-pulse" />)}
          </div>
        ) : sliders.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm">Belum ada slider. Tambahkan slider di atas.</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {sliders.map((slider) => {
              const imgSrc = getImageSrc(slider.gambar, '/slider/Slider.jpg');
              return (
                <div key={slider.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
                  {/* Thumbnail */}
                  <div className="w-24 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={imgSrc}
                      alt={slider.judul}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.src = '/slider/Slider.jpg'; }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 text-sm truncate">{slider.judul || '(Tanpa judul)'}</p>
                    <p className="text-slate-400 text-xs mt-0.5">Urutan: {slider.urutan}</p>
                  </div>

                  {/* Status Badge */}
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 ${
                    slider.aktif === 1 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {slider.aktif === 1 ? 'Aktif' : 'Nonaktif'}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleToggle(slider.id, slider.aktif)}
                      title={slider.aktif === 1 ? 'Nonaktifkan' : 'Aktifkan'}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        slider.aktif === 1
                          ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-500'
                      }`}
                    >
                      {slider.aktif === 1
                        ? <ToggleRight className="w-5 h-5" />
                        : <ToggleLeft className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={() => handleDelete(slider.id)}
                      title="Hapus"
                      className="w-9 h-9 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
    </AdminLayout>
  );
};

export default AdminSlider;
