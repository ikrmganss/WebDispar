import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from '../../components/PageHeader';
import {
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaRegClock,
  FaYoutube,
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaRegPaperPlane,
} from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const HubungiKami = () => {
  const { language } = useLanguage();
  const isEn = language === 'EN';

  const [form, setForm] = useState({ nama: '', email: '', subjek: '', pesan: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setForm({ nama: '', email: '', subjek: '', pesan: '' });
  };

  const kontak = [
    {
      icon: FaLocationDot,
      title: isEn ? 'Office Address' : 'Alamat Kantor',
      value: isEn
        ? 'Jalan Dewi Sartika No. 45 Palu, Postal Code 94121\nSouth Palu, Central Sulawesi, Indonesia'
        : 'Jalan Dewi Sartika Nomor 45 Palu, Kode Pos 94121\nPalu Selatan, Sulawesi Tengah, Indonesia',
      color: 'from-red-500 to-red-700',
    },
    {
      icon: FaPhone,
      title: isEn ? 'Phone' : 'Telepon',
      value: '(0451) 483942',
      href: 'tel:0451483942',
      color: 'from-green-500 to-green-700',
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      value: 'dispar@sultengprov.go.id',
      href: 'mailto:dispar@sultengprov.go.id',
      color: 'from-blue-500 to-blue-700',
    },
    {
      icon: FaRegClock,
      title: isEn ? 'Working Hours' : 'Jam Kerja',
      value: isEn
        ? 'Monday - Friday: 08.00 - 16.00 WITA\nSaturday - Sunday: Closed'
        : 'Senin - Jumat: 08.00 - 16.00 WITA\nSabtu - Minggu: Tutup',
      color: 'from-purple-500 to-purple-700',
    },
  ];

  const social = [
    {
      icon: FaYoutube,
      label: 'Dinas Pariwisata Sulteng',
      href: 'https://youtube.com',
      color: 'hover:bg-red-600',
    },
    {
      icon: FaInstagram,
      label: 'dinaspariwisatasulteng',
      href: 'https://instagram.com',
      color: 'hover:bg-pink-600',
    },
    {
      icon: FaTiktok,
      label: 'dispar.sulteng',
      href: 'https://tiktok.com',
      color: 'hover:bg-black',
    },
    {
      icon: FaFacebook,
      label: 'Dinas Pariwisata Sulawesi Tengah',
      href: 'https://facebook.com',
      color: 'hover:bg-blue-600',
    },
  ];

  return (
    <>
      <Helmet>
        <title>{isEn ? 'Contact Us - Tourism Office Central Sulawesi' : 'Hubungi Kami - Dinas Pariwisata Sulteng'}</title>
      </Helmet>

      <PageHeader
        badge={isEn ? "Contact & Location Services" : "Layanan Kontak & Lokasi"}
        title={isEn ? "Contact Us" : "Hubungi Kami"}
        subtitle={
          isEn
            ? "We are ready to assist your inquiries regarding regional tourism, partnerships, and consultation"
            : "Kami siap melayani kebutuhan informasi, kemitraan, dan konsultasi kepariwisataan Anda"
        }
        breadcrumbs={[
          { label: isEn ? 'Profile' : 'Profil', path: '/profil' },
          { label: isEn ? 'Contact Us' : 'Hubungi Kami' }
        ]}
      />

      <section className="py-12 lg:py-16">
        <div className="container-custom">
          {/* Info Kontak */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {kontak.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="card p-6"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-4`}
                >
                  <item.icon size={22} />
                </div>
                <h3 className="font-bold text-navy-900 mb-2">{item.title}</h3>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-primary-600 hover:text-primary-800 font-semibold text-sm transition-colors block"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-gray-600 text-sm whitespace-pre-line leading-relaxed">
                    {item.value}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Maps */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card overflow-hidden"
            >
              <div className="relative aspect-video w-full bg-slate-100">
                <iframe
                  title="Peta Kantor Dinas Pariwisata Provinsi Sulawesi Tengah"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.3148118671607!2d119.8824838!3d-0.9103212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d8bef4723caea41%3A0x6b29f9bc57f13098!2sDinas%20Pariwisata%20Daerah%20Provinsi%20Sulawesi%20Tengah!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="p-5">
                <h2 className="font-bold text-navy-900">
                  {isEn ? 'Tourism Office Location' : 'Lokasi Kantor Dinas Pariwisata'}
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  {isEn ? 'Jalan Dewi Sartika No. 45, Palu, Central Sulawesi' : 'Jalan Dewi Sartika Nomor 45, Palu, Sulawesi Tengah'}
                </p>
                <a
                  href="https://maps.app.goo.gl/KET7RCLtQzEHyH7E7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-800"
                >
                  <FaLocationDot aria-hidden="true" />
                  {isEn ? 'Open location on Google Maps' : 'Buka lokasi di Google Maps'}
                </a>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <h2 className="text-2xl font-bold text-navy-900 mb-2">
                {isEn ? 'Send Message' : 'Kirim Pesan'}
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                {isEn ? 'Fill out the form below and our team will respond shortly' : 'Isi formulir di bawah ini, kami akan segera merespon'}
              </p>

              {sent && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                  {isEn ? '✓ Your message has been sent successfully. Thank you!' : '✓ Pesan Anda berhasil terkirim. Terima kasih!'}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {isEn ? 'Full Name' : 'Nama Lengkap'}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.nama}
                    onChange={(e) => setForm({ ...form, nama: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                    placeholder={isEn ? "Enter your name" : "Masukkan nama Anda"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {isEn ? 'Subject' : 'Subjek'}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.subjek}
                    onChange={(e) => setForm({ ...form, subjek: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                    placeholder={isEn ? "Message subject" : "Subjek pesan"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {isEn ? 'Message' : 'Pesan'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.pesan}
                    onChange={(e) => setForm({ ...form, pesan: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all resize-none"
                    placeholder={isEn ? "Write your message here..." : "Tulis pesan Anda di sini..."}
                  />
                </div>
                <button type="submit" className="btn-primary w-full justify-center">
                  <FaRegPaperPlane size={18} /> {isEn ? 'Send Message' : 'Kirim Pesan'}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Social Media */}
          <div className="mt-12 card p-8 text-center">
            <h2 className="text-2xl font-bold text-navy-900 mb-2">
              {isEn ? 'Follow Us' : 'Ikuti Kami'}
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              {isEn ? 'Stay updated through our official social media channels' : 'Dapatkan informasi terbaru melalui media sosial resmi kami'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {social.map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 text-gray-700 hover:text-white ${s.color} transition-all font-medium text-sm`}
                >
                  <s.icon size={18} />
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HubungiKami;
