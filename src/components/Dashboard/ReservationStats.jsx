import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaDollarSign, FaCalendarCheck, FaChair } from 'react-icons/fa';

const ReservationStats = () => {
  const [stats, setStats] = useState({
    totalPrice: 0,
    reservationCount: 0,
    tableReservedCount: 0, // New field
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservationStats = async () => {
      try {
        const response = await axios.get('http://localhost/riadapis/index.php?action=fetchStats');
        setStats(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reservation stats:', error);
        setLoading(false);
      }
    };

    fetchReservationStats();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md" id='stats'>
      <h2 className="text-xl font-semibold">Reservation Stats</h2>
      <div className="mt-4 space-y-4">
        {/* Total Price */}
        <div className="flex items-center">
          <div className="p-3 bg-green-100 text-green-600 rounded-full mr-3">
            <FaDollarSign />
          </div>
          <div>
            <p className="text-gray-500">Total Price</p>
            <p className="font-semibold">{stats.totalPrice} MAD</p>
          </div>
        </div>

        {/* Total Reservations */}
        <div className="flex items-center">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full mr-3">
            <FaCalendarCheck />
          </div>
          <div>
            <p className="text-gray-500">Total Reservations</p>
            <p className="font-semibold">{stats.reservationCount}</p>
          </div>
        </div>

        {/* Total Tables Reserved */}
        <div className="flex items-center">
          <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full mr-3">
            <FaChair />
          </div>
          <div>
            <p className="text-gray-500">Tables Reserved</p>
            <p className="font-semibold">{stats.tableReservedCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationStats;
