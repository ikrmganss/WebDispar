import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const BREADCRUMB_TRANS = {
  EN: {
    'Home': 'Home',
    'Profil': 'Profile',
    'Berita': 'News',
    'Informasi Publik': 'Public Information',
    'Info Pariwisata': 'Tourism Info',
    'Rencana Terbit': 'Publication Plan',
    'Sejarah': 'History',
    'Visi dan Misi': 'Vision & Mission',
    'Profil Pimpinan': 'Leadership Profile',
    'Tupoksi': 'Duties & Functions',
    'Tugas Pokok & Fungsi': 'Duties & Functions',
    'Majalah': 'Magazine',
    'Majalah & Publikasi': 'Magazine & Publications',
    'Logo': 'Logo',
    'Hubungi Kami': 'Contact Us',
    'Destinasi': 'Destinations',
    'Pemasaran': 'Marketing',
    'Layanan Publik': 'Public Services',
    'PPID': 'PPID',
    'Profil PPID': 'PPID Profile',
    'Daftar Informasi Publik': 'Public Information List',
    'Informasi Secara Berkala': 'Periodic Information',
    'Informasi Serta Merta': 'Immediate Information',
    'Informasi Setiap Saat': 'Information Available at Any Time',
    'Informasi Yang Dikecualikan': 'Exempt Information',
    'Informasi Dikecualikan': 'Exempt Information',
    'Laporan Tahunan PPID': 'PPID Annual Report',
    'Maklumat Pelayanan': 'Service Notice',
    'Struktur Organisasi PPID': 'PPID Organizational Structure',
    'Visi dan Misi PPID': 'PPID Vision & Mission',
    'Tugas PPID': 'PPID Duties',
    'Tugas dan Fungsi PPID': 'PPID Duties & Functions',
    'Standar Pelayanan': 'Service Standards',
    'Surat Keputusan': 'Decrees & Decisions',
    'Formulir Permohonan Informasi': 'Information Request Form',
    'Formulir Pengajuan Keberatan': 'Objection Submission Form',
    'Prosedur Pengaduan': 'Complaint Procedures',
    'Survey Kepuasan': 'Satisfaction Survey',
    'Regulasi': 'Regulations',
    'Sumber Daya': 'Resources',
    'Data Hunian Hotel': 'Hotel Occupancy Data',
    'Statistik Kunjungan': 'Visit Statistics',
    'Statistik Kunjungan Wisatawan': 'Tourist Visit Statistics',
    'Ekonomi Kreatif': 'Creative Economy',
    'Desa Wisata': 'Tourism Villages',
    'Paket Wisata': 'Tour Packages',
    'Kalender Event': 'Event Calendar',
    'Daya Tarik Wisata': 'Tourist Attractions',
  },
};

const BADGE_TRANS = {
  EN: {
    'Dinas Pariwisata Provinsi Sulawesi Tengah': 'Department of Tourism Central Sulawesi Province',
    'PPID Pelaksana Dinas Pariwisata Sulteng': 'PPID of Central Sulawesi Tourism Department',
    'PPID Pelaksana Dispar Sulteng': 'PPID of Central Sulawesi Tourism Department',
    'Inovasi & Karya Kreatif Lokal': 'Local Innovation & Creative Works',
    'Pengembangan Kapasitas & SDM': 'Capacity & HR Development',
    'Akuntabilitas & Kinerja KIP': 'KIP Accountability & Performance',
    'Standar Mutu Layanan': 'Service Quality Standards',
    'Regulasi & Ketetapan Hukum': 'Regulations & Legal Decrees',
    'Pariwisata Berbasis Masyarakat': 'Community-Based Tourism',
    'Paket Wisata & Perjalanan': 'Tour & Travel Packages',
    'Statistik Akomodasi & Perhotelan': 'Accommodation & Hospitality Statistics',
    'Data & Analisis Kunjungan': 'Visitation Data & Analysis',
    'Karisma Event Sulawesi Tengah': 'Central Sulawesi Event Charisma',
    'Eksplorasi Destinasi Wisata': 'Explore Tourist Destinations',
    'Publikasi Resmi': 'Official Publications',
    'Layanan Informasi & Aduan': 'Information & Complaints Service',
    'Profil Kelembagaan': 'Institutional Profile',
    'Kedudukan & Kewenangan': 'Authority & Legal Mandate',
    'Aset & Identitas Visual': 'Assets & Visual Identity',
    'Layanan Kontak & Lokasi': 'Contact & Location Services',
  },
};

