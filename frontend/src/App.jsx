import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MainLayout from './components/MainLayout';
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
import InformasiSetiapSaat from './pages/PPID/InformasiSetiapSaat';
import InformasiSertaMerta from './pages/PPID/InformasiSertaMerta';
import InformasiDikecualikan from './pages/PPID/InformasiDikecualikan';
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
import InformasiSecaraBerkala from './pages/PPID/InformasiSecaraBerkala';

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
    <MainLayout language={language} setLanguage={setLanguage}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/berita" element={<Berita />} />
        <Route path="/berita/:slug" element={<BeritaDetail />} />

        {/* Profil */}
        <Route path="/profil/sejarah" element={<Sejarah />} />
        <Route path="/profil/visi-misi" element={<VisiMisi />} />
        <Route path="/profil/profil-pimpinan" element={<ProfilPimpinan />} />
        <Route path="/profil/tupoksi" element={<Tupoksi />} />
        <Route path="/profil/majalah" element={<Majalah />} />
        <Route path="/profil/logo" element={<Logo />} />
        <Route path="/profil/hubungi-kami" element={<HubungiKami />} />

        {/* PPID */}
        <Route path="/ppid/profil" element={<ProfilPPID />} />
        <Route path="/ppid/daftar-informasi-publik" element={<DaftarInformasiPublik />} />
        <Route path="/ppid/informasi-setiap-saat" element={<InformasiSetiapSaat />} />
        <Route path="/ppid/informasi-serta-merta" element={<InformasiSertaMerta />} />
        <Route path="/ppid/informasi-dikecualikan" element={<InformasiDikecualikan />} />
        <Route path="/ppid/profil/struktur-organisasi" element={<StrukturOrganisasiPPID />} />
        <Route path="/ppid/profil/visi-misi" element={<VisiMisiPPID />} />
        <Route path="/ppid/profil/maklumat-pelayanan" element={<MaklumatPelayanan />} />
        <Route path="/ppid/profil/tugas-ppid" element={<TugasPPID />} />
        <Route path="/ppid/laporan-tahunan" element={<LaporanTahunan />} />
        <Route path="/ppid/surat-keputusan" element={<SuratKeputusan />} />
        <Route path="/ppid/standar-pelayanan" element={<StandarPelayanan />} />
        <Route path="/ppid/layanan-publik/form-permohonan" element={<FormPermohonan />} />
        <Route path="/ppid/layanan-publik/form-keberatan" element={<FormKeberatan />} />
        <Route path="/ppid/layanan-publik/prosedur-pengaduan" element={<ProsedurPengaduan />} />
        <Route path="/ppid/layanan-publik/survey-kepuasan" element={<SurveyKepuasan />} />
        <Route path="/ppid/informasi-secara-berkala" element={<InformasiSecaraBerkala />} />
        <Route path="/ppid/informasi-berkala" element={<InformasiSecaraBerkala />} />
        <Route path="/ppid/layanan-publik/regulasi" element={<Regulasi />} />
        <Route path="/ppid/regulasi" element={<Regulasi />} />

        {/* Info Pariwisata */}
        <Route path="/info-pariwisata/destinasi/daya-tarik-wisata" element={<DayaTarikWisata />} />
        <Route path="/info-pariwisata/destinasi/daya-tarik-wisata/:kabupaten" element={<DayaTarikWisata />} />
        <Route path="/info-pariwisata/destinasi/desa-wisata" element={<DesaWisata />} />
        <Route path="/info-pariwisata/destinasi/desa-wisata/:kabupaten" element={<DesaWisata />} />
        <Route path="/info-pariwisata/pemasaran/paket-wisata" element={<PaketWisata />} />
        <Route path="/info-pariwisata/pemasaran/kalender-event" element={<KalenderEvent />} />
        <Route path="/info-pariwisata/pemasaran/data-hunian" element={<DataHunian />} />
        <Route path="/info-pariwisata/pemasaran/statistik-kunjungan" element={<StatistikKunjungan />} />
        <Route path="/info-pariwisata/ekonomi-kreatif" element={<EkonomiKreatif />} />
        <Route path="/info-pariwisata/sumber-daya" element={<SumberDaya />} />

        {/* Lain */}
        <Route path="/rencana-terbit" element={<RencanaTerbit />} />
        <Route path="/lapor" element={<Lapor />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
