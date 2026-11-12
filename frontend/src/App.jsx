import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Berita from './pages/Berita';
import BeritaDetail from './pages/BeritaDetail';

// Profil
import Sejarah from './pages/Profil/Sejarah';
import VisiMisi from './pages/Profil/VisiMisi';
import ProfilPimpinan from './pages/Profil/ProfilPimpinan';
import Tupoksi from './pages/Profil/Tupoksi';
import Majalah from './pages/Profil/Majalah';
import Logo from './pages/Profil/Logo';
import HubungiKami from './pages/Profil/HubungiKami';

// PPID
import DaftarInformasiPublik from './pages/PPID/DaftarInformasiPublik';
import ProfilPPID from './pages/PPID/ProfilPPID';
import StrukturOrganisasiPPID from './pages/PPID/StrukturOrganisasiPPID';
import VisiMisiPPID from './pages/PPID/VisiMisiPPID';
import MaklumatPelayanan from './pages/PPID/MaklumatPelayanan';
import TugasPPID from './pages/PPID/TugasPPID';
import LaporanTahunan from './pages/PPID/LaporanTahunan';
import SuratKeputusan from './pages/PPID/SuratKeputusan';
import StandarPelayanan from './pages/PPID/StandarPelayanan';
import FormPermohonan from './pages/PPID/LayananPublik/FormPermohonan';
import FormKeberatan from './pages/PPID/LayananPublik/FormKeberatan';
import ProsedurPengaduan from './pages/PPID/LayananPublik/ProsedurPengaduan';
import SurveyKepuasan from './pages/PPID/LayananPublik/SurveyKepuasan';
import Regulasi from './pages/PPID/LayananPublik/Regulasi';

// Info Pariwisata
import DayaTarikWisata from './pages/InfoPariwisata/Destinasi/DayaTarikWisata';
import DesaWisata from './pages/InfoPariwisata/Destinasi/DesaWisata';
import PaketWisata from './pages/InfoPariwisata/Pemasaran/PaketWisata';
import KalenderEvent from './pages/InfoPariwisata/Pemasaran/KalenderEvent';
import DataHunian from './pages/InfoPariwisata/Pemasaran/DataHunian';
import StatistikKunjungan from './pages/InfoPariwisata/Pemasaran/StatistikKunjungan';
import EkonomiKreatif from './pages/InfoPariwisata/EkonomiKreatif';
import SumberDaya from './pages/InfoPariwisata/SumberDaya';

// Lain
import RencanaTerbit from './pages/RencanaTerbit';
import Lapor from './pages/Lapor';

// Admin
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';

import api from './services/api';

function App() {
  const [language, setLanguage] = useState('ID');
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    api.post('/statistik/track').catch(() => {});
  }, []);

  if (isAdmin) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen text-slate-900 font-sans flex flex-col antialiased">
      <Navbar language={language} setLanguage={setLanguage} />
      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/berita" element={<div className="pt-20"><Berita /></div>} />
          <Route path="/berita/:slug" element={<div className="pt-20"><BeritaDetail /></div>} />

          {/* Profil */}
          <Route path="/profil/sejarah" element={<div className="pt-20"><Sejarah /></div>} />
          <Route path="/profil/visi-misi" element={<div className="pt-20"><VisiMisi /></div>} />
          <Route path="/profil/profil-pimpinan" element={<div className="pt-20"><ProfilPimpinan /></div>} />
          <Route path="/profil/tupoksi" element={<div className="pt-20"><Tupoksi /></div>} />
          <Route path="/profil/majalah" element={<div className="pt-20"><Majalah /></div>} />
          <Route path="/profil/logo" element={<div className="pt-20"><Logo /></div>} />
          <Route path="/profil/hubungi-kami" element={<div className="pt-20"><HubungiKami /></div>} />

          {/* PPID */}
          <Route path="/ppid/profil" element={<div className="pt-20"><ProfilPPID /></div>} />
          <Route path="/ppid/daftar-informasi-publik" element={<div className="pt-20"><DaftarInformasiPublik /></div>} />
          <Route path="/ppid/profil/struktur-organisasi" element={<div className="pt-20"><StrukturOrganisasiPPID /></div>} />
          <Route path="/ppid/profil/visi-misi" element={<div className="pt-20"><VisiMisiPPID /></div>} />
          <Route path="/ppid/profil/maklumat-pelayanan" element={<div className="pt-20"><MaklumatPelayanan /></div>} />
          <Route path="/ppid/profil/tugas-ppid" element={<div className="pt-20"><TugasPPID /></div>} />
          <Route path="/ppid/laporan-tahunan" element={<div className="pt-20"><LaporanTahunan /></div>} />
          <Route path="/ppid/surat-keputusan" element={<div className="pt-20"><SuratKeputusan /></div>} />
          <Route path="/ppid/standar-pelayanan" element={<div className="pt-20"><StandarPelayanan /></div>} />
          <Route path="/ppid/layanan-publik/form-permohonan" element={<div className="pt-20"><FormPermohonan /></div>} />
          <Route path="/ppid/layanan-publik/form-keberatan" element={<div className="pt-20"><FormKeberatan /></div>} />
          <Route path="/ppid/layanan-publik/prosedur-pengaduan" element={<div className="pt-20"><ProsedurPengaduan /></div>} />
          <Route path="/ppid/layanan-publik/survey-kepuasan" element={<div className="pt-20"><SurveyKepuasan /></div>} />
          <Route path="/ppid/layanan-publik/regulasi" element={<div className="pt-20"><Regulasi /></div>} />

          {/* Info Pariwisata */}
          <Route path="/info-pariwisata/destinasi/daya-tarik-wisata" element={<div className="pt-20"><DayaTarikWisata /></div>} />
          <Route path="/info-pariwisata/destinasi/daya-tarik-wisata/:kabupaten" element={<div className="pt-20"><DayaTarikWisata /></div>} />
          <Route path="/info-pariwisata/destinasi/desa-wisata" element={<div className="pt-20"><DesaWisata /></div>} />
          <Route path="/info-pariwisata/destinasi/desa-wisata/:kabupaten" element={<div className="pt-20"><DesaWisata /></div>} />
          <Route path="/info-pariwisata/pemasaran/paket-wisata" element={<div className="pt-20"><PaketWisata /></div>} />
          <Route path="/info-pariwisata/pemasaran/kalender-event" element={<div className="pt-20"><KalenderEvent /></div>} />
          <Route path="/info-pariwisata/pemasaran/data-hunian" element={<div className="pt-20"><DataHunian /></div>} />
          <Route path="/info-pariwisata/pemasaran/statistik-kunjungan" element={<div className="pt-20"><StatistikKunjungan /></div>} />
          <Route path="/info-pariwisata/ekonomi-kreatif" element={<div className="pt-20"><EkonomiKreatif /></div>} />
          <Route path="/info-pariwisata/sumber-daya" element={<div className="pt-20"><SumberDaya /></div>} />

          {/* Lain */}
          <Route path="/rencana-terbit" element={<div className="pt-20"><RencanaTerbit /></div>} />
          <Route path="/lapor" element={<div className="pt-20"><Lapor /></div>} />

        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;