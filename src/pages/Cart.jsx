import React, { useState } from 'react';
import { TbX } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import SuggestOfMeals from './SuggestOfMeals';

export default function Cart({ orderdMeals, handleRemoveFromCart, handleClearCart, drinks, handleAddToCart }) {
    const navigate = useNavigate();
    const [showSuggestions, setShowSuggestions] = useState(false);
    
    const [skipSuggestions, setSkipSuggestions] = useState(false); 

    const suggestDrink = orderdMeals.filter((item) => item.category === "international");

    function handleRemoveSuggestion() {
        setShowSuggestions(false);
        setSkipSuggestions(true); 
        
    }

    function handlereserve() {
       
        if (!skipSuggestions && suggestDrink.length === 0) {
            setShowSuggestions(true);
        } else {
            navigate(`/Payment?total=${orderdMeals.reduce((acc, meal) => acc + meal.price * meal.qt, 0)}&orderdMeals=${JSON.stringify(orderdMeals)}`);
        }
    }

    return (
        <div className="z-30 bg-white bg-opacity-95 p-6 sm:p-8 rounded-lg shadow-lg fixed right-0 top-20 mt-10 w-full sm:w-1/3 lg:w-1/4 ">
            {
                showSuggestions && (
                    <SuggestOfMeals drinks={drinks} handleRemoveSuggestion={handleRemoveSuggestion} handleAddToCart={handleAddToCart} />
                )
            }
            <div className="overflow-y-auto h-96">
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
                        onClick={handlereserve}
                    >
                        Reserve
                    </button>
                </div>
            )}
        </div>
    );
}
