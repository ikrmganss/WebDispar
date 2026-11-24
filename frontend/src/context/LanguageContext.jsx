import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('dispar_language') || 'ID';
  });

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('dispar_language', lang);
    document.documentElement.lang = lang === 'EN' ? 'en' : 'id';
  };

  useEffect(() => {
    document.documentElement.lang = language === 'EN' ? 'en' : 'id';
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    return { language: 'ID', setLanguage: () => {} };
  }
  return context;
};

export default LanguageContext;
