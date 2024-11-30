import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { tablesInfo } from '../constants/index';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import table1 from '../assets/table1.png';
import Meals from './Meals';
function Reservations() {
    const [count, setCount] = useState(1);
    const [tables, setTables] = useState(null);
    const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
    const [showMeals, setShowMeals] = useState(false);
    const [time, setTime] = useState(() => {
        const current = new Date();
        return `${current.getHours().toString().padStart(2, '0')}:${current.getMinutes().toString().padStart(2, '0')}`;
    });
    const [error, setError] = useState("");
    const [selectedTable, setSelectedTable] = useState(null);
    const [backToForm, setBackToForm] = useState(false);

    const handleIncrement = () => setCount(prevCount => Math.min(15, prevCount + 1));
    const handleDecrement = () => setCount(prevCount => Math.max(1, prevCount - 1));

    const handleChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setCount(isNaN(value) ? 1 : Math.min(15, Math.max(1, value)));
    };
    const handleTableSelection = (table_id) => {
        setSelectedTable(table_id);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentDate = new Date();
        const selectedDate = new Date(date + 'T' + time);

        if (selectedDate < currentDate) {
            setError("Selected date and/or time cannot be in the past");
            return;
        } else {
            setError("");
        }

        const url = "http://localhost/riadapis/index.php?action=findTables";

        if (selectedTable !== null) {
            fdata.append('table_id', selectedTable);
        }

        axios.get(url, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                console.log(response.data); // Check the structure of the response
                if (response.data.status === "success") {
                    console.log(response);
                    setTables(response.data.tables); // Populate tables with the available data
                    setError("");
                    setBackToForm(true);
                } else {
                    setTables([]);
                    setError(response.data.message || "No available tables found.");
                }
            })
            .catch((error) => {
                console.error("Error in request:", error);
                setError("Failed to make the reservation. Please try again.");
            });

    };
    function handlereserve() {
        if (selectedTable === null) {
            setError("Please select a table.");
            return;
        } else {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            localStorage.setItem("reserve_info", JSON.stringify({
                guests: count, date: date,
                time: time, table_id: selectedTable, username: userInfo["username"]
            }));
            setShowMeals(true);
        }
       
    }
    const getTableInfo = (tableId) => {
        return tablesInfo.find(table => table.table_id === tableId);
    };

    return (
        showMeals ? (
            <Meals />
        ) : (
            <div className="w-full min-h-screen flex items-center justify-center bg-[url('/src/assets/Riadsss.png')] bg-cover bg-center">
                <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                    {/* Reservation Form */}
                    <div className="flex flex-col justify-center items-center text-center bg-white bg-opacity-80 p-8 rounded-lg shadow-xl max-w-md mx-auto">
                        {backToForm ? (
                            <>
                                <button
                                    onClick={() => setBackToForm(false)}
                                    className="mb-6 text-gray-700 hover:text-gray-900 flex items-center gap-2"
                                    aria-label="Go back to form"
                                >
                                    <IoArrowBackCircleOutline size={40} className="transition-transform hover:scale-110" />
                                    <span className="font-medium text-base">Back to Form</span>
                                </button>
                                {tables && tables.length > 0 ? (
                                    <div className="grid grid-cols-1 gap-6 w-full max-h-96 overflow-y-auto">
                                        {tables
                                            .filter((table) => table.reserved === 0)
                                            .map((table) => {
                                                const tableDetails = getTableInfo(table.table_id);
                                                return (
                                                    <div
                                                        key={table.table_id}
                                                        className="bg-gray-100 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex justify-between items-center"
                                                    >
                                                        <div className="flex items-center space-x-4">
                                                            <img
                                                                src={table1}
                                                                alt={`Table ${table.table_id}`}
                                                                className="w-20 h-20 rounded-lg object-cover"
                                                            />
                                                            <div className="text-left">
                                                                <h3 className="text-lg font-semibold text-gray-900">
                                                                    Table {table.table_id}
                                                                </h3>
                                                                {tableDetails && (
                                                                    <>
                                                                        <p className="text-gray-700">{tableDetails.description}</p>
                                                                        {/* <p className="text-sm text-gray-600">
                                                                            Max Capacity: {tableDetails.max_capacity}
                                                                        </p> */}
                                                                        <ul className="text-sm text-gray-600">
                                                                            {tableDetails.features.map((feature, index) => (
                                                                                <li key={index}>• {feature}</li>
                                                                            ))}
                                                                        </ul>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => handleTableSelection(table.table_id)}
                                                            className={`${selectedTable === table.table_id ? 'bg-green-500' : 'bg-blue-500'
                                                                } text-white font-medium py-2 px-4 rounded hover:opacity-90`}
                                                        >
                                                            {selectedTable === table.table_id ? 'Selected' : 'Select'}
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                ) : (
                                    <div className="text-red-500 text-sm mt-2">
                                        {error || 'No tables available.'}
                                    </div>
                                )}
                                <button
                                    onClick={handlereserve}
                                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded w-full mt-4"
                                >
                                    Proceed to Meals
                                </button>
                            </>
                        ) : (
                            <>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Reserve a Table</h1>
                                <form onSubmit={handleSubmit} className="space-y-6 w-full">
                                    <input
                                        type="date"
                                        name="date"
                                        id="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="border border-gray-400 p-3 w-full rounded-md"
                                    />
                                    <input
                                        type="time"
                                        name="time"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        className="border border-gray-400 p-3 w-full rounded-md"
                                    />
                                    {error && <p className="text-red-500 text-sm">{error}</p>}
                                    <div className="flex items-center mt-4">
                                        <button
                                            type="button"
                                            onClick={handleDecrement}
                                            className="px-4 py-3 bg-white border-2 border-neutral-950 hover:bg-gray-400 rounded-l-md text-gray-700"
                                        >
                                            -
                                        </button>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={count}
                                                onChange={handleChange}
                                                className="text-center px-3 py-3 border-t-2 border-b-2 border-neutral-950 lg:w-72 md:w-60 w-48 focus:outline-none"
                                                min="1"
                                                max="15"
                                            />
                                            <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">guests</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleIncrement}
                                            className="px-4 py-3 bg-white hover:bg-gray-400 rounded-r-md border-2 border-neutral-950 text-gray-700"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white py-3 w-full rounded-md font-medium"
                                    >
                                        Find a Table
                                    </button>
                                </form>
                            </>
                        )}
                    </div>

                    {/* Location Section */}
                    <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Our Location</h2>
                        <p className="text-lg text-gray-700 text-center mb-4">Ista Ntic Syba, Marrakech, Morocco</p>
                        <p className="text-lg text-gray-700 text-center mb-6">Phone: (212) 156-7890</p>
                        <iframe
src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13239.135935661187!2d-7.9654204!3d31.5987957!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafefd72c155555%3A0x48c2c108c7c6008c!2sInstitut%20Sp%C3%A9cialis%C3%A9%20De%20Technologie%20Appliqu%C3%A9e%20NTIC!5e0!3m2!1sen!2sma!4v1699201571234!5m2!1sen!2sma"                            className="w-full h-64 rounded-md"
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </div>


        )
    );
}
export default Reservations;
