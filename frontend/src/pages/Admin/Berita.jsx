import { useEffect, useRef, useState } from 'react';
import { Calendar, Eye, Pencil, Trash2 } from 'lucide-react';
import api from '../../services/api';
import {
  AlertBox,
  ConfirmDeleteModal,
  EmptyState,
  Field,
  fileUrl,
  formatTanggal,
  GlassCard,
  IconButton,
  LoadingSkeleton,
  Modal,
  PageHeader,
  SearchInput,
  SelectInput,
  slugify,
  SubmitButton,
  TextareaInput,
  TextInput,
  UploadBox,
} from './AdminShared';

const emptyForm = {
  judul: '',
  slug: '',
  konten: '',
  tanggal: new Date().toISOString().slice(0, 10),
  penulis: 'Admin',
  kategori: 'WARTA PARIWISATA',
};

const KATEGORI_LIST = ['WARTA PARIWISATA', 'PENGUMUMAN', 'KEGIATAN', 'PARIWISATA', 'LAINNYA'];

const Berita = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
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
      .get('/berita', { params: { limit: 100, page: 1 } })
      .then((res) => {
        setItems(res.data?.data || []);
        setTotal(res.data?.total ?? res.data?.data?.length ?? 0);
      })
      .catch(() => setError('Gagal memuat data berita'))
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
      judul: item.judul || '',
      slug: item.slug || '',
      konten: item.konten || '',
      tanggal: item.tanggal ? String(item.tanggal).slice(0, 10) : '',
      penulis: item.penulis || 'Admin',
      kategori: item.kategori || 'WARTA PARIWISATA',
    });
    setFile(null);
    setPreview(item.gambar ? fileUrl(item.gambar) : null);
    if (fileRef.current) fileRef.current.value = '';
    setError('');
    setModalOpen(true);
  };

  const handleJudulChange = (value) => {
    setForm((f) => ({ ...f, judul: value, slug: editing ? f.slug : slugify(value) }));
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
    if (!form.konten.trim()) {
      setError('Konten wajib diisi');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('judul', form.judul.trim());
      fd.append('slug', form.slug.trim() || slugify(form.judul));
      fd.append('konten', form.konten);
      fd.append('tanggal', form.tanggal || new Date().toISOString().slice(0, 10));
      fd.append('penulis', form.penulis.trim() || 'Admin');
      fd.append('kategori', form.kategori.trim() || 'WARTA PARIWISATA');
      if (file) fd.append('gambar', file);
      else if (editing?.gambar) fd.append('gambar_lama', editing.gambar);

      if (editing) {
        await api.put(`/berita/${editing.id}`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        showSuccess('Berita berhasil diperbarui');
      } else {
        await api.post('/berita', fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        showSuccess('Berita berhasil ditambahkan');
      }
      setModalOpen(false);
      fetchItems();
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menyimpan berita');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/berita/${deleteTarget.id}`);
      showSuccess('Berita berhasil dihapus');
      setDeleteTarget(null);
      fetchItems();
    } catch {
      setError('Gagal menghapus berita');
    } finally {
      setDeleting(false);
    }
  };

  const filtered = items.filter((item) => {
    const q = search.toLowerCase();
    return (
      (item.judul || '').toLowerCase().includes(q) ||
      (item.kategori || '').toLowerCase().includes(q) ||
      (item.penulis || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Kelola Berita"
        subtitle="Tambah, ubah, dan hapus berita Dinas Pariwisata Sulteng"
        badge={
          <span className="rounded-full border border-amber-200 bg-amber-100/80 px-3 py-1 text-xs font-bold text-amber-700 backdrop-blur-md">
            {total} Berita
          </span>
        }
        onAdd={openAdd}
        addLabel="Tambah Berita"
      />

      <AlertBox error={error} success={success} onCloseError={() => setError('')} />

      <GlassCard className="overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/60 px-5 py-4">
          <h2 className="font-display text-base font-bold text-[#0b192c]">
            Daftar Berita ({filtered.length})
          </h2>
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Cari judul, kategori, penulis..."
          />
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : filtered.length === 0 ? (
          <EmptyState>
            {search ? 'Tidak ada berita yang cocok dengan pencarian.' : 'Belum ada berita.'}
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
                  <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-slate-500">
                    <span className="font-semibold text-amber-600">{item.kategori || '-'}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {formatTanggal(item.tanggal)}
                    </span>
                    <span>oleh {item.penulis || 'Admin'}</span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" /> {item.dilihat ?? 0}
                    </span>
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
        <Modal
          title={editing ? 'Ubah Berita' : 'Tambah Berita Baru'}
          onClose={() => setModalOpen(false)}
          wide
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Field label="Judul" required>
              <TextInput
                placeholder="Judul berita"
                value={form.judul}
                onChange={(e) => handleJudulChange(e.target.value)}
              />
            </Field>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Slug">
                <TextInput
                  placeholder="slug-berita"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                />
              </Field>
              <Field label="Kategori">
                <SelectInput
                  value={form.kategori}
                  onChange={(e) => setForm({ ...form, kategori: e.target.value })}
                >
                  {KATEGORI_LIST.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </SelectInput>
              </Field>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Tanggal" required>
                <TextInput
                  type="date"
                  value={form.tanggal}
                  onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
                />
              </Field>
              <Field label="Penulis">
                <TextInput
                  placeholder="Admin"
                  value={form.penulis}
                  onChange={(e) => setForm({ ...form, penulis: e.target.value })}
                />
              </Field>
            </div>
            <Field label="Konten" required>
              <TextareaInput
                rows={6}
                placeholder="Isi berita..."
                value={form.konten}
                onChange={(e) => setForm({ ...form, konten: e.target.value })}
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

export default Berita;
