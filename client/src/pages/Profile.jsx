import {
  User,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  IndianRupee,
  IndianRupeeIcon,
  Shield,
  CreditCard,
  MapPin,
  Car,
  Clock,
  CheckCircle,
  Package,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  cancelBooking,
  fetchUserBookings,
} from "../feature/Booking/bookingSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("bookings");

  const bookings = useSelector((state) => state.booking.bookings) || [];
  const UserBookings = bookings.filter(
    (booking) => booking.user?._id === user?.id,
  );

  useEffect(() => {
    if (user?.token) {
      dispatch(fetchUserBookings());
    }
  }, [user, dispatch]);

  const handleCancelBooking = (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;
    dispatch(cancelBooking(bookingId));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-gradient-to-r from-emerald-500 to-green-500";
      case "Pending":
        return "bg-gradient-to-r from-amber-500 to-yellow-500";
      case "Completed":
        return "bg-gradient-to-r from-blue-500 to-cyan-500";
      case "Cancelled":
        return "bg-gradient-to-r from-red-500 to-rose-500";
      default:
        return "bg-gradient-to-r from-gray-500 to-slate-500";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="h-5 w-5" />;
      case "Pending":
        return <Clock className="h-5 w-5" />;
      case "Completed":
        return <Package className="h-5 w-5" />;
      default:
        return <Shield className="h-5 w-5" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Profile Stats */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                Welcome back,{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {user?.name?.split(" ")[0]}
                </span>
              </h1>
              <p className="text-gray-600 text-lg">
                Manage your bookings and profile information
              </p>
            </div>

            <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-full">
              <Shield className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-blue-700">
                Member since 2024
              </span>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Car className="h-7 w-7 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  Active
                </span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {UserBookings.filter((b) => b.status === "Approved").length}
              </h3>
              <p className="text-gray-600">Active Bookings</p>
            </div>

            <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-6 shadow-lg border border-emerald-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-emerald-100 rounded-xl">
                  <CheckCircle className="h-7 w-7 text-emerald-600" />
                </div>
                <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  History
                </span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {UserBookings.filter((b) => b.status === "Completed").length}
              </h3>
              <p className="text-gray-600">Completed Trips</p>
            </div>

            <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <CreditCard className="h-7 w-7 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                  Total
                </span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {UserBookings.length}
              </h3>
              <p className="text-gray-600">All Bookings</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT USER CARD - Enhanced */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-b from-white to-blue-50/50 rounded-3xl shadow-2xl p-8 border border-blue-100/50 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-purple-400/5 rounded-full -translate-y-20 translate-x-20"></div>

              <div className="relative">
                {/* Avatar Section */}
                <div className="flex flex-col items-center mb-8">
                  <div className="relative mb-6 group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
                    <div className="relative h-32 w-32 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center border-4 border-white shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
                      <User className="h-16 w-16 text-white" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                    {user?.name}
                  </h2>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-full mb-6">
                    <div
                      className={`h-2 w-2 rounded-full ${user?.isAdmin ? "bg-purple-500" : "bg-blue-500"}`}
                    ></div>
                    <span className="font-semibold text-blue-700">
                      {user?.isAdmin ? "Administrator" : "Premium Member"}
                    </span>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  <div className="group p-4 bg-gradient-to-r from-white to-blue-50/70 rounded-2xl border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <Mail className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">
                          Email Address
                        </p>
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group p-4 bg-gradient-to-r from-white to-emerald-50/70 rounded-2xl border border-emerald-100 hover:border-emerald-300 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <Phone className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">
                          Phone Number
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {user?.phone || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group p-4 bg-gradient-to-r from-white to-amber-50/70 rounded-2xl border border-amber-100 hover:border-amber-300 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-amber-100 to-amber-50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <MapPin className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">
                          Account Type
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {user?.isAdmin ? "Admin Account" : "Regular Account"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Membership Badge */}
                <div className="mt-8 p-6 bg-gradient-to-r from-slate-900 to-gray-800 rounded-2xl text-white">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg">CarHub Pro</h3>
                    <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-xs font-bold">
                      GOLD
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">
                    Unlock exclusive benefits and priority support
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT BOOKINGS SECTION - Enhanced */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-b from-white to-blue-50/30 rounded-3xl shadow-2xl p-8 border border-blue-100/50">
              {/* Section Header with Tabs */}
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Booking History
                  </h2>
                  <p className="text-gray-600">
                    Track and manage all your car rentals
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-4 md:mt-0 bg-gray-100 p-1 rounded-full">
                  <button
                    onClick={() => setActiveTab("bookings")}
                    className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                      activeTab === "bookings"
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    All Bookings
                  </button>
                  <button
                    onClick={() => setActiveTab("active")}
                    className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                      activeTab === "active"
                        ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Active
                  </button>
                </div>
              </div>

              {/* Bookings List */}
              {UserBookings?.length > 0 ? (
                <div className="space-y-6">
                  {UserBookings?.map((booking) => (
                    <div
                      key={booking._id}
                      className="group bg-gradient-to-r from-white to-blue-50/50 rounded-2xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 relative overflow-hidden"
                    >
                      {/* Background Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <div className="relative">
                        {/* Booking Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                          <div className="flex items-center gap-4 mb-4 md:mb-0">
                            <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl">
                              <Car className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">
                                {booking.car?.name || "Premium Car"}
                              </h3>
                              <p className="text-sm text-gray-500">
                                Booking ID:{" "}
                                <span className="font-mono">
                                  #{booking._id?.slice(-8)}
                                </span>
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div
                              className={`flex items-center gap-2 px-4 py-2 rounded-full text-white font-semibold ${getStatusColor(booking.status)}`}
                            >
                              {getStatusIcon(booking.status)}
                              <span>{booking.status}</span>
                            </div>
                            <div className="hidden lg:block h-8 w-px bg-gray-300"></div>
                          </div>
                        </div>

                        {/* Booking Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gray-500">
                              <Calendar className="h-4 w-4" />
                              <span className="text-xs font-medium">
                                START DATE
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg">
                                <Calendar className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <p className="text-lg font-bold text-gray-900">
                                  {formatDate(booking.startDate)}
                                </p>
                                <p className="text-xs text-gray-500">Pickup</p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gray-500">
                              <Calendar className="h-4 w-4" />
                              <span className="text-xs font-medium">
                                END DATE
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="p-2 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-lg">
                                <Calendar className="h-5 w-5 text-emerald-600" />
                              </div>
                              <div>
                                <p className="text-lg font-bold text-gray-900">
                                  {formatDate(booking.endDate)}
                                </p>
                                <p className="text-xs text-gray-500">Return</p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gray-500">
                              <Clock className="h-4 w-4" />
                              <span className="text-xs font-medium">
                                DURATION
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="p-2 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg">
                                <Clock className="h-5 w-5 text-purple-600" />
                              </div>
                              <div>
                                <p className="text-lg font-bold text-gray-900">
                                  {booking.totalDays} days
                                </p>
                                <p className="text-xs text-gray-500">
                                  Total Rental
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gray-500">
                              <IndianRupeeIcon className="h-4 w-4" />
                              <span className="text-xs font-medium">
                                TOTAL PRICE
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="p-2 bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg">
                                <IndianRupeeIcon className="h-5 w-5 text-amber-600" />
                              </div>
                              <div>
                                <p className="text-lg font-bold text-gray-900">
                                  ₹{booking.totalPrice}
                                </p>
                                <p className="text-xs text-gray-500">
                                  All inclusive
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-6"></div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            Booked on: {formatDate(booking.createdAt)}
                          </div>
                          <div className="flex items-center gap-3">
                            <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-300">
                              View Details
                            </button>
                            {booking.status === "Pending" && (
                              <button
                                onClick={() => handleCancelBooking(booking._id)}
                                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-rose-500 rounded-lg hover:shadow-lg transition-all duration-300"
                              >
                                Cancel Booking
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Empty State - Enhanced */
                <div className="text-center py-16 px-4">
                  <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
                    <div className="relative p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl border border-blue-200">
                      <Car className="h-20 w-20 text-gray-300 mx-auto mb-4" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    No bookings yet
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Start your journey by booking your first car. Explore our
                    premium collection of vehicles.
                  </p>
                  <a
                    href="/cars"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <Car className="h-5 w-5" />
                    Browse Available Cars
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
