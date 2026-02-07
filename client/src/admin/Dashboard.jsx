import {
  Users,
  Car,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Shield,
  PieChart,
  Zap,
  Sparkles,
  Target,
  Rocket,
  Crown,
  Award,
  Star,
  TrendingUpIcon as TrendingUp2,
  ArrowUpRight,
  Activity,
  Gem,
  Briefcase,
  IndianRupeeIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllBookings,
  fetchAllCars,
  fetchAllUsers,
} from "../feature/adim/adminSlice";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { users, cars, bookings } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          dispatch(fetchAllUsers()),
          dispatch(fetchAllBookings()),
          dispatch(fetchAllCars()),
        ]);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };
    loadData();
  }, [dispatch]);

  // Calculate statistics
  const totalUsers = users?.length || 0;
  const totalCars = cars?.length || 0;
  const totalBookings = bookings?.length || 0;
  const totalRevenue =
    bookings?.reduce((sum, booking) => sum + (booking.totalPrice || 0), 0) || 0;

  const availableCars = cars?.filter((car) => car.isAvailable)?.length || 0;
  const pendingBookings =
    bookings?.filter((booking) => booking.status === "Pending")?.length || 0;
  const approvedBookings =
    bookings?.filter((booking) => booking.status === "Approved")?.length || 0;
  const completedBookings =
    bookings?.filter((booking) => booking.status === "Completed")?.length || 0;

  const recentBookings = bookings?.slice(0, 5) || [];
  const recentUsers = users?.slice(0, 3) || [];

  const mainStats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      animatedIcon: Sparkles,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-r from-blue-500/10 to-cyan-500/10",
      trend: "+12%",
      description: "Registered users",
      accentIcon: Crown,
    },
    {
      title: "Total Cars",
      value: totalCars,
      icon: Car,
      animatedIcon: Rocket,
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-gradient-to-r from-emerald-500/10 to-green-500/10",
      trend: "+8%",
      description: "Total vehicles",
      accentIcon: Gem,
    },
    {
      title: "Total Bookings",
      value: totalBookings,
      icon: Calendar,
      animatedIcon: Target,
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-gradient-to-r from-purple-500/10 to-violet-500/10",
      trend: "+24%",
      description: "Total bookings",
      accentIcon: Award,
    },
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: IndianRupeeIcon,
      animatedIcon: TrendingUp2,
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-gradient-to-r from-amber-500/10 to-orange-500/10",
      trend: "+18%",
      description: "Total earnings",
      accentIcon: Star,
    },
  ];

  const quickStats = [
    {
      title: "Available Cars",
      value: availableCars,
      icon: Car,
      animatedIcon: Zap,
      color: "text-emerald-600",
      bgColor: "bg-gradient-to-r from-emerald-100 to-green-100",
      percentage: Math.round((availableCars / totalCars) * 100) || 0,
      trend: "up",
    },
    {
      title: "Pending Bookings",
      value: pendingBookings,
      icon: Clock,
      animatedIcon: AlertCircle,
      color: "text-amber-600",
      bgColor: "bg-gradient-to-r from-amber-100 to-orange-100",
      percentage: Math.round((pendingBookings / totalBookings) * 100) || 0,
      trend: "pending",
    },
    {
      title: "Approved Bookings",
      value: approvedBookings,
      icon: CheckCircle,
      animatedIcon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-gradient-to-r from-blue-100 to-cyan-100",
      percentage: Math.round((approvedBookings / totalBookings) * 100) || 0,
      trend: "up",
    },
    {
      title: "Completed",
      value: completedBookings,
      icon: CheckCircle,
      animatedIcon: Shield,
      color: "text-purple-600",
      bgColor: "bg-gradient-to-r from-purple-100 to-violet-100",
      percentage: Math.round((completedBookings / totalBookings) * 100) || 0,
      trend: "completed",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border-emerald-200";
      case "Pending":
        return "bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border-amber-200";
      case "Completed":
        return "bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border-blue-200";
      case "Cancelled":
        return "bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return CheckCircle;
      case "Pending":
        return Clock;
      case "Completed":
        return TrendingUp;
      case "Cancelled":
        return AlertCircle;
      default:
        return AlertCircle;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"
          />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's what's happening with your business.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Activity className="h-4 w-4 text-blue-500" />
          </motion.div>
          <span>
            Last updated:{" "}
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </motion.div>

      {/* Main Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {mainStats.map((stat, index) => {
          const Icon = stat.icon;
          const AnimatedIcon = stat.animatedIcon;
          const AccentIcon = stat.accentIcon;
          return (
            <div
              key={index}
              className="group relative bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              {/* Animated Background */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                className={`absolute -right-6 -bottom-6 opacity-10 ${stat.bgColor} rounded-full h-32 w-32`}
              />

              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`p-3 rounded-xl ${stat.bgColor}`}
                    >
                      <Icon
                        className={`h-6 w-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                      />
                    </motion.div>
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                      className="opacity-80"
                    >
                      <AnimatedIcon
                        className={`h-5 w-5 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                      />
                    </motion.div>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
                    <ArrowUpRight className="h-4 w-4" />
                    {stat.trend}
                  </div>
                </div>

                <h3 className="text-gray-600 text-sm font-medium mb-1">
                  {stat.title}
                </h3>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">{stat.description}</p>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-gray-300 group-hover:text-gray-400"
                  >
                    <AccentIcon className="h-4 w-4" />
                  </motion.div>
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Quick Stats & Recent Users */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="p-2 bg-blue-50 rounded-lg"
            >
              <PieChart className="h-5 w-5 text-blue-600" />
            </motion.div>
            <h2 className="text-xl font-bold text-gray-900">Quick Stats</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              const AnimatedIcon = stat.animatedIcon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="relative p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-300 group"
                >
                  {/* Animated Icon Background */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                    className="absolute top-4 right-4 opacity-10"
                  >
                    <AnimatedIcon className={`h-8 w-8 ${stat.color}`} />
                  </motion.div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ rotate: 15 }}
                        className={`p-2 rounded-lg ${stat.bgColor}`}
                      >
                        <Icon className={`h-4 w-4 ${stat.color}`} />
                      </motion.div>
                      <span className="text-sm font-medium text-gray-700">
                        {stat.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <AnimatedIcon className={`h-3 w-3 ${stat.color}`} />
                      </motion.div>
                      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                        {stat.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </span>
                    <span className="text-sm text-gray-500">Total</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Users */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-2 bg-purple-50 rounded-lg"
            >
              <Users className="h-5 w-5 text-purple-600" />
            </motion.div>
            <h2 className="text-xl font-bold text-gray-900">Recent Users</h2>
          </div>

          <div className="space-y-4">
            {recentUsers.map((user, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-all duration-300 group"
              >
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center">
                    <span className="font-semibold text-blue-600 text-sm">
                      {user.name?.charAt(0) || "U"}
                    </span>
                  </div>
                  <motion.div
                    animate={{ scale: [0, 1] }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {user.name || "Unknown User"}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {user.email || "No email"}
                  </p>
                </div>
                <motion.div
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                  className="text-xs font-medium px-2 py-1 rounded-full bg-gradient-to-r from-purple-50 to-violet-50 text-purple-700 border border-purple-100"
                >
                  New
                </motion.div>
              </motion.div>
            ))}

            {recentUsers.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                </motion.div>
                <p>No recent users</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Recent Bookings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="p-2 bg-green-50 rounded-lg"
            >
              <Calendar className="h-5 w-5 text-green-600" />
            </motion.div>
            <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Briefcase className="h-4 w-4" />
            </motion.div>
            <span>Last {recentBookings.length} bookings</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  User
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Vehicle
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Duration
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Amount
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking, index) => {
                const StatusIcon = getStatusIcon(booking.status);
                return (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index }}
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors group"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <motion.div
                          whileHover={{ rotate: 10 }}
                          className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-100 to-blue-50 flex items-center justify-center"
                        >
                          <Users className="h-4 w-4 text-blue-600" />
                        </motion.div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {booking.user?.name || "Unknown User"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.2,
                          }}
                        >
                          <Car className="h-4 w-4 text-gray-400" />
                        </motion.div>
                        <span className="font-medium text-gray-900">
                          {booking.car?.name || "Unknown Car"}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-600">
                        {booking.startDate
                          ? new Date(booking.startDate).toLocaleDateString()
                          : "N/A"}{" "}
                        -{" "}
                        {booking.endDate
                          ? new Date(booking.endDate).toLocaleDateString()
                          : "N/A"}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <IndianRupeeIcon className="h-4 w-4 text-green-500" />
                        </motion.div>
                        <span className="font-semibold text-gray-900">
                          ₹{booking.totalPrice || 0}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 border ${getStatusColor(booking.status)} w-fit`}
                      >
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          <StatusIcon className="h-3 w-3" />
                        </motion.div>
                        {booking.status || "Pending"}
                      </motion.div>
                    </td>
                  </motion.tr>
                );
              })}

              {recentBookings.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-12 text-center">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    </motion.div>
                    <p className="text-gray-500">No recent bookings</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Summary Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="p-2 bg-white rounded-lg"
            >
              <Shield className="h-5 w-5 text-blue-600" />
            </motion.div>
            <div>
              <h3 className="font-semibold text-gray-900">Business Insights</h3>
              <p className="text-sm text-gray-600">
                All systems operational. {totalBookings} bookings processed
                today.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 bg-green-500 rounded-full"
              />
              <span className="text-gray-700">Running Smoothly</span>
            </div>
            <div className="text-gray-500">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-block mr-2"
              >
                <Activity className="h-3 w-3" />
              </motion.div>
              Updated:{" "}
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
