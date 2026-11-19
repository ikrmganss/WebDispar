import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Send, CheckCircle2, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../../services/api';
import PageHeader from '../../../components/PageHeader';

const PERTANYAAN = [
  'SOP layanan informasi publik jelas dan mudah diperoleh',
  'Prosedur layanan informasi publik sudah dijalankan oleh badan publik',
  'Persyaratan dalam permintaan informasi sudah sesuai ketentuan yang berlaku (UU 14/2008)',
  'Informasi yang diminta dapat diterima sesuai batas waktu yang ditetapkan',
  'Permintaan informasi publik tidak dibebankan biaya (Sesuai Ketentuan Pelayanan)',
  'Petugas layanan informasi bersikap sopan/ramah dalam memberikan pelayanan',
  'Petugas layanan informasi disiplin (Tepat Waktu) dan senantiasa berada di tempat pelayanan',
  'Petugas pelayanan menguasai tata cara permohonan/keberatan informasi publik',
  'Tempat layanan informasi publik sangat nyaman dan bersih',
  'Sangat mudah menyampaikan permohonan/keberatan informasi publik (Tersedia Formulir)',
];

const OPSI = [
  { value: 1, label: 'Sangat Kurang' },
  { value: 2, label: 'Kurang' },
  { value: 3, label: 'Cukup' },
  { value: 4, label: 'Baik' },
  { value: 5, label: 'Sangat Baik' },
];

const SurveyKepuasan = () => {
  const [form, setForm] = useState({ nama: '', nik: '' });
  const [jawaban, setJawaban] = useState(Array(PERTANYAAN.length).fill(0));
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (jawaban.some((j) => j === 0)) {
      setError('Mohon jawab semua pertanyaan terlebih dahulu.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await api.post('/ppid/survey', { ...form, jawaban });
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal mengirim survey.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <>
        <Helmet><title>Survey Kepuasan - PPID Dinas Pariwisata Sulteng</title></Helmet>
        <PageHeader
          badge="Evaluasi & Mutu Layanan"
          badgeIcon={Star}
          title="Survey Penilaian Layanan"
          subtitle="PPID Dinas Pariwisata Provinsi Sulawesi Tengah"
          breadcrumbs={[
            { label: 'PPID', path: '/ppid/profil' },
            { label: 'Layanan Publik' },
            { label: 'Survey Kepuasan' }
          ]}
        />
        <section className="py-12 lg:py-16">
          <div className="container-custom max-w-3xl">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="card p-10 text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-navy-900 mb-2">Terima Kasih!</h2>
              <p className="text-gray-500">Penilaian Anda sangat berarti untuk peningkatan kualitas layanan kami.</p>
            </motion.div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Helmet><title>Survey Kepuasan - PPID Dinas Pariwisata Sulteng</title></Helmet>

      <PageHeader
        badge="Evaluasi & Mutu Layanan"
        badgeIcon={Star}
        title="Survey Penilaian Layanan Informasi Publik"
        subtitle="Kuesioner Indeks Kepuasan Masyarakat terhadap Pelayanan Informasi Publik Dinas Pariwisata Provinsi Sulawesi Tengah"
        breadcrumbs={[
          { label: 'PPID', path: '/ppid/profil' },
          { label: 'Layanan Publik' },
          { label: 'Survey Kepuasan' }
        ]}
      />

      <section className="py-12 lg:py-16">
        <div className="container-custom max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="card p-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-lg bg-gold-400 flex items-center justify-center text-navy-900">
                <Star size={20} />
              </div>
              <div>
                <h2 className="font-bold text-navy-900">Formulir Survey Kepuasan</h2>
                <p className="text-xs text-gray-500">Penilaian layanan informasi publik</p>
              </div>
            </div>

            {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama <span className="text-red-500">*</span></label>
                  <input type="text" required value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">NIK <span className="text-red-500">*</span></label>
                  <input type="text" required value={form.nik} onChange={(e) => setForm({ ...form, nik: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 outline-none" />
                </div>
              </div>

              <div className="bg-primary-50 rounded-xl p-4">
                <p className="text-sm text-navy-900 font-medium">
                  Penilaian layanan informasi publik pada Dinas Pariwisata Provinsi Sulawesi Tengah.
                  Penilaian tersebut didasarkan atas pertimbangan sebagai berikut:
                </p>
              </div>

              {PERTANYAAN.map((q, idx) => (
                <div key={idx} className="border border-gray-100 rounded-xl p-4">
                  <p className="text-sm font-medium text-navy-900 mb-3">
                    {idx + 1}. {q}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {OPSI.map((o) => (
                      <button
                        key={o.value}
                        type="button"
                        onClick={() => {
                          const newJ = [...jawaban];
                          newJ[idx] = o.value;
                          setJawaban(newJ);
                        }}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all ${
                          jawaban[idx] === o.value
                            ? 'bg-primary-600 text-white border-primary-600 shadow'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-primary-400'
                        }`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-50">
                <Send size={18} /> {loading ? 'Mengirim...' : 'Kirim Penilaian'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default SurveyKepuasan;