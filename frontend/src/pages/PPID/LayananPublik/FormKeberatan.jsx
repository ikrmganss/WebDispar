import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../../services/api';

const FormKeberatan = () => {
  const [form, setForm] = useState({
    tanggal: new Date().toISOString().split('T')[0],
    nomor_registrasi: '',
    nomor_permohonan: '',
    tujuan: '',
    nama: '',
    alamat: '',
    no_telp: '',
    alasan: '',
    kasus_posisi: '',
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/ppid/keberatan', form);
      setSent(true);
      setForm({
        tanggal: new Date().toISOString().split('T')[0],
        nomor_registrasi: '', nomor_permohonan: '', tujuan: '', nama: '',
        alamat: '', no_telp: '', alasan: '', kasus_posisi: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal mengirim keberatan.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <>
        <Helmet><title>Form Pengajuan Keberatan - PPID</title></Helmet>
        <div className="bg-gradient-to-r from-navy-900 to-primary-800 py-16 lg:py-20">
          <div className="container-custom">
            <h1 className="text-3xl lg:text-5xl font-extrabold text-white">Form Pengajuan Keberatan</h1>
          </div>
        </div>
        <section className="py-12 lg:py-16">
          <div className="container-custom max-w-3xl">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="card p-10 text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-navy-900 mb-2">Keberatan Berhasil Diajukan!</h2>
              <p className="text-gray-500 mb-6">Kami akan memproses pengajuan keberatan Anda sesuai ketentuan.</p>
              <button onClick={() => setSent(false)} className="btn-outline">Ajukan Keberatan Lain</button>
            </motion.div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Helmet><title>Form Pengajuan Keberatan - PPID Dinas Pariwisata Sulteng</title></Helmet>

      <div className="bg-gradient-to-r from-navy-900 to-primary-800 py-16 lg:py-20">
        <div className="container-custom">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-white">Form Pengajuan Keberatan</h1>
          <p className="text-white/70 mt-2">PPID Dinas Pariwisata Provinsi Sulawesi Tengah</p>
        </div>
      </div>

      <section className="py-12 lg:py-16">
        <div className="container-custom max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="card p-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-lg bg-gold-400 flex items-center justify-center text-navy-900">
                <AlertCircle size={20} />
              </div>
              <div>
                <h2 className="font-bold text-navy-900">Formulir Pengajuan Keberatan</h2>
                <p className="text-xs text-gray-500">Tanda <span className="text-red-500">*</span> wajib diisi</p>
              </div>
            </div>

            {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Pengajuan <span className="text-red-500">*</span></label>
                  <input type="date" required value={form.tanggal} onChange={(e) => setForm({ ...form, tanggal: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Registrasi <span className="text-red-500">*</span></label>
                  <input type="text" required value={form.nomor_registrasi} onChange={(e) => setForm({ ...form, nomor_registrasi: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Permohonan Informasi <span className="text-red-500">*</span></label>
                <input type="text" required value={form.nomor_permohonan} onChange={(e) => setForm({ ...form, nomor_permohonan: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tujuan Penggunaan Informasi <span className="text-red-500">*</span></label>
                <textarea required rows={2} value={form.tujuan} onChange={(e) => setForm({ ...form, tujuan: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 outline-none resize-none" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama <span className="text-red-500">*</span></label>
                  <input type="text" required value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">No. Telepon / WA <span className="text-red-500">*</span></label>
                  <input type="tel" required value={form.no_telp} onChange={(e) => setForm({ ...form, no_telp: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat <span className="text-red-500">*</span></label>
                <textarea required rows={2} value={form.alamat} onChange={(e) => setForm({ ...form, alamat: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 outline-none resize-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alasan Keberatan <span className="text-red-500">*</span></label>
                <textarea required rows={3} value={form.alasan} onChange={(e) => setForm({ ...form, alasan: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 outline-none resize-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kasus Posisi <span className="text-red-500">*</span></label>
                <textarea required rows={4} value={form.kasus_posisi} onChange={(e) => setForm({ ...form, kasus_posisi: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 outline-none resize-none" />
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-50">
                <Send size={18} /> {loading ? 'Mengirim...' : 'Kirim Pengajuan Keberatan'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default FormKeberatan;