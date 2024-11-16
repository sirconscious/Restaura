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
export default function Meals() {
  const [meals, setMeals] = useState([]);
  const [orderdMeals, setOrderedMeals] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const handleShowCart = () => {
    setShowCart(!showCart);
    console.log("ok")
  }
  const handleAddToCart = (meal)=>{
    setOrderedMeals([...orderdMeals, meal])
    console.log(orderdMeals);
  } 
  const handleRemoveFromCart = (meal)=>{
      setOrderedMeals(orderdMeals.filter(item => item.meal_id !== meal.meal_id));
  }
  const handleClearCart = ()=>{
    setOrderedMeals([]);
  }
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

  return (
    <div className="w-full h-screen bg-white">
      <div className="w-full h-screen bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-14 py-24 overflow-y-scroll">
        {meals.length > 0
          ? meals.map((meal, index) => (
              <MealCard key={meal.meal_id} meal={meal} imgSrc={mealImages[index]} handleAddToCart={handleAddToCart} />
            ))
          : "Loading..."}
                          {showCart && <Cart orderdMeals={orderdMeals} handleRemoveFromCart={handleRemoveFromCart} handleClearCart={handleClearCart} />}

              <button className="bg-black absolute bottom-5 right-12 p-4 rounded-full" onClick={handleShowCart}>
              <FaCartShopping size={40} className="    text-white"/>
                </button>  

      </div>
    </div>
  );
}
