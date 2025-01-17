import React, { useState } from "react";
import axios from "axios";
import UserInitials from "./UserInitials";

const DietPlanner = () => {
  const [userDetails, setUserDetails] = useState({
    age: "",
    weight: "",
    height: "",
    activityLevel: "moderate",
    goal: "muscle gain",
  });
  const [dietPlan, setDietPlan] = useState([]);
  const [loading, setLoading] = useState(false);

  const calculateDietPlan = async () => {
    setLoading(true);
    setDietPlan([]);

    const { weight, height, age, activityLevel, goal } = userDetails;

    // Calculate BMR (Basal Metabolic Rate) based on Mifflin-St Jeor Equation
    const bmr =
      10 * parseFloat(weight) +
      6.25 * parseFloat(height) -
      5 * parseFloat(age) +
      5; // For males, use +5. For females, use -161.

    // Adjust calorie goal based on activity level and user goal
    const activityMultiplier =
      activityLevel === "high"
        ? 1.75
        : activityLevel === "moderate"
        ? 1.55
        : 1.2;
    const maintenanceCalories = bmr * activityMultiplier;
    const calorieGoal =
      goal === "muscle gain"
        ? maintenanceCalories + 500
        : goal === "weight loss"
        ? maintenanceCalories - 500
        : maintenanceCalories; // Default for endurance

    const foodItems =
      "chicken, apple, spinach, papaya, oranges, beef, peas, peanuts, cashew, almonds, rice, avacado, eggs, paneer, oats, fish, ";

    try {
      const response = await axios.get(
        `https://api.calorieninjas.com/v1/nutrition?query=${foodItems}`,
        {
          headers: { "X-Api-Key": "4sK0BCfL23Qp8f+0ZOCw5g==UbY4TEe9P1e0YDSm" },
        }
      );
      console.log("API Response:", response.data); // Debugging line

      if (response.data.items && response.data.items.length > 0) {
        const foods = response.data.items.map((item) => ({
          name: item.name,
          calories: parseFloat(item.calories),
          protein: parseFloat(item.protein_g),
          carbs: parseFloat(item.carbohydrates_total_g),
          fats: parseFloat(item.fat_total_g),
        }));

        // Adjusting the number of items based on activity level and goal
        const numberOfItems =
          activityLevel === "high" || goal === "muscle gain" ? 10 : 5;

        // Filter foods based on user goal
        const filteredFoods =
          goal === "muscle gain"
            ? foods.filter((food) => food.protein > 5).slice(0, numberOfItems) // High protein for muscle gain
            : goal === "weight loss"
            ? foods
                .filter((food) => food.calories < 150)
                .slice(0, numberOfItems) // Low calorie for weight loss
            : foods.filter((food) => food.carbs > 10).slice(0, numberOfItems); // Balanced carbs for endurance

        const updatedDietPlan = filteredFoods.map((food) => {
          const portionInGrams =
            (calorieGoal / filteredFoods.length / food.calories) * 100;

          return {
            ...food,
            portion: `${portionInGrams.toFixed(0)} g`, // User-friendly portion size
            quantity: `${(portionInGrams / 100).toFixed(1)} servings`, // Improved display for quantity
          };
        });

        setDietPlan(updatedDietPlan);
      } else {
        console.error("No items found in the API response.");
      }
    } catch (err) {
      console.error("Error fetching diet plan:", err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 mt-16">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6">
        < UserInitials />
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Diet Planner
        </h1>
        <div className="space-y-4">
          <input
            type="number"
            placeholder="Weight (kg)"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            onChange={(e) =>
              setUserDetails({ ...userDetails, weight: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Height (cm)"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            onChange={(e) =>
              setUserDetails({ ...userDetails, height: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Age"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            onChange={(e) =>
              setUserDetails({ ...userDetails, age: e.target.value })
            }
          />
          <select
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            onChange={(e) =>
              setUserDetails({ ...userDetails, activityLevel: e.target.value })
            }
          >
            <option value="low">Low Activity</option>
            <option value="moderate">Moderate Activity</option>
            <option value="high">High Activity</option>
          </select>
          <select
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            onChange={(e) =>
              setUserDetails({ ...userDetails, goal: e.target.value })
            }
          >
            <option value="muscle gain">Muscle Gain</option>
            <option value="weight loss">Weight Loss</option>
            <option value="endurance">Endurance</option>
          </select>
          <button
            onClick={calculateDietPlan}
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
          >
            Get Diet Plan
          </button>
        </div>
        {loading && (
          <p className="text-center text-blue-500 mt-4">Loading...</p>
        )}
        <div className="mt-6">
          {dietPlan.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-lg shadow mb-4 border"
            >
              <h2 className="text-lg font-bold text-gray-800">{item.name}</h2>
              <p>Calories: {item.calories} kcal</p>
              <p>Protein: {item.protein} g</p>
              <p>Carbs: {item.carbs} g</p>
              <p>Fats: {item.fats} g</p>
              <p>Portion Size: {item.portion}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DietPlanner;
