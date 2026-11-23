import { useEffect, useRef, useState } from 'react';
import { ExternalLink, FileText, Pencil, Trash2 } from 'lucide-react';
import api from '../../services/api';
import {
  AlertBox,
  ConfirmDeleteModal,
  EmptyState,
  Field,
  fileUrl,
  GlassCard,
  IconButton,
  LoadingSkeleton,
  Modal,
  PageHeader,
  SearchInput,
  SelectInput,
  SubmitButton,
  TextInput,
  UploadBox,
} from './AdminShared';

const TABS = [
  { id: 'item', label: 'Item Informasi' },
  { id: 'regulasi', label: 'Regulasi' },
  { id: 'sk', label: 'Surat Keputusan' },
];

const emptyItemForm = { kategori_id: '', judul: '', link: '', tahun: '' };
const emptyRegulasiForm = { judul: '', kategori: 'umum' };
const emptySkForm = { judul: '', tahun: '' };

const PPID = () => {
  const [tab, setTab] = useState('item');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [search, setSearch] = useState('');

  // Item
  const [kategoriList, setKategoriList] = useState([]);
  const [kategoriId, setKategoriId] = useState('');
  const [items, setItems] = useState([]);

  // Regulasi & SK
  const [regulasi, setRegulasi] = useState([]);
  const [skList, setSkList] = useState([]);

  // Modal bersama
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [itemForm, setItemForm] = useState(emptyItemForm);
  const [regulasiForm, setRegulasiForm] = useState(emptyRegulasiForm);
  const [skForm, setSkForm] = useState(emptySkForm);
  const [file, setFile] = useState(null);
  const [fileLabel, setFileLabel] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const fileRef = useRef();

  const showSuccess = (msg) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(''), 3000);
  };

  /* ---------- Fetch ---------- */

  const fetchKategori = () =>
    api
      .get('/ppid/kategori')
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
        setKategoriList(list);
        if (list.length > 0) setKategoriId((cur) => cur || String(list[0].id));
      })
      .catch(() => setError('Gagal memuat kategori PPID'));

  const fetchItems = (katId) => {
    if (!katId) {
      setItems([]);
      return Promise.resolve();
    }
    setLoading(true);
    return api
      .get(`/ppid/items/${katId}`)
      .then((res) => setItems(Array.isArray(res.data) ? res.data : res.data?.data || []))
      .catch(() => setError('Gagal memuat item PPID'))
      .finally(() => setLoading(false));
  };

  const fetchRegulasi = () => {
    setLoading(true);
    return api
      .get('/ppid/regulasi')
      .then((res) => setRegulasi(Array.isArray(res.data) ? res.data : res.data?.data || []))
      .catch(() => setError('Gagal memuat regulasi'))
      .finally(() => setLoading(false));
  };

  const fetchSk = () => {
    setLoading(true);
    return api
      .get('/ppid/sk')
      .then((res) => setSkList(Array.isArray(res.data) ? res.data : res.data?.data || []))
      .catch(() => setError('Gagal memuat surat keputusan'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchKategori();
    fetchRegulasi();
    fetchSk();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (tab === 'item') fetchItems(kategoriId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kategoriId, tab]);

  const refreshCurrent = () => {
    if (tab === 'item') fetchItems(kategoriId);
    else if (tab === 'regulasi') fetchRegulasi();
    else fetchSk();
  };

  /* ---------- Modal ---------- */

  const resetFile = () => {
    setFile(null);
    setFileLabel(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const openAdd = () => {
    setEditing(null);
    setError('');
    resetFile();
    if (tab === 'item') setItemForm({ ...emptyItemForm, kategori_id: kategoriId });
    if (tab === 'regulasi') setRegulasiForm(emptyRegulasiForm);
    if (tab === 'sk') setSkForm(emptySkForm);
    setModalOpen(true);
  };

  const openEdit = (row) => {
    setEditing(row);
    setError('');
    resetFile();
    if (tab === 'item') {
      setItemForm({
        kategori_id: String(row.kategori_id || kategoriId),
        judul: row.judul || '',
        link: row.link || '',
        tahun: row.tahun || '',
      });
      setFileLabel(row.file || null);
    }
    if (tab === 'regulasi') {
      setRegulasiForm({ judul: row.judul || '', kategori: row.kategori || 'umum' });
      setFileLabel(row.file || null);
    }
    if (tab === 'sk') {
      setSkForm({ judul: row.judul || '', tahun: row.tahun || '' });
      setFileLabel(row.file || null);
    }
    setModalOpen(true);
  };

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setFileLabel(f.name);
  };

  /* ---------- Simpan / hapus ---------- */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      let url;
      let fd = new FormData();
      if (tab === 'item') {
        if (!itemForm.judul.trim()) throw new Error('Judul wajib diisi');
        if (!itemForm.kategori_id) throw new Error('Kategori wajib dipilih');
        fd.append('kategori_id', itemForm.kategori_id);
        fd.append('judul', itemForm.judul.trim());
        fd.append('link', itemForm.link.trim());
        fd.append('tahun', itemForm.tahun.trim());
        url = editing ? `/ppid/items/${editing.id}` : '/ppid/items';
      } else if (tab === 'regulasi') {
        if (!regulasiForm.judul.trim()) throw new Error('Judul wajib diisi');
        fd.append('judul', regulasiForm.judul.trim());
        fd.append('kategori', regulasiForm.kategori.trim() || 'umum');
        url = editing ? `/ppid/regulasi/${editing.id}` : '/ppid/regulasi';
      } else {
        if (!skForm.judul.trim()) throw new Error('Judul wajib diisi');
        fd.append('judul', skForm.judul.trim());
        fd.append('tahun', skForm.tahun.trim());
        url = editing ? `/ppid/sk/${editing.id}` : '/ppid/sk';
      }
      if (file) fd.append('file', file);
      else if (editing?.file) fd.append('file_lama', editing.file);

      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      if (editing) await api.put(url, fd, config);
      else await api.post(url, fd, config);

      showSuccess(editing ? 'Data berhasil diperbarui' : 'Data berhasil ditambahkan');
      setModalOpen(false);
      refreshCurrent();
    } catch (err) {
      setError(err.message || err.response?.data?.message || 'Gagal menyimpan data');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const base = tab === 'item' ? '/ppid/items' : tab === 'regulasi' ? '/ppid/regulasi' : '/ppid/sk';
      await api.delete(`${base}/${deleteTarget.id}`);
      showSuccess('Data berhasil dihapus');
      setDeleteTarget(null);
      refreshCurrent();
    } catch {
      setError('Gagal menghapus data');
    } finally {
      setDeleting(false);
    }
  };

  /* ---------- Daftar aktif ---------- */

  const currentList = tab === 'item' ? items : tab === 'regulasi' ? regulasi : skList;
  const filtered = currentList.filter((row) => {
    const q = search.toLowerCase();
    return (
      (row.judul || '').toLowerCase().includes(q) ||
      (row.kategori || '').toLowerCase().includes(q) ||
      String(row.tahun || '').includes(q)
    );
  });

  const modalTitle =
    tab === 'item'
      ? editing
        ? 'Ubah Item Informasi'
        : 'Tambah Item Informasi'
      : tab === 'regulasi'
        ? editing
          ? 'Ubah Regulasi'
          : 'Tambah Regulasi'
        : editing
          ? 'Ubah Surat Keputusan'
          : 'Tambah Surat Keputusan';

  return (
    <div className="space-y-6">
      <PageHeader
        title="Kelola PPID"
        subtitle="Item informasi publik per kategori, regulasi, dan surat keputusan"
        onAdd={openAdd}
        addLabel={tab === 'item' ? 'Tambah Item' : tab === 'regulasi' ? 'Tambah Regulasi' : 'Tambah SK'}
      />

      <AlertBox error={error} success={success} onCloseError={() => setError('')} />

      {/* Tab */}
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setTab(t.id);
              setSearch('');
            }}
            className={`rounded-full px-4 py-2 text-sm font-bold backdrop-blur-md transition-all ${
              tab === t.id
                ? 'bg-amber-400 text-[#0b192c] shadow-md shadow-amber-400/40'
                : 'border border-white/60 bg-white/70 text-slate-600 hover:bg-white/90 hover:text-[#0b192c]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <GlassCard className="overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/60 px-5 py-4">
          <h2 className="font-display text-base font-bold text-[#0b192c]">
            {TABS.find((t) => t.id === tab)?.label} ({filtered.length})
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            {tab === 'item' && (
              <SelectInput
                value={kategoriId}
                onChange={(e) => setKategoriId(e.target.value)}
                className="w-auto"
              >
                {kategoriList.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.nama}
                  </option>
                ))}
              </SelectInput>
            )}
            <SearchInput value={search} onChange={setSearch} placeholder="Cari judul, tahun..." />
          </div>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : filtered.length === 0 ? (
          <EmptyState>
            {tab === 'item' && !kategoriId
              ? 'Belum ada kategori PPID.'
              : search
                ? 'Tidak ada data yang cocok dengan pencarian.'
                : 'Belum ada data.'}
          </EmptyState>
        ) : (
          <div className="divide-y divide-slate-200/60">
            {filtered.map((row) => (
              <div
                key={row.id}
                className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-white/60"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-slate-900">{row.judul}</p>
                  <p className="mt-0.5 flex flex-wrap items-center gap-x-3 text-xs text-slate-500">
                    {row.tahun && <span>Tahun: {row.tahun}</span>}
                    {row.kategori && <span>Kategori: {row.kategori}</span>}
                    {row.link && (
                      <a
                        href={row.link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 font-semibold text-amber-600 hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" /> Tautan
                      </a>
                    )}
                    {row.file && (
                      <a
                        href={fileUrl(row.file)}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 font-semibold text-amber-600 hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" /> Lihat File
                      </a>
                    )}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <IconButton
                    title="Ubah"
                    onClick={() => openEdit(row)}
                    className="bg-amber-100 text-amber-700 hover:bg-amber-200"
                  >
                    <Pencil className="h-4 w-4" />
                  </IconButton>
                  <IconButton
                    title="Hapus"
                    onClick={() => setDeleteTarget(row)}
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
        <Modal title={modalTitle} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {tab === 'item' && (
              <>
                <Field label="Kategori" required>
                  <SelectInput
                    value={itemForm.kategori_id}
                    onChange={(e) => setItemForm({ ...itemForm, kategori_id: e.target.value })}
                  >
                    <option value="">-- Pilih kategori --</option>
                    {kategoriList.map((k) => (
                      <option key={k.id} value={k.id}>
                        {k.nama}
                      </option>
                    ))}
                  </SelectInput>
                </Field>
                <Field label="Judul" required>
                  <TextInput
                    placeholder="Judul item informasi"
                    value={itemForm.judul}
                    onChange={(e) => setItemForm({ ...itemForm, judul: e.target.value })}
                  />
                </Field>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Tahun">
                    <TextInput
                      placeholder="Contoh: 2025"
                      value={itemForm.tahun}
                      onChange={(e) => setItemForm({ ...itemForm, tahun: e.target.value })}
                    />
                  </Field>
                  <Field label="Tautan (opsional)">
                    <TextInput
                      placeholder="https://..."
                      value={itemForm.link}
                      onChange={(e) => setItemForm({ ...itemForm, link: e.target.value })}
                    />
                  </Field>
                </div>
              </>
            )}

            {tab === 'regulasi' && (
              <>
                <Field label="Judul" required>
                  <TextInput
                    placeholder="Judul regulasi"
                    value={regulasiForm.judul}
                    onChange={(e) => setRegulasiForm({ ...regulasiForm, judul: e.target.value })}
                  />
                </Field>
                <Field label="Kategori">
                  <TextInput
                    placeholder="umum"
                    value={regulasiForm.kategori}
                    onChange={(e) => setRegulasiForm({ ...regulasiForm, kategori: e.target.value })}
                  />
                </Field>
              </>
            )}

            {tab === 'sk' && (
              <>
                <Field label="Judul" required>
                  <TextInput
                    placeholder="Judul surat keputusan"
                    value={skForm.judul}
                    onChange={(e) => setSkForm({ ...skForm, judul: e.target.value })}
                  />
                </Field>
                <Field label="Tahun">
                  <TextInput
                    placeholder="Contoh: 2025"
                    value={skForm.tahun}
                    onChange={(e) => setSkForm({ ...skForm, tahun: e.target.value })}
                  />
                </Field>
              </>
            )}

            <Field label="File (PDF / Dokumen)">
              <UploadBox
                preview={fileLabel}
                previewIsImage={false}
                fileName={fileLabel}
                onPick={() => fileRef.current?.click()}
                onChange={handleFileChange}
                fileRef={fileRef}
                accept=".pdf,.doc,.docx,image/jpeg,image/png,image/jpg"
                hint="PDF, DOC, DOCX, atau gambar — Maks 5MB"
              />
              {editing?.file && !file && (
                <p className="text-xs text-slate-500">
                  File saat ini:{' '}
                  <a
                    href={fileUrl(editing.file)}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-amber-600 hover:underline"
                  >
                    {editing.file}
                  </a>{' '}
                  (kosongkan bila tidak diganti)
                </p>
              )}
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

export default PPID;
