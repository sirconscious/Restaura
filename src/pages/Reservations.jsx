import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoArrowBackCircleOutline } from "react-icons/io5";

function Reservations() {
    const [count, setCount] = useState(1);
    const [tables, setTables] = useState(null);
    const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
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

        const url = "http://localhost/testLogin/Reservations.php";
        let fdata = new FormData();
        fdata.append('guests', count);
        fdata.append('date', date);
        fdata.append('time', time);
        fdata.append('username', "ilyas");
        if (selectedTable !== null) {
            fdata.append('table_id', selectedTable);
        }

        axios.post(url, fdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                console.log("Response received:", response.data);
                if (response.data.status === "success" && response.data.data.length > 0) {
                    setTables(response.data.data);
                    setError("");
                    setBackToForm(true); // Show the reservation form again
                } else {
                    setTables([]);
                    setError("No available tables found.");
                }
            })
            .catch((error) => {
                console.error("Error in request:", error);
                setError("Failed to make the reservation. Please try again.");
            });
    };

    return (

        <div className="w-full min-h-screen flex items-center justify-center bg-slate-100">
            <div className="w-full w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 bg-slate-100 p-6 md:p-8">

                {/* Reservation Form */}
                <div className="flex flex-col justify-center items-center text-center bg-white bg-opacity-90 p-6 md:p-8 rounded-lg shadow-xl max-w-md w-full mx-auto">
                    {backToForm ? (
                        <>
                            <button onClick={() => setBackToForm(false)} className="mb-4">
                                <IoArrowBackCircleOutline size={50} />
                            </button>
                            {tables && tables.length > 0 ? (
                                <ul className="divide-y divide-gray-200 w-full">
                                    {tables.filter((table) => table.reserved === 0).map((table) => (
                                        <li key={table.table_id} className="py-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-lg font-bold">Table {table.table_id}</span>
                                                <button
                                                    onClick={() => handleTableSelection(table.table_id)}
                                                    className={`bg-${selectedTable === table.table_id ? 'green' : 'blue'}-500 hover:bg-${selectedTable === table.table_id ? 'green' : 'blue'}-700 text-white font-bold py-2 px-4 rounded`}
                                                >
                                                    {selectedTable === table.table_id ? "Selected" : "Select"}
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="text-red-500 text-sm mt-2">{error}</div>
                            )}
                            <button
                                onClick={handleSubmit || setBackToForm(false)}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
                            >
                                Reserve
                            </button>
                        </>
                    ) : (
                        <>
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-700 mb-4 md:mb-8">Reserve a Table</h1>
                            <p className="font-semibold text-lg md:text-xl mb-4 md:mb-6">Make your reservation now</p>
                            <form onSubmit={handleSubmit} className="space-y-4 w-full">
                                <input
                                    type="date"
                                    name="date"
                                    id="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="border-2 border-neutral-950 p-3 w-full rounded-md"
                                />
                                <input
                                    type="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="border-2 border-neutral-950 p-3 w-full rounded-md"
                                />
                                {error && (
                                    <div className="text-red-500 text-sm mt-2">{error}</div>
                                )}
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
                                            type="text"
                                            value={count}
                                            onChange={handleChange}
                                            className="text-center px-3 py-3 border-t-2 border-b-2 border-neutral-950 lg:w-72 md:w-20"
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
                                <input
                                    type="submit"
                                    value="Find a Table"
                                    className="text-slate-50 bg-slate-700 w-full mt-4 md:mt-6 py-3 rounded-md font-semibold hover:bg-slate-800"
                                />
                            </form>
                        </>
                    )}
                </div>

                {/* Location Section */}
                <div className="bg-white bg-opacity-90 p-6 md:p-8 rounded-lg shadow-2xl w-full mx-auto">
                    <div className="w-full bg-slate-200 p-6 md:p-8 flex flex-col items-center ">
                        <h2 className="text-3xl md:text-5xl font-semibold mb-4">Our Location</h2>
                        <p className="text-lg md:text-xl">123 Restaura Street</p>
                        <p className="text-lg md:text-xl">City, Country</p>
                        <p className="text-lg md:text-xl mb-4">Phone: (123) 456-7890</p>

                        {/* Google Maps Embed */}
                        <div className="mt-6 mb-6 w-full h-64 md:h-80">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.655747614472!2d-122.0842494!3d37.4219999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb5d1b7e24661%3A0x4a3b6a22ab4d6f73!2sGoogleplex!5e0!3m2!1sen!2sus!4v1636950308331!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                allowFullScreen=""
                                loading="lazy"
                                className="rounded-md"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );

}

export default Reservations;
