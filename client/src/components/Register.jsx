import {
  Mail,
  Phone,
  Lock,
  User,
  Car,
  Shield,
  Check,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../feature/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const { user, isError, message, isLoading } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    // Calculate password strength
    const strength = calculatePasswordStrength(formData.password);
    setPasswordStrength(strength);
  }, [formData.password]);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    dispatch(userRegister(formData));
  };

  const getStrengthColor = (strength) => {
    if (strength === 0) return "bg-gray-200";
    if (strength === 1) return "bg-red-500";
    if (strength === 2) return "bg-yellow-500";
    if (strength === 3) return "bg-blue-500";
    return "bg-green-500";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Floating car icons */}
      <div className="absolute top-1/4 right-1/4 opacity-5">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Car className="w-32 h-32" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Top decorative stripe */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"></div>

        <div className="flex flex-col lg:flex-row">
          {/* Left side - Benefits */}
          <div className="lg:w-2/5 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 lg:p-12 text-white relative overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzAgMzBMMCAyMEwwIDQwWiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=')]"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10"
            >
              <div className="flex items-center gap-3 mb-8">
                <motion.div
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="p-2 bg-white/20 rounded-lg backdrop-blur-sm"
                >
                  <Car className="w-8 h-8" />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold">PremiumDrive</h1>
                  <p className="text-blue-200 text-sm">Premium Car Rental</p>
                </div>
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold mb-6 leading-tight">
                Start Your Journey With Premium Cars
              </h2>

              <div className="space-y-6">
                {[
                  {
                    icon: Shield,
                    title: "Secure Account",
                    desc: "Bank-level security for your personal data",
                  },
                  {
                    icon: Sparkles,
                    title: "Exclusive Deals",
                    desc: "Member-only discounts and early access",
                  },
                  {
                    icon: Car,
                    title: "Priority Booking",
                    desc: "First access to our premium fleet",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">
                        {item.title}
                      </h4>
                      <p className="text-blue-200 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Animated progress indicator */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, delay: 0.5 }}
                className="mt-10 h-1 bg-white/30 rounded-full overflow-hidden"
              >
                <div className="h-full bg-gradient-to-r from-blue-400 to-purple-400"></div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right side - Registration Form */}
          <div className="lg:w-3/5 p-8 lg:p-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Create Your Account
              </h2>
              <p className="text-gray-600">
                Join thousands enjoying premium car rentals
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-2"
                  onFocus={() => setActiveField("name")}
                  onBlur={() => setActiveField(null)}
                >
                  <label className="text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="relative">
                    <motion.div
                      animate={{
                        scale: activeField === "name" ? 1.02 : 1,
                        borderColor:
                          activeField === "name" ? "#3b82f6" : "#d1d5db",
                      }}
                      className="absolute inset-0 border-2 rounded-lg pointer-events-none"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <User
                        className={`w-5 h-5 ${activeField === "name" ? "text-blue-600" : "text-gray-400"}`}
                      />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 relative z-10 bg-transparent"
                      required
                    />
                  </div>
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="space-y-2"
                  onFocus={() => setActiveField("email")}
                  onBlur={() => setActiveField(null)}
                >
                  <label className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <motion.div
                      animate={{
                        scale: activeField === "email" ? 1.02 : 1,
                        borderColor:
                          activeField === "email" ? "#3b82f6" : "#d1d5db",
                      }}
                      className="absolute inset-0 border-2 rounded-lg pointer-events-none"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <Mail
                        className={`w-5 h-5 ${activeField === "email" ? "text-blue-600" : "text-gray-400"}`}
                      />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter Your Email"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 relative z-10 bg-transparent"
                      required
                    />
                  </div>
                </motion.div>

                {/* Phone Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2"
                  onFocus={() => setActiveField("phone")}
                  onBlur={() => setActiveField(null)}
                >
                  <label className="text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="relative">
                    <motion.div
                      animate={{
                        scale: activeField === "phone" ? 1.02 : 1,
                        borderColor:
                          activeField === "phone" ? "#3b82f6" : "#d1d5db",
                      }}
                      className="absolute inset-0 border-2 rounded-lg pointer-events-none"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <Phone
                        className={`w-5 h-5 ${activeField === "phone" ? "text-blue-600" : "text-gray-400"}`}
                      />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your Number"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 relative z-10 bg-transparent"
                      required
                    />
                  </div>
                </motion.div>

                {/* Password Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="space-y-3"
                  onFocus={() => setActiveField("password")}
                  onBlur={() => setActiveField(null)}
                >
                  <label className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <motion.div
                      animate={{
                        scale: activeField === "password" ? 1.02 : 1,
                        borderColor:
                          activeField === "password" ? "#3b82f6" : "#d1d5db",
                      }}
                      className="absolute inset-0 border-2 rounded-lg pointer-events-none"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <Lock
                        className={`w-5 h-5 ${activeField === "password" ? "text-blue-600" : "text-gray-400"}`}
                      />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a strong password"
                      className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 relative z-10 bg-transparent"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 z-20"
                    >
                      {showPassword ? (
                        <motion.div animate={{ rotate: 180 }}>
                          <Lock className="w-5 h-5" />
                        </motion.div>
                      ) : (
                        <Lock className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  <div className="space-y-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((level) => (
                        <motion.div
                          key={level}
                          initial={{ width: 0 }}
                          animate={{
                            width: passwordStrength >= level ? "100%" : "0%",
                          }}
                          transition={{ duration: 0.3, delay: level * 0.1 }}
                          className={`h-1 flex-1 rounded-full ${getStrengthColor(passwordStrength)} transition-all`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">
                      {passwordStrength === 0 && "Enter a password"}
                      {passwordStrength === 1 && "Weak password"}
                      {passwordStrength === 2 && "Fair password"}
                      {passwordStrength === 3 && "Good password"}
                      {passwordStrength === 4 && "Strong password"}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {isError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                        </div>
                        <p className="text-red-700 text-sm">{message}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                disabled={isLoading}
                className="w-full relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-lg"></div>
                <motion.div
                  animate={{ x: ["0%", "100%"] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
                <div className="relative py-4 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 group-hover:from-blue-600 group-hover:to-indigo-700 transition-all duration-300">
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span className="text-white font-semibold">
                        Creating Account...
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <motion.div
                        animate={formSubmitted ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        <Check className="w-5 h-5 text-white" />
                      </motion.div>
                      <span className="text-white font-semibold text-lg">
                        Create Premium Account
                      </span>
                    </div>
                  )}
                </div>
              </motion.button>

              {/* Login Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="text-center pt-4"
              >
                <p className="text-gray-600 text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1 group"
                  >
                    Sign In
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="inline-block"
                    >
                      →
                    </motion.span>
                  </Link>
                </p>
              </motion.div>
            </form>

            {/* Security Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-center gap-3"
            >
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-sm">
                <p className="text-gray-700 font-medium">Secure Registration</p>
                <p className="text-gray-500 text-xs">256-bit SSL encryption</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
