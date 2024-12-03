import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function MealCard({ meal, imgSrc, handleAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [favorited, setFavorited] = useState(false);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const toggleFavorite = () => {
    setFavorited(!favorited);
  };

  return (
    <div className="w-full max-w-sm bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105 duration-300 overflow-hidden">
  {/* Image Section */}
  <div className="relative">
    <img
      src={imgSrc}
      alt={meal.name}
      className="object-cover w-full h-48 rounded-t-lg"
    />
    <div
      className="absolute top-3 right-3 bg-white bg-opacity-80 p-2 rounded-full shadow-sm cursor-pointer"
      onClick={toggleFavorite}
    >
      {favorited ? (
        <AiFillHeart className="text-red-600 text-xl transition duration-200" />
      ) : (
        <AiOutlineHeart className="text-red-600 text-xl transition duration-200" />
      )}
    </div>
    <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 px-3 py-1 rounded-md text-xs text-white shadow-md">
      <span className="font-medium">{meal.preparation_time}</span>
    </div>
  </div>

  {/* Meal Info */}
  <div className="p-6 space-y-4">
    <h2 className="text-xl font-semibold text-gray-800">{meal.name}</h2>
    <p className="text-sm text-gray-600 leading-relaxed">{meal.description}</p>
    <p className="text-lg font-bold text-gray-900">
      Price: <span className="text-red-600">{meal.price} MAD</span>
    </p>

    {/* Quantity Selector */}
    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center space-x-3">
        <label
          htmlFor="quantity"
          className="text-sm font-medium text-gray-700"
        >
          Quantity:
        </label>
        <input
          type="number"
          max={5}
          min={1}
          value={quantity}
          onChange={handleQuantityChange}
          name="quantity"
          className="w-16 text-center rounded-md border-gray-300 bg-gray-100 text-gray-800 focus:ring-2 focus:ring-red-400"
        />
      </div>

      <button
        className="py-2 px-4 text-white bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-400 rounded-lg font-medium text-sm transition-all duration-200"
        onClick={() => handleAddToCart({ ...meal, qt: quantity })}
      >
        Add to Cart
      </button>
    </div>
  </div>
</div>

  );
}