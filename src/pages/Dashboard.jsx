import React from 'react';

import Header from '../components/Dashboard/Header';
import MainContent from '../components/Dashboard/MainContent';

const Layout = () => {
  return (
    <div className="flex min-h-screen">
  
      <div className="flex flex-col w-full">
        <Header />
        <MainContent />
        
      </div>
    </div>
  );
};

export default Layout;
