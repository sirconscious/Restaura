import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function PreparationTime({ name, preparationTime }) {
  return (
    <div className="bg-white bg-opacity-95 p-8 rounded-lg shadow-xl relative text-gray-800">
      {/* Title */}
      <h2 className="text-xl font-bold text-red-600 mb-4">Time Issue</h2>

      {/* Message */}
      <p className="text-sm sm:text-base mb-4 leading-relaxed">
        Unfortunately, you don't have enough time to prepare the 
        <span className="font-semibold text-gray-900"> {name}</span>.
        Please select a different meal or change the reservation time.
      </p>

      {/* Suggestion */}
      <p className="text-sm sm:text-base mb-6">
        Select a time that allows at least 
        <span className="font-semibold text-gray-900"> {preparationTime}</span> 
        {" "} for preparation.
      </p>

      {/* Actions */}
      <div className="flex items-center justify-end gap-4">
        {/* Reload Button */}
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition"
        >
          <IoMdArrowRoundBack className="text-lg" />
          Change Time
        </button>
      </div>
    </div>
  );
}
