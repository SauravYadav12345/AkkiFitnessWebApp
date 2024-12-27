import React from "react";

const WorkoutCard = ({ workout }) => {
  return (
    <div className="border p-4 rounded shadow-lg">
      <h3 className="text-lg font-bold mb-2">{workout.name}</h3>
      <p className="text-sm text-gray-600 mb-2">Target: {workout.target}</p>
      <img
        src={workout.gifUrl}
        alt={workout.name}
        className="w-full h-auto rounded-lg"
      />
    </div>
  );
};

export default WorkoutCard;
