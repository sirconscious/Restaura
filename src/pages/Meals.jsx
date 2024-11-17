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
import { i } from "framer-motion/client";
import { TbX } from "react-icons/tb";
export default function Meals() {
  const [meals, setMeals] = useState([]);
  const [orderdMeals, setOrderedMeals] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const reserveInfo = JSON.parse(localStorage.getItem("reserve_info"));
  const [validPreparationTime, setValidPreparationTime] = useState(true);
  const [invalidMeal, setInvalidMeal] = useState({});
  const handleShowCart = () => {
    setShowCart(!showCart); // Toggle cart visibility
  };
  function convertPreparationTimeToMinutes(preparationTime) {
    if (!preparationTime) return 0; // Default to 0 if preparationTime is undefined or empty

    const parts = preparationTime.split(' ');
    let hours = 0;
    let minutes = 0;

    // Check if the first part exists and contains 'h'
    if (parts[0] && parts[0].includes('h')) {
      hours = parseInt(parts[0].replace('h', '')) || 0;
    }

    // Check if the second part exists and contains 'm'
    if (parts[1] && parts[1].includes('m')) {
      minutes = parseInt(parts[1].replace('m', '')) || 0;
    }

    return hours * 60 + minutes;
  }
  const handleAddToCart = (meal) => {
    const preparationTime = meal.preparation_time || "0 m"; // Default to "0 m" if missing
    const currentTime = new Date();
    const preparationTimeInMinutes = convertPreparationTimeToMinutes(preparationTime);

    const reservationDateTime = new Date(`${reserveInfo.date}T${reserveInfo.time}`);
    if (reservationDateTime - currentTime < preparationTimeInMinutes * 60 * 1000) {
      console.log(
        `Not enough time to prepare the meal. Please select a time that is at least ${preparationTime} from now.`
      );
      // setOrderedMeals([]);
      setInvalidMeal({ name: meal.name, preparationTime: preparationTime });
      setValidPreparationTime(false);
      return; // Exit early if there's not enough time
    } else {
      setOrderedMeals([...orderdMeals, meal]);
    }


  };

  const handleRemoveFromCart = (meal) => {
    setOrderedMeals(orderdMeals.filter((item) => item.meal_id !== meal.meal_id));
    // setHiddenButtons(hiddenButtons.filter((id) => id !== meal.meal_id)); // Remove meal ID from hidden buttons
  };

  const handleClearCart = () => {
    setOrderedMeals([]);
    // setHiddenButtons([]); // Clear hidden buttons
    setShowCart(false);
  };

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

  // check if the time of reservation id enough for preparing the meal



  return (
    <div className="w-full  ">
      <div className="w-full bg-neutral-50 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-14 pt-28">

        {meals.length > 0
          ? meals.map((meal, index) => (
            <MealCard
              key={meal.meal_id}
              meal={meal}
              imgSrc={mealImages[index]}
              handleAddToCart={handleAddToCart}
            // isHidden={hiddenButtons.includes(meal.meal_id)} // Pass hidden state
            />
          ))
          : "Loading..."}
        {showCart && orderdMeals.length > 0 ? (
          <Cart
            orderdMeals={orderdMeals}
            handleRemoveFromCart={handleRemoveFromCart}
            handleClearCart={handleClearCart}
          />
        ) : ""}
        {/* Cart Button - Only visible if at least one meal is selected */}
        {orderdMeals.length > 0 && (
          <button
          className="bg-black fixed bottom-20 right-5 p-4 rounded-full shadow-lg animate-bounce hover:scale-110 transition-transform duration-300 ease-in-out"
          onClick={handleShowCart}
        >
          <FaCartShopping size={20} className="text-white" />
        </button>
        
        )}
      </div>
      {
        validPreparationTime === false && (
          <div className="fixed left-1/2 transform -translate-x-1/2 top-20 mt-10 w-full sm:w-3/4 lg:w-1/2">
            {/* Close Button */}
            <TbX
              className="absolute top-5 right-5 text-2xl cursor-pointer text-black hover:text-gray-600 transition z-50"
              onClick={() => setValidPreparationTime(true) && setInvalidMeal({})}
            />
            {/* Preparation Time Component */}
            <PreparationTime
              name={invalidMeal.name}
              preparationTime={invalidMeal.preparationTime}
            />
          </div>
        )
      }

    </div>
  );
}
