import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';  // Import useTranslation
import { FaTimes, FaBars } from 'react-icons/fa';
import { LINKS } from '../constants/index';
import { Outlet, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import LanguageSwitcher from './languageSwitcher';

export default function NavBar() {
  const [showAll, setShowALL] = useState(true);
  const[ location , setLocation] = useState(useLocation()); 

  useEffect(() => {
    
    if (location.pathname === "/signup" || location.pathname === "/login") {
      setShowALL(false);
    } else {
      setShowALL(true);
    }
  }, [location]); 

  const [isMobilemenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();  

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
    <>
      <nav className='fixed top-4 z-50 flex flex-col lg:flex-row-reverse w-full items-center justify-center text-slate-50'>
        <div className="hidden lg:block fixed top-8 lg:right-8 z-30">
          <LanguageSwitcher />
        </div>

        <div className="flex w-full items-center justify-between overflow-y-hidden backdrop-blur-md bg-black bg-opacity-30 lg:m-2 lg:w-[50rem] lg:rounded-full lg:shadow-lg py-5 px-4">
          <a href="#" className='text-base'>RiadSaveurs</a>

          {/* Show navigation links based on current page */}
          {showAll ? (
            <div className="hidden space-x-6 lg:flex">
              {LINKS.map((link, index) => (
                <a
                  key={index}
                  href={`#${link.targetId}`}
                  className={'text-sm hover:opacity-50'}
                  onClick={(e) => handleScroll(e, link.targetId)}
                >
                  {t(link.text)}
                </a>
              ))}
            </div>
          ) : (
            <Link to="/">Home</Link>
          )}

          <div className="lg:hidden">
            <button onClick={toggleMenu}>
              {isMobilemenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Condition */}
        {showAll && isMobilemenuOpen && (
          <div className="w-full backdrop-blur-lg lg:hidden">
            {LINKS.map((link, index) => (
              <a
                key={index}
                href={`#${link.targetId}`}
                className='block p-4 uppercase hover:opacity-50 tracking-tighter'
                onClick={(e) => handleScroll(e, link.targetId)}
              >
                {t(link.text)}
              </a>
            ))}
            
            <LanguageSwitcher />
           
          
          </div>
        )}
      </nav>
      <Outlet />
    </>
  );
}
