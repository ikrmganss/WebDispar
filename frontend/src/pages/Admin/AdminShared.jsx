import { useEffect } from 'react';
import { AlertCircle, CheckCircle2, Plus, Search, Upload, X } from 'lucide-react';

/** Base URL server (tanpa /api) untuk membangun URL file/gambar yang di-upload. */
export const BASE_URL =
  import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

/** 13 kabupaten & kota di Sulawesi Tengah (sama seperti halaman publik). */
export const KABUPATEN_LIST = [
  'Kota Palu',
  'Kabupaten Donggala',
  'Kabupaten Sigi',
  'Kabupaten Parigi Moutong',
  'Kabupaten Poso',
  'Kabupaten Morowali',
  'Kabupaten Morowali Utara',
  'Kabupaten Tojo Una-Una',
  'Kabupaten Banggai',
  'Kabupaten Banggai Kepulauan',
  'Kabupaten Banggai Laut',
  'Kabupaten Tolitoli',
  'Kabupaten Buol',
];

/** URL publik sebuah file/gambar hasil upload (multer menyimpannya di /uploads). */
export const fileUrl = (namaFile) =>
  namaFile
    ? namaFile.startsWith('http') || namaFile.startsWith('/')
      ? namaFile
      : `${BASE_URL}/uploads/${namaFile}`
    : null;

export const slugify = (teks = '') =>
  teks
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 200);

export const formatTanggal = (tgl) => {
  if (!tgl) return '-';
  const d = new Date(tgl);
  if (Number.isNaN(d.getTime())) return tgl;
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
};

/* ================= Kartu kaca ================= */

export const GlassCard = ({ children, className = '' }) => (
  <div
    className={`rounded-2xl border border-white/70 bg-white/70 shadow-[0_10px_30px_rgba(11,25,44,0.08)] backdrop-blur-md ${className}`}
  >
    {children}
  </div>
);

/* ================= Header halaman ================= */

export const PageHeader = ({ title, subtitle, badge, onAdd, addLabel = 'Tambah' }) => (
  <div className="flex flex-wrap items-center justify-between gap-3">
    <div>
      <h1 className="font-display text-2xl font-extrabold text-[#0b192c]">{title}</h1>
      {subtitle && <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>}
    </div>
    <div className="flex items-center gap-2">
      {badge}
      {onAdd && (
        <button
          onClick={onAdd}
          className="flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-bold text-[#0b192c] shadow-md shadow-amber-400/30 transition-all hover:bg-amber-300 active:scale-95"
        >
          <Plus className="h-4 w-4" /> {addLabel}
        </button>
      )}
    </div>
  </div>
);

/* ================= Pencarian ================= */

export const SearchInput = ({ value, onChange, placeholder = 'Cari...' }) => (
  <div className="relative w-full sm:max-w-xs">
    <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-white/70 bg-white/70 py-2.5 pl-10 pr-4 text-sm text-slate-800 shadow-sm outline-none backdrop-blur-md placeholder:text-slate-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40"
    />
  </div>
);

/* ================= Alert ================= */

export const AlertBox = ({ error, success, onCloseError }) => (
  <>
    {error && (
      <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50/90 p-4 text-sm text-red-700 backdrop-blur-md">
        <AlertCircle className="h-4 w-4 shrink-0" /> {error}
        <button onClick={onCloseError} className="ml-auto font-bold" aria-label="Tutup">
          <X className="h-4 w-4" />
        </button>
      </div>
    )}
    {success && (
      <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/90 p-4 text-sm font-semibold text-emerald-700 backdrop-blur-md">
        <CheckCircle2 className="h-4 w-4 shrink-0" /> {success}
      </div>
    )}
  </>
);

/* ================= Modal ================= */

