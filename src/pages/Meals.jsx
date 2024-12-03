import React, { useState, useEffect } from "react";
import MealCard from "./MealCard";
import { FaCartShopping } from "react-icons/fa6";
import dish01 from "../assets/dish01.jpg";
import dish02 from "../assets/dish02.jpeg";
import dish03 from "../assets/dish03.jpeg";
import dish04 from "../assets/dish04.jpeg";
import dish05 from "../assets/dish05.jpeg";
import dish06 from "../assets/dish06.jpeg";
import dish07 from "../assets/dish07.jpeg";
import dish08 from "../assets/dish08.jpeg";
import dish09 from "../assets/dish09.jpeg";
import dish010 from "../assets/dish010.jpeg";
import Cart from "./Cart";
import PreparationTime from "./PreparationTime";
import { TbX } from "react-icons/tb";

export default function Meals() {
  const [meals, setMeals] = useState([]);
  const [orderdMeals, setOrderedMeals] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [filter, setFilter] = useState("All");
  const [validPreparationTime, setValidPreparationTime] = useState(true);
  const [invalidMeal, setInvalidMeal] = useState({});
  const reserveInfo = JSON.parse(localStorage.getItem("reserve_info"));

  const mealImages = [
    dish01,
    dish02,
    dish03,
    dish04,
    dish05,
    dish06,
    dish07,
    dish08,
    dish09,
    dish010,
  ];

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
    const preparationTime = meal.preparation_time || "0 m";
    const currentTime = new Date();
    const preparationTimeInMinutes = Prep_timeToMinutes(preparationTime);

    const reservationDateTime = new Date(
      `${reserveInfo.date}T${reserveInfo.time}`
    );
    if (
      reservationDateTime - currentTime <
      preparationTimeInMinutes * 60 * 1000
    ) {
      setInvalidMeal({ name: meal.name, preparationTime: preparationTime });
      setValidPreparationTime(false);
      return;
    } else {
      setOrderedMeals([...orderdMeals, meal]);
    }
  };

  const handleRemoveFromCart = (meal) => {
    setOrderedMeals(
      orderdMeals.filter((item) => item.meal_id !== meal.meal_id)
    );
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
        const response = await fetch(
          "http://localhost/riadapis/index.php?action=meals"
        );
        const data = await response.json();
        setMeals(data.meals || []);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };
    fetchMeals();
  }, []);

  const categories = Array.from(new Set(meals.map((meal) => meal.category)));

  return (
    <div className="w-full bg-neutral-100 p-8 pt-20">
      {/* Category Buttons */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        <button
          onClick={() => setFilter("All")}
          className={`px-6 py-2 text-sm md:text-base rounded-lg transition-all ${
            filter === "All"
              ? "bg-red-600 text-white shadow-lg"
              : "bg-gray-300 text-gray-800 hover:bg-red-500 hover:text-white"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-6 py-2 text-sm md:text-base rounded-lg transition-all ${
              filter === category
                ? "bg-red-600 text-white shadow-lg"
                : "bg-gray-300 text-gray-800 hover:bg-red-500 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Meals Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {meals
          .filter((meal) => filter === "All" || meal.category === filter)
          .map((meal, index) => (
            <MealCard
              key={meal.meal_id}
              meal={meal}
              imgSrc={mealImages[index % mealImages.length]}
              handleAddToCart={handleAddToCart}
            />
          ))}
      </div>

      {/* No Meals Found */}
      {meals.filter((meal) => filter === "All" || meal.category === filter)
        .length === 0 && (
        <p className="text-center text-gray-600 text-lg mt-6">
          No meals found for the selected category.
        </p>
      )}

      {/* Cart */}
      {showCart && orderdMeals.length > 0 && (
        <Cart
          orderdMeals={orderdMeals}
          handleRemoveFromCart={handleRemoveFromCart}
          handleClearCart={handleClearCart}
        />
      )}

      {/* Cart Button */}
      {orderdMeals.length > 0 && (
        <button
          className="fixed bottom-10 right-6 bg-red-600 hover:bg-red-700 p-5 rounded-full text-white shadow-xl hover:shadow-2xl transition-transform transform hover:scale-110"
          onClick={handleShowCart}
        >
          <FaCartShopping size={24} />
        </button>
      )}

      {/* Invalid Preparation Time */}
      {validPreparationTime === false && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white p-8 rounded-lg shadow-2xl w-11/12 sm:w-2/3 md:w-1/2">
            <TbX
              className="absolute top-4 right-4 text-3xl cursor-pointer text-gray-600 hover:text-black"
              onClick={() => setValidPreparationTime(true)}
            />
            <PreparationTime
              name={invalidMeal.name}
              preparationTime={invalidMeal.preparationTime}
            />
          </div>
        </div>
      )}
    </div>
  );
}
