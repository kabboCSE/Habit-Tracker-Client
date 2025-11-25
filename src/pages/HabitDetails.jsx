import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { format } from "date-fns";

const HabitDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/habits/${id}`)
      .then((res) => {
        setHabit(res.data);
        setFormData(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Habit not found");
        navigate("/");
      });
  }, [id, navigate]);

  const calculateProgress = () => {
    if (!habit || habit.completionHistory.length === 0) return 0;
    const last30Days = 30;
    return Math.round((habit.completionHistory.length / last30Days) * 100);
  };

  const handleMarkComplete = async () => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/habits/${id}/complete`
      );
      setHabit(response.data);
      toast.success("Habit marked as complete!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to mark complete");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/habits/${id}`,
        formData
      );
      setHabit(response.data);
      setIsEditing(false);
      toast.success("Habit updated successfully!");
    } catch (error) {
      toast.error("Failed to update habit");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  const isOwner = user?.email === habit.userEmail;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <img
            src={habit.imageUrl || "https://via.placeholder.com/800x400"}
            alt={habit.title}
            className="w-full h-64 object-cover"
          />

          <div className="p-8">
            {isEditing && isOwner ? (
              <form onSubmit={handleUpdate} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows="4"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="Morning">Morning</option>
                    <option value="Work">Work</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Evening">Evening</option>
                    <option value="Study">Study</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Reminder Time
                  </label>
                  <input
                    type="time"
                    value={formData.reminderTime}
                    onChange={(e) =>
                      setFormData({ ...formData, reminderTime: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imageUrl: e.target.value })
                    }
                    placeholder="Enter image URL"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  {formData.imageUrl && (
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="mt-4 w-32 h-32 object-cover rounded-lg"
                    />
                  )}
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                      {habit.category}
                    </span>
                    <h1 className="text-4xl font-bold mt-3 mb-2">
                      {habit.title}
                    </h1>
                    <p className="text-gray-600">{habit.description}</p>
                  </div>
                  {isOwner && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Edit
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-orange-50 p-6 rounded-lg">
                    <p className="text-3xl font-bold text-orange-500">
                      🔥 {habit.currentStreak}
                    </p>
                    <p className="text-gray-600 mt-2">Current Streak</p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg">
                    <p className="text-3xl font-bold text-green-500">
                      {calculateProgress()}%
                    </p>
                    <p className="text-gray-600 mt-2">30-Day Progress</p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <p className="text-3xl font-bold text-blue-500">
                      {habit.longestStreak}
                    </p>
                    <p className="text-gray-600 mt-2">Longest Streak</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Progress Bar</h3>
                  <div className="w-full bg-gray-200 rounded-full h-6">
                    <div
                      className="bg-blue-600 h-6 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                      style={{ width: `${calculateProgress()}%` }}
                    >
                      {calculateProgress()}%
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={habit.userPhotoURL || "https://via.placeholder.com/50"}
                    alt={habit.userName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{habit.userName}</p>
                    <p className="text-sm text-gray-600">{habit.userEmail}</p>
                  </div>
                </div>

                <button
                  onClick={handleMarkComplete}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 text-lg"
                >
                  ✓ Mark Complete Today
                </button>

                <div className="mt-6 text-sm text-gray-500">
                  <p>Created: {format(new Date(habit.createdAt), "PPP")}</p>
                  <p>
                    Last Updated: {format(new Date(habit.updatedAt), "PPP")}
                  </p>
                  <p>Reminder Time: {habit.reminderTime}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitDetails;
