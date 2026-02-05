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
          {/* Backdrop with blur and fade animation */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300 ease-out"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Container with slide-up animation */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div
              className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 ease-out animate-in slide-in-from-bottom-10 fade-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modern Header with gradient */}
              <div className="relative h-60 overflow-hidden group">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />

                {/* Car Image with zoom effect */}
                <img
                  src={selectedCar.imageUrl}
                  alt={selectedCar.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Close button - Modern */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110"
                >
                  <span className="text-white text-xl">✕</span>
                </button>

                {/* Availability Badge - Modern */}
                <div className="absolute bottom-4 left-4 z-20">
                  <span
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${
                      selectedCar.isAvailable
                        ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white"
                        : "bg-gradient-to-r from-rose-500 to-red-500 text-white"
                    }`}
                  >
                    {selectedCar.isAvailable ? (
                      <>
                        <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                        Available Now
                      </>
                    ) : (
                      "Currently Rented"
                    )}
                  </span>
                </div>

                {/* Car Name on Image */}
                <div className="absolute bottom-4 right-4 z-20 text-right">
                  <h2 className="text-3xl font-bold text-white drop-shadow-lg">
                    {selectedCar.name}
                  </h2>
                  <p className="text-white/90 font-medium">
                    {selectedCar.brand} • {selectedCar.category}
                  </p>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-8">
                {/* Price Tag - Modern */}
                <div className="flex items-center justify-between mb-6 pb-6 border-b">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">
                      Daily Rental
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
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
                        className={`w-3 h-3 rounded-full ${selectedCar.fuelType === "Petrol" ? "bg-orange-500" : "bg-blue-500"}`}
                      ></span>
                      <span className="font-semibold text-gray-800">
                        {selectedCar.fuelType}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
                    Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                    {selectedCar.description || "No description available."}
                  </p>
                </div>

                {/* Details Grid - Modern Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Car Specifications */}
                  <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <span className="text-blue-500">🚗</span>
                      Car Specifications
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Brand</span>
                        <span className="font-semibold text-gray-800">
                          {selectedCar.brand}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Category</span>
                        <span className="font-semibold text-gray-800">
                          {selectedCar.category}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Fuel Type</span>
                        <span className="font-semibold text-gray-800">
                          {selectedCar.fuelType}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Owner Information */}
                  <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <span className="text-emerald-500">👤</span>
                      Owner Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 py-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">
                            {selectedCar.carOwnerName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {selectedCar.carOwnerName}
                          </p>
                          <p className="text-sm text-gray-500">Car Owner</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                            <span className="text-blue-600">📞</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">
                              {selectedCar.phone}
                            </p>
                            <p className="text-sm text-gray-500">
                              Contact Number
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center mt-1">
                            <span className="text-emerald-600">📍</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">
                              {selectedCar.shopeAdress}
                            </p>
                            <p className="text-sm text-gray-500">
                              Shop Location
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Modern */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                  <button
                    onClick={() =>
                      window.open(
                        `https://wa.me/91${selectedCar.phone}`,
                        "_blank",
                      )
                    }
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white py-3.5 px-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3 font-semibold"
                  >
                    <span className="text-xl">💬</span>
                    <span>Message on WhatsApp</span>
                  </button>

                  <button
                    onClick={() =>
                      (window.location.href = `tel:${selectedCar.phone}`)
                    }
                    className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3.5 px-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3 font-semibold"
                  >
                    <span className="text-xl">📞</span>
                    <span>Call Now</span>
                  </button>
                </div>

                {/* Footer Note */}
                <p className="text-center text-gray-400 text-sm mt-6 pt-4 border-t border-gray-100">
                  Car listed on{" "}
                  {new Date(selectedCar.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
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
