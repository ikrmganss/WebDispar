import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, ShieldCheck, ArrowLeft, AlertCircle } from 'lucide-react';
import api from '../../services/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal. Periksa username dan password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 font-sans relative overflow-hidden transition-colors duration-300"
      style={{ background: 'var(--theme-gradient-diagonal, linear-gradient(135deg, #1F5BA6, #383087, #5C2180))' }}
    >
      {/* Background Decorative Rings */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 sm:p-10 w-full max-w-md border border-white/40 relative z-10">
        {/* Header Logo & Title */}
        <div className="text-center mb-8">
          <div className="h-16 px-4 rounded-2xl bg-gradient-to-tr from-[#1F5BA6] to-[#5C2180] mx-auto mb-4 inline-flex items-center justify-center shadow-lg shadow-indigo-900/20 border border-white/20">
            <img
              src="/dinas pariwisata-COLOR WHITE.png"
              alt="Logo Dinas Pariwisata"
              className="h-10 w-auto object-contain"
              onError={(e) => { e.currentTarget.src = '/images/dinas_pariwisata-COLOR_BLACK.png'; }}
            />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Admin Panel Portal</h1>
          <p className="text-slate-500 text-xs mt-1 font-semibold tracking-wide uppercase">
            DINAS PARIWISATA SULAWESI TENGAH
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 p-3.5 rounded-xl mb-5 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Username</label>
            <div className="relative">
              <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={username}
                placeholder="Masukkan username admin"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#1F5BA6] focus:ring-2 focus:ring-[#1F5BA6]/20 outline-none text-sm bg-slate-50 font-medium transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#1F5BA6] focus:ring-2 focus:ring-[#1F5BA6]/20 outline-none text-sm bg-slate-50 font-medium transition-all"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-extrabold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-md shadow-amber-500/20 transform active:scale-98 disabled:opacity-50 text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{loading ? 'Memverifikasi...' : 'Masuk ke Dashboard'}</span>
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-100 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1F5BA6] hover:text-[#5C2180] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Beranda Publik
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
