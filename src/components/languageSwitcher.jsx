// src/components/LanguageSwitcher.js
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    
    <button 
  onClick={toggleLanguage} 
  className=" m-4 text-sm px-4 py-2 bg-gray-800 bg-opacity-40 text-white rounded-xl hover:bg-gray-700 transition duration-300   focus:ring-gray-500"
>
  {i18n.language === 'en' ? 'Fr' : 'En'}
</button>

  );
};

export default LanguageSwitcher;
