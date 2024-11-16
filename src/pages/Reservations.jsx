import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { tablesInfo } from '../constants/index';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import table1 from '../assets/table1.png';
import DishCard from '../components/DishCard';
import { DISHES } from '../constants/index';
import { useTranslation } from 'react-i18next';
import { GrLinkNext } from "react-icons/gr";
import { s } from 'framer-motion/client';
import { Meals } from '../constants/index';
function Reservations() {
    const { t } = useTranslation();
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
    const [selectMeals, setSelectMeals] = useState(null);

    const [showMeals, setShowMeals] = useState(false); // Lowercase 's' in showMeals
    // const [reservation_id, setreservation_id] = useState(null);
    // const categories = [...new Set(Meals.map((meal) => meal.category))];

    const [showQuentity, setShowQuantity] = useState(false);
    const handleIncrement = () => setCount(prevCount => Math.min(15, prevCount + 1));
    const handleDecrement = () => setCount(prevCount => Math.max(1, prevCount - 1));

    const handleChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setCount(isNaN(value) ? 1 : Math.min(15, Math.max(1, value)));
    };

    const handleTableSelection = (table_id) => {
        setSelectedTable(table_id);
        setShowMeals(false); // Use setShowMeals instead of ShowMeals
    };

    const handleMealSelection = () => {
        setShowMeals(true); // Show meal selection after table selection
    };

    const handleSelectMeals = (id) => {
        setSelectMeals(id); // Ensure setSelectMeals is properly defined
        console.log(`Meal ${id} selected`); // Debugging log
        setShowQuantity(!showQuentity);
    };

    const handleBackToForm = () => {
        setBackToForm(false);
        setSelectedTable(null);
        setShowMeals(false);
        setSelectMeals(null);
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
        fdata.append('username', "ayoub");
        if (selectedTable !== null) {
            fdata.append('table_id', selectedTable);
        }
        if (selectMeals !== null) {
            fdata.append('meal_id', selectMeals);
        }

        axios.post(url, fdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                console.log(response.data);
                if (response.data.status === "success") {
                    setTables(response.data.data);
                    setError("");
                    setBackToForm(true);
                    //   setreservation_id(response.data.reservation_id);
                    const reservation_id = response.data.data[0].reservation_id;
                    console.log("Reservation ID:", reservation_id);
                    console.log(response.data);
                }
            })
            .catch((error) => {
                console.error("Error in request:", error);
                setError("Failed to make the reservation. Please try again.");
            });



    };
    function handleConfirmReservation(e) {
        e.preventDefault();

    }

    const categories = [...new Set(Meals.map((meal) => meal.category))];
    const [filter, setFilter] = useState("All");
    const getTableInfo = (tableId) => {
        return tablesInfo.find(table => table.table_id === tableId);
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-[url('/src/assets/Riadsss.png')] bg-cover bg-center">
            <div className="w-full w-xl mx-auto grid  gap-8 lg:gap-16 p-6">
                <div className={`flex flex-col justify-center items-center text-center bg-white bg-opacity-50 p-6 rounded-lg shadow-xl w-full mx-auto ${showMeals ? "mt-20" : "max-w-md"}`}>
                    {
                        showMeals ? (
                            <div className="mt-4 flex flex-col justify-center items-center">
                                {/* <h2 className="text-5xl font-bold mb-4">Select Meals</h2> */}


                                {/* {categories.map((category) => (
                                    <div key={category} className="w-full mb-8">
                                        <h3 className="text-3xl font-semibold text-center mb-6">{category}</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                                            
                                            {Meals.filter((Meal) => Meal.category === category).map((Meal, dishIndex) => (
                                                <div key={dishIndex} className="bg-white border border-gray-300 rounded-lg p-4">
                                                    <img
                                                        src={Meal.image}
                                                        alt={Meal.title}
                                                        className="w-full h-40 object-cover rounded-lg mb-4"
                                                    />
                                                    <h3 className="text-xl font-bold">{Meal.title}</h3>
                                                    <p className="text-gray-700 mb-2">{Meal.description}</p>
                                                    <p className="text-lg font-semibold mb-4">{Meal.price} DH</p>

                                                    {showQuentity && selectMeals === dishIndex ? (
                                                        <div className="flex items-center justify-center mt-4">
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
                                                                    className="text-center px-3 py-3 border-t-2 border-b-2 border-neutral-950 lg:w-40 md:w-20"
                                                                    min="1"
                                                                    max="15"
                                                                />
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={handleIncrement}
                                                                className="px-4 py-3 bg-white hover:bg-gray-400 rounded-r-md border-2 border-neutral-950 text-gray-700"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleSelectMeals(dishIndex)}
                                                            className="text-slate-800 font-bold py-2 px-4 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 mt-6 w-28 text-center text-xl"
                                                        >
                                                            Select
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))} */}
                                <div className="flex gap-4 mb-8">
                                    <button
                                        onClick={() => setFilter("All")}
                                        className="bg-gray-500 text-white px-6 py-2 rounded-md transition-all hover:bg-gray-600"
                                    >
                                        All
                                    </button>
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setFilter(category)}
                                            className="bg-gray-500 text-white px-6 py-2 rounded-md transition-all hover:bg-gray-600"
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>


                                <div className="w-full overflow-y-auto max-h-screen ">
                                    {filter === "All" ? (

                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                                            {Meals.map((meal) => (
                                                <div
                                                    key={meal.id}
                                                    className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 flex flex-col items-center"
                                                >
                                                    <img
                                                        src={meal.image}
                                                        alt={meal.title}
                                                        className="w-full h-40 object-cover rounded-lg mb-4"
                                                    />
                                                    <h3 className="text-xl font-semibold mb-2">{meal.title}</h3>
                                                    <p className="text-gray-600 text-sm mb-2">{meal.description}</p>
                                                    <p className="text-lg font-semibold mb-4">{meal.price} DH</p>

                                                    {/* Quantity Selection */}
                                                    {showQuentity && selectMeals === meal.id ? (
                                                        <div className="flex items-center justify-center mt-4">
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
                                                                    className="text-center px-3 py-3 border-t-2 border-b-2 border-neutral-950 lg:w-40 md:w-20"
                                                                    min="1"
                                                                    max="15"
                                                                />
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={handleIncrement}
                                                                className="px-4 py-3 bg-white hover:bg-gray-400 rounded-r-md border-2 border-neutral-950 text-gray-700"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleSelectMeals(meal.id)}
                                                            className="text-slate-800 font-bold py-2 px-4 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 mt-6 w-28 text-center text-xl"
                                                        >
                                                            Select
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        // If filter is a specific category, show meals of that category only
                                        categories
                                            .filter((category) => category === filter)
                                            .map((category) => {
                                                const filteredMeals = Meals.filter((meal) => meal.category === category);

                                                return (
                                                    <div key={category} className="mt-4">
                                                        <h3 className="text-3xl font-semibold text-center mb-6">{category}</h3>
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                                            {filteredMeals.map((meal) => (
                                                                <div
                                                                    key={meal.id}
                                                                    className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 flex flex-col items-center"
                                                                >
                                                                    <img
                                                                        src={meal.image}
                                                                        alt={meal.title}
                                                                        className="w-full h-40 object-cover rounded-lg mb-4"
                                                                    />
                                                                    <h3 className="text-xl font-semibold mb-2">{meal.title}</h3>
                                                                    <p className="text-gray-600 text-sm mb-2">{meal.description}</p>
                                                                    <p className="text-lg font-semibold mb-4">{meal.price} DH</p>

                                                                    {/* Quantity Selection */}
                                                                    {showQuentity && selectMeals === meal.id ? (
                                                                        <div className="flex items-center justify-center mt-4">
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
                                                                                    className="text-center px-3 py-3 border-t-2 border-b-2 border-neutral-950 lg:w-40 md:w-20"
                                                                                    min="1"
                                                                                    max="15"
                                                                                />
                                                                            </div>
                                                                            <button
                                                                                type="button"
                                                                                onClick={handleIncrement}
                                                                                className="px-4 py-3 bg-white hover:bg-gray-400 rounded-r-md border-2 border-neutral-950 text-gray-700"
                                                                            >
                                                                                +
                                                                            </button>
                                                                        </div>
                                                                    ) : (
                                                                        <button
                                                                            onClick={() => handleSelectMeals(meal.id)}
                                                                            className="text-slate-800 font-bold py-2 px-4 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 mt-6 w-28 text-center text-xl"
                                                                        >
                                                                            Select
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                );
                                            })
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 flex items-center justify-center px-6 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 mt-6 w-60 text-center text-2xl"
                                >
                                    Reserve <GrLinkNext className="ml-2 size-6" />
                                </button>
                            </div>
                        ) : (
                            backToForm ? (
                                <>
                                    <button onClick={handleBackToForm} className="mb-6 text-blue-500 hover:text-blue-700">
                                        <IoArrowBackCircleOutline size={50} />
                                    </button>
                                    {tables && tables.length > 0 ? (
                                        <ul className="divide-y divide-gray-200 w-full max-h-screen overflow-y-auto ">
                                            {tables.filter((table) => table.reserved === 0).map((table) => {
                                                const tableDetails = getTableInfo(table.table_id);
                                                return (
                                                    <li key={table.table_id} className="py-4 flex items-center justify-between">
                                                        <div className="flex items-center space-x-4">
                                                            <img
                                                                src={table1}
                                                                alt={`Table ${table.table_id}`}
                                                                className="w-20 h-20 rounded-lg object-cover"
                                                            />
                                                            <div>
                                                                <span className="text-lg font-bold">Table {table.table_id}</span>
                                                                {tableDetails && (
                                                                    <div className="text-left">
                                                                        <p className="text-base text-black">{tableDetails.description}</p>
                                                                        <p className="text-sm text-gray-800">Max Capacity: {tableDetails.max_capacity}</p>
                                                                        <ul className="text-sm text-gray-800">
                                                                            {tableDetails.features.map((feature, index) => (
                                                                                <li key={index}>• {feature}</li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => handleTableSelection(table.table_id)}
                                                            className={`bg-${selectedTable === table.table_id ? 'green' : 'blue'}-500 hover:bg-${selectedTable === table.table_id ? 'green' : 'blue'}-700 text-slate-800 font-bold py-2 px-4 rounded`}
                                                        >
                                                            {selectedTable === table.table_id ? "Selected" : "Select"}
                                                        </button>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    ) : (
                                        <div className="text-red-500 text-sm mt-2">{error}</div>
                                    )}
                                    <button
                                        onClick={handleMealSelection}
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
                                    >
                                        Select Meals
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
                                                    type="number"
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
                            )
                        )}
                </div>

                {/* Location Section */}
                 <div className="bg-white bg-opacity-90 p-6 md:p-8 rounded-lg shadow-2xl w-full mx-auto">
                    <div className="w-full bg-slate-200 p-2 md:p-8 flex flex-col items-center">
                        <h2 className="text-3xl md:text-5xl font-semibold mb-4">Our Location</h2>
                        <p className="text-lg md:text-xl">123 Restaura Street</p>
                        <p className="text-lg md:text-xl">Marrakech, Morocco</p>
                        <p className="text-lg md:text-xl mb-4">Phone: (212) 456-7890</p>

                        {/* Google Maps Embed */}
                 <div className=" w-full h-64 md:h-80">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.655747614472!2d-122.0842494!3d37.4219999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb5d1b7e24661%3A0x4a3b6a22ab4d6f73!2sGoogleplex!5e0!3m2!1sen!2sus!4v1636950308331!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                allowFullScreen=""
                                loading="lazy"
                                className="rounded-md h-full"
                            ></iframe>
                        </div>
                    </div>
                </div>  
            </div>
        </div>

    );
}

export default Reservations;
