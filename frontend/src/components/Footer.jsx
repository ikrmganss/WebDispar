import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="w-full bg-[#0b192c] text-slate-300 border-t border-slate-800 pt-14 pb-10 flex justify-center mt-12">
      <div className="max-w-7xl w-full px-4 md:px-8 flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-white text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-400 rounded-sm" /> Quick Links
            </h2>
            <div className="flex flex-col gap-2 text-xs">
              {[
                { label: 'Home', path: '/' },
                { label: 'Profil', path: '/profil/sejarah' },
                { label: 'Informasi Publik', path: '/ppid/profil' },
                { label: 'Info Pariwisata', path: '/info-pariwisata/destinasi/daya-tarik-wisata' },
                { label: 'Rencana Terbit', path: '/rencana-terbit' },
              ].map((link) => (
                <Link key={link.label} to={link.path} className="hover:text-amber-400 flex items-center gap-1.5 transition-colors">
                  <span className="text-amber-400 text-[10px]">›</span> {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Kontak */}
          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-white text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-400 rounded-sm" /> Kontak
            </h2>
            <div className="flex flex-col gap-2 text-xs">
              {[
                { label: 'Alamat Kantor', path: '/profil/hubungi-kami' },
                { label: 'Email Pengaduan', path: '/profil/hubungi-kami' },
                { label: 'Layanan Informasi', path: '/ppid/layanan-publik/form-permohonan' },
                { label: 'PPID Dinas Pariwisata', path: '/ppid/profil' },
              ].map((item) => (
                <Link key={item.label} to={item.path} className="hover:text-amber-400 transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Alamat & Kontak */}
          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-white text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-400 rounded-sm" /> Alamat &amp; Kontak
            </h2>
            <div className="flex flex-col gap-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Dinas Pariwisata Provinsi Sulawesi Tengah, Kota Palu</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:dispar@sultengprov.go.id" className="hover:text-amber-400 transition-colors">
                  dispar@sultengprov.go.id
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:04514839422" className="hover:text-amber-400 transition-colors">
                  (0451) 483942
                </a>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-white text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-400 rounded-sm" /> Social Media
            </h2>
            <p className="text-slate-400 text-xs">
              Ikuti kami di media sosial untuk mendapatkan info promosi dan festival wisata terbaru di Sulteng.
            </p>
            <div className="flex gap-2 pt-2">
              {[
                { Icon: FaFacebook, href: 'https://facebook.com' },
                { Icon: FaTwitter, href: 'https://twitter.com' },
                { Icon: FaInstagram, href: 'https://instagram.com' },
                { Icon: FaYoutube, href: 'https://youtube.com' },
              ].map(({ Icon, href }, idx) => (
                <a key={idx} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2024 Dinas Pariwisata Provinsi Sulawesi Tengah. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-300 transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Syarat &amp; Ketentuan</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Peta Situs</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
