import React from "react";
import { FaGlassCheers } from "react-icons/fa";
import MealCard from "./MealCard";
import { mealImages } from "../constants";

export default function SuggestOfMeals({ drinks ,handleRemoveSuggestion,handleAddToCart}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50  bg-black bg-opacity-70">
      <div className="relative bg-gray-900 text-white rounded-lg shadow-2xl w-3/4 max-h-[90vh] overflow-y-auto">
   
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-4xl font-bold"
          onClick={() =>  handleRemoveSuggestion()}
        >
          &times;
        </button>

        <div className="flex flex-col items-center mb-6 p-4">
          <FaGlassCheers size={30} className="text-yellow-400" />
          <h3 className="text-xl font-bold text-center mt-2">
            How about a refreshing drink?
          </h3>
          <p className="text-gray-300 text-sm mt-1">
            Here are some drink suggestions for you!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6 px-6 pb-6">
          {drinks.map((drink, index) => (
            <MealCard
              sugg = {true}
              key={index}
              meal={drink}
              imgSrc={mealImages.find((item) => item.category === "international").images[index]} 
              handleAddToCart={handleAddToCart} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
