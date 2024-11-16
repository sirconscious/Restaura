import React from "react";

export default function MealCard({ meal, imgSrc }) {
    const [quantity, setQuantity] = useState(0);
    const handleQuantityChange = (event) => {
      setQuantity(event.target.value);
    }
  return (
    <div className="w-full bg-slate-100 rounded-2xl  shadow-lg">
      {/* Image */}
      <img
        src={imgSrc}
        alt={meal.name}
        className="rounded-t-lg object-cover w-full h-40"
      />

      {/* Meal Info */}
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2">{meal.name}</h2>
        <p className="text-sm text-gray-600 mb-4">{meal.description}</p>
        <p className="text-lg font-semibold text-green-700">Price: {meal.price} MAD</p>
        <p className="text-sm text-gray-500">Prep Time: {meal.preparation_time}</p>
        <label htmlFor="quantite">Quantite: </label>
        <input type="number" max={5} min={1} defaultValue={1} onChange={handleQuantityChange} name="quantite"/> <br />
        <button className="p-2 bg-blue-500 text-white rounded-2xl" onClick={() => handleAddToCart({...meal , quantity : quantity})}>Add to cart</button>
      </div>
    </div>
  );
}