const TITLE_TRANS = {
  EN: {
    // PPID
    'Profil PPID': {
      title: 'PPID Profile',
      subtitle: 'Information Management and Documentation Officer of Central Sulawesi Tourism Department',
    },
    'Daftar Informasi Publik': {
      title: 'Public Information List',
      subtitle: 'Detailed list of public information categories and disclosure documents of Central Sulawesi Tourism Department',
    },
    'Informasi Secara Berkala': {
      title: 'Periodic Information',
      subtitle: 'Information that must be provided and published periodically',
    },
    'Informasi Serta Merta': {
      title: 'Immediate Information',
      subtitle: 'Information that may threaten the lives of many people and public order',
    },
    'Informasi Setiap Saat': {
      title: 'Information Available at Any Time',
      subtitle: 'Public information that must be made available upon request at any time',
    },
    'Informasi Yang Dikecualikan': {
      title: 'Exempt Information',
      subtitle: 'List of confidential and exempt public information based on applicable laws',
    },
    'Informasi Dikecualikan': {
      title: 'Exempt Information',
      subtitle: 'List of confidential and exempt public information based on applicable laws',
    },
    'Visi dan Misi PPID': {
      title: 'PPID Vision & Mission',
      subtitle: 'Vision and mission of PPID in public information disclosure services',
    },
    'Tugas PPID dan PPID Pelaksana': {
      title: 'Duties of PPID & Executive Team',
      subtitle: 'Main duties, functions, and responsibilities of PPID Tourism Department',
    },
    'Struktur Organisasi PPID': {
      title: 'PPID Organizational Structure',
      subtitle: 'Management structure of the PPID executive team',
    },
    'Maklumat Pelayanan Informasi Publik': {
      title: 'Public Information Service Notice',
      subtitle: 'Official service declaration and commitment to providing public information',
    },
    'Standar Pelayanan Publik': {
      title: 'Public Service Standards',
      subtitle: 'Standard operating guidelines and requirements for public information services',
    },
    'Laporan Tahunan PPID': {
      title: 'PPID Annual Report',
      subtitle: 'Annual performance report and archive of public information services',
    },
    'Surat Keputusan': {
      title: 'Decrees & Decisions',
      subtitle: 'Official decrees and legal decisions regarding PPID operations',
    },
    'Formulir Permohonan Informasi Publik': {
      title: 'Public Information Request Form',
      subtitle: 'Submit an official online request for public documents or information',
    },
    'Formulir Pengajuan Keberatan': {
      title: 'Objection Submission Form',
      subtitle: 'File an official objection regarding public information services',
    },
    'Prosedur Pengaduan': {
      title: 'Complaint Procedures',
      subtitle: 'Standard flow and procedure for public complaints and service grievances',
    },
    'Survey Kepuasan Masyarakat': {
      title: 'Community Satisfaction Survey',
      subtitle: 'Feedback and public satisfaction survey for tourism and PPID services',
    },
    'Regulasi & Dasar Hukum': {
      title: 'Regulations & Legal Basis',
      subtitle: 'Laws, regulations, and governor decisions on public information disclosure',
    },

    // Info Pariwisata
    'Desa Wisata': {
      title: 'Tourism Villages',
      subtitle: 'Explore local wisdom, authentic culture, and charms of Central Sulawesi tourism villages',
    },
    'Paket Wisata': {
      title: 'Tour Packages',
      subtitle: 'Recommended tour packages and exciting travel journeys across Central Sulawesi',
    },
    'Data Hunian Hotel': {
      title: 'Hotel Occupancy Data',
      subtitle: 'Room occupancy rate (TPK) information and accommodation directory in Central Sulawesi',
    },
    'Statistik Kunjungan Wisatawan': {
      title: 'Tourist Visit Statistics',
      subtitle: 'Data and trend analysis of domestic and international tourist visits in Central Sulawesi',
    },
    'Ekonomi Kreatif': {
      title: 'Creative Economy',
      subtitle: 'Encouraging the growth of 17 creative subsectors in Central Sulawesi',
    },
    'Sumber Daya Pariwisata & Ekonomi Kreatif': {
      title: 'Tourism & Creative Economy Resources',
      subtitle: 'Labor data, competency certifications, and human resource capacity development',
    },
    'Daya Tarik Wisata': {
      title: 'Tourist Attractions',
      subtitle: 'Explore the stunning natural wonders, cultural heritage, and megadiversity of Central Sulawesi',
    },
    'Kalender Event Pariwisata': {
      title: 'Tourism Event Calendar',
      subtitle: 'Schedule of events, cultural art festivals, and tourism attractions throughout the year in Central Sulawesi',
    },
    'Berita & Informasi Terkini': {
      title: 'Latest News & Information',
      subtitle: 'Latest news, official updates, and activities of Central Sulawesi Tourism Department',
    },
    'Rencana Terbit Majalah': {
      title: 'Magazine Publication Schedule',
      subtitle: 'Publication agenda, production status, and release timeline for Central Sulawesi tourism magazines',
    },
    'Layanan Pengaduan SP4N-LAPOR!': {
      title: 'SP4N-LAPOR! Complaints Service',
      subtitle: 'Official public complaint service integrated with National LAPOR! System',
    },
  },
};

