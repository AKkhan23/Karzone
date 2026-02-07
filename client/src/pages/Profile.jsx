import {
  User,
  Mail,
  Phone,
  Calendar,
  IndianRupeeIcon,
  X,
  AlertCircle,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchUserBookings,
  cancelBooking,
  resetBookingState,
} from "../feature/Booking/bookingSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { bookings, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.booking,
  );

  const [cancellingId, setCancellingId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const UserBookings = bookings.filter(
    (booking) => booking.user?._id === user?.id,
  );

  useEffect(() => {
    if (user?.token) {
      dispatch(fetchUserBookings());
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (isSuccess && cancellingId) {
      setCancellingId(null);
      setShowConfirmModal(false);
      setSelectedBookingId(null);

      // Show success message briefly
      setTimeout(() => {
        dispatch(resetBookingState());
      }, 3000);
    }

    if (isError && cancellingId) {
      setCancellingId(null);
    }
  }, [isSuccess, isError, cancellingId, dispatch]);

  const handleCancelClick = (bookingId) => {
    setSelectedBookingId(bookingId);
    setShowConfirmModal(true);
  };

  const handleConfirmCancel = async () => {
    if (selectedBookingId) {
      setCancellingId(selectedBookingId);
      await dispatch(cancelBooking(selectedBookingId));
    }
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
    setSelectedBookingId(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const canCancelBooking = (booking) => {
    return booking.status === "Pending" || booking.status === "Approved";
  };

  return (
    <div className="py-16 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">
            Manage your account and view your bookings
          </p>
        </div>

        {/* Success/Error Messages */}
        {isSuccess && message && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-green-800">{message}</p>
          </div>
        )}

        {isError && message && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-sm font-medium text-red-800">{message}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT USER CARD */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex flex-col items-center">
                <div className="h-28 w-28 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-4 shadow-lg">
                  <User className="h-14 w-14 text-white" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {user?.name}
                </h2>
                <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                  {user?.isAdmin ? "Administrator" : "Customer"}
                </span>

                <div className="w-full space-y-3">
                  <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                    <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Email
                      </p>
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                    <Phone className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Phone
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        {user?.phone || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-700">
                        {UserBookings.length}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Total Bookings
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-700">
                        {
                          UserBookings.filter((b) => b.status === "Completed")
                            .length
                        }
                      </p>
                      <p className="text-xs text-gray-600 mt-1">Completed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT BOOKINGS TABLE */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  My Bookings
                </h2>
                <span className="text-sm text-gray-500">
                  {UserBookings.length} total
                </span>
              </div>

              {UserBookings?.length > 0 ? (
                <div className="space-y-4">
                  {UserBookings?.map((booking) => (
                    <div
                      key={booking._id}
                      className="border border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-blue-300 transition-all duration-300 bg-gradient-to-r from-white to-gray-50"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {booking.car?.name || "Car Name"}
                          </h3>
                          <p className="text-xs text-gray-500 font-mono">
                            ID: #{booking._id.slice(-8)}
                          </p>
                        </div>

                        <div className="flex items-center space-x-3 mt-3 md:mt-0">
                          <span
                            className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(booking.status)}`}
                          >
                            {booking.status}
                          </span>

                          {canCancelBooking(booking) && (
                            <button
                              onClick={() => handleCancelClick(booking._id)}
                              disabled={cancellingId === booking._id}
                              className="group relative inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                            >
                              <X className="h-4 w-4 mr-1" />
                              {cancellingId === booking._id
                                ? "Cancelling..."
                                : "Cancel"}
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
                          <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                              Start Date
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                              {formatDate(booking.startDate)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
                          <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                              End Date
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                              {formatDate(booking.endDate)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3 p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                          <IndianRupeeIcon className="h-5 w-5 text-blue-700 mt-0.5" />
                          <div>
                            <p className="text-xs text-blue-700 font-medium uppercase tracking-wide">
                              Total Price
                            </p>
                            <p className="text-sm font-bold text-blue-900">
                              ₹{booking.totalPrice}
                            </p>
                            <p className="text-xs text-blue-600 mt-0.5">
                              {booking.totalDays}{" "}
                              {booking.totalDays === 1 ? "day" : "days"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
                  <Calendar className="h-20 w-20 text-gray-300 mx-auto mb-4" />
                  <p className="text-xl font-semibold text-gray-700 mb-2">
                    No bookings yet
                  </p>
                  <p className="text-gray-500 mb-6">
                    Start your journey by booking a car today!
                  </p>
                  <a
                    href="/cars"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Browse Cars
                    <svg
                      className="ml-2 h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal - FIXED */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Background overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={handleCloseModal}
            aria-hidden="true"
          />

          {/* Modal panel */}
          <div className="relative z-10 bg-white rounded-2xl shadow-2xl max-w-lg w-full">
            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-bold text-gray-900">
                    Cancel Booking
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      Are you sure you want to cancel this booking? This action
                      cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-3">
              <button
                type="button"
                disabled={cancellingId !== null}
                onClick={handleConfirmCancel}
                className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {cancellingId ? "Cancelling..." : "Yes, Cancel Booking"}
              </button>
              <button
                type="button"
                disabled={cancellingId !== null}
                onClick={handleCloseModal}
                className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm transition-all"
              >
                No, Keep Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
