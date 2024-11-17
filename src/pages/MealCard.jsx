import React, { useState } from "react";

export default function MealCard({ meal, imgSrc, handleAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  return (
    <div className="w-full bg-gradient-to-br bg-white rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
      {/* Image Section */}
      <div className="relative">
        <img
          src={imgSrc}
          alt={meal.name}
          className="rounded-t-xl object-cover w-full h-48"
        />
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded text-sm text-white">
          <span className="font-semibold ">{meal.preparation_time}</span> mins
        </div>
      </div>

      {/* Meal Info */}
      <div className="p-5 flex flex-col">
        <h2 className="text-xl font-semibold mb-2">{meal.name}</h2>
        <p className="text-sm text-gray-600 mb-4">{meal.description}</p>
        <p className="text-lg font-bold text-black">
          Price: {meal.price} MAD
        </p>

        {/* Quantity Selector */}
        <div className="mt-3 flex items-center ">
          <label
            htmlFor="quantity"
            className="block text-sm font-medium mb-1"
          >
            Quantity:
          </label>
          <input
            type="number"
            max={5}
            min={1}
            defaultValue={1}
            onChange={handleQuantityChange}
            name="quantity"
            className="w-24 rounded ml-7 bg-gray-200 text-black px-2 py-1 focus:outline-none focus:ring focus:ring-black"
          />
        </div>


          <button
            className="w-40 py-2 text-black  border  hover:bg-neutral-900  hover:text-white
         focus:outline-none   text-xl px-5  text-center  border-neutral-900 mx-auto  mt-5  font-semibold rounded-lg transition-all duration-200"
            onClick={() => handleAddToCart({ ...meal, qt: quantity })}
          >
            Add to Cart
          </button>
        
      </div>
    </div>
  );
}
