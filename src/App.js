import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Workouts from "./pages/Workouts";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import CalorieTracker from "./pages/CalorieTracker";
import FavSection from "./pages/FavSection"; // Import the component for Favorite Section
import { FavoritesProvider } from "./contexts/FavoritesContext";

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-100">
          {/* Header for navigation */}
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />

              {/* Protected Routes */}
              <Route
                path="/workouts"
                element={
                  <PrivateRoute>
                    <Workouts />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/calorie-tracker"
                element={
                  <PrivateRoute>
                    <CalorieTracker />
                  </PrivateRoute>
                }
              />
              <Route
                path="/fav-section"
                element={
                  <PrivateRoute>
                    <FavSection />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
          {/* Footer Section */}
          <Footer />
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
