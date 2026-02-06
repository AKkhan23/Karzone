import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeatail } from "../feature/adim/adminSlice";
import { useEffect, useState } from "react";
import { ArrowLeft, Calendar, Shield, CheckCircle, Phone, MapPin, User, Zap, Fuel, Settings, Star } from "lucide-react";
import { AddBooking, resetBookingState } from "../feature/Booking/bookingSlice";
import toast from "react-hot-toast";

export default function CarDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { car } = useSelector((state) => state.admin);
  const { isSucsess } = useSelector((state) => state.booking);

  const [form, setForm] = useState({ startDate: "", endDate: "" });
  const [imageLoaded, setImageLoaded] = useState(false);

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
        <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-48"></div>
        <div className="h-[500px] bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <Link 
          to="/cars" 
          className="group inline-flex items-center gap-2 px-4 py-2.5 mb-10 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-200 hover:bg-white transition-all duration-300"
        >
          <div className="relative">
            <ArrowLeft className="h-5 w-5 text-gray-600 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-300" />
            <div className="absolute inset-0 bg-blue-100 rounded-full scale-0 group-hover:scale-125 transition-transform duration-300 opacity-70"></div>
          </div>
          <span className="font-medium text-gray-700 group-hover:text-blue-700 transition-colors duration-300">
            Back to Cars
          </span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image Section - Enhanced Size and Effects */}
          <div className="space-y-6">
            <div className="relative group">
              {/* Glow Effect Container */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 via-purple-400/10 to-blue-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-70 transition-all duration-700 group-hover:scale-105"></div>
              
              {/* Main Image Container */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl border-4 border-white transform transition-all duration-500 group-hover:shadow-3xl group-hover:-translate-y-2">
                {/* Image Loading State */}
                <div className={`absolute inset-0 bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center transition-opacity duration-500 ${imageLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                    <p className="text-blue-500 font-medium">Loading car image...</p>
                  </div>
                </div>

                {/* Main Image */}
                <img
                  src={car?.imageUrl || car.image || car.photo || "/car-placeholder.jpg"}
                  alt={car?.name}
                  className={`w-full h-[500px] object-cover transition-all duration-700 transform ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'} group-hover:scale-105 group-hover:rotate-1`}
                  onLoad={() => setImageLoaded(true)}
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
                  <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full">
                      <Zap className="h-5 w-5 text-yellow-500 animate-pulse" />
                      <span className="font-bold text-gray-800">3D View Available</span>
                    </div>
                  </div>
                </div>

                {/* Floating Badges */}
                <div className="absolute top-6 left-6">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-lg transform -translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                      <Star className="h-4 w-4" fill="white" />
                      <span className="text-sm font-bold">Premium</span>
                    </div>
                    
                    <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-full shadow-lg transform -translate-x-4 group-hover:translate-x-0 transition-all duration-700">
                      <Fuel className="h-4 w-4" />
                      <span className="text-sm font-bold">Fuel Efficient</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Bottom Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center justify-between text-white">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Settings className="h-4 w-4 text-blue-300" />
                        <span className="text-sm font-medium">Automatic</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-yellow-300" />
                        <span className="text-sm font-medium">Hybrid Engine</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold tracking-tight">
                        ₹{car?.price}<span className="text-sm font-normal opacity-90">/day</span>
                      </div>
                      <div className="text-sm opacity-90">All inclusive</div>
                    </div>
                  </div>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm -translate-y-16 translate-x-16 rotate-45 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-700"></div>
                </div>
              </div>

              {/* Interactive Dots Indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {[1, 2, 3, 4].map((dot) => (
                  <button
                    key={dot}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${dot === 1 ? 'w-8 bg-blue-600' : 'bg-gray-300 hover:bg-blue-400'}`}
                    aria-label={`View image ${dot}`}
                  />
                ))}
              </div>
            </div>

            {/* Car Features Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="font-medium text-sm text-gray-700">Hybrid</span>
                </div>
              </div>
              
              <div className="p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Fuel className="h-6 w-6 text-emerald-600" />
                  </div>
                  <span className="font-medium text-sm text-gray-700">18 km/l</span>
                </div>
              </div>
              
              <div className="p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-50 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Settings className="h-6 w-6 text-purple-600" />
                  </div>
                  <span className="font-medium text-sm text-gray-700">Auto</span>
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-8">
            {/* Header with Animated Title */}
            <div className="space-y-4">
              <div className="inline-block">
                <span className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-bold rounded-full shadow-lg">
                  {car.brand}
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {car.name}
                <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-3"></div>
              </h1>
              
              <div className="prose prose-lg">
                <p className="text-gray-600 leading-relaxed text-lg">
                  {car.description}
                </p>
              </div>
            </div>

            {/* Divider with Animation */}
            <div className="relative pt-8">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Owner Information
                </span>
              </h3>
              
              <div className="space-y-4">
                <div className="group p-5 bg-gradient-to-r from-white to-blue-50/50 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-200 hover:-translate-x-1 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <User className="h-7 w-7 text-blue-600" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <CheckCircle className="h-3 w-3 text-white" fill="white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Owner Name</p>
                      <p className="text-lg font-semibold text-gray-800">{car?.carOwnerName || "N/A"}</p>
                    </div>
                  </div>
                </div>
                
                <div className="group p-5 bg-gradient-to-r from-white to-emerald-50/50 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-emerald-200 hover:-translate-x-1 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Phone className="h-7 w-7 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Contact Number</p>
                      <p className="text-lg font-semibold text-gray-800">{car?.phone || "N/A"}</p>
                    </div>
                  </div>
                </div>
                
                <div className="group p-5 bg-gradient-to-r from-white to-amber-50/50 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-amber-200 hover:-translate-x-1 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="h-7 w-7 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 font-medium">Shop Address</p>
                      <p className="text-lg font-semibold text-gray-800">{car?.shopeAdress || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Section */}
            <div className="bg-gradient-to-br from-white to-blue-50/30 p-8 rounded-3xl shadow-2xl border border-blue-100/50 relative overflow-hidden group">
              {/* Animated Background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/5 rounded-full -translate-y-32 translate-x-32 group-hover:scale-150 transition-transform duration-1000"></div>
              
              <div className="relative">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Select Your Dates
                  </span>
                </h2>
                
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-semibold text-gray-700">
                        Start Date
                      </label>
                      <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">Select pickup date</div>
                    </div>
                    <div className="relative">
                      <input
                        type="date"
                        value={form.startDate}
                        name="startDate"
                        onChange={handleChange}
                        className="w-full p-4 pl-12 bg-white border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md"
                        min={new Date().toISOString().split('T')[0]}
                      />
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-semibold text-gray-700">
                        End Date
                      </label>
                      <div className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Select return date</div>
                    </div>
                    <div className="relative">
                      <input
                        type="date"
                        value={form.endDate}
                        name="endDate"
                        onChange={handleChange}
                        className="w-full p-4 pl-12 bg-white border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300 shadow-sm hover:shadow-md"
                        min={form.startDate || new Date().toISOString().split('T')[0]}
                      />
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-emerald-500" />
                    </div>
                  </div>
                  
                  <button
                    onClick={handleBooking}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white rounded-xl font-bold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
                  >
                    {/* Shine Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    
                    <span className="relative flex items-center justify-center gap-3">
                      <Shield className="h-5 w-5" />
                      Confirm Booking
                    </span>
                  </button>
                  
                  <div className="text-center space-y-2">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-green-600">✓</span> Free cancellation within 24 hours
                    </p>
                    <p className="text-xs text-gray-400">
                      Confirmation email will be sent instantly
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}