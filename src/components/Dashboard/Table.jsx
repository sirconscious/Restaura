import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReservationsTable = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost/riadapis/index.php?action=reservation');
        setReservations(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reservations:', error);
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleAction = async (reservationId, action) => {
    try {
      const response = await axios.post(
        'http://localhost/riadapis/index.php?action=updateReservation',
        {
          reservation_id: reservationId,
          action: action,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (action === 'delete') {
        // Filter out the deleted reservation from the state
        setReservations((prev) => prev.filter((res) => res.reservation_id !== reservationId));
      } else {
        // For approve and reject, update the status in the state
        setReservations((prev) =>
          prev.map((res) =>
            res.reservation_id === reservationId
              ? { ...res, status: action === 'approve' ? 'Approved' : action === 'reject' ? 'Rejected' : res.status }
              : res
          )
        );
      }
    } catch (error) {
      console.error(`Error handling action ${action}:`, error);
    }
  };
  
  

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg max-w-full mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Reservations</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-separate border-spacing-0 table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-center">
              <th className="py-2 px-3 border-b text-left">Username</th>
              <th className="py-2 px-3 border-b text-left">Reservation ID</th>
              <th className="py-2 px-3 border-b text-left">Email</th>
              <th className="py-2 px-3 border-b text-left">Location</th>
              <th className="py-2 px-3 border-b text-left">Date</th>
              <th className="py-2 px-3 border-b text-left">Time</th>
              <th className="py-2 px-3 border-b text-left">Table ID</th>
              <th className="py-2 px-3 border-b text-left">Price</th>
              <th className="py-2 px-3 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr
                key={reservation.reservation_id}
                className="text-center hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-2 px-3 border-b text-gray-600">{reservation.reserved_by}</td>
                <td className="py-2 px-3 border-b text-gray-600">{reservation.reservation_id}</td>
                <td className="py-2 px-3 border-b text-gray-600">{reservation.email}</td>
                <td className="py-2 px-3 border-b text-gray-600">{reservation.location}</td>
                <td className="py-2 px-3 border-b text-gray-600">{reservation.reservation_date.split(' ')[0]}</td>
                <td className="py-2 px-3 border-b text-gray-600">{reservation.reservation_time}</td>
                <td className="py-2 px-3 border-b text-gray-600">{reservation.table_id}</td>
                <td className="py-2 px-3 border-b text-gray-600">{reservation.total_price}</td>
                <td className="py-2 px-3 border-b text-gray-600">
                  <span
                    className={`py-1 px-2 rounded ${
                      reservation.status === 'Pending'
                        ? 'bg-yellow-300 text-yellow-800'
                        : reservation.status === 'Approved'
                        ? 'bg-green-300 text-green-800'
                        : reservation.status === 'Rejected'
                        ? 'bg-red-300 text-red-800'
                        : 'bg-gray-300 text-gray-800'
                    }`}
                  >
                    {reservation.status}
                  </span>
                </td>
                <td className="py-4 px-3 border-b flex space-x-2 items-center justify-center">
                  <button
                    onClick={() => handleAction(reservation.reservation_id, 'approve')}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(reservation.reservation_id, 'reject')}
                    className="px-2 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleAction(reservation.reservation_id, 'delete')}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservationsTable;
