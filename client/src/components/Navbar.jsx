 import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, Car, LogOut, Sparkles, Home, Info, Phone, Shield } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../feature/auth/authSlice";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "About", path: "/about", icon: Info },
    { name: "Cars", path: "/cars", icon: Car },
    { name: "Contact", path: "/contact", icon: Phone },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-xl border-b border-blue-100/50"
          : "bg-gradient-to-r from-blue-50/95 via-white/95 to-cyan-50/95 backdrop-blur-md border-b border-blue-100/30"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-3"
          >
            <Link to="/" className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur-md opacity-50" />
                <Car className="relative h-9 w-9 text-white bg-gradient-to-r from-blue-600 to-cyan-500 p-1.5 rounded-xl" />
              </motion.div>
              <div className="flex flex-col">
                <motion.span
                  animate={{ 
                    backgroundPosition: scrolled ? "0% 50%" : ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{ duration: scrolled ? 0 : 5, repeat: scrolled ? 0 : Infinity }}
                  className="text-xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent bg-[length:200%_auto]"
                >
                  CarRental
                </motion.span>
                <span className="text-xs text-blue-500 font-medium">Premium Mobility</span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation - Fixed Hover Issue */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <Link
                  to={link.path}
                  onMouseEnter={() => setHoveredLink(link.path)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`relative px-4 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2 group ${
                    isActive(link.path)
                      ? "text-white"
                      : "text-blue-900 hover:text-blue-700"
                  }`}
                >
                  <link.icon className="h-4 w-4" />
                  <span className="font-medium">{link.name}</span>

                  {/* Hover/Active Background - Fixed positioning */}
                  {(isActive(link.path) || hoveredLink === link.path) && (
                    <motion.div
                      layoutId="nav-bg"
                      className={`absolute inset-0 rounded-xl z-[-1] ${
                        isActive(link.path)
                          ? "bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg"
                          : "bg-gradient-to-r from-blue-100/80 to-cyan-100/80"
                      }`}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                </Link>

                {/* Active Indicator - Below the link, not part of hover */}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-[3px] w-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <>
                {user.isAdmin && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/admin"
                      className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium text-sm shadow-lg hover:shadow-xl transition-all"
                    >
                      <Shield className="h-4 w-4" />
                      <span>Admin</span>
                    </Link>
                  </motion.div>
                )}
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium text-sm shadow-lg hover:shadow-xl transition-all"
                  >
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-medium text-sm shadow-lg hover:shadow-xl transition-all"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/login"
                    className="px-5 py-2 rounded-xl text-blue-600 font-medium text-sm hover:bg-blue-50 transition-colors"
                  >
                    Login
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/register"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium text-sm shadow-lg hover:shadow-xl transition-all"
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200/50"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X className="h-6 w-6 text-blue-600" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu className="h-6 w-6 text-blue-600" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-blue-100/50 shadow-xl"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                      isActive(link.path)
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                        : "text-blue-900 hover:bg-blue-50"
                    }`}
                  >
                    <link.icon className="h-5 w-5" />
                    <span className="font-medium">{link.name}</span>
                    {isActive(link.path) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto"
                      >
                        <Sparkles className="h-4 w-4" />
                      </motion.div>
                    )}
                  </Link>
                </motion.div>
              ))}

              <div className="border-t border-blue-100 pt-3 mt-3">
                {user ? (
                  <>
                    {user.isAdmin && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: navLinks.length * 0.1 }}
                      >
                        <Link
                          to="/admin"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 mb-2"
                        >
                          <Shield className="h-5 w-5" />
                          <span className="font-medium">Admin Panel</span>
                        </Link>
                      </motion.div>
                    )}
                    
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (navLinks.length + 1) * 0.1 }}
                    >
                      <Link
                        to="/profile"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 mb-2"
                      >
                        <User className="h-5 w-5" />
                        <span className="font-medium">Profile</span>
                      </Link>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (navLinks.length + 2) * 0.1 }}
                    >
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                        className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-red-50 to-rose-50 text-red-700"
                      >
                        <LogOut className="h-5 w-5" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: navLinks.length * 0.1 }}
                    >
                      <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 mb-2"
                      >
                        <User className="h-5 w-5" />
                        <span className="font-medium">Login</span>
                      </Link>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (navLinks.length + 1) * 0.1 }}
                    >
                      <Link
                        to="/register"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                      >
                        <Sparkles className="h-5 w-5" />
                        <span className="font-medium">Sign Up</span>
                      </Link>
                    </motion.div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}