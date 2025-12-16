 import { useEffect, useState } from "react";
import { Search, Edit, Trash2, CheckCircle, XCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCars, removeCar, setEditCar } from "../feature/adim/adminSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AllCars() {
  const [searchTerm, setSearchTerm] = useState("");
  const { cars, isError,isLoading, message } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch all cars on mount
  useEffect(() => {
    dispatch(fetchAllCars());
  }, [dispatch]);

  // Filtered cars for search
const filteredCars = Array.isArray(cars)
  ? cars.filter((car) =>
      car?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car?.brand?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];


  {isLoading && (
  <p className="text-center py-10 text-gray-500">
    Loading cars...
  </p>
)}


  // Delete car
  const handelDelete = (id) => {
    dispatch(removeCar(id));
    toast.success("Deleted successfully");
  };

  // Edit car
  const handleEdit = (car) => {
    dispatch(setEditCar(car));
    navigate("/admin/add-car"); // same form for add/edit
  };

  // Show error toast if any
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Cars</h1>
          <p className="text-gray-600">Manage your vehicle inventory</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search cars by name or brand..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Car</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Brand</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Fuel Type</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price/Day</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCars?.map((car) => (
                <tr key={car?._id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img src={car?.imageUrl} alt={car?.name} className="h-12 w-16 object-cover rounded" />
                      <span className="font-medium text-gray-900">{car?.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{car?.brand}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">{car?.category}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{car?.fuelType}</td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">{car?.price}</span>
                  </td>
                  <td className="px-6 py-4">
                    {car.isAvailable ? (
                      <span className="inline-flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                        <CheckCircle className="h-3 w-3" />
                        <span>Available</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
                        <XCircle className="h-3 w-3" />
                        <span>Rented</span>
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button onClick={() => handleEdit(car)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button onClick={() => handelDelete(car._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCars?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No cars found</p>
          </div>
        )}
      </div>
    </div>
  );
}
