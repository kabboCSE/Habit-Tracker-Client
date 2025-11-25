import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { format } from "date-fns";

const MyHabits = () => {
  const { user } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/habits/user/${user.email}`)
        .then((res) => {
          setHabits(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this habit?")) {
      axios
        .delete(`${import.meta.env.VITE_API_URL}/api/habits/${id}`)
        .then(() => {
          setHabits(habits.filter((h) => h._id !== id));
          toast.success("Habit deleted successfully");
        })
        .catch(() => toast.error("Failed to delete habit"));
    }
  };

  const handleMarkComplete = async (habitId) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/habits/${habitId}/complete`
      );
      setHabits(habits.map((h) => (h._id === habitId ? response.data : h)));
      toast.success("Habit marked as complete!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to mark complete");
    }
  };

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
        <h2 className="text-4xl font-bold mb-8">My Habits</h2>

        {habits.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <p className="text-xl text-gray-600 mb-4">
              You haven't created any habits yet.
            </p>
            <Link
              to="/add-habit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 inline-block"
            >
              Create Your First Habit
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Title</th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Current Streak
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Created Date
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {habits.map((habit) => (
                  <tr key={habit._id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{habit.title}</td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                        {habit.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-orange-500 font-semibold">
                        🔥 {habit.currentStreak} days
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {format(new Date(habit.createdAt), "MMM dd, yyyy")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link
                          to={`/habit/${habit._id}`}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                        >
                          Update
                        </Link>
                        <button
                          onClick={() => handleDelete(habit._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleMarkComplete(habit._id)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                        >
                          Complete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyHabits;
