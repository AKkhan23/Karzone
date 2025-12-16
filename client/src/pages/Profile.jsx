 import { User, Mail, Phone, Calendar, DollarSign, IndianRupee, IndianRupeeIcon } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserBookings } from "../feature/Booking/bookingSlice" ;

export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
// console.log(user);

  // bookings ko safe banaya
  const bookings = useSelector((state) => state.booking.bookings) || [];
// console.log(bookings);

const UserBookings = bookings.filter(booking => booking.user?._id === user?.id);
// console.log(UserBookings);


  useEffect(() => {
    if (user?.token) {
      dispatch(fetchUserBookings());
    }
  }, [user, dispatch]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  return (
    <div className="py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT USER CARD */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex flex-col items-center">
                <div className="h-24 w-24 rounded-full bg-blue-600 flex items-center justify-center mb-4">
                  <User className="h-12 w-12 text-white" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">{user?.name}</h2>
                <p className="text-gray-600 mb-6">{user?.isAdmin ? 'Administrator' : 'Customer'}</p>

                <div className="w-full space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm font-medium text-gray-900">{user?.phone || "N/A"}</p>
                    </div>
                  </div>
                </div>

          
              </div>
            </div>
          </div>

          {/* RIGHT BOOKINGS TABLE */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h2>

              {UserBookings?.length > 0 ? (
                <div className="space-y-4">
                  {UserBookings?.map((booking) => (
                    <div key={booking._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {booking.car?.name || "Car Name"}
                          </h3>
                          <p className="text-sm text-gray-500">Booking ID: #{booking._id}</p>
                        </div>

                        <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mt-2 md:mt-0 ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="text-xs text-gray-500">Start Date</p>
                            <p className="text-sm font-medium text-gray-900">{formatDate(booking.startDate)}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Calendar className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="text-xs text-gray-500">End Date</p>
                            <p className="text-sm font-medium text-gray-900">{formatDate(booking.endDate)}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <IndianRupeeIcon className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="text-xs text-gray-500">Total Price</p>
                            <p className="text-sm font-medium text-gray-900">₹{booking.totalPrice} ({booking.totalDays} days)</p>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-xl text-gray-600 mb-4">No bookings yet</p>
                  <a href="/cars" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Browse Cars</a>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
