import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase"; // Import Firebase configuration
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

const CalorieTracker = () => {
  const [mealName, setMealName] = useState("");
  const [grams, setGrams] = useState("");
  const [meals, setMeals] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const user = auth.currentUser; // Get the currently logged-in user
  const userMealsRef = user
    ? collection(db, `users/${user.uid}/meals`)
    : null; // Firestore path for user-specific meals

  // Fetch user-specific data on load
  useEffect(() => {
    if (user) {
      const fetchMeals = async () => {
        try {
          const querySnapshot = await getDocs(userMealsRef);
          let fetchedMeals = [];
          let fetchedTotalCalories = 0;

          querySnapshot.forEach((doc) => {
            const data = doc.data();
            fetchedMeals.push({ id: doc.id, ...data });
            fetchedTotalCalories += data.calories;
          });

          setMeals(fetchedMeals);
          setTotalCalories(fetchedTotalCalories);
        } catch (err) {
          setError("Error fetching meals. Please try again.");
        }
      };

      fetchMeals();
    }
  }, [user, userMealsRef]);

  const handleAddMeal = async () => {
    if (!mealName || !grams) {
      setError("Please enter both meal name and grams.");
      return;
    }

    setLoading(true);
    setError(null);

    const foodCalories = {
      apple: 0.52, // 0.52 calories per gram for an apple
      banana: 0.89, // 0.89 calories per gram for a banana
      rice: 1.3, // 1.3 calories per gram for rice
      chicken: 2.39, // 2.39 calories per gram for chicken
      broccoli: 0.34, // 0.34 calories per gram for broccoli
      potato: 0.77, // 0.77 calories per gram for potato
      egg: 1.43, // 1.43 calories per gram for egg
      avocado: 1.6, // 1.6 calories per gram for avocado
      orange: 0.47, // 0.47 calories per gram for orange
      strawberry: 0.32, // 0.32 calories per gram for strawberry
      spinach: 0.23, // 0.23 calories per gram for spinach
      bread: 2.53, // 2.53 calories per gram for bread
      milk: 0.42, // 0.42 calories per gram for milk
      cheese: 4.02, // 4.02 calories per gram for cheese
      yogurt: 0.59, // 0.59 calories per gram for yogurt
      oatmeal: 1.5, // 1.5 calories per gram for oatmeal
      salmon: 2.08, // 2.08 calories per gram for salmon
      tuna: 1.32, // 1.32 calories per gram for tuna
      carrot: 0.41, // 0.41 calories per gram for carrot
      cucumber: 0.16, // 0.16 calories per gram for cucumber
      watermelon: 0.3, // 0.3 calories per gram for watermelon
      pineapple: 0.5, // 0.5 calories per gram for pineapple
      grapes: 0.69, // 0.69 calories per gram for grapes
      pear: 0.57, // 0.57 calories per gram for pear
      almond: 5.8, // 5.8 calories per gram for almond
      cashew: 5.3, // 5.3 calories per gram for cashew
      walnut: 6.5, // 6.5 calories per gram for walnut
      peanut: 5.6, // 5.6 calories per gram for peanut
      honey: 3.04, // 3.04 calories per gram for honey
      olive_oil: 8.84, // 8.84 calories per gram for olive oil
      coconut_oil: 8.64, // 8.64 calories per gram for coconut oil
      butter: 7.17, // 7.17 calories per gram for butter
      chocolate: 5.46, // 5.46 calories per gram for chocolate
      chips: 5.31, // 5.31 calories per gram for chips
      pasta: 1.31, // 1.31 calories per gram for pasta
      burger: 2.49, // 2.49 calories per gram for burger
      pizza: 2.68, // 2.68 calories per gram for pizza
      fries: 3.0, // 3.0 calories per gram for fries
      soda: 0.42, // 0.42 calories per gram for soda
      coffee: 0.2, // 0.2 calories per gram for black coffee
      tea: 0.01, // 0.01 calories per gram for tea (without sugar)
      cereal: 3.6, // 3.6 calories per gram for cereal
      ice_cream: 2.31, // 2.31 calories per gram for ice cream
      smoothie: 1.2, // 1.2 calories per gram for smoothie
      sandwich: 2.4, // 2.4 calories per gram for sandwich
      muffin: 2.9, // 2.9 calories per gram for muffin
      pancake: 2.52, // 2.52 calories per gram for pancake
      sausage: 2.3, // 2.3 calories per gram for sausage
      bacon: 5.4, // 5.4 calories per gram for bacon
      hot_dog: 2.6, // 2.6 calories per gram for hot dog
      popcorn: 4.1, // 4.1 calories per gram for popcorn
      granola: 4.0, // 4.0 calories per gram for granola
      ketchup: 1.1, // 1.1 calories per gram for ketchup
      mustard: 1.0, // 1.0 calories per gram for mustard
      mayonnaise: 6.3, // 6.3 calories per gram for mayonnaise
     };

    const caloriesPerGram = foodCalories[mealName.toLowerCase()];
    if (caloriesPerGram) {
      const calculatedCalories = caloriesPerGram * parseFloat(grams);

      const newMeal = {
        name: mealName,
        grams: parseFloat(grams),
        calories: calculatedCalories,
      };

      try {
        // Save to Firestore
        const docRef = await addDoc(userMealsRef, newMeal);
        setMeals([...meals, { id: docRef.id, ...newMeal }]);
        setTotalCalories(totalCalories + calculatedCalories);

        setMealName("");
        setGrams("");
      } catch (err) {
        setError("Error saving meal. Please try again.");
      }
    } else {
      setError("Food not found. Please enter a valid food name.");
    }

    setLoading(false);
  };

  const handleClearLogs = async () => {
    try {
      for (const meal of meals) {
        await deleteDoc(doc(db, `users/${user?.uid}/meals`, meal.id));
      }
      setMeals([]);
      setTotalCalories(0);
    } catch (err) {
      setError("Error clearing logs. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Calorie Tracker
      </h2>
      <div className="max-w-lg mx-auto bg-white p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter Meal Name (e.g., Apple, Banana)"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
            className="border px-4 py-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            placeholder="Enter Grams"
            value={grams}
            onChange={(e) => setGrams(e.target.value)}
            className="border px-4 py-2 w-full rounded-md"
          />
        </div>
        <button
          onClick={handleAddMeal}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          disabled={loading}
        >
          {loading ? "Loading..." : "Add Meal"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Meals Log</h3>
        <ul className="list-disc pl-5">
          {meals.map((meal) => (
            <li key={meal.id} className="text-gray-700">
              {meal.name} ({meal.grams}g) - {meal.calories.toFixed(2)} calories
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">
            Total Calories Consumed: {totalCalories.toFixed(2)} kcal
          </h3>
        </div>
        <button
          onClick={handleClearLogs}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md mt-4"
        >
          Clear All Logs
        </button>
      </div>
    </div>
  );
};

export default CalorieTracker;
