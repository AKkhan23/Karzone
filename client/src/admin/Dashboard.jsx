import { Users, Car, Calendar,IndianRupeeIcon, TrendingUp, } from 'lucide-react';
import { useEffect } from 'react';
// import { users, cars, bookings } from '../data/dummyData';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBookings, fetchAllCars, fetchAllUsers } from '../feature/adim/adminSlice';


export default function Dashboard() {







    
       const { users,cars,bookings } = useSelector(
         (state) => state.admin
       );
console.log(users,cars,bookings);

  const dispatch = useDispatch();

  const totalUsers = users.length;
  const totalCars = cars.length;
  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);


  useEffect(() => {
     dispatch(fetchAllUsers());
     dispatch(fetchAllBookings());
     dispatch(fetchAllCars());

   }, [dispatch]);



  const stats = [
    {
      title: 'Total Users',
      value: totalUsers,
      icon: Users,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Total Cars',
      value: totalCars,
      icon: Car,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Total Bookings',
      value: totalBookings,
      icon: Calendar,
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Total Revenue',
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: IndianRupeeIcon,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ];

  const recentBookings = bookings.slice(0, 5);

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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome to your admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.textColor}`} />
                </div>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Available Cars</span>
              <span className="text-xl font-bold text-green-600">{totalCars}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Rented Cars</span>
              <span className="text-xl font-bold text-blue-600">{totalCars}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Active Bookings</span>
              <span className="text-xl font-bold text-purple-600">{totalBookings}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Registered Users</span>
              <span className="text-xl font-bold text-blue-600">{totalUsers}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Bookings</h2>
          <div className="space-y-3">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow duration-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">{booking.userName}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{booking.carName}</p>
                <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                  <span>{booking.startDate} - {booking.endDate}</span>
                  <span className="font-semibold text-gray-900">₹{booking.totalPrice}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