export const Modal = ({ title, onClose, children, wide = false }) => {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#0b192c]/50 p-3 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className={`max-h-[90vh] w-full overflow-y-auto rounded-2xl border border-white/70 bg-white/95 p-5 shadow-2xl backdrop-blur-xl sm:p-6 ${
          wide ? 'sm:max-w-2xl' : 'sm:max-w-lg'
        }`}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <h2 className="font-display text-lg font-bold text-[#0b192c]">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

/* ================= Modal konfirmasi hapus ================= */

export const ConfirmDeleteModal = ({ label, onCancel, onConfirm, loading }) => (
  <Modal title="Hapus Data" onClose={onCancel}>
    <p className="text-sm text-slate-600">
      Yakin ingin menghapus <span className="font-bold text-slate-900">{label}</span>? Tindakan ini
      tidak dapat dibatalkan.
    </p>
    <div className="mt-6 flex justify-end gap-2">
      <button
        onClick={onCancel}
        className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
      >
        Batal
      </button>
      <button
        onClick={onConfirm}
        disabled={loading}
        className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-700 disabled:opacity-60"
      >
        {loading ? 'Menghapus...' : 'Ya, Hapus'}
      </button>
    </div>
  </Modal>
);

/* ================= Field form ================= */

export const Field = ({ label, children, required }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold text-slate-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

const inputCls =
  'w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-400/40';

export const TextInput = (props) => <input type="text" {...props} className={inputCls} />;

export const SelectInput = ({ children, className = '', ...props }) => (
  <select {...props} className={`${inputCls} ${className}`}>
    {children}
  </select>
);

export const TextareaInput = (props) => (
  <textarea rows={4} {...props} className={`${inputCls} resize-y`} />
);

/* ================= Upload gambar / file ================= */

export const UploadBox = ({ preview, previewIsImage = true, fileName, onPick, onChange, fileRef, accept, hint }) => (
  <div
    onClick={onPick}
    className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/80 p-5 text-center transition-colors hover:border-amber-400 hover:bg-amber-50/60"
  >
    {preview ? (
      previewIsImage ? (
        <img src={preview} alt="Pratinjau" className="max-h-44 rounded-xl object-cover shadow" />
      ) : (
        <p className="break-all rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
          {fileName || preview}
        </p>
      )
    ) : (
      <>
        <Upload className="h-7 w-7 text-slate-400" />
        <p className="text-sm font-medium text-slate-500">Klik untuk pilih file</p>
        <p className="text-xs text-slate-400">{hint || 'JPG, PNG — Maks 5MB'}</p>
      </>
    )}
    <input ref={fileRef} type="file" accept={accept} onChange={onChange} className="hidden" />
  </div>
);

/* ================= Tombol ================= */

export const PrimaryButton = ({ children, ...props }) => (
  <button
    {...props}
    className="flex items-center justify-center gap-2 rounded-xl bg-[#0b192c] px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-slate-800 active:scale-95 disabled:opacity-60"
  >
    {children}
  </button>
);

export const SubmitButton = ({ children, ...props }) => (
  <button
    type="submit"
    {...props}
    className="flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-bold text-[#0b192c] shadow-md shadow-amber-400/30 transition-all hover:bg-amber-300 active:scale-95 disabled:opacity-60"
  >
    {children}
  </button>
);

/* ================= Keadaan kosong / loading ================= */

export const EmptyState = ({ children }) => (
  <div className="p-12 text-center text-sm text-slate-400">{children}</div>
);

export const LoadingSkeleton = ({ rows = 3 }) => (
  <div className="flex flex-col gap-3 p-6">
    {[...Array(rows)].map((_, i) => (
      <div key={i} className="h-16 animate-pulse rounded-xl bg-slate-200/70" />
    ))}
  </div>
);

/* ================= Tombol aksi tabel ================= */

export const IconButton = ({ title, onClick, className = '', children }) => (
  <button
    title={title}
    aria-label={title}
    onClick={onClick}
    className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${className}`}
  >
    {children}
  </button>
);
