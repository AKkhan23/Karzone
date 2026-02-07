import { useEffect, useState } from "react";
import {
  Car,
  Save,
  RotateCcw,
  Sparkles,
  Upload,
  Phone,
  User,
  MapPin,
  DollarSign,
  Fuel,
  Image,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addCar, updateCar, clearEditCar } from "../feature/adim/adminSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
  const { edit } = useSelector((state) => state.admin);
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    name,
    phone,
    carOwnerName,
    shopeAdress,
    brand,
    category,
    description,
    price,
    fuelType,
    isAvailable,
    imageUrl,
  } = formData;

  useEffect(() => {
    if (edit?.isEdit && edit?.editCar) {
      setFormData({
        name: edit.editCar.name || "",
        phone: edit.editCar.phone || "",
        carOwnerName: edit.editCar.carOwnerName || "",
        shopeAdress: edit.editCar.shopeAdress || "",
        brand: edit.editCar.brand || "",
        category: edit.editCar.category || "",
        description: edit.editCar.description || "",
        price: edit.editCar.price || "",
        fuelType: edit.editCar.fuelType || "Petrol",
        isAvailable: edit.editCar.isAvailable ?? true,
        imageUrl: edit.editCar.imageUrl || "",
      });
    } else {
      setFormData(initialFormState);
    }
  }, [edit?.isEdit, edit?.editCar]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const carData = {
      name,
      phone,
      carOwnerName,
      shopeAdress,
      brand,
      category,
      description,
      price: Number(price),
      fuelType,
      isAvailable,
      imageUrl,
    };

    try {
      if (edit?.isEdit) {
        await dispatch(updateCar({ id: edit?.editCar._id, data: carData }));
        toast.success("Car Updated Successfully!");
        dispatch(clearEditCar());
      } else {
        await dispatch(addCar(carData));
        toast.success("Car Added Successfully!");
      }
      navigate("/admin/cars");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormState);
    if (edit?.isEdit) {
      dispatch(clearEditCar());
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl shadow-lg">
            <Car className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-900 to-cyan-700 bg-clip-text text-transparent">
              {edit?.isEdit ? "Update Car Details" : "Add New Car"}
            </h1>
            <p className="text-gray-600 mt-1">
              {edit?.isEdit
                ? "Modify existing vehicle information"
                : "Add a new vehicle to your premium fleet"}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Car Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="h-6 w-1 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                <h2 className="text-xl font-bold text-gray-900">
                  Car Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Car Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Car className="h-4 w-4 text-blue-500" />
                    Car Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="Tesla Model 3"
                    />
                    <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400" />
                  </div>
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Brand *
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={brand}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Tesla"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="SUV, Sedan, Sports"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    Daily Price (₹) *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="price"
                      value={price}
                      onChange={handleChange}
                      required
                      min="0"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="1500"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      ₹
                    </span>
                  </div>
                </div>

                {/* Fuel Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Fuel className="h-4 w-4 text-orange-500" />
                    Fuel Type *
                  </label>
                  <select
                    name="fuelType"
                    value={fuelType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Image className="h-4 w-4 text-purple-500" />
                    Image URL *
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      name="imageUrl"
                      value={imageUrl}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="https://example.com/car.jpg"
                    />
                    <Upload className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Owner Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="h-6 w-1 bg-gradient-to-b from-emerald-500 to-green-500 rounded-full"></div>
                <h2 className="text-xl font-bold text-gray-900">
                  Owner Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Owner Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <User className="h-4 w-4 text-emerald-500" />
                    Owner Name *
                  </label>
                  <input
                    type="text"
                    name="carOwnerName"
                    value={carOwnerName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-blue-500" />
                    Phone Number *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={phone}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="9876543210"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      +91
                    </span>
                  </div>
                </div>

                {/* Shop Address */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-red-500" />
                    Shop Address *
                  </label>
                  <input
                    type="text"
                    name="shopeAdress"
                    value={shopeAdress}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="123 Main Street, Indore, MP"
                  />
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={description}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                placeholder="Describe the car features, condition, special specifications, and any additional information..."
              />
            </div>

            {/* Availability Section */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center">
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
                  className="ml-3 text-sm font-medium text-gray-700"
                >
                  Mark as available for rental
                </label>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${isAvailable ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}
              >
                {isAvailable ? "Available" : "Not Available"}
              </span>
            </div>

            {/* Image Preview */}
            {imageUrl && (
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700">
                  Image Preview
                </label>
                <div className="relative rounded-xl overflow-hidden border border-gray-300">
                  <img
                    src={imageUrl}
                    alt="Car preview"
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/800x400?text=Invalid+Image+URL";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 flex items-center justify-center gap-3 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    <span>{edit?.isEdit ? "Update Car" : "Add Car"}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="flex-1 flex items-center justify-center gap-3 px-6 py-3.5 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
              >
                <RotateCcw className="h-5 w-5" />
                <span>Reset Form</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
