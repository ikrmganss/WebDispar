import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa6';
import { useLanguage } from '../context/LanguageContext';
import { UI_STRINGS } from '../utils/translations';

const Footer = () => {
  const { language } = useLanguage();
  const strings = UI_STRINGS[language] || UI_STRINGS.ID;
  const isEn = language === 'EN';

  return (
    <footer
      className="w-full text-slate-200 border-t border-white/10 pt-12 pb-8 px-4 lg:px-8 transition-colors duration-300"
      style={{ background: 'var(--theme-gradient-vertical, linear-gradient(to bottom, #5C2180, #143D8F))' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* 4 Kolom Utama */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Kolom 1: Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-[#FBBF24] text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FBBF24]" />
              {strings.quickLinks}
            </h3>
            <div className="flex flex-col gap-2 text-xs">
              {[
                { label: isEn ? 'Home' : 'Home', path: '/' },
                { label: isEn ? 'Profile' : 'Profil', path: '/profil/sejarah' },
                { label: isEn ? 'Public Information' : 'Informasi Publik', path: '/ppid/daftar-informasi-publik' },
                { label: isEn ? 'Tourism Info' : 'Info Pariwisata', path: '/info-pariwisata/destinasi/daya-tarik-wisata' },
                { label: isEn ? 'Publication Plan' : 'Rencana Terbit', path: '/rencana-terbit' },
              ].map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="text-slate-300 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
                >
                  <span className="text-amber-400 text-xs">›</span> {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Kolom 2: Kontak */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-[#FBBF24] text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FBBF24]" />
              {strings.contact}
            </h3>
            <div className="flex flex-col gap-2 text-xs text-slate-300">
              <Link to="/profil/hubungi-kami" className="hover:text-amber-300 transition-colors">
                {strings.officeAddress}
              </Link>
              <Link to="/profil/hubungi-kami" className="hover:text-amber-300 transition-colors">
                {strings.complaintEmail}
              </Link>
              <Link to="/ppid/layanan-publik/form-permohonan" className="hover:text-amber-300 transition-colors">
                {strings.tenganiService}
              </Link>
              <Link to="/ppid/profil" className="hover:text-amber-300 transition-colors">
                {strings.ppidTourism}
              </Link>
            </div>
          </div>

          {/* Kolom 3: Alamat & Kontak Detail */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-[#FBBF24] text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FBBF24]" />
              {strings.officialContact}
            </h3>
            <div className="flex flex-col gap-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FBBF24] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{strings.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FBBF24] shrink-0" />
                <a href="mailto:dispar@sultengprov.go.id" className="hover:text-amber-300 transition-colors">
                  dispar@sultengprov.go.id
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FBBF24] shrink-0" />
                <a href="tel:0451483942" className="hover:text-amber-300 transition-colors">
                  (0451) 483942
                </a>
              </div>
            </div>
          </div>

          {/* Kolom 4: Social Media */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-[#FBBF24] text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FBBF24]" />
              {strings.officialSocial}
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              {strings.socialDesc}
            </p>
            <div className="flex gap-2.5 pt-1">
              {[
                { Icon: FaFacebookF, href: 'https://www.facebook.com/dinaspariwisatasulteng/', label: 'Facebook' },
                { Icon: FaInstagram, href: 'https://www.instagram.com/dinaspariwisatasulteng/', label: 'Instagram' },
                { Icon: FaYoutube, href: 'https://www.youtube.com/c/dinaspariwisatasulteng', label: 'YouTube' },
              ].map(({ Icon, href, label }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center transition-all shadow-sm"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Baris Hak Cipta & Link Bawah */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300/80">
          <p>{strings.copyright}</p>
          <div className="flex gap-5">
            <span className="hover:text-white transition-colors cursor-pointer">{isEn ? 'Privacy Policy' : 'Kebijakan Privasi'}</span>
            <span className="hover:text-white transition-colors cursor-pointer">{isEn ? 'Terms & Conditions' : 'Syarat & Ketentuan'}</span>
            <span className="hover:text-white transition-colors cursor-pointer">{isEn ? 'Sitemap' : 'Peta Situs'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
