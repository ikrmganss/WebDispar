import { useEffect, useRef, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import api from '../../services/api';
import {
  AlertBox,
  ConfirmDeleteModal,
  EmptyState,
  Field,
  fileUrl,
  GlassCard,
  IconButton,
  KABUPATEN_LIST,
  LoadingSkeleton,
  Modal,
  PageHeader,
  SearchInput,
  SelectInput,
  SubmitButton,
  TextareaInput,
  TextInput,
  UploadBox,
} from './AdminShared';

const emptyForm = { kabupaten: 'Kota Palu', judul: '', deskripsi: '' };

const DTW = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const fileRef = useRef();

  const fetchItems = () => {
    setLoading(true);
    api
      .get('/info-pariwisata/dtw')
      .then((res) => setItems(Array.isArray(res.data) ? res.data : res.data?.data || []))
      .catch(() => setError('Gagal memuat data daya tarik wisata'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const showSuccess = (msg) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(''), 3000);
  };

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setFile(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = '';
    setError('');
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({
      kabupaten: item.kabupaten || 'Kota Palu',
      judul: item.judul || '',
      deskripsi: item.deskripsi || '',
    });
    setFile(null);
    setPreview(item.gambar ? fileUrl(item.gambar) : null);
    if (fileRef.current) fileRef.current.value = '';
    setError('');
    setModalOpen(true);
  };

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.judul.trim()) {
      setError('Judul wajib diisi');
      return;
    }
    if (!form.kabupaten) {
      setError('Kabupaten wajib dipilih');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('kabupaten', form.kabupaten);
      fd.append('judul', form.judul.trim());
      fd.append('deskripsi', form.deskripsi);
      if (file) fd.append('gambar', file);
      else if (editing?.gambar) fd.append('gambar_lama', editing.gambar);

      if (editing) {
        await api.put(`/info-pariwisata/dtw/${editing.id}`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        showSuccess('Daya tarik wisata berhasil diperbarui');
      } else {
        await api.post('/info-pariwisata/dtw', fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        showSuccess('Daya tarik wisata berhasil ditambahkan');
      }
      setModalOpen(false);
      fetchItems();
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menyimpan daya tarik wisata');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/info-pariwisata/dtw/${deleteTarget.id}`);
      showSuccess('Daya tarik wisata berhasil dihapus');
      setDeleteTarget(null);
      fetchItems();
    } catch {
      setError('Gagal menghapus daya tarik wisata');
    } finally {
      setDeleting(false);
    }
  };

  const filtered = items.filter((item) => {
    const q = search.toLowerCase();
    return (
      (item.judul || '').toLowerCase().includes(q) ||
      (item.kabupaten || '').toLowerCase().includes(q) ||
      (item.deskripsi || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Kelola Daya Tarik Wisata"
        subtitle="Tambah, ubah, dan hapus destinasi wisata di 13 kabupaten & kota"
        badge={
          <span className="rounded-full border border-amber-200 bg-amber-100/80 px-3 py-1 text-xs font-bold text-amber-700 backdrop-blur-md">
            {items.length} Destinasi
          </span>
        }
        onAdd={openAdd}
        addLabel="Tambah DTW"
      />

      <AlertBox error={error} success={success} onCloseError={() => setError('')} />

      <GlassCard className="overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/60 px-5 py-4">
          <h2 className="font-display text-base font-bold text-[#0b192c]">
            Daftar Daya Tarik Wisata ({filtered.length})
          </h2>
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Cari judul, kabupaten..."
          />
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : filtered.length === 0 ? (
          <EmptyState>
            {search
              ? 'Tidak ada destinasi yang cocok dengan pencarian.'
              : 'Belum ada daya tarik wisata.'}
          </EmptyState>
        ) : (
          <div className="divide-y divide-slate-200/60">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-white/60"
              >
                <div className="h-14 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                  {item.gambar ? (
                    <img
                      src={fileUrl(item.gambar)}
                      alt={item.judul}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs font-bold text-slate-400">
                      Tanpa gambar
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-slate-900">{item.judul}</p>
                  <p className="mt-0.5 truncate text-xs text-slate-500">
                    <span className="font-semibold text-amber-600">{item.kabupaten}</span>
                    {item.deskripsi ? ` — ${item.deskripsi}` : ''}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <IconButton
                    title="Ubah"
                    onClick={() => openEdit(item)}
                    className="bg-amber-100 text-amber-700 hover:bg-amber-200"
                  >
                    <Pencil className="h-4 w-4" />
                  </IconButton>
                  <IconButton
                    title="Hapus"
                    onClick={() => setDeleteTarget(item)}
                    className="bg-red-50 text-red-600 hover:bg-red-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        )}
      </GlassCard>

      {modalOpen && (
        <Modal title={editing ? 'Ubah Daya Tarik Wisata' : 'Tambah Daya Tarik Wisata'} onClose={() => setModalOpen(false)} wide>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Kabupaten / Kota" required>
                <SelectInput
                  value={form.kabupaten}
                  onChange={(e) => setForm({ ...form, kabupaten: e.target.value })}
                >
                  {KABUPATEN_LIST.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </SelectInput>
              </Field>
              <Field label="Judul" required>
                <TextInput
                  placeholder="Contoh: Pantai Togean"
                  value={form.judul}
                  onChange={(e) => setForm({ ...form, judul: e.target.value })}
                />
              </Field>
            </div>
            <Field label="Deskripsi">
              <TextareaInput
                placeholder="Deskripsi singkat destinasi..."
                value={form.deskripsi}
                onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
              />
            </Field>
            <Field label="Gambar">
              <UploadBox
                preview={preview}
                onPick={() => fileRef.current?.click()}
                onChange={handleFileChange}
                fileRef={fileRef}
                accept="image/jpeg,image/png,image/jpg"
                hint="JPG, PNG — Maks 5MB"
              />
            </Field>
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Batal
              </button>
              <SubmitButton disabled={saving}>{saving ? 'Menyimpan...' : 'Simpan'}</SubmitButton>
            </div>
          </form>
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmDeleteModal
          label={deleteTarget.judul}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
          loading={deleting}
        />
      )}
    </div>
  );
};

export default DTW;
