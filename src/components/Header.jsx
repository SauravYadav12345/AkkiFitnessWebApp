import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { motion } from "framer-motion";

const Header = () => {
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <motion.header
      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 shadow-lg"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto flex justify-between items-center px-4 lg:px-8">
        {/* Brand Logo */}
        <Link to="/" className="text-2xl font-bold hover:opacity-80">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              repeatType: "mirror",
            }}
          >
            Fitness Tracker
          </motion.div>
        </Link>

        {/* Navigation Links */}
        <motion.nav
          className="hidden md:flex space-x-6 text-sm lg:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Link to="/" className="hover:text-yellow-300 transition">
            Home
          </Link>
          <Link to="/workouts" className="hover:text-yellow-300 transition">
            Workouts
          </Link>
          <Link to="/profile" className="hover:text-yellow-300 transition">
            Profile
          </Link>
          <Link
            to="/calorie-tracker"
            className="hover:text-yellow-300 transition"
          >
            Calorie Tracker
          </Link>
          <Link to="/fav-section" className="hover:text-yellow-300 transition">
            Favorites
          </Link>
          <Link to="/signin" className="hover:text-yellow-300 transition">
            Login
          </Link>
          <Link
            to="/"
            onClick={handleSignOut}
            className="hover:text-red-300 transition"
          >
            Logout
          </Link>
        </motion.nav>

        {/* Mobile Menu */}
        <motion.div
          className="md:hidden text-2xl cursor-pointer hover:opacity-80 transition"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </motion.div>
      </div>

      {/* Responsive Dropdown Menu */}
      <motion.div
        className="md:hidden flex flex-col items-center space-y-4 mt-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Link to="/" className="hover:text-yellow-300 transition">
          Home
        </Link>
        <Link to="/workouts" className="hover:text-yellow-300 transition">
          Workouts
        </Link>
        <Link to="/profile" className="hover:text-yellow-300 transition">
          Profile
        </Link>
        <Link
          to="/calorie-tracker"
          className="hover:text-yellow-300 transition"
        >
          Calorie Tracker
        </Link>
        <Link to="/fav-section" className="hover:text-yellow-300 transition">
          Favorites
        </Link>
        <Link to="/signin" className="hover:text-yellow-300 transition">
          Login
        </Link>
        <Link
          to="/"
          onClick={handleSignOut}
          className="hover:text-red-300 transition"
        >
          Logout
        </Link>
      </motion.div>
    </motion.header>
  );
};

export default Header;
