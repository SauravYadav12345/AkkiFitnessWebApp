import React, { useState } from "react";
import { motion } from "framer-motion"; // For animations
import { FaPlayCircle } from "react-icons/fa";

const workouts = {
  "Weight Loss": [
    {
      name: "Jumping Jacks",
      duration: "8 mins",
      video: "https://youtu.be/XR0xeuK5zBU?feature=shared",
    },
    {
      name: "Burpees",
      duration: "5 mins",
      video: "https://youtube.com/shorts/McK6y7t5_XY?feature=shared",
    },
    {
      name: "Mountain Climbers",
      duration: "5 mins",
      video: "https://youtube.com/shorts/8dBeHWdPDWk?feature=shared",
    },
    {
      name: "Jump Rope",
      duration: "20 mins",
      video: "https://youtu.be/UjhDhuBG0Fo?feature=shared",
    },
  ],
  "Muscle Gain": [
    {
      name: "Push-ups",
      duration: "3 sets of 15 reps",
      video: "https://youtu.be/iLOZ_gEf6QA?feature=shared",
    },
    {
      name: "Pull-ups",
      duration: "3 sets of 10 reps",
      video: "https://youtube.com/shorts/dvG8B2OjfWk?feature=shared",
    },
    {
      name: "Dumbbell Bench Press",
      duration: "3 sets till failure",
      video: "https://youtu.be/YQ2s_Y7g5Qk?feature=shared",
    },
    {
      name: "Dumbell Shoulder Press",
      duration: "3 sets till failure",
      video: "https://youtube.com/shorts/s6hDp6prx4Y?feature=shared",
    },
  ],
  Endurance: [
    {
      name: "Running",
      duration: "30 mins",
      video: "https://youtube.com/shorts/a4862rAB12Q?feature=shared",
    },
    {
      name: "Cycling",
      duration: "45 mins",
      video: "https://youtu.be/PAHRvcOCSU4?feature=shared",
    },
    {
      name: "Swimming",
      duration: "20 laps",
      video: "https://youtu.be/gh5mAtmeR3Y?feature=shared",
    },
    {
      name: "Cross-Fit",
      duration: "20 mins",
      video: "https://youtu.be/5IYOeFYbS2Y?feature=shared",
    },
  ],
};

const WorkoutPlanner = () => {
  const [goal, setGoal] = useState("");
  const [selectedWorkouts, setSelectedWorkouts] = useState([]);

  const handleGoalSelection = (e) => {
    const selectedGoal = e.target.value;
    setGoal(selectedGoal);
    setSelectedWorkouts(workouts[selectedGoal]);
  };

  const handleRedirect = (videoUrl) => {
    window.open(videoUrl, "_blank");
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 rounded-md shadow-md max-w-lg mx-auto text-white">
      <motion.h2
        className="text-2xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Workout Planner
      </motion.h2>

      <div className="mb-4">
        <label className="block font-medium mb-2">Select Your Goal:</label>
        <select
          value={goal}
          onChange={handleGoalSelection}
          className="w-full px-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">-- Choose a Goal --</option>
          <option value="Weight Loss">Weight Loss</option>
          <option value="Muscle Gain">Muscle Gain</option>
          <option value="Endurance">Endurance</option>
        </select>
      </div>

      {selectedWorkouts.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-3 text-center">
            Workout Plan for {goal}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {selectedWorkouts.map((workout, index) => (
              <motion.div
                key={index}
                className="bg-white text-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                <p className="text-lg font-medium">{workout.name}</p>
                <p className="mb-2">Duration: {workout.duration}</p>
                {workout.video && (
                  <div className="relative pb-56.25% mb-4">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={workout.video}
                      title={workout.name}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                {!workout.video && (
                  <div className="text-gray-600 italic mt-2">
                    Video unavailable
                  </div>
                )}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center justify-center text-yellow-500 mt-3 cursor-pointer"
                  onClick={() => handleRedirect(workout.video)}
                >
                  <FaPlayCircle className="text-3xl" />
                  <span className="ml-2 text-lg">Watch Exercise</span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutPlanner;
