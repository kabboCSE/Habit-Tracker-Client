import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        toast.success("Logged out successfully");
        setShowDropdown(false);
      })
      .catch(() => toast.error("Logout failed"));
  };

  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
        }
      >
        Home
      </NavLink>
      {user && (
        <>
          <NavLink
            to="/add-habit"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
            }
          >
            Add Habit
          </NavLink>
          <NavLink
            to="/my-habits"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
            }
          >
            My Habits
          </NavLink>
        </>
      )}
      <NavLink
        to="/browse-habits"
        className={({ isActive }) =>
          isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
        }
      >
        Browse Public Habits
      </NavLink>
    </>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            🎯 HabitTracker
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2"
                >
                  <img
                    src={user.photoURL || "https://via.placeholder.com/40"}
                    alt={user.displayName}
                    className="w-10 h-10 rounded-full border-2 border-blue-500"
                  />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                    <div className="px-4 py-2 border-b">
                      <p className="font-semibold text-gray-800">
                        {user.displayName}
                      </p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-2xl"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4">
            {navLinks}
            {user ? (
              <div>
                <div className="flex items-center gap-3 py-2">
                  <img
                    src={user.photoURL || "https://via.placeholder.com/40"}
                    alt={user.displayName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{user.displayName}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 text-red-600"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-center text-blue-600 border border-blue-600 rounded-lg"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-center bg-blue-600 text-white rounded-lg"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
