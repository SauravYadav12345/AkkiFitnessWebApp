import React, {useState} from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // For animations
import { FaStar } from "react-icons/fa";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const testimonials = [
    {
      name: "Ankush Singh",
      review: "This fitness tracker completely transformed my fitness journey!",
      rating: 5,
    },
    {
      name: "Keshav Reddy",
      review: "A user-friendly app with amazing features. Highly recommended!",
      rating: 4,
    },
    {
      name: "Yash Agarwal",
      review: "The calorie tracker helped me stay on top of my diet goals!",
      rating: 5,
    },
  ];

  const developers = [
    {
      name: "Saurav Yadav",
      role: "Frontend Developer",
      image:
        "https://images.unsplash.com/photo-1668554245893-2430d0077217?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bio: "Specializes in React.js and creating stunning user interfaces.",
    },
    {
      name: "Yogesh Sharma",
      role: "Backend Developer",
      image:
        "https://images.unsplash.com/photo-1604145559206-e3bce0040e2d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bio: "Expert in Node.js and ensuring seamless backend functionality.",
    },
    {
      name: "Abhishek Tiwari",
      role: "UI/UX Designer",
      image:
        "https://images.unsplash.com/photo-1655897731395-530a59105b31?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bio: "Passionate about designing user-friendly and visually appealing apps.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      {/* Hero Section */}
      <motion.div
        className="container mx-auto text-center py-20"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-extrabold mb-4">
          Welcome to Fitness Tracker
        </h1>
        <p className="text-xl mb-6">
          Explore workouts, track your progress, and achieve your fitness goals.
        </p>
        <div className="space-x-4">
          {!isLoggedIn && ( // Show the button only if the user is not logged in
            <Link
              to="/signup"
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 shadow-lg transform hover:scale-105 transition"
            >
              Get Started
            </Link>
          )}
          <Link
            to="/workouts"
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 shadow-lg transform hover:scale-105 transition"
          >
            Explore Workouts
          </Link>
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div
        className="container mx-auto px-4 py-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          What Our User's Say
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white text-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-xl font-semibold mb-2">{testimonial.name}</p>
              <p className="mb-4">{testimonial.review}</p>
              <div className="flex justify-center space-x-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Review Section */}
      <motion.div
        className="container mx-auto px-4 py-10 bg-gray-900 rounded-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          User Reviews
        </h2>
        <p className="text-center mb-4 text-gray-300">
          Rated 4.8 out of 5 by hundreds of satisfied users.
        </p>
        <div className="flex justify-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-yellow-500 text-3xl" />
          ))}
        </div>
      </motion.div>

      {/* Developers Section */}
      <motion.div
        className="container mx-auto px-4 py-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6">Meet the Team</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {developers.map((dev, index) => (
            <motion.div
              key={index}
              className="bg-white text-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={dev.image}
                alt={dev.name}
                className="w-32 h-32 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{dev.name}</h3>
              <p className="text-gray-600 italic mb-2">{dev.role}</p>
              <p className="text-sm">{dev.bio}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
