import React, { useState, useEffect } from "react";
import MealCard from "./MealCard";
import { FaCartShopping } from "react-icons/fa6";
import { mealImages } from '../constants/index'; // Make sure dish images are imported correctly
import Cart from "./Cart";
import PreparationTime from "./PreparationTime";
import { TbX } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

export default function Meals() {
  const [meals, setMeals] = useState([]);
  const [orderdMeals, setOrderedMeals] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [filter, setFilter] = useState("All");
  const [validPreparationTime, setValidPreparationTime] = useState(true);
  const [invalidMeal, setInvalidMeal] = useState({});
  const [showAllCategories, setShowAllCategories] = useState(false);
  const reserveInfo = JSON.parse(localStorage.getItem("reserve_info"));

  const Prep_timeToMinutes = (preparationTime) => {
    if (!preparationTime) return 0;
    const parts = preparationTime.split(" ");
    let hours = 0;
    let minutes = 0;

    if (parts[0] && parts[0].includes("h")) {
      hours = parseInt(parts[0].replace("h", "")) || 0;
    }
    if (parts[1] && parts[1].includes("m")) {
      minutes = parseInt(parts[1].replace("m", "")) || 0;
    }
    return hours * 60 + minutes;
  };

  const handleAddToCart = (meal) => {
    console.log("The meal", meal);
    const preparationTime = meal.preparation_time || "0 m";
    const currentTime = new Date();
    const preparationTimeInMinutes = Prep_timeToMinutes(preparationTime);

    const reservationDateTime = new Date(`${reserveInfo.date}T${reserveInfo.time}`);
    const simalareMeal = orderdMeals.find((item) => item.meal_id === meal.meal_id);
    console.log("the simalare meal",simalareMeal);
    if (reservationDateTime - currentTime < preparationTimeInMinutes * 60 * 1000) {
      setInvalidMeal({ name: meal.name, preparationTime: preparationTime });
      setValidPreparationTime(false);
      return;
    } else {
      if (simalareMeal) {
        simalareMeal.qt = parseInt(meal.qt) + parseInt(simalareMeal.qt);
        console.log("after", simalareMeal);
        const newListe = orderdMeals.filter((item) => item.meal_id !== meal.meal_id);
        console.log("orders", orderdMeals);
        setOrderedMeals([...newListe, simalareMeal]);
        console.log("orders", orderdMeals);
      }else{
        setOrderedMeals([...orderdMeals, meal]);
      }
      
    }
  };

  const handleRemoveFromCart = (meal) => {
    setOrderedMeals(orderdMeals.filter((item) => item.meal_id !== meal.meal_id));
  };

  const handleClearCart = () => {
    setOrderedMeals([]);
    setShowCart(false);
  };

  const handleShowCart = () => {
    setShowCart(!showCart);
  };

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch("http://localhost/riadapis/index.php?action=meals");
        const data = await response.json();
        setMeals(data.meals || []);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };
    fetchMeals();
  }, []);

  const categories = Array.from(new Set(meals.map((meal) => meal.category)));
  const visibleCategories = showAllCategories ? categories : categories.slice(0, 8);
  const filterDrinks = meals.filter(((meal) => meal.category === "international"));
  // Function to get images based on selected category
  const getCategoryImages = (category) => {
    const categoryData = mealImages.find((item) => item.category === category);
    return categoryData ? categoryData.images : [];
  };

  return (
    <div className="w-full bg-neutral-50 p-14 pt-28">
      {/* Category Buttons */}
      <div className="flex flex-wrap gap-3 mb-6 justify-center">
        <button
          onClick={() => setFilter("All")}
          className={`px-4 py-2 text-sm md:text-base rounded-md ${filter === "All" ? "bg-red-600 text-white shadow-lg"
            : "bg-gray-300 text-gray-800 hover:bg-red-500 hover:text-white"}`}
        >
          All
        </button>
        {visibleCategories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 text-sm md:text-base rounded-md ${filter === category ? "bg-red-600 text-white shadow-lg"
              : "bg-gray-300 text-gray-800 hover:bg-red-500 hover:text-white"}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Show More Button */}
      {!showAllCategories && categories.length > 10 && (
        <div className="text-center mb-6 mt-4">
          <button
            onClick={() => setShowAllCategories(true)}
            className="px-5 py-2 text-sm md:text-base bg-slate-100 bg-transparent text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 ease-in-out"
          >
            <span className="font-medium">Show More</span>
          </button>
        </div>
      )}

      {/* Meals Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {meals
          .filter((meal) => filter === "All" || meal.category === filter)
          .map((meal, index) => (
            <MealCard
              key={meal.meal_id}
              meal={meal}
              imgSrc={getCategoryImages(filter)[index]} // Get corresponding image based on category
              handleAddToCart={handleAddToCart}
            />
          ))}
      </div>

      {/* No Meals Found */}
      {meals.filter((meal) => filter === "All" || meal.category === filter).length === 0 && (
        <p className="text-center text-gray-600 text-lg mt-4">
          No meals found for the selected category.
        </p>
      )}

      {/* Cart */}
      {showCart && orderdMeals.length > 0 && (
        <Cart
          orderdMeals={orderdMeals}
          handleRemoveFromCart={handleRemoveFromCart}
          handleClearCart={handleClearCart}
          drinks = {filterDrinks}
          handleAddToCart={handleAddToCart}
        />
      )}

      {/* Cart Button */}
      {orderdMeals.length > 0 && (
        <button
          className="bg-black fixed bottom-20 right-5 p-4 rounded-full shadow-lg animate-bounce hover:scale-110 transition-transform duration-300 ease-in-out"
          onClick={handleShowCart}
        >
          <FaCartShopping size={20} className="text-white" />
        </button>
      )}

      {/* Invalid Preparation Time */}
      {validPreparationTime === false && (
        <div className="fixed left-1/2 transform -translate-x-1/2 top-20 mt-10 w-full sm:w-3/4 lg:w-1/2">
          <TbX
            className="absolute top-5 right-5 text-2xl cursor-pointer text-black hover:text-gray-600 transition z-50"
            onClick={() => setValidPreparationTime(true) && setInvalidMeal({})}
          />
          <PreparationTime
            name={invalidMeal.name}
            preparationTime={invalidMeal.preparationTime}
          />
        </div>
      )}
    </div>
  );
}
