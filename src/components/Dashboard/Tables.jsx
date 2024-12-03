import React, { useState, useEffect } from "react";
import axios from "axios";

const TableUpdate = () => {
  const [tables, setTables] = useState([]);
  const [selectedTableId, setSelectedTableId] = useState("");
  const [reserved, setReserved] = useState(true);

  useEffect(() => {
    // Fetch the list of unavailable tables from the API
    const fetchTables = async () => {
      try {
        const response = await axios.get(
          "http://localhost/riadapis/index.php?action=tables"
        );
        setTables(response.data); // Assuming the response has 'tables'
      } catch (error) {
        console.error("Error fetching tables:", error);
      }
    };
    fetchTables();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost/riadapis/index.php?action=updateTables",
        {
          table_id: selectedTableId,
          reserved: reserved ? 1 : 0,
        }
      );

      // Log the response for debugging
      console.log("Response Data:", response.data);

      // Handle the response appropriately
      if (response.data.message) {
        alert(response.data.message); // Success message
      } else if (response.data.error) {
        alert(response.data.error); // Error message
      } else {
        alert("Unexpected response from the server");
      }
    } catch (error) {
      console.error("Error updating table status:", error);
      alert("Error updating table status.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Select Table
        </label>
        <select
          value={selectedTableId}
          onChange={(e) => setSelectedTableId(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">-- Select an Unavailable Table --</option>
          {tables.map((table) => (
            <option key={table.table_id} value={table.table_id}>
              Table {table.table_id} (Reserved by: {table.reserved_by})
            </option>
          ))}
        </select>
      </div>

      {selectedTableId && (
        <>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={reserved}
                onChange={(e) => setReserved(e.target.checked)}
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
              <span className="ml-2 text-sm text-gray-700">Reserved</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none"
          >
            Update Table Status
          </button>
        </>
      )}
    </form>
  );
};

export default TableUpdate;
