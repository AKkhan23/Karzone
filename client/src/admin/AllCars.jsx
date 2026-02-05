import { useEffect, useState } from "react";
import { Search, Edit, Trash2, CheckCircle, XCircle, Eye } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCars,
  removeCar,
  setEditCar,
} from "../feature/adim/adminSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AllCars() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { cars, isError, message } = useSelector((state) => state.admin);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllCars());
  }, [dispatch]);

  // Search Filter
  const filteredCars = Array.isArray(cars)
    ? cars.filter(
        (car) =>
          car?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car?.brand?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];

  // Delete
  const handelDelete = (id) => {
    dispatch(removeCar(id));
    toast.success("Deleted successfully");
  };

  // Edit
  const handleEdit = (car) => {
    dispatch(setEditCar(car));
    navigate("/admin/add-car");
  };

  // View Details
  const handleView = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  // Error toast
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Cars</h1>
        <p className="text-gray-600">Manage your vehicle inventory</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        {/* Search */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search cars..."
            className="w-full pl-10 pr-4 py-3 border rounded-lg"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-xs font-semibold">
                  Car
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold">
                  Brand
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold">
                  Fuel
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredCars.map((car) => (
                <tr key={car._id} className="border-b">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={car.imageUrl}
                      className="h-12 w-16 rounded object-cover"
                    />
                    {car.name}
                  </td>

                  <td className="px-6 py-4">{car.brand}</td>
                  <td className="px-6 py-4">{car.category}</td>
                  <td className="px-6 py-4">{car.fuelType}</td>
                  <td className="px-6 py-4">{car.price}</td>

                  <td className="px-6 py-4">
                    {car.isAvailable ? (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs flex items-center gap-1 w-fit">
                        <CheckCircle size={14} /> Available
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs flex items-center gap-1 w-fit">
                        <XCircle size={14} /> Rented
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(car)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit size={18} />
                    </button>

                    <button
                      onClick={() => handleView(car)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => handelDelete(car._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MODAL ================= */}

      {isModalOpen && selectedCar && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300 ease-out"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center p-2 sm:p-4">
            <div
              className="bg-white w-full h-full sm:h-auto sm:max-h-[95vh] sm:max-w-4xl rounded-none sm:rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 ease-out animate-in slide-in-from-bottom-10 fade-in flex flex-col sm:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button - Position based on orientation */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-10 h-10 bg-white/90 sm:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/100 sm:hover:bg-white/30 transition-all hover:scale-110 shadow-lg"
              >
                <span className="text-gray-800 sm:text-white text-xl">✕</span>
              </button>

              {/* Image Section - Left side in landscape */}
              <div className="relative h-48 sm:h-auto sm:flex-1 min-h-[200px] sm:min-h-0 overflow-hidden group">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/60 via-black/30 to-transparent z-10" />

                {/* Car Image */}
                <img
                  src={selectedCar.imageUrl}
                  alt={selectedCar.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Availability Badge */}
                <div className="absolute top-3 left-3 sm:bottom-4 sm:left-4 z-20">
                  <span
                    className={`inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg ${
                      selectedCar.isAvailable
                        ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white"
                        : "bg-gradient-to-r from-rose-500 to-red-500 text-white"
                    }`}
                  >
                    {selectedCar.isAvailable ? (
                      <>
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full mr-1.5 sm:mr-2 animate-pulse"></span>
                        <span className="hidden xs:inline">Available</span>
                        <span className="xs:hidden">✓</span>
                      </>
                    ) : (
                      <span className="text-xs sm:text-sm">Rented</span>
                    )}
                  </span>
                </div>

                {/* Car Name - Position changes based on orientation */}
                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 z-20 text-right">
                  <h2 className="text-xl sm:text-3xl font-bold text-white drop-shadow-lg line-clamp-1">
                    {selectedCar.name}
                  </h2>
                  <p className="text-white/90 text-sm sm:text-base font-medium hidden sm:block">
                    {selectedCar.brand} • {selectedCar.category}
                  </p>
                </div>

                {/* Fuel Type Badge for mobile */}
                <div className="absolute bottom-3 left-3 sm:hidden z-20">
                  <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        selectedCar.fuelType === "Petrol"
                          ? "bg-orange-500"
                          : "bg-blue-500"
                      }`}
                    ></span>
                    <span className="text-white text-xs font-medium">
                      {selectedCar.fuelType}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Section - Right side in landscape */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 max-h-[calc(100vh-200px)] sm:max-h-full">
                {/* Mobile Header Info */}
                <div className="sm:hidden mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="text-gray-500 text-xs">Daily Rental</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                          ₹{selectedCar.price}
                        </span>
                        <span className="text-gray-400 text-sm">/ day</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Brand</p>
                      <p className="font-semibold text-gray-800">
                        {selectedCar.brand}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Desktop Price & Fuel */}
                <div className="hidden sm:flex items-center justify-between mb-6 pb-6 border-b">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">
                      Daily Rental
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        ₹{selectedCar.price}
                      </span>
                      <span className="text-gray-400">/ day</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-gray-500 text-sm font-medium">
                      Fuel Type
                    </p>
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-3 h-3 rounded-full ${
                          selectedCar.fuelType === "Petrol"
                            ? "bg-orange-500"
                            : "bg-blue-500"
                        }`}
                      ></span>
                      <span className="font-semibold text-gray-800">
                        {selectedCar.fuelType}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description - Responsive */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-5 sm:h-6 bg-blue-500 rounded-full flex-shrink-0"></span>
                    Description
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-100 max-h-32 sm:max-h-40 overflow-y-auto">
                    {selectedCar.description || "No description available."}
                  </p>
                </div>

                {/* Details Grid - Responsive layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  {/* Car Specifications */}
                  <div className="bg-gradient-to-br from-gray-50 to-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                      <span className="text-blue-500 text-base sm:text-lg">
                        🚗
                      </span>
                      <span className="text-sm sm:text-base">
                        Car Specifications
                      </span>
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex justify-between items-center py-1.5 sm:py-2 border-b border-gray-100">
                        <span className="text-gray-600 text-sm sm:text-base">
                          Brand
                        </span>
                        <span className="font-semibold text-gray-800 text-sm sm:text-base">
                          {selectedCar.brand}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 sm:py-2 border-b border-gray-100">
                        <span className="text-gray-600 text-sm sm:text-base">
                          Category
                        </span>
                        <span className="font-semibold text-gray-800 text-sm sm:text-base">
                          {selectedCar.category}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 sm:py-2">
                        <span className="text-gray-600 text-sm sm:text-base">
                          Fuel Type
                        </span>
                        <span className="font-semibold text-gray-800 text-sm sm:text-base">
                          {selectedCar.fuelType}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Owner Information */}
                  <div className="bg-gradient-to-br from-gray-50 to-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                      <span className="text-emerald-500 text-base sm:text-lg">
                        👤
                      </span>
                      <span className="text-sm sm:text-base">
                        Owner Information
                      </span>
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center gap-2 sm:gap-3 py-1.5 sm:py-2">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 font-semibold text-sm sm:text-base">
                            {selectedCar.carOwnerName.charAt(0)}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                            {selectedCar.carOwnerName}
                          </p>
                          <p className="text-gray-500 text-xs sm:text-sm">
                            Car Owner
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-600 text-sm sm:text-base">
                              📞
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-800 text-sm sm:text-base">
                              {selectedCar.phone}
                            </p>
                            <p className="text-gray-500 text-xs sm:text-sm">
                              Contact Number
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2 sm:gap-3">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-emerald-600 text-sm sm:text-base">
                              📍
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-800 text-sm sm:text-base">
                              {selectedCar.shopeAdress}
                            </p>
                            <p className="text-gray-500 text-xs sm:text-sm">
                              Shop Location
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Responsive */}
                <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 pt-4 sm:pt-6 border-t border-gray-200">
                  <button
                    onClick={() =>
                      window.open(
                        `https://wa.me/91${selectedCar.phone}`,
                        "_blank",
                      )
                    }
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white py-2.5 sm:py-3.5 px-4 sm:px-6 rounded-lg sm:rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 sm:gap-3 font-semibold text-sm sm:text-base"
                  >
                    <span className="text-lg sm:text-xl">💬</span>
                    <span className="whitespace-nowrap">WhatsApp</span>
                  </button>

                  <button
                    onClick={() =>
                      (window.location.href = `tel:${selectedCar.phone}`)
                    }
                    className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2.5 sm:py-3.5 px-4 sm:px-6 rounded-lg sm:rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 sm:gap-3 font-semibold text-sm sm:text-base"
                  >
                    <span className="text-lg sm:text-xl">📞</span>
                    <span className="whitespace-nowrap">Call Now</span>
                  </button>
                </div>

                {/* Footer Note */}
                <p className="text-center text-gray-400 text-xs sm:text-sm mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100">
                  Listed on{" "}
                  {new Date(selectedCar.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