const PageHeader = ({
  badge = 'Dinas Pariwisata Provinsi Sulawesi Tengah',
  badgeIcon: BadgeIcon = Sparkles,
  title,
  subtitle,
  breadcrumbs = [],
  children,
}) => {
  const { language } = useLanguage();
  const isEn = language === 'EN';

  // Translate badge
  const displayBadge = isEn && BADGE_TRANS.EN[badge] ? BADGE_TRANS.EN[badge] : badge;

  // Translate title and subtitle if match found
  const displayTitle = isEn && TITLE_TRANS.EN[title]?.title ? TITLE_TRANS.EN[title].title : title;
  const displaySubtitle = isEn && TITLE_TRANS.EN[title]?.subtitle ? TITLE_TRANS.EN[title].subtitle : subtitle;

  return (
    <div className="bg-gradient-to-r from-[#1F5BA6] via-[#383087] to-[#5C2180] py-12 lg:py-16 text-white relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 md:px-8 relative z-10">
        {/* Badge */}
        {displayBadge && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-semibold text-amber-300 mb-4 border border-white/20">
            {BadgeIcon && <BadgeIcon size={14} className="text-amber-300 flex-shrink-0" />}
            <span>{displayBadge}</span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl lg:text-5xl font-black tracking-tight leading-tight text-white">
          {displayTitle}
        </h1>

        {/* Subtitle */}
        {displaySubtitle && (
          <p className="text-white/80 mt-3 max-w-3xl text-sm lg:text-base leading-relaxed">
            {displaySubtitle}
          </p>
        )}

        {/* Breadcrumb */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-xs text-white/70 mt-6 font-medium">
            <Link to="/" className="hover:text-amber-300 transition-colors">
              Home
            </Link>
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              const label = isEn && BREADCRUMB_TRANS.EN[crumb.label] ? BREADCRUMB_TRANS.EN[crumb.label] : crumb.label;

              return (
                <React.Fragment key={idx}>
                  <ChevronRight size={12} className="text-white/50 flex-shrink-0" />
                  {crumb.path && !isLast ? (
                    <Link to={crumb.path} className="hover:text-amber-300 transition-colors">
                      {label}
                    </Link>
                  ) : (
                    <span className="text-amber-300 font-semibold">{label}</span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        )}

        {/* Optional Extra Elements */}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </div>
  );
};

export default PageHeader;
