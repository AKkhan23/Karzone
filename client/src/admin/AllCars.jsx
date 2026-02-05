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
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-[500px] max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 text-xl hover:text-gray-700 z-10"
            >
              ✕
            </button>

            {/* Car Image */}
            <div className="relative">
              <img
                src={selectedCar.imageUrl}
                alt={selectedCar.name}
                className="w-full h-52 object-cover rounded-lg mb-4"
              />
              {selectedCar.isAvailable ? (
                <span className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Available
                </span>
              ) : (
                <span className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Rented
                </span>
              )}
            </div>

            {/* Car Name */}
            <h2 className="text-2xl font-bold mb-2">{selectedCar.name}</h2>

            {/* Description */}
            <div className="mb-4">
              <p className="text-gray-700 whitespace-pre-line">
                {selectedCar.description || "No description available."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Left Column - Car Details */}
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h3 className="font-bold text-gray-600 mb-2">Car Details</h3>
                  <div className="space-y-2">
                    <p>
                      <strong className="text-gray-700">Brand:</strong>{" "}
                      <span className="text-gray-900">{selectedCar.brand}</span>
                    </p>
                    <p>
                      <strong className="text-gray-700">Category:</strong>{" "}
                      <span className="text-gray-900">
                        {selectedCar.category}
                      </span>
                    </p>
                    <p>
                      <strong className="text-gray-700">Fuel Type:</strong>{" "}
                      <span className="text-gray-900">
                        {selectedCar.fuelType}
                      </span>
                    </p>
                    <p>
                      <strong className="text-gray-700">Price / Day:</strong>{" "}
                      <span className="text-green-600 font-bold">
                        ₹{selectedCar.price}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Owner Details */}
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h3 className="font-bold text-gray-600 mb-2">
                    Owner Details
                  </h3>
                  <div className="space-y-2">
                    <p>
                      <strong className="text-gray-700">Owner Name:</strong>{" "}
                      <span className="text-gray-900">
                        {selectedCar.carOwnerName}
                      </span>
                    </p>
                    <p>
                      <strong className="text-gray-700">Phone:</strong>{" "}
                      <span className="text-gray-900">{selectedCar.phone}</span>
                    </p>
                    <p>
                      <strong className="text-gray-700">Shop Address:</strong>{" "}
                      <span className="text-gray-900">
                        {selectedCar.shopeAdress}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6 pt-4 border-t">
              <button
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                onClick={() =>
                  (window.location.href = `tel:${selectedCar.phone}`)
                }
              >
                <span>📞 Call Owner</span>
              </button>

              <button
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
                onClick={() =>
                  window.open(`https://wa.me/91${selectedCar.phone}`, "_blank")
                }
              >
                <span>💬 WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
