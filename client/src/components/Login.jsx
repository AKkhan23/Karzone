 import { Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../feature/auth/authSlice"; // Redux thunk
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Redux state
  const { user, isError, message, isLoading } = useSelector(
    (state) => state.auth
  );

  // Redirect on login
  useEffect(() => {
    if  (user) {
      if (user.isAdmin) {
        navigate("/admin"); // admin page
      } else {
        navigate("/"); // normal user
      }
    }
  }, [ user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin(formData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md backdrop-blur-xl bg-white/20 shadow-2xl rounded-3xl p-8 space-y-6 border border-white/30"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-extrabold text-center text-white drop-shadow-lg"
        >
          Login
        </motion.h1>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3 bg-white/30 border border-white/40 rounded-2xl p-3 backdrop-blur-md"
        >
          <Mail className="w-5 h-5 text-white" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-transparent text-white placeholder-white/70 outline-none"
          />
        </motion.div>

        {/* Password */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-3 bg-white/30 border border-white/40 rounded-2xl p-3 backdrop-blur-md"
        >
          <Lock className="w-5 h-5 text-white" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-transparent text-white placeholder-white/70 outline-none"
          />
        </motion.div>

        {isError && <p className="text-red-500 text-sm">{message}</p>}
        {isLoading && <p className="text-white text-sm">Loading...</p>}

        <motion.button
          type="submit"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold shadow-lg hover:opacity-90 transition"
        >
          Login
        </motion.button>
      </motion.form>
    </div>
  );
}
