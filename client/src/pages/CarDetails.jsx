import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeatail } from "../feature/adim/adminSlice";
import { useEffect, useState } from "react";
import { ArrowLeft, Calendar, Shield, CheckCircle, Phone, MapPin, User } from "lucide-react";
import { AddBooking, resetBookingState } from "../feature/Booking/bookingSlice";
import toast from "react-hot-toast";

export default function CarDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { car } = useSelector((state) => state.admin);
  const { isSucsess } = useSelector((state) => state.booking);

  const [form, setForm] = useState({ startDate: "", endDate: "" });

  // Move toast to useEffect
  useEffect(() => {
    window.scrollTo(0, 0);
    if (isSucsess) {
      toast.success("Booking Confirm");
      dispatch(resetBookingState());
    }
  }, [isSucsess, dispatch]);

  useEffect(() => {
    dispatch(fetchDeatail(id));
  }, [id, dispatch]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleBooking = () => {
    if (!form.startDate || !form.endDate) {
      toast.error("Please select start and end dates");
      return;
    }
    dispatch(AddBooking({ id: car._id, form }));
    setForm({ startDate: "", endDate: "" });
  };

  if (!car) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-48"></div>
        <div className="h-64 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <Link 
          to="/cars" 
          className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 mb-8 group"
        >
          <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" /> 
          Back to Cars
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl shadow-xl group">
              <img
                src={car?.imageUrl || car.image || car.photo || "/car-placeholder.jpg"}
                alt={car?.name}
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full shadow-lg">
                  Premium
                </span>
              </div>
            </div>
            
            {/* Quick Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-sm font-medium">Fully Insured</span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm font-medium">Verified Owner</span>
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full">
                  {car.brand}
                </span>
                <div className="text-3xl font-bold text-blue-600">
                  ₹{car?.price}<span className="text-sm font-normal text-gray-500">/day</span>
                </div>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                {car.name}
              </h1>
              <p className="text-gray-600 leading-relaxed">
                {car.description}
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <User className="h-5 w-5 mr-2 text-gray-400" />
                Owner Information
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <User className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Owner Name</p>
                    <p className="font-medium">{car?.carOwnerName || "N/A"}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <Phone className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Contact Number</p>
                    <p className="font-medium">{car?.phone || "N/A"}</p>
                  </div>
                </div>
                
                <div className="flex items-start p-4 bg-gray-50 rounded-xl">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Shop Address</p>
                    <p className="font-medium">{car?.shopeAdress || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Section */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-lg border border-blue-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="h-6 w-6 mr-2 text-blue-600" />
                Select Dates
              </h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={form.startDate}
                    name="startDate"
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={form.endDate}
                    name="endDate"
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                    min={form.startDate || new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <button
                  onClick={handleBooking}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Confirm Booking
                </button>
                
                <p className="text-center text-sm text-gray-500">
                  You'll receive a confirmation email within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}