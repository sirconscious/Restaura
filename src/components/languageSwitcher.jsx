// src/components/LanguageSwitcher.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import flagEn from '../assets/kingdom-flag.jpg';
import flagFr from '../assets/flag-france.jpg';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    
//     <button 
 
//   className=" m-4 text-sm px-4 py-2 bg-gray-800 bg-opacity-40 text-white rounded-xl hover:bg-gray-700 transition duration-300   focus:ring-gray-500"
// >
  <img  onClick={toggleLanguage}  src={i18n.language === 'en' ? flagFr : flagEn} alt="flag" className='ml-4 lg:ml-4 sm:mb-4 transition-all w-10 cursor-pointer  ' />

// </button>

  );
};

export default LanguageSwitcher;
