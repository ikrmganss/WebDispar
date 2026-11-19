import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Send, CheckCircle2, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../../services/api';
import PageHeader from '../../../components/PageHeader';

const FormPermohonan = () => {
  const [form, setForm] = useState({
    nama: '', alamat: '', email: '', no_telp: '', rincian: '', cara_mendapatkan: '',
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/ppid/permohonan', form);
      setSent(true);
      setForm({ nama: '', alamat: '', email: '', no_telp: '', rincian: '', cara_mendapatkan: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal mengirim permohonan. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet><title>Form Permohonan Informasi - PPID Dinas Pariwisata Sulteng</title></Helmet>

      <PageHeader
        badge="Layanan PPID Online"
        badgeIcon={FileText}
        title="Form Permohonan Informasi"
        subtitle="Sampaikan permohonan informasi publik secara online kepada PPID Dinas Pariwisata Provinsi Sulawesi Tengah"
        breadcrumbs={[
          { label: 'PPID', path: '/ppid/profil' },
          { label: 'Layanan Publik' },
          { label: 'Permohonan Informasi' }
        ]}
      />

      <section className="py-12 lg:py-16">
        <div className="container-custom max-w-3xl">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card p-10 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-navy-900 mb-2">Permohonan Berhasil Dikirim!</h2>
              <p className="text-gray-500 mb-6">
                Permohonan informasi Anda telah kami terima. Kami akan memproses sesuai ketentuan yang berlaku.
              </p>
              <button onClick={() => setSent(false)} className="btn-outline">
                Kirim Permohonan Lain
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-8"
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center text-white">
                  <FileText size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-navy-900">Formulir Permohonan</h2>
                  <p className="text-xs text-gray-500">Tanda <span className="text-red-500">*</span> wajib diisi</p>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text" required value={form.nama}
                    onChange={(e) => setForm({ ...form, nama: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Alamat <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required rows={3} value={form.alamat}
                    onChange={(e) => setForm({ ...form, alamat: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all resize-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email" required value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      No. Telp / HP / WA <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel" required value={form.no_telp}
                      onChange={(e) => setForm({ ...form, no_telp: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rincian Informasi Yang Dibutuhkan <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required rows={5} value={form.rincian}
                    onChange={(e) => setForm({ ...form, rincian: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all resize-none"
                    placeholder="Jelaskan informasi yang Anda butuhkan secara detail..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cara Mendapatkan Informasi <span className="text-red-500">*</span>
                  </label>
                  <select
                    required value={form.cara_mendapatkan}
                    onChange={(e) => setForm({ ...form, cara_mendapatkan: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all bg-white"
                  >
                    <option value="">-- Pilih Cara --</option>
                    <option value="Email">Email</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Ambil Langsung">Ambil Langsung di Kantor</option>
                    <option value="Pos">Kirim via Pos</option>
                  </select>
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                  <Send size={18} /> {loading ? 'Mengirim...' : 'Kirim Permohonan'}
                </button>
              </form>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default FormPermohonan;