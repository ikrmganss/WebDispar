import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Footer from './Footer';

export const MainLayout = ({ children, language, setLanguage }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F7F6] text-slate-900 flex flex-row antialiased">
      {/* Sidebar Kiri */}
      <Sidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Backdrop overlay saat drawer sidebar mobile terbuka */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Kolom Konten Utama di Sebelah Kanan */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Top Status Bar Biru/Ungu */}
        <Topbar onToggleMobile={() => setIsMobileOpen((prev) => !prev)} />

        {/* Isi Halaman */}
        <main className="flex-1 w-full">
          {children}
        </main>

        {/* Footer Bergradasi 4 Kolom */}
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
