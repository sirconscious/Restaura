// src/components/LanguageSwitcher.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import flagEn from '../assets/kingdom-flag.jpg';
import flagFr from '../assets/flag-france.jpg';
import { div } from 'framer-motion/client';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    

  <div className='p-4 lg:p-0'><img  onClick={toggleLanguage}  src={i18n.language === 'en' ? flagFr : flagEn } alt="flag" className='sm:ml-4 sm:mb-4 rounded-md border-gray-500 border transition-all w-9 cursor-pointer  ' /></div>



  );
};

export default LanguageSwitcher;
