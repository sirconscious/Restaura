import React from 'react';
import axios from 'axios';
import { TbX } from "react-icons/tb";
export default function Cart({ orderdMeals, handleRemoveFromCart, handleClearCart }) {
    console.log(orderdMeals);
    console.log(localStorage.getItem('reserve_info'));

    const handleAddReservation = () => {
        const reserve_info = JSON.parse(localStorage.getItem('reserve_info'));
        const url = "http://localhost/riadapis/index.php?action=reserve";
        let fdata = new FormData();
        fdata.append('guests', reserve_info.guests);
        fdata.append('date', reserve_info.date);
        fdata.append('time', reserve_info.time);
        fdata.append('username', reserve_info.username);
        fdata.append('table_id', reserve_info.table_id);
        fdata.append("total_price", orderdMeals.reduce((acc, meal) => acc + meal.price * meal.qt, 0));
        fdata.append('meals', JSON.stringify(orderdMeals));

        axios.post(url, fdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                console.log(response.data);
                if (response.data.status === "success") {
                    console.log(response);
                }
            })
            .catch((error) => {
                console.error("Error in request:", error);
            });
    }

    return (
        <div className="z-30 bg-white bg-opacity-95 p-6 sm:p-8 rounded-lg shadow-lg fixed left-1/2 transform -translate-x-1/2 top-20 mt-10 w-full sm:w-3/4 lg:w-1/2">
            <div className="overflow-y-auto max-h-80">
                {orderdMeals.map((meal, index) => (
                    <div key={index} className="flex justify-between items-center border-b border-gray-300 py-4">
                        <div className="flex flex-col">
                            <h1 className="font-semibold text-lg text-gray-800">{meal.name}</h1>
                            <p className="text-sm text-gray-600">{meal.description}</p>
                            <p className="font-bold text-green-600">{meal.price} MAD</p>
                            <p className="text-sm text-gray-500">Quantity: {meal.qt}</p>
                        </div>
                        <button
                            className="bg-red-600 text-white rounded-lg p-2 hover:bg-red-700 transition-all duration-200"
                            onClick={() => handleRemoveFromCart(meal)}
                        >
                            <TbX />
                        </button>
                    </div>
                ))}
                <div className="mt-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                        Total: {orderdMeals.reduce((acc, meal) => acc + meal.price * meal.qt, 0)} MAD
                    </h3>
                </div>
            </div>

            {/* Buttons */}
            {orderdMeals.length > 0 && (
                <div className="flex justify-between mt-6">
                    <button
                        className="bg-red-700 text-white rounded-lg py-2 px-4 hover:bg-red-800 transition-all duration-200"
                        onClick={handleClearCart}
                    >
                        Clear Cart
                    </button>
                    <button
                        className="bg-green-700 text-white rounded-lg py-2 px-4 hover:bg-green-800 transition-all duration-200"
                        onClick={handleAddReservation}
                    >
                        Reserve
                    </button>
                </div>
            )}
        </div>
    );
}
