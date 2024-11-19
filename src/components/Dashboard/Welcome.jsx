import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';

const Welcome = () => {
 

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center" id='welcome'>
      <FaUserCircle className="text-6xl text-blue-500 mx-auto mb-4" />
      <div className="text-xl font-bold text-gray-800">
        Welcome, Admin!
      </div>
      <p className="text-sm text-gray-600 mt-2">Have a great day managing the dashboard!</p>
    </div>
  );
};

export default Welcome;
