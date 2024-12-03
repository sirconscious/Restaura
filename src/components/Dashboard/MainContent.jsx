import React from "react";
import TodoList from "./TodoList";
import Draft from "./Draft";
import Table from "./Table";
import Welcome from "./Welcome";
import ReservationStats from "./ReservationStats";
import TableUpdate from "./Tables"; // Import TableUpdate component
import MealAvailabilityUpdate from "./Meals"; // Import MealAvailabilityUpdate component

const MainContent = () => {
  return (
    <main className="flex-grow p-5 bg-gray-100">
      <h2 className="text-2xl font-bold mb-5">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {/* Add dashboard boxes here */}

        <Welcome />
        <TodoList />
        <Draft />
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Table Reservation</h3>
          <TableUpdate /> {/* Table reservation component */}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Meal Availability</h3>
          <MealAvailabilityUpdate /> {/* Meal availability component */}
        </div>
        <ReservationStats />
      </div>
      <Table />
    </main>
  );
};

export default MainContent;
