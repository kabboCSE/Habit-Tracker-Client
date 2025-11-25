import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const BrowsePublicHabits = () => {
  const [habits, setHabits] = useState([]);
  const [filteredHabits, setFilteredHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Morning", "Work", "Fitness", "Evening", "Study"];

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/habits/public`)
      .then((res) => {
        setHabits(res.data);
        setFilteredHabits(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = habits;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((h) => h.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (h) =>
          h.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          h.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredHabits(filtered);
  }, [searchTerm, selectedCategory, habits]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-8">Browse Public Habits</h2>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search habits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Habits Grid */}
        {filteredHabits.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <p className="text-xl text-gray-600">
              No habits found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHabits.map((habit) => (
              <div
                key={habit._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <img
                  src={habit.imageUrl || "https://via.placeholder.com/400x200"}
                  alt={habit.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                    {habit.category}
                  </span>
                  <h3 className="text-xl font-bold mt-3 mb-2">{habit.title}</h3>
                  <p className="text-gray-600 mb-4">
                    {habit.description.substring(0, 100)}...
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={
                          habit.userPhotoURL || "https://via.placeholder.com/30"
                        }
                        alt={habit.userName}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm text-gray-600">
                        {habit.userName}
                      </span>
                    </div>
                    <span className="text-orange-500 font-semibold">
                      🔥 {habit.currentStreak}
                    </span>
                  </div>
                  <Link
                    to={`/habit/${habit._id}`}
                    className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowsePublicHabits;
