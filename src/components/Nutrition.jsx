import React, { useState } from "react";
import axios from "axios";

const Nutrition = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("solid"); // Default category
  const [unit, setUnit] = useState("100"); // Default to "per 100g"
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setResults(null);
    try {
      const response = await axios.post(
        "https://trackapi.nutritionix.com/v2/natural/nutrients",
        {
          query: query,
        },
        {
          headers: {
            "x-app-id": "aa782c24", // Replace with your appId
            "x-app-key": "43b2ea7fe03fa9458aa63ff01e956002", // Replace with your appKey
            "Content-Type": "application/json",
          },
        }
      );
      setResults(response.data.foods);
    } catch (err) {
      setError("Failed to fetch nutrition data. Please try again.");
      console.error(err);
    }
    setLoading(false);
  };

  const calculatePerUnit = (value, servingWeight) => {
    if (unit === "100") {
      return ((value / servingWeight) * 100).toFixed(2); // Per 100g/ml
    } else if (unit === "1000") {
      return ((value / servingWeight) * 1000).toFixed(2); // Per 1kg/liter
    }
    return value.toFixed(2); // Default
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-4 mt-16">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Flexible Nutrition Info
      </h1>
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          className="w-full p-2 border rounded-lg shadow"
          placeholder="Enter a food item (e.g., apple, milk)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="flex mt-4 gap-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded-lg shadow"
          >
            <option value="solid">Solid</option>
            <option value="liquid">Liquid</option>
          </select>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full p-2 border rounded-lg shadow"
          >
            <option value="100">Per 100g/ml</option>
            <option value="1000">Per 1kg/L</option>
          </select>
        </div>
        <button
          onClick={handleSearch}
          className="w-full mt-4 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Get Nutrition Info
        </button>
      </div>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="flex justify-center items-start">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
          {results &&
            results.map((item, index) => {
              const perUnit = {
                calories: calculatePerUnit(
                  item.nf_calories,
                  item.serving_weight_grams
                ),
                protein: calculatePerUnit(
                  item.nf_protein,
                  item.serving_weight_grams
                ),
                fat: calculatePerUnit(item.nf_total_fat, item.serving_weight_grams),
                carbs: calculatePerUnit(
                  item.nf_total_carbohydrate,
                  item.serving_weight_grams
                ),
              };
              return (
                <div
                  key={index}
                  className="bg-white p-4 shadow rounded-lg border border-gray-200"
                >
                  <h2 className="text-lg font-bold mb-2">{item.food_name}</h2>
                  <img
                    src={item.photo.thumb}
                    alt={item.food_name}
                    className="w-full h-50 object-cover rounded-lg mb-2"
                  />
                  <p>
                    <strong>Serving Size:</strong> {item.serving_qty}{" "}
                    {item.serving_unit} ({item.serving_weight_grams} g/ml)
                  </p>
                  <p>
                    <strong>Calories {unit === "100" ? "per 100g/ml" : "per kg/L"}:</strong>{" "}
                    {perUnit.calories} kcal
                  </p>
                  <p>
                    <strong>Protein {unit === "100" ? "per 100g/ml" : "per kg/L"}:</strong>{" "}
                    {perUnit.protein} g
                  </p>
                  <p>
                    <strong>Fat {unit === "100" ? "per 100g/ml" : "per kg/L"}:</strong>{" "}
                    {perUnit.fat} g
                  </p>
                  <p>
                    <strong>Carbs {unit === "100" ? "per 100g/ml" : "per kg/L"}:</strong>{" "}
                    {perUnit.carbs} g
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Nutrition;
