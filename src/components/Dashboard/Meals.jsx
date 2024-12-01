import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MealAvailabilityUpdate = () => {
  const [meals, setMeals] = useState([]);
  const [selectedMealId, setSelectedMealId] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    // Fetch all meals from the API
    const fetchMeals = async () => {
      try {
        const response = await axios.get('http://localhost/riadapis/index.php?action=fetchmeals');
        setMeals(response.data); // Set all meals regardless of availability
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };
    fetchMeals();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/riadapis/index.php?action=updateStats', {
        meal_id: selectedMealId,
        is_available: isAvailable ? 1 : 0
      });

      // Log the response for debugging
      console.log('Response Data:', response.data);

      // Handle the response appropriately
      if (response.data.message) {
        alert(response.data.message); // Success message
      } else if (response.data.error) {
        alert(response.data.error); // Error message
      } else {
        alert('Unexpected response from the server');
      }
    } catch (error) {
      console.error('Error updating meal availability:', error);
      alert('Error updating meal availability.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Select Meal</label>
        <select
          value={selectedMealId}
          onChange={(e) => {
            const selected = e.target.value;
            setSelectedMealId(selected);
            const selectedMeal = meals.find((meal) => meal.meal_id === parseInt(selected));
            setIsAvailable(selectedMeal ? selectedMeal.is_available : true);
          }}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option  value="">-- Select a Meal --</option>
          {meals.map((meal) => (
            <option className={meal.is_available ? 'text-green-500' : 'text-red-500'} key={meal.meal_id} value={meal.meal_id}>
              {meal.name} ({meal.is_available ? 'Available' : 'Unavailable'})
            </option>
          ))}
        </select>
      </div>

      {selectedMealId && (
        <>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={isAvailable}
                onChange={(e) => setIsAvailable(e.target.checked)}
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
              <span className="ml-2 text-sm text-gray-700">Available</span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none"
          >
            Update Meal Availability
          </button>
        </>
      )}
    </form>
  );
};

export default MealAvailabilityUpdate;
