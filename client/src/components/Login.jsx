import {
  Mail,
  Lock,
  Car,
  Shield,
  AlertCircle,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../feature/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { user, isError, message, isLoading } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (user) {
      if (user.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin(formData));
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-white via-blue-50/20 to-white">
      {/* Left side - Brand/Animation Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-transparent to-cyan-400/5 bg-[length:200%_200%]"
          />
        </div>

        {/* Animated Car Section - Using CSS Animation Instead of GIF */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Animated Car Container */}
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotateY: [0, 5, -5, 0],
              }}
              transition={{
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                rotateY: { duration: 4, repeat: Infinity },
              }}
              className="relative"
            >
              {/* Car Icon with Gradient */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-2xl opacity-30"></div>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="relative w-64 h-64 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Car className="w-32 h-32 text-white drop-shadow-2xl" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Animated Rings */}
              {[1, 2, 3].map((ring) => (
                <motion.div
                  key={ring}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: ring * 0.5,
                  }}
                  className="absolute inset-0 border-2 border-blue-300/30 rounded-full"
                  style={{
                    margin: `${ring * 40}px`,
                    borderWidth: `${4 - ring}px`,
                  }}
                />
              ))}

              {/* Animated Particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    rotate: [0, 360],
                    x: [0, Math.cos((i * 45 * Math.PI) / 180) * 120],
                    y: [0, Math.sin((i * 45 * Math.PI) / 180) * 120],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut",
                  }}
                  className="absolute w-3 h-3 bg-blue-300/40 rounded-full"
                  style={{
                    left: "50%",
                    top: "50%",
                    marginLeft: "-6px",
                    marginTop: "-6px",
                  }}
                />
              ))}
            </motion.div>

            {/* Speed Lines Animation */}
            <div className="absolute -bottom-10 left-0 right-0 overflow-hidden h-20">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ x: ["0%", "100%"] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.2,
                  }}
                  className="absolute h-1 bg-gradient-to-r from-transparent via-blue-300/40 to-transparent blur-sm"
                  style={{
                    width: `${40 + i * 20}%`,
                    top: `${15 + i * 15}px`,
                    left: "-50%",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Brand Info */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="p-3 bg-white/10 rounded-xl backdrop-blur-sm"
              >
                <Car className="w-8 h-8" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold">CarRental</h1>
                <p className="text-blue-100 text-sm">
                  Premium Car Rental Services
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold leading-tight">
                Start Your Journey
              </h2>
              <p className="text-blue-100/90 leading-relaxed max-w-md">
                Sign in to access our premium fleet of vehicles, exclusive
                deals, and personalized rental services.
              </p>
            </motion.div>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              {[
                {
                  icon: CheckCircle,
                  text: "Premium Fleet",
                  color: "text-emerald-300",
                },
                {
                  icon: Shield,
                  text: "Secure Booking",
                  color: "text-blue-300",
                },
                {
                  icon: Sparkles,
                  text: "24/7 Support",
                  color: "text-cyan-300",
                },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className={`p-2 rounded-lg bg-white/5 ${feature.color}`}>
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-blue-100/70"
          >
            © 2024 CarRental. All rights reserved.
          </motion.div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-16">
        <div className="max-w-md w-full mx-auto">
          {/* Mobile Header */}
          <div className="lg:hidden mb-8">
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="p-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg"
              >
                <Car className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CarRental</h1>
                <p className="text-gray-600 text-sm">Premium Car Rental</p>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block mb-10">
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-gray-900 mb-3"
            >
              Sign In
            </motion.h2>
            <p className="text-gray-600">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Error Message */}
            {isError && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                  <p className="text-red-700 text-sm">{message}</p>
                </div>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-gray-600 text-sm">Signing in...</span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={isLoading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sign In
            </motion.button>

            {/* Divider */}
            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-500 text-sm">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Create Account */}
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Create account
                </Link>
              </p>
            </div>

            {/* Security Note */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                <Shield className="w-4 h-4" />
                <span>Your data is protected with 256-bit SSL encryption</span>
              </div>
            </div>
          </form>

          {/* Mobile Footer */}
          <div className="mt-8 lg:hidden pt-6 border-t border-gray-200">
            <p className="text-center text-gray-500 text-sm">
              © 2024 CarRental. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
