import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';
// import logo from '../../assets/avatar.png';
import { MdMessage } from 'react-icons/md';

const Header = () => {
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    const sectionId = search.toLowerCase();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      alert('Section not found');
    }
  };

  return (
    <header className="flex items-center justify-between p-5 bg-white shadow-md">
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Type a keyword (e.g., stats, table)"
          className="pl-10 pr-3 py-2 border rounded-lg text-sm w-40 focus:w-48 transition-all duration-300"
        />
        <button onClick={handleSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">🔍</button>
      </div>
      <div className="flex items-center space-x-4 cursor-pointer">
        <span className="relative" onClick={() => (alert('New Reservation Added ')   )}>
          <FaBell className="text-gray-500 text-lg" />
          <span className="absolute -top-1 -right-1 bg-red-500 w-2.5 h-2.5 rounded-full"></span>
        </span>
        {/* <img src={logo} alt="User Avatar" className="w-8 h-8 rounded-full cursor-pointer" /> */}
      </div>
    </header>
  );
};

export default Header;
