import { useEffect, useState } from "react";
import { Car, Save, RotateCcw } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addCar, updateCar, clearEditCar } from "../feature/adim/adminSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Initial state to keep code DRY (Don't Repeat Yourself)
const initialFormState = {
  name: "",
  phone: "",
  carOwnerName: "",
  shopeAdress: "",
  brand: "",
  category: "",
  description: "",
  price: "",
  fuelType: "Petrol",
  isAvailable: true,
  imageUrl: "",
};

export default function AddCar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux store se edit state nikalna
  const { edit } = useSelector((state) => state.admin);

  const [formData, setFormData] = useState(initialFormState);

  // Destructuring for cleaner JSX
  const {
    name,
    phone,
    carOwnerName,
    shopAddress,  
    brand,
    category,
    description,
    price,
    fuelType,
    isAvailable,
    imageUrl,
  } = formData;

  // --- Main Mistake Fix: useEffect Dependencies & Form Sync ---
  useEffect(() => {
    if (edit?.isEdit && edit?.editCar) {
      setFormData({
        name: edit.editCar.name || "",
        phone: edit.editCar.phone || "",
        carOwnerName: edit.editCar.carOwnerName || "",
        shopAddress: edit.editCar.shopeAdress || "",
        brand: edit.editCar.brand || "",
        category: edit.editCar.category || "",
        description: edit.editCar.description || "",
        price: edit.editCar.price || "",
        fuelType: edit.editCar.fuelType || "Petrol",
        isAvailable: edit.editCar.isAvailable ?? true,
        imageUrl: edit.editCar.imageUrl || "",
      });
    } else {
      // Jab edit mode na ho (Add mode), tab form khali rahe
      setFormData(initialFormState);
    }
  }, [edit?.isEdit, edit?.editCar]); // edit?.editCar ko dependency me add kiya safety ke liye

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Data prepare karna
    const carData = {
      name,
      phone,
      carOwnerName, // added carOwnerName to the data being sent to the server
      shopAddress,
      brand,
      category,
      description,
      price: Number(price),
      fuelType,
      isAvailable,
      imageUrl,
    };

    if (edit?.isEdit) {
      dispatch(updateCar({ id: edit?.editCar._id, data: carData }));
      toast.success("Car Updated Successfully!");
      dispatch(clearEditCar()); // Update ke baad edit state clear karein
    } else {
      dispatch(addCar(carData));
      toast.success("Car Added Successfully!");
    }

    // List page par wapas bhej dena
    navigate("/admin/cars");
  };

  const handleReset = () => {
    setFormData(initialFormState);
    if (edit?.isEdit) {
      dispatch(clearEditCar()); // Reset karne par edit mode bhi khatam ho jaye
    }
  };

  return (
    <div className="space-y-6">
      {/* Dynamic Header based on Mode */}
      <div className="flex items-center space-x-3">
        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
          <Car className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {edit?.isEdit ? "Update Car Details" : "Add New Car"}
          </h1>
          <p className="text-gray-600">
            {edit?.isEdit
              ? "Modify existing vehicle info"
              : "Add a new vehicle to your inventory"}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Car Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="e.g., Tesla Model 3"
              />
            </div>
            {/* car owner name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Car Owner Name *
              </label>
              <input
                type="text"
                id="carOwnerName"
                name="carOwnerName"
                value={carOwnerName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="e.g., Tesla Model 3"
              />
            </div>

            {/* Phone Input */}
             <div>
              <label  className="block text-sm font-medium text-gray-700 mb-2">
                Phone *
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="e.g., Tesla Model 3"
              />
            </div>

            {/* Shop Address Input */}

             <div>
              <label htmlFor="shopAddress" className="block text-sm font-medium text-gray-700 mb-2">
                Shop Address *
              </label>
              <input
                type="text"
                id="shopAddress"
                name="shopAddress"
                value={shopAddress}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="e.g., Tesla Model 3"
              />
            </div>

            {/* Brand Input */}
            <div>
              <label
                htmlFor="brand"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Brand *
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={brand}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="e.g., Tesla"
              />
            </div>

            {/* Category Input */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category *
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="e.g., Sedan, SUV, Sports"
              />
            </div>

            {/* Price Input */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Price per Day (₹) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={price}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="e.g., 120"
              />
            </div>

            {/* Fuel Type Input */}
            <div>
              <label
                htmlFor="fuelType"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Fuel Type *
              </label>
              <select
                id="fuelType"
                name="fuelType"
                value={fuelType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
              </select>
            </div>

            {/* Image URL Input */}
            <div>
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Image URL *
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={imageUrl}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="https://example.com/car-image.jpg"
              />
            </div>
          </div>

          {/* Description Input */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Describe the car features and specifications..."
            ></textarea>
          </div>

          {/* Available Checkbox */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="isAvailable"
              name="isAvailable"
              checked={isAvailable}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor="isAvailable"
              className="text-sm font-medium text-gray-700"
            >
              Available for Rent
            </label>
          </div>

          {/* Image Preview */}
          {imageUrl && (
            <div className="border rounded-lg p-2 bg-gray-50">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image Preview
              </label>
              <img
                src={imageUrl}
                alt="Car preview"
                className="h-48 w-full object-cover rounded-lg shadow-sm"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x200?text=Invalid+Image+URL";
                }}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg"
            >
              <Save className="h-5 w-5" />
              <span>{edit?.isEdit ? "Update Car" : "Add Car"}</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
            >
              <RotateCcw className="h-5 w-5" />
              <span>Reset</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
