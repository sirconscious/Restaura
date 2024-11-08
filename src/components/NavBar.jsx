import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';  // Import useTranslation
import { FaTimes, FaBars } from 'react-icons/fa';
import { LINKS } from '../constants/index';
import LanguageSwitcher from './languageSwitcher';

export default function NavBar() {
  const [isMobilemenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();  // Initialize translation hook

  const toggleMenu = () => {
    setIsMobileMenuOpen(prevState => !prevState);
  };

  const handleScroll = (event, targetId) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className='fixed top-4 z-50 flex flex-col lg:flex-row-reverse w-full items-center justify-center'>

         <div className="hidden lg:block fixed top-4 lg:right-4 z-30"> <LanguageSwitcher></LanguageSwitcher></div>
      <div className="flex w-full items-center justify-between overflow-y-hidden backdrop-blur-md bg-black bg-opacity-30 lg:m-2 lg:w-[50rem] lg:rounded-full lg:shadow-lg py-5 px-4">
       
        <a href="#" className='text-base'>RiadSaveurs</a>
        <div className="hidden space-x-6 lg:flex">
          {LINKS.map((link, index) => {
            return (
              <a
                key={index}
                href={`#${link.targetId}`}
                className={'text-sm  hover:opacity-50' }
                onClick={(e) => handleScroll(e, link.targetId)}
              >
                {t(link.text)} 
              </a>
            );
          })}
         
        </div>
        <div className="lg:hidden">
          <button onClick={toggleMenu}>
            {isMobilemenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      {isMobilemenuOpen && (
        <div className="w-full backdrop-blur-lg lg:hidden">
          {LINKS.map((link, index) => {
            return (
              <a
                key={index}
                href={`#${link.targetId}`}
                className='block p-4 uppercase hover:opacity-50 tracking-tighter'
                onClick={(e) => handleScroll(e, link.targetId)}
              >
                {t(link.text)} 
              </a>
            );
          })}
          <LanguageSwitcher></LanguageSwitcher>
        </div>
      )}
    </nav>
  );
}
