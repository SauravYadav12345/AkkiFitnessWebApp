import React, { useEffect, useState } from "react";
import { useFavorites } from "../contexts/FavoritesContext";
//import { auth, db } from "../firebase";
import UserInitials from "../components/UserInitials";

const Workouts = () => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [workouts, setWorkouts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTarget, setSelectedTarget] = useState("");
  // const [favorites, setFavorites] = useState([]);

  const itemsPerPage = 10;

  const [pageRange, setPageRange] = useState({ start: 1, end: 10 });

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://exercisedb.p.rapidapi.com/exercises?limit=250",
          {
            headers: {
              "X-RapidAPI-Key":
                "e42f2023c2msh99188a2d4a02c74p1acd8fjsn3f16cd96b741",
              "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setWorkouts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const toggleFavorite = (workout) => {
    console.log("Before toggle:", favorites);
    if (favorites.some((fav) => fav.id === workout.id)) {
      removeFavorite(workout);
    } else {
      addFavorite(workout);
    }
    console.log("After toggle:", favorites);
  };

  const filteredWorkouts = workouts.filter(
    (workout) =>
      (workout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workout.target.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedTarget === "" || workout.target === selectedTarget)
  );

  const uniqueTargets = [...new Set(workouts.map((workout) => workout.target))];

  const totalPages = Math.ceil(filteredWorkouts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentWorkouts = filteredWorkouts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);

  const handleSort = (order) => {
    const sortedWorkouts = [...workouts].sort((a, b) =>
      order === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    setWorkouts(sortedWorkouts);
  };

  const handlePageRangeChange = (direction) => {
    setPageRange((prevRange) => {
      const newRange = { ...prevRange };
      if (direction === "next" && newRange.end < totalPages) {
        newRange.start += 10;
        newRange.end += 10;
      } else if (direction === "prev" && newRange.start > 1) {
        newRange.start -= 10;
        newRange.end -= 10;
      }
      return newRange;
    });
  };

  return (
    <div
      className="relative min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden text-white mt-16"
      style={{
        background:
          "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)",
      }}
    >
      {/* Floating Particles */}
      <div className="absolute inset-0 -z-10">
        <div className="particle-animation"></div>
      </div>
      < UserInitials />

      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-6">Workouts</h1>

        {loading && (
          <p className="text-center text-blue-200">Loading workouts...</p>
        )}
        {error && <p className="text-center text-red-400">{error}</p>}

        {!loading && !error && (
          <>
            {/* Top Pagination */}
            <div className="flex justify-center flex-wrap gap-2 mb-6 ">
              {pageRange.start > 1 && (
                <button
                  onClick={() => handlePageRangeChange("prev")}
                  className="px-3 py-2 rounded border bg-gray-200 text-black text-sm sm:text-base"
                >
                  Previous 10
                </button>
              )}

              {Array.from(
                { length: Math.min(10, totalPages - pageRange.start + 1) },
                (_, index) => pageRange.start + index
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded border ${
                    currentPage === page
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {page}
                </button>
              ))}

              {pageRange.end < totalPages && (
                <button
                  onClick={() => handlePageRangeChange("next")}
                  className="px-3 py-2 rounded border bg-gray-200 text-black text-sm sm:text-base"
                >
                  Next 10
                </button>
              )}
            </div>

            <div className="flex justify-between mb-6">
              <button
                onClick={() => handleSort("asc")}
                className="px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded shadow-md hover:opacity-80 transition duration-300"
              >
                Sort A-Z
              </button>
              <button
                onClick={() => handleSort("desc")}
                className="px-4 py-2 bg-gradient-to-r from-pink-400 to-red-500 text-white rounded shadow-md hover:opacity-80 transition duration-300"
              >
                Sort Z-A
              </button>
            </div>

            <div className="flex text-black gap-4 mb-6">
              <input
                type="text"
                name="searchQuery"
                id="searchQuery"
                placeholder="Search by name or target muscle"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-left w-full p-3 mb-2 rounded shadow-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <select
                name="targetFilter"
                value={selectedTarget}
                onChange={(e) => setSelectedTarget(e.target.value)}
                className="p-3 mb-2 rounded shadow-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">All Targets</option>
                {uniqueTargets.map((target) => (
                  <option key={target} value={target}>
                    {target}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentWorkouts.map((workout) => (
                <div
                  key={workout.id}
                  className="p-4 bg-white/20 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                >
                  <h3 className="text-lg font-bold mb-2">{workout.name}</h3>
                  <p className="text-sm mb-2">Target: {workout.target}</p>
                  <img
                    src={workout.gifUrl}
                    alt={workout.name}
                    className="w-full rounded-lg mb-3"
                  />
                  <button
                    onClick={() => toggleFavorite(workout)}
                    className={`px-3 py-2 text-sm rounded ${
                      favorites.some((fav) => fav.id === workout.id)
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 text-black"
                    } hover:opacity-80`}
                  >
                    {favorites.some((fav) => fav.id === workout.id)
                      ? "Unfavorite"
                      : "Favorite"}
                  </button>
                </div>
              ))}
            </div>

            {/* Bottom Pagination */}
            <div className="flex justify-center flex-wrap gap-2 mt-8">
              {pageRange.start > 1 && (
                <button
                  onClick={() => handlePageRangeChange("prev")}
                  className="px-3 py-2 rounded border bg-gray-200 text-black text-sm sm:text-base"
                >
                  Previous 10
                </button>
              )}

              {Array.from(
                { length: Math.min(10, totalPages - pageRange.start + 1) },
                (_, index) => pageRange.start + index
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded border ${
                    currentPage === page
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {page}
                </button>
              ))}

              {pageRange.end < totalPages && (
                <button
                  onClick={() => handlePageRangeChange("next")}
                  className="px-3 py-2 rounded border bg-gray-200 text-black text-sm sm:text-base"
                >
                  Next 10
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Workouts;
