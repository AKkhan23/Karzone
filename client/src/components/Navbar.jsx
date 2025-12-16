 import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, Car, LogOut } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../feature/auth/authSlice"; // <-- your logout action

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth); // Get user from Redux

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Cars", path: "/cars" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    dispatch(logout()); // Call slice action
    navigate("/login"); // Redirect to login
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">CarRental</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`${
                  isActive(link.path)
                    ? "text-blue-600 font-semibold"
                    : "text-gray-600 hover:text-blue-600"
                } transition-colors duration-200`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {user.isAdmin && (
                  <Link
                    to="/admin"
                    className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
                  >
                    Admin Panel
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
                >
                  SignUp
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-2 ${
                  isActive(link.path) ? "text-blue-600 font-semibold" : "text-gray-600"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <>
                {user.isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="block py-2 text-gray-600"
                  >
                    Admin Panel
                  </Link>
                )}
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-gray-600"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left py-2 text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-gray-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-gray-600"
                >
                  SignUp
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
