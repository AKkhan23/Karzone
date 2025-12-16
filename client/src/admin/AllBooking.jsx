 // src/pages/admin/AllBookings.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Calendar } from "lucide-react";
import {fetchAllBookings,editBookingStatusThunk,} from "../feature/adim/adminSlice";

export default function AllBookings() {
  const dispatch = useDispatch();
  const { bookings, isLoading, isError, message } = useSelector(
    (state) => state.admin
  );

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchAllBookings());
  }, [dispatch]);

  const filteredBookings = bookings?.filter((booking) => {
    const userName = booking?.user?.name?.toLowerCase() || "";
    const carName = booking?.car?.name?.toLowerCase() || "";
    return (
      userName.includes(searchTerm.toLowerCase()) ||
      carName.includes(searchTerm.toLowerCase())
    );
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleStatusChange = (bookingId, newStatus) => {
    dispatch(
      editBookingStatusThunk({
        id: bookingId,
        data: { status: newStatus },
      })
    );
  };

  if (isLoading)
    return <p className="text-center py-6">Loading bookings...</p>;

  if (isError)
    return <p className="text-center py-6 text-red-600">{message}</p>;

  return (
    <div className="space-y-6 w-full">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">All Bookings</h1>
        <p className="text-gray-600">Manage customer bookings</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 w-full overflow-hidden">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings by user or car..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* TABLE SCROLL ONLY */}
        <div className="relative overflow-x-auto">
          <table className="min-w-[1100px] w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                  Booking ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                  Car
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                  Start Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                  End Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                  Days
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                  Total Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredBookings?.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    {booking._id}
                  </td>
                  <td className="px-6 py-4">
                    {booking.user?.name || "Unknown User"}
                  </td>
                  <td className="px-6 py-4">
                    {booking.car?.name || "Unknown Car"}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(booking.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(booking.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {booking.totalDays} days
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    ₹{booking.totalPrice}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={booking.status}
                      onChange={(e) =>
                        handleStatusChange(
                          booking._id,
                          e.target.value
                        )
                      }
                      className="px-3 py-1 border border-gray-300 rounded-lg text-xs"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBookings?.length === 0 && (
          <div className="text-center py-10 text-gray-600">
            No bookings found
          </div>
        )}
      </div>
    </div>
  );
}
