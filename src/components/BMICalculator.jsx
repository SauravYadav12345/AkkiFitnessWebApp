import React, { useState } from "react";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState("");

  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters ** 2)).toFixed(1);
      setBmi(bmiValue);

      if (bmiValue < 18.5) {
        setStatus("Underweight, possibly malnourished");
      } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
        setStatus("Healthy weight");
      } else if (bmiValue >= 25 && bmiValue <= 29.9) {
        setStatus("Overweight");
      } else {
        setStatus("Obese");
      }
    } else {
      alert("Please enter both weight and height!");
    }
  };

  const resetCalculator = () => {
    setWeight("");
    setHeight("");
    setBmi(null);
    setStatus("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6">
      <div className="p-6 bg-white rounded-md shadow-md max-w-md mx-auto mt-24">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">BMI Calculator</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Weight (kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your weight"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Height (cm):</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your height"
          />
        </div>
        <button
          onClick={calculateBMI}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 mb-4"
        >
          Calculate BMI
        </button>
        {bmi && (
          <div className="text-center">
            <p className="text-lg font-semibold">Your BMI: {bmi}</p>
            <p
              className={`text-lg font-semibold mt-2 ${
                status === "Healthy weight" ? "text-green-500" : "text-red-500"
              }`}
            >
              Status: {status}
            </p>
          </div>
        )}
        <div className="mt-6">
          <h3 className="text-lg font-bold text-gray-800">BMI Ranges:</h3>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>
              <strong>Under 18.5:</strong> Underweight, possibly malnourished
            </li>
            <li>
              <strong>18.5–24.9:</strong> Healthy weight
            </li>
            <li>
              <strong>25–29.9:</strong> Overweight
            </li>
            <li>
              <strong>30 or higher:</strong> Obese
            </li>
          </ul>
        </div>
        <button
          onClick={resetCalculator}
          className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 mt-4"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default BMICalculator;
