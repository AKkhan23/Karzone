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

  const { cars, isError, message } = useSelector(
    (state) => state.admin,
  );


  console.log(cars)
  
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
          <div className="bg-white rounded-xl p-6 w-[500px] relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 text-xl"
            >
              ✕
            </button>

            <img
              src={selectedCar.imageUrl}
              className="w-full h-52 object-cover rounded-lg mb-4"
            />

            <h2 className="text-2xl font-bold mb-2">{selectedCar.name}</h2>

            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Brand:</strong> {selectedCar.brand}
              </p>
              <p>
                <strong>Category:</strong> {selectedCar.category}
              </p>
              <p>
                <strong>Fuel Type:</strong> {selectedCar.fuelType}
              </p>
              <p>
                <strong>Price / Day:</strong> ₹{selectedCar.price}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {selectedCar.isAvailable ? "Available" : "Rented"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
