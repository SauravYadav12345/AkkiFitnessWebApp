import React, { useEffect, useState } from "react";

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

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
        const data = await response.json();
        if (Array.isArray(data)) {
          setWorkouts(data);
        } else {
          throw new Error("Unexpected API response format");
        }
      } catch (error) {
        setError("Failed to load workouts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  // Filter workouts based on the search query
  const filteredWorkouts = workouts.filter(
    (workout) =>
      workout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workout.target.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredWorkouts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentWorkouts = filteredWorkouts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Loading State */}
      {loading && (
        <p className="text-center text-blue-500">Loading workouts...</p>
      )}

      {/* Error State */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search workouts by name or target muscle"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border rounded shadow-sm"
            />
          </div>

          {/* Workouts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentWorkouts.map((workout) => (
              <div key={workout.id} className="border p-4 rounded shadow-lg">
                <h3 className="text-lg font-bold mb-2">{workout.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Target: {workout.target}
                </p>
                <img
                  src={workout.gifUrl}
                  alt={workout.name}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Workouts;

// App.js file
