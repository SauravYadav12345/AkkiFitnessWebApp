import React from "react";
import { useFavorites } from "../contexts/FavoritesContext";

const FavSection = () => {
  const { favorites, removeFavorite } = useFavorites();

  if (!favorites || favorites.length === 0) {
    return (
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">No Favorites Found</h2>
      </div>
    );
  }

  return (
    <div className="p-4 mt-16">
      <h2 className="text-lg font-bold mb-6 text-center">Your Favorite Workouts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((workout, index) => (
          <div
            key={index}
            className="bg-white rounded-md shadow-md p-4 flex flex-col items-center"
          >
            <h3 className="text-md font-semibold mb-2 text-center">{workout.name}</h3>
            <p className="text-sm text-gray-600 mb-2 text-center">{workout.target}</p>
            {workout.gifUrl && (
              <div className="w-full mb-2">
                <img
                  src={workout.gifUrl}
                  alt={workout.name}
                  className="w-full h-auto object-contain rounded-md"
                />
              </div>
            )}
            {workout.description && (
              <p className="text-sm text-gray-700 text-center">{workout.description}</p>
            )}
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 mt-3 rounded-md"
              onClick={() => removeFavorite(workout)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavSection;
